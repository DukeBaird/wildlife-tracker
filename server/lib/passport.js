var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const logger = require('../lib/logger.js');
var crypto = require('crypto');

var User = new require('../models/User.js');

module.exports = function() {

	passport.serializeUser(function(user, done) {
		logger.info("Serializing User");
		done(null, user._id);
	});

	passport.deserializeUser(function(id, done) {
		logger.info("Deserializing User");
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, done) {
		process.nextTick(function() {
			username = username.toLowerCase();

			User.findOne({ username: username }).then(exists => {
				if (exists) {
					logger.error("This user exists!");
					return done(null, False);
				} else {
					logger.info(`creating new user: ${username}`);
					const newUser = new User();

					newUser.username = username;
					newUser.firstName = req.body.firstName;
					newUser.lastName = req.body.lastName;
					newUser.time = new Date()

					const hashPass = newUser.generateHash(password);
					newUser.password = hashPass;

					newUser.save(err => {
						if (err) {
							logger.error("Issue saving new user");
							throw err;
						} else {
							logger.info("Saved new user");
							return done(null, newUser);
						};
					});

				};
			}).catch(err => {
				logger.error("Unable to find user");
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
