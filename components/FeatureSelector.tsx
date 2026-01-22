
import React from 'react';

const VoiceReceptionSVG = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.15"/>
    <path d="M11 16C11 13.2386 13.2386 11 16 11C18.7614 11 21 13.2386 21 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 16C8 11.5817 11.5817 8 16 8C20.4183 8 24 11.5817 24 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <rect x="15" y="16" width="2" height="7" rx="1" fill="var(--accent-blue)"/>
    <circle cx="16" cy="11" r="1.5" fill="var(--accent-blue)" fillOpacity="0.3" className="svg-pulse" />
  </svg>
);

const LeadQualSVG = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <path d="M16 4V8M16 24V28M4 16H8M24 16H28" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="0.75" strokeOpacity="0.1" strokeDasharray="3 3"/>
    <path d="M14 16L15.5 17.5L18.5 14.5" stroke="var(--accent-orange)" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="18.5" cy="14.5" r="1.5" fill="var(--accent-orange)" className="svg-pulse" />
  </svg>
);

const AppointmentSVG = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <rect x="6" y="8" width="20" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M6 14H26" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.2"/>
    <path d="M10 6V10M22 6V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="18" y="18" width="4" height="4" rx="1" fill="var(--accent-mint)" />
    <circle cx="12" cy="18" r="1" fill="currentColor" fillOpacity="0.3" />
    <path d="M18 18L22 22M22 18L18 22" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
  </svg>
);

const ReviewSVG = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
    <path d="M16 4L19.5 12H28L21 17L23.5 25L16 20L8.5 25L11 17L4 12H12.5L16 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <circle cx="16" cy="14" r="2" stroke="var(--accent-orange)" strokeWidth="1" fill="var(--accent-orange)" fillOpacity="0.1" className="svg-pulse" />
    <path d="M12 21H20" stroke="currentColor" strokeWidth="1.25" strokeOpacity="0.2" strokeLinecap="round"/>
  </svg>
);

const CapabilityTile = ({ title, icon: Icon, color, desc }: { title: string, icon: React.ComponentType, color: string, desc: string }) => (
  <div className="group cursor-pointer hover-lift">
    <div className="h-28 rounded-t-[12px] border border-black/[0.08] border-b-0 bg-white/60 backdrop-blur-sm relative overflow-hidden transition-all group-hover:bg-white/80">
       <div className="absolute inset-x-0 top-0 h-8 border-b border-black/[0.03] bg-black/[0.01] flex items-center px-3">
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-black/10"></div>
             <div className="w-1 h-1 rounded-full bg-black/10"></div>
          </div>
       </div>
       <div className="absolute inset-0 mt-8 flex flex-col items-center justify-center p-3">
          <div className="w-10 h-10 rounded-[10px] border border-black/[0.05] bg-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform mb-1.5 text-black/80">
             <Icon />
          </div>
          <span className="text-[9px] text-zinc-500 font-black uppercase tracking-widest px-1.5 py-0.5 border border-black/5 bg-white/50 rounded-full">{color}</span>
       </div>
    </div>
    <div className="p-4 border border-black/[0.08] rounded-b-[12px] bg-white group-hover:border-black/20 transition-all shadow-sm">
      <div className="text-[14px] font-bold text-black mb-1.5 tracking-tight group-hover:text-black/80">{title}</div>
      <p className="text-[11px] text-zinc-500 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

export const FeatureSelector: React.FC = () => {
  return (
    <div className="container-custom">
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-6 relative">
         <div className="max-w-xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-[1px] bg-[#eb00ff] opacity-40"></div>
              <span className="text-[11px] font-bold text-black/40 uppercase tracking-widest">Enterprise Infrastructure</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-[900] tracking-tighter text-black mb-2">Autonomous Marketing Stack</h2>
            <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed tracking-tight">Everything your team does manually, our agents do instantly and accurately, 24/7.</p>
         </div>
         <div className="flex flex-col items-end gap-3 w-full md:w-auto">
            <button className="btn-pill bg-black text-white w-full md:min-w-[240px] hover:bg-[#f36421] transition-colors border border-black">
               Start Your Free Audit
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="ml-auto"><path d="M9 18l6-6-6-6"/></svg>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         <CapabilityTile title="Voice Reception" icon={VoiceReceptionSVG} color="v2.4 Active" desc="AI voice agents that handle high-volume inbound calls with zero latency and high clarity." />
         <CapabilityTile title="Lead Qualification" icon={LeadQualSVG} color="High Precision" desc="Instant filtering and CRM updates based on natural conversation flow and business rules." />
         <CapabilityTile title="Appointment Booking" icon={AppointmentSVG} color="Live Sync" desc="Direct calendar integration to close deals while leads are hot and engaged." />
         <CapabilityTile title="Review Harvesting" icon={ReviewSVG} color="Auto-Pilot" desc="Solicit and respond to reviews automatically to build massive social proof while you sleep." />
      </div>
    </div>
  );
};
