import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Nav(props) {
  return (

    <nav className="navbar navbar-expand-lg d-flex mx-auto">
    <img className="banner mx-auto" src="./BG2.png" alt="dumbbell"></img>
      {/* <a className="navbar-brand text-center mx-auto" href="/"> */}
      {/* <img className="dumbbell my-2" src="./dumbbell.png" alt="dumbbell"></img> */}
        {/* <div className="brand d-flex mx-auto">FEEL THE MERN</div>
        <div className="sub-brand mb-3">Get Jacked with React</div> */}
        <span className="nav-username">Username: {props.username}</span>
      {/* </a> */}
<span className="changeDate">CHANGE DATE</span>
<DatePicker
        selected={props.startDate}
        onChange={props.onChange}
 />
    </nav>

  );
}

export default Nav;
