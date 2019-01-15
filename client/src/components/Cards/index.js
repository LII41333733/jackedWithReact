import React from "react";

export function WorkoutCard(props) {

  return (
    <div className={`workout-card text-center`}>
      <h4>TODAY'S WORKOUT</h4>
      {<h3 className="my-3">{props.workoutName}</h3>}
      <table className="workout-table mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Exercise</th>
            <th>Sets x Reps</th>
          </tr>
        </thead>
        <tbody>
          {props.exercises}
        </tbody>
      </table>
    </div>
  );
}

export function WaterCard(props) {
  return (
    <div className={`water-card d-flex mx-auto ${props.size}`}>
      <h5 className="mx-auto">{props.remaining} GLASSES TO GO</h5>
      {props.cups}
    </div>
  );
}

export function NutritionCard(props) {
  return (
    <div className={`nutrition-card text-center`}>
      <h5 className="">CALORIE TARGET</h5>
      <h5 className={`mb-3`}>{props.target}</h5>
      <h5 className={""}>CURRENT CALORIES</h5>
      <h5 className={`${props.status}`}>{props.current}</h5>
      {/* <h5 className="mb-4">{props.consumed}</h5> */}
      

      <table className="nutrition-table mx-auto">
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Calories</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {props.items}
        </tbody>
      </table>
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
