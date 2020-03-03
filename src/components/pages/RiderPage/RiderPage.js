import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { Button } from "reactstrap";
import MainContext from "../../../context/mainContext";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import Filters from "../../modules/Filters/Filters";

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

  const populateRides = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    const rideObject = {
      ownerEmail: "jhan25@g.ucla.edu",
      ownerUsername: "jhan25",
      from: "UCSB",
      to: "Pasadena",
      date: "2020-06-05T07:00:00.000Z",
      price: "20",
      seats: 4,
      detail: "Testing for time difference",
      passengers: []
    };

    await mainContext.postRide(rideObject, authToken);
  };

  const joinFirstRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.joinRide(mainContext.rideFeed[0], authToken);
  };

  const deleteFirstRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.deleteRide(mainContext.rideFeed[0], authToken);
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
                marginRight: "20px"
              }}
            >
              More Filters
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => populateRides()}
              color="success"
            >
              Populate Data
            </Button>
            <Button
              style={{ marginRight: "20px" }}
              onClick={() => joinFirstRide()}
              color="success"
            >
              Join First Ride
            </Button>
            <Button onClick={() => deleteFirstRide()} color="success">
              Delete First Ride
            </Button>
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
