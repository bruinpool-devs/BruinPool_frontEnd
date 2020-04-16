import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { Button } from "reactstrap";
import MainContext from "../../../context/mainContext";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import Filters from "../../modules/Filters/Filters";

import ReviewModal from "../../modals/ReviewModal/ReviewModal";

import "./RiderPage.css";

const RiderPage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    } else {
      fetchRides();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const fetchRides = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchRideFeed({}, authToken);
  };

  const joinFirstRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.joinRide(mainContext.rideFeed[0], authToken);
  };

  const handleAddReview = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");

    const reviewObject = {
      revieweeUsername: userName,
      rideId: mainContext.rideFeed[0]._id,
      rating: 3,
      comment: "Driver arrived really late and was super rude!",
    };

    await mainContext.addReview(reviewObject, authToken);
  };

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">Rides</div>
          </div>
          <Filters />
          <div className="more-filters">
            <Button
              style={{
                backgroundColor: "white",
                color: "#383838",
                fontSize: "20px",
                boxShadow: "none",
                borderRadius: "20px",
                marginRight: "20px",
              }}
            >
              More Filters
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => joinFirstRide()}
              color="success"
            >
              Join First Ride
            </Button>
            <Button onClick={() => handleAddReview()} color="success">
              Add Review
            </Button>
            <ReviewModal />
          </div>
          <div className="feed-container">
            <RideFeed feed={mainContext.rideFeed} mainRidesBool={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RiderPage);
