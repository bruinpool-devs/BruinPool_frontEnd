import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./CancelRideModal.css";
import CancelFilters from "../../modules/Filters/CancelFilters";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelRideModal = ({
  isOpen,
  toggleModal,
  from,
  to,
  date,
  time,
  seats,
  luggages
}) => {
  return (
    <div>
      <Modal
        className="modal-font"
        isOpen={isOpen}
        toggle={() => toggleModal(!isOpen)}
      >
        {/* <ModalHeader toggle={() => toggleModal(!isOpen)}>Are you sure you want to cancel this ride?</ModalHeader> */}
        <ModalBody className="bodyFrame">
          <div className="bodyTitle">
            Are you sure you want to cancel this ride?
          </div>
          <div className="cardRideInfo">
            <div className="cardLineOne">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              {from}
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ marginLeft: "10px", marginRight: "10px" }}
              />
              {to}
            </div>
            <div className="cardLineTwo">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{
                  marginTop: "3px",
                  marginLeft: "10px",
                  marginRight: "10px"
                }}
              />
              {date}
              <FontAwesomeIcon
                icon={faClock}
                style={{
                  marginTop: "3px",
                  marginLeft: "15px",
                  marginRight: "10px"
                }}
              />
              {time}
              <div className="cardLineTwo-text">Seats: {seats}</div>
              <div className="cardLineTwo-text">Luggages: {luggages}</div>
            </div>
          </div>
          <div>Reason for canceling</div>
          <CancelFilters></CancelFilters>
          <div>Leave a message to your driver:</div>
          <input
            className="inputTextfield1"
            type="text"
            // value={this.state.value}
            // onChange={this.handleChange}
          />
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
              borderColor: "#FF3D3D",
              backgroundColor: "#FF3D3D",
              color: "white",
              boxShadow: "none",
              fontSize: "1vw",
              width: "120px",
              padding: "10px",
              fontWeight: "bold"
            }}
            onClick={() => toggleModal(!isOpen)}
          >
            Cancel Ride
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CancelRideModal;
