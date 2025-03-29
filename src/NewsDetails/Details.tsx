import React, { useState, useEffect } from "react";
import "./Details.css";
import { Link } from "react-router-dom";
import { useLocation, useParams } from "react-router-dom";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import api from "../Services/api";
import { useTranslation } from "react-i18next";

function Details(props) {
  const headerArStyle = {
    fontFamily: "var(--MNF_Heading_AR)",
  };

  const headerEnStyle = {
    fontFamily: "var(--MNF_Heading_EN)",
  };

  const pArStyle = {
    fontFamily: "var(--MNF_Heading_AR)",
  };

  const pEnStyle = {
    fontFamily: "var(--MNF_Heading_EN)",
  };

  const savedLang = JSON.parse(localStorage.getItem("lang"));
  const location = useLocation();
  const news = location.state?.news;
  console.log(news)
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentNews, setCurrentNews] = useState();
  const [langId, setLangId] = useState(savedLang?.id || 2);
  const { i18n, t } = useTranslation();

  const GetNewsById = () => {
    api
      .get(`News/Id?newsId=${news.newsId}&langId=${langId}`)
      .then((response) => {
        setCurrentNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  };

  useEffect(() => {
    if (savedLang) {
      setLangId(savedLang.id);
    }

    GetNewsById();

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
      <Header
        index={4}
        setFilteredNews={setFilteredNews}
        setCurrentNews={setCurrentNews}
      />

      <main className="main">
        <div className="container">
          {/* Carousel Section */}

          {/* Content Section */}
          {/* Text Content */}
          <div className="content-wrapper">
            <div className="event-text-content">
              <h2
                className="event-title"
                style={savedLang?.code === `ar` ? headerArStyle : headerEnStyle}
              >
                {currentNews?.header}
              </h2>
              <div className="image">
                <img src={currentNews?.image} alt="" />
              </div>
              <p
                className="event-description"
                style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
              >
                {currentNews?.body}
              </p>
              <p
                className="event-date"
                style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
              >
                {currentNews?.date}
              </p>
            </div>

            {/* Related News */}
            <div className="related-news">
              <h3
                className="related-news-title"
                style={savedLang?.code === `ar` ? headerArStyle : headerEnStyle}
              >
                {t("details.latest")}
              </h3>
              <div className="news-grid">
                {filteredNews.slice(0, 6).map((news, index) => (
                  <Link
                    to={`/details`}
                    state={{ news: news }}
                    onClick={() => {window.scrollTo(0, 0), setCurrentNews(news)}}
                    className="about-news"
                    key={index}
                  >
                    <div className="news-details-card">
                      <img
                        src={news.image}
                        alt={`News ${index}`}
                        className={
                          savedLang?.code === `ar`
                            ? "news-imagear"
                            : "news-image"
                        }
                      />
                      <div className="news-content">
                        <h4
                          style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
                        >
                          {news.header[0].slice(0, 100)}...
                        </h4>
                        <p
                          style={savedLang?.code === `ar` ? pArStyle : pEnStyle}
                        >
                          {news.date}
                        </p>
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
