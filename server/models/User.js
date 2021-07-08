const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	time: Date,
});

userSchema.methods.summary = function summary() {
	return `${username} - ${firstName} ${lastName}`;
};

userSchema.methods.generateHash = function generateHash(password) {
	return bcrypt.hashSync(password, brcypt.genSaltSync(8), null);
};

userSchema.methods.isValidPassword = function isValidPassword(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
