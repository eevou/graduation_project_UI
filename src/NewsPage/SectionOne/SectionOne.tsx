import React, { useEffect, useState } from "react";
import "./SectionOne.css";
import { Link } from "react-router-dom";
import { useNews } from "../../Services/NewsContext";

function SectionOne(props) {
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

  const formatDate = (rawDate) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year} - ${month} - ${day}`;
  };

  return (
    <div className="news-section" style={{ flexDirection: props.row }}>
      {props.news[0] && (
        <Link
          to={`/details`}
          state={{ news: props.news[0] }}
          className="news-left-section"
        >
          <img src={props.news[0].image} alt="" />

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
              {props.news[0].translations[0].header.length > 50
                ? props.news[0]?.translations[0]?.header?.slice(0, 100) + "..."
                : props.news[0]?.translations[0]?.header}
            </h4>
            <div className="date-more">
              <span>{formatDate(props.news[0]?.date)}</span>
            </div>
          </div>
        </Link>
      )}

      <div className="news-right-section">
        {props.news.slice(1, 5).map((news, index) => (
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
              {news?.translations[0]?.header?.length > 50
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
