import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Nav from "../components/Nav";
import DateBar from "../components/DateBar";
import WorkoutCard from "../components/WorkoutCard";
// import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

class Fitness extends Component {
  state = {
    fitnessData: [],
    // title: "",
    // author: "",
    // synopsis: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getData("5c3751200607fc3f2009e43a", "January%208%2C%202019")
      .then(res =>
        this.setState({ fitnessData: res.data }, () => {
          console.log(this.state)
          console.log(this.state.fitnessData[0].workoutData.workoutName)
        })
      )
      .catch(err => console.log(err));
  };

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
    return (
      <div>
        <Nav />
        <hr />
        <DateBar />

        <Container fluid>
          <Row>
            <Col size="md-6 sm-12">
              <div className="div1 section mx-auto">
                {/* {(this.state.fitnessData.length !== 0) ? (<h1>{this.state.fitnessData[0].date}</h1>) : (<h1>This</h1>)} */}
              <WorkoutCard />
              </div>
            </Col>
            {/* {<h1>{(this.state.fitnessData[0].date)?(`Hello ${this.state.fitnessData[0].date}`):("Not loaded yet")}</h1>} */}
            {/* {<h1>{this.state.fitnessData[0].workoutData.workoutName}</h1>} */}
            {/* <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron> */}
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


            {/* <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron> */}
            {/* {this.state.books.length ? (
              <List>
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
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )} */}
            <Col size="md-6 sm-12">
              <div className="div2 section mx-auto"></div>
              <div className="div3 section mx-auto"></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Fitness;
