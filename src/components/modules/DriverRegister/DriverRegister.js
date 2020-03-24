import React, { useContext } from "react";

import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faGlobeAmericas,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "universal-cookie";
import "./DriverRegister.css";
import MainContext from "../../../context/mainContext";

const cookies = new Cookies();
const authToken = cookies.get("authToken");

const iconStyle = {
  color: "#3d77ff",
  width: "63px",
  height: "40px",
  marginLeft: "-5px",
  marginBottom: "10px"
};

class DriverRegister extends React.Component {
  static contextType = MainContext;

  constructor(props) {
    super(props);
    this.state = {
      phoneNumberValue: "",
      vehicleModelValue: "",
      licensePlateNumber: "",
      driversLicense: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Check to make sure all the forms values are populated
  validateForm() {
    if (
      this.state.phoneNumber == "" ||
      this.state.driversLicense == "" ||
      this.state.licensePlateNumber == "" ||
      this.state.vehicleModel == ""
    ) {
      return false;
    }
    return true;
  }

  handleChange(event) {
    const targetName = event.target.getAttribute("name");

    if (targetName == "phone-number") {
      this.setState({ phoneNumberValue: event.target.value });
    } else if (targetName == "vehicle-model") {
      this.setState({ vehicleModelValue: event.target.value });
    } else if (targetName == "license-plate-number") {
      this.setState({ licensePlateNumber: event.target.value });
    } else if (targetName == "drivers-license") {
      this.setState({ driversLicense: event.target.value });
    } else {
      alert("Invalid state change.");
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.validateForm()) {
      alert("Not all driver info fields are populated");
      return;
    }

    const mainContext = this.context;

    const driverInfo = {
      phoneNumber: this.state.phoneNumberValue,
      licensePlate: this.state.licensePlateNumber,
      vehicleModel: this.state.vehicleModelValue,
      driversLicense: this.state.driversLicense
    };

    mainContext
      .redirectStripeAuth(driverInfo, authToken)
      .then(res => {
        window.location = res.redirectUrl;
      })
      .catch(err => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="drive-register-wrapper">
        <div className="drive-register-container">
          <div className="drive-register-title-row">
            <div className="title">Register as a driver</div>
            <Button
              onClick={() => this.props.toggleRegistered(true)}
              color="success"
              style={{ marginLeft: "20px" }}
            >
              Toggle Screen
            </Button>
          </div>
          <div className="register-card">
            <div className="register-form">
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Input
                    name="phone-number"
                    placeholder="Phone"
                    style={{ marginBottom: "0px" }}
                    value={this.state.phoneNumberValue}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="drivers-license"
                    placeholder="Drivers License Number"
                    style={{ marginBottom: "0px" }}
                    value={this.state.driversLicense}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="license-plate-number"
                    placeholder="License Plate Number"
                    style={{ marginBottom: "0px" }}
                    value={this.state.licensePlateNumber}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="vehicle-model"
                    placeholder="Vehicle Model"
                    style={{ marginBottom: "10px" }}
                    value={this.state.vehicleModelValue}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormText
                  color="black"
                  style={{ fontSize: "10px", marginBottom: "5px" }}
                >
                  By proceeding, I agree to PoolUp's Terms of Use and
                  acknowledge that I have read the Privacy Policy.
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
  }
}

export default DriverRegister;
