import React from 'react';

export const SnapshotConfirmation: React.FC = () => {
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

      <div className="container-custom py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-[#f36421]/10 flex items-center justify-center">
              <svg className="w-12 h-12 text-[#f36421]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[clamp(28px,4vw,42px)] font-[900] tracking-tighter text-black mb-4">
            You're All Set!
          </h1>

          {/* Description */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-8 md:p-10 mb-8">
            <p className="text-lg text-zinc-600 mb-6">
              You'll receive your <span className="font-semibold text-black">Local Authority Snapshot™</span> by email.
            </p>
            <p className="text-zinc-500">
              If something needs clarification, a member of our team may reach out.
            </p>
          </div>

          {/* What to Expect */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-8 md:p-10 mb-8 text-left">
            <h2 className="text-lg font-bold text-black mb-6">What happens next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f36421]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#f36421]">1</span>
                </div>
                <div>
                  <p className="font-medium text-black">We analyze your local presence</p>
                  <p className="text-sm text-zinc-500">Our team reviews your online visibility, reviews, and competitive positioning.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f36421]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#f36421]">2</span>
                </div>
                <div>
                  <p className="font-medium text-black">You receive your Snapshot report</p>
                  <p className="text-sm text-zinc-500">A personalized breakdown of how you show up in your market.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-[#f36421]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-bold text-[#f36421]">3</span>
                </div>
                <div>
                  <p className="font-medium text-black">Optional strategy call</p>
                  <p className="text-sm text-zinc-500">If you'd like to discuss your results, we're here to help.</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a
            href="#/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-[#f36421] text-white font-bold hover:bg-[#e05a1c] transition-all shadow-lg shadow-[#f36421]/25"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </a>

          {/* Contact Info */}
          <p className="mt-8 text-sm text-zinc-400">
            Questions? Reach out at{' '}
            <a href="mailto:hello@eighty5labs.com" className="text-[#f36421] hover:underline">
              hello@eighty5labs.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
