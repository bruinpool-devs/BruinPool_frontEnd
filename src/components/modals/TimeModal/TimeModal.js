import React from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";

import "./TimeModal.css";

const _ = require("underscore");

const AMPM = ["AM", "PM"];
const leftTimestamps = ["12:00", "1:00", "2:00", "3:00", "4:00", "5:00"];
const rightTimestamps = ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00"];

const TimeModal = props => {
  const timeButtonStyle = {
    backgroundColor: props.buttonColor,
    color: props.textColor,
    borderRadius: "15px",
    borderWidth: "1.5px",
    width: "90%",
    minWidth: "50px",
    marginTop: "8px",
    height: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none",
    borderColor: props.borderColor
  };

  const activeButtonStyle = _.extend({}, timeButtonStyle, {
    backgroundColor: props.timePeriod === "AM" ? "#59C3EB" : "#3F6489",
    color: "white"
  });

  const AMButtonStyle = _.extend({}, timeButtonStyle, {
    height: "60px",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: props.timePeriod === "AM" ? "#59C3EB" : props.buttonColor,
    color: props.timePeriod === "AM" ? "white" : props.textColor,
    borderColor: props.timePeriod === "AM" ? "#59C3EB" : props.borderColor
  });

  const PMButtonStyle = _.extend({}, timeButtonStyle, {
    height: "60px",
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: props.timePeriod === "PM" ? "#3F6489" : props.buttonColor,
    color: props.timePeriod === "PM" ? "white" : props.textColor,
    borderColor: props.timePeriod === "PM" ? "#3F6489" : props.borderColor
  });

  return (
    <div className="time-modal-wrapper">
      <div className="ampm-section">
        {AMPM.map(timePeriod => (
          <Button
            key={timePeriod}
            style={timePeriod === "AM" ? AMButtonStyle : PMButtonStyle}
            onClick={() => {
              props.setTimePeriod(timePeriod);
            }}
          >
            <FontAwesomeIcon
              icon={timePeriod === "AM" ? faSun : faMoon}
              style={{
                width: "25px",
                height: "25px",
                color:
                  props.timePeriod === timePeriod ? "white" : props.iconColor
              }}
            />
            <div className="ampm-text">{timePeriod}</div>
          </Button>
        ))}
      </div>
      <div className="time-section">
        <div className="first-time-section">
          {leftTimestamps.map(time => (
            <Button
              key={time}
              style={props.time === time ? activeButtonStyle : timeButtonStyle}
              onClick={() => {
                props.setTime(time);
              }}
            >
              <div className="time-text">{time}</div>
            </Button>
          ))}
        </div>
        <div className="second-time-section">
          {rightTimestamps.map(time => (
            <Button
              key={time}
              style={props.time === time ? activeButtonStyle : timeButtonStyle}
              onClick={() => {
                props.setTime(time);
              }}
            >
              <div className="time-text">{time}</div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeModal;
