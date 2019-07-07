import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg d-flex mx-auto">
      <img className="banner mx-auto" src="./BG2.png" alt="dumbbell"></img>
      {/* <span className="nav-username">Username: {props.username}</span> */}
      <span className="changeDate">CHANGE DATE</span>
      <DatePicker
        selected={props.startDate}
        onChange={props.onChange}
      />
    </nav>
  );
}

export default Nav;
