import React, { useState, useContext } from "react";
import moment from "moment";

import { Button, Input } from "reactstrap";
import Cookies from "universal-cookie";
import MainContext from "../../../context/mainContext";

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

  let ride = location.state;
  const mainContext = useContext(MainContext);

  const handleRequestRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const username = cookies.get("userName");

    let requestInfo = {
      senderID: username,
      rideID: ride.id,
      recipientID: ride.ownerUsername,
      luggage: luggage,
      carryon: carryOn,
      msg: ride.driverNote
    };

    let res = await mainContext.createRequest(requestInfo, authToken);
    if (!res) {
      // TODO: Add better UI to display failure
      console.log("Create Request Failed");
      return;
    }

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

  const minusIconStyle = {
    marginLeft: "15px",
    marginRight: "15px",
    cursor: "pointer",
    width: "20px",
    height: "20px",
    color: "#9AA6C2"
  };

  const plusIconStyle = {
    marginLeft: "15px",
    marginRight: "15px",
    cursor: "pointer",
    width: "20px",
    height: "20px",
    color: "#3D77FF"
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
              <div>
                <FontAwesomeIcon
                  icon={faMinusSquare}
                  style={minusIconStyle}
                  onClick={decrementCarryOn}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>{carryOn}</div>
              <div>
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  style={plusIconStyle}
                  onClick={incrementCarryOn}
                />
              </div>
            </div>
            <div className="request-ride-options">Luggage:</div>
            <div className="request-ride-options">
              <div>
                <FontAwesomeIcon
                  icon={faMinusSquare}
                  style={minusIconStyle}
                  onClick={decrementLuggage}
                />
              </div>
              <div style={{ fontWeight: "bold" }}>{luggage}</div>
              <div>
                <FontAwesomeIcon
                  icon={faPlusSquare}
                  style={plusIconStyle}
                  onClick={incrementLuggage}
                />
              </div>
            </div>
            <div className="request-ride-options">Trip Total:</div>
            <div className="request-ride-options">${ride.price}</div>
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
              <Button style={buttonStyle} onClick={handleRequestRide}>
                Request Ride
              </Button>
            </div>
          </div>
        </div>

        <div className="request-ride-right-div">
          <div className="cardLine-title">Ride Summary</div>
          <div className="cardLine-location">
            {ride.from}
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              style={{ marginLeft: "15px", marginRight: "15px" }}
            />
            {ride.to}
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            {moment(ride.date)
              .utc()
              .format("M/DD/YY")}{" "}
            <FontAwesomeIcon
              icon={faClock}
              style={{ marginLeft: "70px", marginRight: "10px" }}
            />
            {moment(ride.date)
              .utc()
              .format("h A")}{" "}
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            {/* Pickup: {ride.specificPickup} */}
            Pickup: Westwood In N Out
          </div>
          <div className="cardLine-info">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              style={{ marginLeft: "0px", marginRight: "10px" }}
            />
            {/* Dropoff: {ride.specificDropoff} */}
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
                {ride.ownerUsername}
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
            <div className="cardLine-info-note">{ride.driverNote} </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RequestRidePage);
