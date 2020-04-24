import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import LandingNavbar from "../../../navbar/LandingNavbar";
import HowRiderWorks from "./HowRiderWorks";
import HowDriverWorks from "./HowDriverWorks";

import HowWorksHeader from "./assets/how_works_header.png";

import "./HowItWorksPage.css";

const HowItWorksPage = ({ location }) => {
  const [view, toggleView] = useState(false);

  useEffect(() => {
    if (location.state.driver) {
      toggleView(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="how-it-works-wrapper">
      <LandingNavbar />
      <img src={HowWorksHeader} alt="how-works-header" style={headerStyle} />
      <div className="how-works-toggle">
        <Button
          style={!view ? activeButton : nonActiveButton}
          onClick={() => toggleView(false)}
        >
          Riders
        </Button>
        <Button
          style={view ? activeButton : nonActiveButton}
          onClick={() => toggleView(true)}
        >
          Drivers
        </Button>
      </div>
      {!view ? <HowRiderWorks /> : <HowDriverWorks />}
    </div>
  );
};

const headerStyle = {
  borderRadius: "0px",
  width: "975px",
  height: "110px",
  marginTop: "5vh",
};

const activeButton = {
  backgroundColor: "#3d77ff",
  color: "white",
  width: "106px",
  height: "62px",
  boxShadow: "none",
  borderWidth: "0px",
  borderRadius: "0px",
  fontSize: "18px",
  fontWeight: "bold",
};

const nonActiveButton = {
  backgroundColor: "#e8e8e8",
  color: "#383838",
  width: "106px",
  height: "62px",
  boxShadow: "none",
  borderWidth: "0px",
  borderRadius: "0px",
  fontSize: "18px",
};

export default withRouter(HowItWorksPage);
