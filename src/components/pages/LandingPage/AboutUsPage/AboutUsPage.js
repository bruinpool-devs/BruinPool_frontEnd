import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import LandingNavbar from "../../../navbar/LandingNavbar";
import Footer from "../../../footer/Footer";

import AboutUsHeader from "./assets/about_us_header.png";
import BookFirstRide from "../assets/book_first_ride.png";

import Paul from "./assets/Paul.jpg";
import Erick from "./assets/Erick.jpg";
import Han from "./assets/Han.jpg";
import Jared from "./assets/Jared.jpg";
import Justin from "./assets/Justin.jpg";
import Michael from "./assets/Michael.jpg";
import Michelle from "./assets/Michelle.jpg";
import Parker from "./assets/Parker.jpg";
import Wenrui from "./assets/Wenrui.jpg";
import Yoon from "./assets/Yoon.jpg";

import "./AboutUsPage.css";

const AboutUsPage = ({ history }) => {
  return (
    <div className="about-us-wrapper">
      <LandingNavbar />
      <img src={AboutUsHeader} alt="header" style={aboutUsStyle} />
      <div className="about-us-pics">
        <div className="about-us-title">Team</div>
        <div className="about-us-first-row">
          <div className="each-member">
            <img
              src={Michael}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Michael,
                    name: "Michael Chong",
                    title: "Co-Founder & CEO",
                  },
                })
              }
            />
            <div className="member-name">Michael Chong</div>
            <div className="member-title">Co-Founder, CEO</div>
          </div>
          <div className="each-member">
            <img
              src={Han}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Han,
                    name: "Han Lee",
                    title: "Co-Founder & Back-end Lead",
                  },
                })
              }
            />
            <div className="member-name">Han Lee</div>
            <div className="member-title">Co-Founder, Back-end Lead</div>
          </div>
          <div className="each-member">
            <img
              src={Justin}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Justin,
                    name: "Justin Han",
                    title: "Co-Founder & Front-end Lead",
                  },
                })
              }
            />
            <div className="member-name">Justin Han</div>
            <div className="member-title">Co-Founder, Front-end Lead</div>
          </div>
          <div className="each-member">
            <img
              src={Yoon}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Yoon,
                    name: "Yoon Park",
                    title: "Co-Founder & Design Director",
                  },
                })
              }
            />
            <div className="member-name">Yoon Park</div>
            <div className="member-title">Co-Founder, Design Director</div>
          </div>
        </div>
        <div className="about-us-second-row">
          <div className="each-member">
            <img
              src={Erick}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Erick,
                    name: "Erick Suarez",
                    title: "Back-end Developer",
                  },
                })
              }
            />
            <div className="member-name">Erick Suarez</div>
            <div className="member-title">Back-end Developer</div>
          </div>
          <div className="each-member">
            <img
              src={Paul}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Paul,
                    name: "Evan Lin",
                    title: "Back-end Developer",
                  },
                })
              }
            />
            <div className="member-name">Evan Lin</div>
            <div className="member-title">Back-end Developer</div>
          </div>
          <div className="each-member">
            <img
              src={Jared}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Jared,
                    name: "Jared Fitton",
                    title: "Back-end Developer",
                  },
                })
              }
            />
            <div className="member-name">Jared Fitton</div>
            <div className="member-title">Back-end Developer</div>
          </div>
          <div className="each-member">
            <img
              src={Parker}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Parker,
                    name: "Parker Glenn",
                    title: "Back-end Developer",
                  },
                })
              }
            />
            <div className="member-name">Parker Glenn</div>
            <div className="member-title">Back-end Developer</div>
          </div>
        </div>
        <div className="about-us-third-row">
          <div className="each-member">
            <img
              src={Paul}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Paul,
                    name: "Paul Choi",
                    title: "Front-end Developer",
                  },
                })
              }
            />
            <div className="member-name">Paul Choi</div>
            <div className="member-title">Front-end Developer</div>
          </div>
          <div className="each-member">
            <img
              src={Wenrui}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Wenrui,
                    name: "Wenrui Zhang",
                    title: "UI/UX Designer",
                  },
                })
              }
            />
            <div className="member-name">Wenrui Zhang</div>
            <div className="member-title">UI/UX Designer</div>
          </div>
          <div className="each-member">
            <img
              src={Michelle}
              alt="member"
              onClick={() =>
                history.push({
                  pathname: "/about-us/detail",
                  state: {
                    img: Michelle,
                    name: "Michelle Qin",
                    title: "UI/UX Designer",
                  },
                })
              }
            />
            <div className="member-name">Michelle Qin</div>
            <div className="member-title">UI/UX Designer</div>
          </div>
        </div>
      </div>
      <div style={firstRideStyle}>
        <Button
          onClick={() => history.push("/signup/1")}
          style={GetStartedButton}
        >
          Get Started
        </Button>
      </div>
      <Footer />
    </div>
  );
};

const GetStartedButton = {
  width: "153px",
  height: "62px",
  backgroundColor: "#3d77ff",
  boxShadow: "none",
  borderWidth: "0px",
  fontWeight: "bold",
  fontSize: "17px",
  marginLeft: "848px",
  marginTop: "82px",
};

const firstRideStyle = {
  backgroundImage: `url(${BookFirstRide}`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  width: "1150px",
  height: "230px",
  borderRadius: "0px",
  marginTop: "8vh",
  marginBottom: "12vh",
};

const aboutUsStyle = {
  width: "973px",
  height: "210px",
  borderRadius: "0px",
  marginTop: "3vh",
};

export default withRouter(AboutUsPage);
