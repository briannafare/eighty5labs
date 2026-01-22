import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-[100px] md:pt-[120px] pb-12 md:pb-16 min-h-[80vh] md:min-h-0 flex flex-col items-center justify-center overflow-hidden bg-[#fbfbfa]">
      {/* Background Image Stacking Level 0 */}
      <div 
        className="hero-bg hero-bg-animate absolute pointer-events-none z-[0]" 
        style={{
          inset: '-10% -5% -25% -5%',
          backgroundImage: `url('https://lh3.googleusercontent.com/d/1ok9LJhCGYssVghtRU355LnZBZkFzG7oS')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 70%',
          opacity: 0.5,
          filter: 'saturate(0.95) contrast(0.98)',
          mixBlendMode: 'multiply',
          maskImage: 'radial-gradient(ellipse at 50% 25%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,1) 55%, rgba(0,0,0,1) 100%)'
        }}
        aria-hidden="true"
      ></div>

      {/* Signature Ambient Animation Stacking Level 1 */}
      <div className="hero-arc" aria-hidden="true"></div>

      {/* Hero Scrim Stacking Level 2 - Tuned for maximum visibility of the breathing animation */}
      <div 
        className="hero-scrim absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at 50% 25%, 
              rgba(251, 251, 250, 0.78) 0%, 
              rgba(251, 251, 250, 0.58) 20%, 
              rgba(251, 251, 250, 0.05) 50%, 
              rgba(251, 251, 250, 0.00) 65%),
            linear-gradient(to bottom, 
              rgba(251, 251, 250, 0.82) 0%, 
              rgba(251, 251, 250, 0.28) 35%, 
              rgba(251, 251, 250, 0.00) 75%)
          `
        }}
        aria-hidden="true"
      ></div>

      {/* Hero Content Stacking Level 3 */}
      <div className="hero-content container-custom text-center relative z-[3] flex flex-col items-center">
        <h1 className="text-[36px] md:text-[clamp(36px,4.4vw,58px)] font-[900] tracking-[-0.045em] leading-[1.02] mb-5 md:mb-7 text-balance">
          <span className="text-black">Stop babysitting your marketing.</span><br />
          <span className="text-zinc-400 opacity-60">Start running your business.</span>
        </h1>

        <p className="max-w-[48ch] mx-auto text-[15px] md:text-[17px] text-zinc-600 font-medium leading-relaxed tracking-tight mb-8 md:mb-10">
          AI agents that answer every call, capture every lead, manage your reputation, and nurture customers—while you focus on running your business.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 md:gap-4 mb-12 md:mb-14">
          <button className="btn-pill bg-[#f36421] text-white px-9 py-3 border border-[#f36421] hover:bg-[#ff7a3d] hover:shadow-[0_0_40px_-10px_#f36421] transition-all text-[14px]">
            Get Your Free Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div className="w-full max-w-3xl border border-black/[0.08] rounded-[16px] grid grid-cols-2 md:grid-cols-4 bg-white/40 backdrop-blur-md overflow-hidden relative shadow-sm">
          {[
            { metric: '<30s', label: 'Response time' },
            { metric: '67%', label: 'Leads Captured' },
            { metric: '4.9★', label: 'Avg. Rating' },
            { metric: '24/7', label: 'Coverage' }
          ].map((item, i) => (
            <div key={i} className={`p-5 md:p-6 text-center relative z-10 ${i < 3 ? 'border-r border-black/[0.04]' : ''}`}>
              <div className="text-lg md:text-xl font-[900] text-black tracking-tight mb-0.5">{item.metric}</div>
              <div className="text-[7px] md:text-[8px] font-black text-black/30 uppercase tracking-[0.3em]">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};