const express = require('express');
const cors = require('cors');

const salarioRoutes = require('./routes/salario');
const feriasRoutes = require('./routes/ferias');
const decimoRoutes = require('./routes/decimoTerceiro');
const rescisaoRoutes = require('./routes/rescisao');
const healthRoutes = require('./routes/health');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/ETEC/health', healthRoutes);
app.use('/ETEC/salario', salarioRoutes);
app.use('/ETEC/ferias', feriasRoutes);
app.use('/ETEC/decimo-terceiro', decimoRoutes);
app.use('/ETEC/rescisao', rescisaoRoutes);

module.exports = app;
