const express = require('express');
const router = express.Router();
const { calcularDecimoTerceiro } = require('../services/decimoTerceiroService');

router.post('/', (req, res) => {
  try {
    const { salarioBruto, mesesTrabalhados } = req.body;

    if (!salarioBruto || !mesesTrabalhados) {
      return res.status(400).json({ erro: 'salarioBruto e mesesTrabalhados são obrigatórios' });
    }

    const resultado = calcularDecimoTerceiro(Number(salarioBruto), Number(mesesTrabalhados));
    res.json(resultado);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

module.exports = router;