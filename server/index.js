const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config');
const routes = require('./routes/routes');
//const Sight = require('./models/Sight');

const app = express();

const Cat = new require('./models/Cat.js');
const Sight = new require ('./models/Sight.js');

function start() {
	app.set('port', (process.env.PORT || 8080));
	app.use(express.static(__dirname + './dist'));
	app.use(bodyParser.json());

	app.use(logger('common'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(function(req, res, next) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Cache-Control', 'no-cache');
		next();
	});

	app.use('/', routes);
	// app.use('/api/v1', api.router);

	// This should end up having 2 connections, one for "prod", and one for development
	mongoose.connect((process.env.MONGOSTRING || config.dbConnectionString), {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, function(err) {
		if (err) {
			console.log('Mongo Connection Error', err);
		} else {
			console.log('Mongo Connection Successful');

			// Test db connection
			const poofy = new Cat({ name: 'PoofyCat' });
			poofy.save((err, poofy) => {
			console.log(poofy.meow());
			});

			const currentTime = new Date();
			const matilda = new Sight({ animal: 'Cat', time: currentTime, location: 'Desk'});
			matilda.save((err, matilda) => {
				console.log(matilda.summary());
			});

		}
	});

	// passport is for user auth
	// require('./lib/passport.js')(passport);

	app.listen(app.get('port'), function() {
		console.log('Server running on localhost:' + app.get('port'));
	});
}

exports.start = start;