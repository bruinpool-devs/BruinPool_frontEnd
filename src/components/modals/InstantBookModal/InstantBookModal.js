import React from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimes } from "@fortawesome/free-solid-svg-icons";

import "./InstantBookModal.css";

const mockOptions = [
  "Specific pick up and drop off only",
  "No pets on ride",
  "One carry-on only"
];

const InstantBookModal = ({ history, isOpen, toggleModal, ride }) => {
  const handleSendRequest = ride => {
    history.push({
      pathname: "/rider/request-ride",
      state: {
        from: ride.from,
        to: ride.to,
        date: ride.date,
        time: ride.time,
        price: ride.price,
        specificDropoff: ride.specificDropoff,
        specificPickup: ride.specificPickup,
        driverNote: ride.detail,
        ownerUsername: ride.ownerUsername
      }
    });
  };

  const handleInstantBook = ride => {
    history.push({
      pathname: "/rider/instant-book",
      state: {
        id: ride._id,
        from: ride.from,
        to: ride.to,
        date: ride.date,
        time: ride.time,
        price: ride.price,
        specificDropoff: ride.specificDropoff,
        specificPickup: ride.specificPickup,
        driverNote: ride.detail,
        ownerUsername: ride.ownerUsername
      }
    });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        toggle={() => toggleModal(!isOpen)}
        size="lg"
        fade={false}
      >
        <ModalBody>
          <div className="instant-book-body">
            <div className="instant-book-exit">
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  width: "30px",
                  height: "30px",
                  marginTop: "-30px",
                  marginRight: "-25px",
                  color: "#c4c4c4",
                  cursor: "pointer"
                }}
                onClick={() => toggleModal(!isOpen)}
              />
            </div>
            <div className="instant-book-header">
              Do you meet all of the instant book requirements?
            </div>
            <div className="instant-book-options">
              {mockOptions.map((option, index) => (
                <div key={index} className="each-option">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#3d77ff",
                      marginRight: "10px",
                      marginTop: "-3px"
                    }}
                  />
                  <div>{option}</div>
                </div>
              ))}
            </div>
            <div className="instant-book-buttons">
              <Button
                style={{
                  backgroundColor: "white",
                  border: "1px solid #3d77ff",
                  color: "#3d77ff",
                  boxShadow: "none",
                  marginRight: "40px",
                  width: "165px",
                  height: "50px",
                  borderRadius: "10px"
                }}
                onClick={() => handleSendRequest(ride)}
              >
                No, send request
              </Button>
              <Button
                style={{
                  backgroundColor: "#3d77ff",
                  borderWidth: "0px",
                  color: "white",
                  boxShadow: "none",
                  width: "165px",
                  height: "50px",
                  borderRadius: "10px"
                }}
                onClick={() => handleInstantBook(ride)}
              >
                Yes, book now
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(InstantBookModal);
