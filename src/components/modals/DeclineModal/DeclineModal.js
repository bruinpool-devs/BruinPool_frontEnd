import React, { useContext, useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { withRouter } from "react-router-dom";

import "../CancelRideModal/CancelRideModal.css";
import CancelFilters from "../../modules/Filters/CancelFilters";
import MainContext from "../../../context/mainContext";

const DeclineModal = ({ requestID, authToken, isOpen, toggleModal }) => {
  const [message, setMessage] = useState("");

  const mainContext = useContext(MainContext);

  const handleDeclineRide = async () => {
    const response = await mainContext.denyRequest(
      requestID,
      message,
      authToken
    );

    if (!response) {
      // TODO: Add better UI to display failure
      console.log("Deny Request Failed");
    }
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
            Are you sure you want to decline this ride?
          </div>

          <div>Reason for declining request</div>
          <CancelFilters isCancelModal={false} />
          <div>Leave a message to rider:</div>
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
            onClick={() => handleDeclineRide()}
          >
            Decline
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(DeclineModal);
