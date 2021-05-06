const mongoose = require('mongoose');

const sightSchema = new mongoose.Schema({
    animal: String,
    time: Date,
    location: String
});

sightSchema.methods.summary = function() {
    return `On ${this.time}, saw a ${this.animal} at ${this.location}`;
};

module.exports = mongoose.model('Sight', sightSchema);