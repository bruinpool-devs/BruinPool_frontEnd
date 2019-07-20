import React, { Component, useState } from "react";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "./FilterButtons.css";
import "react-datepicker/dist/react-datepicker.css";

class CustomInput extends Component {
  render() {
    return (
      <Button style={filterButtonStyle} onClick={this.props.onClick}>
        Date
      </Button>
    );
  }
}

const FilterButtons = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="filter-row">
      <DatePicker
        customInput={<CustomInput />}
        selected={date}
        onChange={date => setDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="Time"
      />
      <Button style={filterButtonStyle}>Departure</Button>
      <Button style={filterButtonStyle}>Destination</Button>
      <Button style={filterButtonStyle}>Price</Button>
      <Button style={filterButtonStyle}>Seats</Button>
      <Button
        style={{
          backgroundColor: "#1D96EF",
          height: "38px",
          borderWidth: "0px",
          borderRadius: "10px"
        }}
      >
        <FontAwesomeIcon
          icon={faSearch}
          style={{ width: "18px", height: "18px" }}
        />
      </Button>
    </div>
  );
};

const filterButtonStyle = {
  backgroundColor: "#f7f9fc",
  color: "#5C5C5C",
  fontSize: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "14px",
  height: "38px",
  borderRadius: "10px",
  borderColor: "#5C5C5C"
};

export default FilterButtons;
