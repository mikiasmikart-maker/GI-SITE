
import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Manifesto } from './components/Manifesto';
import { Services } from './components/Services';
import { Work } from './components/Work';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { SectionIndex } from './components/SectionIndex';
import { Chatbot } from './components/Chatbot';
import { ThemeToggle } from './components/ThemeToggle';
import { ScrollIndicator } from './components/ScrollIndicator';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Ensure we start at the top when the preloader fades
      window.scrollTo(0, 0);
    }
  }, [loading]);

  return (
    <>
      {/* Global Texture Overlay */}
      <div className="grain-overlay"></div>

      {/* Advanced Vertical Scroll Indicator (Center Right) */}
      {!loading && <ScrollIndicator />}

      {/* Preloader blocks view until initialization is complete */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div 
        className={`transition-opacity duration-1000 ${loading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-hidden={loading}
      >
        <Navbar />
        <SectionIndex />
        <ThemeToggle />
        <Chatbot />
        
        <main className="bg-paper/80 dark:bg-paper-dark/80 backdrop-blur-[2px] text-ink dark:text-ink-dark transition-colors duration-500">
          <Hero />
          <About />
          <Manifesto />
          <Services />
          <Work />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default App;
