import React from "react";

function DateBar(props) {
  return (

    <nav className="navbar navbar-expand-lg date-bar mt-3">
      <a className="navbar-brand mx-auto" href="/">
        {props.date}
      </a>
    </nav>

  );
}

export default DateBar;
