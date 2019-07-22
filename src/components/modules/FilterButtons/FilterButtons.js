import React, { Component, useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import DatePicker from "react-datepicker";

import LocationModal from "../../modals/LocationModal/LocationModal";
import PriceModal from "../../modals/PriceModal/PriceModal";
import SeatsModal from "../../modals/SeatsModal/SeatsModal";

import "./FilterButtons.css";
import "react-datepicker/dist/react-datepicker.css";

const _ = require("underscore");

class CustomInput extends Component {
  render() {
    return (
      <Button style={chooseStyle()} onClick={this.props.onClick}>
        Date/Time
      </Button>
    );
  }
}

const FilterButtons = () => {
  const [, updateWindow] = useState();
  const [date, setDate] = useState(new Date());
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [price, setPrice] = useState("");
  const [seats, setSeats] = useState("");
  const [modal, toggleModal] = useState(false);
  const [modalType, setModalType] = useState("");

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
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="Time"
      />
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("Departure");
          toggleModal(!modal);
        }}
      >
        Departure
      </Button>
      <Button
        style={chooseStyle()}
        onClick={() => {
          setModalType("Destination");
          toggleModal(!modal);
        }}
      >
        Destination
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
        size={
          modalType === "Departure" || modalType === "Destination" ? "lg" : "sm"
        }
      >
        <ModalHeader toggle={() => toggleModal(!modal)}>
          {modalType}
        </ModalHeader>
        <ModalBody>
          {modalType === "Departure" && (
            <LocationModal
              location={departure}
              setLocation={setDeparture}
              toggleModal={toggleModal}
            />
          )}
          {modalType === "Destination" && (
            <LocationModal
              location={destination}
              setLocation={setDestination}
              toggleModal={toggleModal}
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
  fontSize: "18px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "19px",
  height: "36px",
  borderRadius: "10px",
  borderColor: "#5C5C5C"
};

var mobileButtonStyle = _.extend({}, filterButtonStyle, {
  fontSize: "11px",
  width: "60px",
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
