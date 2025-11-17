// Layer 3 — Mirror Pair Awareness (Opposite Validator Integration)
// Purpose: Measure how well the user accesses their opposite validator (Architect ↔ Alchemist)

export interface MirrorAwarenessProfile {
  dimensions: {
    recognition: DimensionScore;
    translation: DimensionScore;
    integration: DimensionScore;
    governance: DimensionScore;
    conflict_recovery: DimensionScore;
  };
  overall_score: number;
  score_band: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Mastery';
  directional_scores: {
    architect_to_alchemist?: number;
    alchemist_to_architect?: number;
  };
  sub_scale_scores: {
    R: number; // Recognition
    T: number; // Translation
    I: number; // Integration
    G: number; // Governance
    C: number; // Conflict Recovery
  };
  dual_kpi_present: boolean;
  chairing_roles_present: boolean;
  practical_scenarios: {
    scenario_1_launch_deadline: ScenarioResponse;
    scenario_2_viral_buzz: ScenarioResponse;
  };
}

export interface DimensionScore {
  score: number; // 0-100
  weighted_score?: number; // For T and G (×1.25)
  level: 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Mastery';
  description: string;
  indicators: string[];
}

export interface ScenarioResponse {
  architect_response: string;
  alchemist_response: string;
  high_awareness_response: string;
  user_response?: string;
  awareness_level?: string;
}

// Dimension Definitions
export const DIMENSION_DEFINITIONS = {
  recognition: {
    name: 'Recognition (R)',
    description: 'Can you identify when the opposite validator matters?',
    indicators: {
      high: [
        'Spots when logic gaps need narrative bridge',
        'Sees when story needs structural proof',
        'Recognizes context demands opposite mode'
      ],
      low: [
        'Dismisses opposite signals',
        'Mono-mode problem framing',
        'Misses context cues for mode switching'
      ]
    }
  },
  translation: {
    name: 'Translation (T)',
    weighted: true,
    weight: 1.25,
    description: 'Can you convert insights across validators?',
    indicators: {
      high: [
        'Translates data into compelling narrative',
        'Converts vision into actionable specs',
        'Bridges technical and creative languages'
      ],
      low: [
        'Struggles to explain logic to creatives',
        'Cannot quantify intuitive insights',
        'Lost in translation between modes'
      ]
    }
  },
  integration: {
    name: 'Integration (I)',
    description: 'Can you run both loops simultaneously or in rapid succession?',
    indicators: {
      high: [
        'Seamlessly blends system and story',
        'Rapid switching between modes',
        'Maintains coherence across validators'
      ],
      low: [
        'Mode switching feels jarring',
        'One mode dominates exclusively',
        'Integration attempts create confusion'
      ]
    }
  },
  governance: {
    name: 'Governance (G)',
    weighted: true,
    weight: 1.25,
    description: 'Do you have rituals to ensure both validators are consulted?',
    indicators: {
      high: [
        'Structured dual-review processes',
        'Checkpoints for both logic and resonance',
        'Explicit validation from both perspectives'
      ],
      low: [
        'No formal integration rituals',
        'Ad-hoc, inconsistent validation',
        'Missing systematic dual-check'
      ]
    }
  },
  conflict_recovery: {
    name: 'Conflict Recovery (C)',
    description: 'When validators conflict, can you resolve or hold the tension?',
    indicators: {
      high: [
        'Productive tension between modes',
        'Iterative refinement across validators',
        'Can hold paradox without collapsing'
      ],
      low: [
        'Freezes when validators conflict',
        'Forces premature resolution',
        'Abandons one validator entirely'
      ]
    }
  }
};

// Practical Scenarios
export const PRACTICAL_SCENARIOS = {
  scenario_1_launch_deadline: {
    context: 'Scenario 1 – Launch Deadline, Weak Adoption',
    architect_default: 'Architect default: adds specs/tests → misses narrative gap.',
    alchemist_default: 'Alchemist default: amplifies story → risks SLO breach.',
    high_awareness: 'High awareness: runs demo review → extracts must-be-true → builds constraints → feasible cut.',
    responses: {
      architect: 'Add more specs and tests to ensure quality',
      alchemist: 'Amplify the story and narrative to drive adoption',
      high_awareness: 'Run demo review, extract must-be-true requirements, build constraints, make feasible cut'
    }
  },
  scenario_2_viral_buzz: {
    context: 'Scenario 2 – Viral Buzz, Ops Strain',
    architect_default: 'Architect default: runs demo review → extracts must be true → builds constraints → feasible cut.',
    alchemist_default: 'Alchemist default: adds capacity model + timelines → preserves story essence while staying stable.',
    high_awareness: 'High awareness: adds capacity model + timelines → preserves story essence while staying stable.',
    responses: {
      architect: 'Run demo review, extract requirements, build constraints',
      alchemist: 'Add capacity model and timelines while preserving story',
      high_awareness: 'Integrate both: capacity planning with narrative preservation'
    }
  }
};

// Clean Boundaries (What Layer 3 Does NOT Measure)
export const CLEAN_BOUNDARIES = {
  not_measured: [
    'Learning modality or pace language (→ Layer 4)',
    'Risk/extraversion framing (→ Layer 6)',
    'Value/belief language (→ Layer 7)',
    'No neurodiversity trait language (→ Layer 5)'
  ]
};

