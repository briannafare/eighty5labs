
import React, { useState } from 'react';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    website: '',
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Replace with your actual GHL webhook URL
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/30a44d56-e446-4edb-b46c-35ea27a538cd';

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          website: formData.website,
          business_name: 'eighty5labs',
          source: 'website',
          tags: ['website-lead', 'free-audit']
        })
      });

      console.log('Lead captured:', formData);
      setSubmitted(true);

      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ fullName: '', email: '', phone: '', website: '', consent: false });
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-[slideUp_0.3s_ease-out]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
          aria-label="Close modal"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        {!submitted ? (
          <>
            <h3 className="text-2xl font-[900] tracking-tighter text-black mb-2">Get Your Free Audit</h3>
            <p className="text-sm text-zinc-600 mb-6">See exactly how much revenue you're leaving on the table.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                  Phone *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Phone"
                  className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                />
              </div>

              <div>
                <label htmlFor="website" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                  Your website
                </label>
                <input
                  id="website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  placeholder="https://www.example.com"
                  className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                />
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                  className="mt-1 w-4 h-4 rounded border-black/20 text-[#f36421] focus:ring-[#f36421]"
                />
                <label htmlFor="consent" className="text-xs text-zinc-600 leading-relaxed">
                  I confirm that I want to receive messages from eighty5labs using the contact information provided.
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-pill bg-[#f36421] text-white py-4 text-base font-bold border border-[#f36421] hover:bg-[#ff7a3d] hover:shadow-[0_0_40px_-10px_#f36421] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Claim Your Free Audit'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-black mb-2">Thank you!</h4>
            <p className="text-zinc-600">We'll be in touch within 24 hours with your personalized audit.</p>
          </div>
        )}
      </div>
    </div>
  );
};
