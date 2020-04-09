import React, { useState } from "react";
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import CloseAccountModal from "../../../modals/CloseAccountModal/CloseAccountModal";

import "./SettingsCloseAccount.css";
import "../SettingsAccountOverview/SettingsAccountOverview.css";

const SettingsCloseAccount = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [reason, setReason] = useState("Press to choose...");

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const dropdownButtonStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    color: reason === "Press to choose..." ? "#b1b1b1" : "black",
    borderWidth: "0.5px",
    boxShadow: "none",
    fontSize: "15px",
    height: "41px"
  };

  const mockData = [
    "Ride is full",
    "Location conflict",
    "Time conflict",
    "Other"
  ];

  return (
    <div className="settings-overview">
      <div className="settings-overview-toprow">
        <div className="settings-overview-title">Close My Account</div>
      </div>
      <div className="settings-close-big-text">
        Weren't able to solve a problem? We're here for you. Take a look at our
        tips:
      </div>
      <div className="settings-close-tips">
        <div className="settings-tip-item">
          <FontAwesomeIcon
            icon={faCircle}
            style={{ width: "7px", height: "7px", marginRight: "10px" }}
          />
          To resolve a technical issue, please{" "}
          <span className="blue-text">contact us</span>.
        </div>
        <div className="settings-tip-item">
          <FontAwesomeIcon
            icon={faCircle}
            style={{ width: "7px", height: "7px", marginRight: "10px" }}
          />
          To stop receiving emails, you can{" "}
          <span className="blue-text">edit your notifications</span>.
        </div>
        <div className="settings-tip-third">
          <FontAwesomeIcon
            icon={faCircle}
            style={{ width: "7px", height: "7px", marginRight: "10px" }}
          />
          To deal with a rating that you feel is unjustified, please{" "}
          <span className="blue-text">contact us</span>.
        </div>
        <div className="settings-tip-last">
          You will not be able to create a new account.
        </div>
      </div>
      <div className="settings-close-big-text2">
        Please tell us a bit more and help us improve our service.
      </div>
      <div className="settings-reason">
        <div className="settings-reason-text">Reason</div>
        <ButtonDropdown
          isOpen={dropdownOpen}
          toggle={toggle}
          style={{ width: "350px" }}
        >
          <DropdownToggle style={dropdownButtonStyle}>
            <div>{reason}</div>
          </DropdownToggle>
          <DropdownMenu>
            {mockData.map((reason, index) => (
              <div key={index} style={{ width: "350px" }}>
                <DropdownItem onClick={() => setReason(reason)}>
                  {reason}
                </DropdownItem>
                {index !== mockData.length - 1 && <DropdownItem divider />}
              </div>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
      </div>
      <div className="settings-improve">
        <div>What could we do to improve?</div>
        <textarea
          style={{
            height: "100px",
            width: "800px",
            marginTop: "15px",
            marginBottom: "30px",
            padding: "10px"
          }}
        />
      </div>
      <CloseAccountModal />
    </div>
  );
};

export default SettingsCloseAccount;
