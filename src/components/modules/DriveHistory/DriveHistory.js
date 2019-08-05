import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight as ArrowIcon } from "@fortawesome/free-solid-svg-icons";

import "./DriveHistory.css";
import { feed } from "../UpcomingDrives/mockDriveData";

const DriveHistory = () => {
  return (
    <div className="history-container">
      <div className="title">
        <h2>DRIVE HISTORY</h2>
      </div>
      <div className="history-feed-container">
        {feed.map(drive => {
          const driveFull =
            drive.seats === Object.keys(drive.passengers).length;

          return (
            <div key={drive.ownerUsername} className="history-card">
              <div className="card-value">{drive.numberDate}</div>
              <div className="card-value">{drive.time}</div>
              <div className="card-value">{drive.from}</div>
              <div className="icon-value">
                <FontAwesomeIcon icon={ArrowIcon} />
              </div>
              <div className="card-value">{drive.to}</div>
              <div className="card-value">${drive.price}</div>
              <div className="card-value" style={{ marginLeft: "-5px" }}>
                {!driveFull && (
                  <div className="circular-border">{drive.seats}</div>
                )}
                {driveFull && <div className="circular-border-full">FULL</div>}
              </div>
            </div>
          );
        })}
        <br />
      </div>
    </div>
  );
};

export default DriveHistory;
