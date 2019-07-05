import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/pages/LandingPage/LandingPage";

import MainState from "./context/MainState";

import "./App.css";

const App = () => {
  return (
    <MainState>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </Router>
    </MainState>
  );
};

export default App;
