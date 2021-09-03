/* eslint no-tabs: 0 */
// no tabs disabled because of all the commented code

const express = require('express');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();

const MongoStore = require('connect-mongo');

/* eslint-disable import/no-unresolved */
const config = require('../config.js');
/* eslint-enable import/no-unresolved */

const logger = require('../lib/logger.js');

router.use(session({
	secret: 'nothingiswrongwithpinappleonpizza',
	resave: true,
	saveUninitialized: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGOSTRING || config.dbConnectionString
	})
}));

// router.get('/', adminFunctions.isLoggedIn(['user', 'admin']), function(req, res, next) {
// 	if (req.user) {
// 		res.render('index', {
// 			user: req.user,
// 			token: req.token
// 		});
// 	} else {
// 		res.render('login');
// 	}
// });

router.use(passport.initialize());
router.use(passport.session());

const path = require('path');

router.use('/images', express.static(path.join(__dirname, '../client/src/images')));

router.get('/', (req, res) => {
	if (req.user) {
		logger.info('Logged In - Routes.js');
		res.sendFile('index.html', {
			root: './dist',
		});
	} else {
		logger.info('Not logged in - Routes.js');
		res.sendFile('index.html', {
			root: './dist'
		});
	}
});

module.exports = router;
