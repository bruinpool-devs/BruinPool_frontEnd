import React, { useState } from "react";
import moment from "moment";

import CancelRideModal from "../../modals/CancelRideModal/CancelRideModal";

import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, UncontrolledCollapse, Card, CardBody } from "reactstrap";

import "./RideFeed.css";

const RideFeed = ({ feed, buttonColor, buttonText, renderCancelModal }) => {
  const [modal, setModal] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [seats, setSeats] = useState("");

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
      {feed.map((ride, index) => {
        const domID = "#w" + ride._id;

        return (
          <div key={index}>
            <div id={"w" + ride._id} className="rideCard">
              <div className="first-card-value">
                <div
                  style={{
                    fontSize: "25px",
                    fontWeight: "bold",
                    color: "black"
                  }}
                >
                  {ride.from}
                </div>
                <div style={{ fontSize: "15px", marginTop: "-7px" }}>
                  {ride.from}
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
                  {ride.to}
                </div>
                <div style={{ fontSize: "15px", marginTop: "-7px" }}>
                  {ride.to}
                </div>
              </div>
              <div className="remaining-card-values">
                {moment(ride.date)
                  .utc()
                  .format("M/DD/YY")}
              </div>
              <div className="remaining-card-values">
                {moment(ride.date)
                  .utc()
                  .format("h A")}
              </div>
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
                        {ride.ownerUsername}
                      </div>
                      <div>{ride.detail}</div>
                    </div>
                    <div className="ride-detail-button">
                      {renderCancelModal && (
                        <CancelRideModal
                          isOpen={modal}
                          toggleModal={setModal}
                          ride={ride}
                          from={from}
                          to={to}
                          date={date}
                          seats={seats}
                        />
                      )}

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
                        onClick={() => {
                          setFrom(ride.from);
                          setTo(ride.to);
                          setDate(ride.date);
                          setSeats(ride.seats);
                          setModal(!modal);
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
