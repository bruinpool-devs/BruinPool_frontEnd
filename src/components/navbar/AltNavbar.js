import React from "react";

import WhiteLogo from "./white_logo.png";
import WhiteLogoText from "./white_logo_text.png";

import "./AltNavbar.css";

const AltNavbar = () => {
  return (
    <div className="altnavbar-wrapper">
      <img
        src={WhiteLogo}
        alt="white-logo"
        style={{ width: "70px", height: "70px" }}
      />
      <img
        src={WhiteLogoText}
        alt="white-logo-text"
        style={{ width: "200px", height: "55px" }}
      />
    </div>
  );
};

export default AltNavbar;
