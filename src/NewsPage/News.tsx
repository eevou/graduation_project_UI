import React, { useState, useEffect } from "react";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";
import { useNews } from "../Services/NewsContext";

function News() {

  return (
    <div>
      <Header index={4} display={true} />

      <Footer />
    </div>
  );
}

export default News;
