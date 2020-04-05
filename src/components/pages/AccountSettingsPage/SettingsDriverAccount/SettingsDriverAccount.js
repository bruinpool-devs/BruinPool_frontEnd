import React from "react";
import { Button } from "reactstrap";

import "./SettingsDriverAccount.css";
import "../SettingsAccountOverview/SettingsAccountOverview.css";

const SettingsDriverAccount = () => {
  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Driver Account</div>
        <div className="settings-overview-edit">Edit</div>
      </div>
      <div className="settings-overview-info">
        <div className="settings-overview-info-left">
          <div className="settings-overview-left-text">Vehicle Info</div>
          <div className="settings-overview-left-text">License Plate #</div>
          <div className="settings-overview-left-text">Driver License #</div>
          <div className="settings-overview-left-text">Vehicle Color</div>
        </div>
        <div className="settings-overview-info-right">
          <div className="settings-driver-right-text">Honda Accord</div>
          <div className="settings-driver-right-text">7XKF92</div>
          <div className="settings-driver-right-text">P7128472</div>
          <div className="settings-driver-right-text">Blue</div>
        </div>
      </div>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "220px",
          height: "43px",
          marginTop: "100px",
          backgroundColor: "#3d77ff",
          borderWidth: "0px",
          boxShadow: "none",
          borderRadius: "10px"
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsDriverAccount;
