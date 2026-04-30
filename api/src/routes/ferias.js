const express = require('express');
const router = express.Router();
const { calcularFerias } = require('../services/feriasService');

router.post('/', (req, res) => {
  try {
    const { salarioBruto, diasConcedidos } = req.body;

    if (!salarioBruto) {
      return res.status(400).json({ erro: 'salarioBruto é obrigatório' });
    }

    const resultado = calcularFerias(Number(salarioBruto), 30, Number(diasConcedidos) || 30);
    res.json(resultado);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

module.exports = router;