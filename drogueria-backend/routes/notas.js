const express = require('express');
const router = express.Router();
const notasController = require('../controllers/notasController');

router.get('/', notasController.getNotas);
router.post('/', notasController.createNota);
router.delete('/:id', notasController.deleteNota);
router.patch('/:id', notasController.updateNota);

module.exports = router;
