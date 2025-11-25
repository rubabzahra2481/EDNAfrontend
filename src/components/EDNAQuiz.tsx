import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { ChevronLeft, ChevronRight, BarChart3, Brain } from 'lucide-react';
import { OnboardingFlow } from './OnboardingFlow';
import { getSubtypeProfile } from '../lib/subtype-data';
import { layer4Questions, layer5Questions, layer6Questions, layer7Questions } from '../lib/layer4-7-questions';
import { calculateLayer7Scores, detectMisalignments, generateValueProfile, type Layer7Scores } from '../lib/layer7-analysis';
import { generateLayer6Profile, type Layer6Profile } from '../lib/layer6-analysis';
import { generateAccessibilityAdaptations, getAdaptationsSummary, type NeurodiversityAdaptations } from '../lib/layer5-adaptations';
import { generateNeurodiversityProfile, type NeurodiversityProfile } from '../lib/layer5-capability-model';
import { layer1Questions } from '../lib/layer1-questions';
import { getLayer2Questions, architectSubtypeQuestions } from '../lib/layer2-questions';
import { layer3Questions, getLayer3Questions } from '../lib/layer3-questions';
import { calculateLayer1Score, calculateLayer2Score, calculateLayer3Score, calculateLayer4Score, calculateLayer5Score, calculateLayer6Score, calculateLayer7Score } from '../lib/scoring-engine';

interface EDNAQuizProps {
  onComplete: (results: EDNAResults) => void;
  onBackToHome?: () => void;
  userEmail?: string | null; // For saving/loading progress
}

export interface EDNAResults {
  core_type: 'architect' | 'alchemist' | 'blurred';
  core_type_mastery: number; // Layer 1 mastery percentage
  opposite_awareness: {
    R: number; // Recognition
    T: number; // Translation
    I: number; // Integration
    G: number; // Governance
    C: number; // Conflict Recovery
    overall: number;
  };
  mirror_awareness_level: 'low' | 'moderate' | 'high'; // Layer 3 awareness level
  mirror_awareness_score: number; // Layer 3 score (33%, 66%, or 99%)
  subtype: string[];
  subtype_mastery: number; // Layer 2 mastery percentage
  subtype_display: string; // e.g., "Systemised Builder (40%) leading to Internal Analyzer (30%)"
  framing_order: string[];
  default_artifacts: string[];
  decision_templates: string[];
  sprint_style: string | string[];
  progression_goals: string[];
  raw_scores: {
    architect: number;
    alchemist: number;
  };
  score_band: string;
  // Layer 4: Learning Style Preferences
  learning_style: {
    modality: string[];
    approach: string;
    concept_processing: string;
    working_environment: string;
    pace: string;
  };
  // Layer 5: Neurodiversity
  neurodiversity: {
    adhd_traits: boolean;
    dyslexia_traits: boolean;
    autism_traits: boolean;
    sensory_sensitivity: boolean;
    accessibility_needs: string[];
  };
  // Layer 5 Enhanced Adaptations
  accessibility_adaptations: NeurodiversityAdaptations;
  adaptations_summary: string[];
  neurodiversity_profile: NeurodiversityProfile;
  // Layer 6: Mindset & Personality
  mindset_personality: {
    mindset: string;
    risk_tolerance: string;
    extraversion: string;
  };
  // Layer 6 Enhanced Profile
  layer6_profile: Layer6Profile;
  // Layer 7: Meta-Beliefs & Values
  meta_beliefs: {
    scaling_orientation: number;
    mission_orientation: number;
    innovation_orientation: number;
    numbers_orientation: number;
    abundance_orientation: number;
    market_orientation: number;
    composite_values: any;
  };
  // Layer 7 Enhanced Data
  layer7_scores: Layer7Scores;
  layer7_profile: {
    headline: string;
    one_liner: string;
    strengths: string[];
    watchouts: string[];
    edna_adaptations: string[];
    next_7_days: string[];
    score_band: string;
  };
  misalignments: Array<{
    type: string;
    description: string;
    impact: string;
    remedy: string;
  }>;
  answers: QuizAnswer[];
}

interface QuizAnswer {
  question_id: string;
  selected: string;
  layer: number;
  dimension?: string;
  tags?: string[]; // Tags for the selected option (architect, alchemist, blurred)
  subtype?: string; // Subtype for Layer 2 questions
}

interface Question {
  id: string;
  layer: number;
  dimension?: string; // For Layer 3: R, T, I, G, or C
  question: string;
  context?: string;
  applicable_to?: 'architect' | 'alchemist' | 'blurred' | 'both';
  options: {
    text: string;
    value: string;
    score_architect?: number;
    score_alchemist?: number;
    mirror_score?: number; // For Layer 3 questions
    tags?: string[]; // Tags for the selected option
    subtype?: string; // For Layer 2 questions
  }[];
}

