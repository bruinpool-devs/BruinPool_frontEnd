import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./PostRideModal.css";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PostRideModal = ({
  isOpen,
  toggleModal,
  from,
  to,
  date,
  time,
  specificPickup,
  specificDropoff,
  driverNote,
  history,
  location
  // seats,
  // luggages
}) => {
  // const path = location.pathname;

  return (
    <div>
      <Modal
        className="modal-font"
        isOpen={isOpen}
        toggle={() => toggleModal(!isOpen)}
      >
        {/* <ModalHeader toggle={() => toggleModal(!isOpen)}>Are you sure you want to cancel this ride?</ModalHeader> */}
        <ModalBody className="bodyFrame">
          <div className="bodyTitle">Is the ride information correct?</div>
          <div className="rideInfoCard">
            <div className="cardLine">
              {from}
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ marginLeft: "30px", marginRight: "10px" }}
              />
              {to}
            </div>
            <div className="cardLine">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginLeft: "0px", marginRight: "10px" }}
              />
              {date}
              <FontAwesomeIcon
                icon={faClock}
                style={{ marginLeft: "15px", marginRight: "10px" }}
              />
              {time}
            </div>
            <div className="cardLine">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginLeft: "0px", marginRight: "10px" }}
              />
              Pickup: {specificPickup}
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginLeft: "30px", marginRight: "10px" }}
              />
              Dropoff: {specificDropoff}
            </div>
            <div className="cardLine">
              <div> Driver's Note </div>
              <div> {driverNote} </div>
            </div>
          </div>
        </ModalBody>

        <ModalBody className="footerCss">
          <Button
            className="go-back-button"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#3D77FF",
              borderWidth: "1px",
              borderColor: "#3D77FF",
              boxShadow: "none",
              fontSize: "1vw",
              marginRight: "2vw",
              width: "120px",
              padding: "10px",
              fontWeight: "bold"
            }}
            onClick={() => toggleModal(!isOpen)}
          >
            {" "}
            Go Back{" "}
          </Button>
          <Button
            className="cancel-ride-button"
            style={{
              borderColor: "#3D77FF",
              backgroundColor: "#3D77FF",
              color: "white",
              boxShadow: "none",
              fontSize: "1vw",
              width: "120px",
              padding: "10px",
              fontWeight: "bold"
            }}
            // className={
            //   path === "/driver/post-summary"
            //     ? "active-item"
            //     : "non-active-item"
            // }
            // onClick={() => history.push("/driver/post-summary")}
            onClick={() =>
              history.push({
                pathname: "/driver/post-summary",
                state: {
                  from: from,
                  to: to,
                  date: date,
                  time: time,
                  specificDropoff: specificDropoff,
                  specificPickup: specificPickup,
                  driverNote: driverNote
                }
              })
            }
          >
            Confirm
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(PostRideModal);
