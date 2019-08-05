import React from "react";
import { Button } from "reactstrap";

import "./PostDriveModal.css";

const PostDriveModal = () => {
  return (
    <div className="post-drive-modal-wrapper">
      <div className="post-drive-title">
        <p>NEW DRIVE</p>
      </div>
      <div className="post-drive-options">
        <div className="post-drive-location">
          <div>From</div>
          <div>To</div>
        </div>
        <div className="post-drive-etc">
          <div>Date</div>
          <div>Time</div>
          <div>Price</div>
          <div>Seats</div>
        </div>
        <div className="post-drive-desc">Test Description</div>
        <div className="post-drive-button">
          <Button
            style={{
              backgroundColor: "#1D96EF",
              boxShadow: "none",
              borderWidth: "0px",
              width: "100px",
              fontWeight: "bold",
              fontSize: "20px",
              borderRadius: "10px"
            }}
          >
            POST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDriveModal;
