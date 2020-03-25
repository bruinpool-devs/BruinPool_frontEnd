import React, { useState, useContext } from "react";

import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faGlobeAmericas,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import MainContext from "../../../context/mainContext";

import "./DriverRegister.css";

const cookies = new Cookies();
const authToken = cookies.get("authToken");

const iconStyle = {
  color: "#3d77ff",
  width: "63px",
  height: "40px",
  marginLeft: "-5px",
  marginBottom: "10px"
};

const DriverRegister = ({ toggleRegistered }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleMakeModel, setVehicleMakeModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");

  const mainContext = useContext(MainContext);

  //Check to make sure all the forms values are populated
  const validateForm = () => {
    if (
      phoneNumber == "" ||
      driversLicense == "" ||
      licensePlate == "" ||
      vehicleMakeModel == "" ||
      vehicleColor == ""
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) {
      alert("Not all driver info fields are populated");
      return;
    }

    const driverInfo = {
      phoneNumber: phoneNumber,
      licensePlate: licensePlate,
      vehicleMakeModel: vehicleMakeModel,
      driversLicense: driversLicense,
      vehicleColor: vehicleColor
    };

    mainContext
      .redirectStripeAuth(driverInfo, authToken)
      .then(res => {
        window.location = res.redirectUrl;
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <div className="drive-register-wrapper">
      <div className="drive-register-container">
        <div className="drive-register-title-row">
          <div className="title">Register as a driver</div>
          <Button
            onClick={() => toggleRegistered(true)}
            color="success"
            style={{ marginLeft: "20px" }}
          >
            Toggle Screen
          </Button>
        </div>
        <div className="register-card">
          <div className="register-form">
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Input
                  name="phone-number"
                  placeholder="Phone"
                  value={phoneNumber}
                  onChange={e => setPhoneNumber(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="drivers-license"
                  placeholder="Drivers License #"
                  value={driversLicense}
                  onChange={e => setDriversLicense(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="license-plate-number"
                  placeholder="License Plate #"
                  value={licensePlate}
                  onChange={e => setLicensePlate(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="vehicle-make-model"
                  placeholder="Vehicle Model"
                  value={vehicleMakeModel}
                  onChange={e => setVehicleMakeModel(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  name="vehicle-color"
                  placeholder="Vehicle Color"
                  style={{ marginBottom: "10px" }}
                  value={vehicleColor}
                  onChange={e => setVehicleColor(e.target.value)}
                />
              </FormGroup>
              <FormText
                color="black"
                style={{ fontSize: "10px", marginBottom: "5px" }}
              >
                By proceeding, I agree to PoolUp's Terms of Use and acknowledge
                that I have read the Privacy Policy.
              </FormText>
              <Button
                style={{
                  backgroundColor: "#3d77ff",
                  boxShadow: "none",
                  borderWidth: "0px",
                  width: "300px",
                  height: "40px"
                }}
              >
                Connect payment method
              </Button>
            </Form>
          </div>
          <div className="register-image">
            <img
              src={process.env.PUBLIC_URL + "/images/drive-register.png"}
              alt="drive-register"
            />
          </div>
        </div>
        <div className="benefits-section">
          <div className="each-benefit">
            <FontAwesomeIcon icon={faMoneyBill} style={iconStyle} />
            <div className="benefit-title">Save and Earn Money</div>
            <div className="benefit-desc">
              Drive to save gas money and earn extra cash.
            </div>
          </div>
          <div className="each-benefit">
            <FontAwesomeIcon icon={faGlobeAmericas} style={iconStyle} />
            <div className="benefit-title">Reduce Carbon Footprint</div>
            <div className="benefit-desc">
              Carpool and save the environment.
            </div>
          </div>
          <div className="each-benefit">
            <FontAwesomeIcon icon={faUsers} style={iconStyle} />
            <div className="benefit-title">Network</div>
            <div className="benefit-desc">
              Grow your network by meeting new university students.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverRegister;
