import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fitness from "./pages/Fitness";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/Signup";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>

        <Switch>
          <Route exact path="/" component={Fitness} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/fitness/:username" component={Fitness} />
          <Route exact path="/fitness" component={Fitness} />
          <Route component={Fitness} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
