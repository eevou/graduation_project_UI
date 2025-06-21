import React, { useEffect, useState } from "react";
import "./SectionOne.css";
import { Link } from "react-router-dom";
import { useNews } from "../../Services/NewsContext";

function SectionOne(props) {
  const { getNews } = useNews();

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
      if (props.isReversed) {
        const result = await getNews(savedLang.id, 2, 5);
        if (result) {
          setNews(result);
        }
      } else {
        const result = await getNews(savedLang.id, 1, 5);
        if (result) {
          setNews(result);
        }
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
    <div className="news-section" style={{ flexDirection: props.row }}>
      {news[0] && (
        <Link
          to={`/details`}
          state={{ news: news[0] }}
          className="news-left-section"
        >
          <img src={news[0].image} alt="" />

          <div
            className="about-news"
            style={savedLang?.code === "ar" ? arrowAr : arrowEn}
          >
            <i className="fa-solid fa-arrow-up"></i>
          </div>

          <div className="card-overlay"></div>
          <div
            className="content"
            style={savedLang?.code === "ar" ? ArStyle : EnStyle}
          >
            <h4>
              {news[0].translations[0].header.length > 50
                ? news[0]?.translations[0]?.header?.slice(0, 100) + "..."
                : news[0]?.translations[0]?.header}
            </h4>
            <div className="date-more">
              <span>{formatDate(news[0]?.date)}</span>
            </div>
          </div>
        </Link>
      )}

      <div className="news-right-section">
        {news.slice(1, 5).map((news, index) => (
          <Link to={`/details`} state={{ news }} className="card" key={index}>
            <img src={news.image} alt="" />

            <div
              className="about-news"
              style={savedLang?.code === "ar" ? arrowAr : arrowEn}
            >
              <i className="fa-solid fa-arrow-up"></i>
            </div>
            <div className="card-overlay"></div>

            <div
              className="content"
              style={savedLang?.code === "ar" ? ArStyle : EnStyle}
            >
              {news.translations[0].header.length > 50
                ? news?.translations[0]?.header?.slice(0, 100) + "..."
                : news?.translations[0]?.header}
              <div className="date-more">
                <span>{formatDate(news.date)}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SectionOne;
