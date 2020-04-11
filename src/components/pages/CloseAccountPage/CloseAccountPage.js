import React, { useContext, useEffect } from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import Cookies from "universal-cookie";
import AltNavbar from "../../navbar/AltNavbar";
import MainContext from "../../../context/mainContext";

import "./CloseAccountPage.css";

const CloseAccountPage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  return (
    <div className="signup-page-wrapper">
      <AltNavbar />
      <div className="signup-form-wrapper">
        <div className="close-account-title">Your Account is Closed.</div>
        <div className="close-account-text">
          <div>
            Your account will be deactivated for 14 days prior to deletion.
          </div>
          <div>
            Login anytime in the next 14 days to re-activate your account.
          </div>
        </div>
        <Button
          style={{
            backgroundColor: "#3d77ff",
            borderWidth: "0px",
            color: "white",
            boxShadow: "none",
            width: "161px",
            height: "51px",
            borderRadius: "10px",
            fontSize: "20px",
            marginTop: "80px"
          }}
          onClick={() => mainContext.logout()}
        >
          Done
        </Button>
      </div>
    </div>
  );
};

export default withRouter(CloseAccountPage);
