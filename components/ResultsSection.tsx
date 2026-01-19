import React from 'react';

export const ResultsSection: React.FC = () => {
  return (
    <div className="container-custom" id="results">
      <div className="grid lg:grid-cols-2 gap-16 md:gap-24 items-center text-left">
        <div>
          <p className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase mb-5">The Results</p>
          <h2 className="text-4xl md:text-6xl font-[900] text-black tracking-tighter mb-8 leading-tight">Proven Impact.</h2>
          <p className="text-zinc-600 text-[18px] md:text-[20px] font-medium tracking-tight leading-relaxed mb-10 max-w-md">
            Our autonomous infrastructure doesn't just catch leads—it optimizes your entire lifecycle to maximize lifetime value.
          </p>
          <button className="btn-pill bg-black text-white">
            Get Your Free Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-2 gap-px bg-black/[0.06] border border-black/[0.08] rounded-[16px] overflow-hidden shadow-sm bg-white/60 backdrop-blur-sm">
            {[
              { metric: '<30s', label: 'Response time', sub: 'Average' },
              { metric: '+67%', label: 'Capture rate', sub: 'Improvement' },
              { metric: '4.9★', label: 'Reputation', sub: 'Avg rating' },
              { metric: '3.2x', label: 'ROI', sub: '90 day average' },
            ].map((item, idx) => (
              <div key={idx} className="p-10 md:p-14 text-center bg-white/90 hover:bg-white transition-all duration-500 relative z-10">
                <div className="text-4xl md:text-5xl font-[900] text-black mb-3 tracking-tighter">{item.metric}</div>
                <div className="text-[9px] font-black text-black/40 uppercase tracking-[0.3em] mb-1">{item.label}</div>
                <div className="text-[9px] font-bold text-black/20 uppercase tracking-widest">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Panel - Honest version */}
      <div className="mt-24 border border-black/[0.08] rounded-[16px] p-12 md:p-16 bg-white shadow-xl relative group overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full pointer-events-none group-hover:bg-orange-500/5 transition-all duration-1000"></div>
        
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-1 mb-6">
            {[1,2,3,4,5].map(i => (
              <svg key={i} className="w-6 h-6 text-[#f36421]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          
          <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 tracking-tight">
            See what's possible for your business
          </h3>
          <p className="text-zinc-500 text-lg mb-8 font-medium">
            Every business is different. Get a personalized audit showing exactly how much revenue you're leaving on the table—and how to capture it.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="btn-pill bg-[#f36421] text-white border border-[#f36421] hover:shadow-[0_0_30px_-10px_#f36421]">
              Get Your Free Audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <span className="text-sm text-black/40">No commitment required</span>
          </div>
        </div>
      </div>
    </div>
  );
};