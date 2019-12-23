import React from "react";

import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, UncontrolledCollapse, Card, CardBody } from "reactstrap";

import "./RideFeed.css";

const RideFeed = ({ feed, buttonColor, buttonText }) => {
  return (
    <div className="ride-feed-container">
      <div className="table-header">
        <div className="from-to-title">From</div>
        <div className="from-to-title">To</div>
        <div className="remaining-titles">Date</div>
        <div className="remaining-titles">Time</div>
        <div className="remaining-titles">Price</div>
        <div className="remaining-titles">Seats Left</div>
      </div>
      {feed.map(ride => {
        const domID = "#" + ride.ownerUsername;

        return (
          <div>
            <div
              key={ride.ownerUsername}
              id={ride.ownerUsername}
              className="rideCard"
            >
              <div className="first-card-value">
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "black"
                  }}
                >
                  {ride.from.name}
                </div>
                <div style={{ fontSize: "15px", marginTop: "-7px" }}>
                  {ride.from.location}
                </div>
              </div>
              <div className="first-card-value">
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  style={{ height: "50px", width: "70px" }}
                />
              </div>
              <div className="second-card-value">
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "black"
                  }}
                >
                  {ride.to.name}
                </div>
                <div style={{ fontSize: "15px", marginTop: "-7px" }}>
                  {ride.to.location}
                </div>
              </div>
              <div className="remaining-card-values">{ride.date}</div>
              <div className="remaining-card-values">{ride.time}</div>
              <div className="remaining-card-values">${ride.price}</div>
              <div className="remaining-card-values">{ride.seats}</div>
            </div>
            <UncontrolledCollapse toggler={domID}>
              <Card>
                <CardBody>
                  <div className="ride-detail-card">
                    <div className="ride-detail-photo">
                      <img
                        src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                        alt="bear"
                      />
                    </div>
                    <div className="ride-detail-info">
                      <div style={{ fontWeight: "bold", fontSize: "25px" }}>
                        {ride.ownerFullName}
                      </div>
                      <div>{ride.detail}</div>
                    </div>
                    <div className="ride-detail-button">
                      <Button
                        style={{
                          backgroundColor: buttonColor,
                          color: "white",
                          borderWidth: "0px",
                          boxShadow: "none",
                          width: "145px",
                          height: "45px",
                          fontSize: "20px"
                        }}
                      >
                        {buttonText}
                      </Button>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
        );
      })}
      <br />
    </div>
  );
};

export default RideFeed;
