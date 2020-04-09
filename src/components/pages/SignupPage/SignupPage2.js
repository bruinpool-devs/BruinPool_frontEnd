import React from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";

import AltNavbar from "../../navbar/AltNavbar";

import "./SignupPage.css";

const SignupPage2 = ({ history, location }) => {
  const resendVerificationEmail = () => {
    history.push("/signup/3");
  };

  return (
    <div className="signup-page-wrapper">
      <AltNavbar />
      <div className="signup-form-wrapper">
        <div className="signup-progress-bar">
          <div className="signup-current-step">Verify School Email</div>
          <div className="signup-progress-divider">></div>
          <div>Finish Account Set Up</div>
          <div className="signup-progress-divider">></div>
          <div>Get Started</div>
        </div>
      </div>
      <div className="signup-verification-text">
        <div>
          Before setting up your account, we need to verify your email address.
        </div>
        <div>
          We've just sent a verification email to{" "}
          <span style={{ fontWeight: "bold" }}>{location.state.email}</span>.
        </div>
        <div>Please click on the link in that email to continue.</div>
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
          marginTop: "50px",
          borderRadius: "10px"
        }}
        onClick={resendVerificationEmail}
      >
        Send verification email again
      </Button>
    </div>
  );
};

export default withRouter(SignupPage2);
