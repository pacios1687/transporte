const express = require('express');

const app = express();

app.use(require('./usuario'));

app.use(require('./login'));
app.use(require('./upload'));
app.use(require('./resumen'));
app.use(require('./mes'));
app.use(require('./year'));
app.use(require('./ruta'));
app.use(require('./pedido'));
app.use(require('./incidencias'));
app.use(require('./imagenes'));






module.exports = app;