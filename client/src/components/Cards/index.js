import React from "react";


export function WorkoutCard(props) {

  if (props.exercisesEntered) {
    if (props.exercisesEntered.length > 0) {

      return (
        <div className={`workout-card text-center`}>
          <h4>TODAY'S WORKOUT</h4>
          <h3 className="mt-3 mb-2 h4-reduced">{props.workoutName}</h3>
          <table className="workout-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Exercise</th>
                <th>Sets/Reps</th>
              </tr>
            </thead>
            <tbody>
              {props.exercises}
            </tbody>
          </table>
          {props.addButton}
          {props.editButton}
          {props.startButton}
        </div>
      );
    } else {
      return (
        <div className={`workout-card text-center`}>
          <h4>TODAY'S WORKOUT</h4>
          <h3 className="mt-3 mb-2 h4-reduced">{props.workoutName}</h3>
          {props.addButton}
        </div>
      )
    }
  } else {
    return null;
  }
}

export function NutritionCard(props) {

  if (props.itemsEntered.length > 0) {

    return (
      <div className={`nutrition-card text-center`}>
        <h4 className="h4-reduced">CALORIE TARGET</h4>
        <h4 className={`mb-3`}>{props.target}</h4>
        <h4 className={"h4-reduced"}>CURRENT CALORIES</h4>
        <h4 className={`${props.status} mb-3`}>{props.current}</h4>
        <h4 className={"h4-reduced"}>CALORIES REMAINING</h4>
        <h4 className={`mb-3`}>{props.remaining}</h4>

        <table className="nutrition-table mx-auto mb-4">
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
        {props.addButton}
        {props.editButton}
        {props.startButton}
      </div>

    );
  } else {
    return (
      <div className={`nutrition-card text-center`}>
        <h4 className="h4-reduced">CALORIE TARGET</h4>
        <h4 className={`mb-3`}>{props.target}</h4>
        <h4 className={"h4-reduced"}>CURRENT CALORIES</h4>
        <h4 className={`${props.status}`}>{props.current}</h4>
        {props.addButton}
      </div>
    )
  }



}

export function WaterCard(props) {
  return (
    <div className={`water-card d-flex mx-auto`}>
      <h4 className="mx-auto h4-reduced">{props.remaining} GLASSES TO GO</h4>
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
