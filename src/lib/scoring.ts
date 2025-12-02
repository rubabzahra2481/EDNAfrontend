/**
 * E-DNA Quiz Scoring Logic
 * Calculates scores for all 7 layers based on user answers
 */

import { layer2ArchitectQuestions, layer2AlchemistQuestions, layer2MixedQuestions } from './questions-new/layer2';
import { layer3Questions } from './questions-new/layer3';
import { layer4Questions } from './questions-new/layer4';
import { layer5Questions } from './questions-new/layer5';
import { layer6Questions } from './questions-new/layer6';
import { layer7Questions } from './questions-new/layer7';

export interface UserAnswers {
  [questionId: string]: string;
}

export interface QuizResults {
  layer1: Layer1Result;
  layer2: Layer2Result;
  layer3: Layer3Result;
  layer4: Layer4Result;
  layer5: Layer5Result;
  layer6: Layer6Result;
  layer7: Layer7Result;
}

export interface Layer1Result {
  type: 'Strong Architect' | 'Medium Architect' | 'Weak Architect' | 'Blurred' | 'Weak Alchemist' | 'Medium Alchemist' | 'Strong Alchemist';
  architectCount: number;
  alchemistCount: number;
}

export interface Layer2Result {
  subtype: string;
  path: 'architect' | 'alchemist' | 'mixed';
  scores: { [key: string]: number };
}

export interface Layer3Result {
  totalScore: number;
  maxScore: number;
  dimensions: {
    [key: string]: {
      score: number;
      label: string;
    };
  };
}

export interface Layer4Result {
  dominantModality: string;
  scores: {
    visual: number;
    auditory: number;
    readWrite: number;
    kinesthetic: number;
  };
  percentages: {
    visual: number;
    auditory: number;
    readWrite: number;
    kinesthetic: number;
  };
}

export interface Layer5Result {
  profile: {
    [dimension: string]: string;
  };
  primaryProfile?: 'Neurotypical' | 'Neurodivergent' | 'Twice-Exceptional';
}

export interface Layer6Result {
  mindset: {
    growthFixed: string;
    abundanceScarcity: string;
    challengeComfort: string;
  };
  personality: {
    coreType: string;
    communicationStyle: string;
  };
}

export interface Layer7Result {
  beliefs: {
    [dimension: string]: string;
  };
}

/**
 * Calculate Layer 1: Decision Identity
 */
export function calculateLayer1(answers: UserAnswers): Layer1Result {
  let architectCount = 0;
  let alchemistCount = 0;

  for (let i = 1; i <= 8; i++) {
    const answer = answers[`L1_Q${i}`];
    if (answer === 'a') architectCount++;
    if (answer === 'b') alchemistCount++;
  }

  let type: Layer1Result['type'];
  
  if (architectCount === 8 && alchemistCount === 0) {
    type = 'Strong Architect';
  } else if (architectCount === 7 && alchemistCount === 1) {
    type = 'Medium Architect';
  } else if (architectCount === 6 && alchemistCount === 2) {
    type = 'Weak Architect';
  } else if (architectCount === 0 && alchemistCount === 8) {
    type = 'Strong Alchemist';
  } else if (architectCount === 1 && alchemistCount === 7) {
    type = 'Medium Alchemist';
  } else if (architectCount === 2 && alchemistCount === 6) {
    type = 'Weak Alchemist';
  } else {
    type = 'Blurred';
  }

  return { type, architectCount, alchemistCount };
}

/**
 * Calculate Layer 2: Execution Style Subtype
 */
