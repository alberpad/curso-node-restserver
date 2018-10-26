namespace routes.login {
  const express = require('express');
  const bcrypt = require('bcrypt');
  const jwt = require('jsonwebtoken');
  const _ = require('underscore');
  const Usuario = require('../models/usuario');

  // import express from 'express';
  // import bcrypt from 'bcrypt';
  // import jwt from 'jsonwebtoken';
  // import _ from 'underscore';
  // import Usuario from '../models/usuario';

  const app = express();
  app.post('/login', (req: any, res: any) => {
    let body = req.body; //aquí tenemos email y password
    Usuario.findOne({ email: body.email }, (err: any, usuarioDB: any) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      if (!usuarioDB) {
        return res.status(400).json({
          ok: false,
          err: {
            message: '(Usuario) o contraseña incorrectos'
          }
        });
      }
      if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Usuario o (contraseña) incorrectos'
          }
        });
      }
      let token = jwt.sign(
        {
          usuario: usuarioDB //Esto es el payload
        },
        process.env.SEED,
        { expiresIn: process.env.CADUCIDAD_TOKEN }
      );

      res.json({
        ok: true,
        usuario: usuarioDB,
        token
      });
    });
  });

  // export default app;
  module.exports = app;
}
