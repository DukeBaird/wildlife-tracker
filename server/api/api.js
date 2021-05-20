import express from 'express';
import sightingsController from '../lib/sightingsController.js';
const router = express.Router();

// TODO: Adjust API to return data or err instead of unnamed JSON
function getSightings (req, res) {
	try {
		const result = sightingsController.getSightings();
		res.status(200).json(sight);
	} catch (err) {
		res.status(500).json(err);
	}
}

router.get('/sighting', getSightings);

function addSighting (req, res) {
	const newSight = new Sighting (req.body);
	
	try {
		const result = sightingsController.addSighting(newSight);
		res.status(201).json({ message: 'Save Success'});
	} catch (err) {
		res.status(500).json(err);
	};
}

router.post('/sighting', addSighting);

function deleteSighting (req, res) {
	const id = req.params.id;

	try {
		const result = sightingsController.deleteSighting(id);
		res.status(204).json({ message: 'Sighing successfully deleted' });
	} catch (err) {
		res.status(500),json(err);
	};
}

router.put('/sighting/id', deleteSighting);

exports.router = router;