export function calculateLayer2(answers: UserAnswers, layer1Result: Layer1Result): Layer2Result {
  console.log('🔍 [Layer 2 Scoring] Starting calculation...', { layer1Type: layer1Result.type });
  
  const scores: { [key: string]: number } = {};
  
  // Determine which path based on Layer 1
  let path: 'architect' | 'alchemist' | 'mixed';
  let questions: typeof layer2ArchitectQuestions;
  
  if (layer1Result.type.includes('Architect')) {
    path = 'architect';
    questions = layer2ArchitectQuestions;
  } else if (layer1Result.type.includes('Alchemist')) {
    path = 'alchemist';
    questions = layer2AlchemistQuestions;
  } else {
    path = 'mixed';
    questions = layer2MixedQuestions;
  }

  console.log('🔍 [Layer 2 Scoring] Path determined:', path, 'Questions count:', questions.length);

  // Map score values to client's naming convention
  const architectScoreMap: { [key: string]: string } = {
    'planner': 'Master Strategist',
    'operator': 'Systemised Builder',
    'analyst': 'Internal Analyzer',
    'ultimate': 'Ultimate Architect'
  };

  const alchemistScoreMap: { [key: string]: string } = {
    'oracle': 'Visionary Oracle',
    'perfectionist': 'Magnetic Perfectionist',
    'empath': 'Energetic Empath',
    'ultimate': 'Ultimate Alchemist'
  };

  // Weighted questions: Q9/Q9a/Q9m and Q12/Q12a/Q12m get 1.5x weight
  const weightedQuestionIds = ['L2_Q9', 'L2_Q12', 'L2_Q9a', 'L2_Q12a', 'L2_Q9m', 'L2_Q12m'];
  
  if (path === 'mixed') {
    // Mixed path: Count Architect-like vs Alchemist-like answers
    let weightedArchitect = 0;
    let weightedAlchemist = 0;

    // Architect-like scores
    const architectLikeScores = ['planner', 'operator', 'analyst', 'architect_ultimate'];
    // Alchemist-like scores
    const alchemistLikeScores = ['oracle', 'perfectionist', 'empath', 'alchemist_ultimate'];

    questions.forEach((question) => {
      const answerValue = answers[question.id];
      if (!answerValue) return;

      const selectedOption = question.options.find(opt => opt.value === answerValue);
      if (selectedOption && selectedOption.score) {
        const score = selectedOption.score;
        const isWeighted = weightedQuestionIds.includes(question.id);
        const weight = isWeighted ? 1.5 : 1.0;

        // Categorize based on score value
        if (architectLikeScores.includes(score)) {
          weightedArchitect += weight;
        } else if (alchemistLikeScores.includes(score)) {
          weightedAlchemist += weight;
        }
      }
    });

    // Determine result based on weighted scores with +2 threshold
    if (weightedArchitect >= weightedAlchemist + 2) {
      return { subtype: 'Architect-like', path: 'mixed', scores: { architect: weightedArchitect, alchemist: weightedAlchemist } };
    } else if (weightedAlchemist >= weightedArchitect + 2) {
      return { subtype: 'Alchemist-like', path: 'mixed', scores: { architect: weightedArchitect, alchemist: weightedAlchemist } };
    } else {
      return { subtype: 'Mixed', path: 'mixed', scores: { architect: weightedArchitect, alchemist: weightedAlchemist } };
    }
  }

  // Architect or Alchemist path: Apply weighting
  questions.forEach((question) => {
    const answerValue = answers[question.id];
    
    if (answerValue) {
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      
      if (selectedOption && selectedOption.score) {
        const scoreKey = selectedOption.score;
        
        // Map to client's naming convention
        let mappedScore = scoreKey;
        if (path === 'architect' && architectScoreMap[scoreKey]) {
          mappedScore = architectScoreMap[scoreKey];
        } else if (path === 'alchemist' && alchemistScoreMap[scoreKey]) {
          mappedScore = alchemistScoreMap[scoreKey];
        }

        // Apply weighting: Q9/Q12 questions get 1.5x weight
        const isWeighted = weightedQuestionIds.includes(question.id);
        const weight = isWeighted ? 1.5 : 1.0;
        
        scores[mappedScore] = (scores[mappedScore] || 0) + weight;
      }
    }
  });

  // Determine dominant subtype
  let subtype = '';
  let maxScore = 0;
  for (const [key, value] of Object.entries(scores)) {
    if (value > maxScore) {
      maxScore = value;
      subtype = key;
    }
  }

  console.log('✅ [Layer 2 Scoring] Final scores:', scores);
  console.log('✅ [Layer 2 Scoring] Dominant subtype:', subtype, 'with score:', maxScore);

  return { subtype, path, scores };
}

/**
 * Calculate Layer 3: Mirror Awareness
 */
export function calculateLayer3(answers: UserAnswers): Layer3Result {
  const dimensions: Layer3Result['dimensions'] = {};
  let totalScore = 0;
  const maxScore = 12; // 6 questions * 2 max points each


  layer3Questions.forEach((question) => {
    const answerValue = answers[question.id];
    
    if (answerValue) {
      // Find the option with matching value and get its score and label
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      
      if (selectedOption) {
        const score = selectedOption.score;
        const label = selectedOption.label;
        const dimensionName = question.dimension;

        dimensions[dimensionName] = { score, label };
        totalScore += score;
      }
    }
  });

  return { totalScore, maxScore, dimensions };
}

/**
 * Calculate Layer 4: Learning Style (VARK)
 */
