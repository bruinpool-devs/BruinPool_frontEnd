import React from "react";
import { withRouter } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ history, location }) => {
  const path = location.pathname;

  return (
    <div className="navbar-container">
      <div className="navbar-logo">POOLUP</div>
      {path.substr(1, 5) === "rider" ? (
        <div className="navbar-items">
          <div
            className="non-active-item"
            onClick={() => history.push("/driver")}
          >
            Become a Driver
          </div>
          <div
            className={path === "/rider" ? "active-item" : "non-active-item"}
            onClick={() => history.push("/rider")}
          >
            Ride
          </div>
          <div
            className={
              path === "/rider/my-rides" ? "active-item" : "non-active-item"
            }
            onClick={() => history.push("/rider/my-rides")}
          >
            My Rides
          </div>
          <div
            className={
              path === "/rider/help" ? "active-item" : "non-active-item"
            }
            onClick={() => history.push("/rider/help")}
          >
            Help
          </div>
          <div
            className={
              path === "/rider/profile" ? "active-photo" : "non-active-photo"
            }
            onClick={() => history.push("/rider/profile")}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
              alt="bear"
            />
          </div>
        </div>
      ) : (
        <div className="navbar-items">
          <div
            className="non-active-item"
            onClick={() => history.push("/rider")}
          >
            Become a Rider
          </div>
          <div
            className={path === "/driver" ? "active-item" : "non-active-item"}
            onClick={() => history.push("/driver")}
          >
            Drive
          </div>
          <div
            className={
              path === "/driver/my-drives" ? "active-item" : "non-active-item"
            }
            onClick={() => history.push("/driver/my-drives")}
          >
            My Drives
          </div>
          <div
            className={
              path === "/driver/help" ? "active-item" : "non-active-item"
            }
            onClick={() => history.push("/driver/help")}
          >
            Help
          </div>
          <div
            className={
              path === "/rider/profile" ? "active-photo" : "non-active-photo"
            }
            onClick={() => history.push("/rider/profile")}
          >
            <img
              src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
              alt="bear"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Navbar);
