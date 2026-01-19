
import React from 'react';

const Step = ({ num, title, desc }: { num: string, title: string, desc: string }) => (
  <div className="flex flex-col group relative z-10">
    <div className="mb-8 flex items-baseline gap-4">
      <span className="text-5xl font-[900] text-black tracking-tighter group-hover:text-blue-600 transition-colors duration-500">{num}</span>
      <div className="h-[1px] flex-grow bg-black/[0.08] group-hover:bg-black/20 transition-colors duration-500"></div>
    </div>
    <div className="p-8 bg-white border border-black/[0.08] rounded-[12px] group-hover:border-black/20 transition-all duration-500 h-full shadow-sm hover:shadow-md">
      <h3 className="text-lg font-bold text-black mb-3 uppercase tracking-tighter">{title}</h3>
      <p className="text-warm text-[14px] leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-32 relative">
      <div className="container-custom">
        <div className="text-center mb-24">
          <span className="text-[11px] font-black tracking-[0.4em] text-zinc-400 uppercase mb-4 block">How it works</span>
          <h2 className="text-4xl md:text-[64px] font-[900] tracking-[-0.05em] text-black mb-8 leading-none">
            Live in 48 hours.<br />
            <span className="text-zinc-400 text-balance">No IT department required.</span>
          </h2>
          <p className="text-warm text-lg max-w-2xl mx-auto tracking-tight font-medium leading-relaxed">
            From audit to deployment, we follow a rigorous framework to ensure your agents are optimized for peak conversion.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
           <Step num="01" title="Audit" desc="We analyze your current lead flow and find the gaps where revenue is leaking." />
           <Step num="02" title="Configure" desc="Custom voice, responses, and workflows built specifically to your business goals." />
           <Step num="03" title="Deploy" desc="Agents go live across phone, chat, and SMS in under 48 hours with full integration." />
           <Step num="04" title="Optimize" desc="Weekly reviews, performance tuning, and expansion as your lead capture grows." />
        </div>

        <div className="mt-24 text-center">
          <button className="btn-pill bg-black text-white px-12 py-4">
            Get Your Free Audit
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
};
