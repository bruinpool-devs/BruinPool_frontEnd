import React, { useState } from "react";

import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input
} from "reactstrap";
import {
  faMapMarkerAlt,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faUser
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DriverPost.css";
import "../DriverRegister/DriverRegister.css";

const mockData = [
  "UCLA",
  "UCSB",
  "Orange County",
  "Irvine",
  "Los Angeles",
  "Pasadena"
];

const _ = require("underscore");

const DriverPost = ({ toggleRegistered }) => {
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [fromLocation, setFromLocation] = useState("From");
  const [toLocation, setToLocation] = useState("To");

  const dropdownButtonStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    color: "#b1b1b1",
    borderWidth: "0px",
    boxShadow: "none",
    fontSize: "20px",
    height: "45px",
    border: "1px solid #c4c4c4"
  };

  const fromButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: fromLocation === "From" ? "#b1b1b1" : "black"
  });

  const toButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: toLocation === "To" ? "#b1b1b1" : "black"
  });

  const optionStyle = {
    width: "200px",
    height: "45px",
    marginTop: "20px",
    borderWidth: "0px 0px 2px 0px",
    borderRadius: "0px",
    marginLeft: "10px",
    boxShadow: "none"
  };

  const textAreaStyle = {
    height: "120px",
    marginTop: "40px",
    boxShadow: "none"
  };

  const iconStyle = {
    color: "#818181",
    height: "21px",
    width: "16px",
    marginBottom: "-17px"
  };

  const buttonStyle = {
    backgroundColor: "#3d77ff",
    borderWidth: "0px",
    boxShadow: "none",
    marginTop: "30px",
    width: "120px",
    height: "40px"
  };

  return (
    <div className="drive-register-wrapper">
      <div className="drive-register-container">
        <div className="drive-register-title-row">
          <div className="title">Post a Ride</div>
          <Button
            onClick={() => toggleRegistered(false)}
            color="success"
            style={{ marginLeft: "20px" }}
          >
            Toggle Screen
          </Button>
        </div>
        <div className="post-form">
          <div className="post-from-to">
            <ButtonDropdown
              isOpen={fromDropdown}
              toggle={() => setFromDropdown(!fromDropdown)}
              style={{ width: "420px" }}
            >
              <DropdownToggle style={fromButtonStyle}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#818181", height: "21px", width: "16px" }}
                />
                <div style={{ marginLeft: "20px" }}>{fromLocation}</div>
              </DropdownToggle>
              <DropdownMenu>
                {mockData.map((location, index) => (
                  <div style={{ width: "420px" }}>
                    <DropdownItem onClick={() => setFromLocation(location)}>
                      {location}
                    </DropdownItem>
                    {index !== mockData.length - 1 && <DropdownItem divider />}
                  </div>
                ))}
              </DropdownMenu>
            </ButtonDropdown>
            <ButtonDropdown
              isOpen={toDropdown}
              toggle={() => setToDropdown(!toDropdown)}
              style={{ width: "420px" }}
            >
              <DropdownToggle style={toButtonStyle}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#818181", height: "21px", width: "16px" }}
                />
                <div style={{ marginLeft: "20px" }}>{toLocation}</div>
              </DropdownToggle>
              <DropdownMenu>
                {mockData.map((location, index) => (
                  <div style={{ width: "420px" }}>
                    <DropdownItem onClick={() => setToLocation(location)}>
                      {location}
                    </DropdownItem>
                    {index !== mockData.length - 1 && <DropdownItem divider />}
                  </div>
                ))}
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
            <Input placeholder="Specific Pickup Location" style={optionStyle} />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faCalendarAlt} style={iconStyle} />
            <Input type="date" style={optionStyle} />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faDollarSign} style={iconStyle} />
            <Input type="number" placeholder="Price" style={optionStyle} />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faUser} style={iconStyle} />
            <Input
              type="number"
              placeholder="Available Seats"
              style={optionStyle}
            />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faClock} style={iconStyle} />
            <Input type="time" placeholder="Pickup Time" style={optionStyle} />
          </div>
          <div className="post-options">
            <Input
              type="textarea"
              placeholder="Write about your ride! I am traveling to..."
              style={textAreaStyle}
            />
          </div>
          <div className="post-options">
            <Button style={buttonStyle}>Post Ride</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPost;
