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
    workoutName: "Chest and Back",
    exercises: [
      {
        exercise: "Chest Press",
        sets: 3,
        reps: 12,
        section: "Chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      },
      {
        exercise: "Incline Dumbbell Fly",
        sets: 4,
        reps: 8,
        section: "Chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      },
      {
        exercise: "Close-Grip Bench Press",
        sets: 5,
        reps: 5,
        section: "Chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      },
      {
        exercise: "Decline Press",
        sets: 3,
        reps: 12,
        section: "Chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      },
      {
        exercise: "Wide Push-Ups",
        sets: "3",
        reps: "10",
        section: "Chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      },
      {
        exercise: "Hammer Strength Machine Press",
        sets: 5,
        reps: 10,
        section: "Chest",
        notes: "We a bit light today. Will go heavier next workout.",
        weights: [65, 70, 75]
      },

    ],
    calorieTarget: 2000,
    items: [
      {
        item: "Bacon and Eggs",
        calories: 400
      },
      {
        item: "Chicken Lentil Soup",
        calories: 350
      },
      {
        item: "Small salad w/ Balsamic Dressing",
        calories: 200
      },
      {
        item: "Martini",
        calories: 100
      }
    ],
    waterConsumed: 4,
    waterTarget: 8
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
