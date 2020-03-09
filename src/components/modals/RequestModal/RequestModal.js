import React, { useState, useContext } from "react";
import {
  faLongArrowAltRight,
  faCalendarAlt,
  faClock,
  faMapMarker,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-regular-svg-icons";
import { faGraduationCap } from "@fortawesome/free-solid-svg-icons";

import { Button, Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { withRouter } from "react-router-dom";
import MainContext from "../../../context/mainContext";
import Cookies from "universal-cookie";
import DeclineModal from "../DeclineModal/DeclineModal";
import "./RequestModal.css";

const RequestModal = props => {
  // Get Passed in Paramaters
  const { request, userType, history, index } = props;
  
  // Set Modal Initial States
  const [modal, setModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmWithdraw, setConfirmWithdraw] = useState(false);
  const [declineModal, setDeclineModal] = useState(false);
  const [driverContactModal, setDriverContactModal] = useState(false);

  const iconStyle = {
    marginLeft: "30px",
    marginRight: "32px",
    marginBottom: "-7px",
    color: "#3D77FF",
    width: "35px",
    height: "35px"
  };

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
  
  // Get Ride details
  const ride = await mainContext.rideDetails(request.rideID, authToken)
  if (!ride) {
    // TODO: Add better UI to display failure
    console.log("Could not get ride Details");
    return;
  }

  let requestStatusText;
  let primaryBtn;
  let secondaryBtn;
  let userTypeHeader;

  const tripSubTotal = ride.price;

  // Rider Actions
  const handleRemindDriver = async () => {
    // Check if user has available reminds to make this call
    if (request.reminders <= 0) {
      console.log("No Reminds left");
    } else {
      // Send Reminder
      const reminderRes = await mainContext.remind(request.recepientID);
      if(!reminderRes) {
        console.log("Could not remind recepient");
        return;
      }

      // Display Alert
      console.log("Reminder Sent");
    }
  };

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

    const archiveRes = await mainContext.archiveRequest(
      request._id,
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
      request._id,
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
      request._id,
      authToken
    );

    // if (!response) {
    //   // TODO: Add better UI to display failure
    //   console.log("Accept Request Failed");
    // }

    // Make card disappear
    toggle();
    confirmToggle();
  };

  const handleDenyRequest = async () => {
    const response = await mainContext.denyRequest(request._id, authToken);

    if (!response) {
      // TODO: Add better UI to display failure
      console.log("Deny Request Failed");
    }

    // Make card disappear
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
          <Button
            style={{
              borderColor: "#3D77FF",
              backgroundColor: "#3D77FF",
              marginTop: "30px",
              marginRight: "10px"
            }}
            onClick={handleRemindDriver}
          >
            Remind Driver
          </Button>
        );
        secondaryBtn = (
          <Button
            style={{
              borderColor: "#FF3D3D",
              backgroundColor: "#FF3D3D",
              marginTop: "30px",
              marginLeft: "10px"
            }}
            onClick={() => setConfirmWithdraw(!confirmWithdraw)}
          >
            Withdraw Request
          </Button>
        );

        break;
      case "declined":
        requestStatusText = (
          <span className="red-highlight">{request.status}</span>
        );
        primaryBtn = (
          <Button
            style={{
              borderColor: "#3D77FF",
              backgroundColor: "#3D77FF",
              marginTop: "30px",
              marginRight: "10px"
            }}
            onClick={handleRemoveRequest}
          >
            Remove
          </Button>
        );
        break;
      case `accepted`:
        requestStatusText = (
          <span className="request-status green-highlight">
            {request.status}
          </span>
        );

        primaryBtn = (
          <Button
            className="proceed-to-payment"
            onClick={() => {
              // history.push({
              //   pathname: "/ride/checkout",
              //   state: { request: request }
              // })
              toggle();
              contactToggle();
            }}
            style={{
              borderColor: "#3D77FF",
              backgroundColor: "#3D77FF",
              marginTop: "30px",
              marginRight: "10px"
            }}
          >
            Confirm
          </Button>
        );

        secondaryBtn = (
          <Button
            style={{
              borderColor: "#FF3D3D",
              backgroundColor: "#FF3D3D",
              marginTop: "30px",
              marginLeft: "10px"
            }}
            onClick={() => setConfirmWithdraw(!confirmWithdraw)}
          >
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
      <Button
        style={{
          borderColor: "#3D77FF",
          backgroundColor: "#3D77FF",
          marginTop: "30px",
          marginRight: "10px"
        }}
        onClick={handleAcceptRequest}
      >
        Accept
      </Button>
    );

    secondaryBtn = (
      <Button
        style={{
          borderColor: "#FF3D3D",
          backgroundColor: "#FF3D3D",
          marginTop: "30px",
          marginLeft: "10px"
        }}
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
          <span className="card-name">{ride.ownerFullName}</span>
        </Col>

        <Col xs={8} className="card-info">
          <Row className="card-itinerary">
            <Col xs={4} className="itinerary-from">
              {ride.from.name}
            </Col>
            <Col xs={3}>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
            </Col>
            <Col xs={4} className="itinerary-to">
              {ride.to.name}
            </Col>
          </Row>
          <Row>
            <Col xs={1}></Col>
            <Col>{ride.date}</Col>
            <Col>{ride.time}</Col>
          </Row>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} size="xl">
        <ModalHeader toggle={toggle}>Trip Request</ModalHeader>
        <ModalBody>
          <Row className="itinerary-head">
            <Col className="itinerary-from">{ride.from.name}</Col>
            <Col>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
            </Col>
            <Col className="itinerary-to">{ride.to.name}</Col>
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
                  <span className="icon-text">{ride.date}</span>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span className="icon-text">{ride.time}</span>
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
                  <Row>Pickup: {ride.from.location}</Row>
                  <Row>Dropoff: {ride.to.location}</Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  Seats: <span className="bold-text">1</span>
                </Col>
                <Col>
                  Luggage:{" "}
                  <span className="bold-text">{request.meta.luggage}</span>
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
                        <span style={{ fontSize: "25px" }}>
                          {request.ride.ownerFullName}
                        </span>
                        <div style={{}}>
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
                        {request.ride.detail}
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
                    style={{
                      width: "120px",
                      color: "#3D77FF",
                      borderColor: "#3D77FF",
                      backgroundColor: "#FFFFFF",
                      marginTop: "30px",
                      marginRight: "10px"
                    }}
                    onClick={() => setConfirmWithdraw(!confirmWithdraw)}
                  >
                    Go Back
                  </Button>
                  <Button
                    style={{
                      width: "120px",
                      borderColor: "#FF3D3D",
                      backgroundColor: "#FF3D3D",
                      marginTop: "30px",
                      marginLeft: "10px"
                    }}
                    onClick={() => handleWithdrawRequest()}
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
            <FontAwesomeIcon icon={faCheckSquare} style={iconStyle} />

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
                  "0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 3px 10px 0 rgba(0, 0, 0, 0.1)"
              }}
            >
              <div>Driver</div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginTop: "10px"
                }}
              >
                <div>
                  <img
                    src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                    alt="bear"
                    style={{ width: "50px", height: "50px" }}
                  />
<<<<<<< HEAD
                </Col>
                <Col>
                  <span className="caption card-name">
                    {ride.ownerFullName}
                  </span>
                </Col>
              </Row>
              <span className="view-profile-text">view profile ></span>
            </Col>

            <Col xs={5} className="request-card-request-msg">
              <Row>
                <h4>{userTypeHeader}'s Note:</h4>
                {ride.detail}
              </Row>
            </Col>
          </Row>
=======
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: "20px",
                    justifyContent: "space-between",
                    width: "400px"
                  }}
                >
                  <div>{request.ride.ownerFullName}</div>
                  <div style={{ fontWeight: "bold" }}>
                    Phone #: 310-xxx-xxxx
                  </div>
                </div>
              </div>
            </div>
          </div>
>>>>>>> 8e5b1e3ec723cc21d108a248e287821dab7730be
        </ModalBody>
      </Modal>

      <DeclineModal
        isOpen={declineModal}
        toggleModal={declineToggle}
        handleDenyRequest={handleDenyRequest}
      />
    </div>
  );
};

export default withRouter(RequestModal);
