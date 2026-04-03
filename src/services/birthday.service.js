const fs = require('fs');
const path = require('path');
const dateUtils = require('../utils/date.utils');

const DATA_PATH = path.join(__dirname, '../data/birthdays.json');

/**
 * Lê todos os aniversariantes do JSON
 */
const getAll = () => {
    try {
        if (!fs.existsSync(DATA_PATH)) {
            return [];
        }
        const data = fs.readFileSync(DATA_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erro ao ler base de dados:', error);
        return [];
    }
};

/**
 * Salva a lista de aniversariantes no JSON
 */
const saveAll = (birthdays) => {
    try {
        fs.writeFileSync(DATA_PATH, JSON.stringify(birthdays, null, 2), 'utf-8');
        return true;
    } catch (error) {
        console.error('Erro ao salvar base de dados:', error);
        return false;
    }
};

/**
 * Adiciona um novo aniversariante
 */
const addBirthday = (newBirthday) => {
    const birthdays = getAll();
    
    // Nome deve ser único
    const exists = birthdays.some(b => b.nome.toLowerCase() === newBirthday.nome.toLowerCase());
    if (exists) {
        throw new Error('Aniversariante já cadastrado com este nome.');
    }
    
    birthdays.push(newBirthday);
    return saveAll(birthdays);
};

/**
 * Atualiza um aniversariante existente
 */
const updateBirthday = (nome, updatedData) => {
    const birthdays = getAll();
    const index = birthdays.findIndex(b => b.nome.toLowerCase() === nome.toLowerCase());
    
    if (index === -1) {
        throw new Error('Aniversariante não encontrado.');
    }
    
    birthdays[index] = { ...birthdays[index], ...updatedData };
    return saveAll(birthdays);
};

/**
 * Busca aniversariantes de hoje
 */
const getTodaysBirthdays = () => {
    const birthdays = getAll();
    return dateUtils.getBirthdaysByDate(birthdays);
};

/**
 * Calcula os próximos aniversariantes a partir de amanhã
 */
const getNextBirthdays = () => {
    const birthdays = getAll();
    const today = new Date();
    
    // Simplificado: ordena por proximidade de data (ignorando ano)
    return birthdays
        .map(b => {
            const [day, month] = b.data_aniversario.split('/').map(Number);
            let nextDate = new Date(today.getFullYear(), month - 1, day);
            
            // Se já passou este ano, considera o próximo
            if (nextDate < today && !dateUtils.isBirthdayToday(b.data_aniversario)) {
                nextDate.setFullYear(today.getFullYear() + 1);
            }
            
            return { ...b, nextDate };
        })
        .filter(b => !dateUtils.isBirthdayToday(b.data_aniversario))
        .sort((a, b) => a.nextDate - b.nextDate);
};

module.exports = {
    getAll,
    addBirthday,
    updateBirthday,
    getTodaysBirthdays,
    getNextBirthdays
};
