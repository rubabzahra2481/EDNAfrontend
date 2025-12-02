/**
 * Layer 2: Execution Style Subtype
 * Has 3 different question sets based on Layer 1 result
 */

export interface Layer2Question {
  id: string;
  text: string;
  path: 'architect' | 'alchemist' | 'mixed';
  options: {
    value: 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';
    text: string;
    score: string;
  }[];
}


// Architect Path Questions (Q9-Q16)
export const layer2ArchitectQuestions: Layer2Question[] = [
  { 
    id: 'L2_Q9', 
    text: 'When things move fast or pressure rises, I instinctively protect:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'The plan — the steps, sequence, and priorities.\n→ Prioritises sequencing and plan integrity', score: 'planner' },
      { value: 'b', text: 'The process — the systems, routines, and operational flow.\n→ Protects operations and processes first', score: 'operator' },
      { value: 'c', text: 'The proof — the accuracy, data, and assumptions.\n→ Focuses on validation and data under pressure', score: 'analyst' },
      { value: 'd', text: 'The whole structure — I try to protect the plan, the system, and the data all at once.\n→ Stabilises the entire structural system rather than one part', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q10', 
    text: 'When starting a major project, the first thing I create is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'A roadmap or phased strategy.\n→ Strategy-first thinker (Sequencing)', score: 'planner' },
      { value: 'b', text: 'A repeatable workflow or operational system.\n→ Operations-first thinker (Systems)', score: 'operator' },
      { value: 'c', text: 'A model, spreadsheet, or assumptions map.\n→ Data-first thinker (Analysis)', score: 'analyst' },
      { value: 'd', text: 'A unified frame that combines phases, systems, and key data.\n→ Integrative thinker (Full-structure)', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q11', 
    text: 'When I\'m working in my natural rhythm, my focus naturally goes toward:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'Putting decisions in the right order and mapping the sequence clearly.\n→ Strategy-first', score: 'planner' },
      { value: 'b', text: 'Making the workflow smooth, predictable, and efficient.\n→ Operations-first', score: 'operator' },
      { value: 'c', text: 'Reducing uncertainty by analysing details, data, and assumptions.\n→ Analysis-first', score: 'analyst' },
      { value: 'd', text: 'Keeping the strategy, systems, and data aligned at the same time.\n→ Integration-first', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q12', 
    text: 'When a project or task starts breaking down (delays, confusion, errors, or misalignment), my first instinct is to:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'Zoom out, rethink the overall plan, and re-sequence the steps so everything makes sense again.\n→ Strategy Reset', score: 'planner' },
      { value: 'b', text: 'Tighten or redesign the workflow, system, or routine so things run smoothly again.\n→ Process Reset', score: 'operator' },
      { value: 'c', text: 'Analyse what\'s causing the issue — look at the details, variables, or data — and test logical fixes.\n→ Analytical Reset', score: 'analyst' },
      { value: 'd', text: 'Re-align everything at once: the plan, the process, and the data behind it.\n→ Full Structural Reset', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q13', 
    text: 'When I\'m trying to build momentum on a project (getting myself to start, stay focused, or speed up), I find it easiest when:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'I know the exact next steps — a clear sequence makes it natural for me to move forward.\n→ Step Clarity -Sequence-driven execution', score: 'planner' },
      { value: 'b', text: 'The workflow or routine is already set up — once the system feels smooth, I move quickly.\n→ System Flow -System-driven execution', score: 'operator' },
      { value: 'c', text: 'I can see proof that things are working — data, results, or validation give me the push to accelerate.\n→ Data Confirmation- Data-driven execution', score: 'analyst' },
      { value: 'd', text: 'Everything feels aligned — the plan makes sense, the system is clear, and the information supports the direction.\n→ Full Alignment -Integrated structural execution', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q14', 
    text: 'I feel a project is genuinely progressing when:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'The plan is unfolding the way I mapped it — each step is happening in the right order.\n→ Plan Progress — Sequence-led execution', score: 'planner' },
      { value: 'b', text: 'The workflow or operations become smoother and more consistent over time.\n→ Process Stability — System-led execution', score: 'operator' },
      { value: 'c', text: 'The numbers, data, or measurable indicators show clear improvement.\n→ Data Progress — Analysis-led execution', score: 'analyst' },
      { value: 'd', text: 'The plan, the system, and the data all line up and reinforce each other.\n→ Structural Alignment — Integrated execution', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q15', 
    text: 'The thing that slows me down the most is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'When the priorities keep shifting or the sequence of steps isn\'t clear.\n→ Sequence Disruption — Plan-dependent execution', score: 'planner' },
      { value: 'b', text: 'When the workflow or process is unclear, inconsistent, or keeps breaking.\n→ Process Disruption — System-dependent execution', score: 'operator' },
      { value: 'c', text: 'When I don\'t have enough clarity, data, or validation to know what\'s correct.\n→ Clarity Gap — Data-dependent execution', score: 'analyst' },
      { value: 'd', text: 'When the plan, the system, and the data don\'t line up — everything feels out of sync.\n→ Structural Misalignment — Integrated execution', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q16', 
    text: 'Before I finalise or approve a project, the thing I double-check most carefully is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'That the steps make logical sense — the sequence, order, and reasoning all hold up.\n→ Step Logic Check — Sequence-driven', score: 'planner' },
      { value: 'b', text: 'That the system or workflow can actually support the work — it won\'t break once we start.\n→ System Capacity Check — Process-driven', score: 'operator' },
      { value: 'c', text: 'That the data, details, or assumptions behind the decision are accurate and validated.\n→ Data Validity Check — Analysis--driven', score: 'analyst' },
      { value: 'd', text: 'That everything fits together — the plan, the process, and the data are all aligned and consistent.\n→ Full Alignment Check — Integrated / full-architecture', score: 'ultimate' }
    ]
  }
];

// Alchemist Path Questions (Q9a-Q16a)
export const layer2AlchemistQuestions: Layer2Question[] = [
  { 
    id: 'L2_Q9a', 
    text: 'When things move fast or pressure rises, I instinctively protect:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The idea — the narrative, the vision, and what this could become.\n→ Idea Integrity — Vision-led execution', score: 'oracle' },
      { value: 'b', text: 'The quality — the emotional precision, the aesthetic, or how the work feels.\n→ Quality Precision — Expression-led execution', score: 'perfectionist' },
      { value: 'c', text: 'The people — the emotional energy, relationships, and overall vibe of the situation.\n→ People Alignment — Energy-led execution', score: 'empath' },
      { value: 'd', text: 'The entire project — the idea, the quality, and the emotional field together.\n→ Holistic Harmony — Integrated alchemist execution', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q10a', 
    text: 'When starting a major project, the first thing I create is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The story or intuitive direction — the future picture of what this could become.\n→ Vision First', score: 'oracle' },
      { value: 'b', text: 'The feel, tone, or emotional aesthetic — how it needs to look or feel.\n→ Expression First', score: 'perfectionist' },
      { value: 'c', text: 'The emotional alignment with the people involved — making sure the energy is right.\n→ Energy First', score: 'empath' },
      { value: 'd', text: 'A unified frame — the story, the expression, and the emotional tone together.\n→ Unified Creative Frame', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q11a', 
    text: 'When I\'m working in my natural rhythm, my focus naturally goes toward:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Making the idea more visionary, intuitive, or ahead of the curve.\n→ Vision Refinement', score: 'oracle' },
      { value: 'b', text: 'Perfecting the details, tone, or emotional expression until it feels right.\n→ Expression Refinement', score: 'perfectionist' },
      { value: 'c', text: 'Maintaining emotional alignment — keeping energy, relationships, or the environment steady.\n→ Energy Alignment', score: 'empath' },
      { value: 'd', text: 'Holding the idea, the quality, and the emotional tone all together in harmony.\n→ Holistic Creative Balance', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q12a', 
    text: 'When a project or task starts breaking down (delays, confusion, errors, or misalignment), my first instinct is to:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Reframe the story or intuitive direction so it feels aligned again.\n→ Narrative Reset', score: 'oracle' },
      { value: 'b', text: 'Refine the expression or quality — adjust tone, details, or aesthetics.\n→ Expression Reset', score: 'perfectionist' },
      { value: 'c', text: 'Reset the emotional energy — clear tension, reconnect people, or restore alignment.\n→ Energy Reset', score: 'empath' },
      { value: 'd', text: 'Re-harmonise everything at once — the idea, the quality, and the emotional tone.\n→ Full Harmony Reset', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q13a', 
    text: 'When I\'m trying to build momentum on a project (getting myself to start, stay focused, or speed up), I find it easiest when:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The idea feels true and exciting — it sparks a sense of possibility and purpose.\n→ Creative Spark — Vision-led momentum', score: 'oracle' },
      { value: 'b', text: 'The work looks and feels right — the details feel refined and emotionally aligned.\n→ Refined Precision — Quality-led momentum', score: 'perfectionist' },
      { value: 'c', text: 'The emotional field feels alive and connected — the people, energy, and rhythm feel attuned.\n→ Emotional Sync — People- and energy-led momentum', score: 'empath' },
      { value: 'd', text: 'All three are in sync — the idea inspires, the quality feels right, and the energy flows.\n→ Energetic Alignment — Integrated momentum', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q14a', 
    text: 'I feel a project is genuinely progressing when:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The vision feels like it\'s becoming real — the work begins to mirror the future I imagined.\n→ Vision Alignment — Progress through intuitive direction becoming tangible', score: 'oracle' },
      { value: 'b', text: 'The quality feels emotionally precise — the tone, details, and expression land exactly as they should.\n→ Aesthetic Precision — Progress through refined execution', score: 'perfectionist' },
      { value: 'c', text: 'The emotional energy is alive — people feel connected, attuned, and emotionally in sync.\n→ Emotional Field — Progress through relational and energetic coherence', score: 'empath' },
      { value: 'd', text: 'The vision, the quality, and the emotional energy all reinforce each other seamlessly.\n→ Holistic Resonance — Progress through full creative alignment', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q15a', 
    text: 'The thing that slows me down the most is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'When the vision feels unclear or not aligned — the direction stops feeling true.\n→ Vision Block — Loss of intuitive direction', score: 'oracle' },
      { value: 'b', text: 'When the expression or quality doesn\'t feel right — the tone or details are off.\n→ Expression Block — Misalignment in aesthetic or emotional precision', score: 'perfectionist' },
      { value: 'c', text: 'When the emotional energy feels tense, low, or overwhelming — the field feels off.\n→ Emotional Block — Disrupted relational or energetic flow', score: 'empath' },
      { value: 'd', text: 'When all three — the vision, the quality, and the emotional energy — are out of sync.\n→ Holistic Block — Full-system creative dissonance', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q16a', 
    text: 'Before I finalise or approve a project, the thing I double-check most carefully is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Whether the story or direction still feels emotionally true — the vision must resonate fully before I commit.\n→ Vision Anchor — Final narrative/intuition check', score: 'oracle' },
      { value: 'b', text: 'Whether the quality and expression feel complete — the tone, details, and emotional precision must land correctly.\n→ Polish Anchor — Final execution/quality check', score: 'perfectionist' },
      { value: 'c', text: 'Whether the emotional energy feels right — I sense how people (including myself) feel about moving forward.\n→ Energy Anchor — Final emotional-field check', score: 'empath' },
      { value: 'd', text: 'Whether all three — the vision, the expression, and the emotional energy — are aligned in harmony.\n→ Resonance Anchor — Full creative alignment check.', score: 'ultimate' }
    ]
  }
];

// Mixed Path Questions (Q9m–Q16m)
export const layer2MixedQuestions: Layer2Question[] = [
  {
    id: 'L2_Q9m',
    text: 'When things move fast or pressure rises, I instinctively protect:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'The clarity of the situation — the plan, the steps, or the logical framework that keeps things stable.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'The alignment of the situation — the vision, the emotional tone, or the creative spark that keeps things aligned.\n→ Intuition-led', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q10m',
    text: 'When starting a major project, the first thing I create is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'A structure — a roadmap, system, or model that gives the project shape and clarity.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'A spark — a vision, tone, or story that sets the emotional direction and meaning.\n→ Intuition-led', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q11m',
    text: 'When I\'m working in my natural rhythm, my focus naturally goes toward:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Bringing clarity — organising steps, structure, or details so things make sense.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'Maintaining alignment — shaping the vision, tone, or feeling so things stay true to the direction.\n→ Intuition-led', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q12m',
    text: 'When a project or task starts breaking down (delays, confusion, errors, or misalignment), my first instinct is to:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Fix the structure — clarify the plan, tighten the workflow, or analyse what\'s going wrong.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'Reset the energy — shift the tone, refine the story, or reconnect to what feels true.\n→ Intuition-led', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q13m',
    text: 'When I\'m trying to build momentum on a project (starting, staying focused, or speeding up), I find it easiest when:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'The structure is clear — tI know the next steps, the workflow feels organised, or the data shows I\'m moving in the right direction.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'The feeling is right — the idea clicks, the energy lifts, or the quality inspires me to move.\n→ Intuition-led', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q14m',
    text: 'I feel a project is genuinely progressing when:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'The structure is working — the steps are unfolding clearly, things are becoming more organised, or the data shows improvement.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'The alignment is working — the idea feels more real, the tone feels right, or the emotional flow is strengthening.\n→ Intuition-led', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q15m',
    text: 'The thing that slows me down the most is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'When the structure feels unclear — the steps, systems, or information don\'t make sense yet.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'When the direction feels off — the idea doesn\'t feel right, the tone feels wrong, or the emotional flow is disrupted.\n→ Intuition-led.', score: 'oracle' }
    ]
  },
  {
    id: 'L2_Q16m',
    text: 'Before I finalise or approve a project, the thing I double-check most carefully is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Whether the structure still holds — the logic, systems, processes, and information all line up clearly.\n→ Logic-led', score: 'planner' },
      { value: 'b', text: 'Whether the direction still feels right — the idea, the vision, the quality, and the emotional tone are fully aligned.\n→ Intuition-led', score: 'oracle' }
    ]
  }
];