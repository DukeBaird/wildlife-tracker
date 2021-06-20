const mongoose = require('mongoose');

const sightingSchema = new mongoose.Schema({
	// _id: String,
	animal: String,
	time: Date,
	location: String,
	spottedBy: String
});

sightingSchema.methods.summary = function summary() {
	return `On ${this.time}, saw a ${this.animal} at ${this.location}`;
};

module.exports = mongoose.model('Sighting', sightingSchema);
