import React from "react";

import { feed } from "./mockData";

import "./RideFeed.css";

const RideFeed = () => {
  return (
    <div>
      {feed.map(ride => (
        <div className="rideCard">
          <div className="card-value-first">{ride.date}</div>
          <div className="card-value">{ride.time}</div>
          <div className="card-value">{ride.from}</div>
          <div className="card-value">{ride.to}</div>
          <div className="card-value">{ride.price}</div>
          <div className="card-value">
            {Object.keys(ride.passengers).length}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RideFeed;
