const db = require("../models");
const Log = require('../models/fitness.js');

// Defining methods for the booksController
module.exports = {
  findData: function(req, res) {
    db.Log
      .find({localID: req.params.id, date: req.params.date})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    db.Log
      .findOneAndUpdate({ _id: req.params.id, date: req.params.date }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Log
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
