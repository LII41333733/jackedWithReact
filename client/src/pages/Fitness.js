import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Nav from "../components/Nav";
import DateBar from "../components/DateBar";
import {WorkoutCard} from "../components/Cards";
import {WaterCard} from "../components/Cards";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Fitness extends Component {
  state = {
    fitnessData: [],
    _id: "5c37dfe310bf592531a8a4b8",
    date: "January%208%2C%202019"
  };

  componentDidMount() {
    this.loadWorkouts();
  }

  loadWorkouts = () => {
    API.getData(this.state._id, this.state.date)
      .then(res =>
        this.setState({ fitnessData: res.data }, () => {
          const data = this.state.fitnessData[0];
          this.configureData(data);
        })
      )
      .catch(err => console.log(err));
  };

  configureData = (data) => {

    const nutritionItems = [];






    console.log(data.workoutData.exercises)
  }

  // deleteBook = id => {
  //   API.deleteBook(id)
  //     .then(res => this.loadBooks())
  //     .catch(err => console.log(err));
  // };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

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

    const data = this.state.fitnessData[0];

    let glasses = [];
     if (this.state.fitnessData.length !== 0) {
       for (let i = 0; i < data.waterData.target; i++) {
         glasses.push(<i class="fas fa-glass-whiskey"></i>)
       }
      }
    

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
                <div className="div1 section mt-4 mx-auto">
                  <WorkoutCard
                    workoutName={`${data.workoutData.workoutName}`}

                    exercises={data.workoutData.exercises.map(({ exercise, notes, reps, sets, section }, i) => {
                      return (
                        <div key={i}>
                          <span class="fa-stack fa-2x mt-4">
                            <i className="fas fa-square fa-stack-2x"></i>
                            <i className="fas fa-stack-1x fa-inverse">{i + 1}</i>
                          </span>
                          <p className="exercise">{exercise}</p>
                          <p className="bodypart">({section})</p>
                          <p className="reps">{sets}x{reps}</p>
                        </div>
                      )
                    })}
                  />
                </div>
              </Col>
              <Col size="md-5 sm-12">
                <div className="div2 section mt-4">
                    <WaterCard 
                      remaining={data.waterData.target - data.waterData.consumed}
                      cups={

                      <div>{glasses}</div>
                      }
                    />
                </div>
                <div className="div3 section mt-4"></div>
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