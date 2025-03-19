import React, { useState, useEffect } from "react";
import "./Details.css";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import Image from "../assets/image-940x580 (2).jpg";
import Image2 from "../assets/image-940x580 (3).jpg";
import Image3 from "../assets/image-940x580 (4).jpg";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import api from "../Services/api";

function Details(props) {
  const location = useLocation();
  const news = location.state?.news;
  const [News, setNews] = useState([]);

  useEffect(() => {
    api
      .get(`/News`)
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  }, []);

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
              <p className="event-description">{news.body}</p>
              <p className="event-date">{news.date}</p>
            </div>

            {/* Related News */}
            <div className="related-news">
              <h3 className="related-news-title">Latest News</h3>
              <div className="news-grid">
                {News.slice(0, 4).map((news, index) => (
                  <Link to={`/details`} state={{ news }} className="about-news">
                    <div key={index} className="news-details-card">
                      <img
                        src={news.image}
                        alt={`News ${index}`}
                        className="news-image"
                      />
                      <div className="news-content">
                        <p>{news.abbreviation}</p>
                        <p>{news.date}</p>
                      </div>
                    </div>
                  </Link>
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
