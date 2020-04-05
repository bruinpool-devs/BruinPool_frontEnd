import React, { useState } from "react";
import { Modal, ModalBody, Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import "./CloseAccountModal.css";
import "../InstantBookModal/InstantBookModal.css";

const CloseAccountModal = ({ history }) => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const mockOptions = [
    "All your ride requests and upcoming rides will be removed.",
    "Your account will be deactivated for 14 days prior to deletion."
  ];

  return (
    <div>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "220px",
          height: "43px",
          backgroundColor: "red",
          borderWidth: "0px",
          boxShadow: "none",
          borderRadius: "10px"
        }}
        onClick={toggle}
      >
        Delete account
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalBody>
          <div className="instant-book-body">
            <div className="instant-book-header">
              Are you sure you want to close your account?
            </div>
            <div className="instant-book-options">
              <div style={{ fontWeight: "bold" }}>Before you go:</div>
              {mockOptions.map((option, index) => (
                <div key={index} className="each-option">
                  <FontAwesomeIcon
                    icon={faCircle}
                    style={{
                      width: "7px",
                      height: "7px",
                      marginRight: "10px"
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
                onClick={toggle}
              >
                Go Back
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
                onClick={() => history.push("/close-account")}
              >
                Yes
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(CloseAccountModal);
