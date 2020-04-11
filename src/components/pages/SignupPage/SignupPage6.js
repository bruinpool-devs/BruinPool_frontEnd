import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import AltNavbar from "../../navbar/AltNavbar";
import WelcomeDiagram from "./diagram.png";

import "./SignupPage.css";

const SignupPage6 = ({ history }) => {
  return (
    <div className="signup-page-wrapper">
      <AltNavbar />
      <div className="signup-form-wrapper">
        <div className="signup-progress-bar">
          <div>Verify School Email</div>
          <div className="signup-progress-divider">></div>
          <div>Finish Account Set Up</div>
          <div className="signup-progress-divider">></div>
          <div className="signup-current-step">Get Started</div>
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
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default withRouter(SignupPage6);
