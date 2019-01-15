import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";
import Nav from "../components/Nav"


class Login extends Component {
  state = {
    success: false,
    username: "",
    password: ""
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  // Method to register a new user
  register = (e) => {
    e.preventDefault();
    API
      .register({ username: this.state.username, password: this.state.password })
      .then(res => {
        console.log(res.data)
        this.setState({ success: res.data })
      })
      .catch(err => {
        this.setState({
          warning: err.response.data
        })
      });
  }





  render() {

    if (this.state.success) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <Nav />
        <div className="section container my-5 login">
          <div className="row justify-content-center">
            <form>
              <h4 className="text-center">CREATE AN ACCOUNT</h4>
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

              <button type="submit" className="btn btn-danger-form d-flex mx-auto mt-4" onClick={this.register}><h5 className="credentials">SIGN UP</h5></button>

            </form>

          </div>
        </div>
      </div>
    )
  }
}

export default Login;