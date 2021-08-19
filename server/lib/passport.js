/* eslint-disable no-underscore-dangle */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('./logger.js');

const User = require('../models/User.js');

module.exports = function () {
	passport.serializeUser((user, done) => {
		logger.info('Serializing User');
		done(null, user._id);
	});

	passport.deserializeUser((id, done) => {
		logger.info('Deserializing User');
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password',
		passReqToCallback: true
	}, (req, username, password, done) => {
		process.nextTick(() => {
			const lowerUsername = username.toLowerCase();

			User.findOne({ username: lowerUsername })
				.then((exists) => {
					if (exists) {
						logger.error('This user exists!');
						return done(null, false);
					}

					logger.info(`creating new user: ${lowerUsername}`);
					const newUser = new User();

					newUser.username = lowerUsername;
					newUser.firstName = req.body.firstName;
					newUser.lastName = req.body.lastName;
					newUser.registeredAt = new Date();

					const hashPass = newUser.generateHash(password);
					newUser.password = hashPass;

					return newUser.save((err) => {
						if (err) {
							logger.error('Issue saving new user');
							return err;
						}

						logger.info('Saved new user');
						return done(null, newUser);
					});
				})
				.catch((err) => {
					logger.error('Unable to find user');
					return done(err);
				});
		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'username',
		asswordField: 'password',
		passReqToCallback: true
	}, (req, username, password, done) => {
		const lowerUsername = username.toLowerCase();
		User.findOne({ username: lowerUsername })
			.then((user) => {
				if (!user) {
					return done(null, false);
				}

				if (!user.isValidPassword(password)) {
					return done(null, false);
				}

				return done(null, user);
			})
			.catch((err) => done(err));
	}));
};

/* eslint-enable no-underscore-dangle */
