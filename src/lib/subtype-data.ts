// Comprehensive EDNA Subtype Data
// Based on the 7-layer assessment framework

export interface SubtypeProfile {
  id: string;
  name: string;
  type: 'architect' | 'alchemist' | 'blurred';
  core_statement: string;
  strengths: string[];
  blindspots: string[];
  failure_modes: string[];
  best_contexts: string[];
  edna_adaptations: {
    framing_order: string[];
    artifacts: string[];
    decision_hygiene: string[];
    sprint_style: string;
    team_interface: string[];
    metric_focus: string[];
    progression_path: string;
  };
  result_line: string;
}

export const SUBTYPE_PROFILES: { [key: string]: SubtypeProfile } = {
  // ARCHITECT SUBTYPES
  master_strategist: {
    id: 'master_strategist',
    name: 'Master Strategist',
    type: 'architect',
    core_statement: 'Strategy > Systems > Truth integrated.',
    strengths: ['coherent bets', 'scalable machines', 'validated learning loop'],
    blindspots: ['few', 'risk is scope overload if context-switching'],
    failure_modes: ['empire building', 'thin narrative with consumers'],
    best_contexts: ['multi-product portfolio', 'ambiguous future', 'high-stakes bets'],
    edna_adaptations: {
      framing_order: ['Strategy one-pager', 'Operating design', 'Evidence plan'],
      artifacts: ['map linking OKRs ⇄ SOPs ⇄ Experiments'],
      decision_hygiene: ['monthly strategy ops', 'dual metrics (impact + stability)'],
      sprint_style: ['alternating strategy and ops sprints', 'fast plan→learn loop'],
      team_interface: ['couple with Builders for some', 'Analyzers for proof'],
      metric_focus: ['value stream throughput', 'cost of error', 'strategic variance'],
      progression_path: 'Ultimate → maintain demo discipline; try to codify narrative pressure'
    },
    result_line: 'You are an Ultimate Architect: you integrate strategy, systems, and proof into one engine.'
  },
  
  systemised_builder: {
    id: 'systemised_builder',
    name: 'Systemised Builder',
    type: 'architect',
    core_statement: 'Win by building repeatable engines and robust handoffs.',
    strengths: ['product pace', 'detail', 'UX polish', 'desirability'],
    blindspots: ['shipping hesitation', 'scope creep', 'cost blowouts'],
    failure_modes: ['perfection stall', 'misaligned polish vs. value'],
    best_contexts: ['premium product', 'brand', 'design-led growth'],
    edna_adaptations: {
      framing_order: ['SLA', 'SOP', 'Training', 'Instrumentation', 'Kaizen'],
      artifacts: ['runbooks', 'checklists', 'playbooks', 'SPC charts'],
      decision_hygiene: ['change control', 'CAPA logs', 'control limits'],
      sprint_style: ['cycle time', 'defect rate', 'cost per unit', 'SLA attainment'],
      team_interface: ['pair with Strategists for direction', 'Alchemists for step-change ideas'],
      metric_focus: ['Progression → Ultimate: add invention slots', 'project 10-15% capacity for experiments'],
      progression_path: 'You are a Systemised Builder: you scale by standardizing and improving flow'
    },
    result_line: 'You are a Systemised Builder: you scale by standardizing and improving flow.'
  },

  internal_analyser: {
    id: 'internal_analyser',
    name: 'Internal Analyser',
    type: 'architect',
    core_statement: 'Win by being right: truth through data and models.',
    strengths: ['fraud detection', 'causality', 'risk quantification', 'decision quality'],
    blindspots: ['analysis drag', 'perfectionism', 'undervaluing tacit knowledge'],
    failure_modes: ['late decisions', 'KPI tunnel vision', 'low narrative buy-in'],
    best_contexts: ['pricing', 'growth analytics', 'forecasting', 'experimentation'],
    edna_adaptations: {
      framing_order: ['Hypothesis', 'Design', 'Power', 'Run', 'Interpret', 'Action'],
      artifacts: ['experiment backlogs', 'notebooks', 'DAGs', 'causal diagrams'],
      decision_hygiene: ['pre-reg criteria', 'stopping rules', 'sensitivity analysis'],
      sprint_style: ['2-week test cycles', 'weekly variance reviews'],
      team_interface: ['pair with Strategists for integrate', 'co-design demos with Alchemists'],
      metric_focus: ['lift', 'variance explained', 'decision value', 'error bars'],
      progression_path: 'Ultimate → ship simplified stories with the numbers'
    },
    result_line: 'You are an Internal Analyser: you move by proving and de-risking with data.'
  },

  ultimate_architect: {
    id: 'ultimate_architect',
    name: 'Ultimate Architect',
    type: 'architect',
    core_statement: 'Strategy > Systems > Truth integrated.',
    strengths: ['coherent bets', 'scalable machines', 'validated learning loop', 'emotional intelligence with logic'],
    blindspots: ['few', 'risk is scope overload if context-switching'],
    failure_modes: ['empire building', 'over-optimization at expense of team morale'],
    best_contexts: ['multi-product portfolio', 'ambiguous future', 'high-stakes bets', 'rapid iteration'],
    edna_adaptations: {
      framing_order: ['Strategy one-pager', 'Operating design', 'Evidence plan', 'Real-time adjustment'],
      artifacts: ['map linking OKRs ⇄ SOPs ⇄ Experiments', 'adaptability frameworks'],
      decision_hygiene: ['monthly strategy ops', 'dual metrics (impact + stability)', 'emotion as data'],
      sprint_style: ['alternating strategy and ops sprints', 'fast plan→learn→adjust loop'],
      team_interface: ['couple with Builders for execution', 'Analyzers for proof', 'maintain team morale'],
      metric_focus: ['value stream throughput', 'cost of error', 'strategic variance', 'team satisfaction'],
      progression_path: 'Maintain demo discipline while codifying narrative pressure and balancing optimization with human factors'
    },
    result_line: 'You are an Ultimate Architect: you integrate strategy, systems, and proof while maintaining emotional awareness.'
  },

  // ALCHEMIST SUBTYPES
  visionary_oracle: {
    id: 'visionary_oracle',
    name: 'Visionary Oracle',
    type: 'alchemist',
    core_statement: 'Win by seeing the future pattern first.',
    strengths: ['category narratives', 'zeitgeist sensing', 'non-obvious bets'],
    blindspots: ['glazing over constraints', 'shaky handoff to execution'],
    failure_modes: ['grand vision no spine', 'team whiplash', 'missed basics'],
    best_contexts: ['zero-to-one', 'brand/category creation', 'fundraising story'],
    edna_adaptations: {
      framing_order: ['Imagine Future', 'Why now', 'Pattern', 'First proof'],
      artifacts: ['narrative briefs', 'concept reels', 'motif boards'],
      decision_hygiene: ['must-be-true links', '30-day proof windows'],
      sprint_style: ['demo-driven discovery', 'then codify'],
      team_interface: ['couple with Builders for spine', 'Analyzers for proof'],
      metric_focus: ['narrative adoption', 'signal momentum', 'first-proofs shipped'],
      progression_path: 'Ultimate → shorten demo cycle; add constraint discipline'
    },
    result_line: 'You are a Visionary Oracle: pattern and story lead, proof follows.'
  },

  magnetic_perfectionist: {
    id: 'magnetic_perfectionist',
    name: 'Magnetic Perfectionist',
    type: 'alchemist',
    core_statement: 'Win by crafting magnetic product quality and taste.',
    strengths: ['product pace', 'detail', 'UX polish', 'desirability'],
    blindspots: ['shipping hesitation', 'scope creep', 'cost blowouts'],
    failure_modes: ['perfection stall', 'misaligned polish vs. value'],
    best_contexts: ['premium product', 'brand', 'design-led growth'],
    edna_adaptations: {
      framing_order: ['Emotional look', 'Taste bar', 'Feasible cut'],
      artifacts: ['quality bars', 'taste guides', 'cut-lines', 'UX principles'],
      decision_hygiene: ['red/amber/green cut-lines', 'weekly ship gates'],
      sprint_style: ['polish sprints with firm ship thresholds'],
      team_interface: ['pair with Strategists for "good-enough"', 'Builders enforce gates'],
      metric_focus: ['activation', 'retention', 'NPS by cohort', 'willingness-to-pay'],
      progression_path: 'Ultimate → de-risk taste; ship weekly constraints'
    },
    result_line: 'You are a Magnetic Perfectionist: you create pull through product excellence.'
  },

  energetic_empath: {
    id: 'energetic_empath',
    name: 'Energetic Empath',
    type: 'alchemist',
    core_statement: 'Win by mobilizing people and energy around a cause.',
    strengths: ['community', 'partnerships', 'recruiting', 'momentum'],
    blindspots: ['boundary slippage', 'diffusion', 'consensus drag'],
    failure_modes: ['burn-out', 'unclear ownership', 'soft commitments'],
    best_contexts: ['GTM partnerships', 'communities', 'evangelism', 'hiring'],
    edna_adaptations: {
      framing_order: ['Expand: Why us', 'Shared win', 'Next step'],
      artifacts: ['partner canvases', 'RACI', 'commitment logs', 'community rituals'],
      decision_hygiene: ['exit criteria', 'time-boxed pilots', 'partner scorecards'],
      sprint_style: ['coalition sprints with crisp goals'],
      team_interface: ['pair with Strategists for scope', 'Builders for execution'],
      metric_focus: ['Progression → Ultimate: strengthen "outcome/fault exit rules"', 'formalize wins'],
      progression_path: 'activate advocates, contribution margins'
    },
    result_line: 'You are an Energetic Empath: you move markets through people and shared wins.'
  },

  ultimate_alchemist: {
    id: 'ultimate_alchemist',
    name: 'Ultimate Alchemist',
    type: 'alchemist',
    core_statement: 'Care statement: Vision > Taste > People integrated with proof.',
    strengths: ['narrative that converts', 'product pull', 'communities that scale'],
    blindspots: ['few', 'watch over-promise vs. system capacity'],
    failure_modes: ['scaling story faster than ops'],
    best_contexts: ['product-led growth', 'brand-led expansion', 'marketplace ignition'],
    edna_adaptations: {
      framing_order: ['Vision one-pager', 'Proof ladder', 'Operating guardrails'],
      artifacts: ['demo calendar', 'proof KPIs', 'quality gates'],
      decision_hygiene: ['demo→decide', 'codify', 'dual KPIs (pull + capacity)'],
      sprint_style: ['demo bursts + consolidation sprints'],
      team_interface: ['pair with Builders to invite data to tame the story'],
      metric_focus: ['narrative adoption', 'product NPS', 'community growth'],
      progression_path: 'align story, produce, and people with continual proof'
    },
    result_line: 'You are an Ultimate Alchemist: you align story, produce, and people with continual proof.'
  },

  // BLURRED SUBTYPES
  blurred_overthinker: {
    id: 'blurred_overthinker',
    name: 'Blurred Overthinker',
    type: 'blurred',
    core_statement: 'Pattern: chronic analysis to avoid choice; fear of wrong loop (misaligned loops between Internal Analyzer ↔ Magnetic Perfectionist).',
    strengths: ['deep analysis', 'thoughtful consideration', 'multi-perspective thinking'],
    blindspots: ['paralysis', 'low throughput'],
    failure_modes: ['analysis paralysis', 'missed deadlines', 'team frustration'],
    best_contexts: ['high-stakes decisions requiring deep analysis'],
    edna_adaptations: {
      framing_order: ['force small', 'frequent commits', '48-hour decision SLAs', 'two-track week (spec + demo)'],
      artifacts: ['decision logs', 'commit trackers', 'forced choice templates'],
      decision_hygiene: ['time limits', 'default actions', 'escalation paths'],
      sprint_style: ['short cycles with forced shipping'],
      team_interface: ['external accountability partner'],
      metric_focus: ['decisions per week', 'cycle time', 'shipped experiments'],
      progression_path: 'compare energy/quality between tracks → choose Architect/Alchemist path'
    },
    result_line: 'Pattern identified: Blurred Overthinker - focus on forcing small, frequent commits to build momentum.'
  },

  blurred_overplanner: {
    id: 'blurred_overplanner',
    name: 'Blurred Overplanner',
    type: 'blurred',
    core_statement: 'Pattern: keeps both process and people happy, but partial loops stall delivery (Systemised Builder ↔ Energetic Empath).',
    strengths: ['coordination', 'stakeholder management', 'thorough planning'],
    blindspots: ['busy coordination', 'thin completions'],
    failure_modes: ['endless planning', 'low shipping velocity', 'initiative fatigue'],
    best_contexts: ['complex stakeholder environments'],
    edna_adaptations: {
      framing_order: ['one owner-one date', 'limit: WIP to three', 'commit review'],
      artifacts: ['RACI with dates', 'WIP limits', 'weekly ship log'],
      decision_hygiene: ['single-threaded ownership', 'hard deadlines'],
      sprint_style: ['focus sprints', 'limit parallel work'],
      team_interface: ['coach on saying no', 'protect focus time'],
      metric_focus: ['completed initiatives', 'WIP count', 'cycle time'],
      progression_path: 'Stabilization: one owner-one date; limit WIP to three; commit review'
    },
    result_line: 'Pattern identified: Blurred Overplanner - choose the loop that closes more items with fewer reopenings.'
  },

  blurred_ultimate: {
    id: 'blurred_ultimate',
    name: 'Blurred Ultimate',
    type: 'blurred',
    core_statement: 'Pattern: global identity blur — changes core to fit the room (can mimic all three Blurred modes).',
    strengths: ['extreme adaptability', 'context switching', 'universal translator'],
    blindspots: ['identity fog', 'incoherence', 'burnout'],
    failure_modes: ['lost sense of self', 'inconsistent decisions', 'team confusion'],
    best_contexts: ['crisis management', 'organizational transformation'],
    edna_adaptations: {
      framing_order: ['identity log', 'chair-by-chair-one only', 'two-checks by chosen spine', 'no mid-meeting persona switches'],
      artifacts: ['identity journal', 'decision anchor log', 'personal constitution'],
      decision_hygiene: ['choose one core (Architect or Alchemist) and pair deliberately for mirror checks'],
      sprint_style: ['structured identity practice', 'weekly reflection'],
      team_interface: ['transparent about mode', 'consistent primary validator'],
      metric_focus: ['decision consistency', 'identity clarity', 'sustainable pace'],
      progression_path: 'select a true core (Architect or Alchemist) and pair deliberately for the mirror checks'
    },
    result_line: 'Pattern identified: Blurred Ultimate - select a true core and pair deliberately for mirror checks.'
  }
};

