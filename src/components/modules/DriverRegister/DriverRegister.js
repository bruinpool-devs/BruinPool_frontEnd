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
      phoneNumber: "",
      vehicleMakeModel: "",
      licensePlate: "",
      driversLicense: "",
      vehicleColor: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  //Check to make sure all the forms values are populated
  validateForm() {
    if (
      this.state.phoneNumber == "" ||
      this.state.driversLicense == "" ||
      this.state.licensePlate == "" ||
      this.state.vehicleMakeModel == "" ||
      this.state.vehicleColor == ""
    ) {
      return false;
    }
    return true;
  }

  handleChange(event) {
    const targetName = event.target.getAttribute("name");

    if (targetName == "phone-number") {
      this.setState({ phoneNumber: event.target.value });
    } else if (targetName == "vehicle-make-model") {
      this.setState({ vehicleMakeModel: event.target.value });
    } else if (targetName == "license-plate-number") {
      this.setState({ licensePlate: event.target.value });
    } else if (targetName == "drivers-license") {
      this.setState({ driversLicense: event.target.value });
    } else if (targetName == "vehicle-color") {
      this.setState({ vehicleColor: event.target.value });
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
      phoneNumber: this.state.phoneNumber,
      licensePlate: this.state.licensePlate,
      vehicleMakeModel: this.state.vehicleMakeModel,
      driversLicense: this.state.driversLicense,
      vehicleColor: this.state.vehicleColor
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
                    value={this.state.phoneNumber}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="drivers-license"
                    placeholder="Drivers License #"
                    value={this.state.driversLicense}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="license-plate-number"
                    placeholder="Vehicle License Plate #"
                    value={this.state.licensePlate}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="vehicle-make-model"
                    placeholder="Vehicle Make and Model"
                    value={this.state.vehicleMakeModel}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    name="vehicle-color"
                    placeholder="Vehicle Color"
                    value={this.state.vehicleColor}
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
