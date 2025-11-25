import React from 'react';
import { EDNAResults } from '../lib/scoring';

interface CompleteResultsPageProps {
  results: EDNAResults;
  userEmail: string;
  onGetFullReport?: () => void;
  onViewChange?: (view: string) => void;
}

export function CompleteResultsPage({ results, userEmail, onGetFullReport, onViewChange }: CompleteResultsPageProps) {
  const {
    core_type,
    core_type_mastery,
    subtype,
    mirror_awareness_score,
    learning_style,
    neurodiversity,
    mindset,
    personality,
  } = results;

  // Determine which template to use
  const isAlchemist = core_type === 'alchemist';
  const isArchitect = core_type === 'architect';
  const isMixed = core_type === 'blurred';

  // Get display values
  const coreTypeDisplay = isAlchemist ? 'The Alchemist' : isArchitect ? 'The Architect' : 'Mixed';
  const subtypeDisplay = Array.isArray(subtype) ? subtype[0] : subtype;

  // Color schemes
  const gradientClass = isMixed 
    ? 'from-purple-900 via-orange-500 to-purple-900'
    : 'from-purple-900 to-orange-500';

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-pink-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-900 to-orange-500 rounded-full" />
            <span className="font-semibold text-sm">Entrepreneurial DNA</span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onViewChange?.('dashboard')}
              className="text-sm font-semibold flex items-center space-x-2 hover:text-purple-600 transition-colors"
            >
              <span>🏠</span>
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My E-DNA Results',
                    text: `I'm ${coreTypeDisplay}! Check out my Entrepreneurial DNA results.`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="text-sm font-semibold flex items-center space-x-2 hover:text-purple-600 transition-colors"
            >
              <span>🔗</span>
              <span>Share</span>
            </button>
            <button 
              onClick={() => window.print()}
              className="bg-green-500 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-green-600 transition-colors"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className={`text-4xl font-bold text-center bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-4`}>
          {coreTypeDisplay}
        </h1>

        {/* Subtitle */}
        <p className={`text-center text-sm bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-8`}>
          {isMixed 
            ? "We've been unable to identify your core type. You shift between overthinking and overfeeling, struggling to find stable criteria for certainty."
            : "You're someone who understands people and situations on a deep, emotional level."}
        </p>

        {/* Decision Mastery and Mirror Awareness */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Decision <span className="text-orange-500">Mastery</span></span>
              <span className="text-sm font-semibold">Core Level • {core_type_mastery}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${gradientClass}`}
                style={{ width: `${core_type_mastery}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Mirror Pair <span className="text-orange-500">Awareness</span></span>
              <span className="text-sm font-semibold">Integration • {mirror_awareness_score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${gradientClass}`}
                style={{ width: `${mirror_awareness_score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Core Identity Section */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold text-lg`}>
            Core Identity
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold text-center bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-4`}>
              {coreTypeDisplay.replace('The ', '')}
            </h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Default Decision Loop</h4>
              {!isMixed ? (
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {isAlchemist ? (
                    <>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Emotion</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Logic</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Emotion</span>
                    </>
                  ) : (
                    <>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Logic</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Emotion</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Logic</span>
                    </>
                  )}
                  <span className="text-xs">End-validator</span>
                </div>
              ) : (
                <p className="text-center text-sm text-gray-600">No dominant loop.</p>
              )}
              <p className="text-sm text-center">
                {isAlchemist && "Emotion overrides and validates your decisions."}
                {isArchitect && "Logic overrides and validates your decisions."}
                {isMixed && "You fluctuate between logic and emotion without consistent validation"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Decision Process</h4>
              <p className="text-sm">
                {isAlchemist && "You lead through narrative and energy, translating emotion into motion."}
                {isArchitect && "You filter reality through logic first, then emotion confirms meaning before logic re-validates."}
                {isMixed && "You fluctuate between logic and emotion without consistent validation"}
              </p>
            </div>
          </div>
        </div>

        {/* Subtype Identity and Mirror Pair Awareness */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Subtype Identity */}
          {!isMixed ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
                Subtype Identity
              </div>
              <div className="p-4">
                <h4 className={`font-bold text-orange-500 mb-2`}>{subtypeDisplay}</h4>
                <p className="text-xs text-gray-600 mb-2">
                  {isAlchemist && "Sees futures before others"}
                  {isArchitect && "Sees the world as a sequence of moves"}
                </p>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-orange-500`}>Strength</h5>
                  <p className="text-xs">
                    {isAlchemist && "connects weak signals into foresight, inspires belief"}
                    {isArchitect && "creates clarity, sequences milestones, removes guesswork"}
                  </p>
                </div>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-orange-500`}>Blind Spot</h5>
                  <p className="text-xs">
                    {isAlchemist && "falls in love with story, mistakes resonance for traction"}
                    {isArchitect && "believes if a plan makes sense, it will work"}
                  </p>
                </div>
                <div>
                  <h5 className={`font-semibold text-xs text-orange-500`}>Trap</h5>
                  <p className="text-xs">
                    {isAlchemist && "True narrative ≠ valid plan."}
                    {isArchitect && "Valid map ≠ true adoption"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
                Core Identity
              </div>
              <div className="p-4">
                <h4 className={`font-bold text-purple-900 mb-2`}>Operating Focus</h4>
                <p className="text-xs text-gray-600 mb-2">Driven by whatever feels right in the moment.</p>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-purple-900`}>Expression</h5>
                  <p className="text-xs">Flexible but inconsistent.</p>
                </div>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-purple-900`}>Root Cause</h5>
                  <p className="text-xs">No single source of internal certainty.</p>
                </div>
                <div>
                  <h5 className={`font-semibold text-xs text-purple-900`}>Stabilisation Path</h5>
                  <p className="text-xs">Use a simple sense → commit loop.</p>
                </div>
              </div>
            </div>
          )}

          {/* Mirror Pair Awareness */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
              Mirror Pair Awareness
            </div>
            <div className="p-4 flex items-center justify-center">
              <span className={`text-4xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                {mirror_awareness_score >= 66 ? 'HIGH' : mirror_awareness_score >= 33 ? 'MEDIUM' : 'LOW'}
              </span>
            </div>
          </div>
        </div>

        {/* Learning Style Preferences */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Learning Style Preferences
          </div>
          <div className="p-6">
            <div className="grid grid-cols-5 gap-4">
              {/* Modality Preference */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Modality Preference</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  {learning_style?.dominant_modality || 'Visual'}
                </p>
                <p className="text-xs text-gray-600">
                  Spatial or diagrammatic form. Patterns, visuals, and graphs
                </p>
              </div>

              {/* Approach */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Approach</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  Sequential
                </p>
                <p className="text-xs text-gray-600">
                  Step-by-step order. Sequence builds trust in completeness
                </p>
              </div>

              {/* Concept Processing */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Concept Processing</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  Abstract
                </p>
                <p className="text-xs text-gray-600">
                  Patterns and symbols reveal meaning through connection.
                </p>
              </div>

              {/* Working Environment */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Working Environment</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  Individual
                </p>
                <p className="text-xs text-gray-600">
                  Deep work and solitude optimises comprehension for you
                </p>
              </div>

              {/* Pace */}
              <div className={`border-2 border-transparent bg-gradient-to-r ${gradientClass} rounded p-[2px]`}>
                <div className="bg-white rounded p-3 h-full">
                  <h5 className="font-bold text-xs mb-2">Pace</h5>
                  <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                    Flexible
                  </p>
                  <p className="text-xs text-gray-600">
                    Controlled tempo based on task complexity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neurodiversity Section */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Neurodiversity
          </div>
          <div className="p-6">
            <h4 className={`font-bold text-purple-900 mb-2`}>Neurodivergent</h4>
            <p className="text-sm mb-2">
              You may prefer short, engaging bursts of activity and sometimes struggle with sustained focus or time management. 
              If intense, this could suggest probable signs of ADHD-related patterns in how you focus, shift attention, or need stimulation.
            </p>
            <p className="text-xs text-gray-500 italic">
              *This is just a screening test to better understand possible neurodivergent traits*
            </p>
          </div>
        </div>

        {/* Mindset and Personality */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Mindset and Personality
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Mindset */}
              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-bold text-sm mb-2">Mindset</h4>
                <p className={`text-orange-500 font-semibold text-sm mb-2`}>Growth Mindset</p>
                <p className="text-xs">
                  You view challenges as opportunities and treat effort as improvement
                </p>
              </div>

              {/* Personality */}
              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-bold text-sm mb-2">Personality</h4>
                <p className={`text-orange-500 font-semibold text-sm mb-2`}>Confidently Patient</p>
                <p className="text-xs">
                  You are confident in your abilities and give your thoughts reasonable time to act on it
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meta-Beliefs and Values */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Meta-Beliefs and Values
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Mission-Driven */}
              <div>
                <h4 className={`font-bold text-sm mb-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                  Mission-Driven and People-focused
                </h4>
                <p className="text-xs">
                  You define "right" by service and impact on people. This stabilises decisions under pressure and builds loyalty.
                </p>
              </div>

              {/* Meaning-Led */}
              <div>
                <h4 className={`font-bold text-sm mb-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                  Meaning-Led and Renewal-Oriented
                </h4>
                <p className="text-xs">
                  You act from purpose and renewal. This keeps culture alive. Add operating constraints so inspiration embeds as process
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic mt-4 text-center">
              This is just an awareness of your beliefs and not judgment
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My E-DNA Results',
                  text: `I'm ${coreTypeDisplay}! Check out my Entrepreneurial DNA results.`,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-600 transition-colors"
          >
            Share results
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-green-500 text-white px-6 py-3 rounded font-semibold hover:bg-green-600 transition-colors"
          >
            Download PDF
          </button>
          <button 
            onClick={() => onViewChange?.('quiz')}
            className="bg-white border border-gray-300 text-black px-6 py-3 rounded font-semibold hover:bg-gray-100 transition-colors"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </div>
  );
}
