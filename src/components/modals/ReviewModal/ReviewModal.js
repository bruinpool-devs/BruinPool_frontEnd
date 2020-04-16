import React, { useState } from "react";
import { Modal, ModalBody, Button, Input } from "reactstrap";
import { withRouter } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTimes } from "@fortawesome/free-solid-svg-icons";

import ReviewConfirmationModal from "./ReviewConfirmationModal";

import "./ReviewModal.css";
import Paul from "./Paul.jpg";

const ReviewModal = ({ isOpen, toggleModal }) => {
  const [review, setReview] = useState("");
  const [starSummary, setStarSummary] = useState("");
  const [starOne, setStarOne] = useState(false);
  const [starTwo, setStarTwo] = useState(false);
  const [starThree, setStarThree] = useState(false);
  const [starFour, setStarFour] = useState(false);
  const [starFive, setStarFive] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewConfirm, setReviewConfirm] = useState(false);
  const [reviewConfirmationModal, setReviewConfirmationModal] = useState(false);

  const toggle = () => toggleModal(!isOpen);

  const textAreaStyle = {
    height: "90px",
    boxShadow: "none",
    paddingLeft: "10px",
    fontSize: "12px",
  };

  const starStyle1 = {
    width: "25px",
    height: "25px",
    color: "#c4c4c4",
    cursor: "pointer",
    marginRight: "2px",
    marginBottom: "10px",
  };

  const starStyle2 = {
    width: "25px",
    height: "25px",
    color: "#fff61b",
    cursor: "pointer",
    marginRight: "2px",
    marginBottom: "10px",
  };

  const profileStyle = {
    width: "85px",
    height: "85px",
    marginTop: "15px",
    marginBottom: "10px",
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle} size="md">
        {!reviewConfirm ? (
          <ModalBody>
            <div className="review-modal-body">
              <div className="review-modal-exit">
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-30px",
                    marginRight: "-25px",
                    color: "#c4c4c4",
                    cursor: "pointer",
                  }}
                  onClick={toggle}
                />
              </div>
              <div className="review-modal-header">
                How was your ride with Paul to UCLA?
              </div>
              <div className="review-modal-center">
                <div>
                  <img src={Paul} style={profileStyle} />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    // style={starStyle}
                    onClick={() => {
                      setStarOne(true);
                      setStarTwo(false);
                      setStarThree(false);
                      setStarFour(false);
                      setStarFive(false);
                      setReview("How can [driver’s first name] improve?");
                      setStarSummary("Flag this driver");
                    }}
                    style={starOne ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    // style={starStyle}
                    onClick={() => {
                      setStarOne(true);
                      setStarTwo(true);
                      setStarThree(false);
                      setStarFour(false);
                      setStarFive(false);
                      setReview("What went wrong with your ride?");
                      setStarSummary("Disappointing ride");
                    }}
                    style={starTwo ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    // style={starStyle}
                    onClick={() => {
                      setStarOne(true);
                      setStarThree(true);
                      setStarTwo(true);
                      setStarFour(false);
                      setStarFive(false);
                      setReview("What could be better?");
                      setStarSummary("Below average");
                    }}
                    style={starThree ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={() => {
                      setStarOne(true);
                      setStarTwo(true);
                      setStarThree(true);
                      setStarFour(true);
                      setStarFive(false);
                      setReview("Sorry to hear it! What was the problem?");
                      setStarSummary("Could be better");
                    }}
                    style={starFour ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    onClick={() => {
                      setStarOne(true);
                      setStarTwo(true);
                      setStarThree(true);
                      setStarFour(true);
                      setStarFive(true);
                      setReview("Tell us what you loved.");
                      setStarSummary("Awesome PoolUp");
                    }}
                    style={starFive ? starStyle2 : starStyle1}
                  />
                </div>
                <div className="review-modal-starSummary">{starSummary}</div>
              </div>

              <div>
                <b>Leave a Comment</b>
                <Input
                  type="textarea"
                  style={textAreaStyle}
                  placeholder={review}
                  onChange={(e) => setReviewText(e.target.value)}
                  value={reviewText}
                />
              </div>

              <div className="review-modal-buttons">
                <Button
                  style={{
                    backgroundColor: "#3d77ff",
                    borderWidth: "0px",
                    color: "white",
                    boxShadow: "none",
                    width: "120px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setReviewConfirm(!reviewConfirm)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </ModalBody>
        ) : (
          <ModalBody>
            <div className="review-modal-body">
              <div className="review-modal-exit">
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{
                    width: "15px",
                    height: "15px",
                    marginTop: "-30px",
                    marginRight: "-25px",
                    color: "#c4c4c4",
                    cursor: "pointer",
                  }}
                  onClick={toggle}
                />
              </div>
              <div className="review-modal-header">
                Is this information correct?
              </div>
              <div className="review-modal-header-info">
                (*You can no longer edit your review once it’s submitted.)
              </div>
              <div className="review-modal-center">
                <div>
                  <img src={Paul} style={profileStyle} />
                </div>
                <div>
                  <FontAwesomeIcon
                    icon={faStar}
                    style={starOne ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    style={starTwo ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    style={starThree ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    style={starFour ? starStyle2 : starStyle1}
                  />
                  <FontAwesomeIcon
                    icon={faStar}
                    style={starFive ? starStyle2 : starStyle1}
                  />
                </div>
                <div className="review-modal-starSummary">{starSummary}</div>
              </div>

              <div>
                <b>Leave a Comment</b>
                <div> {reviewText}</div>
              </div>

              <div className="review-modal-buttons">
                <Button
                  style={{
                    backgroundColor: "white",
                    borderWidth: "0px",
                    color: "#3d77ff",
                    boxShadow: "none",
                    width: "120px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  onClick={() => setReviewConfirm(!reviewConfirm)}
                >
                  Go Back
                </Button>
                <Button
                  style={{
                    backgroundColor: "#3d77ff",
                    borderWidth: "0px",
                    color: "white",
                    boxShadow: "none",
                    width: "120px",
                    height: "40px",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    setReviewConfirmationModal(!reviewConfirmationModal);
                    toggleModal(!isOpen);
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </ModalBody>
        )}
      </Modal>
      <ReviewConfirmationModal
        isOpen={reviewConfirmationModal}
        toggleModal={setReviewConfirmationModal}
      />
    </div>
  );
};

export default withRouter(ReviewModal);
