import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fitness from "./pages/Fitness";
// import Detail from "./pages/Detail";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Fitness} />
          <Route exact path="/fitness/:id/:date" component={Fitness} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
