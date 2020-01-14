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

        let requestStatusText;

        switch(request.meta.status) {
          case "pending":
            requestStatusText = <span className="orange-highlight">{request.meta.status}</span>;
            break;
          case 'declined':
            requestStatusText = <span className="red-highlight">{request.meta.status}</span>;     
            break;      
          case 'cancelled':
            requestStatusText = <span className="red-highlight">{request.meta.status}</span>;
            break;
          case `approved`:
            requestStatusText = <span className="green-highlight">{request.meta.status}</span>;
            break;
          default:
            requestStatusText = <span className="red-highlight">Invalid Status</span>;
            break;
        }

        return (
          <div className="request-card" onClick={(e) => popUpRequestModal({request:request})}>
            <div className="row request-card-header" style={{padding: "10px" }}>
              <div className="col-sm-6" style={{ fontSize: "13px" }}>2 hrs ago</div>
              <div className="col-sm-6 approved-request-status">{requestStatusText}</div>
            </div>
            
            <div className="row card-body">
              <div className="card-image col-sm-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                  alt="bear"
                />
                <br />
                <span className="caption card-name">{request.ride.ownerFullName}</span>
              </div>

              <div className="card-info">
                <div className="card-itinerary">
                  <div className="itinerary-from">{request.ride.from.name}</div>
                  <FontAwesomeIcon
                    icon={faLongArrowAltRight}
                    style={{ width: "50px", height: "30px" }}
                  />
                  <div className="itinerary-to">{request.ride.to.name}</div>
                </div>
                <pre>{request.ride.date}   {request.ride.time}</pre>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const popUpRequestModal = ({ request }) => {
  
  switch(request.meta.status) {
    case "pending":
        // Have the Pending Request Modal Open etc...
      break;
    case 'declined':
          
      break;      
    case 'cancelled':
      
      break;
    case `approved`:
      
      break;
    default:
      
      break;
  }
}

export default RequestFeed;
