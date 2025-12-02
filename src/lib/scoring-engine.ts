/**
 * EDNA Scoring Engine
 * Implements the official 7-layer EDNA assessment scoring logic
 */

import { 
  calculateLayer7Scores as calculateLayer7ScoresFromAnalysis, 
  detectMisalignments,
  detectDominantBeliefs,
  detectConflictedBeliefs,
  BeliefCategory,
  ConflictedBelief
} from './layer7-analysis';

export interface QuizAnswer {
  question_id: string;
  selected: string;
  layer: number;
  dimension?: string;
  tags?: string[]; // e.g., ['architect'], ['alchemist'], ['blurred']
  subtype?: string; // For Layer 2 questions
}

export interface Layer1Result {
  core_type: 'architect' | 'alchemist' | 'blurred';
  mastery: number; // The top norm percentage
  normalized_scores: {
    architect: number;
    alchemist: number;
    blurred: number;
  };
  raw_scores: {
    architect: number;
    alchemist: number;
    blurred: number;
  };
}

export interface Layer2Result {
  primary_subtype: string;
  secondary_subtype: string | null;
  is_mixed: boolean; // True if it's a "leading to" situation
  mastery: number; // Normalized percentage for top subtype
  normalized_scores: {
    [subtype: string]: number;
  };
  display_label: string; // e.g., "Systemised Builder (40%) leading to Internal Analyzer (30%)"
}

export interface Layer3Result {
  mirror_awareness_level: 'low' | 'moderate' | 'high';
  mirror_awareness_score: number; // 33%, 66%, or 99%
  correct_mirror_count: number; // Number of correctly identified mirror responses
  total_mirror_questions: number;
}

export interface Layer4Result {
  modality_preference: string; // visual, auditory, read_write, kinesthetic, multimodal
  approach: string; // structured, exploratory, adaptive
  concept_processing: string; // concrete, abstract, flexible
  working_environment: string; // individual, collaborative, adaptive
  pace: string; // fast, slow, versatile
  learning_style_summary: string;
}

export interface Layer5Result {
  traits_detected: string[]; // e.g., ['adhd', 'dyslexia']
  normalized_scores: {
    [trait: string]: number; // Percentage for each trait
  };
  flags: {
    trait: string;
    level: 'probable' | 'possible' | 'low';
    message: string;
  }[];
  co_occurrence_warning?: string; // If both ADHD and Dyslexia are flagged
  disclaimer: string;
}

export interface Layer6Result {
  mindset: string; // 'growth', 'fixed', 'mixed'
  mindset_details: {
    growth_norm: number;
    fixed_norm: number;
    delta: number;
  };
  risk_tolerance: string; // 'high', 'moderate', 'low', 'mixed'
  extraversion: string; // 'extroverted', 'introverted', 'balanced'
  adaptability: number; // Count of 'adaptive' responses across dimensions
  personality_summary: string;
}

export interface Layer7Result {
  growth_philosophy: number; // 0-100: Craftsmanship (0) to Speed/Bold Scaling (100)
  purpose_filter: number; // 0-100: Profit-Focused (0) to Mission-Driven (100)
  change_appetite: number; // 0-100: Stability/Perfection (0) to Innovation (100)
  metrics_orientation: number; // 0-100: Numbers-Averse (0) to Numbers-Confident (100)
  social_worldview: number; // 0-100: Competitive (0) to Collaborative (100)
  resource_worldview: number; // 0-100: Scarcity (0) to Abundance (100)
  dominant_beliefs: BeliefCategory[]; // Beliefs with norm ≥ 40% AND gap ≥ 12%
  conflicted_beliefs: ConflictedBelief[]; // Opposing beliefs both ≥ 30%
  misalignments: {
    type: string;
    description: string;
    impact: string;
    remedy: string;
  }[];
  value_profile_summary: string;
}

/**
 * Layer 1: Core Type Identification
 * 
 * Scoring Criteria:
 * - Each selected option adds one point to the tagged type
 * - Normalize using: Norm = (raw_sum_of_type/num_of_questions)*100
 * - For Alchemist and Architect: 1 point each choice
 * - For Blurred: 0.5 points
 * 
 * Decision rules:
 * - If top_norm >= 50% AND top_norm - next_best_norm >= 15% → assign that type
 * - If top_norm = alc and next_best_norm = arc (or vice versa), 
 *   and top_norm - next_best_norm < 15% → EDNA core type = blurred
 * 
 * Default mastery is the top norm percentage
 */
