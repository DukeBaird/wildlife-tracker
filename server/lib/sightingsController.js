// const mongoose = require('mongoose');

const Sighting = require('../models/Sighting.js');

//Create test sighting
const test = Sighting({
	animal: 'Poof',
	location: 'Deck',
	time: 'Now'
});

// Get all sightings in the database
exports.getSightings = function () {
	console.log('Getting Sightings...');
	return Sighting.find({});
	//return test;
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
