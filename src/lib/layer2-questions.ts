/**
 * Layer 2: Subtype Refinement Questions
 * 
 * These questions are shown conditionally based on Layer 1 results:
 * - If core_type = 'architect', show architect subtype questions
 * - If core_type = 'alchemist', show alchemist subtype questions
 * - If core_type = 'blurred', these are skipped or use different logic
 * 
 * Each option is tagged with the subtype it represents
 */

export interface Layer2Question {
  id: string;
  layer: number;
  question: string;
  context?: string;
  applicable_to: 'architect' | 'alchemist' | 'both';
  options: {
    text: string;
    value: string;
    subtype: string; // The subtype this option maps to
  }[];
}

// ARCHITECT SUBTYPE QUESTIONS
export const architectSubtypeQuestions: Layer2Question[] = [
  {
    id: 'L2_ARCH_Q1',
    layer: 2,
    question: 'Which description best matches your typical approach to planning a major project?',
    applicable_to: 'architect',
    options: [
      { 
        text: 'I envision long-term goals and design a scalable framework, delegating tasks to others (Master Strategist)', 
        value: 'A',
        subtype: 'master_strategist'
      },
      { 
        text: 'I create a detailed step-by-step plan and prefer to execute tasks hands-on (Systemised Builder)', 
        value: 'B',
        subtype: 'systemised_builder'
      },
      { 
        text: 'I verify every logical detail before proceeding (Internal Analyzer)', 
        value: 'C',
        subtype: 'internal_analyser'
      },
      { 
        text: 'I adjust and iterate in real-time to keep things on track (Ultimate Strategist)', 
        value: 'D',
        subtype: 'ultimate_architect'
      }
    ]
  },
  {
    id: 'L2_ARCH_Q2',
    layer: 2,
    question: 'When under tight deadlines, which of the following behaviors do you most identify with?',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Remaining calm, holding stillness, and adapting the plan on the fly without panicking (Ultimate Strategist)', 
        value: 'A',
        subtype: 'ultimate_architect'
      },
      { 
        text: 'Pulling back to rethink the strategy quietly (Master Strategist)', 
        value: 'B',
        subtype: 'master_strategist'
      },
      { 
        text: 'Overworking in silence, becoming hyper-controlling and taking on all tasks myself (Systemised Builder)', 
        value: 'C',
        subtype: 'systemised_builder'
      },
      { 
        text: 'Spiraling in analysis loops and avoiding decisions (Internal Analyzer)', 
        value: 'D',
        subtype: 'internal_analyser'
      }
    ]
  },
  {
    id: 'L2_ARCH_Q3',
    layer: 2,
    question: 'Which statement best aligns with your work style in solving complex problems?',
    applicable_to: 'architect',
    options: [
      { 
        text: '"I reverse-engineer the desired outcome conceptually before starting." (Master Strategist)', 
        value: 'A',
        subtype: 'master_strategist'
      },
      { 
        text: '"I map out all underlying rules and logic before taking action." (Internal Analyzer)', 
        value: 'B',
        subtype: 'internal_analyser'
      },
      { 
        text: '"I follow defined instructions and concrete steps to reach the goal." (Systemised Builder)', 
        value: 'C',
        subtype: 'systemised_builder'
      },
      { 
        text: '"I simplify the problem by removing noise and focusing on essentials." (Ultimate Strategist)', 
        value: 'D',
        subtype: 'ultimate_architect'
      }
    ]
  },
  {
    id: 'L2_ARCH_Q4',
    layer: 2,
    question: 'Which of the following statements resonates most with your execution method?',
    applicable_to: 'architect',
    options: [
      { 
        text: 'I direct others, delegate tasks, and then provide oversight (Master Strategist)', 
        value: 'A',
        subtype: 'master_strategist'
      },
      { 
        text: 'I personally handle tasks and prefer tight control over execution (Systemised Builder)', 
        value: 'B',
        subtype: 'systemised_builder'
      },
      { 
        text: 'I only act when my logical analysis feels completely certain (Internal Analyzer)', 
        value: 'C',
        subtype: 'internal_analyser'
      },
      { 
        text: 'I execute through small adjustments while keeping a clear overarching goal (Ultimate Strategist)', 
        value: 'D',
        subtype: 'ultimate_architect'
      }
    ]
  },
  {
    id: 'L2_ARCH_Q5',
    layer: 2,
    question: 'Which emotional response to work stress sounds most like you?',
    applicable_to: 'architect',
    options: [
      { 
        text: 'I suppress my emotions and avoid them until I may become overwhelmed (Systemised Builder)', 
        value: 'A',
        subtype: 'systemised_builder'
      },
      { 
        text: 'I try to reframe or ignore emotions and rework the plan (Master Strategist)', 
        value: 'B',
        subtype: 'master_strategist'
      },
      { 
        text: 'I intellectualize my feelings and rarely show them outwardly (Internal Analyzer)', 
        value: 'C',
        subtype: 'internal_analyser'
      },
      { 
        text: 'I acknowledge emotions but maintain logical perspective, treating them as data (Ultimate Strategist)', 
        value: 'D',
        subtype: 'ultimate_architect'
      }
    ]
  },
  {
    id: 'L2_ARCH_Q6',
    layer: 2,
    question: 'Which characteristic best reflects a weakness that you can relate with?',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Overanalyzing and stalling projects because every detail must be logically perfect (Internal Analyzer)', 
        value: 'A',
        subtype: 'internal_analyser'
      },
      { 
        text: 'Becoming overly controlling and micromanaging due to a fear of mistakes (Systemised Builder)', 
        value: 'B',
        subtype: 'systemised_builder'
      },
      { 
        text: 'Sometimes losing touch with large-scale vision by focusing only on details (Master Strategist)', 
        value: 'C',
        subtype: 'master_strategist'
      },
      { 
        text: 'May over-optimize processes and risk losing sight of team morale (Ultimate Strategist)', 
        value: 'D',
        subtype: 'ultimate_architect'
      }
    ]
  }
];

