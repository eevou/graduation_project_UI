import React, { useState, useEffect } from "react";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Carousel from "./Carousel/Carousel";
import Footer from "./Footer/Footer";
import { useNews } from "../Services/NewsContext";


function Home() {
  const savedLang = JSON.parse(localStorage.getItem("lang"));
  const [filteredNews, setFilteredNews] = useState([]);
  const [langId, setLangId] = useState(savedLang?.id || 2)
  const { news } = useNews();
  
  useEffect(() => {
    if (savedLang) {
      setLangId(savedLang.id)
    }
    
    setFilteredNews(news)

  }, []);

  return (
    <div>
      <Header index={0} setFilteredNews={setFilteredNews}/>
      <Hero/>
      <About />
      <Carousel />
      <Footer />
    </div>
  );
}

export default Home;