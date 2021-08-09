const config = require('../config.js');
const express = require('express');
const passport = require('passport');
const logger = require('../lib/logger.js');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const session = require('express-session');

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
	passport.authenticate('local-signup', function callback (err, user, info) {
		if (!user) {
			logger.info(`Using ${info} to please lint`);
			logger.error("The user already exists");
			res.status(409).json({
				user: null,
				err: "User already exists"
			});
		} else {
			logger.info("Adding user");
			req.logIn(user, function(err) {
				if (err) {
					logger.error(err);
					return res.status(400).json({
						data: null,
						error: err
					});
				} else {
					return res.status(201).json({
						user: user,
						error: null
					});
				};
			});
		}
	})(req, res, next);
};

router.post('/signup', signUp);

function login(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (user) {
			logger.info(user);
			req.login(user, function(err) {
				if (err) {
					logger.error("Auth.js login function error");
					logger.error(err);
					return res.status(400).json({
						data: null,
						error: err
					});
				} else {
					logger.info("Auth.js login function success");
					return res.status(200).json({
						data: user,
						error: null
					});
				}
			});

		} else {
			// invalid user/password
			logger.error("Unable to authenticate login - auth.js");
			return res.status(401).json({
				data: null,
				error: "Invalid username/password"
			});
		}
	})(req, res, next);
};

router.post('/login', login);

function logout(req, res) {
	logger.info("Auth.js is logging user out")
	req.logout();
	logger.info("Auth.js logout complete");
	try {
		res.status(200).json({
			data: "Logged User Out",
			error: null
		});
	} catch (err) {
		res.status(500).json({
			data: null,
			error: err
		});
	};
};

router.get('/logout', logout);

exports.router = router;
