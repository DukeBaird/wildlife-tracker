/* eslint no-tabs: 0 */
// no tabs disabled because of all the commented code

const express = require('express');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();

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

router.use(passport.initialize());
router.use(passport.session());

router.get('/', (req, res) => {
	res.sendFile('index.html', {
		root: './dist'
	});
});

module.exports = router;
