import React from 'react';
import Contact from '../../organisms/Contact';
import Footer from '../../organisms/Footer';
import Hero from '../../organisms/Hero';
import Navbar from '../../organisms/Navbar';
import Projects from '../../organisms/Projects';
import Quote from '../../organisms/Quote';
import Skills from '../../organisms/Skills';

export const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Skills />
      <Quote />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
