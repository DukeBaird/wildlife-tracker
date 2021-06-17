// const mongoose = require('mongoose');

const Sighting = require('../models/Sighting.js');

// Create test sighting
/* const test = Sighting({
	animal: 'Poof',
	location: 'Deck',
	time: 'Now'
}); */

// Get all sightings in the database
exports.getSightings = function (pagination = {}, filter = {}) {
	console.log('Getting Sightings...');
	console.log(`Using some variables so lint doesn't scream: ${pagination}, ${filter}`);
	return Sighting.find({});
	// return test;
};

// Create a new sighting
exports.addSighting = (newSight) => {
	console.log('Saving Sighting...');
	return newSight.save();
};

// Delete a sighting
exports.deleteSighting = (sightingId) => {
	console.log(`Deleting Sighting ${sightingId}`);
	return Sighting.findByIdAndDelete(sightingId);
};
