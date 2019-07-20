import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarSide } from "@fortawesome/free-solid-svg-icons";

import "./UpcomingFeed.css";
import { upcoming } from "../RideFeed/mockData";

const UpcomingFeed = () => {
  return (
    <div className="upcoming-feed-container">
      <div className="header-card">
        <div>Upcoming Rides</div>
      </div>
      {upcoming.slice(0, 3).map(ride => {
        var from = ride.from;
        var to = ride.to;

        if (from.length > 9) {
          from = ride.from.match(/\b(\w)/g).join("");
        } else if (to.length > 9) {
          to = ride.to.match(/\b(\w)/g).join("");
        }

        return (
          <div key={ride.ownerUsername} className="upcoming-card">
            <div className="upcoming-1">
              <div className="spacing">{from}</div>
              <FontAwesomeIcon icon={faCarSide} style={{ color: "#A2DAEF" }} />
              <div className="spacing">{to}</div>
            </div>
            <div className="upcoming-2">
              <div className="item">
                {ride.date} <br />
                {ride.time}
              </div>
              <div className="item">
                Driver: <br />
                {ride.ownerUsername}
              </div>
              <div className="item">${ride.price}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpcomingFeed;
