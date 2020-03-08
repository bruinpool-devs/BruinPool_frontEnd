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
import MyRidesPage from "./components/pages/MyRidesPage/MyRidesPage";
import DriverPage from "./components/pages/DriverPage/DriverPage";
import MyDrivesPage from "./components/pages/MyDrivesPage/MyDrivesPage";
import HelpPage from "./components/pages/HelpPage/HelpPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import RideCheckoutPage from "./components/pages/RideCheckoutPage/RideCheckoutPage";
import PostRideSummary from "./components/pages/DriverPage/PostRideSummary";
import RequestRidePage from "./components/pages/RequestRidePage/RequestRidePage";
import RequestRideSummary from "./components/pages/RequestRidePage/RequestRideSummary";
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
          <Route exact path="/rider/my-rides" component={MyRidesPage} />
          <Route exact path="/rider/help" component={HelpPage} />
          <Route exact path="/rider/profile" component={ProfilePage} />
          <Route exact path="/driver" component={DriverPage} />
          <Route exact path="/driver/my-drives" component={MyDrivesPage} />
          <Route exact path="/driver/help" component={HelpPage} />
          <Route exact path="/driver/profile" component={ProfilePage} />
          <Route exact path="/ride/checkout" component={RideCheckoutPage} />
          <Route exact path="/rider/request-ride" component={RequestRidePage} />
          <Route
            exact
            path="/rider/request-ride-summary"
            component={RequestRideSummary}
          />
          <Route
            exact
            path="/driver/post-summary"
            component={PostRideSummary}
          />

          <Redirect to="/" />
        </Switch>
      </Router>
    </MainState>
  );
};

export default App;
