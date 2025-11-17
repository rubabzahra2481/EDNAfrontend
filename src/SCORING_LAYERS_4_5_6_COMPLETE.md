# EDNA Scoring Layers 4, 5, 6 & 7 - Complete Implementation

## Overview

This document describes the complete implementation of the EDNA 7-layer assessment scoring system, with detailed specifications for Layers 4, 5, 6, and 7.

## Layer 4: Learning Style Preferences

### Purpose
Identifies how users prefer to learn and process information to personalize the learning experience.

### Dimensions Assessed

1. **Modality Preference**
   - Options: Visual, Auditory, Read/Write, Kinesthetic, Multimodal
   - Logic: If user selects contradictory responses across multiple questions, mark as multimodal
   
2. **Approach**
   - Options: Structured, Exploratory, Adaptive
   - Logic: If user shows both structured and exploratory preferences, mark as Adaptive
   
3. **Concept Processing**
   - Options: Concrete, Abstract, Flexible
   - Logic: If user prefers both concrete and abstract, mark as Flexible
   
4. **Working Environment**
   - Options: Individual, Collaborative, Adaptive
   - Logic: If user shows preferences for both solo and group work, mark as Adaptive
   
5. **Pace**
   - Options: Fast, Slow, Versatile
   - Logic: If user shows both fast and slow preferences, mark as Versatile

### Implementation Details

**File**: `/lib/scoring-engine.ts` - `calculateLayer4Score()`

**Input**: Quiz answers tagged with dimension (modality, approach, concept_processing, working_environment, pace)

**Output**: 
```typescript
{
  modality_preference: string;
  approach: string;
  concept_processing: string;
  working_environment: string;
  pace: string;
  learning_style_summary: string;
}
```

**Example Summary**: 
"Your learning style is visual with a structured approach. You prefer concrete concepts in an individual environment at a fast pace."

---

## Layer 5: Neurodiversity Screening

### Purpose
A screening tool (not diagnostic) to identify learning preferences and potential neurodivergent traits for accessibility accommodations.

### Legal/Ethical Disclaimer
**IMPORTANT**: This is a screening tool, not diagnostic. Must display disclaimer: "This is a screening tool, not diagnostic. Please consult with qualified professionals for formal assessment."

### Traits Screened

1. **ADHD** - Attention patterns, focus, task management
2. **Dyslexia** - Reading preferences, text processing
3. **Autism Spectrum** - Structure preferences, routine needs
4. **Sensory Processing** - Environmental sensitivity

### Scoring Criteria

**Normalized Score Calculation**:
```
normalized_score = (trait_count / total_questions) * 100
```

**Flag Thresholds**:
- **Probable Flag**: normalized ≥ 60% → "Probable [trait] traits — recommend referral to specialist"
- **Possible Flag**: normalized ≥ 40% → "Possible [trait] features present — consider formal assessment / accommodations"
- **Low Likelihood**: normalized < 30% → "Low likelihood of core traits"

**Co-occurrence Detection**:
- If both ADHD and Dyslexia flags appear → Display warning: "Both ADHD and Dyslexia flags appear — co-occurrence possible (very common). Recommend multi-domain evaluation."

### Implementation Details

**File**: `/lib/scoring-engine.ts` - `calculateLayer5Score()`

**Questions**: 5 questions (expandable), each offering trait-specific responses

**Output**:
```typescript
{
  traits_detected: string[];
  normalized_scores: { [trait: string]: number };
  flags: {
    trait: string;
    level: 'probable' | 'possible' | 'low';
    message: string;
  }[];
  co_occurrence_warning?: string;
  disclaimer: string;
}
```

---

## Layer 6: Mindset and Personality

### Purpose
Assesses psychological patterns that influence learning and business behavior.

### Dimensions Assessed

1. **Growth vs Fixed Mindset**
   - Growth responses: "opportunity to learn", "feedback helps me improve"
   - Fixed responses: "either have skills or don't", "feel defensive"
   - Mixed responses: "some skills can develop, others feel fixed"

2. **Risk Tolerance**
   - High: "comfortable with uncertainty", "invest heavily for upside"
   - Moderate: "calculated risks", "balance gains against risks"
   - Low: "prefer proven paths", "prioritize stability"

3. **Extraversion**
   - Extroverted: "gain energy from interaction", "thrive at networking"
   - Introverted: "recharge through solo work", "prefer one-on-one"
   - Ambivert/Balanced: "adapt to both", "can network but value reflection"

### Scoring Criteria

**Mindset Decision Rules**:
```
Growth_norm = (growth_count / mindset_total) * 100
Fixed_norm = (fixed_count / mindset_total) * 100
Delta = Growth_norm - Fixed_norm

IF Growth_norm ≥ 55% → "Growth mindset"
IF Fixed_norm ≥ 55% → "Fixed mindset"
IF between 45-55% → "Mixed mindset / situational"
```

