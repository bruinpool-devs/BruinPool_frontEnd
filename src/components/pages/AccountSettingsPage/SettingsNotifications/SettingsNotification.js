import React, { useState } from "react";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import "./SettingsNotification.css";
import "../SettingsAccountOverview/SettingsAccountOverview.css";

const SettingsNotification = () => {
  const [editMode, toggleEditMode] = useState(false);
  const [messageEmail, setMessageEmail] = useState(false);
  const [messageText, setMessageText] = useState(true);
  const [promotionEmail, setPromotionEmail] = useState(false);
  const [promotionText, setPromotionText] = useState(false);
  const [policyEmail, setPolicyEmail] = useState(false);
  const [policyText, setPolicyText] = useState(false);
  const [supportEmail, setSupportEmail] = useState(false);
  const [supportText, setSupportText] = useState(false);
  const [subscribe, setSubscribe] = useState(false);

  const iconStyle1 = {
    marginTop: "32px",
    color: editMode ? "#3d77ff" : "gray",
    width: "20px",
    height: "20px",
    cursor: editMode && "pointer"
  };

  const iconStyle2 = {
    marginTop: "73px",
    color: editMode ? "#3d77ff" : "gray",
    width: "20px",
    height: "20px",
    cursor: editMode && "pointer"
  };

  const iconStyle3 = {
    marginTop: "90px",
    color: editMode ? "#3d77ff" : "gray",
    width: "20px",
    height: "20px",
    cursor: editMode && "pointer"
  };

  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Notifications</div>
        {!editMode && (
          <div
            className="settings-overview-edit"
            onClick={() => toggleEditMode(!editMode)}
          >
            Edit
          </div>
        )}
      </div>
      <div className="settings-noti-cols">
        <div className="settings-noti-left">
          <div className="settings-noti-left-item">
            <div className="settings-noti-left-title">Message</div>
            <div className="settings-noti-left-desc">
              Receive message from drivers and riders, including booking
              requests.
            </div>
          </div>
          <div className="settings-noti-left-item">
            <div className="settings-noti-left-title">Promotions and tips</div>
            <div className="settings-noti-left-desc">
              Receive coupons, promotions, surveys, product updates, and
              inspiration from PoolUp.
            </div>
          </div>
          <div className="settings-noti-left-item">
            <div className="settings-noti-left-title">Policy and community</div>
            <div className="settings-noti-left-desc">
              Receive updates about carpool regulations, stay informed about
              advocacy efforts to create fair, responsible carpool laws in your
              community.
            </div>
          </div>
          <div className="settings-noti-left-item">
            <div className="settings-noti-left-title">Account Support</div>
            <div className="settings-noti-left-desc">
              Receive messages about your account, your trips, legal
              notifications, security and privacy matters, and customer support
              requests. For your security, you cannot disable email
              notifications and we may contact you by phone or other means if
              needed.
            </div>
          </div>
          <div className="settings-noti-left-item">
            <div className="settings-noti-left-title">
              Unsubscribe from all marketing emails
            </div>
            <div className="settings-noti-left-desc">
              This includes recommendations, travel inspiration, deals, how
              PoolUp works, invites and referrals, surveys and research studies,
              carpool tips, and promotions.
            </div>
          </div>
        </div>
        <div className="settings-noti-middle">
          <div>Email</div>
          <FontAwesomeIcon
            icon={messageEmail ? faCheckSquare : faSquare}
            style={iconStyle1}
            onClick={() => {
              if (editMode) {
                setMessageEmail(!messageEmail);
              }
            }}
          />
          <FontAwesomeIcon
            icon={promotionEmail ? faCheckSquare : faSquare}
            style={iconStyle2}
            onClick={() => {
              if (editMode) {
                setPromotionEmail(!promotionEmail);
              }
            }}
          />
          <FontAwesomeIcon
            icon={policyEmail ? faCheckSquare : faSquare}
            style={iconStyle2}
            onClick={() => {
              if (editMode) {
                setPolicyEmail(!policyEmail);
              }
            }}
          />
          <FontAwesomeIcon
            icon={supportEmail ? faCheckSquare : faSquare}
            style={iconStyle3}
            onClick={() => {
              if (editMode) {
                setSupportEmail(!supportEmail);
              }
            }}
          />
          <div
            className="settings-unsubscribe"
            style={{ color: subscribe ? "#3d77ff" : "gray" }}
            onClick={() => {
              if (editMode) {
                setSubscribe(false);
              }
            }}
          >
            Unsubscribe
          </div>
          <div
            className="settings-subscribe"
            style={{ color: subscribe ? "gray" : "#3d77ff" }}
            onClick={() => {
              if (editMode) {
                setSubscribe(true);
              }
            }}
          >
            Subscribe
          </div>
        </div>
        <div className="settings-noti-right">
          <div>Text</div>
          <FontAwesomeIcon
            icon={messageText ? faCheckSquare : faSquare}
            style={iconStyle1}
            onClick={() => {
              if (editMode) {
                setMessageText(!messageText);
              }
            }}
          />
          <FontAwesomeIcon
            icon={promotionText ? faCheckSquare : faSquare}
            style={iconStyle2}
            onClick={() => {
              if (editMode) {
                setPromotionText(!promotionText);
              }
            }}
          />
          <FontAwesomeIcon
            icon={policyText ? faCheckSquare : faSquare}
            style={iconStyle2}
            onClick={() => {
              if (editMode) {
                setPolicyText(!policyText);
              }
            }}
          />
          <FontAwesomeIcon
            icon={supportText ? faCheckSquare : faSquare}
            style={iconStyle3}
            onClick={() => {
              if (editMode) {
                setSupportText(!supportText);
              }
            }}
          />
        </div>
      </div>
      {editMode && (
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "220px",
            height: "43px",
            marginTop: "20px",
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

export default SettingsNotification;
