import React from "react";
import { Button } from "reactstrap";

import "./SettingsPaymentMethod.css";

const SettingsPaymentMethod = () => {
  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Payment Method</div>
        <div className="settings-overview-edit">Edit</div>
      </div>
      <div className="settings-payment-navbar">
        <div className="settings-payment-active">PAYMENTS</div>
        <div className="settings-payment-non-active">PAYOUTS</div>
        <div className="settings-payment-non-active">TAXES</div>
      </div>
      <div className="settings-payment-info">
        <div className="settings-payment-info-title">Payment methods</div>
        <div>
          Add and manage your payment methods using our secure payment system.
        </div>
      </div>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "220px",
          height: "50px",
          marginTop: "30px",
          backgroundColor: "#128488",
          borderWidth: "0px",
          boxShadow: "none",
          borderRadius: "10px",
          fontWeight: "bold"
        }}
      >
        Add payment method
      </Button>
      <Button
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "220px",
          height: "43px",
          marginTop: "50px",
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

export default SettingsPaymentMethod;
