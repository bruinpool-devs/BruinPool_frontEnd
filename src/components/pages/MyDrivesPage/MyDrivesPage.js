import React from "react";
import { feed } from "../../modules/RideFeed/mockData";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import PendingFeed from "../../modules/PendingFeed/PendingFeed";

import "../RiderPage/RiderPage.css";

const MyDrivesPage = () => {
  const upcomingFeed = feed.slice(0, 1);
  const historyFeed = feed.slice(1, 4);
  const requestFeed = feed.slice(4, 6);

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">My Drives</div>
          </div>
          <div className="sub-title">Pending Trip Requests</div>
          <div className="feed-container">
            <PendingFeed feed={requestFeed} />
          </div>
          <div className="sub-title">Posted Drives</div>
          <div className="feed-container">
            <RideFeed
              feed={upcomingFeed}
              buttonColor={"#FF3D3D"}
              buttonText={"Cancel Drive"}
            />
          </div>
          <div className="sub-title">Drive History</div>
          <div className="feed-container">
            <RideFeed
              feed={historyFeed}
              buttonColor={"#5C5C5C"}
              buttonText={"Completed"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDrivesPage;
