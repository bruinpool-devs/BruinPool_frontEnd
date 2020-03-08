import React, { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faGraduationCap,
  faPen
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../navbar/Navbar";
import MainContext from "../../../context/mainContext";

import "../RiderPage/RiderPage.css";
import "./ProfilePage.css";

const ProfilePage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    } else {
      handleFetchProfilePic();
      handleFetchReviews();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mainContext = useContext(MainContext);

  const fullStarStyle = {
    color: "#FFF61B",
    height: "18px",
    width: "18px"
  };

  const emptyStarStyle = {
    color: "#c4c4c4",
    height: "18px",
    width: "18px"
  };

  const fileInputRef = React.createRef();

  const handleFetchReviews = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");

    await mainContext.fetchReviews(userName, authToken);
  };

  const handleFetchProfilePic = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");

    await mainContext.fetchProfilePic(userName, authToken);
  };

  const onAddFile = async file => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.uploadProfilePic(file, authToken);

    await handleFetchProfilePic();
  };

  return (
    <div>
      <Navbar />
      <div className="rider-wrapper">
        <div className="rider-container">
          <div className="title-row">
            <div className="title">My Profile</div>
          </div>
          <div className="profile-wrapper">
            <div className="left-profile">
              <div className="profile-photo">
                <div className="profile-photo-img">
                  <img src={mainContext.profilePic} alt="bear" />
                </div>
                <div
                  className="edit-icon"
                  onClick={() => fileInputRef.current.click()}
                >
                  <FontAwesomeIcon icon={faPen} style={{ color: "#ffffff" }} />
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    onChange={e => onAddFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="profile-name">Joe Bruin</div>
              <div className="profile-school">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ marginTop: "-5px", height: "25px", width: "25px" }}
                />
                <div>UCLA</div>
              </div>
              <div className="profile-rating">
                <div className="profile-rating-text">Rating</div>
                <div className="profile-rating-stars">
                  <FontAwesomeIcon icon={faStar} style={fullStarStyle} />
                  <FontAwesomeIcon icon={faStar} style={fullStarStyle} />
                  <FontAwesomeIcon icon={faStar} style={fullStarStyle} />
                  <FontAwesomeIcon icon={faStar} style={fullStarStyle} />
                  <FontAwesomeIcon icon={faStar} style={emptyStarStyle} />
                </div>
                <div className="profile-rating-number">4.88</div>
              </div>
              <div className="profile-rating">
                <div className="profile-rating-text">Completed Rides:</div>
                <div className="profile-rating-number">50</div>
              </div>
              <div className="profile-rating">
                <div className="profile-rating-text">Cancelled Rides:</div>
                <div className="profile-rating-number">50</div>
              </div>
            </div>
            <div className="right-profile">
              <div className="right-profile-header">About</div>
              <div className="profile-about">
                Hi, I am a third year at UCLA studying Psychology. I am
                comfortable with pets on the ride as well! Feel free to reach
                out.
              </div>
              <div className="right-profile-header">Reviews</div>
              <div className="profile-reviews">
                {mainContext.reviews.map((data, index) => {
                  return (
                    <div key={index} className="review-card">
                      <div className="review-person">
                        <img
                          src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                          alt="bear"
                        />
                        <div className="review-person-name">
                          {data.revieweeUsername}
                        </div>
                      </div>
                      <div className="review-person-quote">
                        "{data.comment}"
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProfilePage);
