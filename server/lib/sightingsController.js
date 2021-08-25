const Sighting = require('../models/Sighting.js');
const logger = require('./logger.js');

// Create test sighting
/* const test = Sighting({
	animal: 'Poof',
	location: 'Deck',
	time: 'Now'
}); */

// Get all sightings in the database
exports.getSightings = (searchOpts = {}) => {
	logger.info('Getting Sightings...');
	const query = queryBuilder(searchOpts);
	return Sighting.find(query);
	// return test;
};

// Create a new sighting
exports.addSighting = (newSight) => {
	logger.info('Saving Sighting...');
	const newSightModel = new Sighting(newSight);

	newSightModel.save()
		.then((result) => {
			logger.info('Success Save - sightingsController');
			return result;
		})
		.catch((err) => {
			logger.error('Error in Save - sightingsController');
			logger.error(err);
			return err;
		});
};

// Delete a sighting
exports.deleteSighting = (sightingId) => {
	logger.info(`Deleting Sighting ${sightingId}`);
	return Sighting.findByIdAndDelete(sightingId);
};

function queryBuilder(searchOpts) {
	const query = {};

	if (searchOpts.id) {
		logger.info('Adding id to query');
		query.spottedBy = { $in: searchOpts.id };
	}

	if (searchOpts.animal) {
		logger.info('Adding animal to query');
		query.animal = { $in: searchOpts.animal };
	}

	if (searchOpts.location) {
		logger.info('Adding location to query');
		query.spottedBy = { $in: searchOpts.location };
	}

	return query;
};