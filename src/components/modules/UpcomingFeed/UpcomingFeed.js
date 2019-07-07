import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

import "./UpcomingFeed.css";
import { upcoming } from "../RideFeed/mockData";

const UpcomingFeed = () => {
  return (
    <div className="upcoming-feed-container">
      <div className="header-card">
        <h2>Upcoming Rides</h2>
      </div>
      {upcoming.slice(0, 3).map(ride => (
        <div className="upcoming-card">
          <div className="upcoming-1">
            <div className="spacing">{ride.from}</div>
            <FontAwesomeIcon icon={faCarSide} />
            <div className="spacing">{ride.to}</div>
          </div>
          <div className="upcoming-2">
            <p>Hello</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingFeed;
