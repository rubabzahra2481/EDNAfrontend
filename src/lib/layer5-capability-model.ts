// Layer 5 - Capability Model (4 Domains)
// Enhanced neurodiversity profiling with domain-based scoring

export interface CapabilityDomains {
  attention_regulation: {
    score: number; // 0-100: low-moderate-high
    level: 'low' | 'moderate' | 'high';
    patterns: string[];
    strengths: string[];
    adaptations: string[];
  };
  language_processing: {
    score: number;
    level: 'low' | 'moderate' | 'high';
    patterns: string[];
    strengths: string[];
    adaptations: string[];
  };
  structure_routine: {
    score: number;
    level: 'low' | 'moderate' | 'high';
    patterns: string[];
    strengths: string[];
    adaptations: string[];
  };
  sensory_management: {
    score: number;
    level: 'low' | 'moderate' | 'high';
    patterns: string[];
    strengths: string[];
    adaptations: string[];
  };
}

export interface NeurodiversityProfile {
  primary_pattern: string;
  capability_domains: CapabilityDomains;
  compound_profiles: string[];
  clarity_rating: string; // "High clarity", "Low clarity"
  edna_tuning: string[];
  result_blocks: {
    headline: string;
    one_liner: string;
    strengths: string[];
    adaptations: string[];
  };
  next_7_days: string[];
}

// Pattern Detection
export function detectNeurodiversityPattern(traits: {
  adhd: boolean;
  dyslexia: boolean;
  autism: boolean;
  sensory: boolean;
}): string {
  const activeTraits = [];
  if (traits.adhd) activeTraits.push('ADHD');
  if (traits.dyslexia) activeTraits.push('Dyslexia');
  if (traits.autism) activeTraits.push('Autism');
  if (traits.sensory) activeTraits.push('Sensory');

  if (activeTraits.length === 0) return 'Neurotypical baseline';
  if (activeTraits.length === 1) return `${activeTraits[0]}-linked rhythms`;
  if (activeTraits.length === 2 && traits.adhd && traits.dyslexia) {
    return 'ADHD + Dyslexia compound profile';
  }
  return 'Complex neurodivergent profile';
}

// Score each domain based on trait patterns
export function scoreCapabilityDomains(traits: {
  adhd: boolean;
  dyslexia: boolean;
  autism: boolean;
  sensory: boolean;
}): CapabilityDomains {
  // Attention & Regulation
  const attentionScore = traits.adhd ? 25 : traits.autism ? 60 : 85;
  const attentionLevel = attentionScore < 40 ? 'low' : attentionScore < 70 ? 'moderate' : 'high';
  
  // Language & Processing
  const languageScore = traits.dyslexia ? 30 : traits.autism ? 50 : 85;
  const languageLevel = languageScore < 40 ? 'low' : languageScore < 70 ? 'moderate' : 'high';
  
  // Structure & Routine
  const structureScore = traits.autism ? 90 : traits.adhd ? 40 : 70;
  const structureLevel = structureScore < 40 ? 'low' : structureScore < 70 ? 'moderate' : 'high';
  
  // Sensory Input Management
  const sensoryScore = traits.sensory ? 30 : traits.autism ? 50 : 85;
  const sensoryLevel = sensoryScore < 40 ? 'low' : sensoryScore < 70 ? 'moderate' : 'high';

  return {
    attention_regulation: {
      score: attentionScore,
      level: attentionLevel,
      patterns: getAttentionPatterns(traits),
      strengths: getAttentionStrengths(traits),
      adaptations: getAttentionAdaptations(traits)
    },
    language_processing: {
      score: languageScore,
      level: languageLevel,
      patterns: getLanguagePatterns(traits),
      strengths: getLanguageStrengths(traits),
      adaptations: getLanguageAdaptations(traits)
    },
    structure_routine: {
      score: structureScore,
      level: structureLevel,
      patterns: getStructurePatterns(traits),
      strengths: getStructureStrengths(traits),
      adaptations: getStructureAdaptations(traits)
    },
    sensory_management: {
      score: sensoryScore,
      level: sensoryLevel,
      patterns: getSensoryPatterns(traits),
      strengths: getSensoryStrengths(traits),
      adaptations: getSensoryAdaptations(traits)
    }
  };
}

// Attention & Regulation Patterns
function getAttentionPatterns(traits: any): string[] {
  if (traits.adhd) {
    return [
      'Variable focus, novelty seeking, hyper-stimulation preference',
      'Time blindness',
      'Rapid ideation, pattern recognition leaps'
    ];
  }
  if (traits.autism) {
    return [
      'Sustained focus, deep pattern understanding',
      'Needs predictable cognitive load'
    ];
  }
  return ['Typical attention regulation'];
}

