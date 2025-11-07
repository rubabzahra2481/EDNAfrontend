// Layer 1 — Core Identity (Architect | Alchemist | Blurred)
// Purpose: Identify the user's natural cognitive loop—the default sequencing of logic and emotion

export interface CoreIdentityProfile {
  type: 'architect' | 'alchemist' | 'blurred';
  raw_scores: {
    architect: number;
    alchemist: number;
  };
  asymmetry: number;
  construct_signals: {
    input_primacy: string;
    validation_source: string;
    decision_loop: string;
    time_horizon: string;
    error_pattern_under_stress: string;
  };
  core_statement: string;
  strengths: string[];
  blind_spots: string[];
  failure_modes: string[];
  best_contexts: string[];
  edna_adaptations: {
    overview_to: string;
    definitions_to: string;
    constraints_to: string;
    steps_to: string;
    examples_to: string;
    risks_to: string;
    action: string;
    default_artifacts: string[];
    coach_prompts: string[];
    sprint_style: string;
  };
  result_line: string;
}

// Construct Signals for Each Type
export const CONSTRUCT_SIGNALS = {
  architect: {
    input_primacy: 'Architect: starts with facts, models, constraints. Emotions are consulted after an initial rational frame.',
    validation_source: 'Architect: "It's true because it computes." Looks for internal logical consistency, external proof, repeatability.',
    decision_loop: 'Architect: model → test → adjust, emotions modulate but do not steer.',
    time_horizon: 'Architect: medium-to-long with staged checkpoints.',
    error_pattern_under_stress: 'Architect: analysis lock, model rigidity, dismissal of soft signals.'
  },
  alchemist: {
    input_primacy: 'Alchemist: starts with felt sense, narrative, gestalt of the situation. Logic formalizes what the intuition already sees.',
    validation_source: 'Alchemist: "It's right because it resonates." Looks for meaning coherence, narrative fit, emergent alignment.',
    decision_loop: 'Alchemist: sense → frame → express, logic sharpens but feeling steers.',
    time_horizon: 'Alchemist: long arc vision with leaping moments and narrative milestones.',
    error_pattern_under_stress: 'Alchemist: over-index on vibes, story jumps, under-specification.'
  },
  blurred: {
    input_primacy: 'Blurred: Adaptive loop that mirrors context; natural loop is obscured.',
    validation_source: 'Blurred: Contextual—looks for both logical consistency and resonance but struggles with primacy.',
    decision_loop: 'Blurred: Flexible but inconsistent—switches between modes based on external cues.',
    time_horizon: 'Blurred: Variable—can plan long-term but execution may zigzag.',
    error_pattern_under_stress: 'Blurred: Identity drift, inconsistent strategy, trust erosion in teams, burnout.'
  }
};

// Type Definitions
export const TYPE_DEFINITIONS = {
  architect: {
    core_statement: '"System first. Meaning emerges after the system makes sense."',
    strengths: [
      'Clarity, repeatability, scale through crisp trade-offs',
      'Can underwrite brand/strategy with metrics',
      'Perfect model-no ship, brittle plans, won't add specs if signals are emotional: implicit'
    ],
    blind_spots: [
      'Hard-wiring on constraints, skipping specs',
      'Inconsistent follow-through',
      'Under-instrumented experiments'
    ],
    failure_modes: [
      'Perfect model-no ship',
      'Brittle plans',
      'Won't add specs if signals are emotional: implicit'
    ],
    best_contexts: [
      'Category creation',
      'Brand-led growth',
      'Early discovery',
      'Zero-to-one'
    ]
  },
  alchemist: {
    core_statement: '"Energy first. The story must feel right before the math aligns."',
    strengths: [
      'Vision, synthesis—weak signals, brand and narrative power',
      'Breakthrough ideation'
    ],
    blind_spots: [
      'Hand-waving on constraints',
      'Skipping specs',
      'Inconsistent follow-through',
      'Under-instrumented experiments'
    ],
    failure_modes: [
      'Strategy drift',
      'Team whiplash',
      'Under-instrumented experiments'
    ],
    best_contexts: [
      'Category creation',
      'Brand-led growth',
      'Early discovery',
      'Zero-to-one'
    ]
  },
  blurred: {
    core_statement: '"Adaptive loop that mirrors context; natural loop is obscured."',
    strengths: [
      'Flexible',
      'Chameleon execution',
      'Broad pattern library'
    ],
    blind_spots: [
      'Identity drift',
      'Inconsistent strategy'
    ],
    failure_modes: [
      'Trust erosion in teams',
      'Burnout'
    ],
    best_contexts: []
  }
};

