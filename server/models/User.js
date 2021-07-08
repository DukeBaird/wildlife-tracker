const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	time: Date,
});

sightingSchema.methods.summary = function summary() {
	return `${username} - ${firstName} ${lastName}`;
};

module.exports = mongoose.model('User', userSchema);