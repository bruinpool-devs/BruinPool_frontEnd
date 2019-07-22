import React from "react";
import { Button } from "reactstrap";

import "./SeatsModal.css";

const _ = require("underscore");

const seatNum = ["1", "2", "3", "4+"];

const SeatsModal = props => {
  return (
    <div className="seats-modal-wrapper">
      {seatNum.map(filter => (
        <Button
          style={props.seats === filter ? activeButtonStyle : seatsButtonStyle}
          onClick={() => {
            props.setSeats(filter);
            props.toggleModal(false);
          }}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

const seatsButtonStyle = {
  backgroundColor: "white",
  color: "#5C5C5C",
  borderRadius: "60px",
  borderWidth: "1.5px",
  width: "40px",
  fontSize: "18px",
  marginTop: "12px",
  height: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center"
};

var activeButtonStyle = _.extend({}, seatsButtonStyle, {
  backgroundColor: "#1D96EF",
  color: "white"
});

export default SeatsModal;