function getAttentionStrengths(traits: any): string[] {
  if (traits.adhd) return ['Rapid ideation', 'Pattern recognition leaps', 'Energy under pressure'];
  if (traits.autism) return ['Deep focus', 'Sustained attention', 'Detail mastery'];
  return ['Flexible attention allocation'];
}

function getAttentionAdaptations(traits: any): string[] {
  if (traits.adhd) {
    return [
      'Short, high-engagement segments (5-7 minute bursts)',
      'Gamified progress loops',
      'Visible momentum markers',
      'Sprint-based review cycles'
    ];
  }
  if (traits.autism) {
    return [
      'Predictable lesson flow',
      'Clear time expectations',
      'Minimal context switching'
    ];
  }
  return ['Standard pacing with optional breaks'];
}

// Language & Processing Patterns
function getLanguagePatterns(traits: any): string[] {
  if (traits.dyslexia) {
    return [
      'Difficulty decoding text',
      'Visual-spatial dominance',
      'Slower linear reading'
    ];
  }
  if (traits.autism) {
    return [
      'Literal clarity preference',
      'Pattern recognition in symbols/text'
    ];
  }
  return ['Typical language processing'];
}

function getLanguageStrengths(traits: any): string[] {
  if (traits.dyslexia) return ['Pattern recognition', 'Storytelling', 'Nonlinear insight'];
  if (traits.autism) return ['Precision', 'Sustained focus', 'Deep pattern understanding'];
  return ['Flexible processing modes'];
}

function getLanguageAdaptations(traits: any): string[] {
  if (traits.dyslexia) {
    return [
      'Audio reinforcement on all key modules',
      'Chunked summaries + visual metaphors',
      'Strong headline hierarchy and symbol anchors'
    ];
  }
  if (traits.autism) {
    return [
      'Literal, explicit language',
      'Written confirmations',
      'Structured templates'
    ];
  }
  return ['Multi-modal content options'];
}

// Structure & Routine Patterns
function getStructurePatterns(traits: any): string[] {
  if (traits.autism) {
    return [
      'Need for predictability, stability, explicit rules',
      'Preference for consistent environments'
    ];
  }
  if (traits.adhd) {
    return [
      'Struggles with rigid structure',
      'Prefers flexible frameworks'
    ];
  }
  return ['Balanced structure preference'];
}

function getStructureStrengths(traits: any): string[] {
  if (traits.autism) return ['Consistency', 'Reliability', 'Thorough execution'];
  if (traits.adhd) return ['Adaptability', 'Creative problem-solving', 'Improvisation'];
  return ['Context-appropriate structure'];
}

function getStructureAdaptations(traits: any): string[] {
  if (traits.autism) {
    return [
      'Explicit sequence cues',
      'Advance previews of change',
      'Clearly scoped rituals',
      'Minimal ambiguity'
    ];
  }
  if (traits.adhd) {
    return [
      'Flexible milestones',
      'Choice-based pathways',
      'Gamified progress'
    ];
  }
  return ['Standard lesson structure'];
}

// Sensory Input Management Patterns
function getSensoryPatterns(traits: any): string[] {
  if (traits.sensory || traits.autism) {
    return [
      'High responsiveness to sound, light, or movement',
      'Preference for low-stimulation environments'
    ];
  }
  return ['Typical sensory tolerance'];
}

function getSensoryStrengths(traits: any): string[] {
  if (traits.sensory) return ['Nuanced perception', 'Attention to detail', 'Environment awareness'];
  return ['Standard sensory processing'];
}

function getSensoryAdaptations(traits: any): string[] {
  if (traits.sensory || traits.autism) {
    return [
      'Sensory-load controls (reduced animation, stable visuals)',
      'Sound-off modes',
      'Rhythm-paced transitions',
      'Simplified signal density'
    ];
  }
  return ['Standard interface'];
}

// Generate complete profile
export function generateNeurodiversityProfile(traits: {
  adhd: boolean;
  dyslexia: boolean;
  autism: boolean;
  sensory: boolean;
}): NeurodiversityProfile {
  const primaryPattern = detectNeurodiversityPattern(traits);
  const capabilityDomains = scoreCapabilityDomains(traits);
  const compoundProfiles = detectCompoundProfiles(traits);
  const clarityRating = getClarityRating(capabilityDomains);
  
  return {
    primary_pattern: primaryPattern,
    capability_domains: capabilityDomains,
    compound_profiles: compoundProfiles,
    clarity_rating: clarityRating,
    edna_tuning: generateEDNATuning(traits, capabilityDomains),
    result_blocks: generateResultBlocks(primaryPattern, traits, capabilityDomains),
    next_7_days: generateNext7Days(traits)
  };
}

function detectCompoundProfiles(traits: any): string[] {
  const profiles = [];
  
  if (traits.adhd && traits.dyslexia) {
    profiles.push('Variable focus + mixed modality decoding');
    profiles.push('Agile, pattern-driven creativity with adaptive intuition');
  }
  
  if (traits.adhd && traits.sensory) {
    profiles.push('Variable focus + sensory load management');
  }
  
  if (traits.autism && traits.dyslexia) {
    profiles.push('Structure need + processing variance');
  }
  
  return profiles;
}

