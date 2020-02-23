import React, { useEffect, useContext } from "react";
import { feed } from "../../modules/RideFeed/mockData";
import { requests } from "../../modules/RequestFeed/mockData";
import Cookies from "universal-cookie";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import RequestFeed from "../../modules/RequestFeed/RequestFeed";
import MainContext from "../../../context/mainContext";

import "../RiderPage/RiderPage.css";
import "./MyRidesPage.css";

const MyRidesPage = ({ history }) => {
  const upcomingFeed = feed.slice(0, 1);
  const historyFeed = feed.slice(1, 4);

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    } else {
      fetchSenderRequests();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const fetchSenderRequests = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchSenderRequestFeed(authToken);
  };

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">My Rides</div>
          </div>

          <div className="sub-title">Trip Requests</div>
          <div className="feed-container">
            <RequestFeed requestFeed={requests} userType={"rider"} />
          </div>

          <div className="sub-title">Upcoming Rides</div>
          <div className="feed-container">
            <RideFeed
              feed={upcomingFeed}
              buttonColor={"#FF3D3D"}
              buttonText={"Cancel Ride"}
            />
          </div>

          <div className="sub-title">Ride History</div>
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

export default MyRidesPage;
