import React, { useState } from "react";

import LandingNavbar from "../../../navbar/LandingNavbar";

import HowWorksHeader from "./assets/how_works_header.png";

import "./HowItWorksPage.css";

const HowItWorksPage = () => {
  const [view, toggleView] = useState(false);

  return (
    <div className="how-it-works-wrapper">
      <LandingNavbar />
      <img src={HowWorksHeader} alt="how-works-header" style={headerStyle} />
    </div>
  );
};

const headerStyle = {
  borderRadius: "0px",
  width: "975px",
  height: "110px",
  marginTop: "5vh",
};

export default HowItWorksPage;
