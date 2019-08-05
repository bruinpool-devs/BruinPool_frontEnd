import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight as ArrowIcon } from "@fortawesome/free-solid-svg-icons";

import "./UpcomingDrives.css";
import { feed } from "./mockDriveData";

const UpcomingDrives = () => {
  return (
    <div className="upcoming-drive-container">
      <div className="title">
        <h2>UPCOMING DRIVES</h2>
      </div>
      <div className="card-container">
        {feed.slice(0, 4).map(drive => {
          var from = drive.from;
          var to = drive.to;

          if (from.length > 9) {
            from = drive.from.match(/\b(\w)/g).join("");
          } else if (to.length > 9) {
            to = drive.to.match(/\b(\w)/g).join("");
          }

          return (
            <div key={drive.ownerUsername} className="upDriveCard">
              <div className="drive-day">{drive.day}</div>
              <div className="drive-date">{drive.date}</div>
              <div className="drive-time">{drive.time}</div>
              <div className="drive-itinerary">
                <div>{from}</div>
                <FontAwesomeIcon icon={ArrowIcon} size="1x" />
                <div>{to}</div>
              </div>
              <div className="drive-price">${drive.price} /person</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingDrives;
