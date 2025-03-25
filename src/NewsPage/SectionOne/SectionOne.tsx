import React from "react";
import "./SectionOne.css";
import { Link } from "react-router-dom";

function SectionOne(props) {
  const News = props.News;

  return (
    <div className="news-section" style={{ flexDirection: props.row }}>
      {News[0] && (
        <Link
          to={`/details`}
          state={{ news: News[0] }}
          className="news-left-section"
        >
          <img src={News[0].image} alt="" />

          <div className="about-news">
            <i className="fa-solid fa-arrow-up"></i>
          </div>

          <div className="card-overlay"></div>
          <div className="content">
            <h4>{News[0].translations[0].header}</h4>
            <p>{News[0].translations[0].abbreviation}...</p>
            <div className="date-more">
              <span>{News[0].translations[0].date}</span>
            </div>
          </div>
        </Link>
      )}

      <div className="news-right-section">
        {News.slice(1, 5).map((news) => (
          <Link to={`/details`} state={{ news }} className="card">
            <img src={news.image} alt="" />

            <div className="about-news">
              <i className="fa-solid fa-arrow-up"></i>
            </div>
            <div className="card-overlay"></div>

            <div className="content">
              <h4>{news.translations[0].header}</h4>
              <p>{news.translations[0].abbreviation}...</p>
              <div className="date-more">
                <span>{news.date}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
export default SectionOne;
