/**
 * Compara se uma data de aniversário (DD/MM/YYYY) coincide com o dia e mês atuais.
 * @param {string} dateString - Data no formato DD/MM/YYYY
 * @returns {boolean}
 */
const isBirthdayToday = (dateString) => {
  if (!dateString) return false;
  
  const today = new Date();
  const [day, month] = dateString.split('/').map(Number);
  
  return today.getDate() === day && (today.getMonth() + 1) === month;
};

/**
 * Retorna os aniversariantes que fazem aniversário no dia/mês especificado.
 * @param {Array} birthdays - Lista de objetos de aniversariantes
 * @param {Date} date - Objeto Date para verificar
 * @returns {Array}
 */
const getBirthdaysByDate = (birthdays, date = new Date()) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  
  return birthdays.filter(b => {
    const [bDay, bMonth] = b.data_aniversario.split('/').map(Number);
    return bDay === day && bMonth === month;
  });
};

/**
 * Formata a data para DD/MM
 */
const formatToDayMonth = (dateString) => {
  const [day, month] = dateString.split('/');
  return `${day}/${month}`;
};

module.exports = {
  isBirthdayToday,
  getBirthdaysByDate,
  formatToDayMonth
};
