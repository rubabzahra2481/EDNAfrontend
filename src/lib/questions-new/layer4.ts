/**
 * Layer 4: Learning Style (VARK Model + Learning Preferences)
 * Questions 23-27
 */

export interface Layer4Question {
  id: string;
  text: string;
  dimension: string;
  options: {
    value: string;
    text: string;
    score?: string;
  }[];
}

export const layer4Questions: Layer4Question[] = [
  {
    id: 'L4_Q23',
    text: 'When something new is being explained, I understand it fastest when it\'s presented as:',
    dimension: 'Modality Preference',
    options: [
      { value: 'a', text: 'A visual example (diagram, sketch, chart, images )', score: 'Visual' },
      { value: 'b', text: 'A conversation or explanation I can listen to', score: 'Auditory' },
      { value: 'c', text: 'Written instructions or notes I can read', score: 'Read/Write' },
      { value: 'd', text: 'Something I can try, test, or explore hands on', score: 'Kinesthetic' },
      { value: 'e', text: 'A mix of formats — I learn well several different formats', score: 'Multimodal' }
    ]
  },
  {
    id: 'L4_Q24',
    text: 'When I\'m learning something new, I make sense of it best when:',
    dimension: 'Approach',
    options: [
      { value: 'a', text: 'It\'s explained in a clear step-by-step order', score: 'Sequential' },
      { value: 'b', text: 'I see the whole concept first, then connect the pieces myself', score: 'Global' },
      { value: 'c', text: 'I can switch between steps and big-picture depending on the situation', score: 'Adaptive' }
    ]
  },
  {
    id: 'L4_Q25',
    text: 'I understand new ideas better when they\'re shown through:',
    dimension: 'Concept Processing',
    options: [
      { value: 'a', text: 'Real examples, demonstrations, or practical use cases', score: 'Concrete' },
      { value: 'b', text: 'Core principles, patterns, or the big underlying idea', score: 'Abstract' },
      { value: 'c', text: 'A mix of both depending on what I\'m learning', score: 'Flexible' }
    ]
  },
  {
    id: 'L4_Q26',
    text: 'I learn and work best when I\'m:',
    dimension: 'Working Environment',
    options: [
      { value: 'a', text: 'On my own, in my own space, with minimal interruption', score: 'Individual' },
      { value: 'b', text: 'Around others — discussing, exchanging ideas, or collaborating', score: 'Collaborative' },
      { value: 'c', text: 'Mix of Both -Switching between solo and group environments depending on the task or mood', score: 'Adaptive' }
    ]
  },
  {
    id: 'L4_Q27',
    text: 'When learning something new, my natural pace is:',
    dimension: 'Pace',
    options: [
      { value: 'a', text: 'I pick up things quickly, get the overview, and refine later', score: 'Fast' },
      { value: 'b', text: 'I prefer a slower, consistent pace to absorb things properly and accurately', score: 'Steady' },
      { value: 'c', text: 'sometimes fast, sometimes steady, depending on complexity', score: 'Flexible' }
    ]
  }
];
