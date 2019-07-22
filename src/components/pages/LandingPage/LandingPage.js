import React, { useContext } from "react";
import { withRouter } from "react-router-dom";

import SignupForm from "../../modules/SignupForm/SignupForm";
import MainContext from "../../../context/mainContext";

import "./LandingPage.css";

const LandingPage = () => {
  const mainContext = useContext(MainContext);
  console.log(mainContext.userInfo);

  return (
    <div className="landing-container">
      <div className="landing-image" style={imageStyle}>
        <div className="text">
          <h1>BRUINPOOL</h1>
          <p>Save money, Make friends</p>
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
