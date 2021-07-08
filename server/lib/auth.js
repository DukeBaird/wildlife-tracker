var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var crypto = require('crypto');

var User = new require('../models/User.js');

module.exports = function() {
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, done) {
		process.nextTick(function() {
			username = username.toLowerCase();

			User.findOne({ 'username': username }).then(exists => {
				if (exists) {
					return done(null, False);
				} else {
					const newUser = new User();

					newUser.username = username;
					newUser.firstName = req.body.firstName;
					newUser.lastName = req.body.lastName;
					newUser.time = new Date()
					newUser.password = newUser.generateHash(password);

					newUser.save(err => {
						if (err) {
							throw err;
						} else {
							return done(null, newUser);
						};
					});

				};
			}).catch(err => {
				return done(err);
			});
		})
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		asswordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, done) {
		username = username.toLowerCase();
		User.findOne({ 'username': username }).then(user => {
			if (!user) {
				return done(null, false);
			}

			if (!user.isValidPassword(password)) {
				return done(null, false)
			}

			return done(null, user);
			
		}).catch(err => {
			return done(err);
		});

	}));
};
