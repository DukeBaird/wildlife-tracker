/* eslint no-tabs: 0 */
// no tabs disabled because of all the commented code

const config = require('../config.js');
const express = require('express');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

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

router.get('/', (req, res) => {
	if (req.user) {
		console.log("Logged In");
		res.sendFile('index.html', {
			root: './dist',
		});
	} else {
		console.log("Not logged in")
		res.sendFile('index.html', {
			root: './dist'
		});
	}
});

module.exports = router;
