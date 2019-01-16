import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fitness from "./pages/Fitness";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Detail from "./pages/Detail";
<<<<<<< HEAD
import NoMatch from "./pages/Signup";
=======
>>>>>>> 2f85c277374d5eaa5a67bc62a79e6595eb6534a2
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
<<<<<<< HEAD

        <Switch>
          <Route exact path="/" component={Fitness} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/fitness/:username" component={Fitness} />
          <Route exact path="/fitness" component={Fitness} />
          <Route component={Fitness} />
=======
        <Switch>
          <Route exact path="/" component={Fitness} />
          <Route exact path="/fitness/:id/:date" component={Fitness} />
>>>>>>> 2f85c277374d5eaa5a67bc62a79e6595eb6534a2
        </Switch>
      </div>
    </Router>
  );
}

export default App;
