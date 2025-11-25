/**
 * Layer 5: Neuro Performance Pattern
 */

export interface Layer5Question {
  id: string;
  text: string;
  dimension: string;
  options: {
    value: string;
    text: string;
    score: string;
  }[];
}

export const layer5Questions: Layer5Question[] = [
  { 
    id: 'L5_Q28', 
    text: 'Which description sounds most like how your focus naturally works?', 
    dimension: 'focus_pattern', 
    options: [
      { value: 'a', text: 'I work best with structure and predictable focus cycles.', score: 'broad' },
      { value: 'b', text: 'I work in waves — routine drains me.', score: 'deep' },
      { value: 'c', text: 'I get powerful insights but my focus is inconsistent.', score: 'adaptive' }
    ]
  },
  { 
    id: 'L5_Q29', 
    text: 'When learning or processing instructions, I usually…', 
    dimension: 'processing_speed', 
    options: [
      { value: 'a', text: 'Understand most formats easily.', score: 'fast' },
      { value: 'b', text: 'Prefer alternative inputs (audio, visuals, simplified steps).', score: 'steady' },
      { value: 'c', text: 'Have strong ideas but struggle with structure or consistency.', score: 'thorough' }
    ]
  },
  { 
    id: 'L5_Q30', 
    text: 'When my environment becomes overstimulating, I usually…', 
    dimension: 'energy_pattern', 
    options: [
      { value: 'a', text: 'Adjust and stay mostly grounded.', score: 'burst' },
      { value: 'b', text: 'Get overwhelmed or hyper-focused depending on intensity.', score: 'steady' },
      { value: 'c', text: 'Push through intensely and then crash hard.', score: 'adaptive' }
    ]
  },
  { 
    id: 'L5_Q31', 
    text: 'Which sounds most like your experience managing tasks?', 
    dimension: 'task_switching', 
    options: [
      { value: 'a', text: 'I can follow plans and stay on track with minor support.', score: 'fluid' },
      { value: 'b', text: 'I rely on reminders, prompts, or timing tools to stay organised.', score: 'structured' },
      { value: 'c', text: 'I create strong strategies but struggle with execution or consistency.', score: 'balanced' }
    ]
  },
  { 
    id: 'L5_Q32', 
    text: 'Sensory input (noise, clutter, tension) affects me by:', 
    dimension: 'stress_response', 
    options: [
      { value: 'a', text: 'Rarely impacting my focus.', score: 'fight' },
      { value: 'b', text: 'Distracting or energising me depending on intensity.', score: 'freeze' },
      { value: 'c', text: 'Not affecting me when inspired but overwhelming me when tired.', score: 'flow' }
    ]
  },
  { 
    id: 'L5_Q33', 
    text: 'When I push myself mentally for long periods…', 
    dimension: 'recovery_pattern', 
    options: [
      { value: 'a', text: 'I slow down gradually but stay functional.', score: 'active' },
      { value: 'b', text: 'I speed up, then suddenly drop or lose interest.', score: 'passive' },
      { value: 'c', text: 'I perform extremely well, then hit a hard crash or shutdown.', score: 'mixed' }
    ]
  }
];