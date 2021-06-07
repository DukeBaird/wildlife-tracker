const express = require('express');
const Sighting = require('../models/Sighting.js');
const sightingsController = require('../lib/sightingsController.js');

const router = express.Router();

// TODO: Adjust API to return data or err instead of unnamed JSON
async function getSightings(req, res) {
	try {
		const result = await sightingsController.getSightings();
		console.log('got sightings!');
		res.status(200).json(result);
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
}

router.get('/sighting', getSightings);

async function addSighting(req, res) {
	const newSight = new Sighting(req.body);

	try {
		const result = await sightingsController.addSighting(newSight);
		res.status(201).json({ message: 'Save Success', data: result });
	} catch (err) {
		res.status(500).json(err);
	}
}

router.post('/sighting', addSighting);

function deleteSighting(req, res) {
	const { id } = req.params;

	try {
		const result = sightingsController.deleteSighting(id);
		res.status(204).json({ message: 'Sighing successfully deleted', data: result });
	} catch (err) {
		res.status(500).json(err);
	}
}

router.put('/sighting/id', deleteSighting);

exports.router = router;
