// PUERTO
process.env.PORT = process.env.PORT || '3000';

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// BASE DE DATOS
let urlDB;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cursonode-restserver';
} else {
  urlDB = 'mongodb://cursonode-user:curso1234@ds139883.mlab.com:39883/cursonode-restserver';
}
// Creamos una variable de enviorement MIURLDB
process.env.MIURLDB = urlDB;
