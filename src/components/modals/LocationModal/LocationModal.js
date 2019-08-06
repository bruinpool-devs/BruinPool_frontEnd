import React from "react";
import { Button } from "reactstrap";

import "./LocationModal.css";

const _ = require("underscore");

const norCal = ["East Bay Area", "Central Valley", "San Francisco", "San Jose"];
const soCal = [
  "Irvine",
  "Los Angeles",
  "Orange County",
  "San Diego",
  "Santa Barbara"
];

const LocationModal = props => {
  const locationButtonStyle = {
    backgroundColor: props.buttonColor,
    color: props.textColor,
    borderRadius: "15px",
    borderWidth: "1.5px",
    width: props.buttonWidth,
    minWidth: "135px",
    marginTop: "12px",
    height: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
    borderColor: props.borderColor
  };

  var activeButtonStyle = _.extend({}, locationButtonStyle, {
    backgroundColor: "#1D96EF",
    color: "white"
  });

  return (
    <div className="location-modal-wrapper">
      <div className="location-section">
        <p style={{ color: props.titleColor }}>NORTHERN CALIFORNIA</p>
        {norCal.map(location => (
          <Button
            style={
              props.location === location
                ? activeButtonStyle
                : locationButtonStyle
            }
            onClick={() => {
              props.setLocation(location);
            }}
          >
            <div className="location-text">{location}</div>
          </Button>
        ))}
      </div>
      <div className="location-section">
        <p style={{ color: props.titleColor }}>SOUTHERN CALIFORNIA</p>
        {soCal.map(location => (
          <Button
            style={
              props.location === location
                ? activeButtonStyle
                : locationButtonStyle
            }
            onClick={() => {
              props.setLocation(location);
            }}
          >
            <div className="location-text">{location}</div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default LocationModal;
