
import React, { useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { PlatformSection } from './components/PlatformSection';
import { InteractiveDemo } from './components/InteractiveDemo';
import { ROICalculator } from './components/ROICalculator';
import { HowItWorks } from './components/HowItWorks';
import { ResultsSection } from './components/ResultsSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
      };

      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      }, observerOptions);

      document.querySelectorAll('.reveal').forEach(el => {
        observerRef.current?.observe(el);
      });

      // Fallback: if nothing is visible after 1 second, force all to active
      setTimeout(() => {
        document.querySelectorAll('.reveal:not(.active)').forEach(el => {
          el.classList.add('active');
        });
      }, 1000);
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="app-shell flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        
        <div className="reveal section-frame">
          <ProblemSection />
        </div>
        
        <div className="reveal section-frame">
          <PlatformSection />
        </div>
        
        <div className="reveal section-frame">
          <InteractiveDemo />
        </div>
        
        <div className="reveal section-frame">
          <ROICalculator />
        </div>
        
        <div className="reveal section-frame">
          <HowItWorks />
        </div>
        
        <div className="reveal section-frame">
          <ResultsSection />
        </div>
        
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default App;
