import React, { useState, useEffect } from "react";
import SectionOne from "./SectionOne/SectionOne";
import SectionTwo from "./SectionTow/SectionTow";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";
import "./SectionTow/SectionTow.css";
import { useNews } from "../Services/NewsContext";

const ITEMS_PER_PAGE = 14;

function News() {
  const { langId, getFilteredNews } = useNews();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const result = await getFilteredNews(langId, 1, 14);
      if (result) {
        setNews(result);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      <Header index={4} display={true} />
      <div className="news-page">
        <SectionOne row="row" news={news?.splice(0, 5)}/>
        <SectionOne row="row-reverse" news={news} />
        <SectionTwo news={news?.splice(10, 14)}/>
      </div>
      <Footer />
    </div>
  );
}

export default News;
