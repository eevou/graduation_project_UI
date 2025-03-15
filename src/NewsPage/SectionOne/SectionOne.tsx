import React from "react";
import "./SectionOne.css";
import image1 from "../../assets/image-940x580 (2).jpg";
import image2 from "../../assets/image-940x580 (3).jpg";
import image3 from "../../assets/image-940x580 (4).jpg";

function SectionOne(props) {
  return (
    <div className="news-section" style={{ flexDirection: props.row}}>
      <div className="news-left-section">
        <img src={image1} alt="" />

        <div className="card-overlay">
          <div className="content">
            <h4>Effective Forms Advertising Internet Web</h4>
            <p>Randall Erickson</p>
            <div className="date-more">
              <span>Aug 15</span>
              <a href="/" className="about-news">
              <i className="fa-solid fa-arrow-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="news-right-section">
        <div className="card">
          <img src={image2} alt="" />

          <div className="card-overlay">
            <div className="content">
              <h4>Effective Forms Advertising Internet Web</h4>
              <p>Randall Erickson</p>
              <div className="date-more">
                <span>Aug 15</span>
                <a href="/" className="about-news">
                <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <img src={image3} alt="" />

          <div className="card-overlay">
            <div className="content">
              <h4>Effective Forms Advertising Internet Web</h4>
              <p>Randall Erickson</p>
              <div className="date-more">
                <span>Aug 15</span>
                <a href="/" className="about-news">
                <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <img src={image3} alt="" />
          <div className="card-overlay">
            <div className="content">
              <h4>Effective Forms Advertising Internet Web</h4>
              <p>Randall Erickson</p>
              <div className="date-more">
                <span>Aug 15</span>
                <a href="/" className="about-news">
                <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <img src={image2} alt="" />
          <div className="card-overlay">
            <div className="content">
              <h4>Effective Forms Advertising Internet Web</h4>
              <p>Randall Erickson</p>
              <div className="date-more">
                <span>Aug 15</span>
                <a href="/" className="about-news">
                <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SectionOne;
