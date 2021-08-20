const express = require('express');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const session = require('express-session');
const logger = require('../lib/logger.js');
const sightingsController = require('../lib/sightingsController.js');

/* eslint-disable import/no-unresolved */
const config = require('../config.js');
/* eslint-enable import/no-unresolved */

const router = express.Router();

router.use(session({
	secret: 'nothingiswrongwithpinappleonpizza',
	resave: false,
	saveUninitialized: true,
	store: MongoStore.create({
		mongoUrl: process.env.MONGOSTRING || config.dbConnectionString
	})
}));

router.use(passport.initialize());
router.use(passport.session());

async function getSightings(req, res) {
	try {
		const result = await sightingsController.getSightings();
		logger.info('got sightings!');
		return res.status(200).json({
			data: result,
			error: null
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			data: null,
			error: err
		});
	}
}

router.get('/sighting', getSightings);

async function addSighting(req, res) {
	try {
		// Ensure user exists
		if (!req.user) {
			logger.error('Attempted to add sighting while not logged in');
			return res.status(401).json({
				data: null,
				error: 'No user logged in'
			});
		}

		const sighting = req.body;

		// Ensure all input fields were filled out
		if (!sighting.animal || !sighting.location) {
			logger.error('Missing sighting information');
			return res.status(500).json({
				data: null,
				error: 'Missing animal or location'
			});
		}

		/* eslint-disable no-underscore-dangle */
		sighting.spottedBy = req.user._id;
		/* eslint-enable no-underscore-dangle */

		const result = await sightingsController.addSighting(sighting);
		return res.status(201).json({
			data: result,
			error: null
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			data: null,
			error: err
		});
	}
}

router.post('/sighting', addSighting);

async function deleteSighting(req, res) {
	const { id } = req.params;
	logger.info(id);

	try {
		const result = await sightingsController.deleteSighting(id);
		return res.status(200).json({
			data: result,
			error: null
		});
	} catch (err) {
		logger.error(err);
		return res.status(500).json({
			data: null,
			error: err
		});
	}
}

router.delete('/sighting/:id', deleteSighting);

exports.router = router;
