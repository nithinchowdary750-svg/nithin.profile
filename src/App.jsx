import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Service from './components/Service';
import Footer from './components/Footer';

export default function App() {
  const [preloaderComplete, setPreloaderComplete] = useState(false);

  return (
    <>
      {/* 1. Preloader Overlay */}
      <AnimatePresence mode="wait">
        {!preloaderComplete && (
          <Preloader onComplete={() => setPreloaderComplete(true)} />
        )}
      </AnimatePresence>

      {/* 2. Main Portfolio Layout */}
      <div 
        className={`transition-all duration-1000 ${
          preloaderComplete 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none h-screen overflow-hidden'
        }`}
      >
        <Navbar />
        <Hero />
        <About />
        <Service />
        <Footer />
      </div>
    </>
  );
}
