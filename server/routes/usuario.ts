const express_usuario = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app_usuario = express_usuario();

app_usuario.get('/usuario', function(req: any, res: any) {
  let desde: number = Number(req.query.desde) || 0;
  let limite: number = Number(req.query.limite) || 5;

  Usuario.find({ estado: true }, 'nombre email role estado google img')
    .skip(desde)
    .limit(limite)
    .exec((err: any, usuarios: any) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err
        });
      }
      Usuario.count({ estado: true }, (err: any, conteo: any) => {
        res.json({
          ok: true,
          usuarios,
          cuantos: conteo
        });
      });
    });
});

app_usuario.post('/usuario', function(req: any, res: any) {
  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role
  });

  usuario.save((err: any, usuarioDB: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    // usuarioDB.password = null;
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});
app_usuario.put('/usuario/:id', function(req: any, res: any) {
  let id = req.params.id;
  //la función pick de underscore permite seleccionar unos parámetros de un objeto
  //con la ventaja de que si no existe no se incluyen
  //Si fueramos a hacer esto con destructuración, los parámetros que no existieran en el objeto padre
  //serían destructurados como undefined, siempre y cuando se nombre claro
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
  console.log(body);
  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err: any, usuarioDB: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario: usuarioDB
    });
  });
});
app_usuario.delete('/usuario/:id', function(req: any, res: any) {
  let id = req.params.id;
  //Eliminación física
  // Usuario.findByIdAndRemove(id, (err: any, usuarioBorrado: any) => {
  //   if (err) {
  //     return res.status(400).json({
  //       ok: false,
  //       err
  //     });
  //   }
  //   if (!usuarioBorrado) {
  //     return res.status(400).json({
  //       ok: false,
  //       err: {
  //         message: 'Usuario no encontrado'
  //       }
  //     });
  //   }
  //   res.json({
  //     ok: true,
  //     usuario: usuarioBorrado
  //   });
  // });

  // Eliminación mediante bandera en la base de datos

  let cambiaEstado = {
    estado: false
  };

  Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err: any, usuarioBorrado: any) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err
      });
    }
    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
      });
    }
    res.json({
      ok: true,
      usuario: usuarioBorrado
    });
  });
});

module.exports = app_usuario;
