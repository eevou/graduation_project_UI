import React, { useState, useEffect } from "react";
import SectionOne from "./SectionOne/SectionOne";
import SectionTwo from "./SectionTow/SectionTow";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";

const ITEMS_PER_PAGE = 14;

function News() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = Math.ceil(30 / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  return (
    <>
      <Header index={4} />
      <h1 className="News-header">News</h1>
      <SectionOne row="row" />
      <SectionOne row="row-reverse" />
      <SectionTwo />

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

      <Footer />
    </>
  );
}

export default News;
