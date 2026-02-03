/**
 * Privacy Policy Component
 * Brandscaling - Privacy Policy Page
 */

import { ArrowLeft, Shield, Lock, Eye, Database, Globe, Mail, ChevronRight } from 'lucide-react';
import { Footer } from './Footer';

interface PrivacyPolicyProps {
  onViewChange: (view: string) => void;
}

export function PrivacyPolicy({ onViewChange }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding-bs bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Shield className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="typo-h1-bs text-white mb-4">
              Privacy Policy
            </h1>
            <p className="typo-body-bs text-gray-300 max-w-2xl mx-auto">
              Your privacy matters to us. This policy explains how we collect, use, and protect your personal information.
            </p>
            <p className="text-sm text-gray-400 mt-4">
              Effective Date: 3 February 2026 • Last Updated: 3 February 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-8 bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
        <div className="container-bs-desktop">
          <div className="flex items-center gap-2 text-sm text-gray-600 overflow-x-auto pb-2">
            <button 
              onClick={() => onViewChange('home')}
              className="hover:text-orange-500 transition-colors whitespace-nowrap"
            >
              Home
            </button>
            <ChevronRight className="w-4 h-4 flex-shrink-0" />
            <span className="text-gray-900 font-medium whitespace-nowrap">Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto">
            
            {/* Section 1: Introduction */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="typo-h2-bs">1. Introduction</h2>
              </div>
              <div className="pl-10 space-y-4 typo-body-bs text-gray-700">
                <p>
                  Brandscaling is an AI-powered Decision Intelligence and Collaboration Mastery ecosystem designed to help you understand how you think, feel, and make decisions — so you can operate with clarity, consistency, and stability under real business pressure.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, store, and protect your personal information when you use the Brandscaling iOS application (the "App").
                </p>
                <p>
                  For the purposes of UK GDPR, <strong>Brand Scaling Ltd.</strong> is the data controller of the information processed through the App.
                </p>
              </div>
            </div>

            {/* Section 2: Information We Collect */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Database className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="typo-h2-bs">2. Information We Collect</h2>
              </div>
              <div className="pl-10 space-y-6 typo-body-bs text-gray-700">
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">2.1 Information You Provide Directly</h3>
                  <p className="mb-3">We may collect information you provide when you:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-4">
                    <li>Create an account</li>
                    <li>Take the E-DNA Assessment</li>
                    <li>Complete interactive workbooks</li>
                    <li>Engage with AI mentors</li>
                    <li>Contact support</li>
                  </ul>
                  <p className="mb-3">This may include:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Entrepreneurial Decision Network Assessment (E-DNA) responses</li>
                    <li>Workbook decision entries</li>
                    <li>Identifiers related to your Apple ID for purchase validation</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">2.2 E-DNA Decision Intelligence Data</h3>
                  <p className="mb-3">
                    Brandscaling's core service includes generating your personalised E-DNA decision profile. This profile reflects aspects of how you form, validate, and execute decisions, including indicators related to decision-making style, learning preferences, and stability under entrepreneurial pressure.
                  </p>
                  <p className="mb-4">
                    Your E-DNA profile is used solely to personalise your experience inside the App, including learning pathways, interactive tools, and AI mentor guidance.
                  </p>
                  <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-orange-800 mb-1">Important Boundary:</p>
                    <p className="text-orange-700">
                      E-DNA is not a medical, psychological, or clinical diagnosis. It is a decision intelligence framework designed for entrepreneurial development and support.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">2.3 Information Collected Automatically</h3>
                  <p className="mb-3">When you use the App, we may collect:</p>
                  <ul className="list-disc pl-6 space-y-1 mb-3">
                    <li>Device type and operating system</li>
                    <li>App interaction data (e.g., feature usage, session duration)</li>
                    <li>Usage analytics</li>
                    <li>Crash reports and performance diagnostics</li>
                  </ul>
                  <p>This data is used to improve app reliability, security, and user experience.</p>
                </div>
              </div>
            </div>

            {/* Section 3: Payments */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Lock className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="typo-h2-bs">3. Payments (Apple In-App Purchases)</h2>
              </div>
              <div className="pl-10 typo-body-bs text-gray-700">
                <p>
                  All paid features, subscriptions, and upgrades in the Brandscaling iOS App are processed securely through Apple's In-App Purchase system. Brandscaling does not collect or store your full payment card details. Apple handles payment processing according to its own privacy and security policies.
                </p>
              </div>
            </div>

            {/* Section 4: How We Use Your Information */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Eye className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="typo-h2-bs">4. How We Use Your Information</h2>
              </div>
              <div className="pl-10 typo-body-bs text-gray-700">
                <p className="mb-3">We use your information to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Provide personalised E-DNA results and reports</li>
                  <li>Adapt learning pathways and workbook pacing</li>
                  <li>Enable AI mentor guidance aligned to your decision loop</li>
                  <li>Track progress and completion signals</li>
                  <li>Maintain platform security and performance</li>
                  <li>Improve the App's stability and functionality</li>
                </ul>
              </div>
            </div>

            {/* Section 5: Legal Bases */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">5. Legal Bases for Processing (UK GDPR)</h2>
              <div className="typo-body-bs text-gray-700 space-y-4">
                <p>We process personal data only where a valid legal basis applies, including:</p>
                
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Performance of a Contract</h4>
                    <p className="text-sm">To provide account access, E-DNA profile generation, personalised learning, and AI mentorship.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Legitimate Interests</h4>
                    <p className="text-sm">To monitor app performance, ensure security, prevent misuse, and improve services without overriding user rights.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Consent</h4>
                    <p className="text-sm">Where required, including for direct marketing communications.</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Legal Obligation</h4>
                    <p className="text-sm">Where processing is necessary to comply with applicable laws.</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  For clarity: account data and E-DNA processing rely primarily on performance of a contract; analytics and diagnostics rely on legitimate interests; marketing communications rely on consent.
                </p>
              </div>
            </div>

            {/* Section 6: AI Mentors */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">6. AI Mentors and Automated Processing</h2>
              <div className="typo-body-bs text-gray-700 space-y-4">
                <p>
                  Brandscaling includes two AI mentors: AI-Architect and AI-Alchemist. These mentors may process your E-DNA profile and learning context to provide personalised guidance.
                </p>
                <p>AI mentors:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Do not make decisions for you</li>
                  <li>Do not provide medical, legal, or financial advice</li>
                  <li>Do not replace human judgement</li>
                </ul>
                <p>
                  Brandscaling does not engage in solely automated decision-making that produces legal or similarly significant effects as defined under Article 22 of the UK GDPR.
                </p>
              </div>
            </div>

            {/* Section 7: Data Storage */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">7. Data Storage and Deletion</h2>
              <div className="typo-body-bs text-gray-700 space-y-4">
                <p>
                  Your E-DNA profile is persistent and versioned over time. Workbook outputs are stored as structured decision artifacts to support continuity and reflection.
                </p>
                <p>
                  We retain your personal data for as long as your account remains active. If you delete your account, your personal data will be permanently deleted within <strong>30 days</strong>, except where retention is required for legal or accounting purposes. Anonymised data may be retained indefinitely for analytical and improvement purposes.
                </p>
              </div>
            </div>

            {/* Section 8: Sharing of Data */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">8. Sharing of Data</h2>
              <div className="typo-body-bs text-gray-700 space-y-4">
                <p><strong>We do not sell your personal data.</strong></p>
                <p>We may share limited data with trusted service providers only for:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Hosting and infrastructure (e.g., AWS)</li>
                  <li>Analytics and app performance monitoring (e.g., Firebase)</li>
                  <li>AI service delivery (e.g., OpenAI)</li>
                </ul>
                <p>
                  All service providers are required to maintain appropriate confidentiality and security safeguards. Some providers may be located outside the UK. Where international transfers occur, we ensure appropriate safeguards such as Standard Contractual Clauses are in place.
                </p>
              </div>
            </div>

            {/* Section 9: Your Rights */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">9. Your Rights (UK GDPR)</h2>
              <div className="typo-body-bs text-gray-700 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Access your personal data</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Restrict or object to certain processing</li>
                  <li>Request a copy of your data in a portable, machine-readable format (data portability)</li>
                  <li>Withdraw consent for marketing at any time</li>
                  <li>Lodge a complaint with the Information Commissioner's Office (ICO) at <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">ico.org.uk</a> if you believe your data protection rights have been violated.</li>
                </ul>
                <p>To exercise these rights, contact us using the details below.</p>
              </div>
            </div>

            {/* Section 10: Security */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">10. Security</h2>
              <div className="typo-body-bs text-gray-700 space-y-4">
                <p>We implement appropriate technical and organisational safeguards including:</p>
                <ul className="list-disc pl-6 space-y-1 mb-4">
                  <li>Encryption in transit and at rest</li>
                  <li>Access controls and principle of least privilege</li>
                  <li>Regular monitoring for unauthorised access</li>
                </ul>
                <p>
                  In the event of a personal data breach, we will notify affected users and the ICO where required by law.
                </p>
              </div>
            </div>

            {/* Section 11: Tracking */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">11. Tracking Technologies & Cookies</h2>
              <div className="typo-body-bs text-gray-700">
                <p>
                  The Brandscaling App does not use cookies or other similar technologies for tracking users across third-party apps or websites for advertising purposes. Our use of analytics tools is confined to improving the app experience itself. We do not use any trackers that would require consent under Apple's App Tracking Transparency (ATT) framework.
                </p>
              </div>
            </div>

            {/* Section 12: Children's Privacy */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">12. Children's Privacy</h2>
              <div className="typo-body-bs text-gray-700">
                <p>
                  The Brandscaling App is not intended for individuals under the age of 18. We do not knowingly collect personal data from children.
                </p>
              </div>
            </div>

            {/* Section 13: Updates */}
            <div className="mb-12">
              <h2 className="typo-h2-bs mb-4">13. Updates to This Policy</h2>
              <div className="typo-body-bs text-gray-700">
                <p>
                  We may update this Privacy Policy as the ecosystem evolves. Material changes will be communicated in-app or via email.
                </p>
              </div>
            </div>

            {/* Section 14: Contact */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="typo-h2-bs">14. Contact Us</h2>
              </div>
              <div className="pl-10 typo-body-bs text-gray-700">
                <p className="mb-4">For privacy questions or data protection requests, contact:</p>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <p className="font-semibold text-gray-900 mb-2">Brand Scaling Ltd.</p>
                  <p>35 Wycome Road, Birmingham, UK</p>
                  <p className="mt-3">
                    <strong>Email:</strong>{' '}
                    <a href="mailto:info@brandscaling.co.uk" className="text-orange-600 hover:underline">
                      info@brandscaling.co.uk
                    </a>
                  </p>
                  <p>
                    <strong>Website:</strong>{' '}
                    <a href="https://brandscaling.co.uk/contact" target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline">
                      brandscaling.co.uk/contact
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Back to Home Button */}
            <div className="pt-8 border-t border-gray-200">
              <button
                onClick={() => onViewChange('home')}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onViewChange={onViewChange} />
    </div>
  );
}