// ALCHEMIST SUBTYPE QUESTIONS
export const alchemistSubtypeQuestions: Layer2Question[] = [
  {
    id: 'L2_ALC_Q7',
    layer: 2,
    question: 'Which description best matches your typical creative process?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'I have rapid bursts of intuitive ideas and may struggle with follow-through (The Visionary Oracle)', 
        value: 'A',
        subtype: 'visionary_oracle'
      },
      { 
        text: 'I steadily refine ideas and feel that everything must align emotionally before moving forward (The Magnetic Perfectionist)', 
        value: 'B',
        subtype: 'magnetic_perfectionist'
      },
      { 
        text: 'I move in waves of emotional energy and deeply tune into others\' feelings (The Energetic Empath)', 
        value: 'C',
        subtype: 'energetic_empath'
      },
      { 
        text: 'I balance intuition with clear structure and emotional clarity (The Ultimate Alchemist)', 
        value: 'D',
        subtype: 'ultimate_alchemist'
      }
    ]
  },
  {
    id: 'L2_ALC_Q8',
    layer: 2,
    question: 'Which scenario most describes how you work under pressure on a project?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'I burn out creatively or completely reboot the idea when stressed (Visionary Oracle)', 
        value: 'A',
        subtype: 'visionary_oracle'
      },
      { 
        text: 'I spiral into obsessive tweaking and lose momentum (Magnetic Perfectionist)', 
        value: 'B',
        subtype: 'magnetic_perfectionist'
      },
      { 
        text: 'I absorb too much from others and may withdraw or vanish (Energetic Empath)', 
        value: 'C',
        subtype: 'energetic_empath'
      },
      { 
        text: 'I pause to recalibrate and protect the team\'s emotional field (Ultimate Alchemist)', 
        value: 'D',
        subtype: 'ultimate_alchemist'
      }
    ]
  },
  {
    id: 'L2_ALC_Q9',
    layer: 2,
    question: 'Which statement best reflects your approach to finishing a project?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'I often redesign the plan from scratch whenever I feel my energy drop (Visionary Oracle)', 
        value: 'A',
        subtype: 'visionary_oracle'
      },
      { 
        text: 'I refuse to release it until it feels exactly right on every level (Magnetic Perfectionist)', 
        value: 'B',
        subtype: 'magnetic_perfectionist'
      },
      { 
        text: 'I follow the emotional tone of the group even if it means inconsistency (Energetic Empath)', 
        value: 'C',
        subtype: 'energetic_empath'
      },
      { 
        text: 'I integrate feedback quickly, aligning intuition with practical steps (Ultimate Alchemist)', 
        value: 'D',
        subtype: 'ultimate_alchemist'
      }
    ]
  },
  {
    id: 'L2_ALC_Q10',
    layer: 2,
    question: 'If you find an idea has a serious flaw, which response matches you?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'I have a flood of new intuitive ideas and start over creatively (Visionary Oracle)', 
        value: 'A',
        subtype: 'visionary_oracle'
      },
      { 
        text: 'I refine and tweak details internally until it feels energetically aligned (Magnetic Perfectionist)', 
        value: 'B',
        subtype: 'magnetic_perfectionist'
      },
      { 
        text: 'I absorb the emotional weight and may become exhausted or pause (Energetic Empath)', 
        value: 'C',
        subtype: 'energetic_empath'
      },
      { 
        text: 'I analyze the emotional impact and recalibrate with clear structure (Ultimate Alchemist)', 
        value: 'D',
        subtype: 'ultimate_alchemist'
      }
    ]
  },
  {
    id: 'L2_ALC_Q11',
    layer: 2,
    question: 'Which statement best describes your focus during execution?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Hyper-creative and nonlinear bursts of work (Visionary Oracle)', 
        value: 'A',
        subtype: 'visionary_oracle'
      },
      { 
        text: 'Energy-focused sequencing toward an ideal outcome (Magnetic Perfectionist)', 
        value: 'B',
        subtype: 'magnetic_perfectionist'
      },
      { 
        text: 'Emotionally influenced and sometimes inconsistent delivery (Energetic Empath)', 
        value: 'C',
        subtype: 'energetic_empath'
      },
      { 
        text: 'Fast yet refined output balancing intuition with precision (Ultimate Alchemist)', 
        value: 'D',
        subtype: 'ultimate_alchemist'
      }
    ]
  },
  {
    id: 'L2_ALC_Q12',
    layer: 2,
    question: 'Which trait best represents a blind spot that you can relate with?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'I may never launch because I\'m refining endlessly (Magnetic Perfectionist)', 
        value: 'A',
        subtype: 'magnetic_perfectionist'
      },
      { 
        text: 'I often get overwhelmed mid-journey and feel the need to reimagine everything (Visionary Oracle)', 
        value: 'B',
        subtype: 'visionary_oracle'
      },
      { 
        text: 'I risk burnout by over-giving without enough boundaries (Energetic Empath)', 
        value: 'C',
        subtype: 'energetic_empath'
      },
      { 
        text: 'I might over-hold energy and burn out if I don\'t delegate (Ultimate Alchemist)', 
        value: 'D',
        subtype: 'ultimate_alchemist'
      }
    ]
  }
];

