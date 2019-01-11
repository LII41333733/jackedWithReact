import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Fitness from "./pages/Fitness";
// import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        
        <Switch>
          {/* <Route exact path="/" component={NewUser} /> */}
          <Route exact path="/" component={Fitness} />
          <Route exact path="/fitness/:id/:date" component={Fitness} />
          
          {/* localhost:3000/fitness/5c37db40214baf2483c862fa/January%208%2C%202019 */}
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
