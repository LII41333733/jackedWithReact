import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';
import DeleteBtn from "../components/DeleteBtn";
import Nav from "../components/Nav";
import NoData from "../components/NoData";
import Button from "../components/Buttons";
import DateBar from "../components/DateBar";
import { WorkoutCard } from "../components/Cards";
import { WaterCard } from "../components/Cards";
import { NutritionCard } from "../components/Cards";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import moment from 'moment';


class Fitness extends Component {
  state = {
    username: "LII41333733",
    fitnessData: [],

    renderTodaysDate: false,
    renderDate: "Monday, January 28th 2019",

    ADDexercise: false,

    EDITworkout: false,
    EDITwater: false,
    EDITnutrition: false,
    EDITset: false,

    workoutMode: false,

    NEWcalorieTarget: "",
    NEWworkoutName: "",
    NEWwaterTarget: "",

    NEWexercise: "",
    NEWsets: "",
    NEWreps: "",

    // currentWeight: "",
    plate1: 0,
    plate2: 0,
    plate3: 0,
    plate4: 0,
    plate5: 0,
    bar: 45,
    total: 0,
    plateQueue: 1,
    plate1Class: "hide",
    plate2Class: "hide",
    plate3Class: "hide",
    plate4Class: "hide",
    plate5Class: "hide",

  }

  componentDidMount() {
    this.setState({
      todaysDate: moment().format("dddd, MMMM Do YYYY"),
    }, () => { this.loadFitnessData() })
  }

  loadFitnessData = () => {
    API.getData("LII41333733")
      .then(res => {


        let data = res.data[0].fitnessData;

        if (this.state.renderTodaysDate) {
          data.forEach((day) => {
            console.log(day)
            if (day.date === this.state.todaysDate) {
              this.setState({
                fitnessData: data,
                renderDate: day.date,
                date: day.date,
                calorieTarget: day.calorieTarget,
                exercises: day.exercises,
                items: day.items,
                waterConsumed: day.waterConsumed,
                waterTarget: day.waterTarget,
                workoutName: day.workoutName
              }, () => console.log(this.state))
            }
          })
        } else {
          data.forEach((day) => {
            if (day.date === this.state.renderDate) {
              this.setState({
                fitnessData: data,
                calorieTarget: day.calorieTarget,
                date: day.date,
                exercises: day.exercises,
                items: day.items,
                waterConsumed: day.waterConsumed,
                waterTarget: day.waterTarget,
                workoutName: day.workoutName
              }, () => console.log(this.state))
            }
          })
        }



      });
  }

  updateData = () => {


    let dataCopy = this.state.fitnessData;
    let data;
    let dateSwitch;

    (this.state.renderTodaysDate) ? (dateSwitch = this.state.todaysDate) : (dateSwitch = this.state.renderDate)


    data = {
      date: dateSwitch,
      workoutName: this.state.workoutName,
      exercises: this.state.exercises,
      calorieTarget: this.state.calorieTarget,
      items: this.state.items,
      waterConsumed: this.state.waterConsumed,
      waterTarget: this.state.waterTarget
    }




    dataCopy.forEach((day, i) => {
      if (day.date === data.date) {
        dataCopy[i] = data
      }
    })

    console.log(dataCopy)

    if (dataCopy.length === 0) {
      dataCopy.push(data)
    }

    API.updateData("LII41333733", { username: "LII41333733", fitnessData: dataCopy })
      .catch(err => console.log(err))
      .then(this.loadFitnessData());



  }

