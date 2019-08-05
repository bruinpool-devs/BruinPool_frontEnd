import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import {
  faClock,
  faCalendarAlt,
  faUser
} from "@fortawesome/free-regular-svg-icons";

import "./PostDriveModal.css";

const _ = require("underscore");

const PostDriveModal = ({ modal, toggleModal }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(Date());
  const [time, setTime] = useState(Date());
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(0);
  const [desc, setDesc] = useState("Test Description");

  const locationStyle = {
    width: "96%",
    borderColor: "#E6E6E6",
    borderWidth: "1px",
    boxShadow: "none",
    backgroundColor: "#EDEDED",
    borderRadius: "10px",
    fontSize: "19px",
    color: "#D3D3D3",
    height: "44px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center"
  };

  const etcStyle = _.extend({}, locationStyle, {
    width: "92%"
  });

  const descStyle = _.extend({}, locationStyle, {
    width: "98%",
    height: "140px",
    color: desc === "Test Description" ? "#D3D3D3" : "#5c5c5c"
  });

  return (
    <div className="post-drive-modal-wrapper">
      <div className="post-drive-title">
        <p>NEW DRIVE</p>
      </div>
      <div className="post-drive-options">
        <div className="post-drive-location">
          <div className="location-input">
            <Button style={locationStyle}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: "#ADE88F" }}
              />
              <div style={{ marginLeft: "10px" }}>From</div>
            </Button>
          </div>
          <div className="location-input">
            <Button style={locationStyle}>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ color: "#FABE5D" }}
              />
              <div style={{ marginLeft: "10px" }}>To</div>
            </Button>
          </div>
        </div>
        <div className="post-drive-etc">
          <div className="half-inputs">
            <div className="etc-input">
              <Button style={etcStyle}>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  style={{ color: "#1D96EF" }}
                />
                <div style={{ marginLeft: "10px" }}>Date</div>
              </Button>
            </div>
            <div className="etc-input">
              <Button style={etcStyle}>
                <FontAwesomeIcon icon={faClock} style={{ color: "#FF9393" }} />
                <div style={{ marginLeft: "10px" }}>Time</div>
              </Button>
            </div>
          </div>
          <div className="half-inputs">
            <div className="etc-input">
              <Button style={etcStyle}>
                <FontAwesomeIcon
                  icon={faDollarSign}
                  style={{ color: "#7CDDA6" }}
                />
                <div style={{ marginLeft: "10px" }}>Price</div>
              </Button>
            </div>
            <div className="etc-input">
              <Button style={etcStyle}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#A2DAEF" }} />
                <div style={{ marginLeft: "10px" }}>Seats</div>
              </Button>
            </div>
          </div>
        </div>
        <div className="post-drive-desc">
          <Input
            type="textarea"
            style={descStyle}
            value={desc}
            onChange={e => {
              setDesc(e.target.value);
            }}
          />
        </div>
        <div className="post-drive-button">
          <Button
            onClick={() => toggleModal(!modal)}
            style={{
              backgroundColor: "#1D96EF",
              boxShadow: "none",
              borderWidth: "0px",
              width: "100px",
              fontWeight: "bold",
              fontSize: "20px",
              borderRadius: "10px"
            }}
          >
            POST
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostDriveModal;
