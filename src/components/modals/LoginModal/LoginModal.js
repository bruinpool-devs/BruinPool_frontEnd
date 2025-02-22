import React, { useState, useContext } from "react";
import { Modal, ModalBody, Button, Form, FormGroup, Input } from "reactstrap";
import { withRouter } from "react-router-dom";

import MainContext from "../../../context/mainContext";

import LogoImage from "./logo.png";
import LogoTextImage from "./logo-text.png";

import "./LoginModal.css";

const LoginModal = ({ history, location }) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginValid, setLoginValid] = useState("");

  const mainContext = useContext(MainContext);
  const path = location.pathname;

  const toggle = () => setModal(!modal);

  const handleLogin = async () => {
    const atIndex = email.indexOf("@");
    const username = email.slice(0, atIndex);

    const response = await mainContext.login(username, email, password);

    if (!response) {
      setLoginValid("false");
    } else {
      setLoginValid("true");
      history.push("/rider");
    }
  };

  return (
    <div>
      <Button
        style={{
          background: "transparent",
          color: path === "/" ? "white" : "black",
          borderWidth: "0px",
          boxShadow: "none",
          width: "130px",
          height: "45px",
          fontSize: "18px",
          fontWeight: "bold",
        }}
        onClick={toggle}
      >
        Log in
      </Button>
      <Modal isOpen={modal} toggle={toggle} size="lg">
        <ModalBody>
          <div className="login-modal-wrapper">
            <div className="login-modal-title">
              <img
                src={LogoImage}
                alt="logo"
                style={{ width: "70px", height: "70px", marginRight: "-35px" }}
              />
              <img
                src={LogoTextImage}
                alt="logo-text"
                style={{ width: "250px", height: "250px" }}
              />
            </div>
            <div className="login-form">
              <Form>
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: "592px",
                      height: "60px",
                      fontSize: "15px",
                      borderColor: loginValid === "false" && "red",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleLogin();
                      }
                    }}
                  />
                  {loginValid === "false" && (
                    <div className="error-text">
                      Email or password may be incorrect.
                    </div>
                  )}
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      width: "592px",
                      height: "60px",
                      fontSize: "15px",
                      marginTop: "-15px",
                      borderColor: loginValid === "false" && "red",
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleLogin();
                      }
                    }}
                  />
                  {loginValid === "false" && (
                    <div className="error-text">
                      Email or password may be incorrect.
                    </div>
                  )}
                </FormGroup>
                <Button
                  onClick={handleLogin}
                  style={{
                    backgroundColor: "#3d77ff",
                    color: "white",
                    borderWidth: "0px",
                    boxShadow: "none",
                    width: "592px",
                    height: "46px",
                    fontSize: "20px",
                    borderRadius: "10px",
                    marginTop: "10px",
                  }}
                >
                  Log In
                </Button>
                <div className="signup-help">
                  Don't have a PoolUp account?{" "}
                  <span
                    className="signup-blue-text"
                    onClick={() => history.push("/signup/1")}
                  >
                    Sign up
                  </span>
                </div>
              </Form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(LoginModal);
