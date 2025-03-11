import React from "react";
import logo from "../../assets/image2.png"
import line from "../../assets/curveLine.png"
import "./About.css";

function About() {
  return <div className="about-container">
    <div className="content">
        <img src={logo} alt="MNF-logo" />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur magnam beatae consectetur ut accusantium iure voluptatum. Deleniti dolorem debitis accusamus? Ratione ipsam, dolor perferendis libero deleniti illum assumenda perspiciatis fugiat est fuga maiores quisquam voluptatibus.</p>
    </div>

    <div className="header">
        <h1>International Students Affairs Office</h1>
    </div>

    <img src={line} alt="Curve line" />
  </div>;
}

export default About;
