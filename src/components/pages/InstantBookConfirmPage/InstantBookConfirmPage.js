import React from "react";
import moment from "moment";

import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./InstantBookConfirmPage.css";
import "../RequestRidePage/RequestRidePage.css";
import "../InstantBookPage/InstantBookPage.css";

import Navbar from "../../navbar/Navbar";
import { withRouter } from "react-router-dom";
import {
  faLongArrowAltRight,
  faMapMarkerAlt,
  faCalendarAlt,
  faClock,
  faGraduationCap
} from "@fortawesome/free-solid-svg-icons";

const InstantBookConfirmPage = ({ location, history }) => {
  return (
    <div className="request-ride">
      <Navbar />
      <div className="request-ride-content">
        <div className="request-ride-left-div">
          <div className="instant-book-confirm-title">
            Your Ride is Confirmed!
          </div>
          <div className="instant-book-confirm-subtitle">
            You're going to {location.state.to}!
          </div>
          <div className="instant-book-confirm-code">
            Your confirmation code is{" "}
            <span style={{ color: "#3d77ff" }}>H2A5</span>. A confirmation email
            is sent to <span style={{ color: "#3d77ff" }}>XXXX@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="instant-book-card-halves">
        <div className="instant-book-confirm-card">
          <div className="instant-book-confirm-one-third">
            <div className="instant-book-confirm-card-title">Ride Summary</div>
            <div className="instant-book-confirm-location">
              {location.state.from}
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "40px", height: "40px" }}
              />
              {location.state.to}
            </div>
            <div className="instant-book-confirm-date">
              <div>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  style={{ marginLeft: "0px", marginRight: "10px" }}
                />
                {moment(location.state.date)
                  .utc()
                  .format("M/DD/YY")}{" "}
              </div>
              <div>
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ marginLeft: "70px", marginRight: "10px" }}
                />
                {moment(location.state.date)
                  .utc()
                  .format("h A")}{" "}
              </div>
            </div>
            <div className="instant-book-confirm-specific">
              <div className="instant-book-confirm-pickup">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ marginLeft: "0px", marginRight: "10px" }}
                />
                {/* Pickup: {location.state.specificPickup} */}
                <span style={{ fontWeight: "bold", marginRight: "16px" }}>
                  Pickup:
                </span>
                Westwood In N Out
              </div>
              <div className="instant-book-confirm-dropoff">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ marginLeft: "0px", marginRight: "10px" }}
                />
                {/* Dropoff: {location.state.specificDropoff} */}
                <span style={{ fontWeight: "bold", marginRight: "10px" }}>
                  Dropoff:
                </span>{" "}
                Bay Area near Cupertino
              </div>
            </div>
            <div className="instant-book-confirm-carryon">
              <span style={{ fontWeight: "bold", marginRight: "20px" }}>
                Carry-on:
              </span>{" "}
              1
            </div>
            <div className="instant-book-confirm-divider"></div>
          </div>
          <div className="instant-book-confirm-three-third">
            <div className="instant-book-confirm-card-title">Payments</div>
            <div className="instant-book-confirm-visa">
              <div className="instant-book-confirm-left">Card:</div>
              <div className="instant-book-confirm-right">VISA ....1234</div>
            </div>
            <div className="instant-book-confirm-amount-paid">
              <div className="instant-book-confirm-left">
                Amount Paid (USD):
              </div>
              <div className="instant-book-confirm-right">
                ${location.state.price}
              </div>
            </div>
            <div className="instant-book-confirm-divider"></div>
          </div>
          <div className="instant-book-confirm-three-third">
            <div className="instant-book-confirm-card-title">
              Cancellation Policy (Strict):
            </div>
            <div className="instant-book-confirm-cancel-text">
              Free cancellation for 48 hours after booking.
              <br />
              After that, cancel before 10:00PM on Apr 30 and
              <br />
              get a 50% refund, minus the service fee.
              <br />
              <br />
              Cutoff times are based on the listing's local time.
            </div>
          </div>
        </div>
        <div className="instant-book-confirm-card-right">
          <div className="instant-book-card-one-half">
            <div className="instant-book-confirm-card-title">Driver</div>
            <div className="instant-book-confirm-driver-halves">
              <div className="instant-book-confirm-driver">
                <div className="instant-book-confirm-driver-img">
                  <img
                    src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                    alt="bear"
                    style={{ width: "65px", height: "65px" }}
                  />
                </div>
                <div className="instant-book-confirm-driver-info">
                  <div className="instant-book-confirm-driver-name">
                    {location.state.ownerUsername}
                  </div>
                  <div className="instant-book-confirm-driver-school">
                    <FontAwesomeIcon
                      icon={faGraduationCap}
                      style={{ marginRight: "5px" }}
                    />
                    UCLA
                  </div>
                </div>
              </div>
              <Button
                style={{
                  backgroundColor: "#3d77ff",
                  borderWidth: "0px",
                  boxShadow: "none",
                  borderRadius: "10px",
                  height: "44px",
                  width: "150px"
                }}
              >
                Contact Driver
              </Button>
            </div>
            <div className="instant-book-confirm-divider"></div>
          </div>
          <div className="instant-book-card-two-half">
            <div className="instant-book-confirm-card-title">Driver's Note</div>
            <div className="instant-book-confirm-driver-note">
              {location.state.driverNote}
            </div>
          </div>
        </div>
      </div>
      <div className="instant-book-confirm-buttons">
        <Button
          style={{
            backgroundColor: "#3d77ff",
            borderWidth: "0px",
            color: "white",
            boxShadow: "none",
            width: "190px",
            height: "50px",
            borderRadius: "10px"
          }}
          onClick={() => history.push("/rider")}
        >
          Go to My Rides
        </Button>
      </div>
    </div>
  );
};

export default withRouter(InstantBookConfirmPage);
