import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  FormFeedback,
  FormText
} from "reactstrap";

import AltNavbar from "../../navbar/AltNavbar";

import "./SignupPage.css";

const SignupPage5 = ({ history }) => {
  const [shortBio, setShortBio] = useState("");
  const [bioValid, setBioValid] = useState("");

  const fileInputRef = React.createRef();

  const validateBio = () => {
    if (shortBio.length < 10) {
      setBioValid("false");
    } else {
      setBioValid("true");
    }
  };

  const onAddFile = async file => {
    console.log(file);
  };

  const handleSubmit = () => {
    validateBio();

    if (bioValid === "true") {
      history.push("/signup/6");
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
        <div className="setup-profile-title">Set Up Your Profile</div>
        <img
          src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
          alt="bear"
          style={{ height: "200px", width: "200px", marginTop: "20px" }}
        />
        <Button
          style={{
            backgroundColor: "white",
            color: "#3D77FF",
            borderColor: "#3D77FF",
            boxShadow: "none",
            width: "193px",
            height: "32px",
            fontSize: "14px",
            marginTop: "15px",
            borderRadius: "5px"
          }}
          onClick={() => fileInputRef.current.click()}
        >
          <div>Upload Profile Picture*</div>
          <input
            ref={fileInputRef}
            type="file"
            style={{ display: "none" }}
            onChange={e => onAddFile(e.target.files[0])}
          />
        </Button>
        <div className="short-bio-desc">
          Add a short bio to tell people more about yourself.
        </div>
        <Form>
          <FormGroup>
            <Input
              invalid={bioValid === "false"}
              type="textarea"
              value={shortBio}
              placeholder="Tell your future drivers or riders about your major, interests, favorite trips..."
              onChange={e => setShortBio(e.target.value)}
              style={{
                height: "159px",
                width: "438px",
                padding: "10px 15px 10px 15px",
                fontSize: "15px",
                marginTop: "7px"
              }}
            />
            <FormFeedback style={{ marginLeft: "2px" }} invalid="true">
              Character requirement not met.
            </FormFeedback>
            <FormText>(Min. 10 characters)</FormText>
          </FormGroup>
        </Form>
        <Button
          style={{
            backgroundColor: "#3d77ff",
            color: "white",
            borderWidth: "0px",
            boxShadow: "none",
            width: "438px",
            height: "53px",
            fontSize: "20px",
            marginTop: "10px",
            borderRadius: "10px"
          }}
          onClick={handleSubmit}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default withRouter(SignupPage5);
