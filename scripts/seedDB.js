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

    ]
    },
    nutritionData: {
      target: 2000,
      items: [
        {
          item: "Bacon and Eggs",
          kcal: 400
        },
        {
          item: "Chicken Lentil Soup",
          kcal: 350
        },
        {
          item: "Small salad w/ Balsamic Dressing",
          kcal: 200
        },
        {
          item: "Martini",
          kcal: 100
        }
      ]
    },
    waterData: {
      consumed: 4,
      target: 8
    }
  },
  {
    username: "mfisher36",
    date: "January 9, 2019",
    // moment().format('LL');  
    workoutData: {
      workoutName: "Back and Bicep Day",
      exercises: [{
        exercise: "Bent-over Row",
        sets: 3,
        reps: 12,
        section: "back",
        notes: "We went SO HEAVY today. Will go even heavier next workout!",
        weights: [100, 170, 175]
      }]
    },
    nutritionData: {
      target: 3000,
      items: [{
        item: "Bacon and Eggs",
        kcal: 400
      }, {
        item: "Steak and Bacon",
        kcal: 600
      }]
    },
    waterData: {
      consumed: 8,
      target: 16
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
