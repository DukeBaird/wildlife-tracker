const mongoose = require('mongoose');

const Sighting = require('../models/Sighting.js');
const logger = require('./logger.js');

// Create test sighting
/* const test = Sighting({
	animal: 'Poof',
	location: 'Deck',
	time: 'Now'
}); */

// Get all sightings in the database
exports.getSightings = function (searchOpts = {}) {
	logger.info('Getting Sightings...');
	logger.info(`Using some variables so lint doesn't scream: ${searchOpts}`);
	return Sighting.find({});
	// return test;
};

// Create a new sighting
exports.addSighting = (newSight) => {
	logger.info('Saving Sighting...');
	logger.info(newSight);
	logger.info("Parsing newSight");
	for (key in newSight) {
		logger.info(`Key: ${key}: ${newSight[key]}`)
	};

	logger.info();
	const newSightModel = new Sighting(newSight);
	
	newSightModel.save()
	.then((result) => {
		logger.info("Success Save - sightingsController");
		return result
	})
	.catch((err) => {
		logger.error("Error in Save - sightingsController");
		logger.error(err)
		return err
	});
};

// Delete a sighting
exports.deleteSighting = (sightingId) => {
	logger.info(`Deleting Sighting ${sightingId}`);
	return Sighting.findByIdAndDelete(sightingId);
};
