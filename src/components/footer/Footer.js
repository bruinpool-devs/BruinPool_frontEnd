import React from "react";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import BlueLogo from "./assets/blue_logo.png";
import GrayLogo from "./assets/gray_logo.png";
import BlueLogoText from "./assets/blue_logo_text.png";

import "./Footer.css";

const Footer = ({ history }) => {
  return (
    <div className="footer-wrapper">
      <div className="footer-top">
        <div className="footer-top-left">
          <div className="footer-contact">
            <div className="footer-contact-logo">
              <img src={BlueLogo} alt="blue-logo" />
              <img
                src={BlueLogoText}
                alt="blue-logo-text"
                style={BlueLogoTextStyle}
              />
            </div>
            <div className="footer-contact-contact">Contact</div>
            <div className="footer-contact-email">help@poolup.co</div>
          </div>
        </div>
        <div className="footer-top-right">
          <div className="top-right-item">
            <div className="top-right-title">How it works</div>
            <div
              className="top-right-rider"
              onClick={() =>
                history.push({
                  pathname: "/how-it-works",
                  state: {
                    driver: false,
                  },
                })
              }
            >
              Rider
            </div>
            <div
              className="top-right-driver"
              onClick={() =>
                history.push({
                  pathname: "/how-it-works",
                  state: {
                    driver: true,
                  },
                })
              }
            >
              Driver
            </div>
          </div>
          <div className="top-right-item">
            <div className="top-right-title">Company</div>
            <div
              className="top-right-rider"
              onClick={() => history.push("/about-us")}
            >
              Our Team
            </div>
            <div className="top-right-driver">Newsroom</div>
          </div>
          <div className="top-right-item">
            <div className="top-right-title">Support</div>
            <div
              className="top-right-rider"
              onClick={() => history.push("/help-center")}
            >
              Help
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-left">
          <img src={GrayLogo} alt="gray-logo" />
          <div className="footer-poolup-llc">© 2020 PoolUp, LLC.</div>
        </div>
        <div className="footer-bottom-right">
          <div
            className="footer-terms-privacy"
            onClick={() => history.push("/policy")}
          >
            Terms & Privacy
          </div>
          <div className="footer-social-icons">
            <FontAwesomeIcon
              icon={faFacebook}
              style={iconStyle}
              onClick={() => {
                window.location.href =
                  "https://www.facebook.com/poolupofficial";
              }}
            />
            <FontAwesomeIcon
              icon={faLinkedin}
              style={iconStyle}
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/company/poolupofficial";
              }}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              style={iconStyle}
              onClick={() => {
                window.location.href =
                  "https://www.instagram.com/poolupofficial/";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const BlueLogoTextStyle = {
  width: "200px",
  height: "200px",
  marginLeft: "-30px",
};

const iconStyle = {
  width: "30px",
  height: "30px",
  cursor: "pointer",
};

export default withRouter(Footer);
