// const mongoose = require('mongoose');

const Sighting = require('../models/Sighting.js');

// Get all sightings in the database
exports.getSightings = function () {
	console.log('Getting Sightings...');
	return Sighting.find({});
};

// Create a new sighting
exports.addSighting = (newSight) => {
	console.log('Saving Sighting...');
	return newSight.save();
};

// Delete a sighting
exports.deleteSighting = (id) => {
	return Sighting.remove({
		id: id
	});
};
