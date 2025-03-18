import React, { useState, useEffect } from "react";
import "./SectionTow.css";
import image1 from "../../assets/image-940x580 (2).jpg";
import image2 from "../../assets/image-940x580 (3).jpg";
import api from "../../Services/api"


function SectionTow(props) {

  const News = props.News;

  return (
    <div className="news-bottom-section">
      {News.map((news) => (
        <div className="card">
          <img src={news.image} alt="" />

          <div className="card-overlay">
            <div className="content">
              <h4>{news.header}</h4>
              <p>{news.abbreviation}</p>
              <div className="date-more">
                <span>{news.date}</span>
                <a href="/" className="about-news">
                  <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export default SectionTow;
