/**
 * Courses Page Component
 * Brandscaling - Course Catalog / Pricing
 */

import { Button } from './ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Footer } from './Footer';

interface CoursesProps {
  onViewChange: (view: string) => void;
  isAuthenticated: boolean;
}

export function Courses({ onViewChange, isAuthenticated }: CoursesProps) {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="typo-h1-bs mb-6">
              Choose Your Growth Path
            </h1>
            <p className="typo-body-bs text-gray-700 max-w-3xl mx-auto">
              From first idea to 8-figure scaling. All DNA-personalized. All step-by-step.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Entry Tier */}
            <div className="program-flow-card border-2 border-gray-200 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="typo-h3-bs mb-2">Entry</h3>
                <div className="typo-h1-bs mb-2">£499</div>
                <p className="typo-body-bs text-gray-600">Perfect for idea-stage entrepreneurs</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Idea-to-Launch Kit™</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Smart Business Builder™</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">AI Mentor Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">30-Day Launch Plan</span>
                </li>
              </ul>
              <button 
                onClick={() => window.open("https://launch-kit-uk-blueprint-sh.lovable.app/", "_blank")}//isAuthenticated ? onViewChange('dashboard') : onViewChange('quiz')}
                className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium mt-auto text-center"
              >
                Get Started
              </button>
            </div>

            {/* Expert Tier */}
            <div className="program-flow-card border-2 border-purple-600 relative flex flex-col">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Coming Soon
              </div>
              <div className="text-center mb-6">
                <h3 className="typo-h3-bs mb-2">Expert</h3>
                <div className="typo-h1-bs mb-2">£999</div>
                <p className="typo-body-bs text-gray-600">For growing businesses ready to scale</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Everything in Entry</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Magnetic Offer Builder™</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">The Energetic Edge™</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Conversion Confidence Kit™</span>
                </li>
              </ul>
              <button 
                disabled
                className="w-full py-3 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed font-medium mt-auto text-center"
              >
                Coming Soon
              </button>
            </div>

            {/* Elite Tier */}
            <div className="program-flow-card border-2 border-orange-500 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="typo-h3-bs mb-2">Elite</h3>
                <div className="typo-h1-bs mb-2">£20k</div>
                <p className="typo-body-bs text-gray-600">Complete scaling ecosystem + mastermind</p>
              </div>
              <ul className="space-y-3 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Full Course Vault Access</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Private Mastermind</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">1:1 Strategy Sessions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="typo-body-bs text-gray-700">Direct Mentor Access</span>
                </li>
              </ul>
              <button 
                onClick={() => window.open("https://brandscalingschoolforentrepreneur.replit.app/", "_blank")}//isAuthenticated ? onViewChange('dashboard') : onViewChange('quiz')}
                className="w-full py-3 bg-gradient-arch-scale-90 text-white rounded-lg hover:opacity-90 transition-opacity font-medium mt-auto text-center"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Begin Your Journey CTA */}
      <section className="section-padding-bs bg-gradient-arch-scale">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="typo-h2-bs text-white mb-6">
              Begin Your Journey to 9-Figure Scale
            </h2>
            <p className="typo-body-bs text-white/90 mb-12">
              Every billion-dollar business started with one entrepreneur discovering their true DNA and scaling accordingly. Your breakthrough moment starts now.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onViewChange('quiz')}
                className="cta-gradient-bs px-8 inline-flex items-center justify-center gap-2 bg-white text-[var(--bs-color-indigo)] hover:bg-gray-50"
                style={{ 
                  background: 'white',
                  color: 'var(--bs-color-indigo)'
                }}
              >
                <span>Discover Your DNA</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onViewChange('home')}
                className="h-[var(--bs-cta-height)] px-8 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Footer removed when in dashboard - sidebar handles navigation */}
    </div>
  );
}