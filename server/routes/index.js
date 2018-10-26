"use strict";
var routes;
(function (routes) {
    var index;
    (function (index) {
        const express = require('express');
        const app = express();
        app.use(require('./usuario'));
        app.use(require('./login'));
        module.exports = app;
    })(index = routes.index || (routes.index = {}));
})(routes || (routes = {}));
//# sourceMappingURL=index.js.map