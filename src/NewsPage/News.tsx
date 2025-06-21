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
  const langString = localStorage.getItem("lang");
  const savedLang = langString ? JSON.parse(langString) : null;
 
  return (
    <div>
      <Header index={4} display={true}/>
      <div className="news-page">
        <SectionOne row="row" />
        <SectionOne row="row-reverse" isReversed={true} />
        <SectionTwo />
      </div>
      <Footer />
    </div>
  );
}

export default News;