export function calculateLayer4(answers: UserAnswers): Layer4Result {
  const scores = {
    visual: 0,
    auditory: 0,
    readWrite: 0,
    kinesthetic: 0
  };

  // Map score values from questions to our internal format
  const scoreMapping: { [key: string]: keyof typeof scores } = {
    'Visual': 'visual',
    'Auditory': 'auditory',
    'Read/Write': 'readWrite',
    'Kinesthetic': 'kinesthetic'
  };

  // Only score VARK modalities from question 23 (Modality Preference)
  layer4Questions.forEach((question) => {
    if (question.dimension === 'Modality Preference') {
      const answerValue = answers[question.id];
      
      if (answerValue) {
        const selectedOption = question.options.find(opt => opt.value === answerValue);
        
        if (selectedOption && selectedOption.score) {
          // Handle Multimodal - don't count it, or skip for now
          if (selectedOption.score !== 'Multimodal') {
            const scoreKey = scoreMapping[selectedOption.score];
            if (scoreKey) {
              scores[scoreKey]++;
            }
          }
        }
      }
    }
  });

  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const percentages = {
    visual: total > 0 ? Math.round((scores.visual / total) * 100) : 0,
    auditory: total > 0 ? Math.round((scores.auditory / total) * 100) : 0,
    readWrite: total > 0 ? Math.round((scores.readWrite / total) * 100) : 0,
    kinesthetic: total > 0 ? Math.round((scores.kinesthetic / total) * 100) : 0
  };

  let dominantModality = 'visual';
  let maxScore = scores.visual;
  for (const [key, value] of Object.entries(scores)) {
    if (value > maxScore) {
      maxScore = value;
      dominantModality = key;
    }
  }

  return { dominantModality, scores, percentages };
}

/**
 * Calculate Layer 5: Neuro Performance
 */
export function calculateLayer5(answers: UserAnswers): Layer5Result {
  const profile: { [dimension: string]: string } = {};

  // Dimension name mapping
  const dimensionNameMap: { [key: string]: string } = {
    'focus_pattern': 'Focus Pattern',
    'processing_speed': 'Processing Speed',
    'energy_pattern': 'Energy Pattern',
    'task_switching': 'Task Switching',
    'stress_response': 'Stress Response',
    'recovery_pattern': 'Recovery Pattern'
  };

  // Count scores for primary profile determination
  let ntScore = 0; // Neurotypical
  let ndScore = 0; // Neurodivergent
  let teScore = 0; // Twice-Exceptional

  layer5Questions.forEach((question) => {
    const answerValue = answers[question.id];
    
    if (answerValue) {
      // Find the option with matching value and get its score
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      
      if (selectedOption && selectedOption.score) {
        const dimensionName = dimensionNameMap[question.dimension] || question.dimension;
        profile[dimensionName] = selectedOption.score;

        // Count for primary profile
        if (selectedOption.score === 'neurotypical') {
          ntScore += 1;
        } else if (selectedOption.score === 'neurodivergent') {
          ndScore += 1;
        } else if (selectedOption.score === 'twice_exceptional') {
          teScore += 1;
        }
      }
    }
  });

  // Determine primary profile with tie-breaking: 2E > ND > NT
  let primaryProfile = 'Neurotypical';
  const maxScore = Math.max(ntScore, ndScore, teScore);
  
  if (teScore === maxScore) {
    primaryProfile = 'Twice-Exceptional';
  } else if (ndScore === maxScore) {
    primaryProfile = 'Neurodivergent';
  } else if (ntScore === maxScore) {
    primaryProfile = 'Neurotypical';
  }

  // Debug logging to verify dynamic calculation
  console.log('🧠 [Layer 5 Scoring] Dynamic calculation:', {
    answers: Object.keys(answers).filter(k => k.startsWith('L5_')).map(k => ({ question: k, answer: answers[k] })),
    scores: { neurotypical: ntScore, neurodivergent: ndScore, twice_exceptional: teScore },
    maxScore,
    calculatedProfile: primaryProfile
  });

  // Add primary profile to result (extending the return type)
  return { profile, primaryProfile: primaryProfile as 'Neurotypical' | 'Neurodivergent' | 'Twice-Exceptional' };
}

/**
 * Calculate Layer 6: Mindset & Personality
 */
