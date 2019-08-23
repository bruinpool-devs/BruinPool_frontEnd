import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import LandingPage from "./components/pages/LandingPage/LandingPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import RiderPage from "./components/pages/RiderPage/RiderPage";
import DriverPage from "./components/pages/DriverPage/DriverPage";
import RideHistoryPage from "./components/pages/RideHistoryPage/RideHistoryPage";
import HelpPage from "./components/pages/HelpPage/HelpPage";
import SettingsPage from "./components/pages/SettingsPage/SettingsPage";
import NotificationPage from "./components/pages/NotificationPage/NotificationPage";
import MyAccountPage from "./components/pages/MyAccountPage/MyAccountPage";

import MainState from "./context/MainState";

import "./App.css";

const App = () => {
  return (
    <MainState>
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/rider" component={RiderPage} />
          <Route exact path="/driver" component={DriverPage} />
          <Route exact path="/history" component={RideHistoryPage} />
          <Route exact path="/help" component={HelpPage} />
          <Route exact path="/settings" component={SettingsPage} />
          <Route exact path="/notifications" component={NotificationPage} />
          <Route exact path="/myaccount" component={MyAccountPage} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </MainState>
  );
};

export default App;
