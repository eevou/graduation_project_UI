import React from "react";
import "./SectionOne.css";
import image1 from "../../assets/image-940x580 (2).jpg";
import image2 from "../../assets/image-940x580 (3).jpg";
import image3 from "../../assets/image-940x580 (4).jpg";

function SectionOne(props) {
  const News = props.News;

  return (
    <div className="news-section" style={{ flexDirection: props.row }}>
      {News[0] && (
        <div className="news-left-section">
          <img src={News[0].image} alt="" />

          <div className="card-overlay">
            <div className="content">
              <h4>{News[0].header}</h4>
              <p>Randall Erickson</p>
              <div className="date-more">
                <span>Aug 15</span>
                <a href="details" className="about-news">
                  <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="news-right-section">
        {News.slice(1, 5).map((news) => (
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
    </div>
  );
}
export default SectionOne;
