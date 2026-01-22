
import React from 'react';

const CaptureIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 70H180" stroke="rgba(0,0,0,0.05)" strokeWidth="1.25" strokeDasharray="4 4" />
    <circle cx="40" cy="70" r="12" stroke="var(--accent-blue)" strokeWidth="1.5" />
    {/* Pattern 2: Pulse */}
    <circle cx="40" cy="70" r="4" fill="var(--accent-blue)" className="svg-pulse" />
    <path d="M52 70H88" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="88" y="55" width="24" height="30" rx="4" stroke="rgba(0,0,0,0.2)" strokeWidth="1.5" />
    {/* Pattern 2: Dash Drift */}
    <path d="M112 70H160" stroke="rgba(0,0,0,0.15)" strokeWidth="1.5" strokeLinecap="round" className="svg-dash" />
    <path d="M154 64L160 70L154 76" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="80" y="20" width="40" height="2" rx="1" fill="rgba(0,0,0,0.03)" />
    <rect x="80" y="118" width="40" height="2" rx="1" fill="rgba(0,0,0,0.03)" />
  </svg>
);

const ReputationIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 100L80 40L120 70L160 30" stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" />
    <rect x="30" y="30" width="140" height="80" rx="8" stroke="rgba(0,0,0,0.1)" strokeWidth="1.25" />
    <path d="M70 120H130" stroke="rgba(0,0,0,0.05)" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="100" cy="70" r="28" stroke="var(--accent-orange)" strokeWidth="1.5" strokeDasharray="3 3" />
    {/* Pattern 2: Pulse */}
    <path d="M88 70L96 78L112 62" stroke="var(--accent-orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="svg-pulse" />
    <circle cx="50" cy="50" r="3" fill="rgba(0,0,0,0.05)" />
    <circle cx="150" cy="90" r="3" fill="rgba(0,0,0,0.05)" />
  </svg>
);

const LifecycleIllustration = () => (
  <svg width="100%" height="100%" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="30" width="160" height="80" rx="6" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
    <path d="M20 50H180" stroke="rgba(0,0,0,0.06)" strokeWidth="1.25" />
    <path d="M60 30V110" stroke="rgba(0,0,0,0.06)" strokeWidth="1.25" />
    <path d="M100 30V110" stroke="rgba(0,0,0,0.06)" strokeWidth="1.25" />
    <path d="M140 30V110" stroke="rgba(0,0,0,0.06)" strokeWidth="1.25" />
    <rect x="70" y="60" width="60" height="30" rx="4" fill="var(--accent-mint)" fillOpacity="0.1" stroke="var(--accent-mint)" strokeWidth="1.5" />
    <path d="M80 75H120" stroke="var(--accent-mint)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 4" />
    {/* Pattern 2: Pulse */}
    <circle cx="100" cy="60" r="4" fill="var(--accent-mint)" className="svg-pulse" />
    <path d="M30 40H50M70 40H90M110 40H130M150 40H170" stroke="rgba(0,0,0,0.2)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ProductCard = ({ title, desc, label, accentColor, illustration: Illustration }: { title: string, desc: string, label: string, accentColor: string, illustration: React.ComponentType }) => (
  <div className="p-6 md:p-8 flex flex-col h-full group transition-all duration-300 relative bg-white hover:bg-neutral-50/30 hover-lift overflow-hidden">
    {/* Pattern 3: Light Catch Drift */}
    <div className="absolute top-0 left-0 w-full h-[1px] light-catch opacity-50 z-20"></div>

    <div className="relative z-10 mb-auto">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }}></span>
        <span className="text-[10px] font-[900] text-black/30 uppercase tracking-[0.3em]">{label}</span>
      </div>
      <h3 className="text-xl font-[900] text-black tracking-tighter mb-3">{title}</h3>
      <p className="text-[14px] text-zinc-500 leading-relaxed mb-6 font-medium tracking-tight">{desc}</p>

      <div className="mt-auto mb-4">
        <button className="w-9 h-9 rounded-full border border-black/5 bg-white flex items-center justify-center hover:border-black/20 transition-all shadow-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div className="w-full aspect-[1.4/1] rounded-[10px] border border-black/[0.05] bg-[#fafafa] relative overflow-hidden group-hover:border-black/10 transition-colors">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
        <div className="absolute inset-x-6 bottom-0 top-8 bg-white rounded-t-lg border-x border-t border-black/[0.06] shadow-sm overflow-hidden flex items-center justify-center p-2">
           <Illustration />
        </div>
      </div>
    </div>
  </div>
);

export const PlatformSection: React.FC = () => {
  return (
    <div className="container-custom" id="platform">
      <div className="mb-8">
        <p className="text-[10px] font-black tracking-[0.5em] text-zinc-400 uppercase mb-4">The Platform</p>
        <h2 className="text-3xl md:text-5xl font-[900] tracking-tighter text-black mb-5">Three agents. <span className="text-black/30">Zero gaps.</span></h2>
        <p className="text-zinc-600 text-[17px] max-w-2xl tracking-tight font-medium leading-relaxed">
          Deploy autonomous AI that handles the work you can't get to—and the work you didn't know you were missing.
        </p>
      </div>

      <div className="border border-black/[0.08] rounded-[16px] grid md:grid-cols-3 relative overflow-hidden shadow-sm bg-white">
        <ProductCard 
          label="Capture Agent"
          title="Speed-to-lead" 
          desc="Voice AI, chat, and SMS that never sleeps. Every call answered. Every lead qualified. Every appointment booked instantly." 
          accentColor="var(--accent-blue)"
          illustration={CaptureIllustration}
        />
        <div className="md:border-x border-black/[0.04]">
          <ProductCard 
            label="Reputation Agent"
            title="Social proof" 
            desc="Automated review requests timed to peak satisfaction. AI-crafted responses to every review. Your 5-star count grows while you sleep." 
            accentColor="var(--accent-orange)"
            illustration={ReputationIllustration}
          />
        </div>
        <ProductCard 
          label="Lifecycle Agent"
          title="Revenue on autopilot" 
          desc="Nurture sequences, reactivation campaigns, and retention flows that run without your involvement. Turn past customers into repeat buyers." 
          accentColor="var(--accent-mint)"
          illustration={LifecycleIllustration}
        />
      </div>
      
      <div className="border border-black/[0.08] border-t-0 rounded-b-[16px] p-6 md:p-10 flex flex-col md:flex-row gap-8 items-center bg-white/40 backdrop-blur-sm">
         <div className="flex-grow max-w-xl text-left">
            <div className="flex items-center gap-3 mb-4">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/15"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span className="text-[11px] font-[900] text-black/40 uppercase tracking-[0.35em]">Deployment</span>
            </div>
            <h3 className="text-xl md:text-2xl font-[900] tracking-tighter text-black mb-5 leading-snug">
              Live in 48 hours. <span className="text-black/30">Deep CRM integration. Zero IT overhead.</span>
            </h3>
            <button className="btn-pill bg-black text-white">
              Get Your Free Audit
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
         </div>
         <div className="w-full md:w-[220px] aspect-square border border-black/[0.08] rounded-xl bg-white shadow-sm flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
            <div className="relative w-24 h-24 flex items-center justify-center">
               <div className="absolute inset-0 border border-black/[0.04] rounded-full animate-[spin_20s_linear_infinite]"></div>
               <div className="absolute inset-4 border border-black/[0.06] rounded-full animate-[spin_12s_linear_infinite_reverse]"></div>
               <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white shadow-2xl z-10 group-hover:scale-110 transition-transform duration-500">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
