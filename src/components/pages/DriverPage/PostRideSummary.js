import React from "react";
import Cookies from "universal-cookie";

import Navbar from "../../navbar/Navbar";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

import { faCheckSquare, faBell } from "@fortawesome/free-regular-svg-icons";
import {
  faLongArrowAltRight,
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";

import "./PostRideSummary.css";

const PostRideSummary = ({ location, history }) => {
  const iconStyle = {
    marginLeft: "30px",
    marginRight: "32px",
    marginBottom: "-7px",
    color: "#3D77FF",
    width: "35px",
    height: "35px"
  };

  const cookies = new Cookies();
  const userName = cookies.get("userName");

  return (
    <div className="post-ride-summary">
      <div>
        <Navbar />
      </div>

      <div className="post-ride-summary-content">
        <div className="post-ride-summary-left-div">
          <div className="ride-posted"> Ride Posted!</div>
          <div className="ride-summary">
            <FontAwesomeIcon icon={faCheckSquare} style={iconStyle} />
            Your ride has been posted to the dashboard!
          </div>
          <div className="ride-summary">
            <FontAwesomeIcon icon={faBell} style={iconStyle} />
            Once a rider requests your ride, you will recieve a web notification
            and an email.
          </div>
          <div className="ride-summary">
            <FontAwesomeIcon icon={faLongArrowAltRight} style={iconStyle} />
            Please check your Drive Section to view your posted drive.
          </div>
          <div>
            <Button
              style={{
                borderColor: "#3D77FF",
                backgroundColor: "#3D77FF",
                color: "white",
                boxShadow: "none",
                padding: "7px 15px 7px 15px",
                marginLeft: "137px"
              }}
              onClick={() => history.push("/driver/my-drives")}
            >
              Go to My Drives
            </Button>
          </div>
        </div>

        <div className="post-ride-summary-right-div">
          <div className="cardLine-title">Ride Summary</div>
          <div className="cardLine-location">
            {location.state.from}
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              style={{ marginLeft: "15px", marginRight: "15px" }}
            />
            {location.state.to}
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            {location.state.date}
            <FontAwesomeIcon
              icon={faClock}
              style={{ marginLeft: "70px", marginRight: "10px" }}
            />
            {location.state.time}
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            Pickup: {location.state.specificPickup}
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            Dropoff: {location.state.specificDropoff}
          </div>
          <div className="line" />
          <div className="cardLine-info">Driver:</div>
          <div className="summary-driver-info">
            <div className="summary-driver-info-img">
              <img
                src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                alt="bear"
              />
            </div>
            <div>
              <div className="summary-driver-info-name">{userName}</div>
              <div className="summary-driver-info-school">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ marginRight: "5px" }}
                />
                UCLA
              </div>
            </div>
          </div>
          <div className="cardLine-info">
            <div className="cardLine-info-driverNote"> Driver's Note </div>
            <div className="cardLine-info-note">
              {location.state.driverNote}{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostRideSummary);
