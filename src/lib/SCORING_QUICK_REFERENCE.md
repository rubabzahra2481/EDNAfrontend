# EDNA Scoring System - Quick Reference Guide

## How to Use the Scoring System

### Step 1: Import the Complete Scoring Function

```typescript
import { calculateCompleteEDNAScore, generateProfileSummary, generateRecommendations } from './lib/complete-scoring';
import { QuizAnswer } from './lib/scoring-engine';
```

### Step 2: Collect Answers in the Correct Format

```typescript
const answers: QuizAnswer[] = [
  {
    question_id: 'L1_Q1',
    selected: 'option_value',
    layer: 1,
    dimension: 'optional_dimension',
    tags: ['architect'] // For Layer 1 & 3
  },
  // ... more answers
];
```

### Step 3: Calculate Complete Results

```typescript
const results = calculateCompleteEDNAScore(answers);
```

### Step 4: Generate Summary and Recommendations

```typescript
const summary = generateProfileSummary(results);
const recommendations = generateRecommendations(results);

console.log(summary);
console.log(recommendations);
// {
//   learning: [...],
//   development: [...],
//   tools: [...]
// }
```

---

## Answer Format by Layer

### Layer 1: Core Identity
```typescript
{
  question_id: 'L1_Q1',
  selected: 'option_value',
  layer: 1,
  tags: ['architect'] // or ['alchemist'] or ['blurred']
}
```

### Layer 2: Subtype Refinement
```typescript
{
  question_id: 'L2_Q1',
  selected: 'master_strategist', // subtype name
  layer: 2
}
```

### Layer 3: Mirror Awareness
```typescript
{
  question_id: 'L3_Q1',
  selected: 'option_value',
  layer: 3,
  tags: ['architect'] // or ['alchemist'] - opposite of user's core type
}
```

### Layer 4: Learning Style
```typescript
{
  question_id: 'L4_Q1',
  selected: 'visual', // or 'auditory', 'kinesthetic', etc.
  layer: 4,
  dimension: 'modality' // or 'approach', 'concept_processing', 'working_environment', 'pace'
}
```

### Layer 5: Neurodiversity
```typescript
{
  question_id: 'L5_Q1',
  selected: 'adhd', // or 'dyslexia', 'autism', 'sensory', 'none'
  layer: 5,
  dimension: 'neurodiversity'
}
```

### Layer 6: Mindset & Personality
```typescript
{
  question_id: 'L6_Q1',
  selected: 'growth', // or 'fixed', 'mixed'
  layer: 6,
  dimension: 'mindset' // or 'risk_tolerance', 'extraversion'
}
```

### Layer 7: Meta-Beliefs & Values
```typescript
{
  question_id: 'L7_Q1',
  selected: 'bold_scaling', // or 'craftsmanship', 'both_scaling'
  layer: 7,
  dimension: 'scaling' // or 'mission', 'innovation', 'numbers', 'abundance', 'market_orientation'
}
```

---

## Results Structure

### Access Individual Layer Results

```typescript
// Layer 1: Core Type
const coreType = results.layer1.core_type; // 'architect' | 'alchemist' | 'blurred'
const mastery = results.layer1.mastery; // percentage

// Layer 2: Subtype
const subtype = results.layer2.primary_subtype;
const displayLabel = results.layer2.display_label;

// Layer 3: Mirror Awareness
const awareness = results.layer3.mirror_awareness_level; // 'low' | 'moderate' | 'high'

// Layer 4: Learning Style
const modality = results.layer4.modality_preference;
const approach = results.layer4.approach;

// Layer 5: Neurodiversity
const traits = results.layer5.traits_detected;
const flags = results.layer5.flags;
const disclaimer = results.layer5.disclaimer; // MUST display!

// Layer 6: Mindset & Personality
const mindset = results.layer6.mindset;
const riskTolerance = results.layer6.risk_tolerance;
const extraversion = results.layer6.extraversion;

// Layer 7: Values
const values = {
  growth: results.layer7.growth_philosophy,
  purpose: results.layer7.purpose_filter,
  innovation: results.layer7.change_appetite
};
const misalignments = results.layer7.misalignments;
```

---

## Common Use Cases

### 1. Display Complete Profile

```typescript
const summary = generateProfileSummary(results);
// Returns markdown-formatted comprehensive profile
```

### 2. Get Personalized Recommendations

```typescript
const recs = generateRecommendations(results);

// Learning recommendations
recs.learning.forEach(rec => console.log(`📚 ${rec}`));

// Development areas
recs.development.forEach(rec => console.log(`🌱 ${rec}`));

// Tool suggestions
recs.tools.forEach(tool => console.log(`🔧 ${tool}`));
```

### 3. Export for Backend Storage

```typescript
import { exportResults } from './lib/complete-scoring';

const jsonData = exportResults(results);
// Save to database or local storage
```

