import React from "react";

import "./SettingsAccountOverview.css";

const SettingsAccountOverview = () => {
  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Account Overview</div>
        <div className="settings-overview-edit">Edit</div>
      </div>
      <div className="settings-overview-info">
        <div className="settings-overview-info-left">
          <div className="settings-overview-left-text">First Name</div>
          <div className="settings-overview-left-text">Last Name</div>
          <div className="settings-overview-left-text">Password</div>
          <div className="settings-overview-left-text">Phone</div>
        </div>
        <div className="settings-overview-info-right">
          <div className="settings-overview-right-text">Michelle</div>
          <div className="settings-overview-right-text">Qin</div>
          <div className="settings-overview-right-text">Password</div>
          <div className="settings-overview-right-text">805-805-8050</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsAccountOverview;
