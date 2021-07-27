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
				err: "User already exists"
			});
		} else {
			logger.info("Adding user");
			req.logIn(user, function(err) {
				res.redirect('/');
			});
		}
	})(req, res, next);
};

router.post('/signup', signUp);

function login(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (user) {
			req.login(user, function(err) {
				if (err) {
					logger.error(err);
				} else {
					return res.redirect('/');
				}
			});
		} else {
			// invalid user/password
			return res.redirect('/');
		}
	})(req, res, next);
};

router.post('/login', login);


exports.router = router;