// BLURRED SUBTYPE QUESTIONS
export const blurredSubtypeQuestions: Layer2Question[] = [
  {
    id: 'L2_BLR_Q7',
    layer: 2,
    question: 'You\'re asked to lead a routine task. How do you show up?',
    applicable_to: 'both',
    options: [
      { 
        text: 'I start — unsure how to proceed without perfection. (The Overthinker)', 
        value: 'A',
        subtype: 'overthinker'
      },
      { 
        text: 'I appear confident and energetic, even if I\'m unsure. (The Performer)', 
        value: 'B',
        subtype: 'performer'
      },
      { 
        text: 'I create a system to lead efficiently, no emotion needed. (The Self-Forsaker)', 
        value: 'C',
        subtype: 'self_forsaker'
      },
      { 
        text: 'I go with the flow but flip between excitement and dread. (The Self-Betrayer)', 
        value: 'D',
        subtype: 'self_betrayer'
      }
    ]
  },
  {
    id: 'L2_BLR_Q8',
    layer: 2,
    question: 'A major opportunity has just opened up, but the timeline is tight and your usual structure doesn\'t fit your move?',
    applicable_to: 'both',
    options: [
      { 
        text: 'I say yes instantly to keep momentum, and then build the logic underneath as I go. (The Performer)', 
        value: 'A',
        subtype: 'performer'
      },
      { 
        text: 'I spin up a new plan, trying to blend structure and excitement — but end up tweaking endlessly and missing the moment. (The Overthinker)', 
        value: 'B',
        subtype: 'overthinker'
      },
      { 
        text: 'I convince myself the timing is wrong and pass, even though a part of me knows I just avoided the chaos. (The Self-Forsaker)', 
        value: 'C',
        subtype: 'self_forsaker'
      },
      { 
        text: 'I build a structured plan that looks solid on the outside — but emotionally I\'m not invested. (The Self-Betrayer)', 
        value: 'D',
        subtype: 'self_betrayer'
      }
    ]
  },
  {
    id: 'L2_BLR_Q9',
    layer: 2,
    question: 'You\'re surrounded by other entrepreneurs who seem clear and confident. How do you honestly respond internally?',
    applicable_to: 'both',
    options: [
      { 
        text: 'I get inspired, but then doubt if my way of thinking is valid (Self-Forsaker)', 
        value: 'A',
        subtype: 'self_forsaker'
      },
      { 
        text: 'I try to match their clarity and act the part, even when I\'m unsure (The Performer)', 
        value: 'B',
        subtype: 'performer'
      },
      { 
        text: 'I compare myself to their logic or momentum, then feel behind (Overthinker)', 
        value: 'C',
        subtype: 'overthinker'
      },
      { 
        text: 'I wonder how they know—and feel frustrated I don\'t (Self-Betrayer)', 
        value: 'D',
        subtype: 'self_betrayer'
      }
    ]
  },
  {
    id: 'L2_BLR_Q10',
    layer: 2,
    question: 'Which phrase is most likely to match your internal motivation?',
    applicable_to: 'both',
    options: [
      { 
        text: '"I need to get it right first." (The Overthinker)', 
        value: 'A',
        subtype: 'overthinker'
      },
      { 
        text: '"They need to feel I\'m right." (The Performer)', 
        value: 'B',
        subtype: 'performer'
      },
      { 
        text: '"I used to know what I felt." (The Self-Forsaker)', 
        value: 'C',
        subtype: 'self_forsaker'
      },
      { 
        text: '"It should make sense... why doesn\'t it?" (The Self-Betrayer)', 
        value: 'D',
        subtype: 'self_betrayer'
      }
    ]
  },
  {
    id: 'L2_BLR_Q11',
    layer: 2,
    question: 'Which statement most closely matches your behavior under stress?',
    applicable_to: 'both',
    options: [
      { 
        text: 'I freeze and second-guess every choice (The Overthinker)', 
        value: 'A',
        subtype: 'overthinker'
      },
      { 
        text: 'I push through, polished results but may inwardly collapse (The Performer)', 
        value: 'B',
        subtype: 'performer'
      },
      { 
        text: 'I defer to others and follow their lead, feeling disconnected (The Self-Forsaker)', 
        value: 'C',
        subtype: 'self_forsaker'
      },
      { 
        text: 'I double down on logic but feel hollow emotionally (The Self-Betrayer)', 
        value: 'D',
        subtype: 'self_betrayer'
      }
    ]
  },
  {
    id: 'L2_BLR_Q12',
    layer: 2,
    question: 'Which of the following captures your emotional experience?',
    applicable_to: 'both',
    options: [
      { 
        text: 'I feel anxious about both feelings and logic, remaining unable to decide (The Overthinker)', 
        value: 'A',
        subtype: 'overthinker'
      },
      { 
        text: 'I feel like I\'m performing, even when I\'m not truly connected (The Performer)', 
        value: 'B',
        subtype: 'performer'
      },
      { 
        text: 'I often feel no clear guidance from my own feelings (The Self-Forsaker)', 
        value: 'C',
        subtype: 'self_forsaker'
      },
      { 
        text: 'I end up punishing myself for not aligning logic with emotion (The Self-Betrayer)', 
        value: 'D',
        subtype: 'self_betrayer'
      }
    ]
  }
];

export function getLayer2Questions(coreType: 'architect' | 'alchemist' | 'blurred'): Layer2Question[] {
  if (coreType === 'architect') {
    return architectSubtypeQuestions;
  } else if (coreType === 'alchemist') {
    return alchemistSubtypeQuestions;
  } else if (coreType === 'blurred') {
    return blurredSubtypeQuestions;
  }
  return [];
}
