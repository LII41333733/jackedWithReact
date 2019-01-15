import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Nav from "../components/Nav"

class Login extends Component {
  state = {
    isLoggedIn: false,
    username: "",
    password: ""
  }

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    })
  }

  // Method to handle user login, should redirect to main page when done
  login = (e) => {
    e.preventDefault();
    API
      .login({ username: this.state.username, password: this.state.password })
      .then(res => {
        console.log(res.data);
        this.setState({ isLoggedIn: res.data })

      })
      .catch(err => {
        
        
        const error = err.response;

        this.setState({
          warning: err.response.data
        })
      }
        
      )
  }

  render() {
    // If user is logged in, take them to main page
    if (this.state.isLoggedIn) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <Nav />
        <div className="section container my-5 login">
          <div className="row justify-content-center">
              <h4 className="text-center">LOG IN TO GET STARTED</h4>
            <form>
            <h5 className={`${(this.state.warning === "Unauthorized") ? `credentials mt-2 red` : `warning`}` }>COULD NOT FIND USER</h5>
              <div className="form-group mt-4">
              <h5 className="credentials mb-3">USERNAME</h5>
                <input
                  type="text"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  className="form-control"
                  />
                <small id="usernameHelp" className="form-text text-muted"></small>
              </div>
              <div className="form-group">
              <h5 className="credentials mb-3">PASSWORD</h5>
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  className="form-control"
                />
              </div>

              <button type="submit" className="btn btn-danger-form d-flex mx-auto" onClick={this.login}><h5 className="credentials">START</h5></button>

              <a href="/Signup"><h5 className="new-account"><i className="fas fa-dumbbell mr-2"></i>SIGN UP HERE<i className="fas fa-dumbbell ml-2"></i></h5></a>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default Login;