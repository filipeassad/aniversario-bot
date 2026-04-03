const birthdayService = require('../services/birthday.service');

const getAll = (req, res) => {
    try {
        const birthdays = birthdayService.getAll();
        res.status(200).json(birthdays);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const create = (req, res) => {
    try {
        const { nome, data_aniversario, grupo } = req.body;
        
        if (!nome || !data_aniversario) {
            return res.status(400).json({ error: 'Nome e data_aniversario são obrigatórios.' });
        }
        
        // Simples validação de formato DD/MM/YYYY
        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dateRegex.test(data_aniversario)) {
            return res.status(400).json({ error: 'Data de aniversário deve estar no formato DD/MM/YYYY.' });
        }
        
        birthdayService.addBirthday({ nome, data_aniversario, grupo });
        res.status(201).json({ message: 'Aniversariante cadastrado com sucesso.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const update = (req, res) => {
    try {
        const { nome } = req.params;
        const updatedData = req.body;
        
        birthdayService.updateBirthday(nome, updatedData);
        res.status(200).json({ message: 'Aniversariante atualizado com sucesso.' });
    } catch (error) {
        if (error.message === 'Aniversariante não encontrado.') {
            return res.status(404).json({ error: error.message });
        }
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAll,
    create,
    update
};
