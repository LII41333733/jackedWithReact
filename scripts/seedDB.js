const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/jackedWithReact"
);

const fitnessSeed = [
  {
    username: "LII41333733",
    date: "January 8, 2019",
    // moment().format('LL');  
    workoutData: {
      workoutName: "Chest and Back Day",
      exercises: [{
        exercise: "Chest Press",
        sets: 3,
        reps: 12,
        section: "chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      }]
    },
    nutritionData: {
      target: 2000,
      items: [{
        item: "Bacon and Eggs",
        kcal: 400
      }]
    },
    waterData: {
      consumed: 4,
      target: 8
    }
  }
];

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
