import React from "react";

import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill,
  faGlobeAmericas,
  faUsers
} from "@fortawesome/free-solid-svg-icons";

import "./DriverRegister.css";

const DriverRegister = ({ toggleRegistered }) => {
  const iconStyle = {
    color: "#3d77ff",
    width: "63px",
    height: "40px",
    marginLeft: "-5px",
    marginBottom: "10px"
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
            <Form>
              <FormGroup>
                <Input placeholder="Phone" style={{ marginBottom: "20px" }} />
              </FormGroup>
              <FormGroup>
                <Input
                  placeholder="Vehicle Model"
                  style={{ marginBottom: "30px" }}
                />
                <FormText
                  color="black"
                  style={{ fontSize: "10px", marginBottom: "40px" }}
                >
                  By proceeding, I agree to PoolUp's Terms of Use and
                  acknowledge that I have read the Privacy Policy.
                </FormText>
              </FormGroup>
              <Button
                style={{
                  backgroundColor: "#3d77ff",
                  boxShadow: "none",
                  borderWidth: "0px",
                  width: "145px",
                  height: "40px"
                }}
              >
                Start Driving
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
