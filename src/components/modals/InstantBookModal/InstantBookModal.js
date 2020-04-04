import React, { useState } from "react";
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

const InstantBookModal = ({ history, ride }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const handleSendRequest = ride => {
    history.push({
      pathname: "/rider/request-ride",
      state: {
        ride
      }
    });
  };

  const handleInstantBook = ride => {
    history.push({
      pathname: "/rider/instant-book",
      state: {
        ride
      }
    });
  };

  return (
    <div>
      <Button
        style={{
          backgroundColor: "#3d77ff",
          color: "white",
          borderWidth: "0px",
          boxShadow: "none",
          width: "145px",
          height: "45px",
          fontSize: "20px"
        }}
        onClick={toggle}
      >
        Book Ride
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg" fade={false}>
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
                onClick={toggle}
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
