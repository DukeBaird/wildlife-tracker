const express = require("express");
const passport = require("passport");
const session = require("express-session");
const router = express.Router();

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const sighting = require ('./sightingsController.js');

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
	})
});

router.route('/sighting')
	.get(sighting.getSightings)
	.put(sighting.addSighting);

// router.route('/sighting/:sightingID')
// 	.delete(sighting.deleteSighting);


module.exports = router;
