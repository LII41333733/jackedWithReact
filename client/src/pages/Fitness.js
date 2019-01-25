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

class Fitness extends Component {
  state = {
    NEWcalorieTarget: "",
    NEWworkoutName: "",
    NEWwaterTarget: "",
    EDITworkout: false,
    EDITwater: false,
    EDITnutrition: false,
    startWorkout: true,
    currentWeight: ""
  }

  componentDidMount() {
    this.loadFitnessData();
  }

  loadFitnessData = () => {
    API.getData("LII41333733", "January 8, 2019")
      .then(res => { this.setState(res.data[0]) });
  }

  renderWorkoutComponent = () => {
    if (this.state.EDITworkout) {
      return this.editWorkout();
    } else if (this.state.workoutName) {
      return this.displayWorkout();
    } else {
      return (
        <div>
          <NoData category="Workout" />
          <form>
            <h5>`What would you like to call today's workout?`</h5>
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

  displayWorkout = () => {
    return (
      <div>
        <WorkoutCard
          workoutName={this.state.workoutName}
          exercises={this.state.exercises.map(({ exercise, notes, reps, sets, section }, i) => {
            return (
              <tr key={i}>
                <td className="fa-stack fa-2x numBadge">
                  <i className="fas fa-square fa-stack-2x"></i>
                  <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                </td>
                <td className="exercise">{exercise}</td>
                <td className="reps">{sets} x {reps}</td>
              </tr>
            )
          })}
        />
        <Button
          type="edit"
          buttonName="EDIT WORKOUT DATA"
          onClick={() => this.setState({ EDITworkout: true })}
        />
        <Button
          type="start"
          buttonName="START WORKOUT"
          onClick={() => this.setState({ startWorkout: true })}
        />
      </div>
    )
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

          return (<div className="row p-3" key={i}>
            <div className="col-8">
              <h5 className="mt-5">Exercise</h5>
              <Input
                attr={i}
                value={this.state.exercises[i].exercise}
                onChange={this.handleArrayInputChange}
                name="exercise"
                placeholder="Exercise (Required)"
              />
            </div>
            <div className="col-4">
              <h5>Sets</h5>
              <Input
                attr={i}
                value={this.state.exercises[i].sets}
                onChange={this.handleArrayInputChange}
                name="sets"
                placeholder="Sets (Required)"
              />
              <h5>Reps</h5>
              <Input
                attr={i}
                value={this.state.exercises[i].reps}
                onChange={this.handleArrayInputChange}
                name="reps"
                placeholder="Reps (Required)"
              />
            </div>
            <hr />
          </div>)

        })}

        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => { this.setState({ EDITworkout: false }, () => this.updateData()) }}
        />


