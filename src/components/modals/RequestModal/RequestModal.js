import React from "react";
import Popup from "../PopupModal/PopupModal";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./RequestModal.css";

export default class RequestModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ open: true });
  }
  closeModal() {
    console.log("HELLO");
    this.setState({ open: false }, function() {
      console.log("STATE SET TO: ", this.state.open);
    });
  }

  render() {
    let requestStatusText;
    let proceedToCheckout;
    let tripSubTotal =
      this.props.request.meta.seats * this.props.request.meta.price;

    switch (this.props.request.meta.status) {
      case "pending":
        requestStatusText = (
          <span className="orange-highlight">
            {this.props.request.meta.status}
          </span>
        );
        break;
      case "declined":
        requestStatusText = (
          <span className="red-highlight">
            {this.props.request.meta.status}
          </span>
        );
        break;
      case "cancelled":
        requestStatusText = (
          <span className="red-highlight">
            {this.props.request.meta.status}
          </span>
        );
        break;
      case `approved`:
        requestStatusText = (
          <span className="green-highlight">
            {this.props.request.meta.status}
          </span>
        );
        proceedToCheckout = (
          <span className="default-btn">Proceed To Checkout</span>
        );
        break;
      default:
        requestStatusText = (
          <span className="red-highlight">Invalid Status</span>
        );
        break;
    }

    return (
      <div className="request-card" onClick={this.openModal}>
        <div className="row request-card-header" style={{ padding: "10px" }}>
          <div className="col-sm-6" style={{ fontSize: "13px" }}>
            2 hrs ago
          </div>
          <div className="col-sm-6 approved-request-status">
            {requestStatusText}
          </div>
        </div>

        <div className="row card-body">
          <div className="card-image col-sm-4">
            <img
              src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
              alt="bear"
            />
            <br />
            <span className="caption card-name">
              {this.props.request.ride.ownerFullName}
            </span>
          </div>

          <div className="card-info">
            <div className="card-itinerary">
              <div className="itinerary-from">
                {this.props.request.ride.from.name}
              </div>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
              <div className="itinerary-to">
                {this.props.request.ride.to.name}
              </div>
            </div>
            <div>
              {this.props.request.ride.date} {this.props.request.ride.time}
            </div>
          </div>
        </div>

        <Popup open={this.state.open} onClose={this.closeModal}>
          <div className="row request-card-header">
            <div className="col-sm-4 col-md-3 card-itinerary">
              <div className="itinerary-from">
                {this.props.request.ride.from.name}
              </div>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
              <div className="itinerary-to">
                {this.props.request.ride.to.name}
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-sm-2 col-md-2">{requestStatusText}</div>
            <div className="col-sm-6 col-md-6"></div>
          </div>

          <div className="row request-card-body">
            <div className="request-card-ride-details col-md-4">
              Date: {this.props.request.ride.date}
              Time: {this.props.request.ride.time}
              PickUp: {this.props.request.ride.from.location}
              DropOff: {this.props.request.ride.to.location}
              Seats: {this.props.request.meta.seats}
              Luggage: {this.props.request.meta.luggage}
              Trip SubTotal: {tripSubTotal}
            </div>

            <div className="request-card-driver-details col-md-4">
              Driver:
              <div className="card-image col-sm-4">
                <img
                  src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                  alt="bear"
                />
                <br />
                <span className="caption card-name">
                  {this.props.request.ride.ownerFullName}
                </span>
              </div>
              Driver's Note:
              {this.props.request.ride.detail}
            </div>

            <div className="request-card-request-msg col-md-4">
              <div className="row">
                Your Message to Driver:{this.props.request.meta.msg}
              </div>
              <div className="row">{proceedToCheckout}</div>
            </div>
          </div>
        </Popup>
      </div>
    );
  }
}
