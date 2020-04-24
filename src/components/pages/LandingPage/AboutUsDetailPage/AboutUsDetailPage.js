import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";

import LandingNavbar from "../../../navbar/LandingNavbar";
import Footer from "../../../footer/Footer";

import BookFirstRide from "../assets/book_first_ride.png";

import "./AboutUsDetailPage.css";

const AboutUsDetailPage = ({ history, location }) => {
  let bio = "";

  switch (location.state.name) {
    case "Michael Chong":
      bio = memberBios.Michael;
      break;
    case "Han Lee":
      bio = memberBios.Han;
      break;
    case "Justin Han":
      bio = memberBios.Justin;
      break;
    case "Yoon Park":
      bio = memberBios.Yoon;
      break;
    case "Erick Suarez":
      bio = memberBios.Erick;
      break;
    case "Evan Lin":
      bio = memberBios.Evan;
      break;
    case "Jared Fitton":
      bio = memberBios.Jared;
      break;
    case "Parker Glenn":
      bio = memberBios.Parker;
      break;
    case "Paul Choi":
      bio = memberBios.Paul;
      break;
    case "Wenrui Zhang":
      bio = memberBios.Wenrui;
      break;
    case "Michelle Qin":
      bio = memberBios.Michelle;
      break;
    default:
      break;
  }

  return (
    <div className="about-us-detail-wrapper">
      <LandingNavbar />
      <div className="about-us-detail-content" id="content">
        <img src={location.state.img} alt="person" style={imageStyle} />
        <div className="about-us-detail-text">
          <div>{location.state.title}</div>
          <div className="detail-name">{location.state.name}</div>
          <div className="detail-bio">
            <div>{bio[0]}</div>
            <br />
            <div>{bio[1]}</div>
            <br />
            <div>{bio[2]}</div>
          </div>
        </div>
      </div>
      <img src={BookFirstRide} alt="first-ride" style={firstRideStyle} />
      <Footer />
    </div>
  );
};

const firstRideStyle = {
  width: "1150px",
  height: "230px",
  borderRadius: "0px",
  marginTop: "20vh",
  marginBottom: "8vh",
};

const imageStyle = {
  borderRadius: "0px",
  height: "410px",
  width: "410px",
};

const memberBios = {
  Michael: [
    "Michael Chong is the co-founder and CEO at PoolUp’s Santa Barbara office focusing on business development and brand.",
    "Prior to founding PoolUp, Michael has 2 years of investment banking experience on over 5 mergers and acquisitions and restructuring advisory transactions. Michael was the president at UCSB Finance Connection, senior analyst at UCSB Investment Advisory Committee, and investment banking intern at Corner Capital Advisors and Armory Securities.",
    "Michael is earning a B.A. degree at the University of California, Santa Barbara in June 2020. Currently, he is the student advisor at UCSB Econ Student Advisory Committee and UCSB Finance Connection Advisory Committee.",
  ],
  Han: [
    "Han is one of the Co-founders, and is the Lead Backend Developer at PoolUp’s Los Angeles office.",
    "Besides PoolUp, Han likes to work on backend projects in and out of school, and is passionate in working on the technical challenges that stems from it. He will be working in Amazon as a Software Development Intern in Summer 2020.",
    "Han is pursuing a B.S degree in Computer Science at University of California, Los Angeles. He enjoys casual cooking, traveling, and loves playing basketball. He is expected to graduate Fall 2020.",
  ],
  Justin: [
    "Justin Han is a co-founder and front-end developer at PoolUp’s Los Angeles office.",
    "Prior to PoolUp, Justin interned at Citrix Systems and Kakao Games USA, working as a software developer intern focusing on full-stack web development.",
    "Justin is pursuing a computer science degree at the University of California, Los Angeles, with an expected graduation date of June 2020.",
  ],
  Yoon: [
    "Yoon is the Co-founder and Lead UI/UX Designer at PoolUp’s Los Angeles office focusing on product development and branding.",
    "Prior to PoolUp, Yoon worked as a UI/UX Visual Design Intern at DEKA R&D and worked on projects such as the FedEx Delivery Bots.",
    "Yoon is working towards a B.A. degree at University of California, Los Angeles in June 2020 for Design Media Arts. She strives to connect businesses, technology, and design on her journey as a creative designer. Her interests are hiking, Katy Perry, and Wanderlust Creamery.",
  ],
  Erick: [
    "Erick Suarez is a co-founder at PoolUp’s Santa Barbara office focusing on product development and software engineering.",
    "Prior to founding PoolUp, Erick has 3 years of industry software development working on and maintaining critical production systems at his former company.",
    "Erick is earning a B.S. degree at the University of California, Santa Barbara in June 2020 for Computer Science.",
  ],
  Evan: [
    "Evan Lin is a Backend Software Developer at PoolUp’s Los Angeles office, where he focuses on designing efficient software for a better end-user experience.",
    "Prior to joining PoolUp, Evan served as a Software Engineer Intern at LogicMonitor, the industry-leading performance monitoring platform.",
    "Born and raised in the San Gabriel Valley, Evan is currently pursuing a B.S. degree in Computer Science at UCLA. His interests include hiking, listening to podcasts, and trying new places to eat.",
  ],
  Jared: [
    "Jared Fitton is a co-founder and software engineer at PoolUp’s Santa Barbara office.",
    "Prior to PoolUp, Jared spent 3 years as a software developer at Novacoast where he worked on projects ranging from enterprise software to development for individual client’s needs. He also founded a startup called Hello World that serves to connect non-profits with student software developers, providing them a doorway into the tech industry.",
    "Jared is pursuing a computer science degree at the University of California, Santa Barbara, College of Creative Studies. Additionally, he intends to complete the college’s Technology Management Program and graduate by June 2022.",
  ],
  Parker: [
    "Parker is a back-end engineer at PoolUp’s Santa Barbara office.",
    "Prior to PoolUp, Parker interned at construction technology company Briq as a Data Science Intern. Currently, he works there part-time as a Data Science Associate.",
    "Parker is pursuing a B.S degree in Computational Linguistics at University of California, Santa Barbara. He loves playing jazz guitar, surfing, and weightlifting. He is expected to graduate in June, 2020.",
  ],
  Paul: ["N/A", "N/A", "N/A"],
  Wenrui: [
    "Wenrui is a UI/UX designer at PoolUp’s Los Angeles Office.",
    "Wenrui is passionate about enhancing the social fabric through technology, and creating experiences that better engage communities through meaningful interactions.",
    "Wenrui is pursuing a B.A. degree in Design|Media Arts at University of California, Los Angeles. She enjoys doodling, trying out new recipes, and visiting aquariums.",
  ],
  Michelle: [
    "Michelle is a co-founder and UI/UX designer at PoolUp’s Santa Barbara chapter.",
    "Michelle is passionate about the intersection of technology and entrepreneurship. Some of her most rewarding experiences include organizing TreeHacks (Stanford’s premier hackathon) to encourage students from across the world to explore the world of hacking, programming interactive consoles to inspire kids about STEAM with the Dos Pueblos Engineering Academy, and organizing summer coding camps to teach young girls how to code.",
    "Michelle is a student at Stanford University studying computer science.",
  ],
};

export default withRouter(AboutUsDetailPage);
