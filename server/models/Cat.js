const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
	name: String
});

catSchema.methods.meow = function meow() {
	return `meow${this.name}meow`;
};

module.exports = mongoose.model('Cat', catSchema);