export function calculateLayer1Score(answers: QuizAnswer[]): Layer1Result {
  const layer1Answers = answers.filter(a => a.layer === 1);
  const numQuestions = layer1Answers.length;

  if (numQuestions === 0) {
    throw new Error('No Layer 1 answers found');
  }

  // Raw scores: count points by type
  const rawScores = {
    architect: 0,
    alchemist: 0,
    blurred: 0
  };

  layer1Answers.forEach(answer => {
    const tags = answer.tags || [];
    
    tags.forEach(tag => {
      if (tag === 'architect') {
        rawScores.architect += 1;
      } else if (tag === 'alchemist') {
        rawScores.alchemist += 1;
      } else if (tag === 'blurred') {
        rawScores.blurred += 0.5;
      }
    });
  });

  // Normalize: (raw_sum / num_questions) * 100
  const normalizedScores = {
    architect: (rawScores.architect / numQuestions) * 100,
    alchemist: (rawScores.alchemist / numQuestions) * 100,
    blurred: (rawScores.blurred / numQuestions) * 100
  };

  // Sort to find top and next best
  const sorted = Object.entries(normalizedScores)
    .sort((a, b) => b[1] - a[1]);

  const topType = sorted[0][0] as 'architect' | 'alchemist' | 'blurred';
  const topNorm = sorted[0][1];
  const nextBestType = sorted[1][0] as 'architect' | 'alchemist' | 'blurred';
  const nextBestNorm = sorted[1][1];

  // Apply decision rules
  let coreType: 'architect' | 'alchemist' | 'blurred';
  
  // Check if top_norm >= 50% AND gap >= 15%
  if (topNorm >= 50 && (topNorm - nextBestNorm) >= 15) {
    coreType = topType;
  } 
  // Check for blurred condition: top is alc/arc, next is arc/alc, gap < 15%
  else if (
    (topType === 'architect' && nextBestType === 'alchemist') ||
    (topType === 'alchemist' && nextBestType === 'architect')
  ) {
    if ((topNorm - nextBestNorm) < 15) {
      coreType = 'blurred';
    } else {
      coreType = topType;
    }
  } 
  else {
    // Default to top type
    coreType = topType;
  }

  // Mastery is the top norm percentage
  const mastery = topNorm;

  return {
    core_type: coreType,
    mastery: Math.round(mastery),
    normalized_scores: {
      architect: Math.round(normalizedScores.architect),
      alchemist: Math.round(normalizedScores.alchemist),
      blurred: Math.round(normalizedScores.blurred)
    },
    raw_scores: rawScores
  };
}

/**
 * Layer 2: Subtype Refinement
 * 
 * Scoring Criteria:
 * - Compute normalized % per subtype similarly as in layer 1
 * - Primary subtype: subtype_norm >= 40% AND (subtype_norm - next_best_norm) >= 12%
 * - Secondary subtype: next_best_norm
 * - Tertiary/mix: If no subtype meets 40% or gaps small, return Primary + Secondary 
 *   and mark "leading to" (e.g., "Systemised Builder (40%) leading to Internal Analyzer (30%)")
 * 
 * Subtype Mastery is the normalized percentage for the top subtype
 */
