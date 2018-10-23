"use strict";
require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(require('./routes/usuario'));
app.get('/', function (req, res) {
    res.json('Hola Mundo');
});
mongoose.connect(process.env.MIURLDB, (err, res) => {
    if (err) {
        console.log('No se pudo conectar con la base de datos', err);
    }
    console.log('Base de datos ONLINE');
});
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000...');
});
//# sourceMappingURL=server.js.map