**Risk Tolerance**:
- Choose categorical top score (High/Moderate/Low)
- If top score - second score < 20% → mark as "mixed"

**Extraversion**:
- Choose top category
- Map "ambivert" to "balanced"

**Adaptability Score**:
- Count total "mixed" or "ambivert" responses across all dimensions
- Higher adaptability = more flexible personality

### Implementation Details

**File**: `/lib/scoring-engine.ts` - `calculateLayer6Score()`

**Questions**: 6 questions (2 per dimension)

**Output**:
```typescript
{
  mindset: string; // 'growth', 'fixed', 'mixed'
  mindset_details: {
    growth_norm: number;
    fixed_norm: number;
    delta: number;
  };
  risk_tolerance: string; // 'high', 'moderate', 'low', 'mixed'
  extraversion: string; // 'extroverted', 'introverted', 'balanced'
  adaptability: number;
  personality_summary: string;
}
```

---

## Layer 7: Meta-Beliefs & Values

### Purpose
Identifies deep-seated beliefs and values that drive business decisions and can create misalignment patterns.

### Six Dimensions (0-100 Scale)

1. **Growth Philosophy**: Craftsmanship (0) ↔ Speed/Bold Scaling (100)
2. **Purpose Filter**: Profit-Focused (0) ↔ Mission-Driven (100)
3. **Change Appetite**: Stability (0) ↔ Innovation (100)
4. **Metrics Orientation**: Numbers-Averse (0) ↔ Numbers-Confident (100)
5. **Social Worldview**: Competitive (0) ↔ Collaborative (100)
6. **Resource Worldview**: Scarcity (0) ↔ Abundance (100)

### Scoring Criteria

**Scoring**:
- Map options to belief categories (e.g., "bold scaling", "quality-first", "numbers-confidence", "scarcity/abundance", etc.)
- Normalize and report top 1-3 beliefs

**Label Rules**:

1. **Dominant meta-belief**: belief_norm ≥ 40% AND gap ≥12%
   - Clear, strong belief in one direction
   
2. **Conflicted belief**: Two beliefs both ≥30% AND opposing
   - Example: "growth is priority" AND "growth compromises quality"
   - Flag as cognitive dissonance
   - Offer coaching prompts to help resolve the conflict

### Misalignment Detection

Common failure patterns (cross-dimension conflicts):

1. **Speed + Scarcity**: Rapid expansion while fearing resource depletion → Burnout/financial strain
2. **Mission + Numbers-Averse**: Deep purpose but weak proof of impact → Unvalidated claims
3. **Craftsmanship + Competitive**: Paralysis by perfection while trying to "win" → Being outpaced
4. **Innovation + Scarcity**: Constant pivoting without stability → Team fatigue

### Conflicted Beliefs (Cognitive Dissonance)

Within-dimension conflicts where opposing beliefs are both strong:

- **Growth**: Bold scaling (≥30%) + Craftsmanship (≥30%) → "How can you build stage gates that protect quality while maintaining momentum?"
- **Purpose**: Mission-driven (≥30%) + Profit-focused (≥30%) → "How might your mission drive sustainable profitability?"
- **Change**: Innovation (≥30%) + Stability (≥30%) → "Can you create innovation windows within stable frameworks?"
- **Metrics**: Numbers-confident (≥30%) + Numbers-averse (≥30%) → "What stories do your numbers tell?"
- **Market**: Contrarian (≥30%) + Competitive (≥30%) → "Where does differentiation create competitive advantage?"
- **Resources**: Abundance (≥30%) + Scarcity (≥30%) → "What evidence supports abundance in your market?"

### Implementation Details

**Files**: 
- `/lib/layer7-analysis.ts` - Core scoring and misalignment detection
- `/lib/scoring-engine.ts` - Integration function `calculateLayer7Score()`

**Output**:
```typescript
{
  growth_philosophy: number;
  purpose_filter: number;
  change_appetite: number;
  metrics_orientation: number;
  social_worldview: number;
  resource_worldview: number;
  dominant_beliefs: BeliefCategory[]; // norm ≥ 40% AND gap ≥ 12%
  conflicted_beliefs: ConflictedBelief[]; // opposing beliefs both ≥ 30%
  misalignments: {
    type: string;
    description: string;
    impact: string;
    remedy: string;
  }[];
  value_profile_summary: string;
}
```

**BeliefCategory Interface**:
```typescript
{
  category: string; // e.g., "scaling: bold_scaling"
  normalized_score: number; // percentage
  is_dominant: boolean; // true if norm ≥ 40% AND gap ≥ 12%
}
```

**ConflictedBelief Interface**:
```typescript
{
  dimension: string;
  belief1: string;
  belief1_norm: number;
  belief2: string;
  belief2_norm: number;
  conflict_type: 'cognitive_dissonance';
  coaching_prompt: string;
}
```

---

## Complete Scoring Orchestration

### File: `/lib/complete-scoring.ts`

