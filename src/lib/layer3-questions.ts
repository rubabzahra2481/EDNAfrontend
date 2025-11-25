/**
 * Layer 3: Awareness of the Opposite
 * 
 * These questions test how someone responds when they observe behavior
 * from their opposite type. Questions are shown conditionally based on
 * the person's default DNA from Layer 1.
 * 
 * - If Architect: Show architect questions (opposite = Alchemist)
 * - If Alchemist: Show alchemist questions (opposite = Architect)
 * - If Blurred: Show blurred questions (opposite = clear single-type)
 */

export interface Layer3Question {
  id: string;
  layer: number;
  question: string;
  context?: string;
  applicable_to: 'architect' | 'alchemist' | 'blurred';
  options: {
    text: string;
    value: string;
    tags: string[]; // Tags indicating which type this response represents
  }[];
}

// ARCHITECT QUESTIONS (opposite type: Alchemist)
export const architectLayer3Questions: Layer3Question[] = [
  {
    id: 'L3_ARCH_Q13',
    layer: 3,
    question: 'A colleague bursts in with a raw, half-formed idea and wants to start immediately. Someone opposite to you would most likely:',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Break it into steps, assign tasks and set deadlines. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Jump in to prototype and experiment — trusting intuition over a plan. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Wait to see what others do before deciding. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Try to refine the idea internally before showing others. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ARCH_Q14',
    layer: 3,
    question: 'The team needs a quick pivot because the market changed overnight. Someone opposite to you would most likely:',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Pull together a revised project plan and communicate new milestones. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Throw out parts of the old plan, improvise a bold new approach, and iterate fast. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel anxious and hesitate between old and new ways. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Suggest small changes but mostly keep the original course. (Architect)', 
        value: 'D',
        tags: ['architect']
      }
    ]
  },
  {
    id: 'L3_ARCH_Q15',
    layer: 3,
    question: 'When the product feels "finished" but lacks emotional resonance, someone opposite to you would most likely:',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Ask for user research and add emotional design elements through iteration. (Alchemist)', 
        value: 'A',
        tags: ['alchemist']
      },
      { 
        text: 'Say the product meets specs and shipping is the priority. (Architect)', 
        value: 'B',
        tags: ['architect']
      },
      { 
        text: 'Worry whether anyone will like it and seek approval. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Rework both logic and feeling slowly before release. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ARCH_Q16',
    layer: 3,
    question: 'At a brainstorming session, how would someone opposite to you behave?',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Keep the session free-form, build on wild ideas and follow energy. (Alchemist)', 
        value: 'A',
        tags: ['alchemist']
      },
      { 
        text: 'Follow an agenda, timebox topics and capture action items. (Architect)', 
        value: 'B',
        tags: ['architect']
      },
      { 
        text: 'Alternate between proposing ideas and asking for consensus. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Observe first, rarely speak up. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ARCH_Q17',
    layer: 3,
    question: 'If asked to abandon the schedule to chase a sudden inspiration, someone opposite to you would most likely:',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Insist on keeping the schedule; reorganize to include the idea later. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Embrace the inspiration and reorganize work to pursue it now. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel conflicted and unsure which to choose. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Try to do both at once and get overwhelmed. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ARCH_Q18',
    layer: 3,
    question: 'A teammate says they "feel" the product should go in a very different direction. Someone opposite to you would most likely:',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Test a small creative experiment immediately to see what emerges. (Alchemist)', 
        value: 'A',
        tags: ['alchemist']
      },
      { 
        text: 'Ask for data and run a feasibility analysis before changing course. (Architect)', 
        value: 'B',
        tags: ['architect']
      },
      { 
        text: 'Worry about upsetting the team and delay deciding. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Nod and privately doubt whether the change is right. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ARCH_Q19',
    layer: 3,
    question: 'When confronted with messy, emotional feedback from customers, someone opposite to you would most likely:',
    applicable_to: 'architect',
    options: [
      { 
        text: 'Use that emotional feedback as signal and iterate quickly on feel/experience. (Alchemist)', 
        value: 'A',
        tags: ['alchemist']
      },
      { 
        text: 'Translate the feedback into measurable requirements and action items. (Architect)', 
        value: 'B',
        tags: ['architect']
      },
      { 
        text: 'Become uncertain and seek reassurance from others. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Overanalyze whether the feedback is valid before acting. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  }
];

// ALCHEMIST QUESTIONS (opposite type: Architect)
export const alchemistLayer3Questions: Layer3Question[] = [
  {
    id: 'L3_ALC_Q13',
    layer: 3,
    question: 'A promising idea arrives that needs to scale reliably. Someone opposite to you would most likely:',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Sketch a rough trial and iterate based on reactions. (Alchemist)', 
        value: 'A',
        tags: ['alchemist']
      },
      { 
        text: 'Design a step-by-step roadmap with milestones for scaling. (Architect)', 
        value: 'B',
        tags: ['architect']
      },
      { 
        text: 'Get excited but postpone action until feeling right. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Delegate the planning to someone else. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ALC_Q14',
    layer: 3,
    question: 'Management asks for a predictable timeline and deliverables. Someone opposite to you would most likely:',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Create an exact schedule, assign owners and build contingency plans. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Propose a flexible timeline focused on creative cycles. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel stressed and vacillate between the two approaches. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Agree verbally but change course later if mood shifts. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ALC_Q14B',
    layer: 3,
    question: 'The team must reduce errors in repeated processes. Someone opposite to you would most likely:',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Create standard operating procedures and checklists. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Encourage hands-on trials to find what "feels" right each time. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Try a mixture of rules and improvisation but without commitment. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Tell someone to implement order while keeping creative control. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ALC_Q15',
    layer: 3,
    question: 'A stakeholder requests evidence before approving resources. Someone opposite to you would most likely:',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Gather data, run pilot metrics and present a logical case. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Ask for a small creative prototype to show potential quickly. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Try to please the stakeholder while doubting the choice. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Offer a vague vision and hope approval follows. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ALC_Q16',
    layer: 3,
    question: 'When deadlines loom, how would someone opposite to you react?',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Break the work into micro-tasks and follow the plan rigorously. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Rely on bursts of creative energy and pivot as needed. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Alternate between hyper-focus and withdrawal. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Delay decisions until inspiration returns. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ALC_Q17',
    layer: 3,
    question: 'A team needs reproducible results across markets. Someone opposite to you would most likely:',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Build templates, systems and playbooks for replication. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Customize creative adaptations for each market and iterate. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel stuck deciding which path to take. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Combine a loose template with heavy local improvisation. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_ALC_Q18',
    layer: 3,
    question: 'During conflict about priorities, someone opposite to you would most likely:',
    applicable_to: 'alchemist',
    options: [
      { 
        text: 'Convene a structured review, list priorities and vote by criteria. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Call a creative session to question priorities and test options. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Try to keep everyone happy and avoid making a strong call. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Follow whichever voice in the room is loudest. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  }
];

// BLURRED QUESTIONS (opposite type: clear single-type - Architect or Alchemist)
export const blurredLayer3Questions: Layer3Question[] = [
  {
    id: 'L3_BLR_Q13',
    layer: 3,
    question: 'A project needs a reliable repeatable process. Someone opposite to you would most likely:',
    applicable_to: 'blurred',
    options: [
      { 
        text: 'Roll out a strict playbook and train the team to follow it. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Launch a creative pilot and refine it based on feedback. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Wobble between standardizing and experimenting. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Let people find their own way each time. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_BLR_Q14',
    layer: 3,
    question: 'A sudden idea sparks in a meeting. Someone opposite to you would most likely:',
    applicable_to: 'blurred',
    options: [
      { 
        text: 'Stop and map out how that idea can be implemented step by step. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Grab resources to experiment immediately and see what emerges. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel excited but unsure how to proceed. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Keep the idea in mind and revisit it later. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_BLR_Q15',
    layer: 3,
    question: 'When given a tight timeline, someone opposite to you would most likely:',
    applicable_to: 'blurred',
    options: [
      { 
        text: 'Create a strict timeline, assign owners and track progress daily. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Prioritize a minimum-viable experiment to learn fast, then iterate. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Oscillate between pressure and procrastination. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Ask for an extension while dreaming up new approaches. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_BLR_Q16',
    layer: 3,
    question: 'During feedback that mixes facts and feelings, someone opposite to you would most likely:',
    applicable_to: 'blurred',
    options: [
      { 
        text: 'Translate feedback into measurable actions and KPIs. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Tune into emotional signals and adapt the experience accordingly. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel confused about which to prioritize. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Try to do both at once but lose clarity. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_BLR_Q17',
    layer: 3,
    question: 'If the team needs consistency across several launches, someone opposite to you would most likely:',
    applicable_to: 'blurred',
    options: [
      { 
        text: 'Implement templates, timelines and quality gates. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Encourage local creative adjustments while keeping a loose framework. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Try different approaches each time without committing. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Defer whichever seems most confident that day. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  },
  {
    id: 'L3_BLR_Q18',
    layer: 3,
    question: 'A stakeholder asks for "proof" before approving a big idea. Someone opposite to you would most likely:',
    applicable_to: 'blurred',
    options: [
      { 
        text: 'Deliver a documented pilot plan with metrics and risks laid out. (Architect)', 
        value: 'A',
        tags: ['architect']
      },
      { 
        text: 'Create a quick prototype to demonstrate potential impact. (Alchemist)', 
        value: 'B',
        tags: ['alchemist']
      },
      { 
        text: 'Feel anxious and avoid making a clear proposal. (Blurred)', 
        value: 'C',
        tags: ['blurred']
      },
      { 
        text: 'Present both data and feelings but lack conviction. (Blurred)', 
        value: 'D',
        tags: ['blurred']
      }
    ]
  }
];

export function getLayer3Questions(coreType: 'architect' | 'alchemist' | 'blurred'): Layer3Question[] {
  if (coreType === 'architect') {
    return architectLayer3Questions;
  } else if (coreType === 'alchemist') {
    return alchemistLayer3Questions;
  } else if (coreType === 'blurred') {
    return blurredLayer3Questions;
  }
  return [];
}

// Combined export for quiz flow (includes all questions from all three types)
export const layer3Questions = [
  ...architectLayer3Questions,
  ...alchemistLayer3Questions,
  ...blurredLayer3Questions
];
