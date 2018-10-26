namespace server {
  require('./config/config');
  //require('./routes/usuario');
  const express = require('express');
  const app = express();
  const mongoose = require('mongoose');
  // import express from 'express';
  // const app = express();
  // import mongoose from 'mongoose';

  // parse application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));

  // parse application/json
  app.use(express.json());

  // Configuración global de rutas
  app.use(require('./routes/index'));

  app.get('/', function(req: any, res: any) {
    res.json('Hola Mundo');
  });

  mongoose.connect(
    <string>process.env.MIURLDB,
    (err: any) => {
      if (err) {
        console.log('No se pudo conectar con la base de datos', err);
      }
      console.log('Base de datos ONLINE');
    }
  );

  app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000...');
  });
}