  render() {
    if (this.state.username) {
      let data;
      data = this.state;

      return (
        <div>
          <Nav username={data.username} />
          <hr />
          <DateBar
            date={data.date}
            selected={this.state.startDate}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          />
          <Container>
            <Row>
              <Col size="md-7 sm-12">
                <div className="div1 section my-4">
                  {this.renderWorkoutComponent()}
                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div className={`div2 section text-center mt-4 mx-auto`}>
                  {this.renderWaterComponent()}
                </div>
                <div className="div3 section my-4 mx-auto">
                  {this.renderNutritionComponent()}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else { return false }
  }

  // WORKOUT COMPONENT FUNCTIONS
  //-------------------------------------------------------------


  renderWorkoutComponent = () => {

    if (this.state.workoutMode) { return this.displayINTRAworkout() }
    else if (this.state.ADDexercise) { return this.addExercise() }
    else if (this.state.EDITworkout) { return this.editWorkout() }
    else if (this.state.workoutName) { return this.displayPREworkout() }
    else {
      return (
        <div>
          <NoData category="Workout" />
          <form>
            <h5>What would you like to call today's workout?</h5>
            <Input
              value={this.state.NEWworkoutName}
              onChange={this.handleInputChange}
              name="NEWworkoutName"
              placeholder="Workout Name (Required)"
            />
            <Button
              type="save"
              buttonName="SAVE"
              onClick={() => this.setState({ workoutName: this.state.NEWworkoutName }, () => { this.updateData() })}
            />
          </form>
        </div>
      )
    }
  }

  editWorkout = () => {
    return (
      <div>
        <h4 className="h4-reduced mb-4">Edit Workout Data</h4>

        <h5>Workout Name</h5>
        <Input
          value={this.state.workoutName}
          onChange={this.handleInputChange}
          name="workoutName"
          placeholder="Workout Name (Required)"
        />

        {this.state.exercises.map((exercise, i) => {

          return (


            <div className="row p-3" key={i}>

              <div className="col-12">
                <div className="fa-stack fa-2x numBadge mx-auto mt-2">
                  <i className="fas fa-square fa-stack-2x"></i>
                  <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                </div>
                <h5 key={i}>Exercise</h5>
                <Input
                  attr={i}
                  value={this.state.exercises[i].exercise}
                  onChange={this.handleArrayInputChange}
                  name="exercise"
                  placeholder="Exercise (Required)"
                />
              </div>


              <div className="col-4 edit-sets">

                <h5>Sets</h5>
                <Input
                  attr={i}
                  value={this.state.exercises[i].sets}
                  onChange={this.handleArrayInputChange}
                  name="sets"
                  placeholder="Sets (Required)"
                />
              </div>
              <div className="col-4 edit-reps">

                <h5>Reps</h5>
                <Input
                  attr={i}
                  value={this.state.exercises[i].reps}
                  onChange={this.handleArrayInputChange}
                  name="reps"
                  placeholder="Reps (Required)"
                />
              </div>
              <div className="col-4">
                <Button
                  type="delete"
                  class="mt-4 d-flex mx-auto edit-delete"
                  buttonName="DELETE"
                  onClick={() => { this.deleteItem(1, i) }}
                />
              </div>



            </div>
          )

        })}
        <Button
          type="add start"
          buttonName="ADD EXERCISE"
          onClick={() => this.setState({ ADDexercise: true })}

        />
        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => { this.setState({ EDITworkout: false }, () => this.updateData()) }}
        />


      </div>
    )
  }

  displayPREworkout = () => {
    return (
      <div>
        <WorkoutCard
          exercisesEntered={this.state.exercises}
          addButton={<Button
            type="add start"
            buttonName="ADD EXERCISE"
            onClick={() => this.setState({ ADDexercise: true })}

          />}
          editButton={<Button
            type="edit"
            buttonName="EDIT WORKOUT DATA"
            onClick={() => this.setState({ EDITworkout: true })}
          />}
          startButton={<Button
            type="start"
            buttonName="START WORKOUT"
            onClick={() => this.setState({ workoutMode: true })}
          />}
          workoutName={this.state.workoutName}
          exercises={(this.state.exercises) ? (this.state.exercises.map(({ exercise, notes, reps, sets, section }, i) => {
            return (
              <tr key={i}>
                <td className="fa-stack fa-2x numBadge mx-auto ">
                  <i className="fas fa-square fa-stack-2x"></i>
                  <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                </td>
                <td className="exercise">{exercise}</td>
                <td className="reps">{sets} x {reps}</td>
              </tr>
            )
          })) : (-1)}

        />

      </div>
    )
  }

  renderWeights = () => {
    return (this.state.EDITset) ?

      (
        <div className="weightsDiv">

          <Input
            value={this.state.total}
            onChange={this.handleInputChange}
            name="total"
            className="total-form"
          />

          <img className="barbell" src="./barbell.png"></img>


          <div className={`plate plate1L ${this.state.plate1Class}`}></div >
          <div className={`plate plate1R ${this.state.plate1Class}`}></div>

          <div className={`plate plate2L ${this.state.plate2Class}`}></div>
          <div className={`plate plate2R ${this.state.plate2Class}`}></div>

          <div className={`plate plate3L ${this.state.plate3Class}`}></div>
          <div className={`plate plate3R ${this.state.plate3Class}`}></div>

          <div className={`plate plate4L ${this.state.plate4Class}`}></div>
          <div className={`plate plate4R ${this.state.plate4Class}`}></div>

          <div className={`plate plate5L ${this.state.plate5Class}`}></div>
          <div className={`plate plate5R ${this.state.plate5Class}`}></div>

          <span className="fa-stack fa-35x p45" onClick={() => this.handleClickedPlate(45)}>
            <i className="fas fa-circle fa-stack-2x "></i>
            <strong className="fa-stack-1x weight-text">45</strong>
          </span>

          <span className="fa-stack fa-3x p35" onClick={() => this.handleClickedPlate(35)}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <strong className="fa-stack-1x weight-text">35</strong>
          </span>

          <span className="fa-stack fa-25x p25" onClick={() => this.handleClickedPlate(25)}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <strong className="fa-stack-1x weight-text ">25</strong>
          </span>

          <span className="fa-stack fa-2x p10" onClick={() => this.handleClickedPlate(10)}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <strong className="fa-stack-1x weight-text ">10</strong>
          </span>

          <span className="fa-stack fa-15x p5" onClick={() => this.handleClickedPlate(5)}>
            <i className="fas fa-circle fa-stack-2x"></i>
            <strong className="fa-stack-1x weight-text ">5</strong>
          </span>

          <Button
            type="clear"
            buttonName="CLEAR"
            onClick={() => this.clearBar()}
          />

          <Button
            type="saveBar clear"
            buttonName="SAVE SET"
            onClick={() => this.clearBar()}
          />



          {/* <div className="total">Total: <span className="weight-total">0</span></div> */}

          {/* <button type="button" className="btn btn-primary clear-button">Clear</button> */}

        </div >
      ) :
      (<div>Hello Hyrule!</div>)

  }

  handleClickedPlate = (weight) => {
    if (this.state.plateQueue === 6) {
      console.log("The rack is full. Get lost!");
      return false;
    } else {
      if (this.state.plate1 === 0) {
        this.setState({ plate1: weight, plateQueue: this.state.plateQueue + 1 }, () => { this.renderPlates() })
      } else if (this.state.plate2 === 0) {
        this.setState({ plate2: weight, plateQueue: this.state.plateQueue + 1 }, () => { this.renderPlates() })
      } else if (this.state.plate3 === 0) {
        this.setState({ plate3: weight, plateQueue: this.state.plateQueue + 1 }, () => { this.renderPlates() })
      } else if (this.state.plate4 === 0) {
        this.setState({ plate4: weight, plateQueue: this.state.plateQueue + 1 }, () => { this.renderPlates() })
      } else if (this.state.plate5 === 0) {
        this.setState({ plate5: weight, plateQueue: this.state.plateQueue + 1 }, () => { this.renderPlates() })
      }
    }
  }

  renderPlates = () => {

    let data = this.state;

    let weightTotal;
    weightTotal = data.bar + data.plate1 * 2 + data.plate2 * 2 + data.plate3 * 2 + data.plate4 * 2 + data.plate5 * 2

    let plate1;
    let plate2;
    let plate3;
    let plate4;
    let plate5;


    if (data.plate1 === 0) {
      plate1 = "hide";
    } else if (data.plate1 === 45) {
      plate1 = "plate-45";
    } else if (data.plate1 === 35) {
      plate1 = "plate-35";
    } else if (data.plate1 === 25) {
      plate1 = "plate-25";
    } else if (data.plate1 === 10) {
      plate1 = "plate-10";
    } else if (data.plate1 === 5) {
      plate1 = "plate-5";
    }

    if (data.plate2 === 0) {
      plate2 = "hide";
    } else if (data.plate2 === 45) {
      plate2 = "plate-45";
    } else if (data.plate2 === 35) {
      plate2 = "plate-35";
    } else if (data.plate2 === 25) {
      plate2 = "plate-25";
    } else if (data.plate2 === 10) {
      plate2 = "plate-10";
    } else if (data.plate2 === 5) {
      plate2 = "plate-5";
    }

    if (data.plate3 === 0) {
      plate3 = "hide";
    } else if (data.plate3 === 45) {
      plate3 = "plate-45";
    } else if (data.plate3 === 35) {
      plate3 = "plate-35";
    } else if (data.plate3 === 25) {
      plate3 = "plate-25";
    } else if (data.plate3 === 10) {
      plate3 = "plate-10";
    } else if (data.plate3 === 5) {
      plate3 = "plate-5";
    }

    if (data.plate4 === 0) {
      plate4 = "hide";
    } else if (data.plate4 === 45) {
      plate4 = "plate-45";
    } else if (data.plate4 === 35) {
      plate4 = "plate-35";
    } else if (data.plate4 === 25) {
      plate4 = "plate-25";
    } else if (data.plate4 === 10) {
      plate4 = "plate-10";
    } else if (data.plate4 === 5) {
      plate4 = "plate-5";
    }

    if (data.plate5 === 0) {
      plate5 = "hide";
    } else if (data.plate5 === 45) {
      plate5 = "plate-45";
    } else if (data.plate5 === 35) {
      plate5 = "plate-35";
    } else if (data.plate5 === 25) {
      plate5 = "plate-25";
    } else if (data.plate5 === 10) {
      plate5 = "plate-10";
    } else if (data.plate5 === 5) {
      plate5 = "plate-5";
    }




    this.setState({
      plate1Class: plate1,
      plate2Class: plate2,
      plate3Class: plate3,
      plate4Class: plate4,
      plate5Class: plate5,
      total: weightTotal
    }, () => { this.logData() })
  }

  clearBar = () => {
    this.setState({
      plate1: 0,
      plate2: 0,
      plate3: 0,
      plate4: 0,
      plate5: 0,
      total: 0,
      plate1Class: "hide",
      plate2Class: "hide",
      plate3Class: "hide",
      plate4Class: "hide",
      plate5Class: "hide",
      plateQueue: 1
    }, () => { this.logData() })
  }

  addExercise = () => {
    return (
      <div>
        <h5>Exercise Name</h5>
        <Input
          value={this.state.NEWexercise}
          onChange={this.handleInputChange}
          name="NEWexercise"
          placeholder="Exercise Name (Required)"
        />
        <h5>How many sets?</h5>
        <Input
          value={this.state.NEWsets}
          onChange={this.handleInputChange}
          name="NEWsets"
          placeholder="Enter Sets (Required)"
        />
        <h5>How many reps for each set?</h5>


        <Input
          value={this.state.NEWreps}
          onChange={this.handleInputChange}
          name="NEWreps"
          placeholder="Enter Reps (Required)"
        />

        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => {
            let data = this.state.exercises;
            data.push({
              exercise: this.state.NEWexercise,
              sets: this.state.NEWsets,
              reps: this.state.NEWreps
            })

            this.setState({
              exercises: data,
              ADDexercise: false,
              NEWexercise: "",
              NEWsets: "",
              NEWreps: "",
            }, () => this.updateData())
          }}
        />


      </div>
    )
  }

