import React from "react";

function Nav(props) {
  return (

    <nav className="navbar navbar-expand-lg d-flex mx-auto">
      <a className="navbar-brand text-center mx-auto" href="/">
      <img className="dumbbell my-2" src="./dumbbell.png"></img>
        <div className="brand">FEEL THE MERN</div>
        <div className="sub-brand mb-3">Get Jacked with React</div>
        <span className="nav-username">{props.username}</span>
      </a>
    </nav>

  );
}

export default Nav;
