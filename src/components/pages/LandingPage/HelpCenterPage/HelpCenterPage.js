import React, { useState } from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import LandingNavbar from "../../../navbar/LandingNavbar";
import Footer from "../../../footer/Footer";

import BookFirstRide from "../assets/book_first_ride.png";

import "./HelpCenterPage.css";

const HelpCenterPage = ({ history }) => {
  const [view, toggleView] = useState(false);

  return (
    <div className="help-center-wrapper">
      <LandingNavbar />
      <div className="help-center-title">Help Center</div>
      {!view ? (
        <div className="rider-help">
          <div className="help-toggle">
            <div className="active-help-toggle">Rider</div>
            <div
              className="non-active-help-toggle"
              onClick={() => toggleView(true)}
            >
              Driver
            </div>
          </div>
          <div className="help-first-column">
            <div className="help-column-title">Fees and charges</div>
            <div className="help-column-item">Unexpected charge</div>
            <div className="help-column-item">No-show fee</div>
            <div className="help-column-item">Reviewing fees</div>
            <div className="help-column-item">Temporary authorization</div>
            <div className="help-column-item">Service fee</div>
            <div className="help-column-title">Request a Ride</div>
            <div className="help-column-item">Requesting a ride</div>
            <div className="help-column-item">Getting picked up</div>
            <div className="help-column-item">PoolUp's coverage areas</div>
          </div>
          <div className="help-first-column">
            <div className="help-column-title">Ride Features</div>
            <div className="help-column-item">Riding with pets</div>
            <div className="help-column-item">Ride receipt</div>
            <div className="help-column-item">Sharing route information</div>
            <div className="help-column-title">After Rides</div>
            <div className="help-column-item">Lost items</div>
            <div className="help-column-item">Requesting review</div>
            <div className="help-column-item">Payment setting</div>
            <div className="help-column-item">Leaving a tip for drivers</div>
            <div className="help-column-item">Rating drivers</div>
          </div>
        </div>
      ) : (
        <div className="driver-help">
          <div className="help-toggle">
            <div
              className="non-active-help-toggle"
              onClick={() => toggleView(false)}
            >
              Rider
            </div>
            <div className="active-help-toggle">Driver</div>
          </div>
          <div className="help-first-column">
            <div className="help-column-item-margin">
              Requirement and Application
            </div>
            <div className="help-column-item">How to give a ride</div>
            <div className="help-column-item">
              Report an accident or collision
            </div>
            <div className="help-column-item">
              Sharing your location with trusted contacts
            </div>
            <div className="help-column-item">
              Pull over safely for pickups and drop-offs
            </div>
          </div>
        </div>
      )}
      <div style={firstRideStyle}>
        <Button
          onClick={() => history.push("/signup/1")}
          style={GetStartedButton}
        >
          Get Started
        </Button>
      </div>
      <Footer />
    </div>
  );
};

const GetStartedButton = {
  width: "153px",
  height: "62px",
  backgroundColor: "#3d77ff",
  boxShadow: "none",
  borderWidth: "0px",
  fontWeight: "bold",
  fontSize: "17px",
  marginLeft: "848px",
  marginTop: "82px",
};

const firstRideStyle = {
  backgroundImage: `url(${BookFirstRide}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "1150px",
  height: "230px",
  borderRadius: "0px",
  marginTop: "8vh",
  marginBottom: "12vh",
};

export default withRouter(HelpCenterPage);
