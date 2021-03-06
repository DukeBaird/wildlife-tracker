const Sighting = require('../models/Sighting.js');
const logger = require('./logger.js');

exports.queryBuilder = (searchOpts) => {
	const query = {};

	if (searchOpts.id) {
		query.spottedBy = { $in: searchOpts.id };
	}

	if (searchOpts.animal) {
		query.animal = { $in: searchOpts.animal };
	}

	if (searchOpts.location) {
		query.location = { $in: searchOpts.location };
	}

	return query;
};

// Get all sightings in the database
exports.getSightings = (searchOpts = {}) => {
	logger.info('Getting Sightings...');
	const query = exports.queryBuilder(searchOpts);
	const showLimit = 5;
	let skips = 0;

	if (searchOpts.page) {
		logger.info(`On page ${searchOpts.page}`);
		skips = searchOpts.page * showLimit;
		logger.info(`Skipping ${skips}`);
	}

	return Sighting.find(query).sort({ time: 1 }).skip(skips).limit(showLimit);
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
