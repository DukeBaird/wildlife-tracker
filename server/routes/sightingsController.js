const mongoose = require('mongoose');
const Sighting = new require('../models/Sighting.js');

//Get all sightings in the database
exports.getSightings = function(req, res) {
    Sightings.find({}).then(sight => {
        res.status(200);
        res.json(sight);
    }).catch(err => {
        console.log(err);
    });
};

//Create a new sighting
exports.addSighting = function(req, res) {
    const newSight = new Sighting(req.body);
    newSight.save().then(sight=> {
        res.json(sight);
        res.status(201);
    }).catch(err => {
        if (err) return console.log(err);
    });
};

//Delete a sighting
exports.deleteSighting = function(req, res) {
    Sightings.remove({
        id: req.params.id
    }).then(() => {
        res.json({message: 'Sighting successfully deleted'})
        res.status(204);        
    }).catch(err => {
        if (err) return console.log(err);
    });
}
