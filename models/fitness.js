const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fitnessSchema = new Schema({
  username: { type: String, required: true },
  fitnessData: [
    {
      date: { type: String, required: true },
      workoutName: String,
      exercises: [{
        exercise: String,
        sets: Number,
        reps: Number,
        completed: [{
          repsDone: Number,
          weightUsed: Number
        }],
      }],
      note: String,
      calorieTarget: Number,
      items: [{
        item: String,
        calories: Number
      }],
      waterConsumed: Number,
      waterTarget: Number
    }
  ]
});

const Log = mongoose.model("Log", fitnessSchema);

module.exports = Log;
