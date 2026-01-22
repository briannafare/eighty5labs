
import React, { useState, useEffect } from 'react';

export const InteractiveDemo: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [activeScenario, setActiveScenario] = useState('After-hours');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const scenarios = {
    'Emergency': [
      { from: 'User', text: 'Hey, I have a massive pipe burst in my kitchen, can someone help?' },
      { from: 'Chloe', text: 'I understand this is an emergency. I have your location on file—is this for the Main St address?' },
      { from: 'User', text: 'Yes! Please hurry.' },
      { from: 'Chloe', text: 'I’ve prioritized your ticket. Dispatch is notified. I’m booking an emergency technician for 15 minutes from now. You’ll get a confirmation SMS shortly.' }
    ],
    'After-hours': [
      { from: 'User', text: 'Hello, looking for a quote for a new roof installation.' },
      { from: 'Chloe', text: 'Hi! I can certainly help with that. To get an accurate quote, how many square feet is your property?' },
      { from: 'User', text: 'About 2,400 sq ft.' },
      { from: 'Chloe', text: 'Perfect. I have a slot available tomorrow at 2 PM for an inspector to visit. Does that work?' },
      { from: 'User', text: 'Yes, that works.' },
      { from: 'Chloe', text: 'Excellent. Appointment booked for tomorrow at 2 PM. I’ve updated your CRM profile with the details.' }
    ],
    'Routine': [
      { from: 'User', text: 'I need to reschedule my maintenance for next week.' },
      { from: 'Chloe', text: 'No problem! Let me pull up your current booking... I see it on Tuesday. What day next week works better?' }
    ]
  };

  useEffect(() => {
    setMessages([]);
    setCompletedSteps([]);
    let timeout: any;
    const scenario = scenarios[activeScenario as keyof typeof scenarios];
    
    scenario.forEach((msg, i) => {
      timeout = setTimeout(() => {
        setMessages(prev => [...prev, msg]);
        if (i === 1) setCompletedSteps(prev => [...prev, 'Lead qualified']);
        if (i === 3) setCompletedSteps(prev => [...prev, 'Appointment booked', 'Confirmation sent', 'CRM updated']);
      }, i * 1500);
    });

    return () => clearTimeout(timeout);
  }, [activeScenario]);

  return (
    <section className="border-t border-black/[0.04]">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[11px] font-black tracking-[0.4em] text-zinc-400 uppercase mb-3 block">Interactive Demo</span>
            <h2 className="text-4xl md:text-5xl font-[900] tracking-tight text-black mb-4">This is Chloe.</h2>
            <p className="text-lg md:text-xl text-warm mb-6 font-medium tracking-tight">She's not a person—she's your 24/7 AI receptionist.</p>

            <ul className="space-y-3 mb-6">
              {['Answer a call', 'Qualify the lead', 'Book an appointment', 'Send confirmation'].map(item => (
                <li key={item} className="flex items-center gap-2.5 text-black font-bold text-base md:text-lg tracking-tight">
                  <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center">
                    <svg className="text-white" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <p className="text-base md:text-lg font-bold text-black mb-6">All in under 90 seconds.</p>

            <div className="flex gap-2 mb-6">
              {['Emergency', 'Routine', 'After-hours'].map(sc => (
                <button 
                  key={sc}
                  onClick={() => setActiveScenario(sc)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${activeScenario === sc ? 'bg-black text-white border-black' : 'bg-white text-[#666] border-[#eaeaea] hover:border-black'}`}
                >
                  {sc}
                </button>
              ))}
            </div>
            
            <a href="tel:+15035551234" className="inline-flex items-center gap-2 text-sm font-bold text-black border-b border-black/10 pb-1 hover:border-black transition-all">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call the demo line →
            </a>
          </div>

          <div className="relative">
             <div className="bg-black rounded-[16px] overflow-hidden shadow-2xl border border-zinc-800">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-zinc-900 border-b border-zinc-800">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                  <span className="text-[10px] font-mono text-zinc-500 ml-4">Chloe AI - Live Call Transcription</span>
                </div>
                <div className="p-8 h-[400px] overflow-y-auto font-mono text-[13px] space-y-6">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.from === 'Chloe' ? 'items-start' : 'items-end'}`}>
                      <span className={`text-[10px] font-black uppercase mb-1 tracking-widest ${msg.from === 'Chloe' ? 'text-blue-500' : 'text-zinc-500'}`}>
                        {msg.from}
                      </span>
                      <div className={`max-w-[85%] p-4 rounded-[12px] ${msg.from === 'Chloe' ? 'bg-zinc-800/50 text-white border border-white/5' : 'bg-blue-600/10 text-blue-100 border border-blue-500/10'}`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
             </div>

             <div className="absolute -bottom-8 -right-8 bg-white border border-black/[0.08] rounded-[16px] p-6 shadow-2xl w-64 reveal active">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-black/30">Automation Log</h4>
                <div className="space-y-3">
                  {['Lead qualified', 'Appointment booked', 'Confirmation sent', 'CRM updated'].map(step => (
                    <div key={step} className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${completedSteps.includes(step) ? 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-neutral-50 border-neutral-200'}`}>
                        {completedSteps.includes(step) && <svg className="text-white w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M20 6L9 17l-5-5"/></svg>}
                      </div>
                      <span className={`text-[11px] font-bold ${completedSteps.includes(step) ? 'text-black' : 'text-zinc-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
