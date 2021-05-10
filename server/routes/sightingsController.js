const mongoose = require('mongoose');
const Sighting = new require('../models/Sighting.js');

//Get all sightings in the database
exports.getSightings = function(req, res) {
    Sightings.find({}, function(err, sight) {
        if (err) return console.log(err);
        res.json(sight);
    })
};

//Create a new sighting
exports.addSighting = function(req, res) {
    const newSight = new Sighting(req.body);
    newSight.save(function(err, sight) {
        if (err) return console.log(err);
        res.json(sight);
    });
};

//Delete a sighting
exports.deleteSighting = function(req, res) {
    Sightings.remove({
        spottedBy: req.params.spottedBy,
        animal: reqs.params.animal
    }, function(err, sight) {
        if (err) return console.log(err);
        res.json({message: 'Sighting successfully deleted'})
    });
}