import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Testimonials from './components/Testimonials/Testimonials';
import Pricing from './components/Pricing/Pricing';
import CallToAction from './components/CallToAction/CallToAction';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default App;
