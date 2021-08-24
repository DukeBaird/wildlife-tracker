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
	const showLimit = 5;
	let skips = 0;

	if (searchOpts.page) {
		logger.info(`On page ${searchOpts.page}`);
		skips = searchOpts.page * showLimit;
		logger.info(`Skipping ${skips}`);
	};

	return Sighting.find({}).sort( {time: 1} ).skip(skips).limit(showLimit);
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
