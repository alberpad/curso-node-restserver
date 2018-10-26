// PUERTO
process.env.PORT = process.env.PORT || '3000';

// ENTORNO
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = '30d';

// SEED de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// BASE DE DATOS
let urlDB: string;
if (process.env.NODE_ENV === 'dev') {
  urlDB = 'mongodb://localhost:27017/cursonode-restserver';
} else {
  urlDB = <string>process.env.MONGO_URI;
}
// Creamos una variable de enviorement MIURLDB
process.env.MIURLDB = urlDB;
