import React from "react";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-image">
        <img
          src={process.env.PUBLIC_URL + "/images/login_photo.jpg"}
          alt="landing"
        />
      </div>
      <div className="login-section">
        <h1>Login Form</h1>
      </div>
    </div>
  );
};

export default LandingPage;
