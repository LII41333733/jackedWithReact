import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fitness from "./pages/Fitness";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* <Route exact path="/" component={NewUser} /> */}
          <Route exact path="/fitness/:id/:date" component={Fitness} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
