import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Input,
  ButtonDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";

import Cookies from "universal-cookie";
import MainContext from "../../../context/mainContext";
import Navbar from "../../navbar/Navbar";

import RegisterImage from "./register.png";

import "./DriverRegister1.css";

const mockModels = [
  "Porsche 911",
  "Ford Mustang",
  "Chevrolet Corvette",
  "Hyundai Sonata",
];

const mockColors = ["Red", "Blue", "Black", "White"];

const DriverRegister1 = ({ history }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vehicleMakeModel, setVehicleMakeModel] = useState(
    "Vehicle Make and Model (press to choose...)"
  );
  const [licensePlate, setLicensePlate] = useState("");
  const [driversLicense, setDriversLicense] = useState("");
  const [vehicleColor, setVehicleColor] = useState(
    "Vehicle Color (press to choose...)"
  );
  const [modelDropdown, setModelDropdown] = useState(false);
  const [colorDropdown, setColorDropdown] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  //Check to make sure all the forms values are populated
  const validateForm = () => {
    if (
      phoneNumber === "" ||
      driversLicense === "" ||
      licensePlate === "" ||
      vehicleMakeModel === "" ||
      vehicleColor === ""
    ) {
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      alert("Not all driver info fields are populated!");
      return;
    }

    const driverInfo = {
      phoneNumber: phoneNumber,
      licensePlate: licensePlate,
      vehicleMakeModel: vehicleMakeModel,
      driversLicense: driversLicense,
      vehicleColor: vehicleColor,
    };

    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const resp = await mainContext.registerDriver(driverInfo, authToken);

    if (resp === 200) {
      history.push("/driver/post");
    }

    // mainContext
    //   .redirectStripeAuth(driverInfo, authToken)
    //   .then(res => {
    //     window.location = res.redirectUrl;
    //   })
    //   .catch(err => {
    //     alert(err);
    //   });
  };

  const _ = require("underscore");

  const inputStyle = {
    width: "453px",
    height: "51px",
    marginTop: "20px",
    borderColor: "#c4c4c4",
  };

  const modelButtonStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color:
      vehicleMakeModel === "Vehicle Make and Model (press to choose...)"
        ? "#b1b1b1"
        : "black",
    borderColor: "#c4c4c4",
    boxShadow: "none",
    height: "51px",
    marginTop: "20px",
  };

  const colorButtonStyle = _.extend({}, modelButtonStyle, {
    color:
      vehicleColor === "Vehicle Color (press to choose...)"
        ? "#b1b1b1"
        : "black",
  });

  return (
    <div>
      <Navbar />
      <div className="drive-register-wrapper">
        <div className="drive-register-container">
          <div className="drive-register-top-row">
            <div className="begin-driving-title">Register as a driver</div>
            <div className="signup-progress-bar">
              <div className="signup-current-step">Register as a Driver</div>
              <div className="signup-progress-divider">></div>
              <div>Set up Payment</div>
              <div className="signup-progress-divider">></div>
              <div>Begin Driving</div>
            </div>
          </div>
          <div className="driver-register-centered">
            <div className="benefits-section">
              <img src={RegisterImage} alt="register" />
            </div>
            <div className="register-form">
              <div className="register-form-row">
                <Input
                  style={inputStyle}
                  name="phone-number"
                  placeholder="Phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Input
                  style={inputStyle}
                  name="drivers-license"
                  placeholder="Drivers License #"
                  value={driversLicense}
                  onChange={(e) => setDriversLicense(e.target.value)}
                />
              </div>
              <div className="register-form-row">
                <ButtonDropdown
                  isOpen={modelDropdown}
                  toggle={() => setModelDropdown(!modelDropdown)}
                  style={{ width: "453px" }}
                >
                  <DropdownToggle style={modelButtonStyle}>
                    <div>{vehicleMakeModel}</div>
                  </DropdownToggle>
                  <DropdownMenu>
                    {mockModels.map((model, index) => (
                      <div key={index} style={{ width: "453px" }}>
                        <DropdownItem
                          onClick={() => setVehicleMakeModel(model)}
                        >
                          {model}
                        </DropdownItem>
                        {index !== mockModels.length - 1 && (
                          <DropdownItem divider />
                        )}
                      </div>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
                <ButtonDropdown
                  isOpen={colorDropdown}
                  toggle={() => setColorDropdown(!colorDropdown)}
                  style={{ width: "453px" }}
                >
                  <DropdownToggle style={colorButtonStyle}>
                    <div>{vehicleColor}</div>
                  </DropdownToggle>
                  <DropdownMenu>
                    {mockColors.map((color, index) => (
                      <div key={index} style={{ width: "453px" }}>
                        <DropdownItem onClick={() => setVehicleColor(color)}>
                          {color}
                        </DropdownItem>
                        {index !== mockColors.length - 1 && (
                          <DropdownItem divider />
                        )}
                      </div>
                    ))}
                  </DropdownMenu>
                </ButtonDropdown>
              </div>
              <div className="register-form-row">
                <Input
                  style={inputStyle}
                  name="license-plate-number"
                  placeholder="Vehicle License Plate #"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                />
              </div>
              <div className="register-payment-title">Payment Information</div>
              <div className="register-payment-text">
                We use Stripe to make sure you get reimbursed on time and to
                keep your personal bank and details secure. Click{" "}
                <b>Connect Payment Method</b> to set up your payments on Stripe.
              </div>
              <div className="connect-payment-centered">
                <div className="connect-payment-text">
                  By proceeding, you agree with our Terms of Services and
                  Privacy Policy.
                </div>
                <Button
                  style={{
                    backgroundColor: "#3d77ff",
                    boxShadow: "none",
                    borderWidth: "0px",
                    width: "381px",
                    height: "53px",
                    fontSize: "20px",
                    borderRadius: "10px",
                  }}
                  onClick={handleSubmit}
                >
                  Register as Driver
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DriverRegister1);
