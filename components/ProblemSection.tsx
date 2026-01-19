
import React from 'react';

export const ProblemSection: React.FC = () => {
  return (
    <div className="container-custom">
      <div className="border border-black/[0.08] rounded-[16px] p-12 md:p-20 mb-8 shadow-sm relative group overflow-hidden bg-white/60 backdrop-blur-sm">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00dfd8] opacity-[0.03] blur-[100px] pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row justify-between items-baseline gap-12 md:gap-24 relative z-10">
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-[#00dfd8]"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-black/40 uppercase">The Reality</span>
            </div>
            <h2 className="text-[36px] md:text-[56px] font-[900] tracking-tighter text-black leading-[1] mb-8 text-balance">
              You're not losing to better competitors. <span className="text-black/30">You're losing to faster systems.</span>
            </h2>
          </div>
          <p className="text-[20px] text-zinc-500 max-w-[34ch] tracking-tight font-medium leading-relaxed text-left">
            Your team checks voicemail once a day. Your competitor's AI checked it 47 times while you were at lunch.
          </p>
        </div>
      </div>

      <div className="border border-black/[0.08] rounded-[16px] grid sm:grid-cols-2 lg:grid-cols-3 bg-white/40 backdrop-blur-md shadow-sm relative overflow-hidden">
        {[
          { stat: "62%", label: "Lead Churn", desc: "Leads go cold within 30 minutes of missed initial contact." },
          { stat: "40%", label: "Missed Calls", desc: "Average small business fails to answer 4 out of 10 incoming calls." },
          { stat: "88%", label: "Trust Level", desc: "Customers trust online reviews as much as personal recommendations." }
        ].map((item, i) => (
          <div key={i} className={`p-12 text-left hover:bg-white/60 transition-all relative z-10 ${i < 2 ? 'lg:border-r border-black/[0.04]' : ''} ${i % 2 === 0 ? 'sm:border-r lg:border-r-0' : ''}`}>
            <div className="text-6xl font-[900] text-black tracking-tighter mb-5">{item.stat}</div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black/30 mb-4">{item.label}</h4>
            <p className="text-[15px] text-zinc-500 leading-relaxed font-medium tracking-tight">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
