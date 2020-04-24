import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import Footer from "../../../footer/Footer";

import "./HowItWorksPage.css";

const HowDriverWorks = () => {
  return (
    <div className="how-driver-works-wrapper">
      <Footer />
    </div>
  );
};

export default withRouter(HowDriverWorks);
