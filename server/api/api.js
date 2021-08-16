const express = require('express');
const passport = require('passport');
const MongoStore = require('connect-mongo');
const sightingsController = require('../lib/sightingsController.js');
const logger = require('../lib/logger.js');

const session = require('express-session');

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
		if (!req.user) {
			logger.error('Attempted to add sighting while not logged in');
			return res.status(401).json({
				data: null,
				error: 'No user logged in'
			});
		}

		const sighting = req.body;
		sighting.spottedBy = req.user.username;

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
