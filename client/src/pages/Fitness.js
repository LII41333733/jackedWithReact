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
    editModeActive: false
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
      API.updateData(1, "January 8, 2019")
        .catch(err => console.log(err));
    })
  }

  ezPass = (ext) => {
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

  ezPassUpdate = (ext, route, newVal) => {
    const fitnessData = { ...this.state.fitnessData }
    let choice;
    switch (ext) {
      case 1:
        choice = fitnessData.workoutData;
        break;
      case 2:
        choice = fitnessData.waterData;
        break;
      case 3:
        choice = fitnessData.nutritionData;
        break;
      default:
      return false;
    }
    choice[route] = newVal;
    this.updateData(fitnessData);
  }

  ezPassDelete = (ext, route, key) => {
    const fitnessData = { ...this.state.fitnessData }
    let choice;
    switch (ext) {
      case 1:
        choice = fitnessData.workoutData;
        break;
      case 2:
        choice = fitnessData.waterData;
        break;
      case 3:
        choice = fitnessData.nutritionData;
        break;
        default:
        return false;
    }
    choice[route].splice(key, 1)
    this.updateData(fitnessData);
  }

  deleteItem = (key) => {
    this.ezPassState(3).items.splice(key, 1);
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
              exercises={this.ezPass(ext).exercises.map(({ exercise, notes, reps, sets, section }, i) => {
                return (
                  <tr key={i}>
                    <td className="fa-stack fa-2x">
                      <i className="fas fa-square fa-stack-2x"></i>
                      <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                    </td>
                    <td className="exercise">{exercise}</td>
                    <td className="reps">{sets} x {reps}</td>
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
          // return form
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
                      <td><i className="far fa-edit ml-4" onClick={() => { this.editMode(i) }}></i></td>
                      {/* <td><i className="far fa-trash-alt" onClick={() => {this.deleteItem(i)}}></i></td> */}
                      <td><i className="far fa-trash-alt" onClick={() => { this.ezPassDelete(3, "items", i) }}></i></td>
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
    this.ezPassUpdate(2, "consumed", nextValue)
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

  editMode = (huh) => {
    console.log(huh)

  }

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

  render() {

    let data;
    data = this.state.fitnessData;


    return (

      (this.state.fitnessData.length !== 0)

        ?

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
        </div>)

        :

        (<div>
          <Nav />
          <hr />
          <DateBar date={`January 10, 2019`} />
          <Container fluid>
            <Row>
              <Col size="md-6 sm-12">
                <div className="div1 section mx-auto">
                  <WorkoutCard
                    username={`You ain't got no data`}
                  />
                </div>
              </Col>
              <Col size="md-6 sm-12">
                <div className="div2 section mx-auto"></div>
                <div className="div3 section mx-auto"></div>
              </Col>
            </Row>
          </Container>
        </div>)
    )
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
            </form> */}