import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import {
  faStar,
  faStarHalfAlt,
  faGraduationCap,
  faPen
} from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../navbar/Navbar";
import MainContext from "../../../context/mainContext";

import "../RiderPage/RiderPage.css";
import "./ProfilePage.css";

const ProfilePage = ({ history }) => {
  const [editMode, toggleEditMode] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [starRatings, setStarRatings] = useState([]);

  const mainContext = useContext(MainContext);

  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    } else {
      handleFetchProfilePic();
      handleFetchReviews();
      handleFetchPublicProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const starStyle = {
    color: "#FFF61B",
    height: "20px",
    width: "20px",
    marginTop: "-1px"
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

  const handleFetchPublicProfile = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");

    const resp = await mainContext.fetchPublicProfile(userName, authToken);

    const fullStars = Math.floor(parseFloat(resp.rating));
    const halfStars = parseFloat(resp.rating) % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    var temp = [];

    for (var i = 0; i < fullStars; i++) {
      temp.push(1);
    }

    for (var j = 0; j < halfStars; j++) {
      temp.push(0.5);
    }

    for (var k = 0; k < emptyStars; k++) {
      temp.push(0);
    }

    setStarRatings(temp);
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
            {editMode ? (
              <div
                className="profile-edit"
                onClick={async () => {
                  const cookies = new Cookies();
                  const authToken = cookies.get("authToken");

                  if (aboutMe !== mainContext.publicProfile.aboutMe) {
                    await mainContext.updateAboutMe(aboutMe, authToken);
                    await handleFetchPublicProfile();
                  }

                  toggleEditMode(!editMode);
                }}
              >
                save
              </div>
            ) : (
              <div
                className="profile-edit"
                onClick={() => {
                  setAboutMe(mainContext.publicProfile.aboutMe);
                  toggleEditMode(!editMode);
                }}
              >
                edit
              </div>
            )}
          </div>
          <div className="profile-wrapper">
            <div className="left-profile">
              <div className="profile-photo">
                <div className="profile-photo-img">
                  <img src={mainContext.profilePic} alt="bear" />
                </div>
                {editMode && (
                  <div
                    className="edit-icon"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{ color: "#ffffff" }}
                    />
                    <input
                      ref={fileInputRef}
                      type="file"
                      style={{ display: "none" }}
                      onChange={e => onAddFile(e.target.files[0])}
                    />
                  </div>
                )}
              </div>
              <div className="profile-name">
                {mainContext.publicProfile.name}
              </div>
              <div className="profile-school">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  style={{ marginTop: "-5px", height: "25px", width: "25px" }}
                />
                <div>
                  {mainContext.publicProfile.school
                    ? mainContext.publicProfile.school
                    : "UCLA"}
                </div>
              </div>
              <div className="profile-rating">
                <div className="profile-rating-text">Rating</div>
                <div className="profile-rating-stars">
                  {starRatings.map((rating, index) => {
                    switch (rating) {
                      case 1:
                        return (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStar}
                            style={starStyle}
                          />
                        );
                      case 0.5:
                        return (
                          <FontAwesomeIcon
                            key={index}
                            icon={faStarHalfAlt}
                            style={starStyle}
                          />
                        );
                      default:
                        return (
                          <FontAwesomeIcon
                            key={index}
                            icon={emptyStar}
                            style={starStyle}
                          />
                        );
                    }
                  })}
                </div>
                <div className="profile-rating-number">
                  {mainContext.publicProfile.rating}
                </div>
              </div>
              <div className="profile-rating">
                <div className="profile-rating-text">Completed Rides:</div>
                <div className="profile-rating-number">
                  {mainContext.publicProfile.ridesCompleted}
                </div>
              </div>
              <div className="profile-rating">
                <div className="profile-rating-text">Cancelled Rides:</div>
                <div className="profile-rating-number">
                  {mainContext.publicProfile.ridesCancelled}
                </div>
              </div>
            </div>
            <div className="right-profile">
              <div className="right-profile-header">About</div>
              {editMode ? (
                <textarea
                  value={aboutMe}
                  placeholder="Say something about yourself..."
                  onChange={e => setAboutMe(e.target.value)}
                  style={{
                    height: "100px",
                    marginTop: "15px",
                    marginBottom: "30px",
                    padding: "10px"
                  }}
                />
              ) : (
                <div className="profile-about">
                  {mainContext.publicProfile.aboutMe
                    ? mainContext.publicProfile.aboutMe
                    : "Say something about yourself..."}
                </div>
              )}
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
