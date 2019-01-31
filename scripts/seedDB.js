const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/jackedwithreact"
);

const fitnessSeed = [
  {
    username: "LII41333733",
    fitnessData: [
      {
        date: "",
        workoutName: "",
        exercises: [],
        calorieTarget: "",
        note: "",
        items: [],
        waterConsumed: "",
        waterTarget: ""
      }]
  }
]

db.Log
  .remove({})
  .then(() => db.Log.collection.insertMany(fitnessSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
