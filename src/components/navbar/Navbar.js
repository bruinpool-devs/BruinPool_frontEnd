import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import moment from "moment";

import MainContext from "../../context/mainContext";

import { UncontrolledPopover, PopoverHeader, PopoverBody } from "reactstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faBell } from "@fortawesome/free-regular-svg-icons";
import ReviewModal from "../modals/ReviewModal/ReviewModal";

import Paul from "../modals/ReviewModal/Paul.jpg";

import "./Navbar.css";

const Navbar = ({ history, location }) => {
  useEffect(() => {
    handleFetchNotification();
    handleFetchProfilePic();
    handleFetchIsDriver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [reviewModal, setReviewModal] = useState(false);
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [modalNoti, setModalNoti] = useState(null);

  const toggle = () => setIsOpenPopover(!isOpenPopover);

  const mainContext = useContext(MainContext);

  const handleFetchNotification = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.fetchNotification(authToken);
  };

  const handleViewNotification = async noti => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    return await mainContext.viewNotification(noti, authToken);
  };

  const handleFetchProfilePic = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");

    await mainContext.fetchProfilePic(userName, authToken);
  };

  const handleFetchIsDriver = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");

    await mainContext.checkIsDriver(authToken);
  };

  const path = location.pathname;

  return (
    <div>
      {path.substr(1, 4) === "ride" ? (
        <div className="navbar-container-rider">
          <div className="navbar-logo-rider">POOLUP</div>
          <div className="navbar-items-rider">
            <div
              className="non-active-item"
              onClick={() => {
                if (mainContext.isDriver) {
                  history.push("/driver/post");
                } else {
                  history.push("/driver/signup/1");
                }
              }}
            >
              Become a Driver
            </div>
            <div
              className={
                path === "/rider" ||
                path === "/ride/checkout" ||
                path === "/rider/request-ride" ||
                path === "/rider/instant-book" ||
                path === "/rider/instant-book/confirm" ||
                path === "/rider/request-ride-summary"
                  ? "active-item-rider"
                  : "non-active-item"
              }
              onClick={() => history.push("/rider")}
            >
              Ride
            </div>
            <div
              className={
                path === "/rider/my-rides"
                  ? "active-item-rider"
                  : "non-active-item"
              }
              onClick={() => history.push("/rider/my-rides")}
            >
              My Rides
            </div>
            <div
              className={
                path === "/rider/help" ? "active-item-rider" : "non-active-item"
              }
              onClick={() => history.push("/rider/help")}
            >
              Help
            </div>
            <div className="message-icon-rider">
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ width: "25px", height: "25px" }}
                id="RiderMessagePopover"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="RiderMessagePopover"
                hideArrow={true}
              >
                <PopoverHeader>Messages</PopoverHeader>
                <PopoverBody>
                  {mainContext.noti.map((msg, index) => (
                    <div key={index} className="single-message">
                      <div className="message-and-time">
                        <div className="bold-text">{msg.username}</div>
                        <div className="gray-text">
                          {moment(msg.date).fromNow()}
                        </div>
                      </div>
                      <div>{msg.msg}</div>
                    </div>
                  ))}
                  <div className="see-all-noti">
                    <div className="see-all-noti-text">See All</div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>
            <div className="notification-icon-rider">
              <FontAwesomeIcon
                icon={faBell}
                style={{ width: "25px", height: "25px" }}
                id="RiderNotificationPopover"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="RiderNotificationPopover"
                className="popover-container"
                hideArrow={true}
                isOpen={isOpenPopover}
                toggle={toggle}
              >
                <PopoverHeader>Notifications</PopoverHeader>
                <PopoverBody>
                  {mainContext.noti.map((noti, index) => (
                    <div
                      key={index}
                      className={
                        noti.viewed ? "single-noti-viewed" : "single-noti"
                      }
                      onClick={async () => {
                        if (!noti.redirectPath) {
                          if (!noti.viewed) {
                            const resp = await handleViewNotification(noti);

                            if (resp === 200) {
                              setModalNoti(noti);
                              setReviewModal(!reviewModal);
                              setIsOpenPopover(!isOpenPopover);
                            }
                          } else {
                            setModalNoti(noti);
                            setReviewModal(!reviewModal);
                            setIsOpenPopover(!isOpenPopover);
                          }
                        } else {
                          if (!noti.viewed) {
                            const resp = await handleViewNotification(noti);

                            if (resp === 200) {
                              history.push(noti.redirectPath);
                            }
                          } else {
                            history.push(noti.redirectPath);
                          }
                        }
                      }}
                    >
                      <div>
                        <img
                          src={Paul}
                          style={{ width: "35px", height: "35px" }}
                          alt="paul"
                        />
                      </div>
                      <div className="single-noti-msg">{noti.msg}</div>
                      <div className="gray-text">
                        {moment(noti.date)
                          .fromNow()
                          .replace("minutes", "min")}
                      </div>
                    </div>
                  ))}
                  <div className="see-all-noti">
                    <div className="see-all-noti-text">See All</div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
              {modalNoti && (
                <ReviewModal
                  isOpen={reviewModal}
                  toggleModal={setReviewModal}
                  noti={modalNoti}
                />
              )}
            </div>
            <div
              className={
                path === "/rider/profile"
                  ? "active-photo-rider"
                  : "non-active-photo"
              }
            >
              <img
                src={mainContext.profilePic}
                alt="bear"
                id="RiderProfilePopover"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom-end"
                target="RiderProfilePopover"
              >
                <PopoverBody>
                  <div
                    className="single-option"
                    onClick={() => history.push("/rider/profile")}
                  >
                    View My Profile
                  </div>
                  <div
                    className="single-option"
                    onClick={() => history.push("/rider/settings")}
                  >
                    Account Settings
                  </div>
                  <div
                    className="single-option-logout"
                    onClick={() => mainContext.logout()}
                  >
                    Log Out
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-container-driver">
          <div className="navbar-logo-driver">POOLUP</div>
          <div className="navbar-items-driver">
            <div
              className="non-active-item-bordered"
              onClick={() => history.push("/rider")}
            >
              Become a Rider
            </div>
            <div
              className={
                path === "/driver/signup/1" ||
                path === "/driver/signup/2" ||
                path === "/driver/post" ||
                path === "/driver/post-summary"
                  ? "active-item-driver"
                  : "non-active-item"
              }
              onClick={() => {
                if (mainContext.isDriver) {
                  history.push("/driver/post");
                } else {
                  history.push("/driver/signup/1");
                }
              }}
            >
              Drive
            </div>
            <div
              className={
                path === "/driver/my-drives"
                  ? "active-item-driver"
                  : "non-active-item"
              }
              onClick={() => history.push("/driver/my-drives")}
            >
              My Drives
            </div>
            <div
              className={
                path === "/driver/help"
                  ? "active-item-driver"
                  : "non-active-item"
              }
              onClick={() => history.push("/driver/help")}
            >
              Help
            </div>
            <div className="message-icon-driver">
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ width: "25px", height: "25px" }}
                id="DriverMessagePopover"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="DriverMessagePopover"
                hideArrow={true}
              >
                <PopoverHeader>Messages</PopoverHeader>
                <PopoverBody>
                  {mainContext.noti.map((msg, index) => (
                    <div key={index} className="single-message">
                      <div className="message-and-time">
                        <div className="bold-text">{msg.username}</div>
                        <div className="gray-text">
                          {moment(msg.date).fromNow()}
                        </div>
                      </div>
                      <div>{msg.msg}</div>
                    </div>
                  ))}
                  <div className="see-all-noti">
                    <div className="see-all-noti-text">See All</div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>
            <div className="notification-icon-driver">
              <FontAwesomeIcon
                icon={faBell}
                style={{ width: "25px", height: "25px" }}
                id="DriverNotificationPopover"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom"
                target="DriverNotificationPopover"
                className="popover-container"
                hideArrow={true}
                isOpen={isOpenPopover}
                toggle={toggle}
              >
                <PopoverHeader>Notifications</PopoverHeader>
                <PopoverBody>
                  {mainContext.noti.map((noti, index) => (
                    <div
                      key={index}
                      className={
                        noti.viewed ? "single-noti-viewed" : "single-noti"
                      }
                      onClick={async () => {
                        if (!noti.redirectPath) {
                          if (!noti.viewed) {
                            const resp = await handleViewNotification(noti);

                            if (resp === 200) {
                              setModalNoti(noti);
                              setReviewModal(!reviewModal);
                              setIsOpenPopover(!isOpenPopover);
                            }
                          } else {
                            setModalNoti(noti);
                            setReviewModal(!reviewModal);
                            setIsOpenPopover(!isOpenPopover);
                          }
                        } else {
                          if (!noti.viewed) {
                            const resp = await handleViewNotification(noti);

                            if (resp === 200) {
                              history.push(noti.redirectPath);
                            }
                          } else {
                            history.push(noti.redirectPath);
                          }
                        }
                      }}
                    >
                      <div>
                        <img
                          src={Paul}
                          style={{ width: "35px", height: "35px" }}
                          alt="paul"
                        />
                      </div>
                      <div className="single-noti-msg">{noti.msg}</div>
                      <div className="gray-text">
                        {moment(noti.date)
                          .fromNow()
                          .replace("minutes", "min")}
                      </div>
                    </div>
                  ))}
                  <div className="see-all-noti">
                    <div className="see-all-noti-text">See All</div>
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
              {modalNoti && (
                <ReviewModal
                  isOpen={reviewModal}
                  toggleModal={setReviewModal}
                  noti={modalNoti}
                />
              )}
            </div>
            <div
              className={
                path === "/driver/profile"
                  ? "active-photo-driver"
                  : "non-active-photo"
              }
            >
              <img
                src={mainContext.profilePic}
                alt="bear"
                id="DriverProfilePopover"
              />
              <UncontrolledPopover
                trigger="legacy"
                placement="bottom-end"
                target="DriverProfilePopover"
              >
                <PopoverBody>
                  <div
                    className="single-option"
                    onClick={() => history.push("/driver/profile")}
                  >
                    View My Profile
                  </div>
                  <div
                    className="single-option"
                    onClick={() => history.push("/driver/settings")}
                  >
                    Account Settings
                  </div>
                  <div
                    className="single-option-logout"
                    onClick={() => mainContext.logout()}
                  >
                    Log Out
                  </div>
                </PopoverBody>
              </UncontrolledPopover>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default withRouter(Navbar);
