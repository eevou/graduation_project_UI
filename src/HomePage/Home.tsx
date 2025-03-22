import React, { useState } from 'react';
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Carousel from "./Carousel/Carousel";
import Footer from "./Footer/Footer";

function Home() {
  const [language, setLanguage] = useState(1);
  console.log(language)

  return (
    <div>
      <Header index={0} setLanguage={setLanguage}/>
      <Hero />
      <About />
      <Carousel lang={language}/>
      <Footer />
    </div>
  );
}

export default Home;