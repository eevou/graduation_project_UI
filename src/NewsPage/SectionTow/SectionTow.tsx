import React, { useEffect, useState } from "react";
import "./SectionTow.css";
import { Link } from "react-router-dom";
import { useNews } from "../../Services/NewsContext";

function SectionTow(props) {
  const { getFilteredNews } = useNews();
  
  const [news, setNews] = useState([]);

  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;

  const ArStyle = {
    fontFamily: "var(--MNF_Heading_AR)",
  };

  const EnStyle = {
    fontFamily: "var(--MNF_Heading_EN)",
  };

  const arrowAr = {
    left: "15px",
  };

  const arrowEn = {
    right: "15px",
  };

  useEffect(() => {
    const fetchNews = async () => {
      const result = await getFilteredNews(savedLang.id, 2, 4);
      if (result) {
        setNews(result);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} - ${month} - ${day}`;
  };

  return (
    <div className="news-bottom-section">
      {news.map((news, index) => (
        <div className="card" key={index}>
          <img src={news.image} alt="" />
          <Link
            to={`/details`}
            state={{ news }}
            className="about-news"
            style={savedLang?.code === "ar" ? arrowAr : arrowEn}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </Link>

          <div className="card-overlay">
            <div className="content">
              <h4 style={savedLang?.code === "ar" ? ArStyle : EnStyle}>
                {news.translations[0].header.slice(0, 100)}...
              </h4>
              <div className="date-more">
                <span>{formatDate(news.date)}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SectionTow;
