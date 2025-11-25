/**
 * E-DNA Quiz Scoring Logic
 * Calculates scores for all 7 layers based on user answers
 */

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
  const scores: { [key: string]: number } = {};
  
  // Determine which path based on Layer 1
  let path: 'architect' | 'alchemist' | 'mixed';
  let questionPrefix: string;
  
  if (layer1Result.type.includes('Architect')) {
    path = 'architect';
    questionPrefix = 'L2_Q';
  } else if (layer1Result.type.includes('Alchemist')) {
    path = 'alchemist';
    questionPrefix = 'L2_Q';
  } else {
    path = 'mixed';
    questionPrefix = 'L2_Qm';
  }

  // Count scores for each subtype
  for (let i = 9; i <= 16; i++) {
    const qid = path === 'alchemist' ? `${questionPrefix}${i}a` : `${questionPrefix}${i}`;
    const answer = answers[qid];
    
    if (answer) {
      // Map answer to score type based on path
      let scoreKey = '';
      if (path === 'architect') {
        const mapping: { [key: string]: string } = {
          'a': 'planner',
          'b': 'operator',
          'c': 'analyst',
          'd': 'ultimate'
        };
        scoreKey = mapping[answer] || '';
      } else if (path === 'alchemist') {
        const mapping: { [key: string]: string } = {
          'a': 'oracle',
          'b': 'perfectionist',
          'c': 'empath',
          'd': 'ultimate'
        };
        scoreKey = mapping[answer] || '';
      }
      
      if (scoreKey) {
        scores[scoreKey] = (scores[scoreKey] || 0) + 1;
      }
    }
  }

  // Determine dominant subtype
  let subtype = '';
  let maxScore = 0;
  for (const [key, value] of Object.entries(scores)) {
    if (value > maxScore) {
      maxScore = value;
      subtype = key;
    }
  }

  // Capitalize subtype
  subtype = subtype.charAt(0).toUpperCase() + subtype.slice(1);

  return { subtype, path, scores };
}

/**
 * Calculate Layer 3: Mirror Awareness
 */
export function calculateLayer3(answers: UserAnswers): Layer3Result {
  const dimensions: Layer3Result['dimensions'] = {};
  let totalScore = 0;
  const maxScore = 12; // 6 questions * 2 max points each

  const dimensionMap: { [key: string]: { name: string; labels: string[] } } = {
    'L3_Q17': { name: 'Validator Awareness', labels: ['Opposite', 'Partial', 'Full'] },
    'L3_Q18': { name: 'Emotional Regulation', labels: ['Reactive', 'Aware', 'Integrated'] },
    'L3_Q19': { name: 'Feedback Processing', labels: ['Defensive', 'Selective', 'Open'] },
    'L3_Q20': { name: 'Blind Spot Recognition', labels: ['Unaware', 'Emerging', 'Aware'] },
    'L3_Q21': { name: 'Self-Correction Speed', labels: ['Slow', 'Moderate', 'Fast'] },
    'L3_Q22': { name: 'Growth Orientation', labels: ['Fixed', 'Mixed', 'Growth'] }
  };

  for (const [qid, dimData] of Object.entries(dimensionMap)) {
    const answer = answers[qid];
    let score = 0;
    let label = '';

    if (answer === 'a') { score = 0; label = dimData.labels[0]; }
    else if (answer === 'b') { score = 1; label = dimData.labels[1]; }
    else if (answer === 'c') { score = 2; label = dimData.labels[2]; }

    dimensions[dimData.name] = { score, label };
    totalScore += score;
  }

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

  const mapping: { [key: string]: keyof typeof scores } = {
    'a': 'visual',
    'b': 'auditory',
    'c': 'readWrite',
    'd': 'kinesthetic'
  };

  for (let i = 23; i <= 27; i++) {
    const answer = answers[`L4_Q${i}`];
    if (answer && mapping[answer]) {
      scores[mapping[answer]]++;
    }
  }

  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);
  const percentages = {
    visual: Math.round((scores.visual / total) * 100),
    auditory: Math.round((scores.auditory / total) * 100),
    readWrite: Math.round((scores.readWrite / total) * 100),
    kinesthetic: Math.round((scores.kinesthetic / total) * 100)
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

  const dimensions = [
    { qid: 'L5_Q28', name: 'Focus Pattern' },
    { qid: 'L5_Q29', name: 'Processing Speed' },
    { qid: 'L5_Q30', name: 'Energy Pattern' },
    { qid: 'L5_Q31', name: 'Task Switching' },
    { qid: 'L5_Q32', name: 'Stress Response' },
    { qid: 'L5_Q33', name: 'Recovery Pattern' }
  ];

  for (const dim of dimensions) {
    const answer = answers[dim.qid];
    if (answer) {
      // Map answer to label
      const labels: { [key: string]: string } = {
        'a': answer === 'a' ? 'Broad/Fast/Burst/Fluid/Fight/Active' : '',
        'b': answer === 'b' ? 'Deep/Steady/Steady/Structured/Freeze/Passive' : '',
        'c': answer === 'c' ? 'Adaptive/Thorough/Adaptive/Balanced/Flow/Mixed' : ''
      };
      profile[dim.name] = answer;
    }
  }

  return { profile };
}