export function calculateLayer2Score(answers: QuizAnswer[]): Layer2Result {
  const layer2Answers = answers.filter(a => a.layer === 2);
  const numQuestions = layer2Answers.length;

  if (numQuestions === 0) {
    throw new Error('No Layer 2 answers found - all core types should have Layer 2 answers');
  }

  // Count raw scores per subtype
  const rawScores: { [subtype: string]: number } = {};
  
  layer2Answers.forEach(answer => {
    const subtype = answer.subtype || answer.selected; // Use subtype field, fallback to selected
    if (subtype) {
      rawScores[subtype] = (rawScores[subtype] || 0) + 1;
    }
  });

  // Normalize: (raw_count / num_questions) * 100
  const normalizedScores: { [subtype: string]: number } = {};
  Object.keys(rawScores).forEach(subtype => {
    normalizedScores[subtype] = (rawScores[subtype] / numQuestions) * 100;
  });

  // Sort to find top subtypes
  const sorted = Object.entries(normalizedScores)
    .sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) {
    throw new Error('No subtype scores calculated');
  }

  const topSubtype = sorted[0][0];
  const topNorm = sorted[0][1];
  const secondSubtype = sorted.length > 1 ? sorted[1][0] : null;
  const secondNorm = sorted.length > 1 ? sorted[1][1] : 0;

  // Apply decision rules
  let primarySubtype = topSubtype;
  let secondarySubtype = secondSubtype;
  let isMixed = false;
  let displayLabel = '';

  // Check if primary subtype meets criteria: >= 40% AND gap >= 12%
  if (topNorm >= 40 && (topNorm - secondNorm) >= 12) {
    // Clear primary subtype
    isMixed = false;
    displayLabel = `${formatSubtypeName(primarySubtype)} (${Math.round(topNorm)}%)`;
  } else {
    // Mixed/Tertiary: return Primary + Secondary with "leading to"
    isMixed = true;
    if (secondSubtype) {
      displayLabel = `${formatSubtypeName(primarySubtype)} (${Math.round(topNorm)}%) leading to ${formatSubtypeName(secondSubtype)} (${Math.round(secondNorm)}%)`;
    } else {
      displayLabel = `${formatSubtypeName(primarySubtype)} (${Math.round(topNorm)}%)`;
    }
  }

  return {
    primary_subtype: primarySubtype,
    secondary_subtype: secondarySubtype,
    is_mixed: isMixed,
    mastery: Math.round(topNorm),
    normalized_scores: normalizedScores,
    display_label: displayLabel
  };
}

/**
 * Layer 3: Mirror Pair Awareness
 * 
 * Scoring Criteria:
 * - For Architect respondents: count how many answers tagged (Alchemist)
 *   - 0-2 = Low awareness (33%)
 *   - 3-4 = Moderate awareness (66%)
 *   - 5-7 = High awareness (99%)
 * 
 * - For Alchemist respondents: count answers tagged (Architect) using same bands
 * 
 * - For Blurred respondents: count answers tagged (Architect) OR (Alchemist)
 *   (i.e., how often you correctly identify a clear-type reaction)
 *   - 0-2 = Low awareness of clear types (33%)
 *   - 3-4 = Moderate awareness (66%)
 *   - 5-7 = High awareness (99%)
 * 
 * Mirror awareness is either 33% (low), 66% (moderate), or 99% (high)
 */
export function calculateLayer3Score(
  answers: QuizAnswer[], 
  coreType: 'architect' | 'alchemist' | 'blurred'
): Layer3Result {
  const layer3Answers = answers.filter(a => a.layer === 3);
  const totalQuestions = layer3Answers.length;

  let correctMirrorCount = 0;

  if (coreType === 'architect') {
    // Count answers tagged with 'alchemist'
    layer3Answers.forEach(answer => {
      const tags = answer.tags || [];
      if (tags.includes('alchemist')) {
        correctMirrorCount++;
      }
    });
  } else if (coreType === 'alchemist') {
    // Count answers tagged with 'architect'
    layer3Answers.forEach(answer => {
      const tags = answer.tags || [];
      if (tags.includes('architect')) {
        correctMirrorCount++;
      }
    });
  } else {
    // Blurred: count answers tagged with 'architect' OR 'alchemist'
    layer3Answers.forEach(answer => {
      const tags = answer.tags || [];
      if (tags.includes('architect') || tags.includes('alchemist')) {
        correctMirrorCount++;
      }
    });
  }

  // Determine awareness level and score
  let level: 'low' | 'moderate' | 'high';
  let score: number;

  if (correctMirrorCount >= 0 && correctMirrorCount <= 2) {
    level = 'low';
    score = 33;
  } else if (correctMirrorCount >= 3 && correctMirrorCount <= 4) {
    level = 'moderate';
    score = 66;
  } else {
    // 5-7 or more
    level = 'high';
    score = 99;
  }

  return {
    mirror_awareness_level: level,
    mirror_awareness_score: score,
    correct_mirror_count: correctMirrorCount,
    total_mirror_questions: totalQuestions
  };
}

