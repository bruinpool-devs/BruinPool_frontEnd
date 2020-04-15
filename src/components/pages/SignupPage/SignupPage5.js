import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";

import Cookies from "universal-cookie";
import AltNavbar from "../../navbar/AltNavbar";
import MainContext from "../../../context/mainContext";

import "./SignupPage.css";

const SignupPage5 = ({ history }) => {
  const [shortBio, setShortBio] = useState("");
  const [bioValid, setBioValid] = useState("");

  useEffect(() => {
    handleFetchPicture();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);
  const fileInputRef = React.createRef();

  const handleFetchPicture = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const username = cookies.get("username");

    await mainContext.fetchProfilePic(username, authToken);
  }

  const handleUpdateBio = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    const resp = await mainContext.updateAboutMe(shortBio, authToken);

    return resp;
  }

  const validateBio = () => {
    if (shortBio.length < 10) {
      setBioValid("false");
    } else {
      setBioValid("true");
    }
  };

  const onAddFile = async file => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    const resp = await mainContext.uploadProfilePic(file, authToken);

    if (resp === 200) {
      await handleFetchPicture();
    }
  };

  const handleSubmit = async () => {
    validateBio();

    if (bioValid === "true") {
      const resp = await handleUpdateBio();

      if (resp === 200) {
        history.push("/signup/6");
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
        <div className="setup-profile-title">Set Up Your Profile</div>
        <img
          src={mainContext.profilePic}
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
              type="textarea"
              value={shortBio}
              placeholder="Tell your future drivers or riders about your major, interests, favorite trips..."
              onChange={e => setShortBio(e.target.value)}
              style={{
                height: "159px",
                width: "438px",
                padding: "10px 15px 10px 15px",
                fontSize: "15px",
                marginTop: "7px",
                borderColor:
                  (bioValid === "true" && "green") ||
                  (bioValid === "false" && "red")
              }}
              onBlur={validateBio}
            />
            {bioValid === "false" && (
              <div className="error-text">Character requirement not met.</div>
            )}
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
