import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Button, Modal, ModalBody } from "reactstrap";

import MainContext from "../../../context/mainContext";
import Cookies from "universal-cookie";

import "./PostRideModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faLongArrowAltRight,
  faCalendarAlt,
  faClock,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

const PostRideModal = ({
  isOpen,
  toggleModal,
  from,
  to,
  date,
  time,
  price,
  seats,
  specificPickup,
  specificDropoff,
  driverNote,
  specificOnly,
  noPet,
  oneCarryOn,
  oneLuggage,
  instantBook,
  history
}) => {
  const mainContext = useContext(MainContext);

  const handlePostRide = async () => {
    const cookies = new Cookies();
    const authToken = cookies.get("authToken");
    const userName = cookies.get("userName");
    const dateString = `${date}T${time}:00.000Z`;

    const rideObject = {
      ownerEmail: userName + "@g.ucla.edu",
      ownerUsername: userName,
      from: from,
      to: to,
      date: dateString,
      price: `${price}`,
      seats: seats,
      detail: driverNote,
      passengers: []
    };

    await mainContext.postRide(rideObject, authToken);

    history.push({
      pathname: "/driver/post-summary",
      state: {
        from: from,
        to: to,
        date: date,
        time: time,
        specificDropoff: specificDropoff,
        specificPickup: specificPickup,
        driverNote: driverNote,
        specificOnly: specificOnly,
        noPet: noPet,
        oneCarryOn: oneCarryOn,
        oneLuggage: oneLuggage,
        instantBook: instantBook
      }
    });
  };

  return (
    <div>
      <Modal
        size="lg"
        style={{ maxWidth: "1600px", width: "40%" }}
        className="modal-font"
        isOpen={isOpen}
        toggle={() => toggleModal(!isOpen)}
      >
        <ModalBody className="bodyFrame">
          <div className="bodyTitle">Is the ride information correct?</div>
          <div className="rideInfoCard">
            <div className="cardLine">
              {instantBook ? (
                <div className="instant-allowed-flexrow">
                  {from}
                  <FontAwesomeIcon
                    icon={faLongArrowAltRight}
                    style={{ marginLeft: "30px", marginRight: "30px" }}
                  />
                  {to}
                  <div className="instant-allowed-sign">
                    Instant Book Allowed
                  </div>
                </div>
              ) : (
                <div>
                  {from}
                  <FontAwesomeIcon
                    icon={faLongArrowAltRight}
                    style={{ marginLeft: "30px", marginRight: "30px" }}
                  />
                  {to}
                </div>
              )}
            </div>
            <div className="cardLine">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                style={{ marginLeft: "0px", marginRight: "10px" }}
              />
              {date}
              <FontAwesomeIcon
                icon={faClock}
                style={{ marginLeft: "40px", marginRight: "10px" }}
              />
              {time}
            </div>
            <div className="cardLine">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginLeft: "0px", marginRight: "10px" }}
              />
              Pickup: {specificPickup}
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                style={{ marginLeft: "30px", marginRight: "10px" }}
              />
              Dropoff: {specificDropoff}
            </div>
            <div className="cardLine">
              {instantBook ? (
                <div>
                  <div>Instant Book Requirements:</div>
                  <div>
                    {specificOnly ? (
                      <div className="instant-book-criteria">
                        <FontAwesomeIcon
                          className="icon-check-circle"
                          icon={faCheckCircle}
                        ></FontAwesomeIcon>
                        Specific pick off and drop off only
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div>
                    {noPet ? (
                      <div className="instant-book-criteria">
                        <FontAwesomeIcon
                          className="icon-check-circle"
                          icon={faCheckCircle}
                        ></FontAwesomeIcon>
                        No pets on ride
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div>
                    {oneCarryOn ? (
                      <div className="instant-book-criteria">
                        <FontAwesomeIcon
                          className="icon-check-circle"
                          icon={faCheckCircle}
                        ></FontAwesomeIcon>
                        One carry-on only
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  <div>
                    {oneLuggage ? (
                      <div className="instant-book-criteria">
                        <FontAwesomeIcon
                          className="icon-check-circle"
                          icon={faCheckCircle}
                        ></FontAwesomeIcon>
                        One luggage only
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>

            <div className="cardLine">
              <div> Driver's Note </div>
              <div> {driverNote} </div>
            </div>
          </div>
        </ModalBody>

        <ModalBody className="footerCss">
          <Button
            className="go-back-button"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#3D77FF",
              borderWidth: "1px",
              borderColor: "#3D77FF",
              boxShadow: "none",
              fontSize: "1vw",
              marginRight: "2vw",
              width: "120px",
              padding: "10px",
              fontWeight: "bold"
            }}
            onClick={() => toggleModal(!isOpen)}
          >
            {" "}
            Go Back{" "}
          </Button>
          <Button
            className="cancel-ride-button"
            style={{
              borderColor: "#3D77FF",
              backgroundColor: "#3D77FF",
              color: "white",
              boxShadow: "none",
              fontSize: "1vw",
              width: "120px",
              padding: "10px",
              fontWeight: "bold"
            }}
            onClick={() => handlePostRide()}
          >
            Confirm
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default withRouter(PostRideModal);
