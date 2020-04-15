import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import AltNavbar from "../../navbar/AltNavbar";

import "./SignupPage.css";

const SignupPage3 = ({ history, location }) => {
  const handleNext = () => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    history.push({
      pathname: "/signup/4",
      state: { email: email }
    });
  };

  return (
    <div className="signup-page-wrapper">
      <AltNavbar />
      <div className="signup-form-wrapper">
        <div className="signup-progress-bar">
          <div>Verify School Email</div>
          <div className="signup-progress-divider">></div>
          <div className="signup-current-step">Finish Account Set Up</div>
          <div className="signup-progress-divider">></div>
          <div>Get Started</div>
        </div>
      </div>
      <div className="profile-start-text">
        <div>Congratulations! Your email has been verified.</div>
        <div>Complete your profile to get started.</div>
      </div>
      <Button
        style={{
          backgroundColor: "#3d77ff",
          color: "white",
          borderWidth: "0px",
          boxShadow: "none",
          width: "438px",
          height: "53px",
          fontSize: "20px",
          marginTop: "60px",
          borderRadius: "10px"
        }}
        onClick={handleNext}
      >
        Next
      </Button>
    </div>
  );
};

export default withRouter(SignupPage3);
