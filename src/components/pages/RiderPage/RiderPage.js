import React from "react";
import { Button } from "reactstrap";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Navbar from "../../navbar/Navbar";
import RideFeed from "../../modules/RideFeed/RideFeed";
import UpcomingFeed from "../../modules/UpcomingFeed/UpcomingFeed";

import "./RiderPage.css";

const RiderPage = () => {
  return (
    <div>
      <Navbar>
        <div className="rider-wrapper">
          <div className="rider-container">
            <div className="button-row">
              <div className="title">
                <h1>RIDES</h1>
              </div>
              <div className="buttons">
                <div className="notification-button">
                  <Button
                    style={{ width: "48px", height: "48px" }}
                    color="primary"
                  >
                    <FontAwesomeIcon icon={faBell} />
                  </Button>
                </div>
                <div className="account-button">
                  <Button
                    style={{ width: "48px", height: "48px" }}
                    color="primary"
                  >
                    <FontAwesomeIcon icon={faUser} />
                  </Button>
                </div>
              </div>
            </div>
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

export default RiderPage;
