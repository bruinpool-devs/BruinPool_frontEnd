import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";

import "./SettingsNotification.css";
import "../SettingsAccountOverview/SettingsAccountOverview.css";

const SettingsNotification = () => {
  const iconStyle1 = {
    marginTop: "32px",
    color: "gray",
    width: "20px",
    height: "20px"
  };

  const iconStyle2 = {
    marginTop: "73px",
    color: "gray",
    width: "20px",
    height: "20px"
  };

  const iconStyle3 = {
    marginTop: "90px",
    color: "gray",
    width: "20px",
    height: "20px"
  };

  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Notifications</div>
        <div className="settings-overview-edit">Edit</div>
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
          <FontAwesomeIcon icon={faSquare} style={iconStyle1} />
          <FontAwesomeIcon icon={faSquare} style={iconStyle2} />
          <FontAwesomeIcon icon={faSquare} style={iconStyle2} />
          <FontAwesomeIcon icon={faSquare} style={iconStyle3} />
          <div className="settings-unsubscribe">Unsubscribe</div>
          <div className="settings-subscribe">Subscribe</div>
        </div>
        <div className="settings-noti-right">
          <div>Text</div>
          <FontAwesomeIcon icon={faCheckSquare} style={iconStyle1} />
          <FontAwesomeIcon icon={faSquare} style={iconStyle2} />
          <FontAwesomeIcon icon={faSquare} style={iconStyle2} />
          <FontAwesomeIcon icon={faSquare} style={iconStyle3} />
        </div>
      </div>
    </div>
  );
};

export default SettingsNotification;