function getClarityRating(domains: CapabilityDomains): string {
  const scores = [
    domains.attention_regulation.score,
    domains.language_processing.score,
    domains.structure_routine.score,
    domains.sensory_management.score
  ];
  
  const variance = Math.max(...scores) - Math.min(...scores);
  return variance > 40 ? 'High clarity' : 'Moderate clarity';
}

function generateEDNATuning(traits: any, domains: CapabilityDomains): string[] {
  const tuning: string[] = [];
  
  if (domains.attention_regulation.level === 'low') {
    tuning.push('Multi-modal delivery (text summaries, video diagrams, audio explanations)');
  }
  
  if (domains.language_processing.level === 'low') {
    tuning.push('Customization knobs (highlight tools, templates, pacing extensions)');
  }
  
  if (domains.structure_routine.level === 'high') {
    tuning.push('Environment settings (solo reflection tools, group discussion prompts)');
  }
  
  if (domains.sensory_management.level === 'low') {
    tuning.push('Pacing controls (sprint-style vs extended deep-dive modes)');
  }
  
  return tuning;
}

function generateResultBlocks(pattern: string, traits: any, domains: CapabilityDomains): any {
  if (traits.adhd) {
    return {
      headline: 'Neurodiversity: ADHD-Type Rhythm Indicators, Moderate Sensory Load Sensitivity',
      one_liner: 'You learn best with ordered visuals, concrete examples, and self-paced depth.',
      strengths: [
        'Rapid ideation and energy under pressure',
        'Pattern recognition leaps',
        'Creative problem-solving'
      ],
      adaptations: [
        'Modules segmented into 5-7 minute bursts',
        'Micro-goals and gamified check-ins',
        'Dynamic pacing and visible progress arcs'
      ]
    };
  }
  
  if (traits.dyslexia) {
    return {
      headline: 'Neurodiversity: Dyslexia Indicators, Low Sensory Load Sensitivity',
      one_liner: 'You excel with visual-spatial thinking and benefit from audio-visual co-delivery.',
      strengths: [
        'Pattern recognition and storytelling',
        'Nonlinear creative insight',
        'Strong visual-spatial processing'
      ],
      adaptations: [
        'Audio reinforcement on all key modules',
        'Chunked summaries with visual metaphors',
        'Strong headline hierarchy and symbol anchors'
      ]
    };
  }
  
  if (traits.autism) {
    return {
      headline: 'Neurodiversity: Autism-Spectrum Cognition Patterns',
      one_liner: 'You thrive with predictable structure, literal clarity, and consistent environments.',
      strengths: [
        'Deep focus and sustained attention',
        'Precision and pattern mastery',
        'Reliable execution'
      ],
      adaptations: [
        'Explicit sequence cues and advance previews',
        'Clearly scoped rituals with minimal ambiguity',
        'Structured templates and written confirmations'
      ]
    };
  }
  
  return {
    headline: 'Neurodiversity: Neurotypical Baseline',
    one_liner: 'Standard cognitive profile with flexible learning preferences.',
    strengths: ['Adaptable learning style', 'Balanced processing', 'Context flexibility'],
    adaptations: ['Standard platform features with optional customizations']
  };
}

function generateNext7Days(traits: any): string[] {
  if (traits.adhd) {
    return [
      'Use 1 mindmap per new module',
      'Summarize each lesson into a written checklist',
      'Schedule 2 reflection sessions to reinforce memory'
    ];
  }
  
  if (traits.dyslexia) {
    return [
      'Enable audio mode for all text-heavy content',
      'Create visual summaries of key concepts',
      'Use headline scanning technique for quick reviews'
    ];
  }
  
  if (traits.autism) {
    return [
      'Set up consistent daily learning schedule',
      'Preview upcoming module changes in advance',
      'Document learning rituals and success patterns'
    ];
  }
  
  return [
    'Complete your first module at your preferred pace',
    'Experiment with different content formats',
    'Track which learning styles work best for you'
  ];
}

// Practical Scenarios
export const PRACTICAL_SCENARIOS = {
  scenario1_financial: {
    visual_structured: 'Visual-Structured learner builds flowcharts',
    auditory: 'Auditory learner listens to podcast discussion',
    kinesthetic: 'Kinesthetic learner inputs data into a template and tweaks numbers'
  },
  scenario2_workshop: {
    collaborative: 'Collaborative learners thrive in breakout rooms',
    individual: 'Individual learners benefit from solo prep worksheets before sharing'
  },
  scenario3_time_pressure: {
    fast_paced: 'Fast-paced learners sprint through key deliverables',
    slow_paced: 'Slow-paced learners request extended timelines to ensure accuracy'
  }
};
