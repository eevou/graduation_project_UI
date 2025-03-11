import React from 'react';
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import About from "./About/About";

function Home() {
  return (
    <div>
      <Header index={0}/>
      <Hero />
      <About />
    </div>
  );
}

export default Home;