const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');
const accessLogger = require('morgan');
const passport = require('passport');
const mongoose = require('mongoose');
const logger = require('./lib/logger.js');

/* eslint-disable import/no-unresolved */
const config = require('./config');
/* eslint-enable import/no-unresolved */

const routes = require('./routes/routes');
const api = require('./api/api.js');
const auth = require('./api/auth.js');

const app = express();

function start() {
	app.set('port', (process.env.PORT || 8080));
	app.use(express.static(`${__dirname}./dist`));
	// app.use('/images', express.static(`${__dirname}../client/src/images`));
	app.use(bodyParser.json());

	app.use(accessLogger('common'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Cache-Control', 'no-cache');
		next();
	});

	app.use('/api/v1', api.router);
	app.use('/auth/v1', auth.router);
	app.use('/', routes);

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
	/* eslint-disable global-require */
	require('./lib/passport.js')(passport);
	/* eslint-enable global-require */

	app.listen(app.get('port'), () => {
		logger.info(`Server running on localhost:${app.get('port')}`);
	});
}

exports.start = start;
