/**
 * Layer 1: Decision Identity
 * Determines: Architect vs Alchemist core type
 */

export interface Layer1Question {
  id: string;
  text: string;
  options: {
    value: 'a' | 'b';
    text: string;
    score: 'architect' | 'alchemist';
  }[];
}

export const layer1Questions: Layer1Question[] = [
  {
    id: 'L1_Q1',
    text: 'When I’m about to make an important decision, my natural starting point is:',
    options: [
      { 
        value: 'a', 
        text: '“I start by clarifying the facts, data, or structure first.\nIf it feels right, I then test it logically before deciding.”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“I start by tuning into what feels meaningful or ‘right’ first.\nIf the logic supports it, I then check the feeling again before deciding.”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q2',
    text: 'I trust a decision the most when:',
    options: [
      { 
        value: 'a', 
        text: '“It must make logical sense, even if the feeling is not fully there yet.\nI need to be able to prove it logically.”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“It must feel aligned, even if the logical side doesn’t make complete sense yet.\nIt has to feel right to me.”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q3',
    text: 'When something is unclear or uncertain, I naturally:',
    options: [
      { 
        value: 'a', 
        text: '“Start with the facts or structure first, check if it also feels right, then reconfirm the logic again.”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“Tune into what feels off or right first, then must also find logic to support it, and check the feeling again.”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q4',
    text: 'Under time pressure, I tend to:',
    options: [
      { 
        value: 'a', 
        text: '“Tighten the plan or steps first, sense if it feels okay, then commit as long as the structure holds.”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“Connect to how I’m feeling first, look at the logic or structure next, then commit when it feels good to go.”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q5',
    text: 'When I regret a decision, it’s usually because:',
    options: [
      { 
        value: 'a', 
        text: '“I ignored the logical signs because the feelings overtook me too fast.”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“I ignored the feeling because the logic overrode everything and looked right on paper.”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q6',
    text: 'When someone asks ‘Why did you choose that?’, my explanation usually sounds like:',
    options: [
      { 
        value: 'a', 
        text: '“Here’s the reasoning, the trade-offs, and why it still made sense after I checked how I felt.”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“Here’s what felt right, how the energy aligned, and the logic that supported that feeling.”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q7',
    text: 'Right before I commit to a decision, the last thing I check is:',
    options: [
      { 
        value: 'a', 
        text: '“Does this still make sense logically after I sense how I feel about it?”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“Does this still feel right after I look at the logical side?”', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q8',
    text: 'When someone challenges my decision strongly, I naturally check:',
    options: [
      { 
        value: 'a', 
        text: '“Did I miss a key assumption or important data — and does it still make sense after I check how I feel?”', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: '“Am I ignoring something I can feel but haven’t been able to explain — and does the logic still support that feeling?”', 
        score: 'alchemist' 
      }
    ]
  }
];