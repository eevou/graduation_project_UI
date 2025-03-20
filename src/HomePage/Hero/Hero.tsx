import './Hero.css';
import React, { useState, useEffect, useCallback } from 'react';
import Image1 from "../../assets/University2.jpg";
import Image2 from "../../assets/image-940x580 (2).jpg";
import Image3 from "../../assets/image-940x580 (3).jpg";
import Image4 from "../../assets/image-940x580 (4).jpg";

const images = [
  Image1,
  Image2,
  Image3,
  Image4
];


function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const startAutoSlide = useCallback(() => {
    return setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
  }, []);

  useEffect(() => {
    if (!isPaused) {
      const interval = startAutoSlide();
      return () => clearInterval(interval);
    }
  }, [isPaused, startAutoSlide]);

  return (
    <div className="carousel-container">
      <div
        className="carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 100}%`
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={image}
                alt={`University slide ${index + 1}`}
                className="carousel-image"
              />
              <div className="carousel-overlay" />
            </div>
          ))}
        </div>

        <h1 className="carousel-heading">
          Welcome International Students at Menofia University
        </h1>

        <div className="carousel-dots">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`carousel-dot ${currentIndex === index ? 'active' : ''}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hero;