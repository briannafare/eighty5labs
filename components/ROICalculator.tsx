
import React, { useState } from 'react';

export const ROICalculator: React.FC = () => {
  const [calls, setCalls] = useState(50);
  const [missRate, setMissRate] = useState(25);
  const [ticketValue, setTicketValue] = useState(500);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ email: '', phone: '', name: '' });
  const [submitted, setSubmitted] = useState(false);

  const monthlyLoss = Math.round(calls * 4.3 * (missRate / 100) * ticketValue);
  const recoveryValue = Math.round(monthlyLoss * 0.67);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Replace with your GHL webhook URL
    // await fetch('https://services.leadconnectorhq.com/hooks/YOUR_WEBHOOK_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     ...formData,
    //     custom_field_weekly_calls: calls,
    //     custom_field_miss_rate: missRate,
    //     custom_field_ticket_value: ticketValue,
    //     custom_field_monthly_loss: monthlyLoss,
    //     custom_field_recovery_potential: recoveryValue,
    //     tags: ['roi-calculator', 'website-lead']
    //   })
    // });
    
    console.log('Lead captured:', { ...formData, calls, missRate, ticketValue, monthlyLoss, recoveryValue });
    setSubmitted(true);
  };

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container-custom">
        <div className="framed-section grid lg:grid-cols-[1.3fr_1.7fr] min-h-[500px] shadow-sm">
          <div className="p-12 md:p-16 border-r border-black/[0.08] flex flex-col justify-center bg-white">
            <div className="flex items-center gap-3 mb-8">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f36421" strokeWidth="2.5" className="opacity-60"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
              <span className="text-[12px] font-black text-black/40 uppercase tracking-widest">Recovery Engine</span>
            </div>
            <h2 className="text-[36px] md:text-[48px] font-black tracking-tighter text-black leading-[1.1] mb-12">
              What's it actually worth? <span className="text-black/30">Stop guessing. See what agents recover.</span>
            </h2>
            
            <div className="space-y-8 max-w-sm">
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-widest">Weekly Calls</label>
                  <span className="text-sm font-bold text-black">{calls}</span>
                </div>
                <input type="range" min="10" max="200" value={calls} onChange={e => setCalls(Number(e.target.value))} className="w-full h-1.5 bg-black/[0.05] rounded-full appearance-none cursor-pointer" style={{accentColor: 'var(--accent-orange)'}} />
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-widest">Estimated Miss Rate</label>
                  <span className="text-sm font-bold text-black">{missRate}%</span>
                </div>
                <input type="range" min="5" max="60" value={missRate} onChange={e => setMissRate(Number(e.target.value))} className="w-full h-1.5 bg-black/[0.05] rounded-full appearance-none cursor-pointer" style={{accentColor: 'var(--accent-blue)'}} />
              </div>
              <div>
                <div className="flex justify-between mb-3">
                  <label className="text-[11px] font-black text-black/40 uppercase tracking-widest">Avg Ticket Value</label>
                  <span className="text-sm font-bold text-black">${ticketValue}</span>
                </div>
                <input type="range" min="50" max="2000" step="50" value={ticketValue} onChange={e => setTicketValue(Number(e.target.value))} className="w-full h-1.5 bg-black/[0.05] rounded-full appearance-none cursor-pointer" style={{accentColor: 'var(--accent-mint)'}} />
              </div>
            </div>
          </div>

          <div className="bg-[#fafafa] relative flex items-center justify-center p-8 md:p-16">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="w-full max-w-lg bg-white rounded-xl border border-black/[0.08] shadow-xl p-10 relative z-10 overflow-hidden">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-black/[0.03]">
                  <div className="text-[10px] font-black text-black/40 uppercase tracking-widest">Missed Rev</div>
                  <div className="px-3 py-1 bg-[#f36421]/5 rounded-full text-[9px] font-bold text-[#f36421] uppercase tracking-widest">autonomous capture</div>
                  <div className="text-[10px] font-black text-black/40 uppercase tracking-widest">Recovered</div>
               </div>
               
               <div className="space-y-4 mb-12">
                  {[
                    { color: 'var(--accent-blue)', active: 60 },
                    { color: 'var(--accent-orange)', active: 40 },
                    { color: 'var(--accent-mint)', active: 85 },
                    { color: 'var(--accent-magenta)', active: 55 }
                  ].map((line, i) => (
                    <div key={i} className="flex items-center gap-0 group">
                       <div className="h-[1px] bg-zinc-200" style={{ width: '15%' }}></div>
                       <div className="h-[1px] opacity-20 group-hover:opacity-60 transition-opacity" style={{ backgroundColor: line.color, width: `${line.active}%` }}></div>
                       <div className="h-[1px] flex-grow border-t border-dotted border-black/10"></div>
                       <div className="h-[2px] shadow-[0_0_8px_rgba(0,0,0,0.05)]" style={{ backgroundColor: line.color, width: '25%' }}></div>
                    </div>
                  ))}
               </div>

               {!showForm && !submitted && (
                 <div className="text-center">
                    <div className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-2">Monthly Potential Recovery</div>
                    <div className="text-6xl font-[900] text-black tracking-tighter mb-10">${recoveryValue.toLocaleString()}</div>
                    <button 
                      onClick={() => setShowForm(true)}
                      className="btn-pill bg-[#f36421] text-white w-full border border-[#f36421] hover:shadow-[0_0_30px_-10px_#f36421] transition-shadow"
                    >
                      Get Your Custom Analysis →
                    </button>
                 </div>
               )}

               {showForm && !submitted && (
                 <div className="text-center">
                    <div className="text-[11px] font-bold text-black/40 uppercase tracking-[0.2em] mb-2">Your Potential Recovery</div>
                    <div className="text-5xl font-[900] text-black tracking-tighter mb-6">${recoveryValue.toLocaleString()}<span className="text-lg text-black/40">/mo</span></div>
                    
                    <form onSubmit={handleSubmit} className="space-y-4 text-left">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Your name"
                          value={formData.name}
                          onChange={e => setFormData({...formData, name: e.target.value})}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-[#f36421]/50 focus:ring-2 focus:ring-[#f36421]/10"
                        />
                      </div>
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email address"
                          value={formData.email}
                          onChange={e => setFormData({...formData, email: e.target.value})}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-[#f36421]/50 focus:ring-2 focus:ring-[#f36421]/10"
                        />
                      </div>
                      <div>
                        <input 
                          type="tel" 
                          placeholder="Phone number"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                          required
                          className="w-full px-4 py-3 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-[#f36421]/50 focus:ring-2 focus:ring-[#f36421]/10"
                        />
                      </div>
                      <button 
                        type="submit"
                        className="btn-pill bg-[#f36421] text-white w-full border border-[#f36421] hover:shadow-[0_0_30px_-10px_#f36421] transition-shadow py-3"
                      >
                        Send My Analysis
                      </button>
                      <p className="text-[11px] text-black/40 text-center mt-3">We'll send your personalized audit within 24 hours.</p>
                    </form>
                 </div>
               )}

               {submitted && (
                 <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    </div>
                    <div className="text-2xl font-bold text-black mb-2">Analysis incoming!</div>
                    <p className="text-black/50 text-sm">Check your email for your personalized ${recoveryValue.toLocaleString()}/mo recovery breakdown.</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
