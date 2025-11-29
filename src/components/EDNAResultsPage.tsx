import React from 'react';
import { EDNAResults } from './EDNAQuiz';
import { getSubtypeProfileFromDatabase } from '../lib/subtype-profiles-database';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Share2, RotateCcw, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import brandscalingLogo from 'figma:asset/4ffc1593ac524b5a444c05cca1a8149a7e87be86.png';

interface EDNAResultsPageProps {
  results: EDNAResults;
  onRetakeQuiz: () => void;
  onViewChange: (view: string) => void;
}

export function EDNAResultsPage({ results, onRetakeQuiz, onViewChange }: EDNAResultsPageProps) {
  // Get primary subtype (first in array)
  const primarySubtype = Array.isArray(results.subtype) ? results.subtype[0] : results.subtype;
  const subtypeProfile = getSubtypeProfileFromDatabase(primarySubtype);

  // Capitalize DNA type
  const getDNATypeName = () => {
    if (results.core_type === 'architect') return 'Architect';
    if (results.core_type === 'alchemist') return 'Alchemist';
    return 'Blurred';
  };

  // Color scheme based on DNA type
  const getColorScheme = () => {
    if (results.core_type === 'architect') {
      return {
        primary: 'bg-gradient-to-r from-[#6B2C91] to-[#4A1E6B]',
        text: 'text-[#6B2C91]',
        border: 'border-[#6B2C91]',
        bgLight: 'bg-[#6B2C91]/10'
      };
    } else if (results.core_type === 'alchemist') {
      return {
        primary: 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E]',
        text: 'text-[#F6782F]',
        border: 'border-[#F6782F]',
        bgLight: 'bg-[#F6782F]/10'
      };
    } else {
      return {
        primary: 'bg-gradient-arch-scale',
        text: 'text-gradient-arch-scale',
        border: 'border-bs-plum',
        bgLight: 'bg-gradient-to-r from-[#6B2C91]/10 to-[#F6782F]/10'
      };
    }
  };

  const colorScheme = getColorScheme();

  // Calculate progress bars
  const decisionMastery = results.core_type_mastery || 0;
  const coreLevel = results.core_type_mastery || 0;
  const isBlurred = results.core_type === 'blurred';
  const isAlchemist = results.core_type === 'alchemist';
  const mirrorAwareness = isBlurred ? 0 : (results.mirror_awareness_score || 0);
  const integration = Math.round(
    (decisionMastery + (results.subtype_mastery || 0) + mirrorAwareness) / 3
  );

  // Get decision loop visual
  const getDecisionLoopVisual = () => {
    if (results.core_type === 'architect') {
      return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-8">
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${colorScheme.primary} flex items-center justify-center text-white text-sm sm:text-base`}>
              Logic
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 sm:rotate-0" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center text-sm sm:text-base">
              Emotion
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 sm:rotate-0" />
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${colorScheme.primary} flex items-center justify-center text-white relative text-sm sm:text-base`}>
              Logic
              <div className="absolute -bottom-8 sm:-bottom-6 text-xs whitespace-nowrap text-gray-600">End-validator</div>
            </div>
          </div>
        </div>
      );
    } else if (results.core_type === 'alchemist') {
      return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 my-8">
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${colorScheme.primary} flex items-center justify-center text-white text-sm sm:text-base`}>
              Emotion
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 sm:rotate-0" />
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-200 flex items-center justify-center text-sm sm:text-base">
              Logic
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-gray-400 rotate-90 sm:rotate-0" />
          <div className="flex flex-col items-center">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${colorScheme.primary} flex items-center justify-center text-white relative text-sm sm:text-base`}>
              Emotion
              <div className="absolute -bottom-8 sm:-bottom-6 text-xs whitespace-nowrap text-gray-600">End-validator</div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center my-8">
          <div className="text-xl sm:text-2xl text-gray-600">No Default Loop</div>
          <p className="text-sm text-gray-500 mt-2">As a Blurred type, your decision-making alternates between starting points</p>
        </div>
      );
    }
  };

  const copyToClipboardFallback = (text: string): boolean => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    } catch (err) {
      // Silently fail - no need to log clipboard errors
      return false;
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `My E-DNA Results: ${subtypeProfile?.subtype_name}`,
          text: `I just discovered I'm ${subtypeProfile?.subtype_name}! Check out Brandscaling to discover your Entrepreneurial DNA.`,
          url: window.location.href
        });
        return; // Successfully shared
      } catch (err) {
        // User cancelled the share dialog
        if (err instanceof Error && err.name === 'AbortError') {
          return; // Do nothing when user cancels
        }
        // Share failed, try fallback copy
      }
    }
    
    // Fallback: try to copy to clipboard
    const success = copyToClipboardFallback(window.location.href);
    if (success) {
      alert('Link copied to clipboard!');
    } else {
      // Ultimate fallback: show the URL in an alert
      alert(`Share this link:\n${window.location.href}`);
    }
  };

  if (!subtypeProfile) {
    return <div>Profile data not found</div>;
  }

  const renderHeaderAndHero = () => {
    if (isAlchemist) {
      const typedLearningStyle = results.learning_style as any;
      const dominantModality = typedLearningStyle?.dominant || typedLearningStyle?.dominant_modality || 'Visual';
      const mirrorLevel = mirrorAwareness >= 66 ? 'HIGH' : mirrorAwareness >= 33 ? 'MEDIUM' : 'LOW';

      return (
        <>
          <header className="bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-[61px] h-[61px] bg-gradient-to-r from-[#FF6B35] via-[#F7931E] to-[#42047D] rounded-full flex items-center justify-center text-white text-xl font-bold">
                  ∞
                </div>
                <span className="font-semibold text-xs text-black">Entrepreneurial DNA</span>
              </div>
              <div className="flex items-center gap-4 sm:gap-6">
                <button
                  onClick={() => onViewChange('dashboard')}
                  className="text-xs font-semibold flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors"
                >
                  <span>🏠</span>
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
                <button
                  onClick={handleShare}
                  className="text-xs font-semibold flex items-center gap-1.5 text-black hover:text-gray-700 transition-colors"
                >
                  <span>🔗</span>
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="bg-[#50c55d] text-white px-4 py-1.5 rounded-[5px] text-[11px] font-semibold hover:bg-[#45b04f] transition-colors"
                >
                  Download PDF
                </button>
              </div>
            </div>
            {/* Gradient divider line - purple to pink/orange */}
            <div className="h-[1px] bg-gradient-to-r from-[#C72170] to-[#FF6B35]"></div>
          </header>

          <section className="bg-white py-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Title with gradient */}
              <h1 className="text-[32px] font-semibold text-center mb-2">
                <span className="text-[#42047d]">The </span>
                <span className="bg-gradient-to-r from-[#42047d] to-[#f6782f] bg-clip-text text-transparent">Alchemist</span>
              </h1>

              {/* Subtitle in orange */}
              <p className="text-center text-[#f6782f] text-[10px] font-semibold mb-6 leading-relaxed">
                You lead with intuition, alignment and emotional intelligence. You<br />
                translate meaning into motion.
              </p>

              {/* Progress Bars - Two bars side by side */}
              <div className="mb-6 space-y-4">
                {/* Decision Mastery */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold bg-gradient-to-r from-[#42047d] to-[#f97316] bg-clip-text text-transparent">Decision Mastery</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-gray-800">Core Level</span>
                      <div className="w-[5px] h-[5px] rounded-full bg-gradient-to-r from-[#42047d] to-[#F97316]"></div>
                      <span className="text-[10px] font-semibold bg-gradient-to-r from-[#42047d] to-[#f97316] bg-clip-text text-transparent">{decisionMastery}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#d9d9d9] rounded-[20px] h-[9px] overflow-hidden">
                    <div
                      className="h-full rounded-[20px] bg-gradient-to-r from-[#42047d] to-[#F6782F]"
                      style={{ width: `${decisionMastery}%` }}
                    />
                  </div>
                </div>

                {/* Mirror Pair Awareness */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-semibold bg-gradient-to-r from-[#42047d] to-[#f97316] bg-clip-text text-transparent">Mirror Pair Awareness</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-semibold text-gray-800">Integration</span>
                      <div className="w-[5px] h-[5px] rounded-full bg-gradient-to-r from-[#42047d] to-[#F97316]"></div>
                      <span className="text-[10px] font-semibold bg-gradient-to-r from-[#42047d] to-[#f97316] bg-clip-text text-transparent">{mirrorAwareness}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#d9d9d9] rounded-[20px] h-[9px] overflow-hidden">
                    <div
                      className="h-full rounded-[20px] bg-gradient-to-r from-[#42047d] to-[#f6782f]"
                      style={{ width: `${mirrorAwareness}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
  }

  return (
      <>
      <header className="border-b border-gray-200 py-4 sticky top-0 bg-white z-50 shadow-sm">
        <div className="container-bs-desktop flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img src={brandscalingLogo} alt="Brandscaling" className="h-8 w-auto" />
            <h3 className={colorScheme.text}>Entrepreneurial DNA</h3>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => onViewChange('dashboard')}>
              Dashboard
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Share</span>
            </Button>
          </div>
        </div>
      </header>

      <section className="hero-section section-padding-bs">
        <div className="container-bs-desktop">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`mb-4 ${colorScheme.text}`}>
              The {getDNATypeName()}
            </h1>
            <p className="text-xl text-gray-600 mb-12">
              {subtypeProfile.hero_subtitle}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div>
                <div className="flex justify-between mb-2">
                  <span>Decision Mastery</span>
                  <span className={colorScheme.text}>{decisionMastery}%</span>
                </div>
                <Progress value={decisionMastery} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span>Core Level</span>
                  <span className={colorScheme.text}>{coreLevel}%</span>
                </div>
                <Progress value={coreLevel} className="h-3" />
              </div>
              {!isBlurred && (
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Mirror Pair Awareness</span>
                    <span className={colorScheme.text}>{mirrorAwareness}%</span>
                  </div>
                  <Progress value={mirrorAwareness} className="h-3" />
                </div>
              )}
              <div>
                <div className="flex justify-between mb-2">
                  <span>Integration</span>
                  <span className={colorScheme.text}>{integration}%</span>
                </div>
                <Progress value={integration} className="h-3" />
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-white" data-pdf-content="true">
      {renderHeaderAndHero()}

      {/* Section 1: Core Identity & Mirror Pair Awareness */}
      {isAlchemist ? (
        <section className="bg-white py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Core Identity Section */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
              <div className="bg-[#f6782f] h-[25px] flex items-center justify-center">
                <p className="text-[14px] font-bold text-black">Core Identity</p>
              </div>
              <div className="p-6">
                <h3 className="text-[13px] font-bold text-black mb-4 text-center">Alchemist</h3>
                
                {/* Default Decision Loop */}
                <div className="mb-4">
                  <p className="text-[12px] font-semibold text-black mb-2">Default Decision Loop</p>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="bg-gradient-to-r from-[#42047d] to-[#f6782f] h-[24px] px-4 rounded-[5px] flex items-center justify-center">
                      <p className="text-[10px] font-semibold text-white">Emotion</p>
                    </div>
                    <span className="text-black">→</span>
                    <div className="bg-gradient-to-r from-[#42047d] to-[#f6782f] h-[24px] px-4 rounded-[5px] flex items-center justify-center">
                      <p className="text-[10px] font-semibold text-white">Logic</p>
                    </div>
                    <span className="text-black">→</span>
                    <div className="bg-gradient-to-r from-[#42047d] to-[#f6782f] h-[24px] px-4 rounded-[5px] flex items-center justify-center">
                      <p className="text-[10px] font-semibold text-white">Emotion</p>
                    </div>
                    <p className="text-[8px] text-black ml-2">End-validator</p>
                  </div>
                  <p className="text-[10px] font-medium text-black text-center">Emotion overrides and validates your decisions.</p>
                </div>

                {/* Decision Process */}
                <div>
                  <p className="text-[12px] font-semibold text-black mb-2">Decision Process</p>
                  <p className="text-[11px] font-normal text-black">You lead through narrative and energy, translating emotion into motion.</p>
                </div>
              </div>
            </div>

            {/* Subtype Identity and Mirror Pair Awareness - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Subtype Identity */}
              <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
                <div className="bg-[#f6782f] h-[20px] flex items-center justify-center">
                  <p className="text-[14px] font-bold text-black">Subtype Identity</p>
                </div>
                <div className="p-4">
                  <h4 className="text-[12px] font-bold text-[#f6782f] mb-2">{(typeof subtypeProfile?.subtype_name === 'string' ? subtypeProfile.subtype_name.replace('The ', '') : subtypeProfile?.subtype_name) || 'Visionary Oracle'}</h4>
                  <p className="text-[10px] font-normal text-black mb-3">Sees futures before others</p>
                  
                  <div className="mb-3">
                    <p className="text-[12px] font-bold text-[#f6782f] mb-1">Strength</p>
                    <p className="text-[10px] font-normal text-black">connects weak signals into foresight, inspires belief</p>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-[12px] font-bold text-[#f6782f] mb-1">Blind Spot</p>
                    <p className="text-[10px] font-normal text-black">falls in love with story, mistakes resonance for traction</p>
                  </div>
                  
                  <div>
                    <p className="text-[12px] font-bold text-[#42047d] mb-1">
                      <span className="text-[#f6782f]">Trap</span>
                    </p>
                    <p className="text-[12px] font-medium text-black">True narrative ≠ valid plan.</p>
                  </div>
                </div>
              </div>

              {/* Mirror Pair Awareness */}
              <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
                <div className="bg-[#f6782f] h-[20px] flex items-center justify-center">
                  <p className="text-[14px] font-bold text-black">Mirror Pair Awareness</p>
                </div>
                <div className="p-4 flex items-center justify-center h-full">
                  <p className="text-[16px] font-bold text-[#f6782f]">{mirrorAwareness >= 66 ? 'HIGH' : mirrorAwareness >= 33 ? 'MEDIUM' : 'LOW'}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
      <section className="section-padding-bs bg-gray-50">
        <div className="container-bs-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Core Identity Box */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${colorScheme.primary} text-white p-6`}>
                <h3>Core Identity</h3>
              </div>
              <div className="p-8">
                <h2 className="text-center mb-4">
                  {getDNATypeName()}
                </h2>
                <p className="text-center mb-2">Default Decision Loop</p>
                {getDecisionLoopVisual()}
                <div className="mt-8">
                  <p className="text-gray-700">
                    {subtypeProfile.loop_description}
                  </p>
                </div>
              </div>
            </div>

            {/* Mirror Pair Awareness Box */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className={`${colorScheme.primary} text-white p-6`}>
                <h3>Mirror Pair Awareness</h3>
              </div>
              <div className="p-8">
                {isBlurred ? (
                  <div className="text-center py-8">
                    <p className="text-gray-700 text-lg">
                      As a Blurred identity, you do not have a mirror pair awareness.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-6">
                    {/* Where You Struggle */}
                    <div className={`p-4 rounded-lg ${colorScheme.bgLight}`}>
                      <h4 className="mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        Where You Struggle
                      </h4>
                      <p className="text-sm text-gray-700">
                        {subtypeProfile.where_you_struggle}
                      </p>
                    </div>

                    {/* Where They Struggle */}
                    <div className="p-4 rounded-lg bg-gray-100">
                      <h4 className="mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-gray-400" />
                        Where They Struggle
                      </h4>
                      <p className="text-sm text-gray-700">
                        {subtypeProfile.where_they_struggle}
                      </p>
                    </div>

                    {/* Where You Lead */}
                    <div className={`p-4 rounded-lg ${colorScheme.bgLight}`}>
                      <h4 className="mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        Where You Lead
                      </h4>
                      <p className="text-sm text-gray-700">
                        {subtypeProfile.where_you_lead}
                      </p>
                    </div>

                    {/* Where They Lead */}
                    <div className="p-4 rounded-lg bg-gray-100">
                      <h4 className="mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-gray-400" />
                        Where They Lead
                      </h4>
                      <p className="text-sm text-gray-700">
                        {subtypeProfile.where_they_lead}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* Section 2: Subtype Identity */}
      <section className="section-padding-bs">
        <div className="container-bs-desktop">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className={`${colorScheme.primary} text-white p-6`}>
              <h3>Subtype Identity</h3>
            </div>
            <div className="p-8">
              <h2 className={`text-center mb-4 ${colorScheme.text}`}>
                {subtypeProfile.subtype_name}
              </h2>
              <p className="mb-6">Expressions</p>
              <p className="text-gray-700 mb-8">
                {subtypeProfile.subtype_description}
              </p>

              {subtypeProfile.identity && (
                <p className="text-gray-700 mb-8">
                  {subtypeProfile.identity}
                </p>
              )}

              {subtypeProfile.expression && (
                <p className="text-gray-700 mb-8">
                  {subtypeProfile.expression}
                </p>
              )}

              {subtypeProfile.destabilisation_path && (
                <div className="mb-8">
                  <p className="text-gray-600 mb-2">Destabilisation Path:</p>
                  <p className="text-gray-700">{subtypeProfile.destabilisation_path}</p>
                </div>
              )}

              {subtypeProfile.root_cause && (
                <div className="mb-8">
                  <p className="text-gray-600 mb-2">Root Cause:</p>
                  <p className="text-gray-700">{subtypeProfile.root_cause}</p>
                </div>
              )}

              {subtypeProfile.stabilisation_path && (
                <div className="mb-8">
                  <p className="text-gray-600 mb-2">Stabilisation Path:</p>
                  <p className="text-gray-700">{subtypeProfile.stabilisation_path}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                {/* Strengths */}
                <div className={`p-6 rounded-lg ${colorScheme.bgLight}`}>
                  <h4 className="mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Strengths
                  </h4>
                  <p className="text-gray-700">
                    {subtypeProfile.strengths}
                  </p>
                </div>

                {/* Risks & Blind Spots */}
                <div className="p-6 rounded-lg bg-amber-50 border border-amber-200">
                  <h4 className="mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-amber-500" />
                    Risks & Blind Spots
                  </h4>
                  <p className="text-gray-700">
                    {subtypeProfile.risks_and_blind_spots}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Learning Style Preferences (Layer 4) */}
      <section className="section-padding-bs bg-gray-50">
        <div className="container-bs-desktop">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white p-6">
              <h3>Learning Style Preferences</h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <p className="mb-2">Modality Preference</p>
                  <p className="text-[#F6782F] capitalize mb-2">
                    {results.learning_style?.modality 
                      ? (Array.isArray(results.learning_style.modality) 
                          ? results.learning_style.modality[0]?.replace(/_/g, ' ') || 'Multimodal'
                          : String(results.learning_style.modality).replace(/_/g, ' '))
                      : 'Multimodal'}
                  </p>
                  <p className="text-xs text-gray-600">
                    {(() => {
                      const modality = Array.isArray(results.learning_style?.modality) 
                        ? results.learning_style.modality[0] 
                        : results.learning_style?.modality;
                      if (modality === 'visual') return 'You learn best through watching and observing';
                      if (modality === 'auditory') return 'You learn best through listening and discussion';
                      if (modality === 'read_write') return 'You learn best through reading and note-taking';
                      if (modality === 'kinesthetic') return 'You learn best through hands-on practice';
                      return 'You learn best using multiple methods';
                    })()}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <p className="mb-2">Approach</p>
                  <p className="text-[#F6782F] capitalize mb-2">{results.learning_style?.approach || 'Adaptive'}</p>
                  <p className="text-xs text-gray-600">
                    {results.learning_style?.approach === 'structured' 
                      ? 'You prefer step-by-step plans'
                      : results.learning_style?.approach === 'exploratory'
                      ? 'You prefer big-picture exploration'
                      : 'You adapt your approach as needed'}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <p className="mb-2">Concept Processing</p>
                  <p className="text-[#F6782F] capitalize mb-2">{results.learning_style?.concept_processing || 'Flexible'}</p>
                  <p className="text-xs text-gray-600">
                    {results.learning_style?.concept_processing === 'concrete'
                      ? 'You prefer real-world examples'
                      : results.learning_style?.concept_processing === 'abstract'
                      ? 'You prefer theoretical principles'
                      : 'You balance theory and practice'}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <p className="mb-2">Working Environment</p>
                  <p className="text-[#F6782F] capitalize mb-2">{results.learning_style?.working_environment || 'Adaptive'}</p>
                  <p className="text-xs text-gray-600">
                    {results.learning_style?.working_environment === 'individual'
                      ? 'You work best independently'
                      : results.learning_style?.working_environment === 'collaborative'
                      ? 'You work best with others'
                      : 'You adapt to solo or team work'}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-orange-50">
                  <p className="mb-2">Pace</p>
                  <p className="text-[#F6782F] capitalize mb-2">{results.learning_style?.pace || 'Flexible'}</p>
                  <p className="text-xs text-gray-600">
                    {results.learning_style?.pace === 'fast'
                      ? 'You prefer intensive learning'
                      : results.learning_style?.pace === 'slow'
                      ? 'You prefer steady, thorough learning'
                      : 'You adjust your pace as needed'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Neurodiversity (Layer 5) */}
      <section className="section-padding-bs">
        <div className="container-bs-desktop">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white p-6">
              <h3>Neurodiversity</h3>
            </div>
            <div className="p-8">
              <p className="text-[#F6782F] mb-4">
                {(results.neurodiversity_profile as any)?.headline || 'Neurotypical Profile'}
              </p>
              <p className="text-gray-700 mb-6">
                {(results.neurodiversity_profile as any)?.description || 'Your responses indicate a neurotypical cognitive profile with balanced processing across attention, sensory integration, and executive function.'}
              </p>
              {results.adaptations_summary && results.adaptations_summary.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3">Recommended Adaptations:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {results.adaptations_summary.map((adaptation, idx) => (
                      <li key={idx}>{adaptation}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="text-sm text-gray-500 italic">
                This is just a screening test to better understand possible neurodivergent traits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Mindset and Personality (Layer 6) */}
      <section className="section-padding-bs bg-gray-50">
        <div className="container-bs-desktop">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-[#6B2C91] to-[#4A1E6B] text-white p-6">
              <h3>Mindset and Personality</h3>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Mindset */}
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <p className="mb-2">Mindset</p>
                  <p className="text-[#6B2C91] mb-4">
                    {results.mindset_personality?.mindset || 'Growth Mindset'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {results.mindset_personality?.mindset === 'growth' 
                      ? 'You believe abilities can be developed through dedication and hard work'
                      : results.mindset_personality?.mindset === 'fixed'
                      ? 'You tend to believe abilities are static and unchangeable'
                      : 'You show a balance of fixed and growth mindset tendencies'}
                  </p>
                </div>

                {/* Risk Tolerance */}
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <p className="mb-2">Risk Tolerance</p>
                  <p className="text-[#6B2C91] mb-4">
                    {results.mindset_personality?.risk_tolerance || 'Moderate'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {results.mindset_personality?.risk_tolerance === 'high'
                      ? 'You embrace uncertainty and see risk as opportunity'
                      : results.mindset_personality?.risk_tolerance === 'low'
                      ? 'You prefer calculated, low-risk approaches'
                      : 'You balance caution with opportunity-seeking'}
                  </p>
                </div>

                {/* Extraversion */}
                <div className="text-center p-6 rounded-lg bg-purple-50">
                  <p className="mb-2">Extraversion</p>
                  <p className="text-[#6B2C91] mb-4">
                    {results.mindset_personality?.extraversion || 'Ambivert'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {results.mindset_personality?.extraversion === 'extravert'
                      ? 'You gain energy from social interaction and external stimulation'
                      : results.mindset_personality?.extraversion === 'introvert'
                      ? 'You recharge through solitude and internal reflection'
                      : 'You balance social interaction with alone time'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Meta-Beliefs and Values (Layer 7) */}
      <section className="section-padding-bs">
        <div className="container-bs-desktop">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-5xl mx-auto">
            <div className="bg-gradient-to-r from-[#6B2C91] to-[#4A1E6B] text-white p-6">
              <h3>Meta-Beliefs and Values</h3>
            </div>
            <div className="p-8">
              <p className="text-[#6B2C91] mb-4">
                {results.layer7_profile?.headline || 'Mission-Driven and Profit-focused'}
              </p>
              <p className="text-gray-700 mb-6">
                {results.layer7_profile?.one_liner || 'You balance purpose with practicality, seeing business as both a force for good and a vehicle for sustainable growth.'}
              </p>
              
              {results.layer7_profile?.strengths && results.layer7_profile.strengths.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3">Core Strengths:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {results.layer7_profile.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.layer7_profile?.watchouts && results.layer7_profile.watchouts.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3">Watch Out For:</h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {results.layer7_profile.watchouts.map((watchout, idx) => (
                      <li key={idx}>{watchout}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="section-padding-bs bg-gradient-arch-scale">
        <div className="container-bs-desktop text-center">
          <h2 className="text-white mb-8">What's Next?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-bs-red hover:bg-bs-red/90 text-white"
              onClick={handleShare}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Results
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white hover:bg-gray-100"
              onClick={onRetakeQuiz}
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
