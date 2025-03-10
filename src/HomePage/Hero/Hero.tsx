import React from 'react';
import './Hero.css';
import University from "../../assets/University2.jpg";

function Hero() {
  return (
    <div className="hero">
        <img src={University} alt="University image" />
        <h1>Welcome International Students at Menofia University</h1>
    </div>
  );
}

export default Hero;