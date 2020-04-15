import React from "react";

import RequestModal from "../../modals/RequestModal/RequestModal.js";
import "./RequestFeed.css";
//import WithdrawRequestModal from "../../modals/WithdrawRequestModal/WithdrawRequestModal.js";

const RequestFeed = ({ requestFeed, rideFeed, userType }) => {
  var content = <div></div>;

  // Get Ride details
  const getRideDetails = request =>
    rideFeed.reduce((result, current, i) => {
      if (current._id === request.rideID) {
        result.push(current);
      }
      return result;
    }, []);

  if (requestFeed.length > 0) {
    content = requestFeed.map((curr_request, index) => {
      console.log(curr_request);
      let rideDetailsResult = getRideDetails(curr_request);
      if (rideDetailsResult.length === 0) {
        console.log("Ride Not Found for request: ");
        return null;
      } else {
        return (
          <RequestModal
            request={curr_request}
            ride={rideDetailsResult[0]}
            userType={userType}
            index={index}
            key={index}
          />
        );
      }
    });
  }
  return <div className="request-container">{content}</div>;
};

export default RequestFeed;
