import React, { useState } from "react";
import { Button, Input } from "reactstrap";

import "./SettingsDriverAccount.css";
import "../SettingsAccountOverview/SettingsAccountOverview.css";

const SettingsDriverAccount = () => {
  const [editMode, toggleEditMode] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState("Honda Accord");
  const [licensePlate, setLicensePlate] = useState("7XKF92");
  const [driverLicense, setDriverLicense] = useState("P7128472");
  const [vehicleColor, setVehicleColor] = useState("Blue");

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
        <div className="settings-overview-title">Driver Account</div>
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
          <div className="settings-overview-left-text">Vehicle Info</div>
          <div className="settings-overview-left-text">License Plate #</div>
          <div className="settings-overview-left-text">Driver License #</div>
          <div className="settings-overview-left-text">Vehicle Color</div>
        </div>
        {!editMode ? (
          <div className="settings-overview-info-right">
            <div className="settings-overview-right-text">{vehicleInfo}</div>
            <div className="settings-overview-right-text">{licensePlate}</div>
            <div className="settings-overview-right-text">{driverLicense}</div>
            <div className="settings-overview-right-text">{vehicleColor}</div>
          </div>
        ) : (
          <div className="settings-overview-info-right">
            <Input
              style={inputStyle}
              value={vehicleInfo}
              onChange={e => setVehicleInfo(e.target.value)}
            />
            <Input
              style={inputStyle}
              value={licensePlate}
              onChange={e => setLicensePlate(e.target.value)}
            />
            <Input
              style={inputStyle}
              value={driverLicense}
              onChange={e => setDriverLicense(e.target.value)}
            />
            <Input
              style={inputStyle}
              value={vehicleColor}
              onChange={e => setVehicleColor(e.target.value)}
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

export default SettingsDriverAccount;
