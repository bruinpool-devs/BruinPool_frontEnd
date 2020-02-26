import React from "react";

import RequestModal from "../../modals/RequestModal/RequestModal.js";
import "./RequestFeed.css";

const _ = require("underscore");

const RequestFeed = ({ requestFeed, userType }) => {
  return (
    <div className="request-container">
      {requestFeed.map((curr_request, index) => {
        return (
          <RequestModal
            request={curr_request}
            userType={userType}
            index={index}
          />
        );
      })}
    </div>
  );
};

export default RequestFeed;
