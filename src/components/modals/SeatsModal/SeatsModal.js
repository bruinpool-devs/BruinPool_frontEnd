import React from "react";
import { Button } from "reactstrap";

import "./SeatsModal.css";

const _ = require("underscore");

const seatNum = ["1", "2", "3", "4"];

const SeatsModal = props => {
  const seatsButtonStyle = {
    backgroundColor: props.buttonColor,
    color: props.textColor,
    borderRadius: "60px",
    borderWidth: "1.5px",
    borderColor: props.borderColor,
    width: "40px",
    fontSize: "18px",
    marginTop: "12px",
    height: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "none"
  };

  var activeButtonStyle = _.extend({}, seatsButtonStyle, {
    backgroundColor: "#1D96EF",
    color: "white"
  });

  return (
    <div className="seats-modal-wrapper">
      {seatNum.map(filter => (
        <Button
          key={filter}
          style={props.seats === filter ? activeButtonStyle : seatsButtonStyle}
          onClick={() => {
            props.setSeats(filter);
          }}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

export default SeatsModal;
