import React from "react";

import RequestModal from "../../modals/RequestModal/RequestModal.js";
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
      {requestFeed.map(curr_request => {
        return <RequestModal request={curr_request} />;
      })}
    </div>
  );
};

export default RequestFeed;
