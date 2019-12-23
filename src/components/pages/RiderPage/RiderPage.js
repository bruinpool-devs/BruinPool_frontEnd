import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { Button } from "reactstrap";
import { feed } from "../../modules/RideFeed/mockData";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import Filters from "../../modules/Filters/Filters";

import "./RiderPage.css";

const RiderPage = ({ history }) => {
  useEffect(() => {
    // const cookies = new Cookies();
    // const authToken = cookies.get("authToken");
    // if (!authToken) {
    //   history.push("/");
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
              feed={feed}
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
