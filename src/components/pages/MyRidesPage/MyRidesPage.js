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
      // history.push("/");
    } else {
      fetchRiderRequests();
      fetchRideHistoryFeed();
      fetchUpcomingRideFeed();
      fetchRides();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const fetchRiderRequests = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const username = cookies.get("userName");

    await mainContext.fetchRiderRequestFeed(username, authToken);
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

  const fetchRides = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchRideFeed({}, authToken);
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
              rideFeed={mainContext.rideFeed}
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
