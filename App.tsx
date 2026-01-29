
import React, { useEffect, useRef, useState } from 'react';
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
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { OptInForm } from './components/OptInForm';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsConditions } from './components/TermsConditions';
import { SnapshotForm } from './components/SnapshotForm';
import { SnapshotConfirmation } from './components/SnapshotConfirmation';

const App: React.FC = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

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

  useEffect(() => {
    // Global click handler for all CTA buttons
    const handleCTAClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const button = target.closest('button');

      if (button && (
        button.textContent?.includes('Get Your Free Audit') ||
        button.textContent?.includes('Start Your Free Audit') ||
        button.textContent?.includes('Get Your Custom Analysis')
      )) {
        e.preventDefault();
        e.stopPropagation();
        setIsModalOpen(true);
      }
    };

    document.addEventListener('click', handleCTAClick, true);

    return () => {
      document.removeEventListener('click', handleCTAClick, true);
    };
  }, []);

  // Render sub-pages
  if (currentRoute === '#/privacy') {
    return <PrivacyPolicy />;
  }
  if (currentRoute === '#/terms') {
    return <TermsConditions />;
  }
  if (currentRoute === '#/optin') {
    return <OptInForm />;
  }
  if (currentRoute === '#/snapshot') {
    return <SnapshotForm />;
  }
  if (currentRoute === '#/snapshot-confirmation') {
    return <SnapshotConfirmation />;
  }

  return (
    <>
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

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default App;
