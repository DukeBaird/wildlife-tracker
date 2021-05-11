const mongoose = require('mongoose');
const Sighting = new require('../models/Sighting.js');

//Get all sightings in the database
exports.getSightings = function(req, res) {
    console.log("Getting Sightings...");
    Sightings.find({}).then(sight => {
        res.status(200);
        res.json(sight);
    }).catch(err => {
        console.log(err);
    });
};

//Create a new sighting
exports.addSighting = function(req, res) {
    console.log("Saving Sighting...");
    const newSight = new Sighting(req.body);
    return newSight.save().then(() => {
        console.log("Saved!")
        res.status(201).json({message: 'Save Success'});
    }).catch(err => {
        console.log("Uh oh...");
        if (err) return console.log(err);
    });
};

//Delete a sighting
exports.deleteSighting = function(req, res) {
    Sightings.remove({
        id: req.params.id
    }).then(() => {
        res.status(204);
        res.json({message: 'Sighting successfully deleted'})        
    }).catch(err => {
        if (err) return console.log(err);
    });
}
