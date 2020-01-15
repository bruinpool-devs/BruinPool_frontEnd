import React from "react";
import "./PopupModal.css";

const Popup = ({ onClose, open, children }) => {
  const showHideClassName = open ? "modal display-block" : "modal display-none";
  console.log(open);
  console.log(showHideClassName);
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <a className="close" onClick={onClose}>
          &times;
        </a>

        {children}
      </section>
    </div>
  );
};

export default Popup;
