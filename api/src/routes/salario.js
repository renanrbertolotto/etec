const express = require('express');
const router = express.Router();
const { calcularSalario } = require('../services/salarioService');

router.post('/', (req, res) => {
  try {
    const { salarioBruto } = req.body;

    if (!salarioBruto) {
      return res.status(400).json({ erro: 'salarioBruto é obrigatório' });
    }

    const resultado = calcularSalario(Number(salarioBruto));
    res.json(resultado);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

module.exports = router;