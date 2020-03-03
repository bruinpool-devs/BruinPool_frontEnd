import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import Navbar from "../../navbar/Navbar";

import "../RiderPage/RiderPage.css";
import "./ProfilePage.css";

const ProfilePage = ({ history }) => {
  useEffect(() => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    if (!authToken) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const mockReviews = [
    {
      name: "Michelle",
      review: "She was really kind but I wish I could eat in the car."
    },
    {
      name: "Laura",
      review: "Kind and accomodating."
    },
    {
      name: "Jared",
      review: "Friendly driver, conversationalist."
    }
  ];

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
                <img
                  src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                  alt="bear"
                />
              </div>
              <div className="profile-name">Joe Bruin</div>
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
                {mockReviews.map(data => {
                  return (
                    <div className="review-card">
                      <div className="review-person">
                        <img
                          src={process.env.PUBLIC_URL + "/images/bp_logo.svg"}
                          alt="bear"
                        />
                        <div className="review-person-name">{data.name}</div>
                      </div>
                      <div className="review-person-quote">"{data.review}"</div>
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