      </div>
    )
  }

  renderWaterComponent = () => {
    if (this.state.EDITwater) {
      return this.editWater();
    } else if (this.state.waterTarget) {
      return this.displayWater();
    } else {
      return (
        <div>
          <NoData category="Water" />
          <form>
            <h5>How many glasses of water are you aiming to drink today?</h5>
            <Input
              value={this.state.NEWwaterTarget}
              onChange={this.handleInputChange}
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

  displayWater = () => {
    const onStarClick = (nextValue, prevValue, name) => {
      this.setState({
        waterConsumed: nextValue
      }, () => { this.updateData(); })
    }
    return (
      <div>
        <WaterCard
          remaining={this.state.waterTarget - this.state.waterConsumed}
        />
        <StarRatingComponent
          name="rate1"
          starCount={this.state.waterTarget}
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

  editWater = () => {
    return (
      <div>
        <h4 className="h4-reduced">Edit Water Data</h4>
        <h5>Water Target</h5>
        <Input
          value={this.state.waterTarget}
          onChange={this.handleInputChange}
          name="waterTarget"
          placeholder="Water Target (Required)"
        />
        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => { this.setState({ EDITwater: false }, () => this.updateData()) }}
        />
      </div>
    )
  }

  renderNutritionComponent = () => {
    if (this.state.EDITnutrition) {
      return this.editNutrition();
    } else if (this.state.calorieTarget) {
      return this.displayNutrition();
    } else {
      return (
        <div>
          <NoData category="Nutrition" />
          <form>
            <h5>What is your calorie target for today?</h5>
            <Input
              value={this.state.NEWcalorieTarget}
              onChange={this.handleInputChange}
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
                <td><i className="far fa-trash-alt ml-3" onClick={() => { console.log("Hella Wurll!") }}></i></td>
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
          return(
            <div class="nutrition-items-div">
              <h5 className="mt-5">Item</h5>
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
                onClick={() => { this.deleteItem(ext, i) }}
//                 onClick={() => { this.setState({ EDITnutrition: false }, () => this.updateData()) }}
        />
            </div>
          )
        }
        <Button
          type="save"
          buttonName="SAVE"
          onClick={() => { this.setState({ EDITnutrition: false }, () => this.updateData()) }}
        />
      </div>
    )
  }

  startWorkout = () => {
    return (
    <div class="weightsDiv">
   
    
    <img class="barbell" src="https://spartantraining.se/wp-content/uploads/2015/02/riotbar1.jpg"></img>
    
    
    
    
    <div class="plate plate45 left-plate-1"></div>
    <div class="plate plate35 left-plate-2"></div>
    <div class="plate plate25 left-plate-3"></div>
    <div class="plate plate10 left-plate-4"></div>
    
    <div class="plate plate45 right-plate-1"></div>
    <div class="plate plate35 right-plate-2"></div>
    <div class="plate plate25 right-plate-3"></div>
    <div class="plate plate10 right-plate-4"></div>
    
    
    
    
    
    
    
    
    <span class="fa-stack weight fa-35x p45">
  <i class="fas fa-circle one fa-stack-2x "></i>
  <strong class="fa-stack-1x weight-text">45</strong>
    </span>
    
        <span class="fa-stack weight fa-3x p35">
  <i class="fas fa-circle two fa-stack-2x"></i>
  <strong class="fa-stack-1x weight-text">35</strong>
    </span>
    
            <span class="fa-stack weight fa-25x p25">
  <i class="fas fa-circle three fa-stack-2x"></i>
  <strong class="fa-stack-1x weight-text">25</strong>
    </span>
    
                <span class="fa-stack weight fa-2x p10">
  <i class="fas fa-circle three fa-stack-2x"></i>
  <strong class="fa-stack-1x weight-text">10</strong>
    </span>
    
                    <span class="fa-stack weight fa-15x p5">
  <i class="fas fa-circle three fa-stack-2x"></i>
  <strong class="fa-stack-1x weight-text">5</strong>
    </span>
    
<h5 className="currWeight p0">Current Weight (lbs)</h5>
<Input
value={this.state.currentWeight}
onChange={this.handleInputChange}
name="currentWeight"
class="weight-input"
/>
<Button
          type="save"
          buttonName="SAVE"
          onClick={() => { this.setState({ EDITwater: false }, () => this.updateData()) }}
        />
<Button
          type="clear"
          buttonName="CLEAR"
//           onClick={() => { this.setState({ EDITwater: false }, () => this.updateData()) }}
        />

</div>





    );
  }

  updateData = () => {
    let data;
    data = {
      username: this.state.username,
      date: this.state.date,
      workoutName: this.state.workoutName,
      exercises: this.state.exercises,
      calorieTarget: this.state.calorieTarget,
      items: this.state.items,
      waterConsumed: this.state.waterConsumed,
      waterTarget: this.state.waterTarget
    }
    API.updateData("LII41333733", "January 8, 2019", data)
      .catch(err => console.log(err));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleArrayInputChange = (event) => {
    const { name, value, dataset } = event.target;
    console.log(dataset)
    const i = dataset.indexnum;
    let dataArray = this.state.exercises;

    console.log(name)
    console.log(i)
    console.log(value)

    dataArray[i][name] = value;

    console.log(dataArray)

    this.setState({ exercises: dataArray });
  }

  render() {
    if (this.state.username) {

      let data;
      data = this.state;

      return (
        <div>
          <Nav username={data.username} />
          <hr />
          <DateBar date={data.date} />
          <Container>
            <Row>
              <Col size="md-7 sm-12">
                <div className="div1 section my-4 mx-auto">
                  {this.renderWorkoutComponent()}
                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div className="div2 section text-center mt-4">
                  {(this.state.startWorkout)?(this.startWorkout()):(this.renderWaterComponent())}
                </div>
                <div className="div3 section mt-4">
                  {this.renderNutritionComponent()}
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      )
    } else { return false }
  }

}

export default Fitness;

// /* <List>
// {this.state.books.map(book => (
//   <ListItem key={book._id}>
//     <Link to={"/books/" + book._id}>
//       <strong>
//         {book.title} by {book.author}
//       </strong>
//     </Link>
//     <DeleteBtn onClick={() => this.deleteBook(book._id)} />
//   </ListItem>
// ))}
// </List> */

// // <TextArea
// //  value={this.state.synopsis}
// //  onChange={this.handleInputChange}
// //  name="synopsis"
// //  placeholder="Synopsis (Optional)"
// // />

// // handleFormSubmit = event => {
// //   event.preventDefault();
// // }


// /* <i class="fas fa-save"></i> */ 
// /* <i class="fas fa-plus-square ml-2"></i> */ 
