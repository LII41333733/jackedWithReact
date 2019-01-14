const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  username: { type: String, required: true },
  date: { type: String, required: true },
  localID: Number,
  workoutData: {
    workoutName: String,
    exercises: [{
      exercise: String,
      sets: Number,
      reps: Number,
      section: String,
      notes: String,
      weights: [Number]
    }]
  },
  nutritionData: {
    target: Number,
    items: [{
      item: String,
      kcal: Number
    }]
  },
  waterData: {
    consumed: Number,
    target: Number
  }

});

// const fitnessSchema = new Schema({
//   title: { type: String, required: true },
//   author: { type: String, required: true },
//   synopsis: String,
//   date: { type: Date, default: Date.now }
// });

const Log = mongoose.model("Log", fitnessSchema);

module.exports = Log;
