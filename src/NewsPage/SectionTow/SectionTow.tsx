import React, { useState, useEffect } from "react";
import "./SectionTow.css";
import { Link } from "react-router-dom";
import api from "../../Services/api";

function SectionTow(props) {
  const News = props.News;

  return (
    <div className="news-bottom-section">
      {News.map((news, index) => (
        <div className="card" key={index}>
          <img src={news.image} alt="" />
          <Link to={`/details`} state={{ news }} className="about-news">
            <i className="fa-solid fa-arrow-up"></i>
          </Link>

          <div className="card-overlay">
            <div className="content">
              <h4>{news.header[0].slice(0, 100)}...</h4>
              <div className="date-more">
                <span>{news.date}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default SectionTow;
