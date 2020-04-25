import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import Footer from "../../../footer/Footer";

import CollegeBased1 from "./assets/college_based_1.png";
import HowToRide1 from "./assets/how_to_ride_1.png";
import TravelCheap from "./assets/travel_cheap.png";
import WhatRidersSay from "./assets/what_riders_say.png";
import GetStarted from "../assets/get_started.png";

import "./HowItWorksPage.css";

const HowRiderWorks = ({ history }) => {
  return (
    <div className="how-rider-works-wrapper">
      <img src={CollegeBased1} alt="college-based" style={collegeBasedStyle} />
      <img src={HowToRide1} alt="how-to-ride" style={howToRideStyle} />
      <div style={travelCheapStyle}>
        <div className="find-a-ride-buttons">
          <Button
            style={findARideButton}
            onClick={() => history.push("/signup/1")}
          >
            Find a Ride
          </Button>
          <Button
            style={findARideButton2}
            onClick={() => history.push("/signup/1")}
          >
            Find a Ride
          </Button>
        </div>
      </div>
      <img src={WhatRidersSay} alt="what-say" style={whatRidersSayStyle} />
      <div style={GetStartedStyle}>
        <Button
          style={GetStartedButton}
          onClick={() => history.push("/signup/1")}
        >
          Get Started
        </Button>
      </div>
      <Footer />
    </div>
  );
};

const findARideButton = {
  width: "153px",
  height: "62px",
  backgroundColor: "#3d77ff",
  boxShadow: "none",
  borderWidth: "0px",
  fontWeight: "bold",
  fontSize: "17px",
};

const findARideButton2 = {
  width: "153px",
  height: "62px",
  backgroundColor: "#3d77ff",
  boxShadow: "none",
  borderWidth: "0px",
  fontWeight: "bold",
  fontSize: "17px",
  marginLeft: "10px",
};

const travelCheapStyle = {
  backgroundImage: `url(${TravelCheap}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "1243px",
  height: "1884px",
  borderRadius: "0px",
  marginTop: "10vh",
};

const GetStartedStyle = {
  backgroundImage: `url(${GetStarted}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  borderRadius: "0px",
  height: "459px",
  width: "1439px",
  marginBottom: "10vh",
  marginTop: "15vh",
};

const GetStartedButton = {
  width: "153px",
  height: "62px",
  backgroundColor: "#3d77ff",
  boxShadow: "none",
  borderWidth: "0px",
  fontWeight: "bold",
  fontSize: "17px",
  marginLeft: "170px",
  marginTop: "290px",
};

const collegeBasedStyle = {
  borderRadius: "0px",
  width: "1440px",
  height: "485px",
};

const howToRideStyle = {
  borderRadius: "0px",
  width: "1158px",
  height: "919px",
  marginTop: "10vh",
};

const whatRidersSayStyle = {
  width: "1137px",
  height: "462px",
  borderRadius: "0px",
  marginTop: "10vh",
};

export default withRouter(HowRiderWorks);