/**
 * Layer 4: Learning Style Preferences
 * 
 * Scoring Criteria:
 * - Modality Preference: select based on user's response. If contradictory, mark as multimodal
 * - Approach: select based on structured or exploratory. If contradictory, mark as Adaptive
 * - Concept Processing: select concrete or abstract. If contradictory, tag as Flexible
 * - Working Environment: select individual or collaborative. If contradictory, mark as Adaptive
 * - Pace: select fast or slow paced. If contradictory, mark as Versatile
 */
export function calculateLayer4Score(answers: QuizAnswer[]): Layer4Result {
  const layer4Answers = answers.filter(a => a.layer === 4);
  
  // Initialize preferences
  const preferences: { [key: string]: string } = {
    modality: '',
    approach: '',
    concept_processing: '',
    working_environment: '',
    pace: ''
  };

  // Collect responses by dimension
  const dimensionResponses: { [key: string]: string[] } = {
    modality: [],
    approach: [],
    concept_processing: [],
    working_environment: [],
    pace: []
  };

  layer4Answers.forEach(answer => {
    let dimension = answer.dimension || '';
    const value = answer.selected;
    
    // Normalize dimension names (e.g., modality_repeat → modality)
    if (dimension.startsWith('modality')) {
      dimension = 'modality';
    } else if (dimension.startsWith('approach')) {
      dimension = 'approach';
    } else if (dimension.startsWith('concept')) {
      dimension = 'concept_processing';
    } else if (dimension.startsWith('working') || dimension.startsWith('work_')) {
      dimension = 'working_environment';
    } else if (dimension.startsWith('pace') || dimension.startsWith('learning_pace')) {
      dimension = 'pace';
    }
    
    if (dimensionResponses[dimension]) {
      dimensionResponses[dimension].push(value);
    }
  });

  // Determine modality preference
  // If user explicitly selects 'multimodal' in any question, use that
  const modalityValues = dimensionResponses.modality || [];
  if (modalityValues.includes('multimodal')) {
    preferences.modality = 'multimodal';
  } else if (modalityValues.length === 2) {
    // Two questions for modality - if same, use it; if different, mark as multimodal
    if (modalityValues[0] === modalityValues[1]) {
      preferences.modality = modalityValues[0];
    } else {
      preferences.modality = 'multimodal';
    }
  } else {
    // Only one answer (shouldn't happen in normal flow)
    preferences.modality = modalityValues[0] || 'multimodal';
  }

  // Determine approach (structured vs exploratory)
  const approachValues = dimensionResponses.approach || [];
  
  // Map each value to its category
  const getApproachCategory = (val: string) => {
    if (val === 'sequential' || val === 'structured') return 'structured';
    if (val === 'global' || val === 'exploratory' || val === 'kinesthetic') return 'exploratory';
    return null;
  };
  
  if (approachValues.length === 2) {
    const cat1 = getApproachCategory(approachValues[0]);
    const cat2 = getApproachCategory(approachValues[1]);
    
    // If both answers are in the same category, use it; otherwise adaptive
    if (cat1 === cat2 && cat1 !== null) {
      preferences.approach = cat1;
    } else {
      preferences.approach = 'adaptive';
    }
  } else if (approachValues.length > 0) {
    const cat = getApproachCategory(approachValues[0]);
    preferences.approach = cat || 'adaptive';
  } else {
    preferences.approach = 'adaptive';
  }

  // Determine concept processing (concrete vs abstract)
  const conceptValues = dimensionResponses.concept_processing || [];
  
  // Map each value to its category
  const getConceptCategory = (val: string) => {
    if (val === 'concrete' || val === 'hands_on') return 'concrete';
    if (val === 'abstract' || val === 'abstract_discussion' || val === 'abstract_thinking') return 'abstract';
    return null;
  };
  
  if (conceptValues.length === 2) {
    const cat1 = getConceptCategory(conceptValues[0]);
    const cat2 = getConceptCategory(conceptValues[1]);
    
    // If both answers are in the same category, use it; otherwise flexible
    if (cat1 === cat2 && cat1 !== null) {
      preferences.concept_processing = cat1;
    } else {
      preferences.concept_processing = 'flexible';
    }
  } else if (conceptValues.length > 0) {
    const cat = getConceptCategory(conceptValues[0]);
    preferences.concept_processing = cat || 'flexible';
  } else {
    preferences.concept_processing = 'flexible';
  }

  // Determine working environment (individual vs collaborative)
  const workingValues = dimensionResponses.working_environment || [];
  
  // Map each value to its category
  const getWorkingCategory = (val: string) => {
    if (val === 'individual' || val === 'alone' || val === 'self_check') return 'individual';
    if (val === 'collaborative' || val === 'team' || val === 'guided') return 'collaborative';
    return null;
  };
  
  if (workingValues.length === 2) {
    const cat1 = getWorkingCategory(workingValues[0]);
    const cat2 = getWorkingCategory(workingValues[1]);
    
    // If both answers are in the same category, use it; otherwise adaptive
    if (cat1 === cat2 && cat1 !== null) {
      preferences.working_environment = cat1;
    } else {
      preferences.working_environment = 'adaptive';
    }
  } else if (workingValues.length > 0) {
    const cat = getWorkingCategory(workingValues[0]);
    preferences.working_environment = cat || 'adaptive';
  } else {
    preferences.working_environment = 'adaptive';
  }

  // Determine pace (fast vs slow)
  const paceValues = dimensionResponses.pace || [];
  
  // Map each value to its category
  const getPaceCategory = (val: string) => {
    if (val === 'fast' || val === 'marathon' || val === 'fast_learn') return 'fast';
    if (val === 'slow' || val === 'consistent' || val === 'slow_thorough') return 'slow';
    return null;
  };
  
  if (paceValues.length === 2) {
    const cat1 = getPaceCategory(paceValues[0]);
    const cat2 = getPaceCategory(paceValues[1]);
    
    // If both answers are in the same category, use it; otherwise versatile
    if (cat1 === cat2 && cat1 !== null) {
      preferences.pace = cat1;
    } else {
      preferences.pace = 'versatile';
    }
  } else if (paceValues.length > 0) {
    const cat = getPaceCategory(paceValues[0]);
    preferences.pace = cat || 'versatile';
  } else {
    preferences.pace = 'versatile';
  }

  // Create summary
  const summary = `Your learning style is ${formatLearningPreference(preferences.modality)} with a ${preferences.approach} approach. You prefer ${formatLearningPreference(preferences.concept_processing)} concepts in a ${preferences.working_environment} environment at a ${preferences.pace} pace.`;

  return {
    modality_preference: preferences.modality,
    approach: preferences.approach,
    concept_processing: preferences.concept_processing,
    working_environment: preferences.working_environment,
    pace: preferences.pace,
    learning_style_summary: summary
  };
}