export function calculateLayer6(answers: UserAnswers): Layer6Result {
  // Mindset scoring - using score property from questions instead of hardcoded option values
  const getScoreForQuestion = (questionId: string, defaultScore: string): string => {
    const answerValue = answers[questionId];
    if (!answerValue) return defaultScore;
    
    const question = layer6Questions.find(q => q.id === questionId);
    if (question) {
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      if (selectedOption && selectedOption.score) {
        return selectedOption.score;
      }
    }
    return defaultScore;
  };

  const mindset = {
    growthFixed: getScoreForQuestion('L6_Q34', 'Growth'),
    abundanceScarcity: getScoreForQuestion('L6_Q35', 'Abundance'),
    challengeComfort: getScoreForQuestion('L6_Q36', 'Challenge')
  };

  // Core personality from Q37 + Q38 - combine scores from both questions
  const q37Answer = answers['L6_Q37'];
  const q38Answer = answers['L6_Q38'];
  
  const q37Question = layer6Questions.find(q => q.id === 'L6_Q37');
  const q38Question = layer6Questions.find(q => q.id === 'L6_Q38');
  
  const q37Score = q37Answer && q37Question 
    ? q37Question.options.find(opt => opt.value === q37Answer)?.score || ''
    : '';
  const q38Score = q38Answer && q38Question
    ? q38Question.options.find(opt => opt.value === q38Answer)?.score || ''
    : '';
  
  let coreType = '';
  if (q37Score === 'Confident' && q38Score === 'Steady') coreType = 'Confident & Steady';
  else if (q37Score === 'Confident' && q38Score === 'Fast') coreType = 'Confident & Driven';
  else if (q37Score === 'Considerate' && q38Score === 'Steady') coreType = 'Considerate & Steady';
  else if (q37Score === 'Considerate' && q38Score === 'Fast') coreType = 'Fast-Moving & Adaptive';
  else if (q37Score && q38Score) {
    // Fallback: construct from available scores
    coreType = `${q37Score} & ${q38Score}`;
  }

  // Communication overlay from Q39 - use score property
  const q39Answer = answers['L6_Q39'];
  const q39Question = layer6Questions.find(q => q.id === 'L6_Q39');
  let communicationStyle = 'Diplomatic Communicator'; // Default
  if (q39Answer && q39Question) {
    const q39Option = q39Question.options.find(opt => opt.value === q39Answer);
    if (q39Option && q39Option.score) {
      communicationStyle = q39Option.score === 'Direct' 
        ? 'Direct Communicator' 
        : 'Diplomatic Communicator';
    }
  }

  return {
    mindset,
    personality: { coreType, communicationStyle }
  };
}

/**
 * Calculate Layer 7: Meta-Beliefs & Values
 */
export function calculateLayer7(answers: UserAnswers): Layer7Result {
  const beliefs: { [dimension: string]: string } = {};

  // Client's exact mapping based on question ID and answer value
  const q40Map: { [key: string]: string } = { 'a': 'Self-Relient', 'b': 'Faith-Relient', 'c': 'Dual-Relient' };
  const q41Map: { [key: string]: string } = { 'a': "I'm In Control", 'b': 'Life Influences Me', 'c': 'Shared Control' };
  const q42Map: { [key: string]: string } = { 'a': 'Responsibility', 'b': 'Compassion', 'c': 'Balanced' };
  const q43Map: { [key: string]: string } = { 'a': 'Direct Honesty', 'b': 'Gentle Honesty', 'c': 'Balanced Honesty' };
  const q44Map: { [key: string]: string } = { 'a': 'Growth Focused', 'b': 'Comfort Focused', 'c': 'Steady Growth' };
  const q45Map: { [key: string]: string } = { 'a': 'Self-Focused Impact', 'b': 'Others-Focused Impact', 'c': 'Shared Impact' };

  const questionMap: { [key: string]: { [key: string]: string } } = {
    'L7_Q40': q40Map,
    'L7_Q41': q41Map,
    'L7_Q42': q42Map,
    'L7_Q43': q43Map,
    'L7_Q44': q44Map,
    'L7_Q45': q45Map
  };

  const dimensionNames: { [key: string]: string } = {
    'L7_Q40': 'Grounding Source',
    'L7_Q41': 'Control Belief',
    'L7_Q42': 'Fairness View',
    'L7_Q43': 'Honesty Style',
    'L7_Q44': 'Growth Approach',
    'L7_Q45': 'Impact Motivation'
  };

  layer7Questions.forEach((question) => {
    const answerValue = answers[question.id];
    const dimensionName = dimensionNames[question.id] || question.dimension;
    const mapping = questionMap[question.id];
    
    if (answerValue && mapping && mapping[answerValue]) {
      beliefs[dimensionName] = mapping[answerValue];
    }
  });

  return { beliefs };
}

/**
 * Calculate all results
 */
