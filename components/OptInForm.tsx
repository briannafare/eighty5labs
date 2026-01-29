
import React, { useState } from 'react';

export const OptInForm: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    marketingConsent: false,
    transactionalConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate at least one consent is checked
    if (!formData.marketingConsent && !formData.transactionalConsent) {
      setError('Please select at least one type of message to receive.');
      return;
    }

    setIsSubmitting(true);

    try {
      const webhookUrl = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/94bbb4c3-cab5-4aef-98f3-754b9e225ae8';

      const tags = ['sms-optin'];
      if (formData.marketingConsent) tags.push('marketing-consent');
      if (formData.transactionalConsent) tags.push('transactional-consent');

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
          marketing_consent: formData.marketingConsent,
          transactional_consent: formData.transactionalConsent,
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
    <div className="min-h-screen bg-[#fbfbfa] py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <a href="#/" className="inline-flex items-center gap-2 text-[18px] font-bold tracking-tight text-black mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
              eighty5labs
            </a>
            <h1 className="text-[clamp(28px,4vw,42px)] font-[900] tracking-tighter text-black mb-4">
              SMS/Text Message Opt-In
            </h1>
            <p className="text-lg text-zinc-600 max-w-lg mx-auto">
              Sign up to receive text messages from Eighty5 Labs. We'll keep you informed with updates, promotions, and important notifications.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-8 md:p-10">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                      First Name *
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                      Last Name *
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Mobile Phone Number *
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(503) 555-0123"
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                  <p className="text-xs text-zinc-500 mt-2">
                    Enter your mobile phone number to receive SMS/text messages.
                  </p>
                </div>

                {/* Company (Optional) */}
                <div>
                  <label htmlFor="company" className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Company Name (Optional)
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Your Company"
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                {/* Divider */}
                <div className="border-t border-black/[0.08] pt-6">
                  <h3 className="text-sm font-bold text-black mb-4">Message Type Consent</h3>
                  <p className="text-sm text-zinc-600 mb-4">
                    Select the types of messages you would like to receive (optional - not required to purchase):
                  </p>

                  {/* Marketing Consent Checkbox */}
                  <div className="flex items-start gap-3 mb-4 p-4 rounded-lg bg-[#f9f9f9] border border-black/[0.05]">
                    <input
                      id="marketingConsent"
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) => setFormData({ ...formData, marketingConsent: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded border-black/20 text-[#f36421] focus:ring-[#f36421]"
                    />
                    <label htmlFor="marketingConsent" className="text-sm text-zinc-700 leading-relaxed">
                      <span className="font-semibold text-black">Marketing & Promotional Messages:</span><br />
                      I agree to receive marketing updates, promotional offers, special deals, and announcements from Eighty5 Labs via SMS/text message.
                    </label>
                  </div>

                  {/* Transactional Consent Checkbox */}
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-[#f9f9f9] border border-black/[0.05]">
                    <input
                      id="transactionalConsent"
                      type="checkbox"
                      checked={formData.transactionalConsent}
                      onChange={(e) => setFormData({ ...formData, transactionalConsent: e.target.checked })}
                      className="mt-1 w-5 h-5 rounded border-black/20 text-[#f36421] focus:ring-[#f36421]"
                    />
                    <label htmlFor="transactionalConsent" className="text-sm text-zinc-700 leading-relaxed">
                      <span className="font-semibold text-black">Service & Transactional Messages:</span><br />
                      I agree to receive service notifications, appointment reminders, account updates, and customer service communications from Eighty5 Labs via SMS/text message.
                    </label>
                  </div>
                </div>

                {/* Important Disclosures */}
                <div className="bg-[#fafafa] rounded-xl p-6 border border-black/[0.06]">
                  <h4 className="text-sm font-bold text-black mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-[#f36421]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M12 16v-4M12 8h.01"/>
                    </svg>
                    Important Information
                  </h4>

                  <ul className="space-y-3 text-sm text-zinc-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#f36421] font-bold mt-0.5">•</span>
                      <span><strong>Message Frequency:</strong> Message frequency varies. You may receive multiple messages per week depending on your selections and interactions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f36421] font-bold mt-0.5">•</span>
                      <span><strong>Message & Data Rates:</strong> Message and data rates may apply. Standard messaging rates from your wireless carrier will apply.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f36421] font-bold mt-0.5">•</span>
                      <span><strong>How to Opt Out:</strong> You can opt out at any time by replying <strong>STOP</strong> to any message. You will receive a confirmation and no further messages will be sent.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f36421] font-bold mt-0.5">•</span>
                      <span><strong>Need Help?</strong> Reply <strong>HELP</strong> to any message for assistance, or contact us at <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a> or <a href="tel:5037043755" className="text-[#f36421] hover:underline">503-704-3755</a>.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#f36421] font-bold mt-0.5">•</span>
                      <span><strong>Consent Not Required:</strong> Your consent to receive text messages is not a condition of any purchase.</span>
                    </li>
                  </ul>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-pill bg-[#f36421] text-white py-4 text-base font-bold border border-[#f36421] hover:bg-[#ff7a3d] hover:shadow-[0_0_40px_-10px_#f36421] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Subscribe to Text Messages'}
                </button>

                {/* Privacy & Terms Links */}
                <p className="text-center text-xs text-zinc-500 leading-relaxed">
                  By subscribing, you agree to our{' '}
                  <a href="#/privacy" className="text-[#f36421] hover:underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#/terms" className="text-[#f36421] hover:underline">Terms & Conditions</a>.
                  <br />
                  We will not share your mobile contact information with third parties for marketing purposes.
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
                  Thank you for signing up. You'll start receiving text messages from Eighty5 Labs based on your preferences.
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
          <div className="mt-8 text-center text-sm text-zinc-500">
            <p className="font-semibold text-black mb-2">Eighty5 Labs (Aida LLC)</p>
            <p>
              Email: <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a>
              {' '}|{' '}
              Phone: <a href="tel:5037043755" className="text-[#f36421] hover:underline">503-704-3755</a>
            </p>
            <p className="mt-2">
              <a href="https://eighty5labs.com" className="text-[#f36421] hover:underline">eighty5labs.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
