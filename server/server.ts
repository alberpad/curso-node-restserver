require('./config/config');
const express = require('express');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.get('/', function(req: any, res: any) {
  res.json('Hola Mundo');
});

app.get('/usuario', function(req: any, res: any) {
  res.json('get usuario');
});
app.post('/usuario', function(req: any, res: any) {
  let body = req.body;
  if (body.nombre == undefined) {
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre es necesario'
    });
  } else {
    res.json({
      persona: body
    });
  }
});
app.put('/usuario/:id', function(req: any, res: any) {
  let id = req.params.id;
  res.json({
    id
  });
});
app.delete('/usuario', function(req: any, res: any) {
  res.json('delete usuario');
});

app.listen(process.env.PORT, () => {
  console.log('Escuchando en el puerto 3000...');
});
