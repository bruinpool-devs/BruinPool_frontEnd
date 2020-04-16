import React, { useState, useContext, useEffect } from "react";
import { Button, Input } from "reactstrap";
import Cookies from "universal-cookie";

import MainContext from "../../../../context/mainContext";

import "./SettingsAccountOverview.css";

const SettingsAccountOverview = () => {
  const [editMode, toggleEditMode] = useState(false);
  const [firstName, setFirstName] = useState("Michelle");
  const [lastName, setLastName] = useState("Qin");
  const [password, setPassword] = useState("12345678");
  const [phoneNumber, setPhoneNumber] = useState("805-805-8050");

  useEffect(() => {
    handleFetchPublicProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const handleFetchPublicProfile = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");

    await mainContext.fetchPublicProfile(userName, authToken);
  };

  const handleSave = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    // if (firstName !== mainContext.publicProfile.firstName || lastName !== mainContext.publicProfile.lastName) {
    //   await handleFetchPublicProfile();
    // }

    toggleEditMode(!editMode);
  };

  const inputStyle = {
    width: "557px",
    height: "25px",
    color: "#616161",
    borderLeft: "0px",
    borderTop: "0px",
    borderRight: "0px",
    borderRadius: "0px",
    boxShadow: "none"
  };

  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Account Overview</div>
        {!editMode && (
          <div
            className="settings-overview-edit"
            onClick={() => {
              setFirstName(mainContext.publicProfile.firstName);
              setLastName(mainContext.publicProfile.lastName);
              toggleEditMode(!editMode);
            }}
          >
            Edit
          </div>
        )}
      </div>
      <div className="settings-overview-info">
        <div className="settings-overview-info-left">
          <div className="settings-overview-left-text">First Name</div>
          <div className="settings-overview-left-text">Last Name</div>
          <div className="settings-overview-left-text">Password</div>
          <div className="settings-overview-left-text">Phone</div>
        </div>
        {!editMode ? (
          <div className="settings-overview-info-right">
            <div className="settings-overview-right-text">
              {mainContext.publicProfile.firstName}
            </div>
            <div className="settings-overview-right-text">
              {mainContext.publicProfile.lastName}
            </div>
            <div className="settings-overview-right-text">{password}</div>
            <div className="settings-overview-right-text">{phoneNumber}</div>
          </div>
        ) : (
          <div className="settings-overview-info-right">
            <Input
              style={inputStyle}
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <Input
              style={inputStyle}
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <Input
              style={inputStyle}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              style={inputStyle}
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </div>
        )}
      </div>
      {editMode && (
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "220px",
            height: "43px",
            marginTop: "80px",
            backgroundColor: "#3d77ff",
            borderWidth: "0px",
            boxShadow: "none",
            borderRadius: "10px"
          }}
          onClick={handleSave}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default SettingsAccountOverview;
