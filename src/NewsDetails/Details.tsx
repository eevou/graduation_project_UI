import React, { useState, useEffect } from "react";
import "./Details.css";
import { useLocation, useParams } from "react-router-dom";
import Image from "../assets/image-940x580 (2).jpg";
import Image2 from "../assets/image-940x580 (3).jpg";
import Image3 from "../assets/image-940x580 (4).jpg";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";

function Details(props) {
  const location = useLocation();
  const news = location.state?.news;

  console.log(news);

  return (
    <div>
      <Header index={4} />

      <main className="main">
        <div className="container">
          {/* Carousel Section */}
          <div className="image">
            <img src={news.image} alt="" />
          </div>

          {/* Content Section */}
          <div className="content-wrapper">
            {/* Text Content */}
            <div className="event-text-content">
              <h2 className="event-title">{news.header}</h2>
              <p className="event-description">{news.abbreviation}</p>
              <p className="event-date">{news.date}</p>
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

      <Footer />
    </div>
  );
}

export default Details;
