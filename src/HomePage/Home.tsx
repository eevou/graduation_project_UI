import React from 'react';
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Carousel from "./Carousel/Carousel";
import Footer from "./Footer/Footer";

function Home() {
  return (
    <div>
      <Header index={0}/>
      <Hero />
      <About />
      <Carousel />
      <Footer />
    </div>
  );
}

export default Home;