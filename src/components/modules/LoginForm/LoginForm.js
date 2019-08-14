import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input } from "reactstrap";

import MainContext from "../../../context/mainContext";

import "./LoginForm.css";

const LoginForm = ({ history, renderLoginForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mainContext = useContext(MainContext);

  const handleLogin = () => {
    mainContext.login(email, password);
  };

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
            Use your <span className="blue-text">login credentials</span> to
            access your account!
          </p>
        </div>
        <div className="form">
          <Form>
            <FormGroup
              style={{
                marginTop: "15px",
                width: "310px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="youruniversityemail"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <div style={{ fontSize: "20px", marginLeft: "5px" }}>
                @g.ucla.edu
              </div>
            </FormGroup>
            <FormGroup style={{ marginTop: "20px", width: "317px" }}>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </FormGroup>
            <div className="form-buttons">
              <Button
                onClick={handleLogin}
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
                <div style={{ marginTop: "-3px" }}>Sign In</div>
              </Button>
              <Button
                onClick={() => renderLoginForm(false)}
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
                <div style={{ marginTop: "-3px" }}>Go Back</div>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
