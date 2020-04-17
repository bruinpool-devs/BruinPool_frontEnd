import React from "react";
import { Modal, ModalBody } from "reactstrap";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./ReviewConfirmationModal.css";

const ReviewConfirmationModal = ({ isOpen, toggleModal }) => {
  const toggle = () => toggleModal(!isOpen);

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        <ModalBody>
          <div className="review-confirmation-body">
            <div className="review-confirmation-exit">
              <FontAwesomeIcon
                icon={faTimes}
                style={{
                  width: "15px",
                  height: "15px",
                  marginTop: "-30px",
                  marginRight: "-25px",
                  color: "#c4c4c4",
                  cursor: "pointer"
                }}
                onClick={toggle}
              />
            </div>
            <div className="review-confirmation-header">
              Thank you! Your review(s) has been submitted!
            </div>
            <div className="review-confirmation-content">
              [EXPLAIN REVIEW POLICY]
            </div>
            <div>
              Your driver will see your review once they leave a review for you
              or after X days.
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(ReviewConfirmationModal);