// Item banks for Layer 2 assessment
export const ITEM_BANKS = {
  optimization_target: [
    {
      text: 'When crunched, I protect... A) plan integrity B) process consistency C) decision accuracy D) story coherence E) stakeholder momentum',
      scores: {
        A: 'master_strategist',
        B: 'systemised_builder',
        C: 'internal_analyser',
        D: 'visionary_oracle',
        E: 'energetic_empath'
      }
    }
  ],
  artifact_gravitation: [
    {
      text: 'Pick two you\'d create first on a new project:',
      options: [
        { text: 'Strategic roadmap', value: 'master_strategist' },
        { text: 'Standard Operating Procedure', value: 'systemised_builder' },
        { text: 'Analytics notebook', value: 'internal_analyser' },
        { text: 'Narrative brief', value: 'visionary_oracle' },
        { text: 'Partner canvas', value: 'energetic_empath' },
        { text: 'Quality taste guide', value: 'magnetic_perfectionist' }
      ]
    }
  ],
  stress_reversion: [
    {
      text: 'Choose your re-flex under live fire:',
      options: [
        { text: 'Pull back to strategic plan', value: 'master_strategist' },
        { text: 'Tighten process controls', value: 'systemised_builder' },
        { text: 'Run more analysis', value: 'internal_analyser' },
        { text: 'Reframe the narrative', value: 'visionary_oracle' },
        { text: 'Rally the team/partners', value: 'energetic_empath' },
        { text: 'Polish until it\'s right', value: 'magnetic_perfectionist' }
      ]
    }
  ],
  decision_rhythm: [
    {
      text: 'Pre-ferred cadence descriptions:',
      options: [
        { text: 'Monthly strategy reviews with clear milestones', value: 'master_strategist' },
        { text: 'Weekly process optimization and control checks', value: 'systemised_builder' },
        { text: 'Bi-weekly experiment cycles with data reviews', value: 'internal_analyser' },
        { text: 'Demo-driven discovery with proof windows', value: 'visionary_oracle' },
        { text: 'Coalition sprints with partnership milestones', value: 'energetic_empath' },
        { text: 'Polish cycles with quality gates', value: 'magnetic_perfectionist' }
      ]
    }
  ]
};

export function getSubtypeProfile(subtypeId: string): SubtypeProfile | undefined {
  return SUBTYPE_PROFILES[subtypeId];
}

export function getSubtypesByType(type: 'architect' | 'alchemist' | 'blurred'): SubtypeProfile[] {
  return Object.values(SUBTYPE_PROFILES).filter(profile => profile.type === type);
}
