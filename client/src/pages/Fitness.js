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
      .then(res => {
        this.setState(res.data[0], () => {
          // rating: this.state.fitnessData.waterData.consumed
        })
      })
  }
  
// if (this.state.workoutName) {
// if (this.state.EDITworkout) {
// return this.editWorkout();
// } else {
// return this.displayWorkout();
// }
  
  renderNewWorkoutForm = (ext) => {
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

  dataCheck = (ext) => {
      if (ext === 1) {
        return (this.state.EDITworkout)?(this.editWorkout()):(this.displayWorkout())
      } else {
        
        return renderNewWorkoutForm(ext);
        

    
    else if (ext === 2) {
          
          } else {
          
          }
        } 
        
        
        
      }
    } else if (ext === 2) {
      if (this.state.waterTarget) {

        if (this.state.EDITwater) {
          this.editWater();
        } else {
          return this.displayWater();
        }
      } else {
        return (
          <div>
          <NoData
            category="Water"
          />
            
              <form>
                <h5>How many glasses of water are you aiming to drink today?</h5>
                <Input
                  value={this.state.NEWwaterTarget}
                  onChange={this.handleInputChange}
                  name="NEWwaterTarget"
                  placeholder="Water Target (Required)"
                />
                <UpdateButton 
                  onClick={() => this.setState({
                    waterTarget: this.state.NEWwaterTarget,
                    waterConsumed: 0
                  }, () => {this.updateData()})}
                />
              </form>
              </div>
            
          )
      }
    } else {
      if (this.state.calorieTarget) {
        if (this.state.EDITnutrition) {
          return this.editNutrition();
        } else {
          return this.displayNutrition();
        }
      } else {
        return (
          <div>
          <NoData
            category="Nutrition"
          />
            
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
              {/* <td><i className="far fa-edit ml-4" onClick={() => { this.ezPass(1, "exercises", i) }}></i></td> */}
              <td><i className="far fa-edit ml-4" onClick={() => { console.log("Hello World") }}></i></td>
              <td><i className="far fa-trash-alt" onClick={() => { console.log("Hello World") }}></i></td>
              {/* <td><i className="far fa-trash-alt" onClick={() => { this.ezPassDB(1, "exercises", i) }}></i></td> */}
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
      }, () => {
        this.updateData();
      })
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

      />)
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

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  //////////////////////// RENDER ////////////////////////

  render() {

    if (this.state.username) {
      let data;
      data = this.state

      return (

        <div>
          <Nav
            username={data.username}
          />
          <hr />
          <DateBar
            date={data.date}
          />
          <Container>
            <Row>
              <Col size="md-7 sm-12">
                <div className="div1 section my-4 mx-auto">
                  {this.dataCheck(1)}

                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div className="div2 section text-center mt-4">

                  {this.dataCheck(2)}

                </div>
                <div className="div3 section mt-4">

                  {this.dataCheck(3)}

                </div>
              </Col>
            </Row>
          </Container>
        </div>

      )

    } else {
      return false;
    }

  }
}

export default Fitness;

/////////////////////////////////////////////////




























































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



{/* <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                onChange={this.handleInputChange}
                name="synopsis"
                placeholder="Synopsis (Optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Book
              </FormBtn>
            </form> */


  //when the edit icon is clicked
  // run a function to log the item into state
  // render a component to read state and print to be edited
  //on submission
  //update state
  //render newData
  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   if (this.state.title && this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       synopsis: this.state.synopsis
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };
}

{//       return (

  //       )

  //       case 2:
  //     if (!this.ezPass(ext).target) {
  //       // return form
  //       return (
  //         <NoData category="Water" />
  //       )
  //     } else {
  //       return (





  //       )
  //     }
  //       case 3:
  //     if (!this.ezPass(ext).target) {
  //       return (
  //         <NoData category="nutrition" />
  //       )
  //     } else {
  //       return (

  //         <div>
  //           <NutritionCard
  //             status={this.reduceCalories().status}
  //             target={this.ezPass(ext).target}
  //             current={this.reduceCalories().total}
  //             items={this.ezPass(ext).items.map(({ item, kcal }, i) => {
  //               return (
  //                 <tr key={i}>
  //                   <td className="fa-stack fa-2x">
  //                     <i className="fas fa-square fa-stack-2x"></i>
  //                     <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
  //                   </td>
  //                   <td className="item max">{item}</td>
  //                   <td className="calories">{kcal}</td>
  //                   <td><i className="far fa-edit ml-4" onClick={() => { this.ezPass(3, "items", i) }}></i></td>
  //                   <td><i className="far fa-trash-alt" onClick={() => { this.ezPassDB(3, "items", i) }}></i></td>
  //                 </tr>
  //               )
  //             })}

  //           />
  //         </div>
  //       )
  //     }
  //       default:
  //     return false;
  // }
  //   }
  // }
  // ***







  // checkEdit = (ext) => {

  //   if (ext === 1) {
  //     if (this.state.EDITtitle && this.state.EDITworkout) {
  //       return (
  //         <form>
  //           <Input
  //             value={this.state.EDITindex}
  //             onChange={this.handleInputChange}
  //             name="EDITindex"
  //             placeholder="Workout Name (required)"
  //           />

  //           <UpdateButton
  //             onClick={() => this.ezPassDB(1, "workoutName", this.setState.EDITindex, true)}

  //           />
  //         </form>
  //       )
  //     }

  //     if (this.state.editMode && ext === 1) {
  //       return (
  //         <form>
  //           <Input
  //             value={this.state.EDITexercise}
  //             onChange={this.handleInputChange}
  //             name="EDITitem"
  //             placeholder="Item (required)"
  //           />
  //           <Input
  //             value={this.state.EDITkcal}
  //             onChange={this.handleInputChange}
  //             name="EDITkcal"
  //             placeholder="Calories (required)"
  //           />
  //           <UpdateButton

  //             onClick={() => this.ezPassDB(1, "", { item: this.state.EDITitem, kcal: this.state.EDITkcal }, true)}

  //           />
  //         </form>)
  //     } else {
  //       return (this.dataCheck(1))
  //     }
  //   } else {
  //     if (this.state.editMode) {
  //       return (
  //         <form>
  //           <Input
  //             value={this.state.EDITitem}
  //             onChange={this.handleInputChange}
  //             name="EDITitem"
  //             placeholder="Item (required)"
  //           />
  //           <Input
  //             value={this.state.EDITkcal}
  //             onChange={this.handleInputChange}
  //             name="EDITkcal"
  //             placeholder="Calories (required)"
  //           />
  //           <UpdateButton

  //             onClick={() => this.ezPassDB(3, "items", { item: this.state.EDITitem, kcal: this.state.EDITkcal }, true)}

  //           />
  //         </form>)
  //     } else {
  //       return (this.dataCheck(3))
  //     }
  //   }
  // 
}
