import React from "react";
import Popup from "reactjs-popup";
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
    this.setState({ open: false });
  }

  render() {

    let requestStatusText;

    switch(this.props.request.meta.status) {
      case "pending":
        requestStatusText = <span className="orange-highlight">{this.props.request.meta.status}</span>;
        break;
      case 'declined':
        requestStatusText = <span className="red-highlight">{this.props.request.meta.status}</span>;     
        break;      
      case 'cancelled':
        requestStatusText = <span className="red-highlight">{this.props.request.meta.status}</span>;
        break;
      case `approved`:
        requestStatusText = <span className="green-highlight">{this.props.request.meta.status}</span>;
        break;
      default:
        requestStatusText = <span className="red-highlight">Invalid Status</span>;
        break;
    }

    return (
      <div className="request-card" onClick={this.openModal}>
        <div className="row request-card-header" style={{padding: "10px" }}>
          <div className="col-sm-6" style={{ fontSize: "13px" }}>2 hrs ago</div>
          <div className="col-sm-6 approved-request-status">{requestStatusText}</div>
        </div>

        <div className="row card-body">
          <div className="card-image col-sm-4">
            <img
              src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
              alt="bear"
            />
            <br />
            <span className="caption card-name">{this.props.request.ride.ownerFullName}</span>
          </div>

          <div className="card-info">
            <div className="card-itinerary">
              <div className="itinerary-from">{this.props.request.ride.from.name}</div>
              <FontAwesomeIcon
                icon={faLongArrowAltRight}
                style={{ width: "50px", height: "30px" }}
              />
              <div className="itinerary-to">{this.props.request.ride.to.name}</div>
            </div>
            <pre>{this.props.request.ride.date}   {this.props.request.ride.time}</pre>
          </div>
        </div>

        <Popup
          open={this.state.open}
          closeOnDocumentClick
          onClose={this.closeModal}
        >
          <div className="modal">
            <a className="close" onClick={this.closeModal}>
              &times;
            </a>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae magni
              omnis delectus nemo, maxime molestiae dolorem numquam mollitia, voluptate
              ea, accusamus excepturi deleniti ratione sapiente! Laudantium, aperiam
              doloribus. Odit, aut.
          </div>
        </Popup>
      </div>
    );
  }
}