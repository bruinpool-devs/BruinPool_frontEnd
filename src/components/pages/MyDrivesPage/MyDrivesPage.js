import React, { useEffect, useContext } from "react";
import { requests } from "../../modules/RequestFeed/mockData";
import Cookies from "universal-cookie";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import RequestFeed from "../../modules/RequestFeed/RequestFeed";
import MainContext from "../../../context/mainContext";

import "../RiderPage/RiderPage.css";

const MyDrivesPage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    if (!authToken) {
      history.push("/");
    } else {
      fetchUpcomingDriveFeed();
      // fetchDriveHistoryFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const fetchUpcomingDriveFeed = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const username = cookies.get("userName");

    await mainContext.fetchUpcomingDrive(username, authToken);
  };

  const fetchDriveHistoryFeed = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const username = cookies.get("userName");

    await mainContext.fetchDriveHistory(username, authToken);
  };

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">My Drives</div>
          </div>
          <div className="sub-title">Trip Requests</div>
          <div className="feed-container">
            <RequestFeed requestFeed={requests} userType={"driver"} />
          </div>
          <div className="sub-title">Posted Drives</div>
          <div className="feed-container">
            <RideFeed
              feed={mainContext.upcomingDrive}
              buttonColor={"#FF3D3D"}
              buttonText={"Cancel Drive"}
            />
          </div>
          <div className="sub-title">Drive History</div>
          <div className="feed-container">
            <RideFeed
              feed={mainContext.driveHistory}
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
