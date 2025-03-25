import React, { useState, useEffect } from "react";
import "./Details.css";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import api from "../Services/api";

function Details(props) {
  const savedLang = JSON.parse(localStorage.getItem("lang"));
  const location = useLocation();
  const news = location.state?.news;
  const [filteredNews, setFilteredNews] = useState([]);
  const [langId, setLangId] = useState(savedLang?.id || 2);

  useEffect(() => {
    if (savedLang) {
      setLangId(savedLang.id)
    }

   api
      .get(`/News?id=${langId}`)
      .then((response) => {
        setFilteredNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  }, []);
  return (
    <div>
      <Header index={4} setFilteredNews={setFilteredNews}/>

      <main className="main">
        <div className="container">
          {/* Carousel Section */}

          {/* Content Section */}
          {/* Text Content */}
          <div className="content-wrapper">
            <div className="event-text-content">
              <h2 className="event-title">{news.header}</h2>
              <div className="image">
                <img src={news.image} alt="" />
              </div>
              <p className="event-description">{news.body}</p>
              <p className="event-date">{news.date}</p>
            </div>

            {/* Related News */}
            <div className="related-news">
              <h3 className="related-news-title">Latest News</h3>
              <div className="news-grid">
                {filteredNews.slice(0, 6).map((news, index) => (
                  <Link to={`/details`} state={{ news }} className="about-news" onClick={() => window.scrollTo(0, 0)} key={index}>
                    <div className="news-details-card">
                      <img
                        src={news.image}
                        alt={`News ${index}`}
                        className="news-image"
                      />
                      <div className="news-content">
                        <h4>{news.header[0].slice(0, 100)}...</h4>
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
