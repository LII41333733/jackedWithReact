import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fitness from "./pages/Fitness";
// import Detail from "./pages/Detail";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Fitness} />
          <Route exact path="/fitness/:username/:date" component={Fitness} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