/**
 * Calculate Layer 6: Mindset & Personality
 */
export function calculateLayer6(answers: UserAnswers): Layer6Result {
  const mindset = {
    growthFixed: answers['L6_Q34'] === 'a' ? 'Growth' : 'Fixed',
    abundanceScarcity: answers['L6_Q35'] === 'a' ? 'Abundance' : 'Scarcity',
    challengeComfort: answers['L6_Q36'] === 'a' ? 'Challenge' : 'Comfort'
  };

  // Core personality from Q37 + Q38
  const q37 = answers['L6_Q37'];
  const q38 = answers['L6_Q38'];
  let coreType = '';
  
  if (q37 === 'a' && q38 === 'a') coreType = 'Confident & Steady';
  else if (q37 === 'a' && q38 === 'b') coreType = 'Confident & Driven';
  else if (q37 === 'b' && q38 === 'a') coreType = 'Considerate & Steady';
  else if (q37 === 'b' && q38 === 'b') coreType = 'Fast-Moving & Adaptive';

  const communicationStyle = answers['L6_Q39'] === 'a' ? 'Direct Communicator' : 'Diplomatic Communicator';

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

  const mapping: { [key: string]: { name: string; labels: string[] } } = {
    'L7_Q40': { name: 'Grounding Source', labels: ['Self-Reliant', 'Faith-Reliant', 'Dual-Reliant'] },
    'L7_Q41': { name: 'Control Belief', labels: ["I'm In Control", 'Life Influences Me', 'Shared Control'] },
    'L7_Q42': { name: 'Fairness View', labels: ['Responsibility View', 'Compassion View', 'Balanced View'] },
    'L7_Q43': { name: 'Honesty Style', labels: ['Direct Honesty', 'Gentle Honesty', 'Balanced Honesty'] },
    'L7_Q44': { name: 'Growth Approach', labels: ['Growth Focused', 'Comfort Focused', 'Steady Growth'] },
    'L7_Q45': { name: 'Impact Motivation', labels: ['Self-Focused Impact', 'Others-Focused Impact', 'Shared Impact'] }
  };

  for (const [qid, data] of Object.entries(mapping)) {
    const answer = answers[qid];
    if (answer) {
      const index = answer.charCodeAt(0) - 97; // 'a' = 0, 'b' = 1, 'c' = 2
      beliefs[data.name] = data.labels[index] || '';
    }
  }

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
  
  // Calculate core type mastery (percentage based on layer1 counts)
  const totalCount = layer1.architectCount + layer1.alchemistCount;
  const dominantCount = Math.max(layer1.architectCount, layer1.alchemistCount);
  const core_type_mastery = Math.round((dominantCount / totalCount) * 100);
  
  // Get subtype from layer2
  const subtype = [layer2.subtype];
  const subtype_mastery = 100; // Default to 100% for now
  const subtype_display = layer2.subtype;
  
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
    indicators: layer5.indicators,
    score: layer5.totalScore
  };
  
  // Mindset from layer6
  const mindset = {
    traits: layer6.traits,
    score: layer6.totalScore
  };
  
  // Personality from layer7
  const personality = {
    traits: layer7.traits,
    score: layer7.totalScore
  };
  
  return {
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
    mindset,
    personality
  };
}
