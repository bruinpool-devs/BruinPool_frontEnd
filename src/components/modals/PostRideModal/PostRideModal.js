import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";

import MainContext from "../../../context/mainContext";
import Cookies from "universal-cookie";

import "./PostRideModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faLongArrowAltRight,
  faCalendarAlt,
  faClock
} from "@fortawesome/free-solid-svg-icons";

const PostRideModal = ({
  isOpen,
  toggleModal,
  from,
  to,
  date,
  time,
  price,
  seats,
  specificPickup,
  specificDropoff,
  driverNote,
  history
}) => {
  const mainContext = useContext(MainContext);

  const handlePostRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");
    const dateString = `${date}T${time}:00.000Z`;

    const rideObject = {
      ownerEmail: userName + "@g.ucla.edu",
      ownerUsername: userName,
      from: from,
      to: to,
      date: dateString,
      price: `${price}`,
      seats: seats,
      detail: driverNote,
      passengers: []
    };

    await mainContext.postRide(rideObject, authToken);

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
    });
  };

  return (
    <div>
      <Modal
        className="modal-font"
        isOpen={isOpen}
        toggle={() => toggleModal(!isOpen)}
      >
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
            onClick={() => handlePostRide()}
          >
            Confirm
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(PostRideModal);
