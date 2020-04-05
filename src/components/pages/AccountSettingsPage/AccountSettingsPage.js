import React, { useState } from "react";
import Navbar from "../../navbar/Navbar";

import SettingsAccountOverview from "./SettingsAccountOverview/SettingsAccountOverview";
import SettingsDriverAccount from "./SettingsDriverAccount/SettingsDriverAccount";
import SettingsPaymentMethod from "./SettingsPaymentMethod/SettingsPaymentMethod";
import SettingsNotifications from "./SettingsNotifications/SettingsNotification";
import SettingsCloseAccount from "./SettingsCloseAccount/SettingsCloseAccount";

import "./AccountSettingsPage.css";

const AccountSettingsPage = () => {
  const [accountOverview, setAccountOverview] = useState(true);
  const [driverAccount, setDriverAccount] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [notifications, setNotifications] = useState(false);
  const [closeAccount, setCloseAccount] = useState(false);

  const toggleNavbar = target => {
    target === 1 ? setAccountOverview(true) : setAccountOverview(false);
    target === 2 ? setDriverAccount(true) : setDriverAccount(false);
    target === 3 ? setPaymentMethod(true) : setPaymentMethod(false);
    target === 4 ? setNotifications(true) : setNotifications(false);
    target === 5 ? setCloseAccount(true) : setCloseAccount(false);
  };

  return (
    <div>
      <Navbar />
      <div className="settings-container">
        <div className="settings-title">Account Settings</div>
        <div className="settings-wrapper">
          <div className="settings-left">
            <div
              className={
                accountOverview ? "settings-active" : "settings-non-active"
              }
              onClick={() => toggleNavbar(1)}
            >
              Account Overview
            </div>
            <div
              className={
                driverAccount ? "settings-active" : "settings-non-active"
              }
              onClick={() => toggleNavbar(2)}
            >
              Driver Account
            </div>
            <div
              className={
                paymentMethod ? "settings-active" : "settings-non-active"
              }
              onClick={() => toggleNavbar(3)}
            >
              Payment Method
            </div>
            <div
              className={
                notifications ? "settings-active" : "settings-non-active"
              }
              onClick={() => toggleNavbar(4)}
            >
              Notifications
            </div>
            <div
              className={
                closeAccount ? "settings-active" : "settings-non-active"
              }
              onClick={() => toggleNavbar(5)}
            >
              Close My Account
            </div>
          </div>
          <div className="settings-right">
            {accountOverview && <SettingsAccountOverview />}
            {driverAccount && <SettingsDriverAccount />}
            {paymentMethod && <SettingsPaymentMethod />}
            {notifications && <SettingsNotifications />}
            {closeAccount && <SettingsCloseAccount />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
