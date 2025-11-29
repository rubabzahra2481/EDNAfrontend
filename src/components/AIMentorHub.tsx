/**
 * AI Mentor Hub Component
 * Selection between Architect and Alchemist AI Mentors
 */

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Target, Lightbulb } from 'lucide-react';
import { getAgentToken, sendTokenToIframe } from '../utils/agentToken';
import { AI_MENTOR_URL } from '../config';

type MentorId = 'architect' | 'alchemist';

interface AIMentorHubProps {
  onViewChange?: (view: string) => void;
  isInDashboard?: boolean;
  initialMentor?: MentorId;
}

export function AIMentorHub({ onViewChange, isInDashboard = false, initialMentor }: AIMentorHubProps) {
  const [selectedMentor, setSelectedMentor] = useState<MentorId | null>(initialMentor || null);
  
  // Update selected mentor when initialMentor prop changes
  useEffect(() => {
    if (initialMentor) {
      setSelectedMentor(initialMentor);
    }
  }, [initialMentor]);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Send Agent token to iframe when it loads
  useEffect(() => {
    const sendAgentTokenToIframe = async () => {
      // Only send if iframe is loaded and alchemist is selected
      if (!isIframeLoaded || selectedMentor !== 'alchemist' || !iframeRef.current) {
        return;
      }

      try {
        // Get lightweight Agent access token
        const agentToken = await getAgentToken();

        if (!agentToken) {
          console.error('❌ Failed to get Agent token for iframe');
          return;
        }

        // Send the Agent token to the iframe
        const targetOrigin = AI_MENTOR_URL;
        sendTokenToIframe(iframeRef.current, agentToken, targetOrigin);

      } catch (err) {
        console.error('❌ Error sending Agent token to iframe:', err);
      }
    };

    sendAgentTokenToIframe();
  }, [isIframeLoaded, selectedMentor]);

  // Load deployed agent directly in iframe for both mentors
  if (selectedMentor === 'architect' || selectedMentor === 'alchemist') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Iframe container - full page, loads deployed agent */}
        <div className="flex-1 w-full" style={{ minHeight: 0 }}>
          <iframe
            ref={iframeRef}
            src={`${AI_MENTOR_URL}/`}
            className="w-full h-full border-0"
            style={{ height: '100%', minHeight: '100vh' }}
            title={selectedMentor === 'architect' ? 'The AI Architect' : 'The AI Alchemist'}
            allow="camera; microphone"
            onLoad={() => setIsIframeLoaded(true)}
          />
        </div>
      </div>
    );
  }

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
                  <h3 className="typo-h3-bs mb-1">The AI Architect</h3>
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
                onClick={() => {
                  if (isInDashboard && onViewChange) {
                    // Navigate to separate page when in dashboard
                    onViewChange('architect-mentor');
                  } else {
                    // Show within component when not in dashboard
                    setSelectedMentor('architect');
                  }
                }}
                className="mt-6 w-full py-3 border-2 borde...lg hover:bg-purple-50 transition-colors font-medium text-center"
              >
                Meet the Architect
              </button>
            </div>

            {/* Alchemist card */}
            <div className="program-flow-card border-l-4 border-orange-500 bg-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-6 h-6 text-orange-700" />
                </div>
                <div>
                  <h3 className="typo-h3-bs mb-1">The AI Alchemist</h3>
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
                onClick={() => {
                  if (isInDashboard && onViewChange) {
                    // Navigate to separate page when in dashboard
                    onViewChange('alchemist-mentor');
                  } else {
                    // Show within component when not in dashboard
                    setSelectedMentor('alchemist');
                  }
                }}
                className="mt-6 w-full py-3 border-2 border-oran...lg hover:bg-orange-50 transition-colors font-medium text-center"
              >
                Meet the Alchemist
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
