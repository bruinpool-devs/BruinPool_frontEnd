import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import Footer from "../../../footer/Footer";

import "./HowItWorksPage.css";

const HowRiderWorks = () => {
  return (
    <div className="how-rider-works-wrapper">
      <Footer />
    </div>
  );
};

export default withRouter(HowRiderWorks);
