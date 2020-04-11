import React, { useState } from "react";
import { Button, Input } from "reactstrap";

import "./SettingsAccountOverview.css";

const SettingsAccountOverview = () => {
  const [editMode, toggleEditMode] = useState(false);
  const [firstName, setFirstName] = useState("Michelle");
  const [lastName, setLastName] = useState("Qin");
  const [password, setPassword] = useState("12345678");
  const [phoneNumber, setPhoneNumber] = useState("805-805-8050");

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
            onClick={() => toggleEditMode(!editMode)}
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
            <div className="settings-overview-right-text">{firstName}</div>
            <div className="settings-overview-right-text">{lastName}</div>
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
          onClick={() => toggleEditMode(!editMode)}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default SettingsAccountOverview;
