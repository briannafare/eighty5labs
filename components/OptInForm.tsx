
import React, { useState } from 'react';

export const OptInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    smsConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.smsConsent) {
      setError('You must agree to receive SMS messages to subscribe.');
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/94bbb4c3-cab5-4aef-98f3-754b9e225ae8';

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          sms_consent: formData.smsConsent,
          consent_timestamp: new Date().toISOString(),
          source: 'sms-optin-form',
          tags: ['sms-optin', 'sms-consent']
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
        <div className="max-w-2xl mx-auto">
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
              Eighty5Labs &ndash; Appointment Updates &amp; SMS Alerts
            </h1>
            <p className="text-sm text-zinc-600 max-w-lg mx-auto leading-relaxed">
              Eighty5Labs is a DBA of Aida LLC. Use this form to join the Eighty5 Labs SMS program for updates related to our services.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-6 md:p-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1.5">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1.5">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1.5">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1.5">
                      Mobile Phone Number *
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(503) 555-0123"
                      className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Company (Optional) */}
                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-1.5">
                    Company Name (Optional)
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company"
                    className="w-full px-4 py-2.5 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                {/* SMS Consent Checkbox */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-[#f9f9f9] border border-black/[0.05]">
                  <input
                    id="smsConsent"
                    type="checkbox"
                    checked={formData.smsConsent}
                    onChange={(e) => setFormData({ ...formData, smsConsent: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded border-black/20 text-[#f36421] focus:ring-[#f36421] flex-shrink-0"
                  />
                  <label htmlFor="smsConsent" className="text-sm text-zinc-700 leading-relaxed">
                    By checking this box and submitting this form, I agree to receive recurring SMS messages from Eighty5Labs at the phone number provided, including appointment reminders, confirmations, and occasional promotional messages. Message frequency varies. Message and data rates may apply. Text STOP to cancel, HELP for help.
                  </label>
                </div>

                {/* Opt-Out Instructions */}
                <p className="text-xs text-zinc-500 leading-relaxed">
                  You can opt out at any time. Text STOP to cancel. Text HELP for help.
                </p>

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
                  className="w-full btn-pill bg-[#f36421] text-white py-3.5 text-base font-bold border border-[#f36421] hover:bg-[#ff7a3d] hover:shadow-[0_0_40px_-10px_#f36421] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Subscribe to Text Messages'}
                </button>

                {/* Message Frequency & Data Rates Disclosure */}
                <p className="text-center text-xs text-zinc-500 font-medium">
                  Message frequency varies. Message and data rates may apply.
                </p>

                {/* Privacy & Terms Links */}
                <p className="text-center text-xs text-zinc-500 leading-relaxed">
                  By submitting this form you agree to our{' '}
                  <a href="#/privacy" className="text-[#f36421] hover:underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#/terms" className="text-[#f36421] hover:underline">Terms &amp; Conditions</a>.
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-black mb-3">You're Subscribed!</h2>
                <p className="text-zinc-600 mb-6 max-w-sm mx-auto">
                  Thank you for signing up. You'll start receiving text messages from Eighty5 Labs.
                </p>
                <div className="bg-[#fafafa] rounded-lg p-4 text-sm text-zinc-600 max-w-sm mx-auto">
                  <p className="mb-2"><strong>Remember:</strong></p>
                  <p>Reply <strong>STOP</strong> to opt out anytime</p>
                  <p>Reply <strong>HELP</strong> for assistance</p>
                </div>
                <a
                  href="#/"
                  className="inline-block mt-8 btn-pill bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-black/80 transition-colors"
                >
                  Return to Homepage
                </a>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-center text-sm text-zinc-500">
            <p className="font-semibold text-black mb-1">Eighty5 Labs (Aida LLC)</p>
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
