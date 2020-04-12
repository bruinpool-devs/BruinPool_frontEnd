import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import Navbar from "../../navbar/Navbar";
import WelcomeDiagram from "./begin_driving.png";

import "./DriverRegister2.css";

const DriverRegister2 = ({ history }) => {
  return (
    <div className="signup-page-wrapper">
      <Navbar />
      <div className="signup-form-wrapper">
        <div className="begin-driving-top-row">
          <div className="begin-driving-title">Begin Driving</div>
          <div className="signup-progress-bar">
            <div>Register as a Driver</div>
            <div className="signup-progress-divider">></div>
            <div>Set up Payment</div>
            <div className="signup-progress-divider">></div>
            <div className="signup-current-step">Begin Driving</div>
          </div>
        </div>
        <div className="signup-welcome-title">
          Welcome to the PoolUp experience!
        </div>
        <div className="how-it-works">How it works?</div>
        <img
          src={WelcomeDiagram}
          alt="welcome"
          style={{
            width: "1028px",
            height: "352px",
            borderRadius: "0px",
            marginTop: "30px"
          }}
        />
        <Button
          style={{
            backgroundColor: "#3d77ff",
            color: "white",
            borderWidth: "0px",
            boxShadow: "none",
            width: "230px",
            height: "60px",
            fontSize: "20px",
            marginTop: "45px",
            borderRadius: "10px"
          }}
          onClick={() => history.push("/driver/post")}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default withRouter(DriverRegister2);
