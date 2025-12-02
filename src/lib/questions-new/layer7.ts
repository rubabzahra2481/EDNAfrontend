/**
 * Layer 7: Meta-Beliefs & Values
 */

export interface Layer7Question {
  id: string;
  text: string;
  dimension: string;
  options: {
    value: 'a' | 'b' | 'c';
    text: string;
    label: string;
  }[];
}

export const layer7Questions: Layer7Question[] = [
  {
    id: 'L7_Q40',
    text: '“When life feels uncertain, I usually find grounding through:”',
    dimension: 'Grounding Source',
    options: [
      { value: 'a', text: 'My own reasoning, planning, and personal responsibility.', label: 'Self-Reliant' },
      { value: 'b', text: 'Trusting a higher purpose, spiritual guidance, or divine timing.', label: 'Faith-Reliant' },
      { value: 'c', text: 'A mix — I do my part, and trust the rest to unfold as it should.', label: 'Dual-Reliant' }
    ]
  },
  {
    id: 'L7_Q41',
    text: '“When I think about my future, I mainly believe that:”',
    dimension: 'Control Belief',
    options: [
      { value: 'a', text: 'My actions and choices shape most of my outcomes.', label: 'I\'m In Control' },
      { value: 'b', text: 'Circumstances, timing, or external forces play a big role.', label: 'Life Influences Me' },
      { value: 'c', text: 'Both — my choices matter, but so do external factors and timing.', label: 'Shared Control' }
    ]
  },
  {
    id: 'L7_Q42',
    text: '“When I think about fairness in the world, I tend to believe:”',
    dimension: 'Fairness View',
    options: [
      { value: 'a', text: 'Fairness is created when people take personal responsibility.', label: 'Responsibility View' },
      { value: 'b', text: 'Fairness depends on compassion, support, and equity.', label: 'Compassion View' },
      { value: 'c', text: 'Fairness comes from a balance of responsibility and shared support.', label: 'Balanced View' }
    ]
  },
  {
    id: 'L7_Q43',
    text: '“When faced with a difficult choice, I usually prioritise:”',
    dimension: 'Honesty Style',
    options: [
      { value: 'a', text: 'Being honest and transparent, even when it’s uncomfortable.', label: 'Direct Honesty' },
      { value: 'b', text: 'Protecting people’s feelings and handling truths carefully.', label: 'Gentle Honesty' },
      { value: 'c', text: 'Staying honest, but communicating it with care and respect.', label: 'Balanced Honesty' }
    ]
  },
  {
    id: 'L7_Q44',
    text: '“When I face a situation that pushes me outside my comfort zone, I usually:”',
    dimension: 'Growth Approach',
    options: [
      { value: 'a', text: 'Look for what I can learn or improve.', label: 'Growth Focused' },
      { value: 'b', text: 'Take it slowly and move at a pace that feels comfortable.', label: 'Comfort Focused' },
      { value: 'c', text: 'Mix both — I stretch myself, but in a steady, manageable way.', label: 'Steady Growth' }
    ]
  },
  {
    id: 'L7_Q45',
    text: '“When I think about the impact I want to make, I’m most motivated by:”',
    dimension: 'Impact Motivation',
    options: [
      { value: 'a', text: 'Achieving results that improve my life and the lives of those closest to me.', label: 'Self-Focused Impact' },
      { value: 'b', text: 'Helping others, supporting people, or being part of something bigger.', label: 'Others-Focused Impact' },
      { value: 'c', text: 'Creating success that supports both my growth and the people around me.', label: 'Shared Impact' }
    ]
  }
];
