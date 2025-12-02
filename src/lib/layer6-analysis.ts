// Layer 6 Mindset & Personality - Enhanced Analysis System
// Based on psychological stance and energetic rhythm

export interface Layer6Profile {
  mindset_orientation: {
    type: 'growth' | 'fixed' | 'mixed';
    score: number; // 0-100 where 0=Fixed, 100=Growth
    patterns: string[];
    strengths: string[];
    risks: string[];
    adaptations: string[];
  };
  risk_style: {
    type: 'high' | 'moderate' | 'low';
    score: number; // 0-100 where 0=Low, 100=High
    patterns: string[];
    strengths: string[];
    risks: string[];
    adaptations: string[];
  };
  energy_modality: {
    type: 'outward' | 'inward' | 'balanced';
    score: number; // 0-100 where 0=Inward, 100=Outward
    patterns: string[];
    strengths: string[];
    risks: string[];
    adaptations: string[];
  };
}

// Mindset Orientation Patterns
const MINDSET_PATTERNS = {
  growth: {
    patterns: [
      'Sees challenges as data; failure as iteration',
      'Recovers quickly',
      'Adaptability, persistence, openness to feedback'
    ],
    strengths: ['Adaptability', 'Persistence', 'Openness to feedback'],
    risks: ['Overextension without reflection or consolidation'],
    adaptations: ['Stretch goals, rapid iteration, structured review loops']
  },
  fixed: {
    patterns: [
      'Prefers stability; treats ability as fixed',
      'Finds mistakes threatening',
      'High standards, precision, predictability'
    ],
    strengths: ['High standards', 'Precision', 'Predictability'],
    risks: ['Avoids experimentation; defensive under feedback'],
    adaptations: ['Create predictable milestones and low-risk tests']
  },
  mixed: {
    patterns: [
      'Flexible in some domains, rigid in others',
      'Contextual judgment, self-awareness'
    ],
    strengths: ['Contextual judgment', 'Self-awareness'],
    risks: ['Inconsistent response to pressure'],
    adaptations: ['Context-specific reflection prompts: "Where can I test, and where do I need certainty?"']
  }
};

// Risk Style Patterns
const RISK_PATTERNS = {
  high: {
    patterns: [
      'Acts quickly on upside; embraces ambiguity',
      'Decisive, innovative, first-mover advantage'
    ],
    strengths: ['Decisive', 'Innovative', 'First-mover advantage'],
    risks: ['Over-commitment, reckless scaling'],
    adaptations: ['Pre-mortems, staged bets, kill-safe checkpoints']
  },
  moderate: {
    patterns: [
      'Balances prudence with momentum',
      'Measured experimentation, scalable execution'
    ],
    strengths: ['Measured experimentation', 'Scalable execution'],
    risks: ['Analysis drag; slow to commit'],
    adaptations: ['Milestone greenlights, structured decision rituals']
  },
  low: {
    patterns: [
      'Seeks stability and predictability',
      'Consistency, reliability, thorough due diligence'
    ],
    strengths: ['Consistency', 'Reliability', 'Thorough due diligence'],
    risks: ['Missed opportunity windows'],
    adaptations: ['Risk buffers, safe-to-fail experiments, incremental exposure']
  }
};

// Energy Modality Patterns
const ENERGY_PATTERNS = {
  outward: {
    patterns: [
      'Energized by interaction, collaboration, momentum',
      'Persuasive communication, team activation'
    ],
    strengths: ['Persuasive communication', 'Team activation'],
    risks: ['Over-socialization, scattered focus'],
    adaptations: ['Balance live sessions with structured solo follow-through']
  },
  inward: {
    patterns: [
      'Energized by solitude and deep processing',
      'Focus, depth, clarity of thought'
    ],
    strengths: ['Focus', 'Depth', 'Clarity of thought'],
    risks: ['Low visibility, under-shared ideas'],
    adaptations: ['Async channels, protected deep-work blocks, pre-meeting briefs']
  },
  balanced: {
    patterns: [
      'Shifts between solo and collaborative modes based on context',
      'Situational flexibility, social intelligence'
    ],
    strengths: ['Situational flexibility', 'Social intelligence'],
    risks: ['Energy drain if context demands too long in one mode'],
    adaptations: ['Energy-awareness prompts, weekly "recharge audit"']
  }
};

