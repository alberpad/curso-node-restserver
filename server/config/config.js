"use strict";
process.env.PORT = process.env.PORT || '3000';
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cursonode-restserver';
}
else {
    urlDB = process.env.MONGO_URI;
}
process.env.MIURLDB = urlDB;
//# sourceMappingURL=config.js.map