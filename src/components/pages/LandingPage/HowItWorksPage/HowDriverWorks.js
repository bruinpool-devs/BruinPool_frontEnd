import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import Footer from "../../../footer/Footer";

import CollegeBased2 from "./assets/college_based_2.png";
import HowToRide2 from "./assets/how_to_ride_2.png";
import DriverBenefits from "./assets/driver_benefits.png";
import Environment from "./assets/environment.png";
import WhatDriversSay from "./assets/what_drivers_say.png";
import GetStarted from "../assets/get_started.png";

import "./HowItWorksPage.css";

const HowDriverWorks = ({ history }) => {
  return (
    <div className="how-driver-works-wrapper">
      <img src={CollegeBased2} alt="college-based" style={collegeBasedStyle} />
      <img src={HowToRide2} alt="how-to-ride" style={howToDriveStyle} />
      <img
        src={DriverBenefits}
        alt="driver-benefits"
        style={driverBenefitsStyle}
      />
      <div style={environmentStyle}>
        <Button
          style={postARideButton}
          onClick={() => history.push("/signup/1")}
        >
          Post a Ride
        </Button>
      </div>
      <img src={WhatDriversSay} alt="what-say" style={whatDriversSayStyle} />
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

const postARideButton = {
  width: "153px",
  height: "62px",
  backgroundColor: "#3d77ff",
  boxShadow: "none",
  borderWidth: "0px",
  fontWeight: "bold",
  fontSize: "17px",
  marginTop: "70vh",
  marginLeft: "580px",
};

const environmentStyle = {
  backgroundImage: `url(${Environment}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "1202px",
  height: "1207px",
  borderRadius: "0px",
  marginTop: "10vh",
};

const driverBenefitsStyle = {
  borderRadius: "0px",
  width: "1440px",
  height: "715px",
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

const howToDriveStyle = {
  borderRadius: "0px",
  width: "1156px",
  height: "943px",
  marginTop: "10vh",
};

const whatDriversSayStyle = {
  width: "1141px",
  height: "499px",
  borderRadius: "0px",
  marginTop: "10vh",
};

export default withRouter(HowDriverWorks);
