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

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">Rides</div>
          </div>
          <Filters />
          <div className="sort-by">Sort by:</div>
          <div className="more-filters">
            <Button
              onClick={() => toggleTimeFilter()}
              style={{
                backgroundColor: "white",
                color: "#383838",
                fontSize: "20px",
                boxShadow: "none",
                borderRadius: "20px",
                marginRight: "20px",
                marginLeft: "100px",
              }}
            >
              Departure Time
            </Button>
            <div
              id="dept-time-filter"
              className="dept-time-rect"
              style={{ display: "none" }}
            >
              <div className="before-tag">Before Noon</div>
              <div className="before-times">12 am - 11:59 am</div>
              <div className="before-ellipse"></div>
              <div className="after-tag">Afternoon</div>
              <div className="after-times">12 pm - 11:59 pm</div>
              <div className="after-ellipse"></div>
            </div>
            <Button
              onClick={() => togglePriceFilter()}
              style={{
                backgroundColor: "white",
                color: "#383838",
                fontSize: "20px",
                boxShadow: "none",
                borderRadius: "20px",
                marginRight: "20px",
              }}
            >
              Price
            </Button>
          </div>
          <div
            id="price-filter"
            className="price-rect"
            style={{ display: "none" }}
          >
            <div className="low-tag">Lowest</div>
            <div className="low-ellipse"></div>
            <div className="high-tag">Highest</div>
            <div className="high-ellipse"></div>
          </div>
          <div className="feed-container">
            <RideFeed feed={mainContext.rideFeed} mainRidesBool={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

function toggleTimeFilter() {
  let x = document.getElementById("dept-time-filter");

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
function togglePriceFilter() {
  let x = document.getElementById("price-filter");

  if (x.style.display == "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

export default withRouter(RiderPage);