// Scoring bands for Layer 6
export function getLayer6Bands(mindset: number, risk: number, energy: number) {
  return {
    mindset: mindset < 40 ? 'fixed' : mindset > 60 ? 'growth' : 'mixed',
    risk: risk < 40 ? 'low' : risk > 60 ? 'high' : 'moderate',
    energy: energy < 40 ? 'inward' : energy > 60 ? 'outward' : 'balanced'
  };
}

export function generateLayer6Profile(
  mindsetAnswer: string,
  riskAnswer: string, 
  energyAnswer: string
): Layer6Profile {
  // Convert answers to scores
  const mindsetScore = mindsetAnswer === 'growth' ? 85 : mindsetAnswer === 'fixed' ? 15 : 50;
  const riskScore = riskAnswer === 'high' ? 85 : riskAnswer === 'low' ? 15 : 50;
  const energyScore = energyAnswer === 'extroverted' ? 85 : energyAnswer === 'introverted' ? 15 : 50;

  // Determine types
  const bands = getLayer6Bands(mindsetScore, riskScore, energyScore);
  const mindsetType = bands.mindset as 'growth' | 'fixed' | 'mixed';
  const riskType = bands.risk as 'high' | 'moderate' | 'low';
  const energyType = bands.energy as 'outward' | 'inward' | 'balanced';

  return {
    mindset_orientation: {
      type: mindsetType,
      score: mindsetScore,
      patterns: MINDSET_PATTERNS[mindsetType].patterns,
      strengths: MINDSET_PATTERNS[mindsetType].strengths,
      risks: MINDSET_PATTERNS[mindsetType].risks,
      adaptations: MINDSET_PATTERNS[mindsetType].adaptations
    },
    risk_style: {
      type: riskType,
      score: riskScore,
      patterns: RISK_PATTERNS[riskType].patterns,
      strengths: RISK_PATTERNS[riskType].strengths,
      risks: RISK_PATTERNS[riskType].risks,
      adaptations: RISK_PATTERNS[riskType].adaptations
    },
    energy_modality: {
      type: energyType,
      score: energyScore,
      patterns: ENERGY_PATTERNS[energyType].patterns,
      strengths: ENERGY_PATTERNS[energyType].strengths,
      risks: ENERGY_PATTERNS[energyType].risks,
      adaptations: ENERGY_PATTERNS[energyType].adaptations
    }
  };
}

// Example profile scoring
export function getExampleProfile(mindset: number, risk: number, energy: number): string {
  return `Growth (${mindset}), Moderate Risk (${risk}), Balanced Energy (${energy})`;
}

// EDNA Adaptations based on Layer 6
export function getLayer6EDNAAdaptations(profile: Layer6Profile): string[] {
  const adaptations: string[] = [];
  
  // Mindset adaptations
  if (profile.mindset_orientation.type === 'growth') {
    adaptations.push('Growth: Introduce stretch goals and rapid iteration loops');
  } else if (profile.mindset_orientation.type === 'fixed') {
    adaptations.push('Fixed: Create predictable milestones and low-risk tests');
  } else {
    adaptations.push('Mixed: Alternate challenge and stability modules per context');
  }
  
  // Risk adaptations
  if (profile.risk_style.type === 'high') {
    adaptations.push('High Risk: Pre-mortems, staged bets, kill-safe checkpoints');
  } else if (profile.risk_style.type === 'low') {
    adaptations.push('Low Risk: Risk buffers, safe-to-fail experiments, incremental exposure');
  }
  
  // Energy adaptations
  if (profile.energy_modality.type === 'outward') {
    adaptations.push('Outward: Balance live sessions with structured solo follow-through');
  } else if (profile.energy_modality.type === 'inward') {
    adaptations.push('Inward: Async channels, protected deep-work blocks, pre-meeting briefs');
  }
  
  return adaptations;
}
