import React, { useState, useContext } from "react";
import {
  faLongArrowAltRight,
  faCalendarAlt,
  faClock,
  faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Alert
} from "reactstrap";
import { withRouter } from "react-router-dom";
import MainContext from "../../../context/mainContext";
import Cookies from "universal-cookie";

import "./RequestModal.css";

const RequestModal = props => {
  // Get Passed in Paramaters
  const { request, userType, history, index } = props;

  // Set Modal Initial States
  const [modal, setModal] = useState(false);

  // Set Toggles
  const toggle = () => setModal(!modal);

  // API Request Context
  const mainContext = useContext(MainContext);

  // Get Cookie
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");

  let requestStatusText;
  let primaryBtn;
  let secondaryBtn;
  let userTypeHeader;

  const tripSubTotal = request.meta.seats * request.ride.price;

  // Rider Actions
  const handleRemindDriver = async () => {
    // Check if user has available reminds to make this call
    if (request.numReminds <= 0) {
      console.log("No Reminds left");
    } else {
      // Send Reminder
      // const response = await mainContext.remindDriver(request.meta.recepientID);

      // Update Num Reminders in request

      // Display Alert
      console.log("Reminder Sent");
    }
  };

  const handleWithdrawRequest = async () => {
    const withdrawRes = await mainContext.withdrawRequest(
      request.meta._id,
      authToken
    );

    if (!withdrawRes) {
      // TODO: Add better UI to display failure
      console.log("Withdraw Request Failed");
      return;
    }

    const archiveRes = await mainContext.archiveRequest(
      request.meta._id,
      authToken
    );

    if (!archiveRes) {
      // TODO: Add better UI to display failure
      console.log("Archive Request Failed");
      return;
    }
  };

  const handleRemoveRequest = async () => {
    const response = await mainContext.archiveRequest(
      request.meta._id,
      authToken
    );

    if (!response) {
      // TODO: Add better UI to display failure
      console.log("Remove Request Failed");
      return;
    }

    // Make card disappear
  };

  // Driver Actions
  const handleAcceptRequest = async () => {
    const response = await mainContext.approveRequest(
      request.meta._id,
      authToken
    );

    if (!response) {
      // TODO: Add better UI to display failure
      console.log("Accept Request Failed");
      return;
    }

    // Make card disappear
  };

  const handleDenyRequest = async () => {
    const response = await mainContext.denyRequest(request.meta._id, authToken);

    if (!response) {
      // TODO: Add better UI to display failure
      console.log("Deny Request Failed");
      return;
    }

    // Make card disappear
  };

  // Set Custom UI elements based on Request Status and User Type
  if (userType == "rider") {
    userTypeHeader = "Driver";

    switch (request.meta.status) {
      case "pending":
        requestStatusText = (
          <span className="request-status orange-highlight">
            {request.meta.status}
          </span>
        );
        primaryBtn = (
          <Button color="primary" onClick={handleRemindDriver}>
            Remind Driver
          </Button>
        );
        secondaryBtn = (
          <Button color="danger" onClick={handleWithdrawRequest}>
            Withdraw Request
          </Button>
        );

        break;
      case "declined":
        requestStatusText = (
          <span className="red-highlight">{request.meta.status}</span>
        );
        primaryBtn = (
          <Button color="outline-primary" onClick={handleRemoveRequest}>
            Remove
          </Button>
        );
        break;
      case `approved`:
        requestStatusText = (
          <span className="request-status green-highlight">
            {request.meta.status}
          </span>
        );

        primaryBtn = (
          <Button
            className="proceed-to-payment"
            onClick={() =>
              history.push({
                pathname: "/ride/checkout",
                state: { request: request }
              })
            }
            color="primary"
          >
            Proceed To Payment
          </Button>
        );

        secondaryBtn = (
          <Button color="danger" onClick={handleWithdrawRequest}>
            Withdraw Request
          </Button>
        );
        break;
      default:
        requestStatusText = (
          <span className="request-status red-highlight">Invalid Status</span>
        );
        break;
    }
  } else {
    userTypeHeader = "Rider";

    primaryBtn = (
      <Button color="primary" onClick={handleAcceptRequest}>
        Accept
      </Button>
    );

    secondaryBtn = (
      <Button color="danger" onClick={handleDenyRequest}>
        Decline
      </Button>
    );
  }

  // Create page elements
  return (
    <div className="request-card" onClick={toggle} key={index}>
      <Row className="request-card-header">
        <Col className="request-time-elapsed">2 hrs ago</Col>
        <Col className="approved-request-status">{requestStatusText}</Col>
      </Row>

      <Row className="request-card-body">
        <Col className="card-image">
          <img
            src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
            alt="bear"
          />
          <br />
          <span className="card-name">{request.ride.ownerFullName}</span>
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
              <h4>{userTypeHeader}:</h4>
              <Row>
                <Col xs={4} className="popup-card-image">
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
              <span className="view-profile-text">view profile ></span>
            </Col>

            <Col xs={5} className="request-card-request-msg">
              <Row>
                <h4>{userTypeHeader}'s Note:</h4>
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

export default withRouter(RequestModal);
