import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { Button } from "reactstrap";
import { feed } from "../../modules/RideFeed/mockData";
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

    // const rideObject = {
    //   ownerEmail: "jhan25@g.ucla.edu",
    //   ownerUsername: "jhan25",
    //   from: "Irvine",
    //   to: "Los Angeles",
    //   date: "2020-02-05",
    //   price: "20",
    //   seats: 4,
    //   detail: "Third test for post",
    //   passengers: []
    // };

    await mainContext.fetchRideFeed({}, authToken);
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
                borderRadius: "20px"
              }}
            >
              More Filters
            </Button>
          </div>
          <div className="feed-container">
            <RideFeed
              feed={mainContext.rideFeed}
              buttonColor={"#3d77ff"}
              buttonText={"Book Ride"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(RiderPage);