/**
 * Layer 5: Neurodiversity Screening
 * 
 * Scoring Criteria:
 * - Point tags as the user chooses
 * - Probable flag: normalized >= 60% → "Probable [trait] traits — recommend referral to specialist"
 * - Possible trait flag: normalized >= 40% → "Possible [trait] features present — consider formal assessment / accommodations"
 * - Low likelihood: normalized < 30% → "Low likelihood of core traits"
 * - If both ADHD and Dyslexia flags appear → flag co-occurrence possible
 */
export function calculateLayer5Score(answers: QuizAnswer[]): Layer5Result {
  const layer5Answers = answers.filter(a => a.layer === 5);
  const numQuestions = layer5Answers.length;

  if (numQuestions === 0) {
    return {
      traits_detected: [],
      normalized_scores: {},
      flags: [],
      disclaimer: 'This is a screening tool, not diagnostic. Please consult with qualified professionals for formal assessment.'
    };
  }

  // Count raw scores per trait
  const rawScores: { [trait: string]: number } = {
    adhd: 0,
    dyslexia: 0,
    autism: 0,
    sensory: 0,
    none: 0
  };

  layer5Answers.forEach(answer => {
    let value = answer.selected;
    
    // Map variant values to core traits
    if (value === 'adhd_reorganize' || value === 'adhd_steps' || value === 'adhd_restless') {
      value = 'adhd';
    }
    
    if (rawScores[value] !== undefined) {
      rawScores[value] += 1;
    }
  });

  // Normalize: (raw_count / num_questions) * 100
  const normalizedScores: { [trait: string]: number } = {};
  Object.keys(rawScores).forEach(trait => {
    normalizedScores[trait] = (rawScores[trait] / numQuestions) * 100;
  });

  // Determine flags
  const flags: { trait: string; level: 'probable' | 'possible' | 'low'; message: string }[] = [];
  const traitsDetected: string[] = [];

  const traitNames: { [key: string]: string } = {
    adhd: 'ADHD',
    dyslexia: 'Dyslexia',
    autism: 'Autism Spectrum',
    sensory: 'Sensory Processing'
  };

  Object.keys(rawScores).forEach(trait => {
    if (trait === 'none') return;

    const norm = normalizedScores[trait];
    const traitName = traitNames[trait] || trait;

    if (norm >= 60) {
      flags.push({
        trait,
        level: 'probable',
        message: `Probable ${traitName} traits — recommend referral to specialist.`
      });
      traitsDetected.push(trait);
    } else if (norm >= 40) {
      flags.push({
        trait,
        level: 'possible',
        message: `Possible ${traitName} features present — consider formal assessment / accommodations.`
      });
      traitsDetected.push(trait);
    } else if (norm > 0 && norm < 30) {
      flags.push({
        trait,
        level: 'low',
        message: `Low likelihood of ${traitName} core traits.`
      });
    }
  });

  // Check for co-occurrence
  let coOccurrenceWarning: string | undefined;
  const hasADHD = traitsDetected.includes('adhd');
  const hasDyslexia = traitsDetected.includes('dyslexia');

  if (hasADHD && hasDyslexia) {
    coOccurrenceWarning = 'Both ADHD and Dyslexia flags appear — co-occurrence possible (very common). Recommend multi-domain evaluation.';
  }

  return {
    traits_detected: traitsDetected,
    normalized_scores: normalizedScores,
    flags,
    co_occurrence_warning: coOccurrenceWarning,
    disclaimer: 'Important legal/ethical note: This is a screening tool, not diagnostic. Please consult with qualified professionals for formal assessment.'
  };
}

