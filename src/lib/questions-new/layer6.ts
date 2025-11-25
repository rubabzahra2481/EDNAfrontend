/**
 * Layer 6: Mindset & Personality
 */

export interface Layer6Question {
  id: string;
  text: string;
  category: 'mindset' | 'personality';
  dimension?: string;
  options: {
    value: 'a' | 'b';
    text: string;
    score: string;
  }[];
}

export const layer6Questions: Layer6Question[] = [
  {
    id: 'L6_Q34',
    text: '“When something stretches my abilities, my usual response is to:”',
    category: 'mindset',
    dimension: 'growth_fixed',
    options: [
      { value: 'a', text: 'Try to learn or adjust so I can handle it.', score: 'Growth' },
      { value: 'b', text: 'Take a step back and reassess before committing to it.', score: 'Fixed' }
    ]
  },
  {
    id: 'L6_Q35',
    text: '“When opportunities or resources feel limited, I usually:”',
    category: 'mindset',
    dimension: 'abundance_scarcity',
    options: [
      { value: 'a', text: 'Look for alternatives or ways to create more options.', score: 'Abundance' },
      { value: 'b', text: 'Work with what’s available and stay strategic with it.', score: 'Scarcity' }
    ]
  },
  {
    id: 'L6_Q36',
    text: '“When I face something new or unfamiliar, I tend to:”',
    category: 'mindset',
    dimension: 'challenge_comfort',
    options: [
      { value: 'a', text: 'Explore it and see what I can learn from it.', score: 'Challenge' },
      { value: 'b', text: 'Start with what feels familiar and build from there.', score: 'Comfort' }
    ]
  },
  {
    id: 'L6_Q37',
    text: '“In important situations, I usually show up feeling:”',
    category: 'personality',
    dimension: 'confidence',
    options: [
      { value: 'a', text: 'Clear about what I bring to the table.', score: 'Confident' },
      { value: 'b', text: 'Thoughtful and reflective before stepping in.', score: 'Considerate' }
    ]
  },
  {
    id: 'L6_Q38',
    text: '“When I’m working toward something meaningful, my natural pace is:”',
    category: 'personality',
    dimension: 'pace',
    options: [
      { value: 'a', text: 'Steady — I like to build things properly.', score: 'Steady' },
      { value: 'b', text: 'Fast — I like to move things forward quickly.', score: 'Fast' }
    ]
  },
  {
    id: 'L6_Q39',
    text: '"When something matters to me, I tend to communicate in a way that:"',
    category: 'personality',
    dimension: 'communication',
    options: [
      { value: 'a', text: 'Gets the point across clearly, even if it\'s direct.', score: 'Direct' },
      { value: 'b', text: 'Maintains harmony and keeps the interaction smooth.', score: 'Harmonious' }
    ]
  }
];
