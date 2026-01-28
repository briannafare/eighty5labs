
import React from 'react';

const FooterColumn = ({ title, links }: { title: string, links: {label: string, href: string}[] }) => (
  <div className="space-y-6">
    <h4 className="text-[13px] font-bold text-black uppercase tracking-widest">{title}</h4>
    <ul className="space-y-4">
      {links.map((link, i) => (
        <li key={i}><a href={link.href} className="text-[14px] text-zinc-500 hover:text-black transition-colors">{link.label}</a></li>
      ))}
    </ul>
  </div>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-24 border-t border-black/[0.05]">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 text-[16px] font-bold tracking-tight text-black mb-6">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
              eighty5labs
            </a>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              Agentic marketing infrastructure for businesses that refuse to miss revenue.
            </p>
          </div>
          
          <FooterColumn 
            title="Platform" 
            links={[
              { label: 'Capture', href: '#platform' },
              { label: 'Reputation', href: '#platform' },
              { label: 'Lifecycle', href: '#platform' },
            ]} 
          />
          
          <FooterColumn
            title="Company"
            links={[
              { label: 'About', href: '#' },
              { label: 'Contact', href: 'mailto:bri@eighty5labs.com' },
              { label: 'SMS Opt-In', href: '#/optin' },
            ]}
          />
          
          <FooterColumn 
            title="Connect" 
            links={[
              { label: 'Twitter', href: '#' },
              { label: 'LinkedIn', href: '#' },
            ]} 
          />
        </div>

        <div className="mt-16 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/[0.05] gap-6">
          <span className="text-[13px] text-black/40 font-medium">© 2026 eighty5labs (Aida LLC)</span>
          <div className="flex items-center gap-6">
            <a href="#/privacy" className="text-[13px] text-black/40 hover:text-black transition-colors">Privacy Policy</a>
            <a href="#/terms" className="text-[13px] text-black/40 hover:text-black transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
