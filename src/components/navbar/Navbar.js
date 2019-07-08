import React, { useState, useEffect } from "react";
import Sidebar from "react-sidebar";
import NavBarContent from "./NavbarContent";

const mobileView = window.matchMedia(`(min-width: 1000px)`);

const Navbar = ({ children }) => {
  useEffect(() => {
    mobileView.addListener(mediaQueryChanged);

    return function cleanup() {
      mobileView.removeListener(mediaQueryChanged);
    };
  });

  const [sidebarDocked, toggleSidebarDocked] = useState(mobileView.matches);
  const [sidebarOpen, toggleSidebarOpen] = useState(false);

  const onSetSidebarOpen = open => toggleSidebarOpen(open);

  const mediaQueryChanged = () => {
    toggleSidebarDocked(mobileView.matches);
    toggleSidebarOpen(false);
  };

  const styles = {
    sidebar: {
      background: "#339FFF",
      width: "240px",
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
      {children}
    </Sidebar>
  );
};

export default Navbar;
