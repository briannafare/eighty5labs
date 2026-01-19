
import React from 'react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-48 md:py-64 bg-black text-white relative overflow-hidden">
      {/* Vercel-style emotional Peak Glow */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, var(--accent-orange) 0%, transparent 60%)',
          filter: 'blur(160px)'
        }}
      ></div>
      
      {/* Structural grid on dark */}
      <div className="absolute inset-0 opacity-[0.05] invert" style={{ 
        backgroundImage: 'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }}></div>
      
      <div className="container-custom text-center relative z-10 flex flex-col items-center">
        <h2 className="text-[48px] md:text-[96px] font-[900] tracking-[-0.075em] mb-14 leading-[0.88] text-balance">
          Your marketing runs itself.<br />
          <span className="text-zinc-600">Your revenue doesn't sleep.</span>
        </h2>
        
        <p className="text-[19px] md:text-[24px] text-zinc-400 mb-20 max-w-[48ch] mx-auto font-medium tracking-tight leading-relaxed">
          Get a free audit of your lead flow, response times, and revenue gaps. Deploy your first agent in under 48 hours.
        </p>

        <div className="flex flex-col items-center gap-10">
          <button className="btn-pill bg-[#f36421] text-white hover:shadow-[0_0_60px_-10px_#f36421] border border-[#f36421] px-16 py-5 text-[18px]">
            Get Your Free Audit
          </button>
          
          <div className="flex items-center gap-10 py-3 px-10 border border-white/[0.08] rounded-full bg-white/[0.02] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00dfd8] animate-pulse"></div>
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">
                Live deployment ready
              </p>
            </div>
            <div className="h-4 w-[1px] bg-white/[0.12]" />
            <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.4em]">
              No credit card required
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 w-[1600px] h-[800px] bg-white/[0.03] blur-[180px] rounded-full"></div>
    </section>
  );
};
