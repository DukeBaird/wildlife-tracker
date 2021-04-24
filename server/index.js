const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config');
const routes = require("./routes/routes");

const app = express();

function start() {
	app.set('port', (process.env.PORT || 8080));
	app.use(express.static(__dirname + "./dist"));
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

	// No database right now
	// mongoose.connect((process.env.MONGOSTRING || config.mongoString), {
	// 	useMongoClient: true
	// }, function(err) {
	// 	if (err) {
	// 		console.log('Mongo Connection Error', err);
	// 	} else {
	// 		console.log('Mongo Connection Successful');
	// 	}
	// });

	// passport is for user auth
	// require('./lib/passport.js')(passport);

	app.listen(app.get('port'), function() {
		console.log('Server running on localhost:' + app.get('port'));
	});
}

exports.start = start;