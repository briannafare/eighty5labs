
import React from 'react';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-xl md:text-2xl font-[800] tracking-tight text-black mt-10 mb-4">{children}</h2>
);

const SubSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mt-6">
    <h3 className="text-lg font-bold text-black mb-3">{title}</h3>
    {children}
  </div>
);

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fbfbfa] py-16 md:py-24">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <a href="#/" className="inline-flex items-center gap-2 text-[18px] font-bold tracking-tight text-black mb-8">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L1 21h22L12 2z"/></svg>
              eighty5labs
            </a>
            <h1 className="text-[clamp(32px,5vw,48px)] font-[900] tracking-tighter text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-sm text-zinc-500 font-medium">
              Last Updated: January 28, 2026
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl border border-black/[0.08] shadow-sm p-8 md:p-12">
            <div className="prose prose-zinc max-w-none">
              <p className="text-zinc-600 leading-relaxed">
                Eighty5 Labs, a DBA of Aida LLC ("we," "us," "our," or "Company"), is committed to protecting your privacy and ensuring you have a positive experience on our website and services. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website eighty5labs.com (the "Website") and use our services, including SMS/text messaging services.
              </p>
              <p className="text-zinc-600 leading-relaxed mt-4">
                Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Website or Services.
              </p>

              <SectionTitle>1. Information We Collect</SectionTitle>

              <SubSection title="1.1 Information You Provide Directly">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  We collect information you voluntarily provide to us, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address, company name, and job title</li>
                  <li><strong>Account Information:</strong> Username, password, account preferences</li>
                  <li><strong>SMS/Text Messaging Data:</strong> Mobile phone number when you opt in to receive text messages</li>
                  <li><strong>Communication Information:</strong> Messages, inquiries, feedback, and correspondence you send us</li>
                  <li><strong>Payment Information:</strong> Billing address, payment method details (processed securely by third-party payment processors)</li>
                  <li><strong>Website Activity:</strong> Information you provide through forms, surveys, or other interactive features</li>
                </ul>
              </SubSection>

              <SubSection title="1.2 Information Collected Automatically">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  When you visit our Website, we automatically collect certain technical information:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li><strong>Device Information:</strong> Browser type, operating system, device type, and unique device identifiers</li>
                  <li><strong>Access Information:</strong> IP address, pages viewed, time spent on pages, referring URL, search terms</li>
                  <li><strong>Cookies and Tracking:</strong> We use cookies, web beacons, and similar technologies to track your browsing behavior and improve your experience</li>
                  <li><strong>Analytics Data:</strong> Information collected through Google Analytics and similar tools to understand how you use our Website</li>
                </ul>
              </SubSection>

              <SubSection title="1.3 Information from Third Parties">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  We may receive information about you from third parties, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Service providers who assist us in delivering our services</li>
                  <li>Advertising partners and data brokers (with your consent where required)</li>
                  <li>Publicly available sources</li>
                  <li>Social media platforms (if you connect your social account)</li>
                </ul>
              </SubSection>

              <SectionTitle>2. How We Use Your Information</SectionTitle>
              <p className="text-zinc-600 leading-relaxed mb-3">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                <li><strong>Service Delivery:</strong> To provide, operate, and improve our Website and Services</li>
                <li><strong>SMS/Text Messaging:</strong> To send you SMS/text messages to which you have opted in (marketing updates, promotional offers, alerts, transactional messages, customer service)</li>
                <li><strong>Communication:</strong> To respond to your inquiries, provide customer support, and send administrative information</li>
                <li><strong>Marketing:</strong> To send marketing communications, newsletters, and promotional offers (only to users who have opted in)</li>
                <li><strong>Compliance:</strong> To comply with legal obligations, enforce our Terms & Conditions, and protect our rights</li>
                <li><strong>Analytics:</strong> To analyze user behavior, improve our Website, and conduct market research</li>
                <li><strong>Fraud Prevention:</strong> To detect, prevent, and address fraud, security, and technical issues</li>
                <li><strong>Personalization:</strong> To customize your experience and deliver content tailored to your interests</li>
                <li><strong>Legal Obligations:</strong> To comply with court orders, regulatory requirements, and law enforcement requests</li>
              </ul>

              <SectionTitle>3. Sharing and Disclosure of Information</SectionTitle>

              <SubSection title="3.1 How We Share Your Information">
                <p className="text-zinc-600 leading-relaxed mb-4">
                  We are committed to protecting your privacy. <strong>We will NOT share your mobile contact information with third parties or affiliates for marketing or promotional purposes.</strong>
                </p>
                <p className="text-zinc-600 leading-relaxed mb-3">
                  However, we may share your information in the following limited circumstances:
                </p>
                <p className="text-zinc-600 leading-relaxed mb-2">
                  <strong>Service Providers:</strong> We share information with third-party service providers who assist us in operating our Website and delivering our Services, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-600 mb-4">
                  <li>Cloud hosting and storage providers</li>
                  <li>Payment processors</li>
                  <li>SMS/text messaging platform providers</li>
                  <li>Email service providers</li>
                  <li>Analytics providers</li>
                  <li>Customer relationship management (CRM) platforms</li>
                </ul>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  All service providers are contractually obligated to use your information only for the purposes we specify and to maintain the confidentiality of your information.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-2">
                  <strong>Legal Requirements:</strong> We may disclose your information when required by law, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-zinc-600 mb-4">
                  <li>Court orders or legal process</li>
                  <li>Government or law enforcement requests</li>
                  <li>Regulatory compliance</li>
                  <li>Protection of our legal rights or the rights of others</li>
                </ul>
                <p className="text-zinc-600 leading-relaxed mb-4">
                  <strong>Business Transfers:</strong> If Eighty5 Labs (Aida LLC) is involved in a merger, acquisition, bankruptcy, or sale of assets, your information may be transferred as part of that transaction. You will be notified of any such change and any choices you may have regarding your information.
                </p>
                <p className="text-zinc-600 leading-relaxed">
                  <strong>With Your Consent:</strong> We may share your information with third parties if you explicitly consent to such sharing.
                </p>
              </SubSection>

              <SubSection title="3.2 Data NOT Shared for Marketing">
                <div className="bg-[#fef3ed] border border-[#f36421]/20 rounded-lg p-4 mb-4">
                  <p className="text-zinc-700 font-semibold mb-2">Explicit Commitment:</p>
                  <p className="text-zinc-600">
                    We do NOT share the following information with any third parties or affiliates for marketing or promotional purposes:
                  </p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Mobile phone numbers and SMS opt-in data</li>
                  <li>SMS consent records and messaging history</li>
                  <li>Text message originator contact information</li>
                  <li>Frequency or nature of SMS communications you receive from us</li>
                </ul>
                <p className="text-zinc-600 leading-relaxed mt-4 font-medium">
                  All categories related to text messaging originator opt-in data, consent, and communication preferences are excluded from any sharing and will not be shared with any third parties.
                </p>
              </SubSection>

              <SectionTitle>4. SMS/Text Messaging Terms</SectionTitle>

              <SubSection title="4.1 Opt-In Consent">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  When you provide your mobile phone number and opt in to receive text messages from Eighty5 Labs, you are providing express written consent to receive SMS/text messages at that phone number.
                </p>
                <p className="text-zinc-600 leading-relaxed mb-2">By opting in, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Receive text messages regarding marketing updates, promotional offers, alerts, and customer service communications</li>
                  <li>Allow us to use your phone number to send you messages related to your account and our services</li>
                </ul>
                <p className="text-zinc-600 leading-relaxed mt-3 font-medium">
                  Your consent is voluntary and is NOT a condition of purchasing any goods or services from us.
                </p>
              </SubSection>

              <SubSection title="4.2 Message Frequency and Content">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  The frequency of text messages will vary based on your interactions with our services and the types of messages you opt in to receive. You may receive:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Marketing and promotional messages</li>
                  <li>Service notifications and alerts</li>
                  <li>Transactional messages (order confirmations, account updates)</li>
                  <li>Customer support and informational messages</li>
                </ul>
              </SubSection>

              <SubSection title="4.3 Message and Data Rates">
                <div className="bg-[#fafafa] border border-black/[0.08] rounded-lg p-4">
                  <p className="text-zinc-700 font-semibold">
                    IMPORTANT: Message and data rates may apply. Your wireless carrier may charge you standard messaging rates for each text message you send or receive.
                  </p>
                  <p className="text-zinc-600 mt-2">
                    We are not responsible for any charges your wireless carrier may impose. Please contact your wireless carrier if you have questions about your rate plan.
                  </p>
                </div>
              </SubSection>

              <SubSection title="4.4 How to Opt Out">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  You can stop receiving text messages from Eighty5 Labs at any time:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li><strong>Text "STOP" to any message:</strong> Reply "STOP" to any text message you receive from us. You will receive a confirmation text, and we will remove your number from our messaging list.</li>
                  <li><strong>Contact Us:</strong> Email <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a> or call <a href="tel:5037043755" className="text-[#f36421] hover:underline">503-704-3755</a> to request opt-out.</li>
                </ul>
                <p className="text-zinc-600 leading-relaxed mt-3">
                  After you opt out, we will no longer send you marketing text messages. However, we may continue to send you transactional messages related to your account, orders, or customer service.
                </p>
              </SubSection>

              <SubSection title="4.5 Help and Support">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  <strong>Text "HELP" to any message:</strong> Reply "HELP" to any text message from us to receive more information about our text messaging service.
                </p>
                <p className="text-zinc-600 leading-relaxed">For additional support, contact us at:</p>
                <ul className="list-none pl-0 space-y-1 text-zinc-600 mt-2">
                  <li>Email: <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a></li>
                  <li>Phone: <a href="tel:5037043755" className="text-[#f36421] hover:underline">503-704-3755</a></li>
                </ul>
              </SubSection>

              <SectionTitle>5. Data Security</SectionTitle>
              <p className="text-zinc-600 leading-relaxed mb-3">
                We implement comprehensive security measures to protect your information from unauthorized access, alteration, disclosure, or destruction, including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                <li>SSL/TLS encryption for data in transit</li>
                <li>Secure password protection and authentication</li>
                <li>Access controls limiting who can view sensitive data</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Compliance with industry security standards</li>
              </ul>
              <p className="text-zinc-600 leading-relaxed mt-4">
                <strong>However, please note:</strong> No method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your information using reasonable security measures, we cannot guarantee absolute security.
              </p>

              <SectionTitle>6. Data Retention</SectionTitle>
              <p className="text-zinc-600 leading-relaxed mb-3">
                We retain your information for as long as necessary to provide our Services and comply with legal obligations:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                <li><strong>SMS Opt-In Records:</strong> Retained for a minimum of 4–5 years to comply with FCC and TCPA regulations</li>
                <li><strong>Account Information:</strong> Retained while your account is active</li>
                <li><strong>Marketing Communications:</strong> Retained until you opt out</li>
                <li><strong>Legal/Compliance Records:</strong> Retained as required by law</li>
              </ul>
              <p className="text-zinc-600 leading-relaxed mt-3">
                You may request deletion of your information by contacting us at <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a>, subject to legal retention requirements.
              </p>

              <SectionTitle>7. Your Rights and Choices</SectionTitle>

              <SubSection title="7.1 Access and Correction">
                <p className="text-zinc-600 leading-relaxed mb-2">You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information (subject to legal obligations)</li>
                </ul>
              </SubSection>

              <SubSection title="7.2 Opt-Out Options">
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li><strong>SMS Messages:</strong> Reply "STOP" to any text message or contact us</li>
                  <li><strong>Marketing Emails:</strong> Click the unsubscribe link in any email or contact us</li>
                  <li><strong>Cookies/Tracking:</strong> Adjust your browser settings to disable cookies (note: this may affect Website functionality)</li>
                  <li><strong>Do Not Track:</strong> If your browser supports Do Not Track signals, we honor them where technically feasible</li>
                </ul>
              </SubSection>

              <SubSection title="7.3 California Privacy Rights (CCPA)">
                <p className="text-zinc-600 leading-relaxed mb-3">
                  If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc pl-6 space-y-2 text-zinc-600">
                  <li>Right to know what personal information is collected</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt out of the "sale" of personal information</li>
                  <li>Right to non-discrimination for exercising your privacy rights</li>
                </ul>
                <p className="text-zinc-600 leading-relaxed mt-3">
                  To exercise these rights, contact us at <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a>.
                </p>
              </SubSection>

              <SectionTitle>8. Third-Party Links and Services</SectionTitle>
              <p className="text-zinc-600 leading-relaxed">
                Our Website may contain links to third-party websites and services. This Privacy Policy applies only to eighty5labs.com. We are not responsible for the privacy practices of third-party websites. Please review their privacy policies before providing any personal information.
              </p>

              <SectionTitle>9. Children's Privacy</SectionTitle>
              <p className="text-zinc-600 leading-relaxed">
                Our Website and Services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately.
              </p>

              <SectionTitle>10. International Users</SectionTitle>
              <p className="text-zinc-600 leading-relaxed">
                Our Website is based in the United States and is subject to U.S. laws. If you access our Website from outside the U.S., you acknowledge that your information will be transferred to, stored in, and processed in the United States. By using our Website, you consent to this transfer and processing.
              </p>

              <SectionTitle>11. Changes to This Privacy Policy</SectionTitle>
              <p className="text-zinc-600 leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. We will notify you of any material changes by updating the "Last Updated" date and posting the revised policy on our Website.
              </p>
              <p className="text-zinc-600 leading-relaxed mt-3">
                Your continued use of our Website following the posting of a revised Privacy Policy means you accept and agree to the changes.
              </p>

              <SectionTitle>12. Contact Us</SectionTitle>
              <p className="text-zinc-600 leading-relaxed mb-4">
                If you have questions about this Privacy Policy, our privacy practices, or wish to exercise your privacy rights, please contact us:
              </p>
              <div className="bg-[#fafafa] rounded-lg p-6 border border-black/[0.06]">
                <p className="font-bold text-black mb-2">Eighty5 Labs (Aida LLC)</p>
                <ul className="list-none pl-0 space-y-1 text-zinc-600">
                  <li>Email: <a href="mailto:bri@eighty5labs.com" className="text-[#f36421] hover:underline">bri@eighty5labs.com</a></li>
                  <li>Phone: <a href="tel:5037043755" className="text-[#f36421] hover:underline">503-704-3755</a></li>
                  <li>Website: <a href="https://eighty5labs.com" className="text-[#f36421] hover:underline">https://eighty5labs.com</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8 text-center">
            <a
              href="#/"
              className="inline-block btn-pill bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-black/80 transition-colors"
            >
              Return to Homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
