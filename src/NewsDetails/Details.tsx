import React, { useState, useEffect } from "react";
import "./Details.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import api from "../Services/api";
import { useTranslation } from "react-i18next";
import Image1 from "../assets/image-940x580 (2).jpg"
import Image2 from "../assets/image-940x580 (3).jpg"
import Image3 from "../assets/image-940x580 (4).jpg"

function Details() {
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

  const savedLang = JSON.parse(localStorage.getItem("lang") || '{"id": 2, "code": "en"}');
  const location = useLocation();
  const [filteredNews, setFilteredNews] = useState([]);
  const [currentNews, setCurrentNews] = useState();
  const [langId, setLangId] = useState(savedLang?.id || 2);
  const { t } = useTranslation();

  const GetNewsById = async () => {
    try {
      const response = await api.get(
        `News/Id?newsId=${location.state?.news.newsId || 1}&langId=${langId}`
      );
      setCurrentNews(response.data);
    } catch (error) {
      console.error("Error fetching News:", error);
    }
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
  }, [langId]);

  // Local carousel images
  const carouselImages = [Image1,Image2,Image3];

  return (
    <div>
      <Header
        index={4}
        setFilteredNews={setFilteredNews}
        setCurrentNews={setCurrentNews}
      />

      <main className="main">
        <div className="container">
          <div className="content-wrapper">
            <div className="event-text-content">
              <h2
                className="event-title"
                style={savedLang?.code === `ar` ? headerArStyle : headerEnStyle}
              >
                {currentNews?.header}
              </h2>
              <div className="carousel">
                <div className="carousel-inner">
                  {carouselImages.map((image, index) => (
                    <div key={index} className="carousel-slide">
                      <img src={image} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </div>
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
                    state={{ news }}
                    className="about-news"
                    onClick={() => {
                      window.scrollTo(0, 0);
                      GetNewsById();
                    }}
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
