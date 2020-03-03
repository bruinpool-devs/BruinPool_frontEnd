import React, { useState, useContext } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import moment from "moment";
import Cookies from "universal-cookie";

import "./CancelRideModal.css";
import CancelFilters from "../../modules/Filters/CancelFilters";
import MainContext from "../../../context/mainContext";

import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CancelRideModal = ({
  isOpen,
  toggleModal,
  ride,
  from,
  to,
  date,
  seats
}) => {
  const [message, setMessage] = useState("");

  const mainContext = useContext(MainContext);

  const handleCancelRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    await mainContext.cancelRide(ride, authToken);
    toggleModal(!isOpen);
  };

  return (
    <div>
      <Modal
        className="modal-font"
        isOpen={isOpen}
        toggle={() => toggleModal(!isOpen)}
      >
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
              {moment(date).format("MM/DD/YY")}
              <FontAwesomeIcon
                icon={faClock}
                style={{
                  marginTop: "3px",
                  marginLeft: "15px",
                  marginRight: "10px"
                }}
              />
              {moment(date).format("h A")}
              <div className="cardLineTwo-text">Seats: {seats}</div>
              <div className="cardLineTwo-text">Luggages: 0</div>
            </div>
          </div>
          <div>Reason for canceling</div>
          <CancelFilters />
          <div>Leave a message to your driver:</div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            style={{
              width: "450px",
              height: "150px",
              marginTop: "10px",
              padding: "10px"
            }}
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
              width: "150px",
              padding: "10px",
              fontWeight: "bold"
            }}
            onClick={() => handleCancelRide()}
          >
            Cancel Ride
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CancelRideModal;
