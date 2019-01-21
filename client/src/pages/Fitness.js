import React, { Component } from "react";
import StarRatingComponent from 'react-star-rating-component';
import DeleteBtn from "../components/DeleteBtn";
import Nav from "../components/Nav";
import NoData from "../components/NoData";
import UpdateButton from "../components/Buttons";
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
    NEWworkoutName:"",
    NEWwaterTarget: "",
    EDITworkout: false,
    EDITwater: false,
    EDITnutrition: false
  }

  componentDidMount() {
    this.loadWorkouts();
  }

  loadWorkouts = () => {
    API.getData("LII41333733", "January 8, 2019")
      .then(res => { this.setState(res.data[0]) });
  }
  
  renderWorkoutComponent = () => {
    if (this.state.workoutName) {
      return (this.state.EDITworkout)?(this.editWorkout()):(this.displayWorkout());
    } else {   
      return (
        <div>
          <NoData category="Workout" />
          <form>
            <h5>What do you want to call your workout for today?</h5>
            <Input
              value={this.state.NEWworkoutName}
              onChange={this.handleInputChange}
              name="NEWworkoutName"
              placeholder="Workout Name (Required)"
            />
            <UpdateButton 
              onClick={() => this.setState({workoutName: this.state.NEWworkoutName}, () => {this.updateData()})}
            />
          </form>
        </div>
      )  
    }
  }
  
  renderWaterComponent = () => {
    if (this.state.waterTarget) {
      return (this.state.EDITwater)?(this.editWater()):(this.displayWater());
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
            <UpdateButton 
              onClick={() => this.setState({ waterTarget: this.state.NEWwaterTarget, waterConsumed: 0 }, () => {this.updateData()})}
            />
          </form>
        </div>  
      )
    }
  } 
  
  renderNutritionComponent = () => {
    if (this.state.calorieTarget) {
      return (this.state.EDITnutrition)?(this.editNutrition()):(this.displayNutrition());
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
            <UpdateButton 
              onClick={() => this.setState({calorieTarget: this.state.NEWcalorieTarget}, () => {this.updateData()})}
            />
          </form>
        </div>  
      )
    }
  }

  displayWorkout = () => {
    return (
      <WorkoutCard
        workoutName={this.state.workoutName}
        exercises={this.state.exercises.map(({ exercise, notes, reps, sets, section }, i) => {
          return (
            <tr key={i}>
              <td className="fa-stack fa-2x">
                <i className="fas fa-square fa-stack-2x"></i>
                <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
              </td>
              <td className="exercise">{exercise}</td>
              <td className="reps">{sets} x {reps}</td>
              <td><i className="far fa-edit ml-4" onClick={() => { console.log("Hello World") }}></i></td>
              <td><i className="far fa-trash-alt" onClick={() => { console.log("Hello World") }}></i></td>
            </tr>
          )
        })}
      />
    )
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
      <NutritionCard
        status={reduceCalories().status}
        target={this.state.calorieTarget}
        current={reduceCalories().total}
        items={this.state.items.map(({ item, calories }, i) => {
          return (
            <tr key={i}>
              <td className="fa-stack fa-2x">
                <i className="fas fa-square fa-stack-2x"></i>
                <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
              </td>
              <td className="item max">{item}</td>
              <td className="calories">{calories}</td>
              <td><i className="far fa-edit ml-4" onClick={() => { console.log("Hella Wurll!") }}></i></td>
              <td><i className="far fa-trash-alt" onClick={() => { console.log("Hella Wurll!") }}></i></td>
            </tr>
          )
        })}
      />
    )
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

  render() {
    if (this.state.username) {
      let data;
      data = this.state
      return (
        <div>
          <Nav username={data.username} />
          <hr />
          <DateBarn date={data.date} />
          <Container>
            <Row>
              <Col size="md-7 sm-12">
                <div className="div1 section my-4 mx-auto">
                  {this.renderWorkoutComponent()}
                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div className="div2 section text-center mt-4">
                  {this.renderWaterComponent()}
                </div>
                <div className="div3 section mt-4">
                  {this.renderNutritionComponent()}
                </div>
              </Col>
            </Row>
         </Container>
        </div>
      )
    } else { return }
  }
}

export default Fitness;

{/* <List>
{this.state.books.map(book => (
  <ListItem key={book._id}>
    <Link to={"/books/" + book._id}>
      <strong>
        {book.title} by {book.author}
      </strong>
    </Link>
    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
  </ListItem>
))}
</List> */}

// <TextArea
//  value={this.state.synopsis}
//  onChange={this.handleInputChange}
//  name="synopsis"
//  placeholder="Synopsis (Optional)"
// />

// handleFormSubmit = event => {
//   event.preventDefault();
// }
