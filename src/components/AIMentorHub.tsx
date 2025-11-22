/**
 * AI Mentor Hub Component
 * Selection between Architect and Alchemist AI Mentors
 */

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Target, Lightbulb } from 'lucide-react';
import { authHelpers } from '../utils/supabase/client';

type MentorId = 'architect' | 'alchemist';

export function AIMentorHub() {
  const [selectedMentor, setSelectedMentor] = useState<MentorId | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Send session token to iframe when it loads
  useEffect(() => {
    const sendSessionToIframe = async () => {
      // Only send if iframe is loaded and alchemist is selected
      if (!isIframeLoaded || selectedMentor !== 'alchemist' || !iframeRef.current) {
        return;
      }

      try {
        // Get the current Supabase session
        const { session, error } = await authHelpers.getSession();

        if (error) {
          console.error('Failed to get session for iframe:', error);
          return;
        }

        if (session?.access_token) {
          // Send the access token to the iframe
          const targetOrigin = 'https://main.d3970mma5pzr9g.amplifyapp.com';

          iframeRef.current.contentWindow?.postMessage(
            {
              type: 'SUPABASE_AUTH',
              accessToken: session.access_token,
              refreshToken: session.refresh_token,
              user: session.user
            },
            targetOrigin
          );

          console.log('✅ Session token sent to iframe');
        } else {
          console.log('ℹ️ No active session to send to iframe');
        }
      } catch (err) {
        console.error('Error sending session to iframe:', err);
      }
    };

    sendSessionToIframe();
  }, [isIframeLoaded, selectedMentor]);

  // 🆕 NEW: Listen for token refresh requests from iframe
  useEffect(() => {
    const handleTokenRequest = async (event: MessageEvent) => {
      // Security: Only accept messages from AI Alchemist
      const alchemistOrigin = 'https://main.d3970mma5pzr9g.amplifyapp.com';
      
      if (event.origin !== alchemistOrigin) {
        return; // Ignore messages from other origins
      }

      // Check if iframe is requesting token (initial or refresh)
      if (event.data && 
          (event.data.type === 'REQUEST_SUPABASE_TOKEN' || 
           event.data.type === 'REQUEST_FRESH_TOKEN')) {
        
        console.log('📨 Iframe requesting token:', event.data.type);
        
        try {
          // Get fresh session from Supabase
          const { session, error } = await authHelpers.getSession();

          if (error) {
            console.error('❌ Failed to get session:', error);
            return;
          }

          if (session?.access_token && iframeRef.current) {
            // Send token to iframe
            iframeRef.current.contentWindow?.postMessage(
              {
                type: 'SUPABASE_AUTH',
                accessToken: session.access_token,
                refreshToken: session.refresh_token,
                user: session.user
              },
              alchemistOrigin
            );

            console.log('✅ Fresh token sent to iframe');
          }
        } catch (err) {
          console.error('❌ Error sending session to iframe:', err);
        }
      }
    };

    window.addEventListener('message', handleTokenRequest);
    return () => window.removeEventListener('message', handleTokenRequest);
  }, []);

  // Coming Soon screen for Architect
  if (selectedMentor === 'architect') {
    return (
      <div className="min-h-screen bg-white">
        <div className="container-bs-desktop section-padding-bs">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-purple-700" />
            </div>
            <h1 className="typo-h1-bs mb-4">The AI Architect</h1>
            <div className="inline-block bg-purple-600 text-white px-6 py-2 rounded-full mb-6">
              Coming Soon
            </div>
            <p className="typo-body-bs text-gray-600 mb-8">
              The AI Architect is currently being trained on advanced operating systems, SOP libraries and data-driven frameworks.
              Check back soon for your logical, strategic AI business partner.
            </p>
            <button
              onClick={() => setSelectedMentor(null)}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Back to Mentor Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active iframe experience for Alchemist
  if (selectedMentor === 'alchemist') {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="container-bs-desktop py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-orange-700" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">The AI Alchemist</h2>
                  <p className="text-sm text-gray-600">Creative • Energetic • Experimental</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMentor(null)}
                className="px-4 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Back to Mentor Hub
              </button>
            </div>
          </div>
        </div>

        {/* Iframe container */}
        <div className="flex-1 w-full">
          <iframe
            ref={iframeRef}
            src="https://main.d3970mma5pzr9g.amplifyapp.com/"
            className="w-full h-full border-0"
            style={{ minHeight: 'calc(100vh - 80px)' }}
            title="The AI Alchemist"
            allow="camera; microphone"
            onLoad={() => setIsIframeLoaded(true)}
          />
        </div>
      </div>
    );
  }

  // Default: mentor selection screen
  return (
    <div className="min-h-screen bg-gray-50">
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
                onClick={() => setSelectedMentor('architect')}
                className="mt-6 w-full py-3 border-2 border-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium text-center"
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
                onClick={() => setSelectedMentor('alchemist')}
                className="mt-6 w-full py-3 border-2 border-orange-500 rounded-lg hover:bg-orange-50 transition-colors font-medium text-center"
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
