const express = require('express');
const router = express.Router();
const { calcularRescisao } = require('../services/rescisaoService');

const tiposValidos = ['semJustaCausa', 'comJustaCausa', 'pedidoDemissao', 'acordoComum'];

router.post('/', (req, res) => {
  try {
    const { salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados } = req.body;

    if (!salarioBruto || !dataAdmissao || !dataRescisao || !tipoRescisao || !diasTrabalhados) {
      return res.status(400).json({
        erro: 'Campos obrigatórios: salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados'
      });
    }

    if (!tiposValidos.includes(tipoRescisao)) {
      return res.status(400).json({
        erro: `tipoRescisao inválido. Use: ${tiposValidos.join(', ')}`
      });
    }

    const resultado = calcularRescisao(
      Number(salarioBruto),
      dataAdmissao,
      dataRescisao,
      tipoRescisao,
      Number(diasTrabalhados)
    );
    res.json(resultado);
  } catch (erro) {
    res.status(400).json({ erro: erro.message });
  }
});

module.exports = router;