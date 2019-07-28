import React from "react";

import { feed } from "./mockData";

import "./RideFeed.css";

const RideFeed = () => {
  return (
    <div className="ride-feed-container">
      <div className="table-header">
        <div className="table-entry">Date</div>
        <div className="table-entry">Time</div>
        <div className="table-entry">From</div>
        <div className="table-entry">To</div>
        <div className="table-entry">Price</div>
        <div className="table-entry">Seats</div>
      </div>
      {feed.map(ride => {
        const rideFull = ride.seats === Object.keys(ride.passengers).length;

        return (
          <div key={ride.ownerUsername} className="rideCard">
            <div className="card-value">{ride.date}</div>
            <div className="card-value">{ride.time}</div>
            <div className="card-value">{ride.from}</div>
            <div className="card-value">{ride.to}</div>
            <div className="card-value">${ride.price}</div>
            <div className="card-value" style={{ marginLeft: "-5px" }}>
              {!rideFull && <div className="circular-border">{ride.seats}</div>}
              {rideFull && <div className="circular-border-full">FULL</div>}
            </div>
          </div>
        );
      })}
      <br />
    </div>
  );
};

export default RideFeed;
