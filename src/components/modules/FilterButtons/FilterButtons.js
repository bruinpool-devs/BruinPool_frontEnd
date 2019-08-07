import React, { Component, useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import DatePicker from "react-datepicker";

import LocationModal from "../../modals/LocationModal/LocationModal";
import PriceModal from "../../modals/PriceModal/PriceModal";
import SeatsModal from "../../modals/SeatsModal/SeatsModal";
import TimeModal from "../../modals/TimeModal/TimeModal";

import "./FilterButtons.css";
import "react-datepicker/dist/react-datepicker.css";

const _ = require("underscore");

class CustomInput extends Component {
  render() {
    return (
      <Button style={chooseStyle()} onClick={this.props.onClick}>
        Date
      </Button>
    );
  }
}

const FilterButtons = () => {
  const [, updateWindow] = useState();
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [timePeriod, setTimePeriod] = useState("AM");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [modal, toggleModal] = useState(false);
  const [modalType, setModalType] = useState("");

  var modalSize = "";

  switch (modalType) {
    case "From":
    case "To":
      modalSize = "lg";
      break;
    case "Time":
      modalSize = "md";
      break;
    default:
      modalSize = "sm";
      break;
  }

  useEffect(() => {
    window.onresize = () => {
      updateWindow({});
    };
  });

  return (
    <div className="filter-row">
      <DatePicker
        customInput={<CustomInput />}
        selected={date}
        onChange={date => setDate(date)}
      />
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("Time");
          toggleModal(!modal);
        }}
      >
        Time
      </Button>
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("From");
          toggleModal(!modal);
        }}
      >
        From
      </Button>
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("To");
          toggleModal(!modal);
        }}
      >
        To
      </Button>
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("Price");
          toggleModal(!modal);
        }}
      >
        Price
      </Button>
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("Seats");
          toggleModal(!modal);
        }}
      >
        Seats
      </Button>
      <Modal
        isOpen={modal}
        toggle={() => toggleModal(!modal)}
        modalTransition={{ timeout: 100 }}
        backdropTransition={{ timeout: 100 }}
        size={modalSize}
      >
        <ModalHeader toggle={() => toggleModal(!modal)}>
          {modalType}
        </ModalHeader>
        <ModalBody>
          {modalType === "Time" && (
            <TimeModal
              time={time}
              setTime={setTime}
              timePeriod={timePeriod}
              setTimePeriod={setTimePeriod}
              toggleModal={toggleModal}
              buttonColor="white"
              textColor="#5C5C5C"
              borderColor="#5C5C5C"
              iconColor="#5C5C5C"
            />
          )}
          {modalType === "From" && (
            <LocationModal
              location={from}
              setLocation={setFrom}
              toggleModal={toggleModal}
              buttonColor="white"
              buttonWidth="58%"
              textColor="#5C5C5C"
              borderColor="#5C5C5C"
              titleColor="black"
            />
          )}
          {modalType === "To" && (
            <LocationModal
              location={to}
              setLocation={setTo}
              toggleModal={toggleModal}
              buttonColor="white"
              buttonWidth="58%"
              textColor="#5C5C5C"
              borderColor="#5C5C5C"
              titleColor="black"
            />
          )}
          {modalType === "Price" && (
            <PriceModal
              setPrice={setPrice}
              price={price}
              toggleModal={toggleModal}
            />
          )}
          {modalType === "Seats" && (
            <SeatsModal
              setSeats={setSeats}
              seats={seats}
              toggleModal={toggleModal}
              buttonColor="white"
              textColor="#5C5C5C"
              borderColor="#5C5C5C"
            />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

var filterButtonStyle = {
  backgroundColor: "#f7f9fc",
  color: "#5C5C5C",
  fontSize: "19px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "19px",
  height: "36px",
  width: "90px",
  borderRadius: "10px",
  borderColor: "#5C5C5C",
  boxShadow: "none"
};

var mobileButtonStyle = _.extend({}, filterButtonStyle, {
  fontSize: "13px",
  width: "50px",
  height: "30px",
  marginRight: "6px"
});

var chooseStyle = () => {
  if (window.innerWidth < 950) {
    return mobileButtonStyle;
  } else {
    return filterButtonStyle;
  }
};

export default FilterButtons;
