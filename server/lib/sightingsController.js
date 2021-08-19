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
	logger.info(searchOpts);
	logger.info('Getting Sightings...');
	const query = {};

	logger.info(Object.keys(searchOpts));

	if (searchOpts.id) { // This can be reused for various searchOpts - currently id only
		logger.info('sightingsController calling with searchOpts');
		query.spottedBy = {$in : searchOpts.id};
		return Sighting.find(query);
	}

	return Sighting.find({});
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
