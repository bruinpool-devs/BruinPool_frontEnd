import React from "react";

import LoginForm from "../../modules/LoginForm/LoginForm";

import "../LandingPage/LandingPage.css";

const LoginPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-image" style={imageStyle}>
        <div className="text">
          <h1>PoolUp</h1>
          <p>Enter new slogan here</p>
        </div>
      </div>
      <div className="login-section">
        <LoginForm />
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

export default LoginPage;
