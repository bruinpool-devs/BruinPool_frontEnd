import React, { useState } from "react";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const mockData = ["Change of travel plans", "No longer traveling", "Other"];

const _ = require("underscore");

const CancelFilters = () => {
  const [reasonDropdown, setReasonDropdown] = useState(false);
  const [reason, setReason] = useState("Reason");

  const dropdownButtonStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: "#b1b1b1",
    borderWidth: "0.5px",
    boxShadow: "none",
    fontSize: "15px",
    height: "41px"
  };

  const reasonButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: reason === "Reason" ? "#b1b1b1" : "black"
  });

  return (
    <div className="filter-wrapper">
      <ButtonDropdown
        isOpen={reasonDropdown}
        toggle={() => setReasonDropdown(!reasonDropdown)}
        style={{ width: "450px", marginBottom: "20px" }}
      >
        <DropdownToggle style={reasonButtonStyle}>
          <div style={{ marginLeft: "10px" }}>{reason}</div>
        </DropdownToggle>
        <DropdownMenu>
          {mockData.map((reason, index) => (
            <div style={{ width: "450px" }}>
              <DropdownItem onClick={() => setReason(reason)}>
                {reason}
              </DropdownItem>
              {index !== mockData.length - 1 && <DropdownItem divider />}
            </div>
          ))}
        </DropdownMenu>
      </ButtonDropdown>
    </div>
  );
};

export default CancelFilters;
