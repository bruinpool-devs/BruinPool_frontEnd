import React, { useState } from "react";

import Navbar from "../../navbar/Navbar";
import DriverRegister from "../../modules/DriverRegister/DriverRegister";
import DriverPost from "../../modules/DriverPost/DriverPost";

import "./DriverPage.css";

const DriverPage = () => {
  const [registered, toggleRegistered] = useState(false);

  return (
    <div>
      <Navbar />
      {registered ? (
        <DriverPost toggleRegistered={toggleRegistered} />
      ) : (
        <DriverRegister toggleRegistered={toggleRegistered} />
      )}
    </div>
  );
};

export default DriverPage;
