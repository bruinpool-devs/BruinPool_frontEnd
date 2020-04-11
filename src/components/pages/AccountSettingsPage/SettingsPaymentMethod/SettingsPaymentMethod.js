import React, { useState } from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCcVisa, faCcMastercard } from "@fortawesome/free-brands-svg-icons";

import "./SettingsPaymentMethod.css";

const SettingsPaymentMethod = () => {
  const [editMode, toggleEditMode] = useState(false);

  const mockCardData = [
    {
      type: "Visa",
      lastDigits: "8880",
      default: true,
      expiration: "05/2024"
    },
    {
      type: "Mastercard",
      lastDigits: "0148",
      default: false,
      expiration: "11/2023"
    }
  ];

  const iconStyle = {
    width: "45px",
    height: "45px"
  };

  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Payment Method</div>
        {!editMode && (
          <div
            className="settings-overview-edit"
            onClick={() => toggleEditMode(!editMode)}
          >
            Edit
          </div>
        )}
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
        <div className="saved-payment-methods">
          {mockCardData.map((card, index) => (
            <div className="each-payment-method" key={index}>
              <div className="payment-method-left">
                <div className="payment-type">
                  {card.type === "Visa" && (
                    <FontAwesomeIcon icon={faCcVisa} style={iconStyle} />
                  )}
                  {card.type === "Mastercard" && (
                    <FontAwesomeIcon icon={faCcMastercard} style={iconStyle} />
                  )}
                </div>
                <div className="payment-info">
                  <div className="payment-number">
                    {card.type} ···· {card.lastDigits}
                  </div>
                  <div className="payment-expiration">
                    Expiration: {card.expiration}
                  </div>
                </div>
              </div>
              <div className="payment-method-right">···</div>
            </div>
          ))}
        </div>
      </div>
      {editMode && (
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
      )}
      {editMode && (
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
          onClick={() => toggleEditMode(!editMode)}
        >
          Save
        </Button>
      )}
    </div>
  );
};

export default SettingsPaymentMethod;
