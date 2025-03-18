import React, { useState, useEffect } from "react";
import SectionOne from "./SectionOne/SectionOne";
import SectionTwo from "./SectionTow/SectionTow";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";
import "./SectionTow/SectionTow.css";
import api from "../Services/api";

const ITEMS_PER_PAGE = 14;

function News() {
  const [currentPage, setCurrentPage] = useState(1);
  const [News, setNews] = useState([]);

  const totalItems = Math.ceil(News.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const paginatedNews = News.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    api
      .get("/News")
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching News:", error);
      });
  }, []);

  return (
    <div>
      <Header index={4} />
      <div className="news-page">
        <h1 className="News-header">News</h1>
        <SectionOne row="row" News={paginatedNews.slice(0, 5)} />
        <SectionOne row="row-reverse" News={paginatedNews.slice(5, 10)} />
        <SectionTwo News={paginatedNews.slice(9, 13)} />

        {totalItems > 1 && (
          <div className="pagination">
            <button
              className="page-btn left"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {[...Array(totalItems)].map((_, i) => (
              <button
                key={i + 1}
                className={`page-btn number ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="page-btn right"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalItems))
              }
              disabled={currentPage === totalItems}
            >
              Next
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default News;
