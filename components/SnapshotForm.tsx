import React, { useState, useEffect } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  brokerage: string;
  website: string;
  googleBusinessProfile: string;
  yearsInRealEstate: string;
  primaryFocus: string[];
  inquiryHandling: string[];
  improvementGoals: string;
}

const initialFormData: FormData = {
  fullName: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  brokerage: '',
  website: 'https://',
  googleBusinessProfile: '',
  yearsInRealEstate: '',
  primaryFocus: [],
  inquiryHandling: [],
  improvementGoals: ''
};

const TOTAL_STEPS = 5;

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

export const SnapshotForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [hasPartialSubmitted, setHasPartialSubmitted] = useState(false);

  const webhookUrl = 'https://services.leadconnectorhq.com/hooks/n21oYUwglqe3bTsxL2RS/webhook-trigger/af4e33bf-f01f-4721-80e6-bc3e40d28a45';

  // Send partial data when user has entered required fields but hasn't completed
  useEffect(() => {
    const hasRequiredFields = formData.fullName && formData.email && formData.phone;

    if (hasRequiredFields && !hasPartialSubmitted && currentStep > 1) {
      const timer = setTimeout(() => {
        sendPartialData();
        setHasPartialSubmitted(true);
      }, 30000); // Send partial after 30 seconds of inactivity if on step 2+

      return () => clearTimeout(timer);
    }
  }, [formData, currentStep, hasPartialSubmitted]);

  // Also send partial data when user leaves the page
  useEffect(() => {
    const handleBeforeUnload = () => {
      const hasRequiredFields = formData.fullName && formData.email && formData.phone;
      if (hasRequiredFields && !hasPartialSubmitted) {
        sendPartialData();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [formData, hasPartialSubmitted]);

  const sendPartialData = async () => {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formatDataForGHL(),
          form_status: 'partial',
          tags: ['snapshot-form', 'partial-submission', 'needs-nurture'],
          last_completed_step: currentStep
        })
      });
    } catch (err) {
      console.error('Error sending partial data:', err);
    }
  };

  const formatDataForGHL = () => ({
    full_name: formData.fullName,
    first_name: formData.fullName.split(' ')[0] || '',
    last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
    email: formData.email,
    phone: formData.phone,
    city: formData.city,
    state: formData.state,
    brokerage: formData.brokerage,
    website: formData.website === 'https://' ? '' : formData.website,
    google_business_profile: formData.googleBusinessProfile,
    years_in_real_estate: formData.yearsInRealEstate,
    primary_focus: formData.primaryFocus.join(', '),
    inquiry_handling: formData.inquiryHandling.join(', '),
    improvement_goals: formData.improvementGoals,
    source: 'snapshot-form',
    submission_timestamp: new Date().toISOString()
  });

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
      else if (!/^[\d\s\-\(\)\+]{10,}$/.test(formData.phone.replace(/\s/g, ''))) newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, TOTAL_STEPS));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formatDataForGHL(),
          form_status: 'complete',
          tags: ['snapshot-form', 'complete-submission']
        })
      });

      window.location.hash = '#/snapshot-confirmation';
    } catch (err) {
      console.error('Error submitting form:', err);
      setErrors({ fullName: 'There was an error submitting. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleArrayValue = (field: 'primaryFocus' | 'inquiryHandling', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const stepTitles = [
    'Authority Contact Details',
    'Local Market Footprint',
    'Public Visibility Assets',
    'Experience & Positioning',
    'Engagement & Automation Readiness'
  ];

  return (
    <div className="min-h-screen bg-[#fbfbfa]">
      {/* Header */}
      <div className="bg-white border-b border-black/[0.05]">
        <div className="container-custom py-6">
          <a href="#/" className="inline-flex items-center gap-2 text-[18px] font-bold tracking-tight text-black">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
            eighty5labs
          </a>
        </div>
      </div>

      <div className="container-custom py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-[clamp(28px,4vw,42px)] font-[900] tracking-tighter text-black mb-4">
              Local Authority Snapshot™
            </h1>
            <p className="text-lg text-zinc-600 max-w-lg mx-auto">
              See how you show up — and how competitive you really are in your local market.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step < currentStep
                        ? 'bg-[#f36421] text-white'
                        : step === currentStep
                        ? 'bg-[#f36421] text-white ring-4 ring-[#f36421]/20'
                        : 'bg-zinc-200 text-zinc-500'
                    }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step
                    )}
                  </div>
                  {step < 5 && (
                    <div
                      className={`w-full h-1 mx-2 rounded transition-all duration-300 hidden sm:block ${
                        step < currentStep ? 'bg-[#f36421]' : 'bg-zinc-200'
                      }`}
                      style={{ width: 'calc((100% - 200px) / 4)' }}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-sm font-medium text-zinc-600">
              Step {currentStep} of {TOTAL_STEPS}: {stepTitles[currentStep - 1]}
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-8 md:p-10">
            {/* Step 1: Contact Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Full Name <span className="text-[#f36421]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Smith"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.fullName ? 'border-red-400' : 'border-black/10'} bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all`}
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Email Address <span className="text-[#f36421]">*</span>
                  </label>
                  <p className="text-xs text-zinc-500 mb-2">Best email for results & summary</p>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-400' : 'border-black/10'} bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all`}
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Phone Number <span className="text-[#f36421]">*</span>
                  </label>
                  <p className="text-xs text-zinc-500 mb-2">In case we need clarification</p>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-400' : 'border-black/10'} bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all`}
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
              </div>
            )}

            {/* Step 2: Local Market Footprint */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Primary City / Market You Serve
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Austin"
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    State
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  >
                    <option value="">Select a state</option>
                    {US_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Brokerage <span className="text-zinc-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.brokerage}
                    onChange={(e) => handleInputChange('brokerage', e.target.value)}
                    placeholder="RE/MAX, Keller Williams, etc."
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Public Visibility Assets */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    Google Business Profile Link
                  </label>
                  <p className="text-xs text-zinc-500 mb-2">If you're not sure, enter the business name & city</p>
                  <input
                    type="text"
                    value={formData.googleBusinessProfile}
                    onChange={(e) => handleInputChange('googleBusinessProfile', e.target.value)}
                    placeholder="https://g.page/... or 'Smith Realty Austin TX'"
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Experience & Positioning */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-4">
                    Years in Real Estate
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['0–2 years', '3–5 years', '6–10 years', '10+ years'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleInputChange('yearsInRealEstate', option)}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.yearsInRealEstate === option
                            ? 'border-[#f36421] bg-[#f36421]/10 text-[#f36421]'
                            : 'border-black/10 bg-[#f5f5f5] text-zinc-700 hover:border-[#f36421]/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-4">
                    Primary Focus <span className="text-zinc-400">(select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {['Buyers', 'Sellers', 'Both', 'Investors', 'Luxury', 'Commercial'].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleArrayValue('primaryFocus', option)}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                          formData.primaryFocus.includes(option)
                            ? 'border-[#f36421] bg-[#f36421]/10 text-[#f36421]'
                            : 'border-black/10 bg-[#f5f5f5] text-zinc-700 hover:border-[#f36421]/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Engagement & Automation Readiness */}
            {currentStep === 5 && (
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-4">
                    How are new inquiries currently handled? <span className="text-zinc-400">(select all that apply)</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'I respond manually',
                      'CRM / automated texts',
                      'AI assistant',
                      "I'm not sure",
                      'Leads sometimes go unanswered'
                    ].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => toggleArrayValue('inquiryHandling', option)}
                        className={`px-4 py-3 rounded-lg border text-sm font-medium transition-all text-left ${
                          formData.inquiryHandling.includes(option)
                            ? 'border-[#f36421] bg-[#f36421]/10 text-[#f36421]'
                            : 'border-black/10 bg-[#f5f5f5] text-zinc-700 hover:border-[#f36421]/50'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-black/60 uppercase tracking-wider mb-2">
                    What are you hoping to improve most right now? <span className="text-zinc-400">(optional)</span>
                  </label>
                  <textarea
                    value={formData.improvementGoals}
                    onChange={(e) => handleInputChange('improvementGoals', e.target.value)}
                    placeholder="Tell us about your goals..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-black/10 bg-[#f5f5f5] text-sm focus:outline-none focus:border-[#f36421] focus:ring-2 focus:ring-[#f36421]/20 transition-all resize-none"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-black/[0.05]">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-6 py-3 rounded-lg border border-black/10 text-sm font-medium text-zinc-600 hover:bg-zinc-50 transition-all"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < TOTAL_STEPS ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-8 py-3 rounded-lg bg-[#f36421] text-white text-sm font-bold hover:bg-[#e05a1c] transition-all shadow-lg shadow-[#f36421]/25"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-lg bg-[#f36421] text-white text-sm font-bold hover:bg-[#e05a1c] transition-all shadow-lg shadow-[#f36421]/25 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Get My Local Authority Snapshot™'}
                </button>
              )}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-400">
              Your information is secure and will never be shared. See our{' '}
              <a href="#/privacy" className="text-[#f36421] hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
