import React from "react";

import {
  faFacebook,
  faLinkedin,
  faInstagram
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "../../navbar/Navbar";

import "../RiderPage/RiderPage.css";
import "./HelpPage.css";

const HelpPage = () => {
  const iconStyle = {
    color: "#3d77ff",
    width: "27px",
    height: "27px",
    cursor: "pointer"
  };

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">Hi, how can we help you?</div>
          </div>
          <div className="faq-wrapper">
            <div className="faq-title">Frequently Asked Questions</div>
            <div className="faq-section">
              <div className="faq-half">
                <div className="faq-section-title">Rider</div>
                <div className="faq-section-link">How to get a ride</div>
                <div className="faq-section-link">
                  How to contact the driver
                </div>
                <div className="faq-section-link">How to cancel a ride</div>
                <div className="faq-section-link">Riding with pets</div>
                <div className="faq-section-link">Creating an account</div>
              </div>
              <div className="faq-half">
                <div className="faq-section-title">Driver</div>
                <div className="faq-section-link">
                  Signing up as a driver with PoolUp
                </div>
                <div className="faq-section-link">
                  Vehicle and driver documents
                </div>
                <div className="faq-section-link">
                  I can't create a driver's account
                </div>
                <div className="faq-section-link">How will I get paid?</div>
              </div>
            </div>
          </div>
          <div className="contact-wrapper">
            <div className="contact-title">Contact PoolUp</div>
            <div className="contact-desc">Feel free to contact us!</div>
            <div className="about-us">About Us</div>
            <div className="email-link">E: poolup@outlook.com</div>
            <div className="social-media-links">
              <FontAwesomeIcon icon={faFacebook} style={iconStyle} />
              <FontAwesomeIcon icon={faLinkedin} style={iconStyle} />
              <FontAwesomeIcon icon={faInstagram} style={iconStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
