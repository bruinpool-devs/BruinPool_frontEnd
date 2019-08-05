import React, { useState } from "react";
import { Button, Modal, ModalBody } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-regular-svg-icons";

import Navbar from "../../navbar/Navbar";
import UpcomingDrives from "../../modules/UpcomingDrives/UpcomingDrives";
import DriveHistory from "../../modules/DriveHistory/DriveHistory";
import PostDriveModal from "../../modals/PostDriveModal/PostDriveModal";

import "./DriverPage.css";

const DriverPage = () => {
  const [modal, toggleModal] = useState(false);

  return (
    <div>
      <Navbar>
        <div className="driver-wrapper">
          <div className="driver-container">
            <Modal
              isOpen={modal}
              toggle={() => toggleModal(!modal)}
              modalTransition={{ timeout: 100 }}
              backdropTransition={{ timeout: 100 }}
              size="lg"
            >
              <ModalBody>
                <PostDriveModal />
              </ModalBody>
            </Modal>
            <div className="title-row">
              <div className="title">
                <h2>DRIVE</h2>
              </div>
              <div className="buttons">
                <div className="notification-button">
                  <Button
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#1D96EF",
                      borderWidth: "0px",
                      boxShadow: "none"
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ width: "22px", height: "22px" }}
                      icon={faBell}
                    />
                  </Button>
                </div>
                <div className="account-button">
                  <Button
                    style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#1D96EF",
                      borderWidth: "0px",
                      boxShadow: "none"
                    }}
                  >
                    <FontAwesomeIcon
                      style={{ width: "22px", height: "22px" }}
                      icon={faUser}
                    />
                  </Button>
                </div>
              </div>
            </div>
            <div className="new-drive-button">
              <Button
                onClick={() => {
                  toggleModal(!modal);
                }}
                style={{
                  backgroundColor: "#1D96EF",
                  color: "white",
                  fontWeight: "bold",
                  boxShadow: "none",
                  borderWidth: "0px",
                  fontSize: "21px",
                  letterSpacing: "1.5px",
                  height: "40px",
                  width: "180px",
                  borderRadius: "12px",
                  marginTop: "5px"
                }}
              >
                + NEW DRIVE
              </Button>
            </div>
            <UpcomingDrives />
            <DriveHistory />
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default DriverPage;