/**
 * Layer 6: Mindset and Personality
 * 
 * Scoring Criteria:
 * - Map each option to tags: Growth vs Fixed, Risk tolerance (High/Moderate/Low), 
 *   Extraversion (Extravert/Introvert/Balanced), Adaptability
 * - Compute normalized % for each dimension
 * 
 * Decision rules & interpretation:
 * - Growth vs Fixed: Growth_norm - Fixed_norm = delta
 *   - If Growth_norm >= 55% → "Growth mindset"
 *   - If Fixed_norm >= 55% → "Fixed mindset"
 *   - If between 45-55% → "Mixed mindset / situational"
 * - Risk tolerance: choose categorical top score (High/Moderate/Low). If borderline, show mixed
 * - Extraversion: same top-candidate rule
 */
export function calculateLayer6Score(answers: QuizAnswer[]): Layer6Result {
  const layer6Answers = answers.filter(a => a.layer === 6);
  const numQuestions = layer6Answers.length;

  if (numQuestions === 0) {
    throw new Error('No Layer 6 answers found');
  }

  // Collect responses by dimension
  const dimensionResponses: { [key: string]: string[] } = {
    mindset: [],
    risk_tolerance: [],
    extraversion: []
  };

  layer6Answers.forEach(answer => {
    const dimension = answer.dimension || '';
    const value = answer.selected;
    
    if (dimensionResponses[dimension]) {
      dimensionResponses[dimension].push(value);
    }
  });

  // Process Mindset (Growth vs Fixed vs Mixed)
  const mindsetResponses = dimensionResponses.mindset || [];
  const mindsetCounts = {
    growth: 0,
    fixed: 0,
    mixed: 0
  };

  mindsetResponses.forEach(response => {
    // Map variant values to core mindset types
    if (response.includes('growth')) {
      mindsetCounts.growth += 1;
    } else if (response.includes('fixed')) {
      mindsetCounts.fixed += 1;
    } else if (mindsetCounts[response as keyof typeof mindsetCounts] !== undefined) {
      mindsetCounts[response as keyof typeof mindsetCounts] += 1;
    }
  });

  const mindsetTotal = mindsetResponses.length || 1;
  const growthNorm = (mindsetCounts.growth / mindsetTotal) * 100;
  const fixedNorm = (mindsetCounts.fixed / mindsetTotal) * 100;
  const delta = growthNorm - fixedNorm;

  let mindsetType: string;
  if (growthNorm >= 55) {
    mindsetType = 'growth';
  } else if (fixedNorm >= 55) {
    mindsetType = 'fixed';
  } else {
    mindsetType = 'mixed';
  }

  // Process Risk Tolerance
  const riskResponses = dimensionResponses.risk_tolerance || [];
  const riskCounts = {
    high: 0,
    moderate: 0,
    low: 0
  };

  riskResponses.forEach(response => {
    // Map variant values to core risk tolerance types
    if (response.includes('high')) {
      riskCounts.high += 1;
    } else if (response.includes('low')) {
      riskCounts.low += 1;
    } else if (response.includes('moderate')) {
      riskCounts.moderate += 1;
    } else if (riskCounts[response as keyof typeof riskCounts] !== undefined) {
      riskCounts[response as keyof typeof riskCounts] += 1;
    }
  });

  const riskTotal = riskResponses.length || 1;
  const riskNorms = {
    high: (riskCounts.high / riskTotal) * 100,
    moderate: (riskCounts.moderate / riskTotal) * 100,
    low: (riskCounts.low / riskTotal) * 100
  };

  // Find top risk tolerance
  const topRisk = Object.entries(riskNorms)
    .sort((a, b) => b[1] - a[1])[0];
  
  let riskTolerance = topRisk[0];
  const topRiskScore = topRisk[1];
  const secondRiskScore = Object.entries(riskNorms)
    .sort((a, b) => b[1] - a[1])[1][1];

  // If borderline, mark as mixed
  if (topRiskScore - secondRiskScore < 20) {
    riskTolerance = 'mixed';
  }

  // Process Extraversion
  const extraversionResponses = dimensionResponses.extraversion || [];
  const extraversionCounts = {
    extroverted: 0,
    introverted: 0,
    ambivert: 0
  };

  extraversionResponses.forEach(response => {
    // Map variant values to core extraversion types
    if (response.includes('extrovert')) {
      extraversionCounts.extroverted += 1;
    } else if (response.includes('introvert')) {
      extraversionCounts.introverted += 1;
    } else if (response.includes('balanced') || response.includes('ambivert')) {
      extraversionCounts.ambivert += 1;
    } else if (extraversionCounts[response as keyof typeof extraversionCounts] !== undefined) {
      extraversionCounts[response as keyof typeof extraversionCounts] += 1;
    }
  });

  const extraversionTotal = extraversionResponses.length || 1;
  const extraversionNorms = {
    extroverted: (extraversionCounts.extroverted / extraversionTotal) * 100,
    introverted: (extraversionCounts.introverted / extraversionTotal) * 100,
    ambivert: (extraversionCounts.ambivert / extraversionTotal) * 100
  };

  // Find top extraversion
  const topExtraversion = Object.entries(extraversionNorms)
    .sort((a, b) => b[1] - a[1])[0];
  
  let extraversion = topExtraversion[0];
  
  // Map ambivert to balanced
  if (extraversion === 'ambivert') {
    extraversion = 'balanced';
  }

  // Count adaptability (how many "adaptive" type responses across all dimensions)
  let adaptabilityCount = 0;
  layer6Answers.forEach(answer => {
    const value = answer.selected;
    if (value === 'mixed' || value === 'ambivert') {
      adaptabilityCount++;
    }
  });

  // Create summary
  const summary = `You have a ${mindsetType} mindset with ${riskTolerance} risk tolerance. Your personality tends toward ${extraversion} in business contexts.`;

  return {
    mindset: mindsetType,
    mindset_details: {
      growth_norm: Math.round(growthNorm),
      fixed_norm: Math.round(fixedNorm),
      delta: Math.round(delta)
    },
    risk_tolerance: riskTolerance,
    extraversion,
    adaptability: adaptabilityCount,
    personality_summary: summary
  };
}

