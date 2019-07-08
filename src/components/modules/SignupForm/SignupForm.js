import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import "./SignupForm.css";

const SignupForm = () => {
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
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="youruniversityemail@address.com"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="mypassword"
              />
            </FormGroup>
            <FormGroup>
              <Label for="password-confirm">Password Confirmation</Label>
              <Input
                type="password"
                name="password-confirm"
                id="password-confirm"
                placeholder="mypassword"
              />
            </FormGroup>
            <FormGroup>
              <Label check style={{ "margin-left": "21px" }}>
                <Input type="checkbox" />
                Agree to{" "}
                <span className="terms-and-conditions">
                  Terms and Conditions
                </span>
              </Label>
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
