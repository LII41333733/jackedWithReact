import React from "react";

function DateBar(props) {
  return (
    <nav className="navbar navbar-expand-lg date-bar">
      {props.yesterday}
      <a className="navbar-brand mx-auto" href="/"> {props.date} </a>
      {props.tomorrow}
    </nav>
  );
}

export default DateBar;
