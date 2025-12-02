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
    text: 'When I\'m about to make an important decision, my natural starting point is:',
    options: [
      { 
        value: 'a', 
        text: 'I begin by clarifying the facts, structure, or logic. If it feels right after that, I validate it logically before deciding.\n → (Decision loop activates —I begin with logic)', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'I begin by tuning into what feels meaningful or aligned. If the logic supports it, I check the feeling again before deciding.\n → (Decision loop activates —I begin with emotion)', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q2',
    text: 'I trust a decision the most when the final check is based on:',
    options: [
      { 
        value: 'a', 
        text: 'Whether the logic still holds up clearly. Even if the feeling isn\'t fully there yet, If I can test and prove it logically, I\'ll move forward.', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'Whether the feeling still feels aligned and true. Even if the logic isn\'t perfect yet. If it still feels right to me, I\'ll trust the decision', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q3',
    text: 'When something is unclear or uncertain, my natural way of finding clarity is to start by checking:',
    options: [
      { 
        value: 'a', 
        text: 'Whether the structure or facts make sense first. I anchor in logic, then check how it feels, and confirm the logic again before deciding.\nPattern:(Logic → Emotion → Logic)', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'Whether something feels off or right first. I anchor in feeling, then look for logic to support it, and return to the feeling before deciding.\nPattern:(Emotion → Logic → Emotion)', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q4',
    text: 'Under time pressure or stress, to ensure delivery I tend to:',
    options: [
      { 
        value: 'a', 
        text: 'I check whether the plan or steps still make logical sense. I stabilise the structure first, sense how it feels, and commit once the logic holds.\nPattern: (Logic → Emotion → Logic)', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'I check whether the situation still feels aligned. I check the feeling first, look at the logic next, and commit once the emotional signal is steady.\nPattern: (Emotion → Logic → Emotion)', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q5',
    text: 'When I regret a decision, it\'s usually because:',
    options: [
      { 
        value: 'a', 
        text: 'I relied too heavily on my emotions causing me to ignore the logical signs and I went with my feelings.\n(my regret — logic was ignored)', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'I relied too heavily on logic and didn\'t listen to the feeling or intuition and i went with facts or data\n(my regret — feelings were ignored)', 
        score: 'alchemist' 
      }
    ]
  },
  {
    id: 'L1_Q6',
    text: 'When someone asks me to explain a decision , my usual response or explanation sounds like:',
    options: [
      { 
        value: 'a', 
        text: 'I show the structure — the reasoning & logic, then explain the thoughts and emotion that supported the logic and why it still made sense after I checked how I felt.\n→ Process: (logic-led explanation)', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'I describe what felt right — the alignment & energy , then describe the emotion  and logic that supported that feeling. why it still felt right  after I checked the logic.\n→ Process: (feeling-led explanation)', 
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
        text: 'Whether the logic still holds — I double-check the reasoning, structure, or assumptions after noticing how it feels.\n→ (logic as final validator)', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'Whether it still feels right — I recheck the emotional signal or intuition after reviewing the logic.\n→ (emotion as final validator)', 
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
        text: 'If my reasoning still stands - Did I miss an assumption or key piece of data — and does it still make logical sense after noticing how I feel about it?\nRecheck decision loop - logic - emotion -logic', 
        score: 'architect' 
      },
      { 
        value: 'b', 
        text: 'If my feelings still hold - Am I ignoring something I can feel but haven\'t been able to explain — and does the logic still support that feeling?\nRecheck decision loop - emotion -logic- emotion', 
        score: 'alchemist' 
      }
    ]
  }
];