export function calculateAllResults(answers: UserAnswers): QuizResults {
  const layer1 = calculateLayer1(answers);
  const layer2 = calculateLayer2(answers, layer1);
  const layer3 = calculateLayer3(answers);
  const layer4 = calculateLayer4(answers);
  const layer5 = calculateLayer5(answers);
  const layer6 = calculateLayer6(answers);
  const layer7 = calculateLayer7(answers);

  return {
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    layer7
  };
}


/**
 * EDNAResults interface for compatibility with existing components
 */
export interface EDNAResults {
  core_type: 'architect' | 'alchemist' | 'blurred';
  core_type_mastery: number;
  opposite_awareness: {
    R: number;
    T: number;
    I: number;
    G: number;
    C: number;
    overall: number;
  };
  mirror_awareness_level: 'low' | 'moderate' | 'high';
  mirror_awareness_score: number;
  subtype: string[];
  subtype_mastery: number;
  subtype_display: string;
  learning_style: {
    dominant: string;
    percentages: {
      visual: number;
      auditory: number;
      readWrite: number;
      kinesthetic: number;
    };
  };
  neurodiversity: {
    indicators: string[];
    score: number;
  };
  mindset: {
    traits: string[];
    score: number;
  };
  personality: {
    traits: string[];
    score: number;
  };
}

/**
 * Transform QuizResults to EDNAResults format for compatibility
 */
export function transformToEDNAResults(quizResults: QuizResults): EDNAResults {
  console.log('🔄 [Transform] Starting transformation of quiz results:', quizResults);
  
  const { layer1, layer2, layer3, layer4, layer5, layer6, layer7 } = quizResults;
  
  // Determine core type from layer1
  let core_type: 'architect' | 'alchemist' | 'blurred';
  if (layer1.type.includes('Architect')) {
    core_type = 'architect';
  } else if (layer1.type.includes('Alchemist')) {
    core_type = 'alchemist';
  } else {
    core_type = 'blurred';
  }
  
  console.log('🔄 [Transform] Core type determined:', core_type);
  
  // Calculate core type mastery (percentage based on layer1 counts)
  const totalCount = layer1.architectCount + layer1.alchemistCount;
  const dominantCount = Math.max(layer1.architectCount, layer1.alchemistCount);
  const core_type_mastery = Math.round((dominantCount / totalCount) * 100);
  
  // Get subtype from layer2
  const subtype = [layer2.subtype];
  const subtype_mastery = 100; // Default to 100% for now
  const subtype_display = layer2.subtype;
  
  console.log('🔄 [Transform] Layer 2 subtype:', layer2.subtype, 'Path:', layer2.path);
  
  // Calculate opposite awareness from layer3
  const opposite_awareness = {
    R: 0, // Recognition
    T: 0, // Translation
    I: 0, // Integration
    G: 0, // Governance
    C: 0, // Conflict Recovery
    overall: Math.round((layer3.totalScore / layer3.maxScore) * 100)
  };
  
  // Determine mirror awareness level
  let mirror_awareness_level: 'low' | 'moderate' | 'high';
  const awarenessPercent = opposite_awareness.overall;
  if (awarenessPercent < 40) {
    mirror_awareness_level = 'low';
  } else if (awarenessPercent < 70) {
    mirror_awareness_level = 'moderate';
  } else {
    mirror_awareness_level = 'high';
  }
  const mirror_awareness_score = awarenessPercent;
  
  // Learning style from layer4
  const learning_style = {
    dominant: layer4.dominantModality,
    percentages: layer4.percentages
  };
  
  // Neurodiversity from layer5
  const neurodiversity = {
    indicators: layer5.primaryProfile ? [layer5.primaryProfile] : [],
    score: 0 // Will be calculated if needed
  };
  
  console.log('🔄 [Transform] Layer 5 primary profile:', layer5.primaryProfile);
  
  // Mindset from layer6
  const mindset_transformed = {
    traits: [
      layer6.mindset.growthFixed,
      layer6.mindset.abundanceScarcity,
      layer6.mindset.challengeComfort
    ],
    score: 0 // Will be calculated if needed
  };
  
  // Personality from layer7
  const personality_transformed = {
    traits: Object.values(layer7.beliefs),
    score: 0 // Will be calculated if needed
  };
  
  console.log('🔄 [Transform] Layer 7 beliefs:', layer7.beliefs);
  
  const transformedResults = {
    core_type,
    core_type_mastery,
    opposite_awareness,
    mirror_awareness_level,
    mirror_awareness_score,
    subtype,
    subtype_mastery,
    subtype_display,
    learning_style,
    neurodiversity,
    mindset: mindset_transformed,
    personality: personality_transformed
  };
  
  console.log('✅ [Transform] Transformation complete:', transformedResults);
  
  return transformedResults;
}
