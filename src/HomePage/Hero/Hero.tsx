import React from 'react';
import './Hero.css';
import University from "../../assets/Universiyt.jpg";

function Hero() {
  return (
    <div className="hero">
        <div className="overlay"></div>
        <img src={University} alt="University image" />
        <h1>Welcome International Students at Menofia University</h1>
    </div>
  );
}

export default Hero;