import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";

import AltNavbar from "../../navbar/AltNavbar";
import MainContext from "../../../context/mainContext";

import "./SignupPage.css";

const VerificationExpiredPage = ({ history, location }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (authToken) {
      history.push("/rider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const resendVerificationEmail = async () => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");

    await mainContext.sendVerificationEmail(email);
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
        <div>We're sorry, your email verification link has expired.</div>
        <div>
          Please resend verification email to{" "}
          <span style={{ fontWeight: "bold" }}>youremail@inbox.com</span>
        </div>
        <div>and try again.</div>
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
        onClick={resendVerificationEmail}
      >
        Resend email
      </Button>
      <div
        className="change-my-email"
        onClick={() => history.push("/signup/1")}
      >
        I need to change my email
      </div>
    </div>
  );
};

export default withRouter(VerificationExpiredPage);