// QA Checklist
export const QA_CHECKLIST = {
  required: [
    'Directional scores (A→L, L→A) included',
    'Sub-scale scores (R, T, I, G, C) included',
    'Dual-KPI and chairing roles present',
    'For Blurred: both directions evaluated + Layer 1 stabilization linked'
  ],
  validation: [
    'Ensure Translation (T) and Governance (G) are weighted at ×1.25',
    'Overall score formula: ((R + T×1.25 + I + G×1.25 + C) / 5.5) × 100',
    'Score bands correctly applied'
  ]
};

// Scoring Bands
export function getScoreBand(score: number): 'Very Low' | 'Low' | 'Moderate' | 'High' | 'Mastery' {
  if (score >= 85) return 'Mastery';
  if (score >= 75) return 'High';
  if (score >= 65) return 'Moderate';
  if (score >= 50) return 'Low';
  return 'Very Low';
}

// Calculate Overall Mirror Awareness Score
export function calculateMirrorAwarenessScore(
  R: number,
  T: number,
  I: number,
  G: number,
  C: number
): number {
  // Formula: ((R + T×1.25 + I + G×1.25 + C) / 5.5) × 100
  const weightedSum = R + (T * 1.25) + I + (G * 1.25) + C;
  return Math.round((weightedSum / 5.5));
}

// Generate Dimension Score
export function generateDimensionScore(
  dimensionKey: keyof typeof DIMENSION_DEFINITIONS,
  rawScore: number
): DimensionScore {
  const definition = DIMENSION_DEFINITIONS[dimensionKey];
  const level = getScoreBand(rawScore);
  const weighted = definition.weighted ? rawScore * definition.weight : undefined;
  
  return {
    score: rawScore,
    weighted_score: weighted,
    level,
    description: definition.description,
    indicators: rawScore >= 65 ? definition.indicators.high : definition.indicators.low
  };
}

// Generate Complete Mirror Awareness Profile
export function generateMirrorAwarenessProfile(
  scores: {
    R: number;
    T: number;
    I: number;
    G: number;
    C: number;
  },
  coreType: 'architect' | 'alchemist' | 'blurred'
): MirrorAwarenessProfile {
  const overall = calculateMirrorAwarenessScore(scores.R, scores.T, scores.I, scores.G, scores.C);
  const scoreBand = getScoreBand(overall);
  
  // Calculate directional scores based on core type
  const directionalScores: any = {};
  if (coreType === 'architect') {
    directionalScores.architect_to_alchemist = overall;
  } else if (coreType === 'alchemist') {
    directionalScores.alchemist_to_architect = overall;
  } else {
    // Blurred: evaluate both directions
    directionalScores.architect_to_alchemist = overall;
    directionalScores.alchemist_to_architect = overall;
  }
  
  return {
    dimensions: {
      recognition: generateDimensionScore('recognition', scores.R),
      translation: generateDimensionScore('translation', scores.T),
      integration: generateDimensionScore('integration', scores.I),
      governance: generateDimensionScore('governance', scores.G),
      conflict_recovery: generateDimensionScore('conflict_recovery', scores.C)
    },
    overall_score: overall,
    score_band: scoreBand,
    directional_scores: directionalScores,
    sub_scale_scores: scores,
    dual_kpi_present: scores.G >= 65,
    chairing_roles_present: scores.G >= 75,
    practical_scenarios: {
      scenario_1_launch_deadline: {
        architect_response: PRACTICAL_SCENARIOS.scenario_1_launch_deadline.responses.architect,
        alchemist_response: PRACTICAL_SCENARIOS.scenario_1_launch_deadline.responses.alchemist,
        high_awareness_response: PRACTICAL_SCENARIOS.scenario_1_launch_deadline.responses.high_awareness
      },
      scenario_2_viral_buzz: {
        architect_response: PRACTICAL_SCENARIOS.scenario_2_viral_buzz.responses.architect,
        alchemist_response: PRACTICAL_SCENARIOS.scenario_2_viral_buzz.responses.alchemist,
        high_awareness_response: PRACTICAL_SCENARIOS.scenario_2_viral_buzz.responses.high_awareness
      }
    }
  };
}

// Development Recommendations by Score Band
export function getMirrorDevelopmentRecommendations(scoreBand: string, coreType: string): string[] {
  const recommendations: { [key: string]: string[] } = {
    'Very Low': [
      'Start with Recognition training: spot when opposite validator matters',
      'Practice identifying signals that require mode switching',
      'Begin with structured exercises for basic translation',
      `As ${coreType}, focus on recognizing ${coreType === 'architect' ? 'narrative gaps' : 'logical gaps'}`
    ],
    'Low': [
      'Build Translation skills: convert insights across validators',
      'Practice explaining your work in opposite language',
      'Set up basic dual-check rituals',
      'Work on maintaining coherence during mode switches'
    ],
    'Moderate': [
      'Strengthen Integration: run both loops simultaneously',
      'Develop governance rituals for systematic validation',
      'Practice holding tension when validators conflict',
      'Move toward seamless mode switching'
    ],
    'High': [
      'Refine Governance structures for consistent dual-validation',
      'Master conflict recovery techniques',
      'Train others in mirror awareness',
      'Build toward Mastery-level integration'
    ],
    'Mastery': [
      'Maintain your mirror awareness through regular practice',
      'Mentor others in developing opposite validator skills',
      'Innovate new integration techniques',
      'Share your practices as case studies'
    ]
  };
  
  return recommendations[scoreBand] || recommendations['Moderate'];
}