export function EDNAQuiz({ onComplete, onBackToHome, userEmail }: EDNAQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [isStarted, setIsStarted] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true); // Show onboarding first
  const [allQuestions, setAllQuestions] = useState<Question[]>([...layer1Questions]);
  const [layer1CoreType, setLayer1CoreType] = useState<'architect' | 'alchemist' | 'blurred' | null>(null);

  const progress = isStarted ? ((currentQuestion + 1) / allQuestions.length) * 100 : 0;
  
  // Debug: Test that question loading functions work (only on mount)
  React.useEffect(() => {
    console.log('🔍 Testing question loaders on mount:');
    console.log('  - getLayer2Questions("architect"):', getLayer2Questions('architect').length);
    console.log('  - getLayer2Questions("alchemist"):', getLayer2Questions('alchemist').length);
    console.log('  - getLayer3Questions("architect"):', getLayer3Questions('architect').length);
    console.log('  - getLayer3Questions("alchemist"):', getLayer3Questions('alchemist').length);
  }, []);
  
  // Debug: Log whenever allQuestions or currentQuestion changes
  React.useEffect(() => {
    console.log(`📊 State changed - currentQuestion: ${currentQuestion}, allQuestions.length: ${allQuestions.length}`);
    if (allQuestions[currentQuestion]) {
      console.log(`   Current question:`, allQuestions[currentQuestion].id, `Layer ${allQuestions[currentQuestion].layer}`);
    }
  }, [currentQuestion, allQuestions]);

  // Load saved progress for authenticated users
  React.useEffect(() => {
    const loadProgress = async () => {
      if (!userEmail) return;
      
      try {
        const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
        const response = await fetch(`${BACKEND_URL}/api/quiz/get-progress?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();
        
        if (data.success && data.progressData) {
          console.log('💾 Loading saved quiz progress...');
          const { currentQuestion: savedQuestion, answers: savedAnswers, allQuestions: savedQuestions, layer1CoreType: savedCoreType } = data.progressData;
          
          setCurrentQuestion(savedQuestion || 0);
          setAnswers(savedAnswers || []);
          setAllQuestions(savedQuestions || [...layer1Questions]);
          setLayer1CoreType(savedCoreType || null);
          setIsStarted(true); // Auto-start if progress exists
          
          console.log(`✅ Loaded progress: Question ${savedQuestion + 1}/${savedQuestions.length}`);
        }
      } catch (error) {
        console.error('⚠️ Failed to load quiz progress:', error);
      }
    };
    
    loadProgress();
  }, [userEmail]);

  // Save progress after each answer (for authenticated users)
  const saveProgress = async () => {
    if (!userEmail || !isStarted) return;
    
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const progressData = {
        currentQuestion,
        answers,
        allQuestions,
        layer1CoreType
      };
      
      await fetch(`${BACKEND_URL}/api/quiz/save-progress`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail, progressData })
      });
      
      console.log(`💾 Progress saved at question ${currentQuestion + 1}`);
    } catch (error) {
      console.error('⚠️ Failed to save quiz progress:', error);
    }
  };

  const handleStart = () => {
    setIsStarted(true);
  };

  const calculateResults = (finalAnswers: QuizAnswer[]): EDNAResults => {
    // Use the new scoring engine for Layer 1 calculations
    const layer1Score = calculateLayer1Score(finalAnswers);
    const layer2Score = calculateLayer2Score(finalAnswers);
    const layer3Score = calculateLayer3Score(finalAnswers, layer1Score.core_type);

    // Layer 1: Core Type using new scoring engine
    const core_type = layer1Score.core_type;
    const core_type_mastery = layer1Score.mastery;
    const raw_scores = layer1Score.raw_scores;

    // Layer 2: Subtype using new scoring engine  
    const subtype = layer2Score.primary_subtype;
    const subtype_mastery = layer2Score.mastery;
    const subtype_display = layer2Score.display_label;

    // Layer 3: Mirror Pair Awareness using new scoring engine
    const opposite_awareness = {
      R: 0,
      T: 0,
      I: 0,
      G: 0,
      C: 0,
      overall: layer3Score.mirror_awareness_score
    }; // Layer3 doesn't have dimension_scores in new engine
    const mirror_awareness_score = layer3Score.mirror_awareness_score;
    const mirror_awareness_level = layer3Score.mirror_awareness_level;
    const score_band = `${layer3Score.correct_mirror_count}/${layer3Score.total_mirror_questions}`;

    // Get subtype profile data
    // Blurred subtypes (overthinker, performer, self_forsaker, self_betrayer) don't have profiles in subtype-data.ts
    const blurredSubtypes = ['overthinker', 'performer', 'self_forsaker', 'self_betrayer'];
    const subtypeProfile = blurredSubtypes.includes(subtype) ? null : getSubtypeProfile(subtype);
    
    // Determine artifacts, templates, etc. based on subtype profile
    const framingOrder = subtypeProfile?.edna_adaptations.framing_order || determineFramingOrder(subtype);
    const defaultArtifacts = subtypeProfile?.edna_adaptations.artifacts.slice(0, 3) || determineDefaultArtifacts(subtype);
    const decisionTemplates = subtypeProfile?.edna_adaptations.decision_hygiene || ['premortem', 'stopping_rules', 'commit_log'];
    const sprintStyle = subtypeProfile?.edna_adaptations.sprint_style || determineSprintStyle(core_type, subtype);
    const progressionGoals = determineProgressionGoals(core_type, mirror_awareness_score, subtypeProfile);

    // Layer 4: Learning Style Preferences using scoring engine
    const layer4Score = calculateLayer4Score(finalAnswers);
    const learning_style = {
      modality: [layer4Score.modality_preference], // Convert to array for compatibility
      approach: layer4Score.approach,
      concept_processing: layer4Score.concept_processing,
      working_environment: layer4Score.working_environment,
      pace: layer4Score.pace
    };

    // Layer 5: Neurodiversity using scoring engine
    const layer5Score = calculateLayer5Score(finalAnswers);
    const neurodiversity = {
      adhd_traits: layer5Score.traits_detected.includes('adhd'),
      dyslexia_traits: layer5Score.traits_detected.includes('dyslexia'),
      autism_traits: layer5Score.traits_detected.includes('autism'),
      sensory_sensitivity: layer5Score.traits_detected.includes('sensory'),
      accessibility_needs: layer5Score.traits_detected
    };

    // Enhanced Layer 5 Analysis
    const accessibilityProfile = {
      adhd_traits: neurodiversity.adhd_traits,
      dyslexia_traits: neurodiversity.dyslexia_traits,
      autism_traits: neurodiversity.autism_traits,
      sensory_sensitivity: neurodiversity.sensory_sensitivity,
      custom_needs: []
    };
    const accessibility_adaptations = generateAccessibilityAdaptations(accessibilityProfile);
    const adaptations_summary = getAdaptationsSummary(accessibilityProfile);
    
    // Enhanced Layer 5 Capability Model
    const neurodiversity_profile = generateNeurodiversityProfile({
      adhd: neurodiversity.adhd_traits,
      dyslexia: neurodiversity.dyslexia_traits,
      autism: neurodiversity.autism_traits,
      sensory: neurodiversity.sensory_sensitivity
    });

    // Layer 6: Mindset & Personality using scoring engine
    const layer6Score = calculateLayer6Score(finalAnswers);
    const mindset_personality = {
      mindset: layer6Score.mindset,
      risk_tolerance: layer6Score.risk_tolerance,
      extraversion: layer6Score.extraversion
    };

    // Enhanced Layer 6 Analysis
    const layer6_profile = generateLayer6Profile(
      mindset_personality.mindset,
      mindset_personality.risk_tolerance,
      mindset_personality.extraversion
    );

    // Layer 7: Meta-Beliefs & Values using scoring engine
    const layer7Score = calculateLayer7Score(finalAnswers);
    const meta_beliefs = {
      scaling_orientation: layer7Score.growth_philosophy,
      mission_orientation: layer7Score.purpose_filter,
      innovation_orientation: layer7Score.change_appetite,
      numbers_orientation: layer7Score.metrics_orientation,
      abundance_orientation: layer7Score.resource_worldview,
      market_orientation: layer7Score.social_worldview,
      composite_values: {
        dominant_beliefs: layer7Score.dominant_beliefs,
        conflicted_beliefs: layer7Score.conflicted_beliefs
      }
    };

    // Enhanced Layer 7 Analysis
    const layer7_scores = calculateLayer7Scores(finalAnswers);
    const misalignments = detectMisalignments(layer7_scores);
    const layer7_profile = generateValueProfile(layer7_scores, misalignments);

    return {
      core_type,
      core_type_mastery,
      opposite_awareness,
      mirror_awareness_level,
      mirror_awareness_score,
      subtype: [subtype], // Convert to array for compatibility
      subtype_mastery,
      subtype_display,
      framing_order: framingOrder,
      default_artifacts: defaultArtifacts,
      decision_templates: decisionTemplates,
      sprint_style: sprintStyle,
      progression_goals: progressionGoals,
      raw_scores,
      score_band,
      learning_style,
      neurodiversity,
      accessibility_adaptations,
      adaptations_summary,
      neurodiversity_profile,
      mindset_personality,
      layer6_profile,
      meta_beliefs,
      layer7_scores,
      layer7_profile,
      misalignments,
      answers: finalAnswers
    };
  };

  const determineFramingOrder = (subtype: string | string[]): string[] => {
    const subtypeKey = Array.isArray(subtype) ? subtype[0] : subtype;
    
    const orderMap: { [key: string]: string[] } = {
      master_strategist: ['strategy', 'analytics', 'sop', 'narrative', 'partner'],
      systemised_builder: ['sop', 'analytics', 'strategy', 'partner', 'narrative'],
      internal_analyser: ['analytics', 'strategy', 'sop', 'narrative', 'partner'],
      visionary_oracle: ['narrative', 'partner', 'strategy', 'analytics', 'sop'],
      energetic_empath: ['partner', 'narrative', 'strategy', 'analytics', 'sop'],
      // Blurred subtypes
      overthinker: ['analytics', 'strategy', 'narrative', 'sop', 'partner'],
      performer: ['narrative', 'partner', 'strategy', 'analytics', 'sop'],
      self_forsaker: ['strategy', 'sop', 'analytics', 'narrative', 'partner'],
      self_betrayer: ['strategy', 'narrative', 'analytics', 'sop', 'partner']
    };

    return orderMap[subtypeKey] || ['strategy', 'sop', 'analytics', 'narrative', 'partner'];
  };

  const determineDefaultArtifacts = (subtype: string | string[]): string[] => {
    const subtypeKey = Array.isArray(subtype) ? subtype[0] : subtype;
    
    const artifactMap: { [key: string]: string[] } = {
      master_strategist: ['roadmap', 'sop', 'notebook'],
      systemised_builder: ['sop', 'notebook', 'roadmap'],
      internal_analyser: ['notebook', 'roadmap', 'sop'],
      visionary_oracle: ['narrative_brief', 'trac', 'roadmap'],
      energetic_empath: ['trac', 'narrative_brief', 'roadmap'],
      // Blurred subtypes
      overthinker: ['notebook', 'roadmap', 'narrative_brief'],
      performer: ['narrative_brief', 'trac', 'roadmap'],
      self_forsaker: ['sop', 'roadmap', 'notebook'],
      self_betrayer: ['roadmap', 'notebook', 'narrative_brief']
    };

    return artifactMap[subtypeKey] || ['roadmap', 'sop', 'notebook'];
  };

  const determineSprintStyle = (coreType: string, subtype: string | string[]): string => {
    const subtypeArray = Array.isArray(subtype) ? subtype : [subtype];
    
    if (coreType === 'architect') {
      if (subtypeArray.includes('systemised_builder')) return 'bet_cycle';
      if (subtypeArray.includes('internal_analyser')) return 'oga_kaisen';
      return 'exp_cycle';
    } else if (coreType === 'alchemist') {
      if (subtypeArray.includes('visionary_oracle')) return 'demo_burst';
      if (subtypeArray.includes('energetic_empath')) return 'ritual_sprint';
      return 'demo_burst';
    } else {
      // Blurred subtypes
      if (subtypeArray.includes('overthinker')) return 'reflection_cycle';
      if (subtypeArray.includes('performer')) return 'momentum_sprint';
      if (subtypeArray.includes('self_forsaker')) return 'structured_flow';
      if (subtypeArray.includes('self_betrayer')) return 'adaptive_sprint';
      return 'adaptive_sprint';
    }
  };

  const determineProgressionGoals = (coreType: string, overallScore: number, subtypeProfile: any): string[] => {
    const goals: string[] = [];
    
    // Add subtype-specific progression path if available
    if (subtypeProfile?.edna_adaptations.progression_path) {
      goals.push(subtypeProfile.edna_adaptations.progression_path);
    }
    
    // Add mirror awareness improvements based on score
    if (overallScore < 70) {
      goals.push('Strengthen recognition of opposite validator signals');
      goals.push('Practice translation between systematic and creative modes');
    }

    if (coreType === 'architect') {
      goals.push('Add creative experiments and narrative development');
      goals.push('Practice translating specifications into compelling stories');
    } else if (coreType === 'alchemist') {
      goals.push('Add systematic validation and process documentation');
      goals.push('Practice translating stories into measurable specifications');
    } else {
      // Blurred type
      goals.push('Choose one core validator and strengthen it');
      goals.push('Set up clear governance between both modes');
    }

    return goals;
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const question = allQuestions[currentQuestion];
      const selectedOption = question.options.find(opt => opt.value === selectedAnswer);
      
      const newAnswer: QuizAnswer = {
        question_id: question.id,
        selected: selectedAnswer,
        layer: question.layer,
        dimension: question.dimension,
        tags: selectedOption?.tags,
        subtype: (selectedOption as any)?.subtype // For Layer 2 questions
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);
      
      // Check if we just completed Layer 1
      let questionsToUse = allQuestions;
      if (question.layer === 1 && currentQuestion === layer1Questions.length - 1) {
        // Calculate Layer 1 core type
        const layer1Score = calculateLayer1Score(newAnswers);
        const coreType = layer1Score.core_type;
        setLayer1CoreType(coreType);
        
        // Load appropriate Layer 2 questions based on core type
        // ALL core types get Layer 2 questions (Architect, Alchemist, AND Blurred)
        const layer2Qs = getLayer2Questions(coreType);
        console.log(`✅ Core Type: ${coreType}`);
        console.log(`✅ Layer 2 Questions loaded:`, layer2Qs.length, layer2Qs);
        
        // Load appropriate Layer 3 questions based on core type
        // Blurred types SKIP Layer 3 (no mirror pair)
        const layer3Qs = coreType === 'blurred' ? [] : getLayer3Questions(coreType);
        console.log(`✅ Layer 3 Questions loaded:`, layer3Qs.length, layer3Qs);
        
        // Build complete question list (cast all to any to handle different question interfaces)
        const completeQuestions = [
          ...(layer1Questions as any[]),
          ...(layer2Qs as any[]),
          ...(layer3Qs as any[]),
          ...(layer4Questions as any[]),
          ...(layer5Questions as any[]),
          ...(layer6Questions as any[]),
          ...(layer7Questions as any[])
        ] as Question[];
        
        console.log(`Total questions:`, completeQuestions.length, 'breakdown:', {
          L1: layer1Questions.length,
          L2: layer2Qs.length,
          L3: layer3Qs.length,
          L4: layer4Questions.length,
          L5: layer5Questions.length,
          L6: layer6Questions.length,
          L7: layer7Questions.length
        });
        
        // Debug: Show questions 7-12 to verify Layer 1 and Layer 2 boundary
        console.log('🔍 Questions at Layer 1/2 boundary:');
        for (let i = 6; i < Math.min(14, completeQuestions.length); i++) {
          const q = completeQuestions[i];
          console.log(`  [${i}] ${q.id} - Layer ${q.layer}`);
        }
        
        setAllQuestions(completeQuestions);
        questionsToUse = completeQuestions; // Use the updated list for the check below
        
        console.log(`✅ Next question will be:`, completeQuestions[currentQuestion + 1]);
      }
      
      // Check if there are more questions using the correct question list
      if (currentQuestion < questionsToUse.length - 1) {
        const nextQ = questionsToUse[currentQuestion + 1];
        console.log(`➡️ Moving to question ${currentQuestion + 2}:`, nextQ.id, `Layer ${nextQ.layer}`);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer('');
        
        // Save progress after moving to next question
        setTimeout(() => saveProgress(), 100);
      } else {
        // Calculate and submit results
        const results = calculateResults(newAnswers);
        
        // Clear saved progress when quiz is completed
        if (userEmail) {
          const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
          fetch(`${BACKEND_URL}/api/quiz/delete-progress`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: userEmail })
          }).then(() => console.log('✅ Quiz progress cleared after completion'));
        }
        
        onComplete(results);
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAnswers(answers.slice(0, -1));
      setSelectedAnswer('');
    }
  };

  // Show onboarding flow first
  if (showOnboarding && !isStarted) {
    return (
      <OnboardingFlow 
        onComplete={() => {
          setShowOnboarding(false);
          handleStart();
        }}
      />
    );
  }
  
  if (!isStarted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          {/* Gradient Header Strip */}
          <div className="h-[6px] bg-gradient-arch-scale-90 rounded-t-lg mb-8" aria-hidden="true" />
          
          <div className="program-flow-card">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-arch-scale rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h1 className="typo-h1-bs text-gradient-arch-scale mb-4">
                  E-DNA Assessment
                </h1>
                <p className="typo-body-bs text-gray-600">
                  Discover your Entrepreneurial DNA and unlock personalized business insights
                </p>
              </div>

              {/* Features Grid */}
              <div className="flex justify-center gap-8 py-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--bs-color-indigo)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <BarChart3 className="w-6 h-6 text-[var(--bs-color-indigo)]" />
                  </div>
                  <span className="typo-caption-bs text-gray-700">7-Layer Analysis</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--bs-color-orange)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Brain className="w-6 h-6 text-[var(--bs-color-orange)]" />
                  </div>
                  <span className="typo-caption-bs text-gray-700">Personalized AI</span>
                </div>
              </div>
              
              {/* Overview Box */}
              <div className="bg-gray-50 rounded-lg p-6 text-left">
                <h3 className="typo-h3-bs mb-4">Assessment Overview:</h3>
                <ul className="typo-body-bs text-gray-600 space-y-2">
                  <li className="flex items-start">
                    <span className="text-[var(--bs-color-orange)] mr-2">•</span>
                    <span>{allQuestions.length} scientifically-designed questions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--bs-color-orange)] mr-2">•</span>
                    <span>15-20 minute completion time</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--bs-color-orange)] mr-2">•</span>
                    <span>Comprehensive business profile analysis</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--bs-color-orange)] mr-2">•</span>
                    <span>Personalized learning and AI recommendations</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handleStart}
                  className="cta-gradient-bs w-full px-8"
                >
                  Begin Assessment
                </button>
                
                {onBackToHome && (
                  <button 
                    onClick={onBackToHome}
                    className="w-full h-[var(--bs-cta-height)] px-8 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Back to Home
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = allQuestions[currentQuestion];

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-3xl">
        {/* Progress Strip */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="typo-caption-bs text-gray-600">
              Question {currentQuestion + 1} of {allQuestions.length}
            </span>
            <span className="inline-block px-3 py-1 bg-gradient-arch-scale rounded-full">
              <span className="typo-caption-bs text-white">Layer {question.layer}</span>
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Card */}
        <div className="program-flow-card">
          <div className="mb-8">
            <h2 className="typo-h3-bs mb-3">{question.question}</h2>
            {question.context && (
              <p className="typo-body-bs text-gray-600">{question.context}</p>
            )}
          </div>
          
          <RadioGroup 
            value={selectedAnswer} 
            onValueChange={setSelectedAnswer}
            className="space-y-3 mb-8"
          >
            {question.options.map((option, index) => (
              <div 
                key={index} 
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
                  selectedAnswer === option.value 
                    ? 'border-[var(--bs-color-orange)] bg-orange-50/50' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedAnswer(option.value)}
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label 
                  htmlFor={option.value} 
                  className="flex-1 cursor-pointer typo-body-bs"
                >
                  {option.text}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between gap-4">
            <Button 
              onClick={handleBack}
              variant="outline"
              disabled={currentQuestion === 0}
              className="h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)] hover:bg-[var(--bs-color-indigo)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <button 
              onClick={handleNext}
              disabled={!selectedAnswer}
              className="cta-gradient-bs px-8 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>
                {currentQuestion === allQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
              </span>
              {currentQuestion < allQuestions.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// import React, { useState } from 'react';
// import { Button } from './ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Progress } from './ui/progress';
// import { RadioGroup, RadioGroupItem } from './ui/radio-group';
// import { Label } from './ui/label';
// import { ChevronLeft, ChevronRight, BarChart3, Brain } from 'lucide-react';
// import { getSubtypeProfile } from '../lib/subtype-data';
// import { layer4Questions, layer5Questions, layer6Questions, layer7Questions } from '../lib/layer4-7-questions';
// import { calculateLayer7Scores, detectMisalignments, generateValueProfile, type Layer7Scores } from '../lib/layer7-analysis';
// import { generateLayer6Profile, type Layer6Profile } from '../lib/layer6-analysis';
// import { generateAccessibilityAdaptations, getAdaptationsSummary, type NeurodiversityAdaptations } from '../lib/layer5-adaptations';
// import { generateNeurodiversityProfile, type NeurodiversityProfile } from '../lib/layer5-capability-model';
// import { layer1Questions } from '../lib/layer1-questions';
// import { getLayer2Questions, architectSubtypeQuestions } from '../lib/layer2-questions';
// import { layer3Questions, getLayer3Questions } from '../lib/layer3-questions';
// import { calculateLayer1Score, calculateLayer2Score, calculateLayer3Score, calculateLayer4Score, calculateLayer5Score, calculateLayer6Score, calculateLayer7Score } from '../lib/scoring-engine';

// interface EDNAQuizProps {
//   onComplete: (results: EDNAResults) => void;
//   onBackToHome?: () => void;
// }

// export interface EDNAResults {
//   core_type: 'architect' | 'alchemist' | 'blurred';
//   core_type_mastery: number; // Layer 1 mastery percentage
//   opposite_awareness: {
//     R: number; // Recognition
//     T: number; // Translation
//     I: number; // Integration
//     G: number; // Governance
//     C: number; // Conflict Recovery
//     overall: number;
//   };
//   mirror_awareness_level: 'low' | 'moderate' | 'high'; // Layer 3 awareness level
//   mirror_awareness_score: number; // Layer 3 score (33%, 66%, or 99%)
//   subtype: string[];
//   subtype_mastery: number; // Layer 2 mastery percentage
//   subtype_display: string; // e.g., "Systemised Builder (40%) leading to Internal Analyzer (30%)"
//   framing_order: string[];
//   default_artifacts: string[];
//   decision_templates: string[];
//   sprint_style: string | string[];
//   progression_goals: string[];
//   raw_scores: {
//     architect: number;
//     alchemist: number;
//   };
//   score_band: string;
//   // Layer 4: Learning Style Preferences
//   learning_style: {
//     modality: string[];
//     approach: string;
//     concept_processing: string;
//     working_environment: string;
//     pace: string;
//   };
//   // Layer 5: Neurodiversity
//   neurodiversity: {
//     adhd_traits: boolean;
//     dyslexia_traits: boolean;
//     autism_traits: boolean;
//     sensory_sensitivity: boolean;
//     accessibility_needs: string[];
//   };
//   // Layer 5 Enhanced Adaptations
//   accessibility_adaptations: NeurodiversityAdaptations;
//   adaptations_summary: string[];
//   neurodiversity_profile: NeurodiversityProfile;
//   // Layer 6: Mindset & Personality
//   mindset_personality: {
//     mindset: string;
//     risk_tolerance: string;
//     extraversion: string;
//   };
//   // Layer 6 Enhanced Profile
//   layer6_profile: Layer6Profile;
//   // Layer 7: Meta-Beliefs & Values
//   meta_beliefs: {
//     scaling_orientation: string;
//     mission_orientation: string;
//     innovation_orientation: string;
//     numbers_orientation: string;
//     abundance_orientation: string;
//     market_orientation: string;
//     composite_values: string[];
//   };
//   // Layer 7 Enhanced Data
//   layer7_scores: Layer7Scores;
//   layer7_profile: {
//     headline: string;
//     one_liner: string;
//     strengths: string[];
//     watchouts: string[];
//     edna_adaptations: string[];
//     next_7_days: string[];
//     score_band: string;
//   };
//   misalignments: Array<{
//     type: string;
//     description: string;
//     impact: string;
//     remedy: string;
//   }>;
//   answers: QuizAnswer[];
// }

// interface QuizAnswer {
//   question_id: string;
//   selected: string;
//   layer: number;
//   dimension?: string;
//   tags?: string[]; // Tags for the selected option (architect, alchemist, blurred)
//   subtype?: string; // Subtype for Layer 2 questions
// }

// interface Question {
//   id: string;
//   layer: number;
//   dimension?: string; // For Layer 3: R, T, I, G, or C
//   question: string;
//   context?: string;
//   applicable_to?: 'architect' | 'alchemist' | 'blurred' | 'both';
//   options: {
//     text: string;
//     value: string;
//     score_architect?: number;
//     score_alchemist?: number;
//     mirror_score?: number; // For Layer 3 questions
//     tags?: string[]; // Tags for the selected option
//     subtype?: string; // For Layer 2 questions
//   }[];
// }

// export function EDNAQuiz({ onComplete, onBackToHome }: EDNAQuizProps) {
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [answers, setAnswers] = useState<QuizAnswer[]>([]);
//   const [selectedAnswer, setSelectedAnswer] = useState<string>('');
//   const [isStarted, setIsStarted] = useState(false);
//   const [allQuestions, setAllQuestions] = useState<Question[]>([...layer1Questions]);
//   const [layer1CoreType, setLayer1CoreType] = useState<'architect' | 'alchemist' | 'blurred' | null>(null);

//   const progress = isStarted ? ((currentQuestion + 1) / allQuestions.length) * 100 : 0;
  
//   // Debug: Test that question loading functions work (only on mount)
//   React.useEffect(() => {
//     console.log('🔍 Testing question loaders on mount:');
//     console.log('  - getLayer2Questions("architect"):', getLayer2Questions('architect').length);
//     console.log('  - getLayer2Questions("alchemist"):', getLayer2Questions('alchemist').length);
//     console.log('  - getLayer3Questions("architect"):', getLayer3Questions('architect').length);
//     console.log('  - getLayer3Questions("alchemist"):', getLayer3Questions('alchemist').length);
//   }, []);
  
//   // Debug: Log whenever allQuestions or currentQuestion changes
//   React.useEffect(() => {
//     console.log(`📊 State changed - currentQuestion: ${currentQuestion}, allQuestions.length: ${allQuestions.length}`);
//     if (allQuestions[currentQuestion]) {
//       console.log(`   Current question:`, allQuestions[currentQuestion].id, `Layer ${allQuestions[currentQuestion].layer}`);
//     }
//   }, [currentQuestion, allQuestions]);

//   const handleStart = () => {
//     setIsStarted(true);
//   };

//   const calculateResults = (finalAnswers: QuizAnswer[]): EDNAResults => {
//     // Use the new scoring engine for Layer 1 calculations
//     const layer1Score = calculateLayer1Score(finalAnswers);
//     const layer2Score = calculateLayer2Score(finalAnswers);
//     const layer3Score = calculateLayer3Score(finalAnswers);

//     // Layer 1: Core Type using new scoring engine
//     const core_type = layer1Score.core_type;
//     const core_type_mastery = layer1Score.mastery;
//     const raw_scores = layer1Score.raw_scores;

//     // Layer 2: Subtype using new scoring engine  
//     const subtype = layer2Score.primary_subtype;
//     const subtype_mastery = layer2Score.mastery;
//     const subtype_display = layer2Score.display_label;

//     // Layer 3: Mirror Pair Awareness using new scoring engine
//     const opposite_awareness = {}; // Layer3 doesn't have dimension_scores in new engine
//     const mirror_awareness_score = layer3Score.mirror_awareness_score;
//     const mirror_awareness_level = layer3Score.mirror_awareness_level;
//     const score_band = `${layer3Score.correct_mirror_count}/${layer3Score.total_mirror_questions}`;

//     // Get subtype profile data
//     // Blurred subtypes (overthinker, performer, self_forsaker, self_betrayer) don't have profiles in subtype-data.ts
//     const blurredSubtypes = ['overthinker', 'performer', 'self_forsaker', 'self_betrayer'];
//     const subtypeProfile = blurredSubtypes.includes(subtype) ? null : getSubtypeProfile(subtype);
    
//     // Determine artifacts, templates, etc. based on subtype profile
//     const framingOrder = subtypeProfile?.edna_adaptations.framing_order || determineFramingOrder(subtype);
//     const defaultArtifacts = subtypeProfile?.edna_adaptations.artifacts.slice(0, 3) || determineDefaultArtifacts(subtype);
//     const decisionTemplates = subtypeProfile?.edna_adaptations.decision_hygiene || ['premortem', 'stopping_rules', 'commit_log'];
//     const sprintStyle = subtypeProfile?.edna_adaptations.sprint_style || determineSprintStyle(core_type, subtype);
//     const progressionGoals = determineProgressionGoals(core_type, mirror_awareness_score, subtypeProfile);

//     // Layer 4: Learning Style Preferences using scoring engine
//     const layer4Score = calculateLayer4Score(finalAnswers);
//     const learning_style = {
//       modality: [layer4Score.modality_preference], // Convert to array for compatibility
//       approach: layer4Score.approach,
//       concept_processing: layer4Score.concept_processing,
//       working_environment: layer4Score.working_environment,
//       pace: layer4Score.pace
//     };

//     // Layer 5: Neurodiversity using scoring engine
//     const layer5Score = calculateLayer5Score(finalAnswers);
//     const neurodiversity = {
//       adhd_traits: layer5Score.traits_detected.includes('adhd'),
//       dyslexia_traits: layer5Score.traits_detected.includes('dyslexia'),
//       autism_traits: layer5Score.traits_detected.includes('autism'),
//       sensory_sensitivity: layer5Score.traits_detected.includes('sensory'),
//       accessibility_needs: layer5Score.traits_detected
//     };

//     // Enhanced Layer 5 Analysis
//     const accessibilityProfile = {
//       adhd_traits: neurodiversity.adhd_traits,
//       dyslexia_traits: neurodiversity.dyslexia_traits,
//       autism_traits: neurodiversity.autism_traits,
//       sensory_sensitivity: neurodiversity.sensory_sensitivity,
//       custom_needs: []
//     };
//     const accessibility_adaptations = generateAccessibilityAdaptations(accessibilityProfile);
//     const adaptations_summary = getAdaptationsSummary(accessibilityProfile);
    
//     // Enhanced Layer 5 Capability Model
//     const neurodiversity_profile = generateNeurodiversityProfile({
//       adhd: neurodiversity.adhd_traits,
//       dyslexia: neurodiversity.dyslexia_traits,
//       autism: neurodiversity.autism_traits,
//       sensory: neurodiversity.sensory_sensitivity
//     });

//     // Layer 6: Mindset & Personality using scoring engine
//     const layer6Score = calculateLayer6Score(finalAnswers);
//     const mindset_personality = {
//       mindset: layer6Score.mindset,
//       risk_tolerance: layer6Score.risk_tolerance,
//       extraversion: layer6Score.extraversion
//     };

//     // Enhanced Layer 6 Analysis
//     const layer6_profile = generateLayer6Profile(
//       mindset_personality.mindset,
//       mindset_personality.risk_tolerance,
//       mindset_personality.extraversion
//     );

//     // Layer 7: Meta-Beliefs & Values using scoring engine
//     const layer7Score = calculateLayer7Score(finalAnswers);
//     const meta_beliefs = {
//       scaling_orientation: layer7Score.scaling_orientation,
//       mission_orientation: layer7Score.mission_orientation,
//       innovation_orientation: layer7Score.innovation_orientation,
//       numbers_orientation: layer7Score.numbers_orientation,
//       abundance_orientation: layer7Score.abundance_orientation,
//       market_orientation: layer7Score.market_orientation,
//       composite_values: layer7Score.composite_values
//     };

//     // Enhanced Layer 7 Analysis
//     const layer7_scores = calculateLayer7Scores(finalAnswers);
//     const misalignments = detectMisalignments(layer7_scores);
//     const layer7_profile = generateValueProfile(layer7_scores, misalignments);

//     return {
//       core_type,
//       core_type_mastery,
//       opposite_awareness,
//       mirror_awareness_level,
//       mirror_awareness_score,
//       subtype: [subtype], // Convert to array for compatibility
//       subtype_mastery,
//       subtype_display,
//       framing_order: framingOrder,
//       default_artifacts: defaultArtifacts,
//       decision_templates: decisionTemplates,
//       sprint_style: sprintStyle,
//       progression_goals: progressionGoals,
//       raw_scores,
//       score_band,
//       learning_style,
//       neurodiversity,
//       accessibility_adaptations,
//       adaptations_summary,
//       neurodiversity_profile,
//       mindset_personality,
//       layer6_profile,
//       meta_beliefs,
//       layer7_scores,
//       layer7_profile,
//       misalignments,
//       answers: finalAnswers
//     };
//   };

//   const determineFramingOrder = (subtype: string | string[]): string[] => {
//     const subtypeKey = Array.isArray(subtype) ? subtype[0] : subtype;
    
//     const orderMap: { [key: string]: string[] } = {
//       master_strategist: ['strategy', 'analytics', 'sop', 'narrative', 'partner'],
//       systemised_builder: ['sop', 'analytics', 'strategy', 'partner', 'narrative'],
//       internal_analyser: ['analytics', 'strategy', 'sop', 'narrative', 'partner'],
//       visionary_oracle: ['narrative', 'partner', 'strategy', 'analytics', 'sop'],
//       energetic_empath: ['partner', 'narrative', 'strategy', 'analytics', 'sop'],
//       // Blurred subtypes
//       overthinker: ['analytics', 'strategy', 'narrative', 'sop', 'partner'],
//       performer: ['narrative', 'partner', 'strategy', 'analytics', 'sop'],
//       self_forsaker: ['strategy', 'sop', 'analytics', 'narrative', 'partner'],
//       self_betrayer: ['strategy', 'narrative', 'analytics', 'sop', 'partner']
//     };

//     return orderMap[subtypeKey] || ['strategy', 'sop', 'analytics', 'narrative', 'partner'];
//   };

//   const determineDefaultArtifacts = (subtype: string | string[]): string[] => {
//     const subtypeKey = Array.isArray(subtype) ? subtype[0] : subtype;
    
//     const artifactMap: { [key: string]: string[] } = {
//       master_strategist: ['roadmap', 'sop', 'notebook'],
//       systemised_builder: ['sop', 'notebook', 'roadmap'],
//       internal_analyser: ['notebook', 'roadmap', 'sop'],
//       visionary_oracle: ['narrative_brief', 'trac', 'roadmap'],
//       energetic_empath: ['trac', 'narrative_brief', 'roadmap'],
//       // Blurred subtypes
//       overthinker: ['notebook', 'roadmap', 'narrative_brief'],
//       performer: ['narrative_brief', 'trac', 'roadmap'],
//       self_forsaker: ['sop', 'roadmap', 'notebook'],
//       self_betrayer: ['roadmap', 'notebook', 'narrative_brief']
//     };

//     return artifactMap[subtypeKey] || ['roadmap', 'sop', 'notebook'];
//   };

//   const determineSprintStyle = (coreType: string, subtype: string | string[]): string => {
//     const subtypeArray = Array.isArray(subtype) ? subtype : [subtype];
    
//     if (coreType === 'architect') {
//       if (subtypeArray.includes('systemised_builder')) return 'bet_cycle';
//       if (subtypeArray.includes('internal_analyser')) return 'oga_kaisen';
//       return 'exp_cycle';
//     } else if (coreType === 'alchemist') {
//       if (subtypeArray.includes('visionary_oracle')) return 'demo_burst';
//       if (subtypeArray.includes('energetic_empath')) return 'ritual_sprint';
//       return 'demo_burst';
//     } else {
//       // Blurred subtypes
//       if (subtypeArray.includes('overthinker')) return 'reflection_cycle';
//       if (subtypeArray.includes('performer')) return 'momentum_sprint';
//       if (subtypeArray.includes('self_forsaker')) return 'structured_flow';
//       if (subtypeArray.includes('self_betrayer')) return 'adaptive_sprint';
//       return 'adaptive_sprint';
//     }
//   };

//   const determineProgressionGoals = (coreType: string, overallScore: number, subtypeProfile: any): string[] => {
//     const goals: string[] = [];
    
//     // Add subtype-specific progression path if available
//     if (subtypeProfile?.edna_adaptations.progression_path) {
//       goals.push(subtypeProfile.edna_adaptations.progression_path);
//     }
    
//     // Add mirror awareness improvements based on score
//     if (overallScore < 70) {
//       goals.push('Strengthen recognition of opposite validator signals');
//       goals.push('Practice translation between systematic and creative modes');
//     }

//     if (coreType === 'architect') {
//       goals.push('Add creative experiments and narrative development');
//       goals.push('Practice translating specifications into compelling stories');
//     } else if (coreType === 'alchemist') {
//       goals.push('Add systematic validation and process documentation');
//       goals.push('Practice translating stories into measurable specifications');
//     } else {
//       // Blurred type
//       goals.push('Choose one core validator and strengthen it');
//       goals.push('Set up clear governance between both modes');
//     }

//     return goals;
//   };

//   const handleNext = () => {
//     if (selectedAnswer) {
//       const question = allQuestions[currentQuestion];
//       const selectedOption = question.options.find(opt => opt.value === selectedAnswer);
      
//       const newAnswer: QuizAnswer = {
//         question_id: question.id,
//         selected: selectedAnswer,
//         layer: question.layer,
//         dimension: question.dimension,
//         tags: selectedOption?.tags,
//         subtype: (selectedOption as any)?.subtype // For Layer 2 questions
//       };

//       const newAnswers = [...answers, newAnswer];
//       setAnswers(newAnswers);
      
//       // Check if we just completed Layer 1
//       let questionsToUse = allQuestions;
//       if (question.layer === 1 && currentQuestion === layer1Questions.length - 1) {
//         // Calculate Layer 1 core type
//         const layer1Score = calculateLayer1Score(newAnswers);
//         const coreType = layer1Score.core_type;
//         setLayer1CoreType(coreType);
        
//         // Load appropriate Layer 2 questions based on core type
//         // ALL core types get Layer 2 questions (Architect, Alchemist, AND Blurred)
//         const layer2Qs = getLayer2Questions(coreType);
//         console.log(`✅ Core Type: ${coreType}`);
//         console.log(`✅ Layer 2 Questions loaded:`, layer2Qs.length, layer2Qs);
        
//         // Load appropriate Layer 3 questions based on core type
//         // Blurred types SKIP Layer 3 (no mirror pair)
//         const layer3Qs = coreType === 'blurred' ? [] : getLayer3Questions(coreType);
//         console.log(`✅ Layer 3 Questions loaded:`, layer3Qs.length, layer3Qs);
        
//         // Build complete question list (cast all to any to handle different question interfaces)
//         const completeQuestions = [
//           ...(layer1Questions as any[]),
//           ...(layer2Qs as any[]),
//           ...(layer3Qs as any[]),
//           ...(layer4Questions as any[]),
//           ...(layer5Questions as any[]),
//           ...(layer6Questions as any[]),
//           ...(layer7Questions as any[])
//         ] as Question[];
        
//         console.log(`Total questions:`, completeQuestions.length, 'breakdown:', {
//           L1: layer1Questions.length,
//           L2: layer2Qs.length,
//           L3: layer3Qs.length,
//           L4: layer4Questions.length,
//           L5: layer5Questions.length,
//           L6: layer6Questions.length,
//           L7: layer7Questions.length
//         });
        
//         // Debug: Show questions 7-12 to verify Layer 1 and Layer 2 boundary
//         console.log('🔍 Questions at Layer 1/2 boundary:');
//         for (let i = 6; i < Math.min(14, completeQuestions.length); i++) {
//           const q = completeQuestions[i];
//           console.log(`  [${i}] ${q.id} - Layer ${q.layer}`);
//         }
        
//         setAllQuestions(completeQuestions);
//         questionsToUse = completeQuestions; // Use the updated list for the check below
        
//         console.log(`✅ Next question will be:`, completeQuestions[currentQuestion + 1]);
//       }
      
//       // Check if there are more questions using the correct question list
//       if (currentQuestion < questionsToUse.length - 1) {
//         const nextQ = questionsToUse[currentQuestion + 1];
//         console.log(`➡️ Moving to question ${currentQuestion + 2}:`, nextQ.id, `Layer ${nextQ.layer}`);
//         setCurrentQuestion(currentQuestion + 1);
//         setSelectedAnswer('');
//       } else {
//         // Calculate and submit results
//         const results = calculateResults(newAnswers);
//         onComplete(results);
//       }
//     }
//   };

//   const handleBack = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       setAnswers(answers.slice(0, -1));
//       setSelectedAnswer('');
//     }
//   };

//   if (!isStarted) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center p-4">
//         <div className="w-full max-w-2xl">
//           {/* Gradient Header Strip */}
//           <div className="h-[6px] bg-gradient-arch-scale-90 rounded-t-lg mb-8" aria-hidden="true" />
          
//           <div className="program-flow-card">
//             <div className="text-center space-y-6">
//               <div className="w-20 h-20 mx-auto bg-gradient-arch-scale rounded-full flex items-center justify-center">
//                 <Brain className="w-10 h-10 text-white" />
//               </div>
              
//               <div>
//                 <h1 className="typo-h1-bs text-gradient-arch-scale mb-4">
//                   E-DNA Assessment
//                 </h1>
//                 <p className="typo-body-bs text-gray-600">
//                   Discover your Entrepreneurial DNA and unlock personalized business insights
//                 </p>
//               </div>

//               {/* Features Grid */}
//               <div className="flex justify-center gap-8 py-6">
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-[var(--bs-color-indigo)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
//                     <BarChart3 className="w-6 h-6 text-[var(--bs-color-indigo)]" />
//                   </div>
//                   <span className="typo-caption-bs text-gray-700">7-Layer Analysis</span>
//                 </div>
//                 <div className="text-center">
//                   <div className="w-12 h-12 bg-[var(--bs-color-orange)]/10 rounded-full flex items-center justify-center mx-auto mb-2">
//                     <Brain className="w-6 h-6 text-[var(--bs-color-orange)]" />
//                   </div>
//                   <span className="typo-caption-bs text-gray-700">Personalized AI</span>
//                 </div>
//               </div>
              
//               {/* Overview Box */}
//               <div className="bg-gray-50 rounded-lg p-6 text-left">
//                 <h3 className="typo-h3-bs mb-4">Assessment Overview:</h3>
//                 <ul className="typo-body-bs text-gray-600 space-y-2">
//                   <li className="flex items-start">
//                     <span className="text-[var(--bs-color-orange)] mr-2">•</span>
//                     <span>{allQuestions.length} scientifically-designed questions</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="text-[var(--bs-color-orange)] mr-2">•</span>
//                     <span>15-20 minute completion time</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="text-[var(--bs-color-orange)] mr-2">•</span>
//                     <span>Comprehensive business profile analysis</span>
//                   </li>
//                   <li className="flex items-start">
//                     <span className="text-[var(--bs-color-orange)] mr-2">•</span>
//                     <span>Personalized learning and AI recommendations</span>
//                   </li>
//                 </ul>
//               </div>
              
//               <div className="space-y-3">
//                 <button 
//                   onClick={handleStart}
//                   className="cta-gradient-bs w-full px-8"
//                 >
//                   Begin Assessment
//                 </button>
                
//                 {onBackToHome && (
//                   <button 
//                     onClick={onBackToHome}
//                     className="w-full h-[var(--bs-cta-height)] px-8 border-2 border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
//                   >
//                     Back to Home
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const question = allQuestions[currentQuestion];

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl">
//         {/* Progress Strip */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-2">
//             <span className="typo-caption-bs text-gray-600">
//               Question {currentQuestion + 1} of {allQuestions.length}
//             </span>
//             <span className="inline-block px-3 py-1 bg-gradient-arch-scale rounded-full">
//               <span className="typo-caption-bs text-white">Layer {question.layer}</span>
//             </span>
//           </div>
//           <Progress value={progress} className="h-2" />
//         </div>

//         {/* Question Card */}
//         <div className="program-flow-card">
//           <div className="mb-8">
//             <h2 className="typo-h3-bs mb-3">{question.question}</h2>
//             {question.context && (
//               <p className="typo-body-bs text-gray-600">{question.context}</p>
//             )}
//           </div>
          
//           <RadioGroup 
//             value={selectedAnswer} 
//             onValueChange={setSelectedAnswer}
//             className="space-y-3 mb-8"
//           >
//             {question.options.map((option, index) => (
//               <div 
//                 key={index} 
//                 className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all cursor-pointer ${
//                   selectedAnswer === option.value 
//                     ? 'border-[var(--bs-color-orange)] bg-orange-50/50' 
//                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                 }`}
//                 onClick={() => setSelectedAnswer(option.value)}
//               >
//                 <RadioGroupItem value={option.value} id={option.value} />
//                 <Label 
//                   htmlFor={option.value} 
//                   className="flex-1 cursor-pointer typo-body-bs"
//                 >
//                   {option.text}
//                 </Label>
//               </div>
//             ))}
//           </RadioGroup>
          
//           {/* Navigation Buttons */}
//           <div className="flex justify-between gap-4">
//             <Button 
//               onClick={handleBack}
//               variant="outline"
//               disabled={currentQuestion === 0}
//               className="h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)] hover:bg-[var(--bs-color-indigo)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <ChevronLeft className="w-4 h-4 mr-2" />
//               Back
//             </Button>
            
//             <button 
//               onClick={handleNext}
//               disabled={!selectedAnswer}
//               className="cta-gradient-bs px-8 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <span>
//                 {currentQuestion === allQuestions.length - 1 ? 'Complete Assessment' : 'Next'}
//               </span>
//               {currentQuestion < allQuestions.length - 1 && <ChevronRight className="w-4 h-4" />}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export { type EDNAResults };