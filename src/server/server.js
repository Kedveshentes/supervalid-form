(function () {
    'use strict';

    let express     = require('express'),
        path        = require('path'),
        moment      = require('moment'),
        bodyParser  = require('body-parser'),
    	app         = express(),
        rootUrl     = path.resolve(__dirname, '../..'),
        occupations = [
        	'programmer', 'plumber', 'freelancer', 'data analyst',
            'dancer', 'lighting designer', 'producer', 'sailor',
            'astronaut', 'astrophysicist', 'journalist',
            'poet', 'butcher', 'milkman', 'author'
        ];

    app.listen(1235);

    app.use(bodyParser.json());
    app.use(express.static(`${rootUrl}/dist/client`));
    app.use('/angular'  , express.static(`${rootUrl}/node_modules/angular`));
    app.use('/bootstrap', express.static(`${rootUrl}/node_modules/bootstrap`));
    app.use('/moment'   , express.static(`${rootUrl}/node_modules/moment`));


    app.get('/search/occupation', function (request, response) {
    	let searchString = request.query.string,
    		results      = [];

        occupations.forEach((element, index, array) => {
            if (array[index].indexOf(searchString.toLowerCase()) >= 0) {
                results.push(array[index]);
            }
        });

    	response.writeHead(200, {
    		'Content-type' : 'application/json'
    	});
    	response.end(JSON.stringify(results));
    });

    app.post('/userdata', function (request, response) {
    	let isValid           = true,
    		momentOfBirth     = moment(request.body.date),
    		aMoment18YearsAgo = moment().subtract(18, 'years');

    	if (request.body.email && !request.body.email.match(/^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/)) {
    		isValid = false;
    	}

    	if (request.body.date && momentOfBirth > aMoment18YearsAgo) {
    		isValid = false;
    	}

    	if (isValid) {
    		response.writeHead(200, {
    			'Content-type' : 'text/plain'
    		});
    		response.end('success');
    	} else {
    		response.writeHead(403, {
    			'Content-type' : 'text/plain'
    		});
    		response.end('forbidden');
    		// The client side validation has been passed
    	}

    });

    app.get('/', function (request, response) {
    	response.sendFile(`${rootUrl}/dist/client/index.html`);
    });
}());
