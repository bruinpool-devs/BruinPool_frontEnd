import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input, Form, FormGroup, FormFeedback } from "reactstrap";

import AltNavbar from "../../navbar/AltNavbar";

import "./SignupPage.css";

const SignupPage4 = ({ history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [firstNameValid, setFirstNameValid] = useState("");
  const [lastNameValid, setLastNameValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordConfirmValid, setPasswordConfirmValid] = useState("");

  const inputStyle = {
    width: "438px",
    height: "56px",
    fontSize: "15px",
    borderColor: "#B4B1B1"
  };

  const validateFirstName = () => {
    if (firstName === "") {
      setFirstNameValid("false");
    } else {
      setFirstNameValid("true");
    }
  };

  const validateLastName = () => {
    if (lastName === "") {
      setLastNameValid("false");
    } else {
      setLastNameValid("true");
    }
  };

  const validatePassword = () => {
    if (password === "") {
      setPasswordFeedback("Password should not be empty.");
      setPasswordValid("false");
      return;
    }

    if (password.length < 8) {
      setPasswordFeedback("Password must be at least 8 characters long.");
      setPasswordValid("false");
      return;
    }

    setPasswordValid("true");
  };

  const validatePasswordConfirm = () => {
    if (
      password === password2 &&
      password2 !== "" &&
      passwordValid === "true"
    ) {
      setPasswordConfirmValid("true");
    } else {
      setPasswordConfirmValid("false");
    }
  };

  const handleSubmit = () => {
    validateFirstName();
    validateLastName();
    validatePassword();
    validatePasswordConfirm();

    if (
      firstNameValid === "true" &&
      lastNameValid === "true" &&
      passwordValid === "true" &&
      passwordConfirmValid === "true"
    ) {
      history.push("/signup/5");
    }
  };

  return (
    <div className="signup-page-wrapper">
      <AltNavbar />
      <div className="signup-form-wrapper">
        <div className="signup-progress-bar">
          <div>Verify School Email</div>
          <div className="signup-progress-divider">></div>
          <div className="signup-current-step">Finish Account Set Up</div>
          <div className="signup-progress-divider">></div>
          <div>Get Started</div>
        </div>
        <div className="signup-account-info">
          <div className="account-info-title">Account Information</div>
          <div className="account-info-form">
            <Form>
              <FormGroup>
                <Input
                  valid={firstNameValid === "true"}
                  invalid={firstNameValid === "false"}
                  style={inputStyle}
                  placeholder="First name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  onBlur={validateFirstName}
                />
                <FormFeedback style={{ marginLeft: "2px" }} invalid="true">
                  First name should not be empty.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  valid={lastNameValid === "true"}
                  invalid={lastNameValid === "false"}
                  style={inputStyle}
                  placeholder="Last name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  onBlur={validateLastName}
                />
                <FormFeedback style={{ marginLeft: "2px" }} invalid="true">
                  Last name should not be empty.
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  valid={passwordValid === "true"}
                  invalid={passwordValid === "false"}
                  type="password"
                  style={inputStyle}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
                <FormFeedback style={{ marginLeft: "2px" }} invalid="true">
                  {passwordFeedback}
                </FormFeedback>
              </FormGroup>
              <FormGroup>
                <Input
                  valid={passwordConfirmValid === "true"}
                  invalid={passwordConfirmValid === "false"}
                  type="password"
                  style={inputStyle}
                  placeholder="Re-enter password"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  onBlur={validatePasswordConfirm}
                />
                <FormFeedback style={{ marginLeft: "2px" }} invalid="true">
                  Passwords are not matching.
                </FormFeedback>
              </FormGroup>
              <Button
                style={{
                  backgroundColor: "#3d77ff",
                  color: "white",
                  borderWidth: "0px",
                  boxShadow: "none",
                  width: "438px",
                  height: "53px",
                  fontSize: "20px",
                  marginTop: "25px",
                  borderRadius: "10px"
                }}
                onClick={handleSubmit}
              >
                Next
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignupPage4);
