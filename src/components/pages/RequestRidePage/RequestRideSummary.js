import React from "react";

import Navbar from "../../navbar/Navbar";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import "./RequestRideSummary.css";
import requestChart from "./rideRequestSummary1.png";

const RequestRideSummary = ({ history }) => {
  return (
    <div className="request-ride-summary">
      <div>
        <Navbar />
      </div>

      <div className="request-ride-summary-content">
        <div>
          <div className="request-ride-content">
            <div className="ride-requested"> Request Sent!</div>
            <div className="ride-requested-path1">Request Ride</div>
            <div className="ride-requested-path2">></div>
            <div className="ride-requested-path2">Request Sent</div>
          </div>

          <div className="post-ride-summary-left-div">
            <img
              className="flowchart-img1"
              src={requestChart}
              alt="request-chart"
              style={{ borderRadius: "0px" }}
            ></img>

            <div className="ride-summary-text">
              You are able to messgae your driver while waiting to hear back
              from the request approval. You can also manage your requests on
              “My Rides”.
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
                onClick={() => history.push("/rider/my-rides")}
              >
                Go to My Rides
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RequestRideSummary);
