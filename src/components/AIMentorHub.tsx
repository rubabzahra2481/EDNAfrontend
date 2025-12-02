/**
 * AI Mentor Hub Component
 * Selection between Architect and Alchemist AI Mentors
 */

import { CheckCircle, Target, Lightbulb } from 'lucide-react';

interface AIMentorHubProps {
  onViewChange?: (view: string) => void;
  isInDashboard?: boolean;
}

export function AIMentorHub({ onViewChange, isInDashboard = false }: AIMentorHubProps) {
  // Default: mentor selection screen
  return (
    <div className="w-full bg-gray-50">
      <section className="section-padding-bs">
        <div className="container-bs-desktop">
          <div className="text-center mb-[var(--bs-spacing-section-heading)]">
            <h1 className="typo-h1-bs mb-4">Meet Your AI Business Advisors</h1>
            <p className="typo-body-bs text-gray-600 max-w-3xl mx-auto">
              Choose the AI mentor that matches your entrepreneurial DNA. Start with the Architect for systems and structure,
              or the Alchemist for creative experimentation and rapid ideation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Architect card */}
            <div className="program-flow-card border-l-4 border-purple-600 bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-purple-700" />
                </div>
                <div>
                  <h3 className="typo-h3-bs mb-1">Collaboration Mastery</h3>
                  <p className="typo-caption-bs text-gray-600">Logical • Data • Strategic</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Systematises processes &amp; structures</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Builds repeatable, scalable systems</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Prioritises data-driven decisions</span>
                </li>
              </ul>
              <button
                disabled
                className="mt-6 w-full py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium text-center"
              >
                Coming Soon
              </button>
            </div>

            {/* Alchemist card */}
            <div className="program-flow-card border-l-4 border-orange-500 bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="typo-h3-bs mb-1">Decision Intelligence</h3>
                  <p className="typo-caption-bs text-gray-600">Creative • Energetic • Experimental</p>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Thrives on ideation, creativity and innovation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Trusts intuition and adaptability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Crafts vision—often rally agreements</span>
                </li>
              </ul>
              <button
                disabled
                className="mt-6 w-full py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium text-center"
              >
                Coming Soon
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
