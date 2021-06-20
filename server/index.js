const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const accessLogger = require('morgan');
const mongoose = require('mongoose');
// const passport = require('passport');
const logger = require('./lib/logger.js');

/* eslint-disable import/no-unresolved */
const config = require('./config');
/* eslint-enable import/no-unresolved */

const routes = require('./routes/routes');

const app = express();

function start() {
	app.set('port', (process.env.PORT || 8080));
	app.use(express.static(`${__dirname}./dist`));
	app.use(bodyParser.json());

	app.use(accessLogger('common'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use((req, res, next) => {
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
	}, (err) => {
		if (err) {
			logger.error(`Mongo Connection Error: ${err}`);
		} else {
			logger.info('Mongo Connection Successful');
		}
	});

	// passport is for user auth
	// require('./lib/passport.js')(passport);

	app.listen(app.get('port'), () => {
		logger.info(`Server running on localhost:${app.get('port')}`);
	});
}

exports.start = start;
