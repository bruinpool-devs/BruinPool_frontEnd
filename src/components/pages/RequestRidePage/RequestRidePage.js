import React, { useState } from "react";
import moment from "moment";

import { Button, Input } from "reactstrap";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./RequestRidePage.css";

import Navbar from "../../navbar/Navbar";
import { withRouter } from "react-router-dom";
import {
  faPlusSquare,
  faMinusSquare
} from "@fortawesome/free-regular-svg-icons";
import {
  faLongArrowAltRight,
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";

const RequestRidePage = ({ location, history }) => {
  const [luggage, setLuggage] = useState(0);
  const [carryOn, setCarryOn] = useState(0);

  const handleRequestRide1 = () => {
    history.push("/rider/request-ride-summary");
  };

  const incrementCarryOn = () => {
    setCarryOn(carryOn + 1);
  };

  const decrementCarryOn = () => {
    if (carryOn >= 1) {
      setCarryOn(carryOn - 1);
    }
  };

  const incrementLuggage = () => {
    setLuggage(luggage + 1);
  };

  const decrementLuggage = () => {
    if (luggage >= 1) {
      setLuggage(luggage - 1);
    }
  };

  const textAreaStyle = {
    width: "700px",
    height: "120px",
    marginTop: "20px",
    boxShadow: "none"
  };

  const buttonStyle = {
    backgroundColor: "#3d77ff",
    borderWidth: "0px",
    boxShadow: "none",
    marginTop: "30px",
    width: "150px",
    height: "40px"
  };

  return (
    <div className="request-ride">
      <div>
        <Navbar />
      </div>

      <div className="request-ride-content">
        <div className="request-ride-left-div">
          <div className="request-ride-content">
            <div className="request-ride-title">Request Ride</div>
            <div className="request-ride-path1">Review Ride Details</div>
            <div className="request-ride-path1">></div>
            <div className="request-ride-path2">Pending Request</div>
          </div>
          <div className="request-ride-left-content">
            <div className="request-ride-options">Carry-on bags:</div>
            <div className="request-ride-options">
              <FontAwesomeIcon
                icon={faMinusSquare}
                style={{ marginLeft: "15px", marginRight: "15px" }}
                onClick={decrementCarryOn}
              />

              {carryOn}
              <FontAwesomeIcon
                icon={faPlusSquare}
                style={{ marginLeft: "15px", marginRight: "15px" }}
                onClick={incrementCarryOn}
              />
            </div>
            <div className="request-ride-options">Luggage:</div>
            <div className="request-ride-options">
              <FontAwesomeIcon
                icon={faMinusSquare}
                style={{ marginLeft: "15px", marginRight: "15px" }}
                onClick={decrementLuggage}
              />
              {luggage}
              <FontAwesomeIcon
                icon={faPlusSquare}
                style={{ marginLeft: "15px", marginRight: "15px" }}
                onClick={incrementLuggage}
              />
            </div>
            <div className="request-ride-options">Trip Total:</div>
            <div className="request-ride-options">${location.state.price}</div>
            <div className="request-ride-options">Message to the Driver:</div>
            <div className="request-ride-options">
              <Input
                type="textarea"
                placeholder="Is there anything you want to tell the driver? Any pets? Pickup Logistics?"
                style={textAreaStyle}
                //   onChange={e => setDriverNote(e.target.value)}
                //   value={driverNote}
              />
            </div>
            <div className="request-ride-options">
              <Button style={buttonStyle} onClick={handleRequestRide1}>
                Request Ride
              </Button>
            </div>
          </div>
        </div>

        <div className="request-ride-right-div">
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
            {moment(location.state.date)
              .utc()
              .format("M/DD/YY")}{" "}
            <FontAwesomeIcon
              icon={faClock}
              style={{ marginLeft: "70px", marginRight: "10px" }}
            />
            {moment(location.state.date)
              .utc()
              .format("h A")}{" "}
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            {/* Pickup: {location.state.specificPickup} */}
            Pickup: Westwood In N Out
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            {/* Dropoff: {location.state.specificDropoff} */}
            Dropoff: Bay Area near Cupertino
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
              <div className="summary-driver-info-name">
                {location.state.ownerUsername}
              </div>
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

export default withRouter(RequestRidePage);
