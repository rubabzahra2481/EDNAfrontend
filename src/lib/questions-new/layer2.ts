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
      { value: 'a', text: 'The plan — the steps, sequence, and priorities.', score: 'planner' },
      { value: 'b', text: 'The process — the systems, routines, and operational flow.', score: 'operator' },
      { value: 'c', text: 'The proof — the accuracy, data, and assumptions.', score: 'analyst' },
      { value: 'd', text: 'The whole structure — I try to protect the plan, the system, and the data all at once.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q10', 
    text: 'When starting a major project, the first thing I create is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'A roadmap or phased strategy.', score: 'planner' },
      { value: 'b', text: 'A repeatable workflow or operational system.', score: 'operator' },
      { value: 'c', text: 'A model, spreadsheet, or assumptions map.', score: 'analyst' },
      { value: 'd', text: 'A unified frame that combines phases, systems, and key data.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q11', 
    text: 'When I\'m working in my natural rhythm, my focus naturally goes toward:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'Putting decisions in the right order and mapping the sequence clearly.', score: 'planner' },
      { value: 'b', text: 'Making the workflow smooth, predictable, and efficient.', score: 'operator' },
      { value: 'c', text: 'Reducing uncertainty by analysing details, data, and assumptions.', score: 'analyst' },
      { value: 'd', text: 'Keeping the strategy, systems, and data aligned at the same time.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q12', 
    text: 'When something isn\'t working, I first:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'Zoom out and re-sequence the strategy.', score: 'planner' },
      { value: 'b', text: 'Redesign or tighten the process.', score: 'operator' },
      { value: 'c', text: 'Analyse variables and test alternatives.', score: 'analyst' },
      { value: 'd', text: 'Re-align plan, process, and proof simultaneously.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q13', 
    text: 'When I\'m trying to build momentum on a project (getting myself to start, stay focused, or speed up), I find it easiest when:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'I know the exact next steps — a clear sequence makes it natural for me to move forward.', score: 'planner' },
      { value: 'b', text: 'The workflow or routine is already set up — once the system feels smooth, I move quickly.', score: 'operator' },
      { value: 'c', text: 'I can see proof that things are working — data, results, or validation give me the push to accelerate.', score: 'analyst' },
      { value: 'd', text: 'Everything feels aligned — the plan makes sense, the system is clear, and the information supports the direction.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q14', 
    text: 'I feel a project is genuinely progressing when:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'The plan is unfolding the way I mapped it — each step is happening in the right order.', score: 'planner' },
      { value: 'b', text: 'The workflow or operations become smoother and more consistent over time.', score: 'operator' },
      { value: 'c', text: 'The numbers, data, or measurable indicators show clear improvement.', score: 'analyst' },
      { value: 'd', text: 'The plan, the system, and the data all line up and reinforce each other.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q15', 
    text: 'The thing that slows me down the most is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'When the priorities keep shifting or the sequence of steps isn\'t clear.', score: 'planner' },
      { value: 'b', text: 'When the workflow or process is unclear, inconsistent, or keeps breaking.', score: 'operator' },
      { value: 'c', text: 'When I don\'t have enough clarity, data, or validation to know what\'s correct.', score: 'analyst' },
      { value: 'd', text: 'When the plan, the system, and the data don\'t line up — everything feels out of sync.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q16', 
    text: 'Before I finalise or approve a project, the thing I double-check most carefully is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'That the steps make logical sense — the sequence, order, and reasoning all hold up.', score: 'planner' },
      { value: 'b', text: 'That the system or workflow can actually support the work — it won\'t break once we start.', score: 'operator' },
      { value: 'c', text: 'That the data, details, or assumptions behind the decision are accurate and validated.', score: 'analyst' },
      { value: 'd', text: 'That everything fits together — the plan, the process, and the data are all aligned and consistent.', score: 'ultimate' }
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
      { value: 'a', text: 'The idea — the narrative, the vision, and what this could become.', score: 'oracle' },
      { value: 'b', text: 'The quality — the emotional precision, the aesthetic, or how the work feels.', score: 'perfectionist' },
      { value: 'c', text: 'The people — the emotional energy, relationships, and overall vibe of the situation.', score: 'empath' },
      { value: 'd', text: 'The entire project — the idea, the quality, and the emotional field together.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q10a', 
    text: 'When starting a major project, the first thing I create is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The story or intuitive direction — the future picture of what this could become.', score: 'oracle' },
      { value: 'b', text: 'The feel, tone, or emotional aesthetic — how it needs to look or feel.', score: 'perfectionist' },
      { value: 'c', text: 'The emotional alignment with the people involved — making sure the energy is right.', score: 'empath' },
      { value: 'd', text: 'A unified frame — the story, the expression, and the emotional tone together.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q11a', 
    text: 'When I\'m working in my natural rhythm, my focus naturally goes toward:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Making the idea more visionary, intuitive, or ahead of the curve.', score: 'oracle' },
      { value: 'b', text: 'Perfecting the details, tone, or emotional expression until it feels right.', score: 'perfectionist' },
      { value: 'c', text: 'Maintaining emotional alignment — keeping energy, relationships, or the environment steady.', score: 'empath' },
      { value: 'd', text: 'Holding the idea, the quality, and the emotional tone all together in harmony.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q12a', 
    text: 'When a project or task starts breaking down (delays, confusion, errors, or misalignment), my first instinct is to:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Reframe the story or intuitive direction so it feels aligned again.', score: 'oracle' },
      { value: 'b', text: 'Refine the expression or quality — adjust tone, details, or aesthetics.', score: 'perfectionist' },
      { value: 'c', text: 'Reset the emotional energy — clear tension, reconnect people, or restore alignment.', score: 'empath' },
      { value: 'd', text: 'Re-harmonise everything at once — the idea, the quality, and the emotional tone.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q13a', 
    text: 'When I\'m trying to build momentum on a project (getting myself to start, stay focused, or speed up), I find it easiest when:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The idea feels true and exciting — it sparks a sense of possibility and purpose.', score: 'oracle' },
      { value: 'b', text: 'The work looks and feels right — the details feel refined and emotionally aligned.', score: 'perfectionist' },
      { value: 'c', text: 'The emotional field feels alive and connected — the people, energy, and rhythm feel attuned.', score: 'empath' },
      { value: 'd', text: 'All three are in sync — the idea inspires, the quality feels right, and the energy flows.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q14a', 
    text: 'I feel a project is genuinely progressing when:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The vision feels like it\'s becoming real — the work begins to mirror the future I imagined.', score: 'oracle' },
      { value: 'b', text: 'The quality feels emotionally precise — the tone, details, and expression land exactly as they should.', score: 'perfectionist' },
      { value: 'c', text: 'The emotional energy is alive — people feel connected, attuned, and emotionally in sync.', score: 'empath' },
      { value: 'd', text: 'The vision, the quality, and the emotional energy all reinforce each other seamlessly.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q15a', 
    text: 'The thing that slows me down the most is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'When the vision feels unclear or not aligned — the direction stops feeling true.', score: 'oracle' },
      { value: 'b', text: 'When the expression or quality doesn\'t feel right — the tone or details are off.', score: 'perfectionist' },
      { value: 'c', text: 'When the emotional energy feels tense, low, or overwhelming — the field feels off.', score: 'empath' },
      { value: 'd', text: 'When all three — the vision, the quality, and the emotional energy — are out of sync.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q16a', 
    text: 'Before I finalise or approve a project, the thing I double-check most carefully is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Whether the story or direction still feels emotionally true — the vision must resonate fully before I commit.', score: 'oracle' },
      { value: 'b', text: 'Whether the quality and expression feel complete — the tone, details, and emotional precision must land correctly.', score: 'perfectionist' },
      { value: 'c', text: 'Whether the emotional energy feels right — I sense how people (including myself) feel about moving forward.', score: 'empath' },
      { value: 'd', text: 'Whether all three — the vision, the expression, and the emotional energy — are aligned in harmony.', score: 'ultimate' }
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
      { value: 'a', text: 'The clarity of the situation — the plan, the steps, or the logical framework that keeps things stable.', score: 'planner' },
      { value: 'b', text: 'The alignment of the situation — the vision, the emotional tone, or the creative spark that keeps things aligned.', score: 'oracle' },
      { value: 'c', text: 'I protect the process: systems, routines, stability.', score: 'operator' },
      { value: 'd', text: 'I protect the quality: details, aesthetic, emotional precision.', score: 'perfectionist' },
      { value: 'e', text: 'I protect clarity: data, assumptions, structure.', score: 'analyst' },
      { value: 'f', text: 'I protect people: emotional tone, relationships, energy.', score: 'empath' },
      { value: 'g', text: 'I protect the whole structure (plan + systems + data).', score: 'architect_ultimate' },
      { value: 'h', text: 'I protect the whole project (vision + quality + energy).', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q10m',
    text: 'When starting a major project, the first thing I create is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'A structure — a roadmap, system, or model that gives the project shape and clarity.', score: 'planner' },
      { value: 'b', text: 'A spark — a vision, tone, or story that sets the emotional direction and meaning.', score: 'oracle' },
      { value: 'c', text: 'A workflow or operational process.', score: 'operator' },
      { value: 'd', text: 'The feel, tone, or aesthetic expression.', score: 'perfectionist' },
      { value: 'e', text: 'A model, spreadsheet, or clarity map.', score: 'analyst' },
      { value: 'f', text: 'Emotional alignment with people involved.', score: 'empath' },
      { value: 'g', text: 'A unified structure of phases + systems + data.', score: 'architect_ultimate' },
      { value: 'h', text: 'A unified energetic frame (story + expression + tone).', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q11m',
    text: 'When I\'m working in my natural rhythm, my focus naturally goes toward:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Bringing clarity — organising steps, structure, or details so things make sense.', score: 'planner' },
      { value: 'b', text: 'Maintaining alignment — shaping the vision, tone, or feeling so things stay true to the direction.', score: 'oracle' },
      { value: 'c', text: 'I make operations smooth and predictable.', score: 'operator' },
      { value: 'd', text: 'I refine details until they feel perfectly aligned.', score: 'perfectionist' },
      { value: 'e', text: 'I remove uncertainty with clarity and data.', score: 'analyst' },
      { value: 'f', text: 'I maintain emotional alignment in the group.', score: 'empath' },
      { value: 'g', text: 'I synchronise strategy + systems + data.', score: 'architect_ultimate' },
      { value: 'h', text: 'I synchronise vision + expression + energy.', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q12m',
    text: 'When a project or task starts breaking down (delays, confusion, errors, or misalignment), my first instinct is to:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Fix the structure — clarify the plan, tighten the workflow, or analyse what\'s going wrong.', score: 'planner' },
      { value: 'b', text: 'Reset the energy — shift the tone, refine the story, or reconnect to what feels true.', score: 'oracle' },
      { value: 'c', text: 'I redesign or tighten the process.', score: 'operator' },
      { value: 'd', text: 'I refine the expression or details.', score: 'perfectionist' },
      { value: 'e', text: 'I analyse variables and test alternatives.', score: 'analyst' },
      { value: 'f', text: 'I reset the emotional energy or dynamic.', score: 'empath' },
      { value: 'g', text: 'I realign plan + process + proof.', score: 'architect_ultimate' },
      { value: 'h', text: 'I re-harmonise narrative + expression + energy.', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q13m',
    text: 'When I\'m trying to build momentum on a project (starting, staying focused, or speeding up), I find it easiest when:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'The structure is clear — I know the next steps, the workflow feels organised, or the data shows I\'m moving in the right direction.', score: 'planner' },
      { value: 'b', text: 'The feeling is right — the idea clicks, the energy lifts, or the quality inspires me to move.', score: 'oracle' },
      { value: 'c', text: 'A smooth-running system energises me.', score: 'operator' },
      { value: 'd', text: 'When the quality feels right, momentum returns.', score: 'perfectionist' },
      { value: 'e', text: 'Data confirming clarity drives me forward.', score: 'analyst' },
      { value: 'f', text: 'An aligned emotional field lifts my energy.', score: 'empath' },
      { value: 'g', text: 'When structure (plan + system + metrics) clicks.', score: 'architect_ultimate' },
      { value: 'h', text: 'When idea + quality + energy reinforce each other.', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q14m',
    text: 'I feel a project is genuinely progressing when:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'The structure is working — the steps are unfolding clearly, things are becoming more organised, or the data shows improvement.', score: 'planner' },
      { value: 'b', text: 'The alignment is working — the idea feels more real, the tone feels right, or the emotional flow is strengthening.', score: 'oracle' },
      { value: 'c', text: 'When operations become stable and reliable.', score: 'operator' },
      { value: 'd', text: 'When the quality feels emotionally precise.', score: 'perfectionist' },
      { value: 'e', text: 'When data shows measurable progress.', score: 'analyst' },
      { value: 'f', text: 'When the people involved feel aligned.', score: 'empath' },
      { value: 'g', text: 'When plan + process + proof are in sync.', score: 'architect_ultimate' },
      { value: 'h', text: 'When vision + expression + energy align perfectly.', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q15m',
    text: 'The thing that slows me down the most is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'When the structure feels unclear — the steps, systems, or information don\'t make sense yet.', score: 'planner' },
      { value: 'b', text: 'When the direction feels off — the idea doesn\'t feel right, the tone feels wrong, or the emotional flow is disrupted.', score: 'oracle' },
      { value: 'c', text: 'Broken or undefined processes slow me down.', score: 'operator' },
      { value: 'd', text: 'Aesthetic or emotional misalignment slows me down.', score: 'perfectionist' },
      { value: 'e', text: 'Lack of clarity, data, or validation slows me down.', score: 'analyst' },
      { value: 'f', text: 'Low emotional energy or tension slows me down.', score: 'empath' },
      { value: 'g', text: 'Structural misalignment slows me down.', score: 'architect_ultimate' },
      { value: 'h', text: 'Misalignment of vision + quality + energy slows me down.', score: 'alchemist_ultimate' },
    ],
  },
  {
    id: 'L2_Q16m',
    text: 'Before I finalise or approve a project, the thing I double-check most carefully is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Whether the structure still holds — the logic, systems, processes, and information all line up clearly.', score: 'planner' },
      { value: 'b', text: 'Whether the direction still feels right — the idea, the vision, the quality, and the emotional tone are fully aligned.', score: 'oracle' },
      { value: 'c', text: 'I check if the system can hold it.', score: 'operator' },
      { value: 'd', text: 'I check if the quality feels aligned.', score: 'perfectionist' },
      { value: 'e', text: 'I check if the data and assumptions are solid.', score: 'analyst' },
      { value: 'f', text: 'I check if the emotional tone feels right.', score: 'empath' },
      { value: 'g', text: 'I check if structure is aligned end-to-end.', score: 'architect_ultimate' },
      { value: 'h', text: 'I check if story + quality + energy anchor together.', score: 'alchemist_ultimate' },
    ],
  },
];