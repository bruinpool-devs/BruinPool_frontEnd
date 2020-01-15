import React from "react";
import "./PopupModal.css";

const Popup = ({ onClose, open, children }) => {
  const showHideClassName = open ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Popup;
