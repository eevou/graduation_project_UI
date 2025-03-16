import React, { useState, useEffect } from "react";
import "./SectionTow.css";
import image1 from "../../assets/image-940x580 (2).jpg";
import image2 from "../../assets/image-940x580 (3).jpg";
import api from "../../Services/api"

function SectionTow() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/Products")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="news-bottom-section">
      {products.map((product) => (
        <div className="card">
          <img src={product.imageUrl} alt="" />

          <div className="card-overlay">
            <div className="content">
              <h4>{product.title}</h4>
              <p>{product.description}</p>
              <div className="date-more">
                <span>{product.date}</span>
                <a href="/" className="about-news">
                  <i className="fa-solid fa-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* <div className="card">
        <img src={products.ImageUrl} alt="" />

        <div className="card-overlay">
          <div className="content">
            <h4>{products.Title}</h4>
            <p>{products}</p>
            <div className="date-more">
              <span>Aug 15</span>
              <a href="/" className="about-news">
                <i className="fa-solid fa-arrow-up"></i>
              </a>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="card">
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
      </div> */}
    </div>
  );
}
export default SectionTow;
