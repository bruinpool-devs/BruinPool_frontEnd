import React from "react";
import { Button } from "reactstrap";

import "./PriceModal.css";

const _ = require("underscore");

const filters = ["Lowest to Highest", "Highest to Lowest"];

const PriceModal = props => {
  return (
    <div className="price-modal-wrapper">
      {filters.map(filter => (
        <Button
          key={filter}
          style={props.price === filter ? activeButtonStyle : filterButtonStyle}
          onClick={() => {
            props.setPrice(filter);
          }}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
};

const filterButtonStyle = {
  backgroundColor: "white",
  color: "#5C5C5C",
  borderRadius: "15px",
  borderWidth: "1.5px",
  width: "65%",
  minWidth: "180px",
  fontSize: "18px",
  marginTop: "12px",
  height: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "none"
};

var activeButtonStyle = _.extend({}, filterButtonStyle, {
  backgroundColor: "#1D96EF",
  color: "white"
});

export default PriceModal;
