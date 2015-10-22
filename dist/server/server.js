'use strict';

(function () {
    'use strict';

    var express = require('express'),
        path = require('path'),
        app = express(),
        rootUrl = path.resolve(__dirname, '../..'),
        occupations = ['programmer', 'plumber', 'freelancer', 'data analyst', 'dancer', 'lighting designer', 'producer', 'sailor', 'astronaut', 'astrophysicist', 'journalist', 'poet', 'butcher', 'milkman', 'author'];

    app.listen(1235);

    app.use(express['static'](rootUrl + '/dist/client'));
    app.use('/angular', express['static'](rootUrl + '/node_modules/angular'));
    app.use('/bootstrap', express['static'](rootUrl + '/node_modules/bootstrap'));
    app.use('/moment', express['static'](rootUrl + '/node_modules/moment'));

    app.get('/search/occupation', function (request, response) {
        var searchString = request.query.string,
            results = [];

        for (var i = 0; i < occupations.length; i++) {
            if (occupations[i].indexOf(searchString.toLowerCase()) >= 0) {
                results.push(occupations[i]);
            }
        }

        response.writeHead(200, {
            'Content-type': 'application/json'
        });
        response.end(JSON.stringify(results));
    });

    app.get('/', function (request, response) {
        response.sendFile(rootUrl + '/dist/client/index.html');
    });
})();