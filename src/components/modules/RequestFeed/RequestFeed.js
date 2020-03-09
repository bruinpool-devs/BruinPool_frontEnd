import React from "react";

import RequestModal from "../../modals/RequestModal/RequestModal.js";
import "./RequestFeed.css";

const RequestFeed = ({ requestFeed, userType }) => {
  var content = <div></div>;
  console.log(requestFeed);
  if (requestFeed.length > 0) {
    content = requestFeed.map((curr_request, index) => {
      return (
        <RequestModal
          request={curr_request}
          userType={userType}
          index={index}
          key={index}
        />
      );
    });
  }
  return <div className="request-container">{content}</div>;
};

export default RequestFeed;
