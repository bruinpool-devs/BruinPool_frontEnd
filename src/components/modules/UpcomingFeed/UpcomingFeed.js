import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

import "./UpcomingFeed.css";
import { upcoming } from "../RideFeed/mockData";

const UpcomingFeed = () => {
  return (
    <div className="upcoming-feed-container">
      <div className="header-card">
        <h3>Upcoming Rides</h3>
      </div>
      {upcoming.slice(0, 3).map(ride => (
        <div className="upcoming-card">
          <div className="upcoming-1">
            <div className="spacing">{ride.from}</div>
            <FontAwesomeIcon icon={faCarSide} />
            <div className="spacing">{ride.to}</div>
          </div>
          <div className="upcoming-2">
            <div className="item">
              Date/Time: <br />
              {ride.date} - {ride.time}
            </div>
            <div className="item">
              Driver: <br />
              {ride.ownerUsername}
            </div>
            <div className="item">
              Price: <br />${ride.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingFeed;
