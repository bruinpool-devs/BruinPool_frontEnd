import React, { useState, useContext } from "react";
import {
  faLongArrowAltRight,
  faCalendarAlt,
  faClock,
  faMapMarker,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import MainContext from "../../../context/mainContext";
import Cookies from "universal-cookie";
import DeclineModal from "../DeclineModal/DeclineModal";
import "./RequestModal.css";

const RequestModal = ({ request, ride, userType, index, history }) => {
  // Set Modal Initial States
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [driverContactModal, setDriverContactModal] = useState(false);

  // Set Toggles
  const toggle = () => setModal(!modal);
  const confirmToggle = () => setConfirmModal(!confirmModal);
  const declineToggle = () => setDeclineModal(!declineModal);
  const contactToggle = () => setDriverContactModal(!driverContactModal);

  // API Request Context
  const mainContext = useContext(MainContext);

  // Get Cookie
  const cookies = new Cookies();
  const authToken = cookies.get("authToken");
  const username = cookies.get("username");

  // Dynamic Elements
  let requestStatusText;
  let primaryBtn;
  let secondaryBtn;
  let withdrawBtn;
  let userTypeHeader;

  // Constant Values
  const tripSubTotal = ride.price;

  // ================================
  // Rider Actions
  // ================================

  // Send a reminder to a driver to approve request
  const handleRemindDriver = async () => {
    // Check if user has available reminds to make this call
    if (request.reminders <= 0) {
      console.log("No Reminds left");
    } else {
      // Send Reminder
      const reminderRes = await mainContext.remindDriver(request._id);
      if (!reminderRes) {
        console.log("Could not remind recipient");
        return;
      }

      // Display Alert
      console.log("Reminder Sent");
    }
  };

  // Withdraw Initial Request
  const handleWithdrawRequest = async () => {
    const withdrawRes = await mainContext.withdrawRequest(
      request._id,
      authToken
    );

    if (!withdrawRes) {
      // TODO: Add better UI to display failure
      console.log("Withdraw Request Failed");
      return;
    }

    const archiveRes = await mainContext.archiveRequest(request._id, authToken);

    if (!archiveRes) {
      // TODO: Add better UI to display failure
      console.log("Archive Request Failed");
      return;
    }
  };

  // Remove already accepted Request
  const handleRemoveRequest = async () => {
    const response = await mainContext.archiveRequest(request._id, authToken);

    if (!response) {
      // TODO: Add better UI to display failure
      alert("Remove Request Failed");
      return;
    }

    // Reload page to reflect removed request
    window.location.reload();
  };

  // ================================
  // Driver Actions
  // ================================

  // Approve a Request
  const handleAcceptRequest = async () => {
    const response = await mainContext.approveRequest(request._id, authToken);

    if (!response) {
      // TODO: Add better UI to display failure
      console.log("Accept Request Failed");
      return;
    }

    // Update rider request status
    const response2 = await mainContext.fetchRiderRequestFeed(
      username,
      authToken
    );

    if (response2 === 200) {
      // Make card disappear
      toggle();
      confirmToggle();
    }
  };

  // Set Custom UI elements based on Request Status and User Type
  if (userType === "rider") {
    userTypeHeader = "Driver";

    switch (request.status) {
      case "pending":
        requestStatusText = (
          <span className="request-status orange-highlight">
            {request.status}
          </span>
        );
        primaryBtn = (
          <Button className="primary-btn" onClick={handleRemindDriver}>
            Remind Driver
          </Button>
        );
        secondaryBtn = (
          <Button
            className="secondary-btn"
            onClick={() => setConfirmWithdraw(!confirmWithdraw)}
          >
            Withdraw Request
          </Button>
        );
        withdrawBtn = (
          <Button
            className="secondary-btn"
            onClick={() => handleWithdrawRequest()}
          ></Button>
        );

        break;
      case "denied":
        requestStatusText = (
          <span className="red-highlight">{request.status}</span>
        );
        primaryBtn = (
          <Button className="secondary-btn" onClick={handleRemoveRequest}>
            Remove
          </Button>
        );
        break;
      case `approved`:
        requestStatusText = (
          <span className="request-status green-highlight">
            {request.status}
          </span>
        );

        primaryBtn = (
          <Button
            className="primary-btn proceed-to-payment"
            onClick={async () => {
              if (ride.seats < 1) {
                alert("Ride is full, try again later");
              } else {
                history.push({
                  pathname: "/ride/checkout",
                  state: {
                    ride,
                    requestID: request._id,
                    carryOn: request.carryOn,
                    luggage: request.luggage,
                  },
                });

                // const resp = await mainContext.joinRide(ride, authToken);

                // if (resp === 200) {
                //   toggle();
                //   contactToggle();
                // }
              }
            }}
          >
            Join Ride
          </Button>
        );

        secondaryBtn = (
          <Button
            className="secondary-btn"
            onClick={() => setConfirmWithdraw(!confirmWithdraw)}
          >
            Withdraw Request
          </Button>
        );

        withdrawBtn = (
          <Button
            className="secondary-btn"
            onClick={() => handleRemoveRequest()}
          ></Button>
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
      <Button className="primary-btn" onClick={handleAcceptRequest}>
        Accept
      </Button>
    );

    secondaryBtn = (
      <Button
        className="secondary-btn"
        onClick={() => {
          toggle();
          declineToggle();
        }}
      >
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
          <span className="card-name">{ride.ownerUsername}</span>
        </Col>

        <Col xs={8} className="card-info">
          <Row className="card-itinerary">
            <Col xs={4} className="itinerary-from">
              {ride.from}
            </Col>
            <Col xs={3}>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                className="arrow-icon"
              />
            </Col>
            <Col xs={4} className="itinerary-to">
              {ride.to}
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col>{moment(ride.date).utc().format("M/DD/YY")}</Col>
            <Col>{moment(ride.date).utc().format("h A")}</Col>
          </Row>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalBody>
          <Row className="itinerary-head">
            <Col>
              <span className="pop-itinerary-from">{ride.from}</span>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                className="arrow-icon"
              />
              <span className="pop-itinerary-to">{ride.to}</span>
              <span className="popup-status-txt">{requestStatusText}</span>
            </Col>
            <Col>
              <button
                className="close"
                type="button"
                aria-label="Close"
                onClick={() => {
                  toggle();
                }}
              >
                <span aria-hidden="true">x</span>
              </button>
            </Col>
          </Row>

          <Row className="itinerary-body">
            <Col className="request-card-ride-details">
              <Row>
                <Col>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="small-icon"
                  />{" "}
                  <span className="icon-text">
                    {moment(ride.date).utc().format("M/DD/YY")}
                  </span>
                </Col>
                <Col>
                  <FontAwesomeIcon icon={faClock} className="small-icon" />
                  <span className="icon-text">
                    {moment(ride.date).utc().format("h A")}
                  </span>
                </Col>
              </Row>
              <Row className="bottom-divider">
                <Col xs={2}>
                  <FontAwesomeIcon icon={faMapMarker} className="small-icon" />
                </Col>
                <Col>
                  <Row>Pickup: {ride.from}</Row>
                  <Row>Dropoff: {ride.to}</Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  Carry On: <span className="bold-text">{request.carryOn}</span>
                </Col>
                <Col>
                  Luggage: <span className="bold-text">{request.luggage}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  Trip Total: <span className="bold-text">${tripSubTotal}</span>
                </Col>
              </Row>
            </Col>

            {!confirmWithdraw ? (
              <Col xs={8}>
                <Row>
                  <Col xs={5} className="request-card-driver-details">
                    <h4>{userTypeHeader}:</h4>
                    <Row>
                      <Col xs={4} className="popup-card-image">
                        <img
                          src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                          alt="bear"
                          style={{ width: "60px", height: "60px" }}
                        />
                      </Col>
                      <Col>
                        <span style={{ fontSize: "20px" }}>
                          {ride.ownerUsername}
                        </span>
                        <div className="sub-label">
                          <FontAwesomeIcon
                            icon={faGraduationCap}
                            style={{ marginRight: "5px" }}
                          />
                          UCLA
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <h4>{userTypeHeader}'s Note:</h4>
                      <span style={{ fontSize: "14px", width: "95%" }}>
                        {ride.detail}
                      </span>
                    </Row>
                  </Col>

                  <Col xs={7} className="request-card-request-msg">
                    <Row>
                      <h4>Your Message to {userTypeHeader}:</h4>
                      Hi Sarah! I am traveling to SB to meet up with friend and
                      family. I am leaving from UCLA and I can adjust to any
                      location pickups whichever is the easiest for you!
                    </Row>
                    <Row className="withdraw-buttons">
                      {primaryBtn}
                      {secondaryBtn}
                    </Row>
                  </Col>
                </Row>
              </Col>
            ) : (
              <div className="confirm-withdraw-col">
                <div className="confirm-withdraw-text">
                  Are you sure you want to withdraw this ride request?
                </div>
                <div className="confirm-withdraw-row">
                  <Button
                    className="primary-btn"
                    onClick={() => setConfirmWithdraw(!confirmWithdraw)}
                  >
                    Go Back
                  </Button>
                  <Button
                    className="secondary-btn"
                    onClick={() => handleRemoveRequest()}
                  >
                    Yes
                  </Button>
                </div>
              </div>
            )}
          </Row>
        </ModalBody>
      </Modal>

      <Modal isOpen={confirmModal} size="lg">
        <ModalBody>
          <div className="confirm-modal-exit">
            <div>
              <FontAwesomeIcon
                icon={faTimes}
                onClick={() => setConfirmModal(!confirmModal)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="confirm-modal-row">
            <FontAwesomeIcon icon={faCheckSquare} className="icon-styling" />

            <div className="confirm-modal-text">
              Once the rider confirms, you will recieve an email notification
              and the rider’s information will be show under your{" "}
              <b>Upcoming Trips</b>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <Modal isOpen={driverContactModal} toggle={contactToggle} size="lg">
        <ModalHeader toggle={contactToggle}>Contact your driver</ModalHeader>
        <ModalBody>
          <div style={{ padding: "10px 20px 20px 20px" }}>
            <div style={{ fontWeight: "bold" }}>
              You may contact your driver through their phone number or via
              messages on our website.
            </div>
            <div
              style={{
                border: "1px solid #c4c4c4",
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
                backgroundColor: "white",
                color: "#5c5c5c",
                padding: "20px",
                boxShadow:
                  "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)",
              }}
            >
              <div>Driver</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px",
                }}
              >
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                    alt="bear"
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "20px",
                    justifyContent: "space-between",
                    width: "400px",
                  }}
                >
                  <div>{ride.ownerFullName}</div>
                  <div style={{ fontWeight: "bold" }}>
                    Phone #: 310-xxx-xxxx
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>

      <DeclineModal
        requestID={request._id}
        authToken={authToken}
        isOpen={declineModal}
        toggleModal={declineToggle}
      />
    </div>
  );
};

export default withRouter(RequestModal);
