import React, { useState } from "react";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./RequestModal.css";

const RequestModal = props => {
  const { request } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let requestStatusText;
  let proceedToCheckout;
  let popUpBtn;
  const tripSubTotal = props.request.meta.seats * props.request.meta.price;

  switch (props.request.meta.status) {
    case "pending":
      requestStatusText = (
        <span className="orange-highlight">{props.request.meta.status}</span>
      );
      popUpBtn = (
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      );
      break;
    case "declined":
      requestStatusText = (
        <span className="red-highlight">{props.request.meta.status}</span>
      );
      popUpBtn = (
        <Button color="secondary" onClick={toggle}>
          Remove
        </Button>
      );
      break;
    case "cancelled":
      requestStatusText = (
        <span className="red-highlight">{props.request.meta.status}</span>
      );
      popUpBtn = (
        <Button color="secondary" onClick={toggle}>
          Remove
        </Button>
      );
      break;
    case `approved`:
      requestStatusText = (
        <span className="green-highlight">{props.request.meta.status}</span>
      );
      popUpBtn = (
        <Button color="danger" onClick={toggle}>
          Cancel
        </Button>
      );
      proceedToCheckout = <Button color="primary">Proceed To Checkout</Button>;
      break;
    default:
      requestStatusText = <span className="red-highlight">Invalid Status</span>;
      break;
  }

  return (
    <div className="request-card" onClick={toggle}>
      <div className="row request-card-header" style={{ padding: "10px" }}>
        <div className="col-sm-6" style={{ fontSize: "13px" }}>
          2 hrs ago
        </div>
        <div className="col-sm-6 approved-request-status">
          {requestStatusText}
        </div>
      </div>

      <div className="row card-body">
        <div className="card-image col-sm-4">
          <img
            src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
            alt="bear"
          />
          <br />
          <span className="caption card-name">
            {props.request.ride.ownerFullName}
          </span>
        </div>

        <div className="card-info">
          <div className="card-itinerary">
            <div className="itinerary-from">{props.request.ride.from.name}</div>
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              style={{ width: "50px", height: "30px" }}
            />
            <div className="itinerary-to">{props.request.ride.to.name}</div>
          </div>
          <div>
            {props.request.ride.date} {props.request.ride.time}
          </div>
        </div>
      </div>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>
          <div className="col-sm-4 col-md-3 card-itinerary">
            <div className="itinerary-from">{props.request.ride.from.name}</div>
            <FontAwesomeIcon
              icon={faLongArrowAltRight}
              style={{ width: "50px", height: "30px" }}
            />
            <div className="itinerary-to">{props.request.ride.to.name}</div>
          </div>
          <div className="col-md-1"></div>
          <div className="col-sm-2 col-md-2">{requestStatusText}</div>
          <div className="col-sm-6 col-md-6"></div>
        </ModalHeader>
        <ModalBody>
          <div className="row request-card-body">
            <div className="request-card-ride-details col-md-4">
              Date: {props.request.ride.date}
              Time: {props.request.ride.time}
              PickUp: {props.request.ride.from.location}
              DropOff: {props.request.ride.to.location}
              Seats: {props.request.meta.seats}
              Luggage: {props.request.meta.luggage}
              Trip SubTotal: {tripSubTotal}
            </div>

            <div className="request-card-driver-details col-md-4">
              Driver:
              <div className="card-image col-sm-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                  alt="bear"
                />
                <br />
                <span className="caption card-name">
                  {props.request.ride.ownerFullName}
                </span>
              </div>
              Driver's Note:
              {props.request.ride.detail}
            </div>

            <div className="request-card-request-msg col-md-4">
              <div className="row">
                Your Message to Driver:{props.request.meta.msg}
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          {proceedToCheckout}
          {popUpBtn}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RequestModal;