  // WATER COMPONENT FUNCTIONS ----------------------------------------------------------
  renderWaterComponent = () => {
    if (this.state.workoutMode) { return this.renderNotes() }
    else if (this.state.EDITwater) { return this.editWater() }
    else if (this.state.waterTarget) { return this.displayWater() }
    else {

      return (
        <div>
          <NoData category="Water" />
          <form>
            <h5>How many glasses of water <br />are you aiming to drink today?</h5>
            <Input
              type="number"
              value={this.state.NEWwaterTarget}
              onChange={this.handleNumberInputChange}
              name="NEWwaterTarget"
              placeholder="Water Target (Required)"
            />
            <Button
              type="save"
              buttonName="SAVE"
              onClick={() => this.setState({ waterTarget: this.state.NEWwaterTarget, waterConsumed: 0 }, () => { this.updateData() })}
            />
          </form>
        </div>
      )
    }
  }

  editWater = () => {
    return (
      <div>
        <h4 className="h4-reduced">Edit Water Data</h4>
        <h5>Water Target</h5>
        <Input
          value={this.state.NEWwaterTarget}
          onChange={this.handleNumberInputChange}
          name="NEWwaterTarget"
          placeholder="Water Target (Required)"
        />
        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => {
            this.setState({
              waterTarget: this.state.NEWwaterTarget,
              EDITwater: false
            }, () => this.updateData())
          }}
        />
      </div>
    )
  }

  displayWater = () => {
    const onStarClick = (nextValue, prevValue, name) => {
      this.setState({
        waterConsumed: nextValue
      }, () => { this.updateData(); })
    }

    return (
      <div className="water-data-div">
        <WaterCard
          remaining={this.state.waterTarget - this.state.waterConsumed}
        />
        <StarRatingComponent
          name="rate1"
          starCount={parseInt(this.state.waterTarget)}
        value={this.state.waterConsumed}
        onStarClick={onStarClick.bind(this)}
        starColor={`#09d0ff`}
        emptyStarColor={`#333333`}
        renderStarIcon={() => <i className="fas fa-glass-whiskey"></i>}
        />
        <Button
          type="edit"
          buttonName="EDIT WATER DATA"
          onClick={() => this.setState({ EDITwater: true })}
        />
      </div>
    )
  }

  // NUTRITION COMPONENT FUNCTIONS
  //--------------------------------------------------------

  renderNutritionComponent = () => {
    if (this.state.workoutMode) { return this.renderTimer() }
    else if (this.state.EDITnutrition) { return this.editNutrition() }
    else if (this.state.calorieTarget) { return this.displayNutrition() }
    else {
      return (
        <div>
          <NoData category="Nutrition" />
          <form>
            <h5>What is your calorie target for today?</h5>
            <Input
              type="number"
              value={this.state.NEWcalorieTarget}
              onChange={this.handleNumberInputChange}
              name="NEWcalorieTarget"
              placeholder="Calorie Target (Required)"
            />
            <Button
              type="save"
              buttonName="SAVE"
              onClick={() => this.setState({ calorieTarget: this.state.NEWcalorieTarget }, () => { this.updateData() })}
            />
          </form>
        </div>
      )
    }
  }

  editNutrition = () => {
    return (
      <div>
        <h4 className="h4-reduced">Edit Nutrition Data</h4>

        <h5>Calorie Target</h5>
        <Input
          value={this.state.calorieTarget}
          onChange={this.handleInputChange}
          name="calorieTarget"
          placeholder="Calorie Target (Required)"
        />

        <h5>Items</h5>

        {this.state.items.map((item, i) => {
          return (
            <div className="nutrition-items-div">
              <Input
                attr={i}
                value={this.state.items[i].item}
                onChange={this.handleArrayInputChange}
                name="item"
                placeholder="Item (Required)"
              />
              <h5 className="mt-5">Calories</h5>
              <Input
                attr={i}
                value={this.state.items[i].calories}
                onChange={this.handleArrayInputChange}
                name="item"
                placeholder="Calories (Required)"
              />
              <Button
                type="delete"
                buttonName="DELETE"
                onClick={() => { this.deleteItem(3, i) }}
              />
            </div>
          )
        })
        }
        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => { this.setState({ EDITnutrition: false }, () => this.updateData()) }}
        />
      </div>
    )
  }

  displayNutrition = () => {
    const reduceCalories = () => {
      let count = 0;
      this.state.items.forEach((item) => {
        count += item.calories
      })
      return (count <= this.state.calorieTarget) ? ({ status: "green", total: count }) : ({ status: "red", total: count })
    }
    return (
      <div>
        <NutritionCard
          itemsEntered={this.state.items}
          addButton={<Button
            type="add start"
            buttonName="ADD ITEM"
            onClick={() => this.setState({ ADDexercise: true })}

          />}
          status={reduceCalories().status}
          target={this.state.calorieTarget}
          current={reduceCalories().total}
          items={this.state.items.map(({ item, calories }, i) => {
            return (
              <tr key={i}>
                <td className="fa-stack fa-2x numBadge">
                  <i className="fas fa-square fa-stack-2x"></i>
                  <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                </td>
                <td className="item max">{item}</td>
                <td className="calories">{calories}</td>
              </tr>
            )
          })}
        />
        <Button
          type="edit"
          buttonName="EDIT NUTRITION DATA"
          onClick={() => this.setState({ EDITnutrition: true })}
        />
      </div>
    )
  }









  //DATA HANDLING FUNCTIONS ---------------------------------------------------------------

  deleteItem = (ext, i) => {
    if (ext === 1) {
      let data = this.state.exercises;
      data.splice(i, 1);
      this.setState({ exercises: data }, () => { this.updateData() });
    } else {
      let data = this.state.items;
      data.splice(i, 1);
      this.setState({ items: data }, () => { this.updateData() });
    }

  }

  handleNumberInputChange = (event) => {
    const value = event.target.value.replace(/\D/, '')

    const { name } = event.target;
    // const value = parseInt(event.target.value)
    this.setState({ [name]: value });

  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleArrayInputChange = (event) => {
    const { name, value, dataset } = event.target;
    const i = dataset.indexnum;
    let dataArray = this.state.exercises;
    dataArray[i][name] = value;
    this.setState({ exercises: dataArray });
  }

  logData = () => {
    console.log(`Plate 1: ${this.state.plate1}`)
    console.log(`Plate 2: ${this.state.plate2}`)
    console.log(`Plate 3: ${this.state.plate3}`)
    console.log(`Plate 4: ${this.state.plate4}`)
    console.log(`Plate 5: ${this.state.plate5}`)
    console.log(`Total: ${this.state.total}`)
  }

  // ---------------------------------------------------------------





}

export default Fitness;

































// // <TextArea
// //  value={this.state.synopsis}
// //  onChange={this.handleInputChange}
// //  name="synopsis"
// //  placeholder="Synopsis (Optional)"
// // />

// // handleFormSubmit = event => {
// //   event.preventDefault();
// // }
