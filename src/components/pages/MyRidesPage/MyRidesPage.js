import React, { useEffect, useContext } from "react";
import Cookies from "universal-cookie";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import RequestFeed from "../../modules/RequestFeed/RequestFeed";
import MainContext from "../../../context/mainContext";

import "../RiderPage/RiderPage.css";
import "./MyRidesPage.css";

const MyRidesPage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    } else {
      fetchSenderRequests();
      fetchRideHistoryFeed();
      fetchUpcomingRideFeed();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const fetchSenderRequests = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchRiderRequestFeed(authToken);
  };

  const fetchRideHistoryFeed = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchRideHistory(authToken);
  };

  const fetchUpcomingRideFeed = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchUpcomingRide(authToken);
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
            <RequestFeed
              requestFeed={mainContext.requestRiderFeed}
              userType={"rider"}
            />
          </div>
          <div className="sub-title">Upcoming Rides</div>
          <div className="feed-container">
            <RideFeed
              feed={mainContext.upcomingRide}
              upcomingRidesBool={true}
            />
          </div>
          <div className="sub-title">Ride History</div>
          <div className="feed-container">
            <RideFeed feed={mainContext.rideHistory} rideHistoryBool={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRidesPage;
