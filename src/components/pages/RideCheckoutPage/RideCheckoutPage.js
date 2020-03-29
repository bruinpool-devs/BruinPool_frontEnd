import React from "react";
import "./RideCheckoutPage.css";
import Checkout from "./checkout.js";
import { Row, Col, Container } from "reactstrap";
import {
  faLongArrowAltRight,
  faCalendarAlt,
  faClock,
  faMapMarker
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "../../navbar/Navbar";

const RideCheckoutPage = props => {
  const rideCheckoutDetails = props.history.location.state;
  const tripSubTotal = rideCheckoutDetails.price;

  return (
    <div>
      <Navbar />
      <Container className="app">
        <Row>
          <Col xs={4} className="itinerary">
            <h3>Ride Details</h3>

            <Row className="itinerary-head">
              <Col className="itinerary-from">{rideCheckoutDetails.from}</Col>
              <Col>
                <FontAwesomeIcon
                  icon={faLongArrowAltRight}
                  style={{ width: "50px", height: "30px" }}
                />
              </Col>
              <Col className="itinerary-to">{rideCheckoutDetails.to}</Col>
            </Row>

            <Row className="itinerary-body">
              <Row>
                <Col>
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    style={{ width: "20px", height: "20px" }}
                  />{" "}
                  <span className="icon-text">{rideCheckoutDetails.date}</span>
                </Col>
                <Col>
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ width: "20px", height: "20px" }}
                  />
                  <span className="icon-text">{rideCheckoutDetails.time}</span>
                </Col>
              </Row>
              <Row>
                <Col xs={2}>
                  <FontAwesomeIcon
                    icon={faMapMarker}
                    style={{ width: "20px", height: "20px" }}
                  />
                </Col>
                <Col>
                  <Row>Pickup: {rideCheckoutDetails.specificPickup}</Row>
                  <Row>Dropoff: {rideCheckoutDetails.specificDropoff}</Row>
                </Col>
              </Row>
              <Row>
                <Col>
                  Seats: <span className="bold-text">1</span>
                </Col>
                <Col>
                  Luggage:{" "}
                  <span className="bold-text">
                    {rideCheckoutDetails.luggage}
                  </span>
                </Col>
              </Row>
            </Row>
            <Row className="driver-details">
              <h4>Driver:</h4>
              <Col className="popup-card-image">
                <img
                  src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                  alt="bear"
                />
                <span className="caption">
                  {rideCheckoutDetails.ownerUsername}
                </span>
              </Col>
            </Row>

            <Row xs={5} className="driver-note">
              <h4>Driver's Note:</h4>
              {rideCheckoutDetails.driverNote}
            </Row>
          </Col>

          <Col className="checkOutCol">
            <h3>Payment Summary</h3>
            <h4>Subtotal: {tripSubTotal}</h4>
            <h4>Pool Up Fee: 0</h4>
            <h4>Total:</h4>
            <Checkout rideCheckoutDetails={rideCheckoutDetails} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RideCheckoutPage;
