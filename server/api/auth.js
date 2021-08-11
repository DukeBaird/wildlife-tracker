const express = require('express');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const session = require('express-session');
const config = require('../config.js');
const logger = require('../lib/logger.js');

const router = express.Router();

router.use(session({
	secret: 'nothingiswrongwithpinappleonpizza',
	resave: false,
	saveUninitialized: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGOSTRING || config.dbConnectionString
	})
}));

router.use(passport.initialize());
router.use(passport.session());

function signUp(req, res, next) {
	passport.authenticate('local-signup', (err, user, info) => {
		if (!user) {
			logger.info(`Using ${info} to please lint`);
			logger.error('The user already exists');
			res.status(409).json({
				user: null,
				err: 'User already exists'
			});
		} else {
			logger.info('Adding user');
			req.logIn(user, (loginErr) => {
				if (loginErr) {
					logger.error(loginErr);
					return res.status(400).json({
						data: null,
						error: loginErr
					});
				}

				return res.status(201).json({
					data: user,
					error: null
				});
			});
		}
	})(req, res, next);
}

router.post('/signup', signUp);

function login(req, res, next) {
	passport.authenticate('local-login', (err, user, info) => {
		if (err) {
			logger.error(err);
			return res.status(500).json({
				data: null,
				error: err
			});
		}

		if (user) {
			logger.info(`Using ${info} to please lint`);
			logger.info(user);

			return req.login(user, (loginErr) => {
				if (loginErr) {
					logger.error('Auth.js login function error');
					logger.error(loginErr);
					return next(loginErr);
				}

				logger.info('Auth.js login function success');
				return res.status(200).json({
					data: user,
					error: null
				});
			});
		}

		// invalid user/password
		logger.info('Unable to authenticate login - auth.js');
		return res.status(401).json({
			data: null,
			error: 'Invalid username/password'
		});
	})(req, res, next);
}

router.post('/login', login);

function logout(req, res) {
	logger.info('Auth.js is logging user out');
	req.logout();
	logger.info('Auth.js logout complete');
	try {
		res.status(200).json({
			data: 'Logged User Out',
			error: null
		});
	} catch (err) {
		res.status(500).json({
			data: null,
			error: err
		});
	}
}

router.get('/logout', logout);

exports.router = router;
