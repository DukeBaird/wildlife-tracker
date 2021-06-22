// const mongoose = require('mongoose');

const Sighting = require('../models/Sighting.js');
const logger = require('./logger.js');

// Create test sighting
/* const test = Sighting({
	animal: 'Poof',
	location: 'Deck',
	time: 'Now'
}); */

// Get all sightings in the database
exports.getSightings = function (pagination = {}, filter = {}) {
	logger.log('Getting Sightings...');
	logger.log(`Using some variables so lint doesn't scream: ${pagination}, ${filter}`);
	return Sighting.find({});
	// return test;
};

// Create a new sighting
exports.addSighting = (newSight) => {
	logger.log('Saving Sighting...');
	return newSight.save();
};

// Delete a sighting
exports.deleteSighting = (sightingId) => {
	logger.log(`Deleting Sighting ${sightingId}`);
	return Sighting.findByIdAndDelete(sightingId);
};
