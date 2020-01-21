import React, { useState } from "react";
import {
  faLongArrowAltRight,
  faCalendarAlt,
  faClock,
  faMapMarker,
  faMap
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col
} from "reactstrap";

import "./RequestModal.css";

const RequestModal = props => {
  const { request } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  let requestStatusText;
  let primaryBtn;
  let secondaryBtn;
  const tripSubTotal = request.meta.seats * request.ride.price;

  switch (request.meta.status) {
    case "pending":
      requestStatusText = (
        <span className="orange-highlight">{request.meta.status}</span>
      );
      primaryBtn = (
        <Button color="primary" onClick={toggle}>
          Remind Driver
        </Button>
      );
      secondaryBtn = (
        <Button color="danger" onClick={toggle}>
          Withdraw Request
        </Button>
      );

      break;
    case "declined":
      requestStatusText = (
        <span className="red-highlight">{request.meta.status}</span>
      );
      primaryBtn = (
        <Button color="outline-primary" onClick={toggle}>
          Remove
        </Button>
      );
      break;
    case "cancelled":
      requestStatusText = (
        <span className="red-highlight">{request.meta.status}</span>
      );

      primaryBtn = (
        <Button color="secondary" onClick={toggle}>
          Remove
        </Button>
      );
      break;
    case `approved`:
      requestStatusText = (
        <span className="green-highlight">{request.meta.status}</span>
      );

      var hrefText = "/ride/checkout?request-id=" + request.meta._id;
      primaryBtn = (
        <Button href={hrefText} color="primary">
          Proceed To Payment
        </Button>
      );

      secondaryBtn = (
        <Button color="danger" onClick={toggle}>
          Withdraw Request
        </Button>
      );
      break;
    default:
      requestStatusText = <span className="red-highlight">Invalid Status</span>;
      break;
  }

  return (
    <div className="request-card" onClick={toggle}>
      <Row className="request-card-header" style={{ padding: "10px" }}>
        <Col style={{ fontSize: "13px" }}>2 hrs ago</Col>
        <Col className="approved-request-status">{requestStatusText}</Col>
      </Row>

      <Row className="request-card-body">
        <Col className="card-image">
          <img
            src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
            alt="bear"
          />
          <br />
          <span className="caption card-name">
            {request.ride.ownerFullName}
          </span>
        </Col>

        <Col xs={8} className="card-info">
          <Row className="card-itinerary">
            <Col xs={4} className="itinerary-from">
              {request.ride.from.name}
            </Col>
            <Col xs={3}>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
            </Col>
            <Col xs={4} className="itinerary-to">
              {request.ride.to.name}
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col>{request.ride.date}</Col>
            <Col>{request.ride.time}</Col>
          </Row>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Trip Request</ModalHeader>
        <ModalBody>
          <Row className="itinerary-head">
            <Col className="itinerary-from">{request.ride.from.name}</Col>
            <Col>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
            </Col>
            <Col className="itinerary-to">{request.ride.to.name}</Col>
            <Col className="popup-status-txt">{requestStatusText}</Col>
            <Col md={7}></Col>
          </Row>

          <Row className="itinerary-body">
            <Col className="request-card-ride-details">
              <Row>
                <Col>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  <span className="icon-text">{request.ride.date}</span>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span className="icon-text">{request.ride.time}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={2}>
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    style={{ width: "20px", height: "20px" }}
                  />
                </Col>
                <Col>
                  <Row>Pickup: {request.ride.from.location}</Row>
                  <Row>Dropoff: {request.ride.to.location}</Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  Seats: <span className="bold-text">{request.meta.seats}</span>
                </Col>
                <Col>
                  Luggage:{" "}
                  <span className="bold-text">{request.meta.luggage}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  Trip SubTotal:{" "}
                  <span className="bold-text">{tripSubTotal}</span>
                </Col>
              </Row>
            </Col>

            <Col xs={3} className="request-card-driver-details">
              <h4>Driver:</h4>
              <Row>
                <Col className="popup-card-image">
                  <img
                    src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                    alt="bear"
                  />
                </Col>
                <Col>
                  <span className="caption card-name">
                    {request.ride.ownerFullName}
                  </span>
                </Col>
              </Row>
            </Col>

            <Col xs={5} className="request-card-request-msg">
              <Row>
                <h4>Driver's Note:</h4>
                {request.ride.detail}
              </Row>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          {primaryBtn}
          {secondaryBtn}
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default RequestModal;
