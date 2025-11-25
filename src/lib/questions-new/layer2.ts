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
      { value: 'a', text: 'The plan — steps, sequence, priorities.', score: 'planner' },
      { value: 'b', text: 'The process — systems, routines, stable workflow.', score: 'operator' },
      { value: 'c', text: 'The proof — accuracy, data, assumptions.', score: 'analyst' },
      { value: 'd', text: 'Im unable to protect in part and must protect the entire structure — plan, systems, and proof working together.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q10', 
    text: 'When starting a major project, I first create:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'A roadmap or phased strategy.', score: 'planner' },
      { value: 'b', text: 'A repeatable workflow or operational system.', score: 'operator' },
      { value: 'c', text: 'A model, spreadsheet, or assumptions map.', score: 'analyst' },
      { value: 'd', text: 'A unified frame combining phases, systems, and data.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q11', 
    text: 'Left to my natural rhythm, I focus on:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'Getting decisions in the right order.', score: 'planner' },
      { value: 'b', text: 'Making operations smooth and predictable.', score: 'operator' },
      { value: 'c', text: 'Removing uncertainty with clarity and data.', score: 'analyst' },
      { value: 'd', text: 'Aligning strategy, systems, and data all together.', score: 'ultimate' }
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
    text: 'I gain momentum fastest when:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'The next steps are clear.', score: 'planner' },
      { value: 'b', text: 'The system starts flowing smoothly.', score: 'operator' },
      { value: 'c', text: 'The numbers confirm clarity.', score: 'analyst' },
      { value: 'd', text: 'The strategy, systems, and metrics entire structure clicks.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q14', 
    text: 'I feel the project is working when:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'The plan unfolds as intended.', score: 'planner' },
      { value: 'b', text: 'Processes become more reliable.', score: 'operator' },
      { value: 'c', text: 'The data shows real progress.', score: 'analyst' },
      { value: 'd', text: 'Plan, process, and proof are all in sync.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q15', 
    text: 'What slows me down most is:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'Shifting priorities or unclear sequencing.', score: 'planner' },
      { value: 'b', text: 'Processes that break or feel undefined.', score: 'operator' },
      { value: 'c', text: 'Lack of clarity, data, or validation.', score: 'analyst' },
      { value: 'd', text: 'Structural misalignment (plan, system, data).', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q16', 
    text: 'Before finalising something, I check:', 
    path: 'architect', 
    options: [
      { value: 'a', text: 'The logic and order of the steps.', score: 'planner' },
      { value: 'b', text: 'Whether the system can hold it.', score: 'operator' },
      { value: 'c', text: 'Whether the data and assumptions are solid.', score: 'analyst' },
      { value: 'd', text: 'Whether steps, systems, and numbers all support each other.', score: 'ultimate' }
    ]
  }
];

// Alchemist Path Questions (Q9a-Q16a)
export const layer2AlchemistQuestions: Layer2Question[] = [
  { 
    id: 'L2_Q9a', 
    text: 'Under pressure, I instinctively protect:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The idea — narrative, vision, future pattern.', score: 'oracle' },
      { value: 'b', text: 'The quality — precision, aesthetic, emotional detail.', score: 'perfectionist' },
      { value: 'c', text: 'The people — energy, emotional field, connection.', score: 'empath' },
      { value: 'd', text: 'Im unable to protect in parts and must protect the entire project  — vision, expression, and energy together.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q10a', 
    text: 'When starting something new, I first create:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'A future story or intuitive direction.', score: 'oracle' },
      { value: 'b', text: 'The feel, tone, and emotional aesthetic.', score: 'perfectionist' },
      { value: 'c', text: 'The emotional alignment with people involved.', score: 'empath' },
      { value: 'd', text: 'A unified energetic frame (story + expression + connection).', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q11a', 
    text: 'Left to my natural rhythm, I focus on:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Making the idea more visionary or ahead of the curve.', score: 'oracle' },
      { value: 'b', text: 'Perfecting the details until they feel right.', score: 'perfectionist' },
      { value: 'c', text: 'Keeping emotional alignment strong.', score: 'empath' },
      { value: 'd', text: 'Holding vision, polish, and emotional field all together.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q12a', 
    text: 'When something isn’t working, I:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Reframe the narrative.', score: 'oracle' },
      { value: 'b', text: 'Refine the expression or details.', score: 'perfectionist' },
      { value: 'c', text: 'Reset the emotional energy or dynamic.', score: 'empath' },
      { value: 'd', text: 'Re-harmonise narrative, expression, and emotional tone simultaneously.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q13a', 
    text: 'I gain momentum fastest when:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The idea feels true and exciting.', score: 'oracle' },
      { value: 'b', text: 'The work looks and feels right at a deep level.', score: 'perfectionist' },
      { value: 'c', text: 'The emotional field feels alive and aligned.', score: 'empath' },
      { value: 'd', text: 'All three — idea, precision, energy — all reinforce each other.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q14a', 
    text: 'I feel the project is working when:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'The outer world matches the future I see.', score: 'oracle' },
      { value: 'b', text: 'The quality feels emotionally precise.', score: 'perfectionist' },
      { value: 'c', text: 'The people feel truly aligned.', score: 'empath' },
      { value: 'd', text: 'Future vision, execution, and energy all align.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q15a', 
    text: 'What slows me down the most is:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'When the vision feels off or unclear.', score: 'oracle' },
      { value: 'b', text: 'When the expression isn’t right yet.', score: 'perfectionist' },
      { value: 'c', text: 'When the emotional energy feels tense or low.', score: 'empath' },
      { value: 'd', text: 'Misalignment, when vision, quality, and energy all don’t sync.', score: 'ultimate' }
    ]
  },
  { 
    id: 'L2_Q16a', 
    text: 'Before committing or launching, I check:', 
    path: 'alchemist', 
    options: [
      { value: 'a', text: 'Whether the story and vision still feels true.', score: 'oracle' },
      { value: 'b', text: 'Whether it feels polished and aligned.', score: 'perfectionist' },
      { value: 'c', text: 'Whether the messaging feels alive.', score: 'empath' },
      { value: 'd', text: 'Whether story, quality, and energy is all perfectly anchored.', score: 'ultimate' }
    ]
  }
];

// Mixed Path Questions (Q9m–Q16m)
export const layer2MixedQuestions: Layer2Question[] = [
  {
    id: 'L2_Q9m',
    text: 'Under pressure, I instinctively protect:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'I protect the plan: steps, sequence, priorities.', score: 'planner' },
      { value: 'b', text: 'I protect the idea: story, vision, future direction.', score: 'oracle' },
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
    text: 'When starting something new, I first create:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'A roadmap or phased strategy.', score: 'planner' },
      { value: 'b', text: 'A story, intuitive direction, or future concept.', score: 'oracle' },
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
    text: 'Left to my natural rhythm, I focus on:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'I focus on decisions in the right order.', score: 'planner' },
      { value: 'b', text: 'I focus on making the idea more visionary.', score: 'oracle' },
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
    text: 'When something isn’t working, I:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'I re-sequence the strategy.', score: 'planner' },
      { value: 'b', text: 'I reframe the narrative.', score: 'oracle' },
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
    text: 'I gain momentum fastest when:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Clear next steps give me momentum.', score: 'planner' },
      { value: 'b', text: 'A true and exciting idea gives me momentum.', score: 'oracle' },
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
    text: 'I feel the project is working when:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'When the plan unfolds smoothly.', score: 'planner' },
      { value: 'b', text: 'When the outer world matches my vision.', score: 'oracle' },
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
    text: 'What slows me down the most is:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'Shifting priorities or unclear sequencing slows me down.', score: 'planner' },
      { value: 'b', text: 'Vision feeling off or unclear slows me down.', score: 'oracle' },
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
    text: 'Before committing or launching, I check:',
    path: 'mixed',
    options: [
      { value: 'a', text: 'I check if the steps make logical sense.', score: 'planner' },
      { value: 'b', text: 'I check if the story still feels true.', score: 'oracle' },
      { value: 'c', text: 'I check if the system can hold it.', score: 'operator' },
      { value: 'd', text: 'I check if the quality feels aligned.', score: 'perfectionist' },
      { value: 'e', text: 'I check if the data and assumptions are solid.', score: 'analyst' },
      { value: 'f', text: 'I check if the emotional tone feels right.', score: 'empath' },
      { value: 'g', text: 'I check if structure is aligned end-to-end.', score: 'architect_ultimate' },
      { value: 'h', text: 'I check if story + quality + energy anchor together.', score: 'alchemist_ultimate' },
    ],
  },
];

// /**
//  * Layer 2: Execution Style Subtype
//  * Has 3 different question sets based on Layer 1 result
//  */

// export interface Layer2Question {
//   id: string;
//   text: string;
//   path: 'architect' | 'alchemist' | 'mixed';
//   options: {
//     value: 'a' | 'b' | 'c' | 'd';
//     text: string;
//     score: string;
//   }[];
// }

// // Architect Path Questions (Q9-Q16)
// export const layer2ArchitectQuestions: Layer2Question[] = [
//   { id: 'L2_Q9', text: 'When things move fast or pressure rises, I instinctively protect:', path: 'architect', options: [
//     { value: 'a', text: 'The plan — steps, sequence, priorities.', score: 'planner' },
//     { value: 'b', text: 'The process — systems, routines, stable workflow.', score: 'operator' },
//     { value: 'c', text: 'The proof — accuracy, data, assumptions.', score: 'analyst' },
//     { value: 'd', text: 'Im unable to protect in parts and most protect the entire structure — plan, systems, and proof working together.', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q10', text: 'When starting a major project, I first create:', path: 'architect', options: [
//     { value: 'a', text: 'A roadmap or phased strategy.', score: 'planner' },
//     { value: 'b', text: 'A repeatable workflow or operational system.', score: 'operator' },
//     { value: 'c', text: 'A model, spreadsheet, or assumptions map.', score: 'analyst' },
//     { value: 'd', text: 'A unified frame combining phases, systems, and data.', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q11', text: 'Left to my natural rhythm, I focus on:', path: 'architect', options: [
//     { value: 'a', text: 'Getting decisions in the right order.', score: 'planner' },
//     { value: 'b', text: 'Making operations smooth and predictable.', score: 'operator' },
//     { value: 'c', text: 'Removing uncertainty with clarity and data.', score: 'analyst' },
//     { value: 'd', text: 'Aligning strategy, systems, and data all together.', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q12', text: 'When something isn\'t working, I first:', path: 'architect', options: [
//     { value: 'a', text: 'Zoom out and re-sequence the strategy.', score: 'planner' },
//     { value: 'b', text: 'Redesign or tighten the process.', score: 'operator' },
//     { value: 'c', text: 'Analyse variables and test alternatives.', score: 'analyst' },
//     { value: 'd', text: 'Re-align plan, process, and proof simultaneously.', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q13', text: 'I gain momentum fastest when:', path: 'architect', options: [
//     { value: 'a', text: 'The next steps are clear.', score: 'planner' },
//     { value: 'b', text: 'The system starts flowing smoothly.', score: 'operator' },
//     { value: 'c', text: 'The numbers confirm clarity.', score: 'analyst' },
//     { value: 'd', text: 'The strategy, systems, and metrics entire structure clicks.', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q14', text: 'I feel the project is working when:', path: 'architect', options: [
//     { value: 'a', text: 'The plan unfolds as intended.', score: 'planner' },
//     { value: 'b', text: 'Processes become more reliable.', score: 'operator' },
//     { value: 'c', text: 'The data shows real progress.', score: 'analyst' },
//     { value: 'd', text: 'Plan, process, and proof are all in sync.', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q15', text: 'What slows me down most is:', path: 'architect', options: [
//     { value: 'a', text: 'Shifting priorities or unclear sequencing.', score: 'planner' },
//     { value: 'b', text: 'Processes that break or feel undefined.', score: 'operator' },
//     { value: 'c', text: 'Lack of clarity, data, or validation.', score: 'analyst' },
//     { value: 'd', text: 'Structural misalignment (plan, system, data).', score: 'ultimate' }
//   ]},
//   { id: 'L2_Q16', text: 'Before finalising something, I check:', path: 'architect', options: [
//     { value: 'a', text: 'The logic and order of the steps.', score: 'planner' },
//     { value: 'b', text: 'Whether the system can hold it.', score: 'operator' },
//     { value: 'c', text: 'Whether the data and assumptions are solid.', score: 'analyst' },
//     { value: 'd', text: 'Whether steps, systems, and numbers all support each other.', score: 'ultimate' }
//   ]}
// ];

// // Alchemist Path Questions (Q9a-Q16a)
// export const layer2AlchemistQuestions: Layer2Question[] = [
//   { 
//     id: 'L2_Q9a', 
//     text: 'Under pressure, I instinctively protect:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'The idea — narrative, vision, future pattern.', score: 'oracle' },
//       { value: 'b', text: 'The quality — precision, aesthetic, emotional detail.', score: 'perfectionist' },
//       { value: 'c', text: 'The people — energy, emotional field, connection.', score: 'empath' },
//       { value: 'd', text: 'Im unable to protect in parts and most protect the entire project  — vision, expression, and energy together.', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q10a', 
//     text: 'When starting something new, I first create:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'A future story or intuitive direction.', score: 'oracle' },
//       { value: 'b', text: 'The feel, tone, and emotional aesthetic.', score: 'perfectionist' },
//       { value: 'c', text: 'The emotional alignment with people involved.', score: 'empath' },
//       { value: 'd', text: 'A unified energetic frame (story + expression + connection).', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q11a', 
//     text: 'Left to my natural rhythm, I focus on:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'Making the idea more visionary or ahead of the curve.', score: 'oracle' },
//       { value: 'b', text: 'Perfecting the details until they feel right. ', score: 'perfectionist' },
//       { value: 'c', text: 'Keeping emotional alignment strong. ', score: 'empath' },
//       { value: 'd', text: 'Holding vision, polish, and emotional field all together.', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q12a', 
//     text: 'When something isn’t working, I:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'Reframe the narrative.', score: 'oracle' },
//       { value: 'b', text: 'Refine the expression or details.', score: 'perfectionist' },
//       { value: 'c', text: 'Reset the emotional energy or dynamic.', score: 'empath' },
//       { value: 'd', text: 'Re-harmonise narrative, expression, and emotional tone simultaneously.', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q13a', 
//     text: 'I gain momentum fastest when:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'The idea feels true and exciting. ', score: 'oracle' },
//       { value: 'b', text: 'The work looks and feels right at a deep level. ', score: 'perfectionist' },
//       { value: 'c', text: 'The emotional field feels alive and aligned. ', score: 'empath' },
//       { value: 'd', text: 'All three — idea, precision, energy — all reinforce each other. ', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q14a', 
//     text: 'I feel the project is working when:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'The outer world matches the future I see. ', score: 'oracle' },
//       { value: 'b', text: 'The quality feels emotionally precise. ', score: 'perfectionist' },
//       { value: 'c', text: 'The people feel truly aligned. ', score: 'empath' },
//       { value: 'd', text: 'Future vision, execution, and energy all align. ', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q15a', 
//     text: 'What slows me down the most is:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'When the vision feels off or unclear.  ', score: 'oracle' },
//       { value: 'b', text: 'When the expression isn’t right yet.', score: 'perfectionist' },
//       { value: 'c', text: 'When the emotional energy feels tense or low.', score: 'empath' },
//       { value: 'd', text: 'Misalignment, when vision, quality, and energy all don’t sync. ', score: 'ultimate' }
//     ]
//   },
//   { 
//     id: 'L2_Q16a', 
//     text: 'Before committing or launching, I check:', 
//     path: 'alchemist', 
//     options: [
//       { value: 'a', text: 'Whether the story and vision still feels true. ', score: 'oracle' },
//       { value: 'b', text: 'Whether it feels polished and aligned. ', score: 'perfectionist' },
//       { value: 'c', text: 'Whether the messaging feels alive. ', score: 'empath' },
//       { value: 'd', text: 'Whether story, quality, and energy is all perfectly anchored. ', score: 'ultimate' }
//     ]
//   }
// ];
// // Mixed Path - simplified version for now
// export const layer2MixedQuestions: Layer2Question[] = layer2ArchitectQuestions.map(q => ({
//   ...q,
//   id: q.id.replace('Q', 'Qm'),
//   path: 'mixed' as const
// }));
