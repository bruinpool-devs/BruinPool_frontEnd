import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { Button } from "reactstrap";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import UpcomingFeed from "../../modules/UpcomingFeed/UpcomingFeed";
import FilterButtons from "../../modules/FilterButtons/FilterButtons";

import "./RiderPage.css";

const RiderPage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar>
        <div className="rider-wrapper">
          <div className="rider-container">
            <div className="title-row">
              <div className="title">
                <h2>RIDES</h2>
              </div>
              <div className="buttons">
                <div className="notification-button">
                  <Button
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#1D96EF",
                      borderWidth: "0px",
                      boxShadow: "none"
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ width: "22px", height: "22px" }}
                      icon={faBell}
                    />
                  </Button>
                </div>
                <div className="account-button">
                  <Button
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#1D96EF",
                      borderWidth: "0px",
                      boxShadow: "none"
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ width: "22px", height: "22px" }}
                      icon={faUser}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <FilterButtons />
            <div className="feed-container">
              <RideFeed />
              <UpcomingFeed />
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default withRouter(RiderPage);
