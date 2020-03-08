import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import Navbar from "../../navbar/Navbar";
import DriverRegister from "../../modules/DriverRegister/DriverRegister";
import DriverPost from "../../modules/DriverPost/DriverPost";

import "./DriverPage.css";

const DriverPage = ({ history }) => {
  const [registered, toggleRegistered] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      //history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar />
      {registered ? (
        <DriverPost
          toggleRegistered={toggleRegistered}
          renderPostRideModal={true}
        />
      ) : (
        <DriverRegister toggleRegistered={toggleRegistered} />
      )}
    </div>
  );
};

export default withRouter(DriverPage);
