const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	time: Date
});

userSchema.methods.summary = function summary() {
	return `${username} - ${firstName} ${lastName}`;
};

userSchema.methods.generateHash = function generateHash(password) {
	const salt = bcrypt.genSaltSync(8);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

userSchema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
