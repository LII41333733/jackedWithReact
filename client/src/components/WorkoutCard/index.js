import React from "react";

export default function WorkoutCard(props) {



  return (
    <div className={`workout-card text-center`}>
      {<p>{props.username}</p>}
      {<p>{props.foodTarget}</p>}
      {<p>{props.waterDrank}</p>}
      {<p>{props.waterTarget}</p>}
      {<p>{props.workoutName}</p>}
      {<p>{props.foodArray}</p>}
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
