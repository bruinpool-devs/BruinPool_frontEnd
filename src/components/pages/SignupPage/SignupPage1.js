import React, { useState, useContext, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Input, Button, Form, FormGroup } from "reactstrap";
import Cookies from "universal-cookie";

import AltNavbar from "../../navbar/AltNavbar";
import MainContext from "../../../context/mainContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

import "./SignupPage.css";

const SignupPage1 = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (authToken) {
      history.push("/rider");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState("");
  const [emailFeedback, setEmailFeedback] = useState("");

  const mainContext = useContext(MainContext);

  const validateEmail = async () => {
    if (email === "") {
      setEmailValid("false");
      setEmailFeedback("Email should not be empty.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email)) {
      setEmailValid("false");
      setEmailFeedback("Email is not of proper format.");
      return;
    }

    const response = await mainContext.validateEmail(email);

    if (response === "true") {
      setEmailValid("true");
      setEmailFeedback("This email is available!");
      return true;
    } else {
      setEmailValid("false");
      setEmailFeedback("Email is already taken.");
      return false;
    }
  };

  const handleSignup = async () => {
    const emailresp = await validateEmail();

    if (emailresp) {
      const resp = await mainContext.sendVerificationEmail(email);

      if (resp === 200) {
        history.push({
          pathname: "/signup/2",
          state: { email: email }
        });
      }
    }
  };

  return (
    <div className="signup-page-wrapper">
      <AltNavbar />
      <div className="signup-form-wrapper">
        <div className="signup-progress-bar">
          <div className="signup-current-step">Verify School Email</div>
          <div className="signup-progress-divider">></div>
          <div>Finish Account Set Up</div>
          <div className="signup-progress-divider">></div>
          <div>Get Started</div>
        </div>
        <div className="signup1-title">Let's create an account.</div>
        <div className="signup1-subtitle">
          <div>Signing up for PoolUp is fast and free.</div>
          <div>PoolUp is securely designed for college students only.</div>
        </div>
        <div className="signup1-icon">
          <FontAwesomeIcon
            icon={faLock}
            style={{ width: "120px", height: "120px", marginTop: "50px" }}
          />
        </div>
        <div className="enter-school-email">Enter your school email (.edu)</div>
        <Form>
          <FormGroup>
            <Input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{
                width: "438px",
                height: "68px",
                marginTop: "10px",
                borderColor:
                  (emailValid === "true" && "green") ||
                  (emailValid === "false" && "red"),
                fontSize: "20px"
              }}
              onBlur={validateEmail}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSignup();
                }
              }}
            />
            {emailValid === "true" && (
              <div className="correct-text">{emailFeedback}</div>
            )}
            {emailValid === "false" && (
              <div className="error-text">{emailFeedback}</div>
            )}
          </FormGroup>
        </Form>
        <div className="signup-tos">
          By signing up for PoolUp, you agree with our{" "}
          <span className="tos-blue-text">Terms of Services</span> and{" "}
          <span className="tos-blue-text">Privacy Policy</span>.
        </div>
        <Button
          style={{
            backgroundColor: "#3d77ff",
            color: "white",
            borderWidth: "0px",
            boxShadow: "none",
            width: "438px",
            height: "53px",
            fontSize: "20px",
            marginTop: "15px",
            borderRadius: "10px"
          }}
          onClick={handleSignup}
        >
          Sign up
        </Button>
        <div className="signup-help">
          Already have a PoolUp account?{" "}
          <span className="signup-blue-text" onClick={() => history.push("/")}>
            Log in
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(SignupPage1);
