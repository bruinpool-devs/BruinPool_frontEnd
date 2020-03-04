import React from "react";

import Navbar from "../../navbar/Navbar";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router-dom";

import { faCheckSquare, faBell } from "@fortawesome/free-regular-svg-icons";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";

import "./RequestRideSummary.css";

const RequestRideSummary = ({ history }) => {
  const iconStyle = {
    marginLeft: "30px",
    marginRight: "32px",
    marginBottom: "-7px",
    color: "#3D77FF",
    width: "35px",
    height: "35px"
  };

  return (
    <div className="request-ride-summary">
      <div>
        <Navbar />
      </div>

      <div className="request-ride-summary-content">
        <div className="post-ride-summary-left-div">
          <div className="request-ride-content">
            <div className="ride-requested"> Request Sent!</div>
            <div className="ride-requested-path1">Review Ride Details</div>
            <div className="ride-requested-path2">></div>
            <div className="ride-requested-path2">Pending Request</div>
          </div>

          <div className="ride-summary">
            <FontAwesomeIcon icon={faCheckSquare} style={iconStyle} />
            Your ride request has been sent!
          </div>
          <div className="ride-summary">
            <div>
              <FontAwesomeIcon icon={faBell} style={iconStyle} />
            </div>
            <div>
              Once your request is accepted, you will be notified via email.
              <br />
              Meanwhile chat with the driver is available in your{" "}
              <b>Messages</b>.
            </div>
          </div>
          <div className="ride-summary">
            <FontAwesomeIcon icon={faLongArrowAltRight} style={iconStyle} />
            <p>
              Please check your{" "}
              <span style={{ fontWeight: "bold" }}>Rides Section</span> to view
              your request status.
            </p>
          </div>
          <div>
            <Button
              style={{
                borderColor: "#3D77FF",
                backgroundColor: "#3D77FF",
                color: "white",
                boxShadow: "none",
                padding: "7px 15px 7px 15px",
                marginTop: "20px",
                marginLeft: "137px"
              }}
              onClick={() => history.push("/driver/my-rides")}
            >
              Go to My Rides
            </Button>
            <Button
              style={{
                borderColor: "#3D77FF",
                backgroundColor: "#FFFFFF",
                color: "#3D77FF",
                boxShadow: "none",
                padding: "7px 15px 7px 15px",
                marginTop: "20px",
                marginLeft: "50px"
              }}
            >
              Go to Messages
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RequestRideSummary);
