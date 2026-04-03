const express = require('express');
const router = express.Router();
const birthdayController = require('../controllers/birthday.controller');

// GET /birthdays - Listar todos
router.get('/', birthdayController.getAll);

// POST /birthdays - Criar novo
router.post('/', birthdayController.create);

// PUT /birthdays/:nome - Atualizar existente
router.put('/:nome', birthdayController.update);

module.exports = router;
