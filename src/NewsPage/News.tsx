import React from "react";
import SectionOne from "./SectionOne/SectionOne";
import SectionTwo from "./SectionTow/SectionTow";
import Header from "../HomePage/Header/Header";
import Footer from "../HomePage/Footer/Footer";
import "./News.css";

function News() {
  return (
    <>
      <Header index={4} />
      <h1 className="News-header">News</h1>
      <SectionOne row="row" />
      <SectionOne row="row-reverse" />
      <SectionTwo />
      <Footer />
    </>
  );
}

export default News;
