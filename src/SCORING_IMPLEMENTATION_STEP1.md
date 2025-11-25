# EDNA Scoring Logic Implementation - Step 1 Complete

## Summary

I've started implementing the official EDNA scoring logic based on your specifications. Here's what has been created:

## Files Created

### 1. `/lib/scoring-engine.ts`
This is the core scoring engine that implements the exact specifications from your images:

**Layer 1: Core Type Identification**
- Counts points by tags: architect (1 point), alchemist (1 point), blurred (0.5 points)
- Normalizes using: `(raw_sum / num_questions) * 100`
- Decision rules:
  - If top_norm >= 50% AND gap >= 15% → assign that type
  - If top is alc/arc and next is arc/alc with gap < 15% → blurred
- Mastery = top norm percentage

**Layer 2: Subtype Refinement**
- Normalizes percentage per subtype  
- Primary subtype: >= 40% AND gap >= 12%
- Secondary subtype: next_best_norm
- Mixed: Returns "Primary (X%) leading to Secondary (Y%)" when criteria not met
- Mastery = top subtype percentage

**Layer 3: Mirror Pair Awareness**
- For Architects: counts answers tagged 'alchemist'
- For Alchemists: counts answers tagged 'architect'
- For Blurred: counts answers tagged 'architect' OR 'alchemist'
- Scoring bands:
  - 0-2 correct = Low (33%)
  - 3-4 correct = Moderate (66%)
  - 5-7+ correct = High (99%)

### 2. `/lib/layer1-questions.ts`
Contains 6 Layer 1 questions with proper tagging:
- Each option has a `tags` array with `['architect']`, `['alchemist']`, or `['blurred']`
- Questions cover: business challenges, decision-making, work environment, communication, problem-solving, leadership

### 3. `/lib/layer3-questions.ts`
Contains 7 Layer 3 questions testing mirror awareness:
- Tests ability to recognize and value opposite type approaches
- Each option tagged with the type it represents
- Questions cover practical scenarios like team dynamics, conflicting styles, different communication approaches

## Status

✅ Core scoring engine created
✅ Layer 1 questions with tagging created
✅ Layer 3 questions with tagging created
⚠️  EDNAQuiz.tsx needs to be updated to use the new scoring engine
⚠️ Need to update the calculateResults function
⚠️ Need to update handleNext to capture tags from selected options

## Next Steps

Due to the size and complexity of the EDNAQuiz.tsx file, I need to:

1. Remove the corrupted Layer 3 questions array
2. Update the calculateResults function to use the new scoring engine functions
3. Update handleNext to capture and store tags when users select answers
4. Update the EDNAResults interface to include the new scoring fields

Would you like me to:
A) Continue with a complete rewrite of the EDNAQuiz.tsx file with all the new scoring logic
B) Provide you with the specific sections that need to be manually updated
C) Create a new separate quiz component that uses the new scoring engine

Please let me know how you'd like to proceed, and I can provide the remaining implementation steps!
