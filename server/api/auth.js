const express = require('express');
const passport = require('passport');
const logger = require('../lib/logger.js');

const session = require('express-session');

const router = express.Router()

function signUp(req, res, next) {
	try {
		passport.authenticate('local-signup', function(err, user, info) {
			if (!user) {
				res.status(409).json({
					err: "User already exists"
				});
			} else {
				req.logIn(user, function(err) {
					res.redirect('/');
				});
			}
		})(req, res, next);
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			error: err
		})
	}
};

router.post('/signup', signUp);

router.post('/login', function(req, res, next) {
	passport.authenticate('local-login', function(err, user, info) {
		if (user) {
			req.logIn(user, function(err) {
				return res.redirect('/');
			});
		} else {
			// invalid user/password
			return res.redirect('/login');
		}
	})(req, res, next);
});

exports.router = router;
