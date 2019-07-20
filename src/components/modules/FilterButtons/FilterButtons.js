import React, { Component, useState } from "react";
import { Button } from "reactstrap";
import DatePicker from "react-datepicker";

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
    </div>
  );
};

const filterButtonStyle = {
  backgroundColor: "#f7f9fc",
  color: "#5C5C5C",
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "5px",
  height: "36px",
  borderRadius: "10px",
  borderColor: "#5C5C5C"
};

export default FilterButtons;
