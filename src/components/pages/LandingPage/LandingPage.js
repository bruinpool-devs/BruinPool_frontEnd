import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

import SignupForm from "../../modules/SignupForm/SignupForm";

import "./LandingPage.css";

const LandingPage = ({ history }) => {
  useEffect(() => {
    history.push("/rider");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-image" style={imageStyle}>
        <div className="text">
          <h1>PoolUp</h1>
          <p>Enter new slogan here</p>
        </div>
      </div>
      <div className="login-section">
        <SignupForm />
      </div>
    </div>
  );
};

const imageStyle = {
  backgroundImage: `url(${process.env.PUBLIC_URL}/images/login_photo.jpg)`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat"
};

export default withRouter(LandingPage);
