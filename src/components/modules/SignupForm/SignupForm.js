import React from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "./SignupForm.css";

const SignupForm = ({ history }) => {
  return (
    <div className="signup-wrapper">
      <div className="signup-form">
        <div className="header">
          <img
            src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
            alt="bear"
          />
          <h3>Sign in to start riding</h3>
          <p>
            Use your <span className="blue-text">university email</span> to
            create your account and start riding!
          </p>
        </div>
        <div className="form">
          <Form>
            <FormGroup style={{ marginTop: "20px", width: "317px" }}>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="youruniversityemail@address.com"
              />
            </FormGroup>
            <FormGroup style={{ marginTop: "25px", width: "317px" }}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup style={{ marginTop: "25px", width: "317px" }}>
              <Input
                type="password"
                name="password-confirm"
                id="password-confirm"
                placeholder="Password Confirmation"
              />
            </FormGroup>
            <FormGroup style={{ marginLeft: "21px", marginTop: "25px" }}>
              <Label check style={{ color: "#B2B2B2", fontSize: "15px" }}>
                <Input type="checkbox" />
                <div>
                  Agree to{" "}
                  <span className="terms-and-conditions">
                    Terms and Conditions
                  </span>
                </div>
              </Label>
            </FormGroup>
            <div className="form-buttons">
              <Button
                onClick={() => history.push("/rider")}
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  width: "150px",
                  height: "34px",
                  display: "flex",
                  borderRadius: "17px",
                  backgroundColor: "#1D96EF",
                  borderWidth: "0px",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  marginRight: "18px"
                }}
              >
                <div style={{ marginTop: "-3px" }}>Sign Up</div>
              </Button>
              <Button
                onClick={() => history.push("/rider")}
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  width: "150px",
                  height: "34px",
                  display: "flex",
                  borderRadius: "17px",
                  backgroundColor: "white",
                  color: "#A2A2A2",
                  borderWidth: "1px",
                  borderColor: "#B2B2B2",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center"
                }}
              >
                <div style={{ marginTop: "-3px" }}>Sign In</div>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignupForm);
