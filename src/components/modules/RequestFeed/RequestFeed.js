import React from "react";

import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "reactstrap";

import "./RequestFeed.css";

const _ = require("underscore");

const RequestFeed = ({ requestFeed, userType }) => {
  const buttonStyle = {
    backgroundColor: "#3d77ff",
    borderWidth: "0px",
    boxShadow: "none",
    width: "85px",
    height: "30px",
    borderRadius: "10px",
    fontSize: "13px"
  };

  const redButtonStyle = _.extend({}, buttonStyle, {
    backgroundColor: "#FF3D3D"
  });

  return (
    <div className="request-container">
      {requestFeed.map(request => {
        return (
          <div className="request-card">
            <div style={{ fontSize: "13px" }}>2 hrs ago</div>
            <div className="card-content">
              <div className="card-image">
                <img
                  src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                  alt="bear"
                />
              </div>
              <div className="card-info">
                <div className="card-status">{request.ride.status}</div>
                <div className="card-name">{request.ride.ownerFullName}</div>
                <div className="card-itinerary">
                  <div className="itinerary-from">{request.ride.from.name}</div>
                  <FontAwesomeIcon
                    icon={faLongArrowAltRight}
                    style={{ width: "25px", height: "20px" }}
                  />
                  <div className="itinerary-to">{request.ride.to.name}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  //   <div className="request-container">
  //     {requestFeed.map(drive => {
  //       return (
  //         <div className="request-card">
  //           <div style={{ fontSize: "13px" }}>2 hrs ago</div>
  //           <div className="card-content">
  //             <div className="card-image">
  //               <img
  //                 src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
  //                 alt="bear"
  //               />
  //             </div>
  //             <div className="card-info">
  //               <div className="card-name">{drive.ownerFullName}</div>
  //               <div className="card-itinerary">
  //                 <div className="itinerary-from">{drive.from.name}</div>
  //                 <FontAwesomeIcon
  //                   icon={faLongArrowAltRight}
  //                   style={{ width: "25px", height: "20px" }}
  //                 />
  //                 <div className="itinerary-to">{drive.to.name}</div>
  //               </div>
  //             </div>
  //             <div className="card-button">
  //               <Button style={buttonStyle}>Accept</Button>
  //               <Button style={redButtonStyle}>Decline</Button>
  //             </div>
  //           </div>
  //         </div>
  //       );
  //     })}
  //   </div>
  );
};

export default RequestFeed;
