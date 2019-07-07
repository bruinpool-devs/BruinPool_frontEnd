import React from "react";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCar,
  faUser,
  faQuestion,
  faCog
} from "@fortawesome/free-solid-svg-icons";

import "./Navbar.css";

const NavbarContent = ({ history, location }) => {
  const path = location.pathname.substr(1);

  let rideClass = "navbar-item";
  let driveClass = "navbar-item";
  let historyClass = "navbar-item";
  let helpClass = "navbar-item";
  let settingsClass = "navbar-item";

  switch (path) {
    case "rider":
      rideClass = "navbar-item-active";
      driveClass = "navbar-item";
      historyClass = "navbar-item";
      helpClass = "navbar-item";
      settingsClass = "navbar-item";
      break;
    case "driver":
      rideClass = "navbar-item";
      driveClass = "navbar-item-active";
      historyClass = "navbar-item";
      helpClass = "navbar-item";
      settingsClass = "navbar-item";
      break;
    case "history":
      rideClass = "navbar-item";
      driveClass = "navbar-item";
      historyClass = "navbar-item-active";
      helpClass = "navbar-item";
      settingsClass = "navbar-item";
      break;
    case "help":
      rideClass = "navbar-item";
      driveClass = "navbar-item";
      historyClass = "navbar-item";
      helpClass = "navbar-item-active";
      settingsClass = "navbar-item";
      break;
    case "settings":
      rideClass = "navbar-item";
      driveClass = "navbar-item";
      historyClass = "navbar-item";
      helpClass = "navbar-item";
      settingsClass = "navbar-item-active";
      break;
    default:
      break;
  }

  return (
    <div className="navbar-container">
      <h2 onClick={() => history.push("/")}>BRUINPOOL</h2>
      <div className={rideClass}>
        <FontAwesomeIcon icon={faHome} pull="left" />
        <p onClick={() => history.push("/rider")}>RIDE</p>
      </div>
      <div className={driveClass}>
        <FontAwesomeIcon icon={faCar} pull="left" />
        <p onClick={() => history.push("/driver")}>DRIVE</p>
      </div>
      <div className={historyClass}>
        <FontAwesomeIcon icon={faUser} pull="left" />
        <p onClick={() => history.push("/history")}>RIDE HISTORY</p>
      </div>
      <div className={helpClass}>
        <FontAwesomeIcon icon={faQuestion} pull="left" />
        <p onClick={() => history.push("/help")}>HELP</p>
      </div>
      <div className={settingsClass}>
        <FontAwesomeIcon icon={faCog} pull="left" />
        <p onClick={() => history.push("/settings")}>SETTINGS</p>
      </div>
    </div>
  );
};

export default withRouter(NavbarContent);
