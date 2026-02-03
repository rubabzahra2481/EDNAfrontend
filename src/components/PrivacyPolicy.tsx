/**
 * Privacy Policy Component
 * Brandscaling - Privacy Policy Page
 * Clean, professional design inspired by modern legal document standards
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Footer } from './Footer';

interface PrivacyPolicyProps {
  onViewChange: (view: string) => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function PolicySection({ title, children, defaultOpen = false }: SectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
      >
        <h2 className="text-xl font-semibold text-gray-900 pr-4">{title}</h2>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
        )}
      </button>
      {isOpen && (
        <div className="pb-8 prose prose-gray max-w-none">
          {children}
        </div>
      )}
    </div>
  );
}

export function PrivacyPolicy({ onViewChange }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 pt-16 pb-12">
        <p className="text-sm text-gray-500 mb-4">Updated: 3 February 2026</p>
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Privacy policy</h1>
        <p className="text-base text-gray-600">
          Effective: 3 February 2026
        </p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 pb-16">
        
        <PolicySection title="1. Introduction" defaultOpen={true}>
          <p>
            Brandscaling is an AI-powered Decision Intelligence and Collaboration Mastery ecosystem
            designed to help you understand how you think, feel, and make decisions — so you can
            operate with clarity, consistency, and stability under real business pressure.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and protect your personal
            information when you use the Brandscaling iOS application (the "App").
          </p>
          <p>
            For the purposes of UK GDPR, <strong>Brand Scaling Ltd.</strong> is the data controller of the information
            processed through the App.
          </p>
        </PolicySection>

        <PolicySection title="2. Information We Collect">
          <h3 className="text-lg font-semibold mt-4 mb-3">2.1 Information You Provide Directly</h3>
          <p>We may collect information you provide when you:</p>
          <ul>
            <li>Create an account</li>
            <li>Take the E-DNA Assessment</li>
            <li>Complete interactive workbooks</li>
            <li>Engage with AI mentors</li>
            <li>Contact support</li>
          </ul>
          <p>This may include:</p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Entrepreneurial Decision Network Assessment (E-DNA) responses</li>
            <li>Workbook decision entries</li>
            <li>Identifiers related to your Apple ID for purchase validation</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-3">2.2 E-DNA Decision Intelligence Data</h3>
          <p>
            Brandscaling's core service includes generating your personalised E-DNA decision profile.
            This profile reflects aspects of how you form, validate, and execute decisions, including
            indicators related to decision-making style, learning preferences, and stability under
            entrepreneurial pressure.
          </p>
          <p>
            Your E-DNA profile is used solely to personalise your experience inside the App, including
            learning pathways, interactive tools, and AI mentor guidance.
          </p>
          <p className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
            <strong>Important Boundary:</strong> E-DNA is not a medical, psychological, or clinical diagnosis. It is a
            decision intelligence framework designed for entrepreneurial development and support.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-3">2.3 Information Collected Automatically</h3>
          <p>When you use the App, we may collect:</p>
          <ul>
            <li>Device type and operating system</li>
            <li>App interaction data (e.g., feature usage, session duration)</li>
            <li>Usage analytics</li>
            <li>Crash reports and performance diagnostics</li>
          </ul>
          <p>This data is used to improve app reliability, security, and user experience.</p>
        </PolicySection>

        <PolicySection title="3. Payments (Apple In-App Purchases)">
          <p>
            All paid features, subscriptions, and upgrades in the Brandscaling iOS App are processed
            securely through Apple's In-App Purchase system. Brandscaling does not collect or store
            your full payment card details. Apple handles payment processing according to its own
            privacy and security policies.
          </p>
        </PolicySection>

        <PolicySection title="4. How We Use Your Information">
          <p>We use your information to:</p>
          <ul>
            <li>Provide personalised E-DNA results and reports</li>
            <li>Adapt learning pathways and workbook pacing</li>
            <li>Enable AI mentor guidance aligned to your decision loop</li>
            <li>Track progress and completion signals</li>
            <li>Maintain platform security and performance</li>
            <li>Improve the App's stability and functionality</li>
          </ul>
        </PolicySection>

        <PolicySection title="5. Legal Bases for Processing (UK GDPR)">
          <p>We process personal data only where a valid legal basis applies, including:</p>
          <ul>
            <li><strong>Performance of a Contract:</strong> To provide account access, E-DNA profile generation, personalised learning, and AI mentorship.</li>
            <li><strong>Legitimate Interests:</strong> To monitor app performance, ensure security, prevent misuse, and improve services without overriding user rights.</li>
            <li><strong>Consent:</strong> Where required, including for direct marketing communications.</li>
            <li><strong>Legal Obligation:</strong> Where processing is necessary to comply with applicable laws.</li>
          </ul>
          <p>
            For clarity: account data and E-DNA processing rely primarily on performance of a contract;
            analytics and diagnostics rely on legitimate interests; marketing communications rely on
            consent.
          </p>
        </PolicySection>

        <PolicySection title="6. AI Mentors and Automated Processing">
          <p>
            Brandscaling includes two AI mentors: AI-Architect and AI-Alchemist. These mentors may
            process your E-DNA profile and learning context to provide personalised guidance. AI
            mentors:
          </p>
          <ul>
            <li>Do not make decisions for you</li>
            <li>Do not provide medical, legal, or financial advice</li>
            <li>Do not replace human judgement</li>
          </ul>
          <p>
            Brandscaling does not engage in solely automated decision-making that produces legal or
            similarly significant effects as defined under Article 22 of the UK GDPR.
          </p>
        </PolicySection>

        <PolicySection title="7. Data Storage and Deletion">
          <p>
            Your E-DNA profile is persistent and versioned over time. Workbook outputs are stored as
            structured decision artifacts to support continuity and reflection.
          </p>
          <p>
            We retain your personal data for as long as your account remains active. If you delete your
            account, your personal data will be permanently deleted within 30 days, except where
            retention is required for legal or accounting purposes. Anonymised data may be retained
            indefinitely for analytical and improvement purposes.
          </p>
        </PolicySection>

        <PolicySection title="8. Sharing of Data">
          <p><strong>We do not sell your personal data.</strong></p>
          <p>We may share limited data with trusted service providers only for:</p>
          <ul>
            <li>Hosting and infrastructure (e.g., AWS)</li>
            <li>Analytics and app performance monitoring (e.g., Firebase)</li>
            <li>AI service delivery (e.g., OpenAI)</li>
          </ul>
          <p>
            All service providers are required to maintain appropriate confidentiality and security
            safeguards. Some providers may be located outside the UK. Where international transfers
            occur, we ensure appropriate safeguards such as Standard Contractual Clauses are in place.
          </p>
        </PolicySection>

        <PolicySection title="9. Your Rights (UK GDPR)">
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Restrict or object to certain processing</li>
            <li>Request a copy of your data in a portable, machine-readable format (data portability)</li>
            <li>Withdraw consent for marketing at any time</li>
            <li>Lodge a complaint with the Information Commissioner's Office (ICO) at{' '}
              <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                ico.org.uk
              </a>{' '}
              if you believe your data protection rights have been violated.
            </li>
          </ul>
          <p>To exercise these rights, contact us using the details below.</p>
        </PolicySection>

        <PolicySection title="10. Security">
          <p>We implement appropriate technical and organisational safeguards including:</p>
          <ul>
            <li>Encryption in transit and at rest</li>
            <li>Access controls and principle of least privilege</li>
            <li>Regular monitoring for unauthorised access</li>
          </ul>
          <p>
            In the event of a personal data breach, we will notify affected users and the ICO where
            required by law.
          </p>
        </PolicySection>

        <PolicySection title="11. Tracking Technologies & Cookies">
          <p>
            The Brandscaling App does not use cookies or other similar technologies for tracking users
            across third-party apps or websites for advertising purposes. Our use of analytics tools is
            confined to improving the app experience itself. We do not use any trackers that would
            require consent under Apple's App Tracking Transparency (ATT) framework.
          </p>
        </PolicySection>

        <PolicySection title="12. Children's Privacy">
          <p>
            The Brandscaling App is not intended for individuals under the age of 18. We do not
            knowingly collect personal data from children.
          </p>
        </PolicySection>

        <PolicySection title="13. Updates to This Policy">
          <p>
            We may update this Privacy Policy as the ecosystem evolves. Material changes will be
            communicated in-app or via email.
          </p>
        </PolicySection>

        <PolicySection title="14. Contact Us">
          <p>For privacy questions or data protection requests, contact:</p>
          <p className="mt-4">
            <strong>Brand Scaling Ltd.</strong><br />
            35 Wycome Road<br />
            Birmingham, UK
          </p>
          <p className="mt-4">
            <strong>Email:</strong>{' '}
            <a href="mailto:info@brandscaling.co.uk" className="text-blue-600 hover:underline">
              info@brandscaling.co.uk
            </a>
          </p>
          <p>
            <strong>Website:</strong>{' '}
            <a href="https://brandscaling.co.uk/contact" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              brandscaling.co.uk/contact
            </a>
          </p>
        </PolicySection>

      </div>

      {/* Footer */}
      <Footer onViewChange={onViewChange} />
    </div>
  );
}
