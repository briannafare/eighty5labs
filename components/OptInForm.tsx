
import React, { useState } from 'react';

export const OptInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    marketingConsent: false,
    nonMarketingConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/94bbb4c3-cab5-4aef-98f3-754b9e225ae8';

      const tags = ['sms-optin'];
      if (formData.marketingConsent) tags.push('marketing-consent');
      if (formData.nonMarketingConsent) tags.push('transactional-consent');

      // Parse full name into first/last
      const nameParts = formData.fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.fullName,
          first_name: firstName,
          last_name: lastName,
          email: formData.email,
          phone: formData.phone,
          marketing_consent: formData.marketingConsent,
          transactional_consent: formData.nonMarketingConsent,
          consent_timestamp: new Date().toISOString(),
          source: 'sms-optin-form',
          tags
        })
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] py-6 md:py-10">
      <div className="container-custom">
        <div className="max-w-xl mx-auto">
          {/* Logo */}
          <div className="text-center mb-4">
            <a href="#/" className="inline-flex items-center gap-2 text-[18px] font-bold tracking-tight text-black">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
              eighty5labs
            </a>
          </div>

          {/* A2P 10DLC Compliant Heading */}
          <div className="text-center mb-5">
            <h1 className="text-[clamp(22px,3.5vw,32px)] font-[900] tracking-tighter text-black mb-2">
              Aida LLC &ndash; Appointment Updates &amp; SMS Alerts
            </h1>
            <p className="text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed">
              Aida LLC. Use this form to join the Aida LLC SMS program for updates related to our services.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-6 md:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-black mb-1.5">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Type your full name"
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-black mb-1.5">
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                {/* Phone Number (NOT required) */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-black mb-1.5">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Enter your phone number here"
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-white text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                {/* Marketing Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="marketingConsent"
                    type="checkbox"
                    checked={formData.marketingConsent}
                    onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[#f36421] focus:ring-[#f36421] flex-shrink-0"
                  />
                  <label htmlFor="marketingConsent" className="text-sm text-zinc-700 leading-relaxed">
                    I consent to receive marketing and promotional text messages from Aida LLC, DBA eighty5lab, at the phone number provided via SMS, which include special offers, discounts, and new product updates, among others. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
                  </label>
                </div>

                {/* Non-Marketing Consent Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    id="nonMarketingConsent"
                    type="checkbox"
                    checked={formData.nonMarketingConsent}
                    onChange={(e) => setFormData({ ...formData, nonMarketingConsent: e.target.checked })}
                    className="mt-1 w-4 h-4 rounded border-gray-300 text-[#f36421] focus:ring-[#f36421] flex-shrink-0"
                  />
                  <label htmlFor="nonMarketingConsent" className="text-sm text-zinc-700 leading-relaxed">
                    I consent to receive non-marketing text messages from Aida LLC, DBA eighty5lab, which may include account updates, service alerts, and support-related communications. Message frequency may vary. Message &amp; data rates may apply. Text HELP for assistance, reply STOP to opt out.
                  </label>
                </div>

                {/* Terms of Service & Privacy Policy Links */}
                <div className="text-sm">
                  <a href="#/terms" className="text-[#f36421] hover:underline font-medium">
                    Terms of Service
                  </a>
                  {' '}&amp;{' '}
                  <a href="#/privacy" className="text-[#f36421] hover:underline font-medium">
                    Privacy Policy
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#f36421] text-white py-3 text-base font-semibold rounded-lg hover:bg-[#e55a1b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-black mb-2">You're Subscribed!</h2>
                <p className="text-zinc-600 mb-4 text-sm">
                  Thank you for signing up. If you've opted in, you'll start receiving text messages from Aida LLC.
                </p>
                <div className="bg-[#fafafa] rounded-lg p-3 text-sm text-zinc-600 max-w-xs mx-auto">
                  <p className="mb-1"><strong>Remember:</strong></p>
                  <p>Reply <strong>STOP</strong> to opt out anytime</p>
                  <p>Reply <strong>HELP</strong> for assistance</p>
                </div>
                <a
                  href="#/"
                  className="inline-block mt-6 text-sm font-semibold text-[#f36421] hover:underline"
                >
                  Return to Homepage
                </a>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center text-sm text-zinc-500">
            <p className="font-semibold text-black mb-1">Aida LLC</p>
            <p>
              Email: <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a>
              {' '}|{' '}
              Phone: <a href="tel:5037043755" className="text-[#f36421] hover:underline">503-704-3755</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
