import React, { useState } from "react";
import moment from "moment";
import { withRouter } from "react-router-dom";

import CancelRideModal from "../../modals/CancelRideModal/CancelRideModal";

import {
  faLongArrowAltRight,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, UncontrolledCollapse, Card, CardBody } from "reactstrap";

import "./RideFeed.css";

const RideFeed = ({
  feed,
  mainRidesBool,
  upcomingRidesBool,
  rideHistoryBool,
  postedDrivesBool,
  history
}) => {
  const [modal, setModal] = useState(false);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(new Date());
  const [seats, setSeats] = useState("");

  const mockPassengers = [
    {
      first: "Laura",
      last: "Anderson"
    },
    {
      first: "Yoon",
      last: "Park"
    },
    {
      first: "Jared",
      last: "Fitton"
    },
    {
      first: "Justin",
      last: "Han"
    }
  ];

  const handleRequestRide = ride => {
    history.push({
      pathname: "/rider/request-ride",
      state: {
        from: ride.from,
        to: ride.to,
        date: ride.date,
        time: ride.time,
        price: ride.price,
        specificDropoff: ride.specificDropoff,
        specificPickup: ride.specificPickup,
        driverNote: ride.detail,
        ownerUsername: ride.ownerUsername
      }
    });
  };

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
            {mainRidesBool && (
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
                        <div style={{ marginTop: "-5px" }}>
                          <FontAwesomeIcon
                            icon={faGraduationCap}
                            style={{ marginRight: "5px" }}
                          />
                          UCLA
                        </div>
                        <div style={{ marginTop: "5px" }}>{ride.detail}</div>
                      </div>
                      <div className="ride-detail-pickup">
                        <div className="pickup-location-text">
                          Pickup Location
                        </div>
                        <div>Westwood In N Out</div>
                      </div>
                      <div className="ride-detail-button">
                        <Button
                          style={{
                            backgroundColor: "#3d77ff",
                            color: "white",
                            borderWidth: "0px",
                            boxShadow: "none",
                            width: "145px",
                            height: "45px",
                            fontSize: "20px"
                          }}
                          onClick={() => handleRequestRide(ride)}
                        >
                          Request Ride
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            )}
            {upcomingRidesBool && (
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
                        <div style={{ marginTop: "-5px" }}>
                          <FontAwesomeIcon
                            icon={faGraduationCap}
                            style={{ marginRight: "5px" }}
                          />
                          UCLA
                        </div>
                        <div style={{ marginTop: "5px" }}>{ride.detail}</div>
                      </div>
                      <div className="ride-detail-pickup">
                        <div className="pickup-location-text">
                          License Plate
                        </div>
                        <div className="license-phone-number">L0472A</div>
                        <div className="pickup-location-text">Phone Number</div>
                        <div className="license-phone-number">847-395-3410</div>
                      </div>
                      <div className="ride-detail-button">
                        <CancelRideModal
                          isOpen={modal}
                          toggleModal={setModal}
                          ride={ride}
                          from={from}
                          to={to}
                          date={date}
                          seats={seats}
                        />
                        <Button
                          style={{
                            backgroundColor: "#3d77ff",
                            color: "white",
                            borderWidth: "0px",
                            boxShadow: "none",
                            width: "150px",
                            height: "45px",
                            fontSize: "18px",
                            marginBottom: "10px"
                          }}
                        >
                          Message Driver
                        </Button>
                        <Button
                          style={{
                            backgroundColor: "#FF3D3D",
                            color: "white",
                            borderWidth: "0px",
                            boxShadow: "none",
                            width: "150px",
                            height: "45px",
                            fontSize: "18px"
                          }}
                          onClick={() => {
                            setFrom(ride.from);
                            setTo(ride.to);
                            setDate(ride.date);
                            setSeats(ride.seats);
                            setModal(!modal);
                          }}
                        >
                          Cancel Ride
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            )}
            {rideHistoryBool && (
              <UncontrolledCollapse toggler={domID}>
                <Card>
                  <CardBody>
                    <div className="ride-detail-card">
                      <div className="ride-history-detail-photo">
                        <div className="driver-text">Driver:</div>
                        <div className="ride-history-driver-container">
                          <img
                            src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                            alt="bear"
                          />
                          <div className="ride-history-driver-info">
                            <div
                              style={{ fontWeight: "bold", fontSize: "25px" }}
                            >
                              {ride.ownerUsername}
                            </div>
                            <div style={{ marginTop: "-5px" }}>
                              <FontAwesomeIcon
                                icon={faGraduationCap}
                                style={{ marginRight: "5px" }}
                              />
                              UCLA
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "13%",
                          marginRight: "330px"
                        }}
                      >
                        <div style={{ fontSize: "25px" }}>Receipt:</div>
                        <div style={{ marginTop: "10px" }}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between"
                            }}
                          >
                            <div>Ride Price</div>
                            <div>{ride.price}.00</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between"
                            }}
                          >
                            <div>Service Fee</div>
                            <div>0.10</div>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: "15px"
                            }}
                          >
                            <div>Total</div>
                            <div>{ride.price}.10</div>
                          </div>
                        </div>
                      </div>
                      <div className="ride-detail-pickup">
                        <div style={{ fontSize: "25px", marginBottom: "8px" }}>
                          License Plate:
                        </div>
                        <div className="license-phone-number">L0472A</div>
                        <div style={{ fontSize: "25px", marginBottom: "8px" }}>
                          Phone Number:
                        </div>
                        <div className="license-phone-number">847-395-3410</div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "20%"
                        }}
                      >
                        <div style={{ fontSize: "25px", marginBottom: "10px" }}>
                          Help:
                        </div>
                        <div
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer"
                          }}
                        >
                          Report an accident or incident
                        </div>
                        <div
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer"
                          }}
                        >
                          Lost Items
                        </div>
                        <div
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer"
                          }}
                        >
                          Contact PoolUp
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            )}
            {postedDrivesBool && (
              <UncontrolledCollapse toggler={domID}>
                <Card>
                  <CardBody>
                    <div className="ride-detail-card">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          width: "70%",
                          paddingLeft: "20px"
                        }}
                      >
                        <div style={{ fontSize: "25px", marginBottom: "15px" }}>
                          Passengers
                        </div>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "390px 390px",
                            gridRow: "auto auto",
                            gridColumnGap: "100px",
                            gridRowGap: "30px"
                          }}
                        >
                          {mockPassengers.map((person, index) => (
                            <div
                              key={index}
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "360px",
                                justifyContent: "space-between"
                              }}
                            >
                              <img
                                src={
                                  process.env.PUBLIC_URL + "/images/bp_logo.svg"
                                }
                                alt="bear"
                                style={{
                                  width: "50px",
                                  height: "50px"
                                }}
                              />
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column"
                                }}
                              >
                                <div>
                                  {person.first} {person.last}
                                </div>
                                <div
                                  style={{
                                    cursor: "pointer",
                                    color: "#3d77ff"
                                  }}
                                >
                                  view profile >
                                </div>
                              </div>
                              <Button
                                style={{
                                  backgroundColor: "#3d77ff",
                                  color: "white",
                                  borderWidth: "0px",
                                  boxShadow: "none",
                                  width: "150px",
                                  height: "45px",
                                  fontSize: "18px",
                                  borderRadius: "10px"
                                }}
                              >
                                Message {person.first}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="ride-detail-button">
                        <CancelRideModal
                          isOpen={modal}
                          toggleModal={setModal}
                          ride={ride}
                          from={from}
                          to={to}
                          date={date}
                          seats={seats}
                        />
                        <Button
                          style={{
                            backgroundColor: "#FF3D3D",
                            color: "white",
                            borderWidth: "0px",
                            boxShadow: "none",
                            width: "150px",
                            height: "45px",
                            fontSize: "18px"
                          }}
                          onClick={() => {
                            setFrom(ride.from);
                            setTo(ride.to);
                            setDate(ride.date);
                            setSeats(ride.seats);
                            setModal(!modal);
                          }}
                        >
                          Cancel Ride
                        </Button>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </UncontrolledCollapse>
            )}
          </div>
        );
      })}
      <br />
    </div>
  );
};

export default withRouter(RideFeed);
