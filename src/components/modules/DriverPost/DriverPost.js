import React, { useState } from "react";

import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  UncontrolledCollapse,
  Card,
  CardBody
} from "reactstrap";
import {
  faMapMarkerAlt,
  faDollarSign
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarAlt,
  faClock,
  faUser,
  faCheckSquare,
  faSquare
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./DriverPost.css";
import "../DriverRegister/DriverRegister.css";
import PostRideModal from "../../modals/PostRideModal/PostRideModal";

const mockData = [
  "UCLA",
  "UCSB",
  "Orange County",
  "Irvine",
  "Los Angeles",
  "Pasadena"
];

const _ = require("underscore");

const DriverPost = ({ toggleRegistered }) => {
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);
  const [fromLocation, setFromLocation] = useState("From");
  const [toLocation, setToLocation] = useState("To");
  const [specificPickup, setSpecificPickup] = useState("");
  const [specificDropoff, setSpecificDropoff] = useState("");
  const [modal, setModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [price, setPrice] = useState(0);
  const [seats, setSeats] = useState(0);
  const [driverNote, setDriverNote] = useState("");
  const [specificOnly, setSpecificOnly] = useState(true);
  const [noPet, setNoPet] = useState(false);
  const [oneCarryOn, setOneCarryOn] = useState(false);
  const [oneLuggage, setOneLuggage] = useState(false);
  const [instantBook, setInstantBook] = useState(false);

  const dropdownButtonStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    color: "#b1b1b1",
    borderWidth: "0px",
    boxShadow: "none",
    fontSize: "20px",
    height: "45px",
    border: "1px solid #c4c4c4"
  };

  const fromButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: fromLocation === "From" ? "#b1b1b1" : "black"
  });

  const toButtonStyle = _.extend({}, dropdownButtonStyle, {
    color: toLocation === "To" ? "#b1b1b1" : "black"
  });

  const optionStyle = {
    width: "170px",
    height: "45px",
    marginTop: "20px",
    borderWidth: "0px 0px 2px 0px",
    borderRadius: "0px",
    marginLeft: "10px",
    boxShadow: "none"
  };

  const optionStyle2 = {
    width: "350px",
    height: "45px",
    marginTop: "20px",
    borderWidth: "0px 0px 2px 0px",
    borderRadius: "0px",
    marginLeft: "10px",
    boxShadow: "none"
  };

  const textAreaStyle = {
    height: "120px",
    marginTop: "40px",
    boxShadow: "none",
    paddingLeft: "27px"
  };

  const iconStyle = {
    color: "#818181",
    height: "21px",
    width: "16px",
    marginBottom: "-17px"
  };

  const buttonStyle = {
    backgroundColor: "#3d77ff",
    borderWidth: "0px",
    boxShadow: "none",
    marginTop: "30px",
    width: "120px",
    height: "40px"
  };

  return (
    <div className="drive-register-wrapper">
      <div className="drive-register-container">
        <div className="drive-register-title-row">
          <div className="title">Post a Ride</div>
          <Button
            onClick={() => toggleRegistered(false)}
            color="success"
            style={{ marginLeft: "20px" }}
          >
            Toggle Screen
          </Button>
        </div>
        <div className="post-form">
          <div className="post-from-to">
            <ButtonDropdown
              isOpen={fromDropdown}
              toggle={() => setFromDropdown(!fromDropdown)}
              style={{ width: "420px" }}
            >
              <DropdownToggle style={fromButtonStyle}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#818181", height: "21px", width: "16px" }}
                />
                <div style={{ marginLeft: "20px" }}>{fromLocation}</div>
              </DropdownToggle>
              <DropdownMenu>
                {mockData.map((location, index) => (
                  <div style={{ width: "420px" }}>
                    <DropdownItem onClick={() => setFromLocation(location)}>
                      {location}
                    </DropdownItem>
                    {index !== mockData.length - 1 && <DropdownItem divider />}
                  </div>
                ))}
              </DropdownMenu>
            </ButtonDropdown>
            <ButtonDropdown
              isOpen={toDropdown}
              toggle={() => setToDropdown(!toDropdown)}
              style={{ width: "420px" }}
            >
              <DropdownToggle style={toButtonStyle}>
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#818181", height: "21px", width: "16px" }}
                />
                <div style={{ marginLeft: "20px" }}>{toLocation}</div>
              </DropdownToggle>
              <DropdownMenu>
                {mockData.map((location, index) => (
                  <div style={{ width: "420px" }}>
                    <DropdownItem onClick={() => setToLocation(location)}>
                      {location}
                    </DropdownItem>
                    {index !== mockData.length - 1 && <DropdownItem divider />}
                  </div>
                ))}
              </DropdownMenu>
            </ButtonDropdown>
          </div>
          <div className="post-from-to">
            <div className="post-options">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
              <Input
                placeholder="Specific Pickup Location... e.g. Westwood In n Out"
                style={optionStyle2}
                value={specificPickup}
                onChange={e => setSpecificPickup(e.target.value)}
              />
            </div>
            <div className="post-specific-location">
              <FontAwesomeIcon icon={faMapMarkerAlt} style={iconStyle} />
              <Input
                placeholder="Specific Dropoff Location... e.g. Cupertino"
                style={optionStyle2}
                value={specificDropoff}
                onChange={e => setSpecificDropoff(e.target.value)}
              />
            </div>
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faCalendarAlt} style={iconStyle} />
            <Input
              type="date"
              style={optionStyle}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faDollarSign} style={iconStyle} />
            <Input
              type="number"
              placeholder="Price"
              style={optionStyle}
              onChange={e => setPrice(e.target.value)}
            />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faUser} style={iconStyle} />
            <Input
              type="number"
              placeholder="Available Seats"
              style={optionStyle}
              onChange={e => setSeats(e.target.value)}
            />
          </div>
          <div className="post-options">
            <FontAwesomeIcon icon={faClock} style={iconStyle} />
            <Input
              type="time"
              placeholder="Pickup Time"
              style={optionStyle}
              onChange={e => setTime(e.target.value)}
            />
          </div>
          <div>
            <div className="instant-options">
              Allow Instant Book (Optional)
              {!instantBook ? (
                <FontAwesomeIcon
                  className="instantBook-checkbox"
                  id="toggler"
                  icon={faSquare}
                  onClick={() => setInstantBook(!instantBook)}
                  value={instantBook}
                ></FontAwesomeIcon>
              ) : (
                <FontAwesomeIcon
                  className="instantBook-checkbox"
                  id="toggler"
                  icon={faCheckSquare}
                  onClick={() => setInstantBook(!instantBook)}
                  value={instantBook}
                ></FontAwesomeIcon>
              )}
              {/* <Input addon type="checkbox" id="toggler" /> */}
            </div>
            <UncontrolledCollapse toggler="#toggler">
              <Card className="instant-card">
                <CardBody>
                  Riders will be able to instant book only if they agree on the
                  following parameters:
                  <div className="instantBook-list">
                    Specific pick up and drop off only
                    {!specificOnly ? (
                      <FontAwesomeIcon
                        className="instantBook-square1"
                        icon={faSquare}
                        onClick={() => setSpecificOnly(!specificOnly)}
                        value={specificOnly}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        className="instantBook-check1"
                        icon={faCheckSquare}
                        onClick={() => setSpecificOnly(!specificOnly)}
                        value={specificOnly}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div className="instantBook-list">
                    No pets on ride
                    {!noPet ? (
                      <FontAwesomeIcon
                        className="instantBook-square2"
                        icon={faSquare}
                        onClick={() => setNoPet(!noPet)}
                        value={noPet}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        className="instantBook-check2"
                        icon={faCheckSquare}
                        onClick={() => setNoPet(!noPet)}
                        value={noPet}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div className="instantBook-list">
                    One carry-on only
                    {!oneCarryOn ? (
                      <FontAwesomeIcon
                        className="instantBook-square3"
                        icon={faSquare}
                        onClick={() => setOneCarryOn(!oneCarryOn)}
                        value={oneCarryOn}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        className="instantBook-check3"
                        icon={faCheckSquare}
                        onClick={() => setOneCarryOn(!oneCarryOn)}
                        value={oneCarryOn}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div className="instantBook-list">
                    One luggage only
                    {!oneLuggage ? (
                      <FontAwesomeIcon
                        className="instantBook-square4"
                        icon={faSquare}
                        onClick={() => setOneLuggage(!oneLuggage)}
                        value={oneLuggage}
                      ></FontAwesomeIcon>
                    ) : (
                      <FontAwesomeIcon
                        className="instantBook-check4"
                        icon={faCheckSquare}
                        onClick={() => setOneLuggage(!oneLuggage)}
                        value={oneLuggage}
                      ></FontAwesomeIcon>
                    )}
                  </div>
                  <div className="instantBook-list">
                    4.0+ rating only
                    <div className="instantBook-coming-soon">Coming Soon</div>
                  </div>
                  <div className="instantBook-list">
                    No eating in car
                    <div className="instantBook-coming-soon">Coming Soon</div>
                  </div>
                </CardBody>
              </Card>
            </UncontrolledCollapse>
          </div>
          <div className="additional-detail-card">Additional Details</div>
          <div className="post-options">
            <Input
              type="textarea"
              placeholder="Flexible about where and when to meet? Any pets in car? Got limited space in your trunk? Keep your riders in the loop."
              style={textAreaStyle}
              onChange={e => setDriverNote(e.target.value)}
              value={driverNote}
            />
          </div>
          <div className="post-options">
            {modal && (
              <PostRideModal
                isOpen={modal}
                toggleModal={setModal}
                from={fromLocation}
                to={toLocation}
                specificPickup={specificPickup}
                specificDropoff={specificDropoff}
                date={date}
                time={time}
                price={price}
                seats={seats}
                driverNote={driverNote}
                specificOnly={specificOnly}
                noPet={noPet}
                oneCarryOn={oneCarryOn}
                oneLuggage={oneLuggage}
                instantBook={instantBook}
              />
            )}
          </div>
          <div className="post-options">
            <Button
              style={buttonStyle}
              onClick={() => {
                setModal(!modal);
              }}
            >
              Post Ride
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverPost;
