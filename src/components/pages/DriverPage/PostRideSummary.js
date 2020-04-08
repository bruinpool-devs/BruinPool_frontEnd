import React from "react";
import Cookies from "universal-cookie";

import Navbar from "../../navbar/Navbar";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import instantChart from "./RidePosted.png";
import nonInstantChart from "./postRideConfirm.png";

import "./PostRideSummary.css";

const PostRideSummary = ({ location, history }) => {
  const iconStyle = {
    marginLeft: "30px",
    marginRight: "32px",
    marginBottom: "-7px",
    color: "#3D77FF",
    width: "35px",
    height: "35px"
  };

  const cookies = new Cookies();
  const userName = cookies.get("userName");

  return (
    <div className="post-ride-summary">
      <div>
        <Navbar />
      </div>
      <div className="request-ride-content">
        <div className="ride-posted"> Ride Posted!</div>
        <div className="ride-requested-path1">Ride Details</div>
        <div className="ride-requested-path2">></div>
        <div className="ride-requested-path2">Ride Confirmation</div>
      </div>

      <div className="post-ride-summary-content">
        <div className="post-ride-summary-left-div">
          <div>
            {location.state.instantBook ? (
              <div>
                <img className="flowchart-img" src={instantChart}></img>
              </div>
            ) : (
              <div>
                <img className="flowchart-img" src={nonInstantChart}></img>
              </div>
            )}
          </div>

          <div>
            <div>
              {location.state.instantBook ? (
                <div>
                  <div className="ride-summary-bold">
                    When Riders Instant Book:
                  </div>
                  <div className="ride-summary-text">
                    Once the rider instant books your ride, you will be notified
                    and able to manage ride on “My Drives”. Your phone number
                    will be shared with the riders who booked with you.
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>

          <div className="ride-summary-bold">When Riders Request Ride:</div>
          <div className="ride-summary-text">
            You will be notified to approve each ride request yourself. You are
            able to messgae potentially riders when they reach out to you. You
            can also approve and decline your ride requests on “My Drives”.
          </div>

          <div>
            <Button
              style={{
                borderColor: "#3D77FF",
                backgroundColor: "white",
                color: "#3D77FF",
                boxShadow: "none",
                padding: "7px 15px 7px 15px",
                marginTop: "30px",
                marginLeft: "70px"
              }}
              onClick={() => history.push("/driver/my-drives")}
            >
              Go to Messages
            </Button>
            <Button
              style={{
                borderColor: "#3D77FF",
                backgroundColor: "#3D77FF",
                color: "white",
                boxShadow: "none",
                padding: "7px 15px 7px 15px",
                marginTop: "30px",
                marginLeft: "120px"
              }}
              onClick={() => history.push("/driver/my-drives")}
            >
              Go to My Drives
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PostRideSummary);
