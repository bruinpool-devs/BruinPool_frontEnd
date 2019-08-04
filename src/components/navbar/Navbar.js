import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import NavBarContent from "./NavbarContent";
import { Button, Navbar as MobileBar } from "reactstrap";
import { faBars, faBell, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const mobileView = window.matchMedia(`(min-width: 950px)`);

const Navbar = ({ children }) => {
  useEffect(() => {
    mobileView.addListener(mediaQueryChanged);

    return function cleanup() {
      mobileView.removeListener(mediaQueryChanged);
    };
  });

  const [sidebarDocked, toggleSidebarDocked] = useState(mobileView.matches);
  const [sidebarOpen, toggleSidebarOpen] = useState(false);
  const [renderButton, doRenderButton] = useState(!mobileView.matches);

  const onSetSidebarOpen = open => toggleSidebarOpen(open);

  const mediaQueryChanged = () => {
    toggleSidebarDocked(mobileView.matches);
    toggleSidebarOpen(false);
    doRenderButton(!mobileView.matches);
  };

  const styles = {
    sidebar: {
      background: "#1D96EF",
      width: "288px",
      zIndex: "4"
    }
  };

  return (
    <Sidebar
      sidebar={<NavBarContent />}
      open={sidebarOpen}
      docked={sidebarDocked}
      onSetOpen={onSetSidebarOpen}
      styles={styles}
    >
      <div className="bars-container">
        {renderButton && (
          <MobileBar style={{ backgroundColor: "#1d96ef", height: "60px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginLeft: "-13px"
              }}
            >
              <Button
                style={{
                  width: "40px",
                  height: "40px",
                  margin: "5px 0px 5px 0px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#1d96ef",
                  borderWidth: "0px",
                  boxShadow: "none"
                }}
                onClick={() => onSetSidebarOpen(true)}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  style={{ width: "18px", height: "18px" }}
                />
              </Button>
              <h2
                style={{
                  color: "white",
                  margin: "0px 0px 0px 6px",
                  fontSize: "25px"
                }}
              >
                BRUINPOOL
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Button
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#1D96EF",
                  borderWidth: "0px",
                  boxShadow: "none",
                  marginRight: "8px"
                }}
              >
                <FontAwesomeIcon
                  style={{ width: "20px", height: "20px" }}
                  icon={faBell}
                />
              </Button>
              <Button
                style={{
                  width: "48px",
                  height: "48px",
                  backgroundColor: "#1D96EF",
                  borderWidth: "0px",
                  boxShadow: "none",
                  marginRight: "2px"
                }}
              >
                <FontAwesomeIcon
                  style={{ width: "20px", height: "20px" }}
                  icon={faUser}
                />
              </Button>
            </div>
          </MobileBar>
        )}
      </div>
      {children}
    </Sidebar>
  );
};

export default Navbar;
