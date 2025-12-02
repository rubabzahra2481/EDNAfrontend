/**
 * Layer 5: Neuro Performance Pattern
 * Determines: Neurodivergent, Neurotypical, or Twice Exceptional (2E)
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
      { value: 'a', text: 'I work best with structure and predictable focus cycles. I maintain consistent attention and follow routines naturally.', score: 'neurotypical' },
      { value: 'b', text: 'I work in waves — routine drains me. I need stimulation, movement, or variety to stay engaged.', score: 'neurodivergent' },
      { value: 'c', text: 'I perform exceptionally well in some tasks but struggle with others. My abilities are uneven across different areas.', score: 'twice_exceptional' }
    ]
  },
  { 
    id: 'L5_Q29', 
    text: 'When learning or processing instructions, I usually…', 
    dimension: 'processing_speed', 
    options: [
      { value: 'a', text: 'Understand most formats easily and process information in a natural rhythm.', score: 'neurotypical' },
      { value: 'b', text: 'Prefer alternative inputs (audio, visuals, simplified steps) or need breaks to process effectively.', score: 'neurodivergent' },
      { value: 'c', text: 'Have exceptional understanding in some areas but need significant support in others.', score: 'twice_exceptional' }
    ]
  },
  { 
    id: 'L5_Q30', 
    text: 'When my environment becomes overstimulating, I usually…', 
    dimension: 'energy_pattern', 
    options: [
      { value: 'a', text: 'Adjust and stay mostly grounded. I can handle various environments without major disruption.', score: 'neurotypical' },
      { value: 'b', text: 'Get overwhelmed or hyper-focused depending on intensity. I need quiet, minimally distracting environments to focus.', score: 'neurodivergent' },
      { value: 'c', text: 'Experience extreme highs and lows — exceptional performance when aligned, but significant challenges when not.', score: 'twice_exceptional' }
    ]
  },
  { 
    id: 'L5_Q31', 
    text: 'Which sounds most like your experience managing tasks?', 
    dimension: 'task_switching', 
    options: [
      { value: 'a', text: 'I can follow plans and stay on track with minor support. Task management feels natural.', score: 'neurotypical' },
      { value: 'b', text: 'I rely on reminders, prompts, or timing tools to stay organised. I work best in short, interactive sessions with frequent breaks.', score: 'neurodivergent' },
      { value: 'c', text: 'I create strong strategies but struggle with execution or consistency. Some tasks are effortless while others are extremely difficult.', score: 'twice_exceptional' }
    ]
  },
  { 
    id: 'L5_Q32', 
    text: 'Sensory input (noise, clutter, tension) affects me by:', 
    dimension: 'stress_response', 
    options: [
      { value: 'a', text: 'Rarely impacting my focus. I can work in various environments without significant disruption.', score: 'neurotypical' },
      { value: 'b', text: 'Distracting or energising me depending on intensity. I get overwhelmed by cluttered layouts or excessive visual stimuli.', score: 'neurodivergent' },
      { value: 'c', text: 'Creating extreme responses — either exceptional focus or complete overwhelm, with little middle ground.', score: 'twice_exceptional' }
    ]
  },
  { 
    id: 'L5_Q33', 
    text: 'When I push myself mentally for long periods…', 
    dimension: 'recovery_pattern', 
    options: [
      { value: 'a', text: 'I slow down gradually but stay functional. I maintain a natural rhythm of work and rest.', score: 'neurotypical' },
      { value: 'b', text: 'I speed up, then suddenly drop or lose interest. I work in bursts and need recovery time.', score: 'neurodivergent' },
      { value: 'c', text: 'I perform extremely well, then hit a hard crash or shutdown. My performance is exceptional but unsustainable.', score: 'twice_exceptional' }
    ]
  }
];
