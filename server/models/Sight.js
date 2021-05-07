const mongoose = require('mongoose');

const sightSchema = new mongoose.Schema({
    _id: String,
    animal: String,
    time: Date,
    location: String,
    spottedBy: String
});

sightSchema.methods.summary = function() {
    return `On ${this.time}, saw a ${this.animal} at ${this.location}`;
};

module.exports = mongoose.model('Sight', sightSchema);
