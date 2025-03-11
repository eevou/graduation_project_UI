import React from "react";
import logo from "../../assets/image2.png";
import line from "../../assets/curveLine.png";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      <div className="content">
        <img src={logo} alt="MNF-logo" />
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
          magnam beatae consectetur ut accusantium iure voluptatum.
        </p>
      </div>

      <h1>International Students Affairs Office</h1>

      <img src={line} alt="Curve line" className="curveLine" />
    </div>
  );
}

export default About;
