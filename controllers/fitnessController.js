const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findData: function(req, res) {
    db.Log
      .find({username: req.params.username, date: req.params.date})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Log
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Log
      .findOneAndUpdate({ username: req.params.username, date: req.params.date }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Log
      .find({ username: req.params.username, date: req.params.date})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
