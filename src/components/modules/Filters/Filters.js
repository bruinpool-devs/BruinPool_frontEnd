import React, { Component, useState, useContext } from "react";
import Cookies from "universal-cookie";

import DatePicker from "react-datepicker";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button
} from "reactstrap";

import MainContext from "../../../context/mainContext";

import "./Filters.css";
import "react-datepicker/dist/react-datepicker.css";

const mockData = [
  "UCLA",
  "UCSB",
  "Orange County",
  "Irvine",
  "Los Angeles",
  "Pasadena"
];

const _ = require("underscore");

class CustomInput extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          color: "black",
          borderWidth: "0px",
          boxShadow: "none",
          fontSize: "20px",
          height: "51px",
          width: "183px"
        }}
      >
        <FontAwesomeIcon
          icon={faCalendarAlt}
          style={{ color: "#818181", height: "27px", width: "27px" }}
        />
        <div style={{ marginLeft: "10px" }}>{this.props.value}</div>
      </Button>
    );
  }
}

const Filters = () => {
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [fromLocation, setFromLocation] = useState("From");
  const [toLocation, setToLocation] = useState("To");
  const [date, setDate] = useState(new Date());

  const mainContext = useContext(MainContext);

  const filterResults = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    const filter = {
      from: fromLocation,
      to: toLocation,
      date_from: date
    };

    await mainContext.fetchRideFeed(filter, authToken);
  };

  const dropdownButtonStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    color: "#b1b1b1",
    borderWidth: "0px",
    boxShadow: "none",
    fontSize: "20px",
    height: "51px"
  };

  const searchButtonStyle = {
    width: "110px",
    height: "51px",
    backgroundColor: "#3d77ff",
    color: "white",
    borderWidth: "0px",
    boxShadow: "none",
    fontSize: "20px"
  };

  const fromButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: fromLocation === "From" ? "#b1b1b1" : "black"
  });

  const toButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: toLocation === "To" ? "#b1b1b1" : "black"
  });

  return (
    <div className="filter-wrapper">
      <ButtonDropdown
        isOpen={fromDropdown}
        toggle={() => setFromDropdown(!fromDropdown)}
        style={{ width: "367px" }}
      >
        <DropdownToggle style={fromButtonStyle}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={{ color: "#818181", height: "29px", width: "22px" }}
          />
          <div style={{ marginLeft: "10px" }}>{fromLocation}</div>
        </DropdownToggle>
        <DropdownMenu>
          {mockData.map((location, index) => (
            <div key={index} style={{ width: "367px" }}>
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
        style={{ width: "367px" }}
      >
        <DropdownToggle style={toButtonStyle}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            style={{ color: "#818181", height: "29px", width: "22px" }}
          />
          <div style={{ marginLeft: "10px" }}>{toLocation}</div>
        </DropdownToggle>
        <DropdownMenu>
          {mockData.map((location, index) => (
            <div key={index} style={{ width: "367px" }}>
              <DropdownItem onClick={() => setToLocation(location)}>
                {location}
              </DropdownItem>
              {index !== mockData.length - 1 && <DropdownItem divider />}
            </div>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
      <DatePicker
        customInput={<CustomInput />}
        selected={date}
        onChange={date => setDate(date)}
        dateFormat="MM/dd/yy"
      />
      <Button onClick={() => filterResults()} style={searchButtonStyle}>
        Search
      </Button>
    </div>
  );
};

export default Filters;