/**
 * Helper function to format subtype names for display
 */
function formatSubtypeName(subtype: string): string {
  const nameMap: { [key: string]: string } = {
    'master_strategist': 'Master Strategist',
    'systemised_builder': 'Systemised Builder',
    'internal_analyser': 'Internal Analyzer',
    'ultimate_architect': 'Ultimate Architect',
    'visionary_oracle': 'Visionary Oracle',
    'energetic_empath': 'Energetic Empath',
    'magnetic_perfectionist': 'Magnetic Perfectionist',
    'ultimate_alchemist': 'Ultimate Alchemist',
    'blurred_overthinker': 'Blurred Overthinker',
    'blurred_overplanner': 'Blurred Overplanner',
    'blurred_ultimate': 'Blurred Ultimate'
  };

  return nameMap[subtype] || subtype;
}

/**
 * Helper function to format learning preferences for display
 */
function formatLearningPreference(preference: string): string {
  const nameMap: { [key: string]: string } = {
    'visual': 'visual',
    'auditory': 'auditory',
    'read_write': 'read/write',
    'kinesthetic': 'kinesthetic',
    'multimodal': 'multimodal',
    'structured': 'structured',
    'exploratory': 'exploratory',
    'adaptive': 'adaptive',
    'global': 'exploratory',
    'concrete': 'concrete',
    'abstract': 'abstract',
    'flexible': 'flexible',
    'individual': 'individual',
    'collaborative': 'collaborative',
    'fast': 'fast',
    'slow': 'slow',
    'versatile': 'versatile'
  };

  return nameMap[preference] || preference;
}

