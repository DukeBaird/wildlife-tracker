var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const logger = require('../lib/logger.js');
var crypto = require('crypto');

var User = new require('../models/User.js');

module.exports = function() {
	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, callback) {
		process.nextTick(function() {
			username = username.toLowerCase();

			User.findOne({ username: username }).then(exists => {
				if (exists) {
					logger.error("This user exists!");
					return callback(null, False);
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
							return callback(null, newUser);
						};
					});

				};
			}).catch(err => {
				logger.error("Unable to find user");
				return callback(err);
			});
		})
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		asswordField: 'password',
		passReqToCallback: true
	}, function (req, username, password, callback) {
		username = username.toLowerCase();
		User.findOne({ 'username': username }).then(user => {
			if (!user) {
				return callback(null, false);
			}

			if (!user.isValidPassword(password)) {
				return callback(null, false)
			}

			return callback(null, user);
			
		}).catch(err => {
			return callback(err);
		});

	}));
};
