/* eslint no-tabs: 0 */
// no tabs disabled because of all the commented code

const express = require('express');
// const passport = require('passport');
// const session = require('express-session');

const router = express.Router();

// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo');
const sighting = require('../lib/sightingsController.js');

// router.use(session({
// 	secret: 'nothingiswrongwithpinappleonpizza',
// 	resave: true,
// 	saveUninitialized: true,
// 	store: new MongoStore({
// 		mongooseConnection: mongoose.connection
// 	})
// }));

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

router.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: './dist'
	});
});

/* 
router.route('/sighting')
	.get(sighting.getSightings)
	.post(sighting.addSighting); */

/* router.get('/sighting', function(req, res) {
	sighting.getSightings(req, res);
});

router.post('/sighting', function(req, res) {
	sighting.addSighting(req, req);
}); */

// router.route('/sighting/:sightingID')
// 	.delete(sighting.deleteSighting);

module.exports = router;