/**
 * Layer 7: Meta-Beliefs & Values
 * 
 * Uses the existing Layer 7 analysis system to:
 * - Calculate scores for 6 dimensions (0-100 scale)
 * - Detect value misalignments (failure patterns)
 * - Generate comprehensive value profile
 */
export function calculateLayer7Score(answers: QuizAnswer[]): Layer7Result {
  const layer7Answers = answers.filter(a => a.layer === 7);
  
  if (layer7Answers.length === 0) {
    throw new Error('No Layer 7 answers found');
  }

  // Use existing layer7-analysis.ts functions
  const scores = calculateLayer7ScoresFromAnalysis(layer7Answers);
  const misalignments = detectMisalignments(scores);
  
  // NEW: Detect dominant beliefs (norm ≥ 40% AND gap ≥ 12%)
  const dominantBeliefs = detectDominantBeliefs(layer7Answers);
  
  // NEW: Detect conflicted beliefs (opposing beliefs both ≥ 30%)
  const conflictedBeliefs = detectConflictedBeliefs(layer7Answers);

  // Generate summary
  let summary = '';
  const dominantValues: string[] = [];

  // Use dominant beliefs for summary
  dominantBeliefs.forEach(belief => {
    if (belief.is_dominant) {
      const parts = belief.category.split(': ');
      if (parts.length === 2) {
        dominantValues.push(formatBeliefName(parts[1]));
      }
    }
  });

  if (dominantValues.length > 0) {
    summary = `Your core values center on ${dominantValues.slice(0, 3).join(', ')}. `;
  }

  // Mention conflicted beliefs if any
  if (conflictedBeliefs.length > 0) {
    summary += `You show cognitive dissonance in ${conflictedBeliefs.length} area(s). `;
  }

  if (misalignments.length > 0) {
    summary += `Watch for ${misalignments[0].type} patterns that may create challenges.`;
  } else if (conflictedBeliefs.length === 0) {
    summary += 'Your values are well-aligned and balanced.';
  }

  return {
    growth_philosophy: scores.growth_philosophy,
    purpose_filter: scores.purpose_filter,
    change_appetite: scores.change_appetite,
    metrics_orientation: scores.metrics_orientation,
    social_worldview: scores.social_worldview,
    resource_worldview: scores.resource_worldview,
    dominant_beliefs: dominantBeliefs,
    conflicted_beliefs: conflictedBeliefs,
    misalignments,
    value_profile_summary: summary
  };
}

/**
 * Helper to format belief names for display
 */
function formatBeliefName(belief: string): string {
  const nameMap: { [key: string]: string } = {
    'bold_scaling': 'Bold Scaling',
    'craftsmanship': 'Craftsmanship',
    'mission_driven': 'Mission-Driven',
    'profit_focused': 'Profit-Focused',
    'innovation_oriented': 'Innovation',
    'stability_oriented': 'Stability',
    'numbers_confident': 'Numbers-Confident',
    'numbers_averse': 'Numbers-Averse',
    'collaborative': 'Collaborative',
    'competitive': 'Competitive',
    'contrarian': 'Contrarian',
    'abundance': 'Abundance',
    'scarcity': 'Scarcity',
    'both_scaling': 'Balanced Growth',
    'both_mission': 'Balanced Purpose',
    'both_innovation': 'Balanced Change',
    'both_market': 'Balanced Market',
    'realistic': 'Realistic Resource View',
    'numbers_developing': 'Developing Numbers Confidence'
  };
  
  return nameMap[belief] || belief.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
