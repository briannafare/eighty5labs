
import React, { useState, useEffect } from 'react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-black/[0.05] py-3' : 'bg-transparent py-5'}`}>
      <div className="container-custom flex items-center justify-between">
        <div className="flex items-center gap-10">
          <a href="#" className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-black">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
            eighty5labs
          </a>
          <div className="hidden md:flex items-center gap-8">
            {['Platform', 'Results'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-[13px] font-medium text-black/50 hover:text-black transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="btn-pill bg-black text-white text-[13px]">
            Get Your Free Audit
          </button>
        </div>
      </div>
    </nav>
  );
};
