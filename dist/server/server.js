'use strict';

(function () {
    'use strict';

    var express = require('express'),
        path = require('path'),
        app = express(),
        rootUrl = path.resolve(__dirname, '../..');

    console.log(rootUrl + '/dist/client');

    app.use(express['static'](rootUrl + '/dist/client'));
    app.use('/angular', express['static'](rootUrl + '/node_modules/angular'));
    app.use('/bootstrap', express['static'](rootUrl + '/node_modules/bootstrap'));
    app.use('/moment', express['static'](rootUrl + '/node_modules/moment'));

    app.listen(1235);

    app.get('/', function (request, response) {
        response.sendFile(rootUrl + '/dist/client/index.html');
    });
})();