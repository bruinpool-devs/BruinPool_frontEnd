import React from "react";

import RequestModal from "../../modals/RequestModal/RequestModal.js";
import "./RequestFeed.css";

const _ = require("underscore");

const RequestFeed = ({ requestFeed, userType }) => {
  var content = <div></div>;

  if (requestFeed.length > 0) {
    content = requestFeed.map((curr_request, index) => {
      return (
        <RequestModal
          request={curr_request}
          userType={userType}
          index={index}
        />
      );
    });
  }
  return <div className="request-container">{content}</div>;
};

export default RequestFeed;
