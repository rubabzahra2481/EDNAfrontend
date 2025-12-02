/**
 * Layer 3: Mirror Awareness
 */

export interface Layer3Question {
  id: string;
  text: string;
  dimension: string;
  options: {
    value: 'a' | 'b' | 'c';
    text: string;
    score: number;
    label: string;
  }[];
}

export const layer3Questions: Layer3Question[] = [
  {
    id: 'L3_Q17',
    text: 'When I work with someone who decides very differently from me (more structure-led or more meaning-led), I usually feel:',
    dimension: 'Validator Awareness',
    options: [
      { value: 'a', text: 'Frustrated or misunderstood — we clash often.', score: 0, label: 'Opposite' },
      { value: 'b', text: 'Mixed — sometimes we clash, sometimes we work well.', score: 1, label: 'Partial' },
      { value: 'c', text: 'Challenged in a useful way — they help me see things I would miss.', score: 2, label: 'Full' }
    ]
  },
  {
    id: 'L3_Q18',
    text: 'When someone I disagree with brings a completely different view, I mostly use it to…',
    dimension: 'Emotional Regulation',
    options: [
      { value: 'a', text: 'Defend my own view more strongly', score: 0, label: 'Reactive' },
      { value: 'b', text: 'Think about it later, but I rarely change my approach', score: 1, label: 'Aware' },
      { value: 'c', text: 'Actively adjust my decision if their view reveals something I missed', score: 2, label: 'Integrated' }
    ]
  },
  {
    id: 'L3_Q19',
    text: 'In group decisions with strong personalities who think differently to me, I usually…',
    dimension: 'Feedback Processing',
    options: [
      { value: 'a', text: 'Push for my way and feel stressed when they don\'t \'get it\'', score: 0, label: 'Defensive' },
      { value: 'b', text: 'Try to compromise, but it\'s often a tug-of-war', score: 1, label: 'Selective' },
      { value: 'c', text: 'Listen for the value in each style and combine them into a better decision', score: 2, label: 'Open' }
    ]
  },
  {
    id: 'L3_Q20',
    text: 'When I realise someone approaches decisions very differently from me (more structure-led or more meaning-led), I usually:',
    dimension: 'Blind Spot Recognition',
    options: [
      { value: 'a', text: 'Struggle to understand how they think or how to work with them', score: 0, label: 'Unaware' },
      { value: 'b', text: 'Get the general idea, but their way of thinking still confuses me sometimes', score: 1, label: 'Emerging' },
      { value: 'c', text: 'Understand how they think and can adjust how I work with them easily', score: 2, label: 'Aware' }
    ]
  },
  {
    id: 'L3_Q21',
    text: 'Looking at the last few projects where I worked with people who think differently from me, the results were mostly:',
    dimension: 'Self-Correction Speed',
    options: [
      { value: 'a', text: 'Messy or draining — it didn\'t go smoothly', score: 0, label: 'Slow' },
      { value: 'b', text: 'Mixed — some wins, some unnecessary friction', score: 1, label: 'Moderate' },
      { value: 'c', text: 'Strong — the mix of styles made the outcome better', score: 2, label: 'Fast' }
    ]
  },
  {
    id: 'L3_Q22',
    text: 'When someone uses a way of deciding that\'s very different from mine, my first inner reaction is usually:',
    dimension: 'Growth Orientation',
    options: [
      { value: 'a', text: 'They\'re wrong or unrealistic.', score: 0, label: 'Fixed' },
      { value: 'b', text: 'I don\'t fully get them yet, but I\'m curious.', score: 1, label: 'Mixed' },
      { value: 'c', text: 'Good — this might show me something I can\'t see.', score: 2, label: 'Growth' }
    ]
  }
];
