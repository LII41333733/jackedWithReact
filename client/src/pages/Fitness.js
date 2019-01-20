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
    fitnessData: [],
  };

  componentDidMount() {
    this.loadWorkouts();
  }

  loadWorkouts = () => {

    API.getData(1, "January 8, 2019")
      .then(res =>
        this.setState({
          fitnessData: res.data[0],
        }, () => {
          this.setState({
            rating: this.state.fitnessData.waterData.consumed
          }, () => {
            // console.log(this.state)
          })
        })
      )
  }

  updateData = (data) => {
    this.setState({
      fitnessData: data
    }, () => {
      API.updateData(1, "January 8, 2019", this.state.fitnessData)
        .catch(err => console.log(err));
      this.setState({
        editMode: false,
        EDITtitle: false,
        EDITworkout: false,
      }, () => {
        this.loadWorkouts();
      })
    })
  }

  ezPass = (ext, route, index) => {
    if (route) {
      let target = this.ezPass(ext)[route][index];
      (ext === 1) ?
        (this.setState({
          editMode: true,
          EDITexercise: target.exercise,
          EDITsets: target.sets,
          EDITreps: target.reps,
          EDITindex: index
        })) :
        (this.setState({
          editMode: true,
          EDITitem: target.item,
          EDITkcal: target.kcal,
          EDITindex: index
        }))

    } else {
      switch (ext) {
        case 1:
          return this.state.fitnessData.workoutData;
        case 2:
          return this.state.fitnessData.waterData;
        case 3:
          return this.state.fitnessData.nutritionData;
        default:
          return this.state.fitnessData;
      }
    }
  }

  ezPassDB = (ext, route, valIndex, update) => {
    let choice;
    const fitnessData = { ...this.state.fitnessData }
    switch (ext) {
      case 1:
        choice = fitnessData.workoutData;
        break;
      case 2:
        choice = fitnessData.waterData;
        choice[route] = valIndex;
        break;
      case 3:
        choice = fitnessData.nutritionData;

        // *** if update is true, valIndex will be a value 
        // *** if update is false, valIndex will be an index (#)

        //if update is set to True
        (update) ?
          // fitnessData.nutritionData["items"][0] = {item: "Bacon and Eggs", kcal: 2000}
          (choice[route][this.state.EDITindex] = valIndex) :
          //else delete the item at the index
          (choice[route].splice(valIndex, 1))
        //update fitnessData
        break;
      default:
        choice = false;

    }

    this.updateData(fitnessData);


  }

  editTitle = () => {
    this.setState({
      EDITtitle: true,
      EDITworkout: true,
      EDITindex: this.state.fitnessData.workoutData.workoutName
    })
  }

  dataCheck = (ext) => {
    switch (ext) {
      case 1:
        if (!this.ezPass(ext).workoutName) {
          // return form
          return (
            <NoData category="Workout" />
          )
        } else {
          return (
            <WorkoutCard
              workoutName={this.ezPass(ext).workoutName}
              editTitle={() => this.editTitle()}
              exercises={this.ezPass(ext).exercises.map(({ exercise, notes, reps, sets, section }, i) => {
                return (
                  <tr key={i}>
                    <td className="fa-stack fa-2x">
                      <i className="fas fa-square fa-stack-2x"></i>
                      <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                    </td>
                    <td className="exercise">{exercise}</td>
                    <td className="reps">{sets} x {reps}</td>
                    <td><i className="far fa-edit ml-4" onClick={() => { this.ezPass(1, "exercises", i) }}></i></td>
                    <td><i className="far fa-trash-alt" onClick={() => { this.ezPassDB(1, "exercises", i) }}></i></td>
                  </tr>
                )
              })}
            />
          )
        }
      case 2:
        if (!this.ezPass(ext).target) {
          // return form
          return (
            <NoData category="Water" />
          )
        } else {
          return (

            <div>
              <WaterCard
                remaining={this.ezPass(ext).target - this.ezPass(ext).consumed}
                size={(this.ezPass(ext).target % 4 === 0) ? ("whiskey-div-small") : ("whiskey-div")}
              />

              <StarRatingComponent
                name="rate1"
                starCount={this.ezPass(ext).target}
                value={this.ezPass(ext).consumed}
                onStarClick={this.onStarClick.bind(this)}
                starColor={`#09d0ff`}
                emptyStarColor={`#333333`}
                renderStarIcon={() => <i className="fas fa-glass-whiskey"></i>}
              />
            </div>
          )
        }
      case 3:
        if (!this.ezPass(ext).target) {
          return (
            <NoData category="nutrition" />
          )
        } else {
          return (

            <div>
              <NutritionCard
                status={this.reduceCalories().status}
                target={this.ezPass(ext).target}
                current={this.reduceCalories().total}
                items={this.ezPass(ext).items.map(({ item, kcal }, i) => {
                  return (
                    <tr key={i}>
                      <td className="fa-stack fa-2x">
                        <i className="fas fa-square fa-stack-2x"></i>
                        <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                      </td>
                      <td className="item max">{item}</td>
                      <td className="calories">{kcal}</td>
                      <td><i className="far fa-edit ml-4" onClick={() => { this.ezPass(3, "items", i) }}></i></td>
                      <td><i className="far fa-trash-alt" onClick={() => { this.ezPassDB(3, "items", i) }}></i></td>
                    </tr>
                  )
                })}

              />
            </div>
          )
        }
      default:
        return false;
    }
  }

  onStarClick = (nextValue, prevValue, name) => {
    this.ezPassDB(2, "consumed", nextValue)
  }

  reduceCalories = () => {
    const data = this.state.fitnessData.nutritionData
    let count = 0;
    data.items.forEach((item) => {
      count += item.kcal
    })
    return (count <= data.target) ? ({ status: "green", total: count }) : ({ status: "red", total: count })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  checkEdit = (ext) => {

    if (ext === 1) {
      if (this.state.EDITtitle && this.state.EDITworkout) {
        return (
          <form>
            <Input
              value={this.state.EDITindex}
              onChange={this.handleInputChange}
              name="EDITindex"
              placeholder="Workout Name (required)"
            />

            <UpdateButton
              onClick={() => this.ezPassDB(1, "workoutName", this.setState.EDITindex, true)}

            />
          </form>
        )
      }

      if (this.state.editMode && ext === 1) {
        return (
          <form>
            <Input
              value={this.state.EDITexercise}
              onChange={this.handleInputChange}
              name="EDITitem"
              placeholder="Item (required)"
            />
            <Input
              value={this.state.EDITkcal}
              onChange={this.handleInputChange}
              name="EDITkcal"
              placeholder="Calories (required)"
            />
            <UpdateButton

              onClick={() => this.ezPassDB(1, "", { item: this.state.EDITitem, kcal: this.state.EDITkcal }, true)}

            />
          </form>)
      } else {
        return (this.dataCheck(1))
      }
    } else {
      if (this.state.editMode) {
        return (
          <form>
            <Input
              value={this.state.EDITitem}
              onChange={this.handleInputChange}
              name="EDITitem"
              placeholder="Item (required)"
            />
            <Input
              value={this.state.EDITkcal}
              onChange={this.handleInputChange}
              name="EDITkcal"
              placeholder="Calories (required)"
            />
            <UpdateButton

              onClick={() => this.ezPassDB(3, "items", { item: this.state.EDITitem, kcal: this.state.EDITkcal }, true)}

            />
          </form>)
      } else {
        return (this.dataCheck(3))
      }
    }
  }


















  //////////////////////// RENDER ////////////////////////


  render() {

    let data;
    data = this.state.fitnessData;

    return (
      (this.state.fitnessData.length !== 0) ?
        (<div>
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

                  {this.checkEdit(1)}

                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div className="div2 section text-center mt-4">

                  {this.dataCheck(2)}

                </div>
                <div className="div3 section mt-4">

                  {this.checkEdit(3)}

                </div>
              </Col>
            </Row>
          </Container>
        </div>) : (-1)
    )
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