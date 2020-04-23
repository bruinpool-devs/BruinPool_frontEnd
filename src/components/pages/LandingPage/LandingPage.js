import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "reactstrap";
import Cookies from "universal-cookie";

import LandingNavbar from "../../navbar/LandingNavbar";
import Footer from "../../footer/Footer";

import LandingDriver from "./assets/landing_driver.png";
import AboutPoolUp from "./assets/about_poolup.png";
import PoolUpExp from "./assets/poolup_exp.png";
import PoolUpTogether from "./assets/poolup_together.png";
import PoolUpDifference from "./assets/poolup_diff.png";
import WhatStudentsSay from "./assets/what_students_say.png";
import OurPartners from "./assets/our_partners.png";
import GetStarted from "./assets/get_started.png";

import "./LandingPage.css";

const LandingPage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (authToken) {
      history.push("/rider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-driver" style={imageStyle}>
        <LandingNavbar />
        <div className="landing-text">
          <div className="landing-text-title">Travel Far Together</div>
          <div className="landing-text-subtitle">
            PoolUp, a carpool network created by students, for students.
          </div>
          <Button
            style={createButtonStyle}
            onClick={() => history.push("/signup/1")}
          >
            Create an Account
          </Button>
          <div className="landing-about-poolup">
            <div className="about-poolup-left-text">
              About <span className="blue-underline">PoolUp</span>
            </div>
            <div className="about-poolup-right-text">
              <div className="about-poolup-right-top-text">
                PoolUp matches student drivers with empty seats to other
                students traveling in the same direction.
              </div>
              <Button
                style={createButtonStyle2}
                onClick={() => history.push("/signup/1")}
              >
                Create an Account
              </Button>
            </div>
          </div>
          <img src={AboutPoolUp} alt="about-poolup" style={aboutPoolUpStyle} />
          <div className="landing-poolup-experience">
            <div className="landing-poolup-exp-title">
              The PoolUp <span className="blue-underline">Experience</span>
            </div>
            <div style={poolupExpStyle}>
              <div className="learn-more-buttons">
                <Button style={learnMoreStyle2}>Learn More</Button>
                <Button style={learnMoreStyle2}>Learn More</Button>
              </div>
            </div>
          </div>
          <div style={poolupTogetherStyle}>
            <Button
              style={SignupStyle}
              onClick={() => history.push("/signup/1")}
            >
              Sign Up
            </Button>
          </div>
          <img
            src={PoolUpDifference}
            alt="difference"
            style={poolupDiffStyle}
          />
          <Button style={learnMoreStyle}>Learn More</Button>
          <img src={WhatStudentsSay} alt="say" style={whatStudentsStyle} />
          <img src={OurPartners} alt="partner" style={OurPartnersStyle} />
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
      </div>
    </div>
  );
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

const SignupStyle = {
  width: "121px",
  height: "62px",
  marginLeft: "65px",
  marginTop: "305px",
  backgroundColor: "#3d77ff",
  fontWeight: "bold",
  boxShadow: "none",
  borderWidth: "0px",
  fontSize: "17px",
};

const imageStyle = {
  backgroundImage: `url(${LandingDriver}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "100vw",
  borderRadius: "0px",
  height: "100vh",
};

const learnMoreStyle = {
  width: "152px",
  height: "62px",
  borderWidth: "0px",
  boxShadow: "none",
  backgroundColor: "#3d77ff",
  fontSize: "17px",
  marginTop: "7vh",
  marginBottom: "7vh",
  fontWeight: "bold",
};

const learnMoreStyle2 = {
  width: "152px",
  height: "62px",
  borderWidth: "0px",
  boxShadow: "none",
  backgroundColor: "#3d77ff",
  fontSize: "17px",
  fontWeight: "bold",
};

const createButtonStyle = {
  width: "218px",
  height: "62px",
  borderWidth: "0px",
  boxShadow: "none",
  backgroundColor: "#3d77ff",
  fontWeight: "bold",
  fontSize: "17px",
  marginTop: "60px",
};

const createButtonStyle2 = {
  width: "218px",
  height: "58px",
  borderWidth: "0px",
  boxShadow: "none",
  backgroundColor: "#3d77ff",
  fontWeight: "bold",
  fontSize: "17px",
  marginTop: "40px",
};

const aboutPoolUpStyle = {
  height: "441px",
  width: "1198px",
  borderRadius: "0px",
};

const poolupExpStyle = {
  backgroundImage: `url(${PoolUpExp}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "1195px",
  borderRadius: "0px",
  height: "555px",
  marginTop: "5vh",
};

const poolupTogetherStyle = {
  backgroundImage: `url(${PoolUpTogether}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "554px",
  width: "987px",
  borderRadius: "0px",
  marginTop: "9vh",
};

const poolupDiffStyle = {
  borderRadius: "0px",
  height: "1537px",
  width: "1199px",
  marginTop: "8vh",
};

const whatStudentsStyle = {
  borderRadius: "0px",
  height: "548px",
  width: "1440px",
};

const OurPartnersStyle = {
  borderRadius: "0px",
  height: "194px",
  width: "1195px",
  marginTop: "12vh",
  marginBottom: "14vh",
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
};

export default withRouter(LandingPage);
