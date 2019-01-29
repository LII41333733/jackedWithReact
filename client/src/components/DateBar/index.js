import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DateBar(props) {
  return (

    <nav className="navbar navbar-expand-lg date-bar mt-3">
    <a className="navbar-brand mx-auto small pl-5" href="/"><i className="fas fa-angle-left mr-2"></i>Yesterday</a>

      <a className="navbar-brand mx-auto" href="/">
      
        {props.date}
      </a>
      <a className="navbar-brand mx-auto small" href="/">Tomorrow<i className="fas fa-angle-right ml-2"></i></a>
    
    <DatePicker {...props}  />
    

    </nav>

  );
}

export default DateBar;

