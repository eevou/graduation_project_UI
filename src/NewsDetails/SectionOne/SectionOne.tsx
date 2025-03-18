import React, { useState, useEffect } from "react";
import "./SectionOne.css";
import Image from "../../assets/image-940x580 (2).jpg";
import Image2 from "../../assets/image-940x580 (3).jpg";
import Image3 from "../../assets/image-940x580 (4).jpg";

function SectionOne(props) {
  const images = [Image, Image2, Image3];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <main className="main">
        <div className="container">
          {/* Carousel Section */}
          <div className="carousel-container">
            {images.map((img, index) => (
              <img
                key={index}
                src={[Image, Image2, Image3][index]}
                alt={`Slide ${index + 1}`}
                className={`carousel-slide ${
                  index === currentSlide ? "active" : ""
                }`}
              />
            ))}
          </div>

          {/* Content Section */}
          <div className="content-wrapper">
            {/* Text Content */}
            <div className="event-text-content">
              <h2 className="event-title">{props.title}</h2>
              <p className="event-description">{props.description}</p>
              <p className="event-date">{props.date}</p>
            </div>

            {/* Related News */}
            <div className="related-news">
              <h3 className="related-news-title">Latest News</h3>
              <div className="news-grid">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="news-details-card">
                    <img
                      src={[Image, Image2, Image3][item % 3]}
                      alt={`News ${item}`}
                      className="news-image"
                    />
                    <div className="news-content">
                      <h4>Effective Forms Advertising</h4>
                      <p>Randall Erickson</p>
                      <p>Aug 15</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SectionOne;
