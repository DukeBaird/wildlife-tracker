const express = require('express');
const passport = require('passport');
const logger = require('../lib/logger.js');

const session = require('express-session');



const router = express.Router()

router.use(passport.initialize());
router.use(passport.session());

function signUp(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info) {
		if (!user) {
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
