import React from "react";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";

import "./RiderPage.css";

const RiderPage = () => {
  return (
    <div>
      <Navbar>
        <div className="rider-wrapper">
          <div className="rider-container">
            <h1>RIDES</h1>
            <RideFeed />
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default RiderPage;
