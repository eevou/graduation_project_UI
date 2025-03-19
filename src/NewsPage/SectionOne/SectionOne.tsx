import React from "react";
import "./SectionOne.css";
import { Link } from "react-router-dom";

function SectionOne(props) {
  const News = props.News;

  return (
    <div className="news-section" style={{ flexDirection: props.row }}>
      {News[0] && (
        <div className="news-left-section">
          <img src={News[0].image} alt="" />

          <Link
            to={`/details`}
            state={{ news: News[0] }}
            className="about-news"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </Link>

          <div className="card-overlay">
          </div>
            <div className="content">
              <h4>{News[0].header}</h4>
              <p>{News[0].abbreviation.slice(0, 20)}...</p>
              <div className="date-more">
                <span>{News[0].date}</span>
              </div>
            </div>
        </div>
      )}

      <div className="news-right-section">
        {News.slice(1, 5).map((news) => (
          <div className="card">
            <img src={news.image} alt="" />

            <Link to={`/details`} state={{ news }} className="about-news">
              <i className="fa-solid fa-arrow-up"></i>
            </Link>
            
            <div className="card-overlay">
              <div className="content">
                <h4>{news.header}</h4>
                <p>{news.abbreviation.slice(0, 1)}...</p>
                <div className="date-more">
                  <span>{news.date}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SectionOne;
