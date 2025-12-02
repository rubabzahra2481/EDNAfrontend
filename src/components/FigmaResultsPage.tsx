import React from 'react';
import { EDNAResults } from '../lib/scoring';
import { Download, Home, Share2 } from 'lucide-react';

interface FigmaResultsPageProps {
  results: EDNAResults;
  userEmail: string;
  onGetFullReport: () => void;
  onViewChange?: (view: string) => void;
}

export function FigmaResultsPage({ results, userEmail, onGetFullReport, onViewChange }: FigmaResultsPageProps) {
  const { core_type, core_type_mastery, mirror_awareness_score, subtype, learning_style, neurodiversity, mindset, personality } = results;

  // Determine which template to use
  const isAlchemist = core_type === 'alchemist';
  const isArchitect = core_type === 'architect';
  const isMixed = core_type === 'blurred';

  // Color schemes
  const colors = {
    alchemist: {
      gradient: 'from-purple-900 to-orange-500',
      bg: 'bg-orange-500',
      text: 'text-orange-500',
      border: 'border-orange-500'
    },
    architect: {
      gradient: 'from-purple-900 to-orange-500',
      bg: 'bg-purple-900',
      text: 'text-purple-900',
      border: 'border-purple-900'
    },
    mixed: {
      gradient: 'from-purple-900 via-orange-500 to-purple-900',
      //bg: 'bg-gradient-to-r from-purple-900 to-orange-500',
      text: 'text-purple-900',
      border: 'border-purple-500'
    }
  };

  const currentColors = isAlchemist ? colors.alchemist : isArchitect ? colors.architect : colors.mixed;

  // Get subtype name
  const subtypeName = Array.isArray(subtype) ? subtype[0] : subtype;

  // Get learning style
  const dominantModality = learning_style?.dominant || 'Visual';
  const approach = 'Sequential'; // From quiz data
  const conceptProcessing = 'Abstract'; // From quiz data
  const workingEnvironment = 'Individual'; // From quiz data
  const pace = 'Flexible'; // From quiz data

  // Mirror awareness level
  const getMirrorLevel = () => {
    if (mirror_awareness_score < 40) return 'LOW';
    if (mirror_awareness_score < 70) return 'MEDIUM';
    return 'HIGH';
  };

  // Decision loop
  const getDecisionLoop = () => {
    if (isAlchemist) {
      return {
        steps: ['Emotion', 'Logic', 'Emotion'],
        description: 'Emotion overrides and validates your decisions.',
        process: 'You lead through narrative and energy, translating emotion into motion.'
      };
    } else if (isArchitect) {
      return {
        steps: ['Logic', 'Emotion', 'Logic'],
        description: 'Logic overrides and validates your decisions.',
        process: 'You filter reality through logic first, then emotion confirms meaning before logic re-validates.'
      };
    } else {
      return {
        steps: [],
        description: 'No dominant loop.',
        process: 'You fluctuate between logic and emotion without consistent validation'
      };
    }
  };

  const decisionLoop = getDecisionLoop();

  // Subtype descriptions (placeholder - should come from database)
  const getSubtypeDescription = () => {
    if (isAlchemist) {
      return {
        name: 'Visionary Oracle',
        sees: 'Sees futures before others',
        strength: 'connects weak signals into foresight, inspires belief',
        blindSpot: 'falls in love with story, mistakes resonance for traction',
        trap: 'True narrative ≠ valid plan.'
      };
    } else if (isArchitect) {
      return {
        name: 'Master Strategist',
        sees: 'Sees the world as a sequence of moves',
        strength: 'creates clarity, sequences milestones, removes guesswork',
        blindSpot: 'believes if a plan makes sense, it will work',
        trap: 'Valid map ≠ true adoption'
      };
    } else {
      return {
        name: 'Operating Focus',
        sees: 'Driven by whatever feels right in the moment.',
        strength: '',
        blindSpot: '',
        trap: ''
      };
    }
  };

  const subtypeDesc = getSubtypeDescription();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b-2 border-pink-600 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-600 to-orange-500 rounded-full" />
            <h1 className="text-sm font-semibold">Entrepreneurial DNA</h1>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onViewChange?.('home')} className="flex items-center gap-2 text-sm font-semibold hover:text-purple-900">
              <Home size={14} />
              Dashboard
            </button>
            <button className="flex items-center gap-2 text-sm font-semibold hover:text-purple-900">
              <Share2 size={14} />
              Share
            </button>
            <button 
              onClick={onGetFullReport}
              className="bg-green-500 text-white px-4 py-1.5 rounded text-xs font-semibold hover:bg-green-600"
            >
              <Download size={12} className="inline mr-1" />
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-gray-100 py-3">
        <div className="max-w-6xl mx-auto px-4 flex gap-4">
          <button className={`px-6 py-2 rounded-lg font-semibold ${isAlchemist ? `bg-gradient-to-r ${currentColors.gradient} text-white` : 'bg-white text-gray-700'}`}>
            The Alchemist
          </button>
          <button className={`px-6 py-2 rounded-lg font-semibold ${isArchitect ? `bg-gradient-to-r ${currentColors.gradient} text-white` : 'bg-white text-gray-700'}`}>
            The Architect
          </button>
          <button className={`px-6 py-2 rounded-lg font-semibold ${isMixed ? `bg-gradient-to-r ${currentColors.gradient} text-white` : 'bg-white text-gray-700'}`}>
            Mixed
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <h1 className={`text-4xl font-bold text-center mb-2 bg-gradient-to-r ${currentColors.gradient} bg-clip-text text-transparent`}>
          {isAlchemist ? 'The Alchemist' : isArchitect ? 'The Architect' : 'Mixed'}
        </h1>
        <p className={`text-center ${currentColors.text} text-sm mb-8`}>
          {isMixed 
            ? "We've been unable to identify your core type. You shift between overthinking and overfeeling, struggling to find stable criteria for certainty."
            : "You're someone who understands people and situations on a deep, emotional level."
          }
        </p>

        {/* Progress Bars */}
        {!isMixed && (
          <div className="flex gap-8 mb-8 justify-center">
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs mb-2">
                <span className={`font-semibold bg-gradient-to-r ${currentColors.gradient} bg-clip-text text-transparent`}>
                  Decision Mastery
                </span>
                <span className="text-gray-700">Core Level</span>
                <span className={`font-semibold bg-gradient-to-r ${currentColors.gradient} bg-clip-text text-transparent`}>
                  {core_type_mastery}%
                </span>
              </div>
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${currentColors.gradient}`}
                  style={{ width: `${core_type_mastery}%` }}
                />
              </div>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs mb-2">
                <span className={`font-semibold bg-gradient-to-r ${currentColors.gradient} bg-clip-text text-transparent`}>
                  Mirror Pair Awareness
                </span>
                <span className="text-gray-700">Integration</span>
                <span className={`font-semibold bg-gradient-to-r ${currentColors.gradient} bg-clip-text text-transparent`}>
                  {mirror_awareness_score}%
                </span>
              </div>
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${currentColors.gradient}`}
                  style={{ width: `${mirror_awareness_score}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Core Identity */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <div className={`${currentColors.bg} text-white text-center py-2 font-bold`}>
            Core Identity
          </div>
          <div className="p-6 bg-white">
            <h3 className="text-center text-xl font-bold mb-4">
              {isAlchemist ? 'Alchemist' : isArchitect ? 'Architect' : 'Mixed'}
            </h3>
            <div className="mb-4">
              <h4 className="font-bold mb-2">Default Decision Loop</h4>
              {!isMixed && (
                <div className="flex items-center justify-center gap-4 mb-2">
                  {decisionLoop.steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                      <div className={`px-4 py-2 rounded-lg ${currentColors.bg} text-white font-semibold`}>
                        {step}
                      </div>
                      {idx < decisionLoop.steps.length - 1 && <span>→</span>}
                    </React.Fragment>
                  ))}
                </div>
              )}
              <p className="text-sm text-center mb-1">{isMixed ? '' : 'End-validator'}</p>
              <p className="text-sm text-center font-semibold">{decisionLoop.description}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">Decision Process</h4>
              <p className="text-sm">{decisionLoop.process}</p>
            </div>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Subtype Identity */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className={`${currentColors.bg} text-white text-center py-2 font-bold`}>
              {isMixed ? 'Core Identity' : 'Subtype Identity'}
            </div>
            <div className="p-4 bg-white">
              <h3 className={`${currentColors.text} font-bold text-lg mb-2`}>{subtypeDesc.name}</h3>
              <p className="text-sm mb-3">{subtypeDesc.sees}</p>
              {!isMixed && (
                <>
                  <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Strength</h4>
                  <p className="text-xs mb-3">{subtypeDesc.strength}</p>
                  <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Blind Spot</h4>
                  <p className="text-xs mb-3">{subtypeDesc.blindSpot}</p>
                  <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Trap</h4>
                  <p className="text-xs">{subtypeDesc.trap}</p>
                </>
              )}
              {isMixed && (
                <>
                  <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Expression</h4>
                  <p className="text-xs mb-3">Flexible but inconsistent.</p>
                  <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Root Cause</h4>
                  <p className="text-xs mb-3">No single source of internal certainty.</p>
                  <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Stabilisation Path</h4>
                  <p className="text-xs">Use a simple sense → commit loop.</p>
                </>
              )}
            </div>
          </div>

          {/* Mirror Pair Awareness */}
          <div className="border border-gray-300 rounded-lg overflow-hidden">
            <div className={`${currentColors.bg} text-white text-center py-2 font-bold`}>
              Mirror Pair Awareness
            </div>
            <div className="p-4 bg-white flex items-center justify-center">
              <p className={`text-5xl font-bold ${currentColors.text}`}>{getMirrorLevel()}</p>
            </div>
          </div>
        </div>

        {/* Learning Style Preferences */}
        <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
          <div className={`${currentColors.bg} text-white text-center py-2 font-bold`}>
            Learning Style Preferences
          </div>
          <div className="p-4 bg-white">
            <div className="grid grid-cols-5 gap-4">
              <div className="border border-gray-300 rounded p-3">
                <h4 className="font-bold text-xs mb-1">Modality Preference</h4>
                <p className={`${currentColors.text} font-bold text-sm mb-1`}>{dominantModality}</p>
                <p className="text-xs text-gray-600">Spatial or diagrammatic form. Patterns, visuals, and graphs</p>
              </div>
              <div className="border border-gray-300 rounded p-3">
                <h4 className="font-bold text-xs mb-1">Approach</h4>
                <p className={`${currentColors.text} font-bold text-sm mb-1`}>{approach}</p>
                <p className="text-xs text-gray-600">Step-by-step order. Sequence builds trust in completeness</p>
              </div>
              <div className="border border-gray-300 rounded p-3">
                <h4 className="font-bold text-xs mb-1">Concept Processing</h4>
                <p className={`${currentColors.text} font-bold text-sm mb-1`}>{conceptProcessing}</p>
                <p className="text-xs text-gray-600">Patterns and symbols reveal meaning through connection.</p>
              </div>
              <div className="border border-gray-300 rounded p-3">
                <h4 className="font-bold text-xs mb-1">Working Environment</h4>
                <p className={`${currentColors.text} font-bold text-sm mb-1`}>{workingEnvironment}</p>
                <p className="text-xs text-gray-600">Deep work and solitude optimises comprehension for you</p>
              </div>
              <div className="border border-gray-300 rounded p-3">
                <h4 className="font-bold text-xs mb-1">Pace</h4>
                <p className={`${currentColors.text} font-bold text-sm mb-1`}>{pace}</p>
                <p className="text-xs text-gray-600">Controlled tempo based on task complexity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Neurodiversity (only for Mixed) */}
        {isMixed && (
          <div className="border border-gray-300 rounded-lg overflow-hidden mb-6">
            <div className={`${currentColors.bg} text-white text-center py-2 font-bold`}>
              Neurodiversity
            </div>
            <div className="p-4 bg-white">
              <h3 className={`${currentColors.text} font-bold text-lg mb-2`}>Neurodivergent</h3>
              <p className="text-sm mb-3">Your brain processes differently—this isn't a flaw, it's a feature.</p>
              <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Indicators</h4>
              <ul className="text-xs list-disc pl-5 mb-3">
                <li>Hyperfocus or distraction extremes</li>
                <li>Sensory sensitivity or overload</li>
                <li>Pattern recognition strength</li>
              </ul>
              <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Strength</h4>
              <p className="text-xs mb-3">Deep focus, creative problem-solving, unique perspective</p>
              <h4 className={`${currentColors.text} font-bold text-sm mb-1`}>Support Path</h4>
              <p className="text-xs">Structure your environment to match your processing style.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
