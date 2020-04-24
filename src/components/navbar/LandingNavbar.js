import React from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import LoginModal from "../modals/LoginModal/LoginModal";
import WhiteLogoText from "./white_logo_text.png";
import BlueLogo from "./blue_logo.png";
import GrayLogoText from "./gray_logo_text.png";

import "./LandingNavbar.css";

const LandingNavbar = ({ history, location }) => {
  const path = location.pathname;

  const DropdownToggleStyle = {
    background: "transparent",
    borderWidth: "0px",
    boxShadow: "none",
    fontWeight: "bold",
    color: path !== "/" && "black",
  };

  return (
    <div className="landing-navbar-wrapper">
      <div className="landing-navbar-container">
        <div className="landing-navbar-logo">
          <img src={BlueLogo} alt="blue-logo" />
          <img
            src={path === "/" ? WhiteLogoText : GrayLogoText}
            alt="white-logo-text"
            style={path === "/" ? WhiteLogoTextStyle : GrayLogoTextStyle}
            onClick={() => history.push("/")}
          />
        </div>
        <div className="landing-navbar-dropdown">
          <UncontrolledDropdown>
            <DropdownToggle style={DropdownToggleStyle} caret>
              How It Works
            </DropdownToggle>
            <DropdownMenu style={DropdownMenuStyle}>
              <DropdownItem
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
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem
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
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle style={DropdownToggleStyle} caret>
              About
            </DropdownToggle>
            <DropdownMenu style={DropdownMenuStyle}>
              <DropdownItem onClick={() => history.push("/about-us")}>
                Our Team
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Newsroom</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <UncontrolledDropdown>
            <DropdownToggle style={DropdownToggleStyle} caret>
              Support
            </DropdownToggle>
            <DropdownMenu style={DropdownMenuStyle}>
              <DropdownItem onClick={() => history.push("/help-center")}>
                Help
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className="landing-navbar-login">
          <LoginModal />
          <Button style={SignupStyle} onClick={() => history.push("/signup/1")}>
            Sign up
          </Button>
        </div>
      </div>
    </div>
  );
};

const WhiteLogoTextStyle = {
  width: "140px",
  height: "40px",
  cursor: "pointer",
};

const GrayLogoTextStyle = {
  width: "210px",
  height: "210px",
  marginLeft: "-30px",
  cursor: "pointer",
};

const SignupStyle = {
  backgroundColor: "#3d77ff",
  color: "white",
  borderWidth: "0px",
  boxShadow: "none",
  width: "130px",
  height: "45px",
  fontSize: "18px",
};

const DropdownMenuStyle = {
  overflowY: "auto",
};

export default withRouter(LandingNavbar);