### 4. Check for Neurodiversity Flags

```typescript
const { layer5 } = results;

if (layer5.flags.length > 0) {
  layer5.flags.forEach(flag => {
    if (flag.level === 'probable' || flag.level === 'possible') {
      console.log(`⚠️ ${flag.message}`);
    }
  });
  
  // ALWAYS display disclaimer
  console.log(layer5.disclaimer);
  
  // Check for co-occurrence
  if (layer5.co_occurrence_warning) {
    console.log(`🔔 ${layer5.co_occurrence_warning}`);
  }
}
```

### 5. Detect Value Misalignments

```typescript
const { layer7 } = results;

if (layer7.misalignments.length > 0) {
  layer7.misalignments.forEach(m => {
    console.log(`Pattern: ${m.type}`);
    console.log(`Impact: ${m.impact}`);
    console.log(`Remedy: ${m.remedy}`);
  });
}
```

---

## Question Import Paths

```typescript
// Import all questions
import { layer4Questions, layer5Questions, layer6Questions, layer7Questions } from './lib/layer4-7-questions';
import { layer1Questions } from './lib/layer1-questions';
import { layer3Questions } from './lib/layer3-questions';

// Combine all questions for quiz flow
const allQuestions = [
  ...layer1Questions,
  // layer2Questions would come from subtype selection
  ...layer3Questions,
  ...layer4Questions,
  ...layer5Questions,
  ...layer6Questions,
  ...layer7Questions
];
```

---

## Error Handling

```typescript
try {
  const results = calculateCompleteEDNAScore(answers);
  
  // Success - use results
  displayResults(results);
  
} catch (error) {
  // Handle errors
  if (error.message.includes('No Layer')) {
    console.error('Missing required layer answers:', error.message);
  } else {
    console.error('Scoring error:', error);
  }
}
```

---

## TypeScript Types Reference

All types are exported from `/lib/scoring-engine.ts`:

```typescript
import {
  QuizAnswer,
  Layer1Result,
  Layer2Result,
  Layer3Result,
  Layer4Result,
  Layer5Result,
  Layer6Result,
  Layer7Result
} from './lib/scoring-engine';

import {
  CompleteEDNAResults
} from './lib/complete-scoring';
```

---

## Validation Checklist

Before calculating scores, ensure:

- [ ] All required layers have answers (Layers 1-7)
- [ ] Layer 1 answers have proper `tags` array
- [ ] Layer 3 answers have proper `tags` array
- [ ] Layer 4 answers have correct `dimension` values
- [ ] Layer 5 answers map to valid trait values
- [ ] Layer 6 answers have correct `dimension` values
- [ ] Layer 7 answers have correct `dimension` values
- [ ] All `selected` values match question option values

---

## Performance Notes

- Scoring is synchronous and fast (< 50ms typically)
- No API calls required
- Safe to run client-side
- Results can be cached for re-display

---

## Best Practices

1. **Layer 5 Disclaimer**: ALWAYS display the neurodiversity disclaimer
2. **Professional Referrals**: For probable/possible flags, encourage specialist consultation
3. **Privacy**: Treat Layer 5 data as sensitive health information
4. **Personalization**: Use Layer 4 results to customize learning experience
5. **Misalignment Awareness**: Show Layer 7 misalignments as constructive coaching, not criticism
6. **Export**: Offer users ability to export their complete profile
7. **Retake**: Allow users to retake assessment to see how they evolve

---

## Support Functions

### Individual Layer Scoring

If you need to score layers independently:

```typescript
import {
  calculateLayer1Score,
  calculateLayer2Score,
  calculateLayer3Score,
  calculateLayer4Score,
  calculateLayer5Score,
  calculateLayer6Score,
  calculateLayer7Score
} from './lib/scoring-engine';

// Score individual layers
const layer1Result = calculateLayer1Score(layer1Answers);
const layer4Result = calculateLayer4Score(layer4Answers);
// etc.
```

---

## Quick Debug

```typescript
// Log answer structure
console.log('Answers:', JSON.stringify(answers, null, 2));

// Log results structure
console.log('Results:', JSON.stringify(results, null, 2));

// Check specific layer
console.log('Layer 4:', results.layer4);
console.log('Layer 5:', results.layer5);
```

---

## Next Integration Steps

1. Update `EDNAQuiz.tsx` to collect answers in proper format
2. Call `calculateCompleteEDNAScore()` on quiz completion
3. Display results using `generateProfileSummary()`
4. Show recommendations from `generateRecommendations()`
5. Add export functionality
6. Implement personalization based on Layer 4 & 5 results
7. Add Layer 7 misalignment coaching

---

## Questions?

Refer to:
- `/SCORING_LAYERS_4_5_6_COMPLETE.md` - Detailed implementation docs
- `/lib/scoring-engine.ts` - Source code with inline documentation
- `/lib/complete-scoring.ts` - Orchestration and helpers