// EDNA Adaptations by Type
export const EDNA_ADAPTATIONS = {
  architect: {
    overview_to: 'Definitions',
    definitions_to: 'Constraints',
    constraints_to: 'Steps',
    steps_to: 'Examples',
    examples_to: 'Risks',
    risks_to: 'Action',
    default_artifacts: [
      'SOPs',
      'Checklists',
      'Dashboards',
      'Pre-mortems',
      'Decision trees'
    ],
    coach_prompts: [
      '"Which model would change your mind?"',
      '"Which assumption dominates variance?"'
    ],
    sprint_style: 'Plan → Do → Check → Act, with explicit kill-scale gates'
  },
  alchemist: {
    overview_to: 'Story',
    definitions_to: 'Why it matters',
    constraints_to: 'Pattern',
    steps_to: 'Principles',
    examples_to: 'Guardrails',
    risks_to: 'First moves',
    risks_to_action: 'Metrics',
    default_artifacts: [
      'Narrative briefs',
      'Hypotheses canvases',
      'Vision ladders',
      'Demo-first loops'
    ],
    coach_prompts: [
      '"What must be true?"',
      '"Which 2 constraints matter now?"',
      '"How will we know it worked?"'
    ],
    sprint_style: 'Sense → Test → Show, then consolidation blocks to codify what worked'
  },
  blurred: {
    overview_to: 'Context-appropriate mix',
    definitions_to: 'Adaptive',
    constraints_to: 'Flexible',
    steps_to: 'Two-track sprints',
    examples_to: 'Guardrails',
    risks_to: 'Action',
    default_artifacts: [
      'Guardrails',
      'Force choices explicit "why now" for pivots',
      'Publish decision records'
    ],
    coach_prompts: [
      '"Is this loop mirroring context or building momentum?"'
    ],
    sprint_style: 'Two-track: one Architect stack (spec + checkpoint) and one Alchemist track (vision + demo). Track energy, output quality, and friction to infer natural loop.'
  }
};

// Result Line Templates
export const RESULT_LINE_TEMPLATES = {
  architect: '"You are an Architect: you default to structured reasoning, validate through models, and refine with feedback."',
  alchemist: '"You are an Alchemist: you default to vision and pattern, formalize with logic, and move when it resonates."',
  blurred: '"You present as Blurred: highly adaptive, EDNA will stabilize your natural loop, then tailor delivery."'
};

// Classification Logic
export function classifyCoreType(
  architectScore: number,
  alchemistScore: number,
  threshold: number = 30
): 'architect' | 'alchemist' | 'blurred' {
  const asymmetry = Math.abs(architectScore - alchemistScore);
  
  if (asymmetry < threshold) {
    return 'blurred';
  }
  
  return architectScore > alchemistScore ? 'architect' : 'alchemist';
}

// Generate Complete Core Identity Profile
export function generateCoreIdentityProfile(
  architectScore: number,
  alchemistScore: number,
  threshold: number = 30
): CoreIdentityProfile {
  const type = classifyCoreType(architectScore, alchemistScore, threshold);
  const asymmetry = Math.abs(architectScore - alchemistScore);
  
  return {
    type,
    raw_scores: {
      architect: architectScore,
      alchemist: alchemistScore
    },
    asymmetry,
    construct_signals: CONSTRUCT_SIGNALS[type],
    core_statement: TYPE_DEFINITIONS[type].core_statement,
    strengths: TYPE_DEFINITIONS[type].strengths,
    blind_spots: TYPE_DEFINITIONS[type].blind_spots,
    failure_modes: TYPE_DEFINITIONS[type].failure_modes,
    best_contexts: TYPE_DEFINITIONS[type].best_contexts,
    edna_adaptations: EDNA_ADAPTATIONS[type],
    result_line: RESULT_LINE_TEMPLATES[type]
  };
}

// Assessment Method: Item Buckets (Sample Prompts)
export const ASSESSMENT_PROMPTS = {
  input_primacy: {
    question: 'When starting a new initiative, I first...',
    architect_answer: 'A) outline constraints and success metrics',
    alchemist_answer: 'B) articulate the story and felt outcome'
  },
  validation_source: {
    question: 'I trust a decision most when...',
    architect_answer: 'A) the model holds up across scenarios',
    alchemist_answer: 'B) the narrative and values self-critique'
  },
  decision_loop: {
    question: 'Under pressure, I tend to...',
    architect_answer: 'A) tighten the plan and add checks',
    alchemist_answer: 'B) re-anchor to vision and restore the path'
  },
  stress_pattern: {
    question: 'My "first question after a miss is..."',
    architect_answer: 'A) which assumption failed, how to bound it',
    alchemist_answer: 'B) where the audience/market energy shifted'
  },
  post_mortem_focus: {
    question: 'Post-mortem focus:',
    architect_answer: 'A) which assumption failed, how to bound it',
    alchemist_answer: 'B) where the audience/market energy shifted'
  }
};

// Edge Handling
export const EDGE_HANDLING = {
  masking: 'Suspected if self-report conflicts with behavior logs in Layer 2 (e.g., user "prefers" narrative content but only completes checklist modules). Mark masking_flag = true for Layer 2 interview.'
};

// Evidence Collection (Optional)
export const EVIDENCE_COLLECTION = {
  micro_tasks: 'Give the user both a spec-first brief and a story-first brief. Observe which they complete faster and better.',
  writing_sample: 'Do they outline first or narrate first?',
  meeting_notes: 'Questions pattern—facts/constraints vs. meaning/story.'
};
