import React from 'react';
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import About from "./About/About";
import Carousel from "./Carousel/Carousel";

function Home() {
  return (
    <div>
      <Header index={0}/>
      <Hero />
      <About />
      <Carousel />
    </div>
  );
}

export default Home;