This file orchestrates all 7 layers and provides:

1. **`calculateCompleteEDNAScore()`** - Runs all 7 layers in sequence
2. **`generateProfileSummary()`** - Creates human-readable summary
3. **`generateRecommendations()`** - Provides personalized learning, development, and tool recommendations
4. **`exportResults()`** - JSON export for storage

### Result Interface

```typescript
interface CompleteEDNAResults {
  layer1: Layer1Result;  // Core Type
  layer2: Layer2Result;  // Subtype
  layer3: Layer3Result;  // Mirror Awareness
  layer4: Layer4Result;  // Learning Style
  layer5: Layer5Result;  // Neurodiversity
  layer6: Layer6Result;  // Mindset & Personality
  layer7: Layer7Result;  // Meta-Beliefs & Values
  assessment_version: string;
  completed_at: string;
  total_questions: number;
}
```

---

## Question Files

### Layer 4 Questions
**File**: `/lib/layer4-7-questions.ts` - `layer4Questions`
- 5 questions covering all 5 dimensions
- Each question tagged with dimension name

### Layer 5 Questions
**File**: `/lib/layer4-7-questions.ts` - `layer5Questions`
- 5 questions assessing neurodiversity traits
- Each option maps to specific trait (adhd, dyslexia, autism, sensory, none)

### Layer 6 Questions
**File**: `/lib/layer4-7-questions.ts` - `layer6Questions`
- 6 questions (2 per dimension: mindset, risk_tolerance, extraversion)
- Each option tagged with category value

### Layer 7 Questions
**File**: `/lib/layer4-7-questions.ts` - `layer7Questions`
- 6 questions covering all value dimensions
- Options scored on spectrum (e.g., bold_scaling vs craftsmanship)

---

## Integration with Quiz Component

The `EDNAQuiz.tsx` component should:

1. Present questions from all layers in sequence
2. Collect answers with proper tagging (layer, dimension, tags)
3. Call `calculateCompleteEDNAScore()` on completion
4. Display results using `generateProfileSummary()`
5. Provide recommendations via `generateRecommendations()`

---

## Testing Recommendations

### Layer 4 Testing
- Test multimodal detection with contradictory responses
- Verify adaptive/flexible tagging logic
- Confirm summary generation

### Layer 5 Testing
- Test threshold calculations (60%, 40%, 30%)
- Verify co-occurrence warning triggers
- Ensure disclaimer always displays
- Test with all traits at different levels

### Layer 6 Testing
- Test mindset delta calculations
- Verify borderline cases (45-55% range)
- Test risk tolerance "mixed" detection
- Confirm adaptability counting

### Layer 7 Testing
- Test all 6 dimension calculations
- Verify misalignment pattern detection
- Test with extreme polarized values
- Test with balanced/moderate values

---

## Accessibility & Ethics

1. **Layer 5 Disclaimer**: MUST always display legal/ethical disclaimer
2. **Non-Diagnostic**: Clearly communicate screening vs diagnosis
3. **Professional Referral**: Recommend specialist consultation for probable/possible flags
4. **Privacy**: Sensitive neurodiversity data requires secure handling
5. **Accommodations**: Use Layer 5 results to personalize learning experience, not to label

---

## Next Steps

1. ✅ Layer 4 scoring implemented
2. ✅ Layer 5 screening implemented with proper disclaimers
3. ✅ Layer 6 mindset/personality scoring implemented
4. ✅ Layer 7 integration with existing analysis
5. ✅ Complete scoring orchestration created
6. 🔄 **NEXT**: Integrate with EDNAQuiz.tsx component
7. 🔄 Update results display components
8. 🔄 Add personalized recommendations to UI
9. 🔄 Implement data export functionality
10. 🔄 Add comprehensive testing

---

## Files Modified/Created

### Created
- `/lib/complete-scoring.ts` - Complete scoring orchestration
- `/SCORING_LAYERS_4_5_6_COMPLETE.md` - This documentation

### Modified
- `/lib/scoring-engine.ts` - Added Layer 4, 5, 6, 7 scoring functions and interfaces
- `/lib/layer4-7-questions.ts` - Expanded Layer 5 and Layer 6 questions

### Existing (Utilized)
- `/lib/layer7-analysis.ts` - Layer 7 scoring and misalignment detection
- `/lib/layer1-questions.ts` - Layer 1 questions
- `/lib/layer3-questions.ts` - Layer 3 questions

---

## Summary

The complete 7-layer EDNA assessment scoring system is now fully implemented with:

- ✅ Comprehensive scoring logic for all layers
- ✅ Proper data structures and type safety
- ✅ Legal/ethical considerations (Layer 5 disclaimer)
- ✅ Misalignment detection (Layer 7)
- ✅ Personalized recommendations generation
- ✅ Profile summary generation
- ✅ Export functionality for backend storage

The system is ready for integration with the quiz UI component and results display.
