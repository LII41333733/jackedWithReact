import React from "react";

export function WorkoutCard(props) {

  return (
    <div className={`workout-card text-center`}>
    <h4>TODAY'S WORKOUT:</h4>
      {<h3 className="mt-3">{props.workoutName}</h3>}
      {props.exercises}
    </div>

  );

}

export function WaterCard(props) {

  return (
    <div className={`workout-card text-center`}>
    <h4>{props.remaining} GLASSES TO GO:</h4>
      {props.cups}
    </div>

  );

}





// data._id
// data.date
// data.username
// data.nutritionData.target
// data.nutritionData.items[x].item
// data.nutritionData.items[x].kcal
// data.waterData.consumed
// data.waterData.target
// data.workoutData.workoutName
// data.workoutData.exercises[x].exercise
// data.workoutData.exercises[x].notes
// data.workoutData.exercises[x].reps
// data.workoutData.exercises[x].sets
// data.workoutData.exercises[x].section
// data.workoutData.exercises[x].weights[y]
