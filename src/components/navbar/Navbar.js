import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import NavBarContent from "./NavbarContent";
import { Button } from "reactstrap";
import { faBars } from "@fortawesome/free-solid-svg-icons";
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
          <Button
            style={{
              width: "40px",
              height: "40px",
              margin: "5px 0px 0px 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
            color="primary"
            onClick={() => onSetSidebarOpen(true)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        )}
      </div>
      {children}
    </Sidebar>
  );
};

export default Navbar;
