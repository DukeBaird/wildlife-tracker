const express = require('express');
const sightingsController = require('../lib/sightingsController.js');
const logger = require('../lib/logger.js');

const router = express.Router();

async function getSightings(req, res) {
	try {
		const result = await sightingsController.getSightings();
		logger.info('got sightings!');
		res.status(200).json({
			data: result,
			error: null
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			data: null,
			error: err
		});
	}
}

router.get('/sighting', getSightings);

async function addSighting(req, res) {
	try {
		const result = await sightingsController.addSighting(req.body);
		res.status(201).json({
			data: result,
			error: null
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
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
		res.status(200).json({
			data: result,
			error: null
		});
	} catch (err) {
		logger.error(err);
		res.status(500).json({
			data: null,
			error: err
		});
	}
}

router.delete('/sighting/:id', deleteSighting);

exports.router = router;
