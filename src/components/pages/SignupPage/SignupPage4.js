import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Button, Input, Form, FormGroup } from "reactstrap";

import AltNavbar from "../../navbar/AltNavbar";
import MainContext from "../../../context/mainContext";

import "./SignupPage.css";

const SignupPage4 = ({ history, location }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const [firstNameValid, setFirstNameValid] = useState("");
  const [lastNameValid, setLastNameValid] = useState("");
  const [passwordValid, setPasswordValid] = useState("");
  const [passwordFeedback, setPasswordFeedback] = useState("");
  const [passwordConfirmValid, setPasswordConfirmValid] = useState("");

  const mainContext = useContext(MainContext);

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

  const handleSubmit = async () => {
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
      const resp = await mainContext.signup(
        location.state.email,
        firstName,
        lastName,
        password
      );

      if (resp === 200 || resp === 201) {
        history.push("/signup/5");
      }
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
                  style={{
                    width: "438px",
                    height: "56px",
                    fontSize: "15px",
                    borderColor:
                      (firstNameValid === "true" && "green") ||
                      (firstNameValid === "false" && "red")
                  }}
                  placeholder="First name"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  onBlur={validateFirstName}
                />
                {firstNameValid === "false" && (
                  <div className="error-text">
                    First name should not be empty.
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  style={{
                    width: "438px",
                    height: "56px",
                    fontSize: "15px",
                    borderColor:
                      (lastNameValid === "true" && "green") ||
                      (lastNameValid === "false" && "red")
                  }}
                  placeholder="Last name"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  onBlur={validateLastName}
                />
                {lastNameValid === "false" && (
                  <div className="error-text">
                    Last name should not be empty.
                  </div>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  style={{
                    width: "438px",
                    height: "56px",
                    fontSize: "15px",
                    borderColor:
                      (passwordValid === "true" && "green") ||
                      (passwordValid === "false" && "red")
                  }}
                  placeholder="Enter password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onBlur={validatePassword}
                />
                {passwordValid === "false" && (
                  <div className="error-text">{passwordFeedback}</div>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  style={{
                    width: "438px",
                    height: "56px",
                    fontSize: "15px",
                    borderColor:
                      (passwordConfirmValid === "true" && "green") ||
                      (passwordConfirmValid === "false" && "red")
                  }}
                  placeholder="Re-enter password"
                  value={password2}
                  onChange={e => setPassword2(e.target.value)}
                  onBlur={validatePasswordConfirm}
                />
                {passwordConfirmValid === "false" && (
                  <div className="error-text">Passwords are not matching.</div>
                )}
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
