# 🎨 EDNA 7-Layer Scoring - Visual Guide

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    EDNA 7-LAYER ASSESSMENT                       │
└─────────────────────────────────────────────────────────────────┘

LAYER 1: Core Identity (Architect/Alchemist/Blurred)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  Tagged answers ['architect'], ['alchemist'], ['blurred']
Process: Normalize scores, apply decision rules (50% threshold, 15% gap)
Output: Core type + mastery percentage
File:   /lib/scoring-engine.ts → calculateLayer1Score()

↓

LAYER 2: Subtype Refinement
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  Subtype selections
Process: Normalize, check 40% threshold + 12% gap
Output: Primary subtype + optional "leading to" secondary
File:   /lib/scoring-engine.ts → calculateLayer2Score()

↓

LAYER 3: Mirror Awareness
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  Tagged answers, core type from Layer 1
Process: Count mirror responses (0-2=Low, 3-4=Moderate, 5-7=High)
Output: Awareness level (33%, 66%, or 99%)
File:   /lib/scoring-engine.ts → calculateLayer3Score()

↓

LAYER 4: Learning Style Preferences ✨ NEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  Dimension-tagged answers
Process: Detect contradictions → assign adaptive labels
Output: 5 preferences (modality, approach, processing, environment, pace)
File:   /lib/scoring-engine.ts → calculateLayer4Score()

Dimensions:
├─ Modality:     visual/auditory/read-write/kinesthetic/multimodal
├─ Approach:     structured/exploratory/adaptive
├─ Processing:   concrete/abstract/flexible
├─ Environment:  individual/collaborative/adaptive
└─ Pace:         fast/slow/versatile

↓

LAYER 5: Neurodiversity Screening ✨ NEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  Trait-tagged responses (adhd/dyslexia/autism/sensory/none)
Process: Normalize scores, apply thresholds (≥60%, ≥40%, <30%)
Output: Flags + co-occurrence warnings + DISCLAIMER
File:   /lib/scoring-engine.ts → calculateLayer5Score()

Thresholds:
├─ ≥ 60% → PROBABLE flag → Recommend specialist
├─ ≥ 40% → POSSIBLE flag → Consider assessment
├─ < 30% → LOW likelihood
└─ ADHD + Dyslexia → Co-occurrence warning

⚠️  MUST DISPLAY: "This is a screening tool, not diagnostic"

↓

LAYER 6: Mindset & Personality ✨ NEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  3 dimensions (mindset, risk_tolerance, extraversion)
Process: Calculate normalized scores + deltas
Output: Mindset type, risk tolerance, extraversion, adaptability
File:   /lib/scoring-engine.ts → calculateLayer6Score()

Mindset Rules:
├─ Growth_norm ≥ 55% → "Growth mindset"
├─ Fixed_norm ≥ 55%  → "Fixed mindset"
└─ 45-55% range      → "Mixed/Situational"

Risk Tolerance: High/Moderate/Low (or Mixed if borderline)
Extraversion:   Extroverted/Introverted/Balanced

↓

LAYER 7: Meta-Beliefs & Values ✨ NEW
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Input:  6 value dimensions
Process: Normalize, detect dominant beliefs, detect conflicts, detect misalignments
Output: Value profile + dominant beliefs + conflicted beliefs + misalignments
File:   /lib/scoring-engine.ts → calculateLayer7Score()
        /lib/layer7-analysis.ts

6 Dimensions (0-100 scale):
├─ Growth Philosophy:    Craftsmanship ←────→ Bold Scaling
├─ Purpose Filter:       Profit-Focused ←───→ Mission-Driven
├─ Change Appetite:      Stability ←─────────→ Innovation
├─ Metrics Orientation:  Numbers-Averse ←───→ Numbers-Confident
├─ Social Worldview:     Competitive ←───────→ Collaborative
└─ Resource Worldview:   Scarcity ←──────────→ Abundance

Detection Criteria:
├─ Dominant Belief:     norm ≥ 40% AND gap ≥ 12%
├─ Conflicted Belief:   opposing beliefs both ≥ 30% → cognitive dissonance
└─ Misalignment:        cross-dimension conflict patterns

Conflicted Beliefs (Cognitive Dissonance):
├─ Bold Scaling + Craftsmanship    → Quality vs. Speed tension
├─ Mission + Profit                → Purpose vs. Returns tension
├─ Innovation + Stability          → Change vs. Consistency tension
├─ Numbers-Confident + Averse      → Data comfort conflict
├─ Contrarian + Competitive        → Differentiate vs. Compete tension
└─ Abundance + Scarcity            → Resource mindset conflict

Misalignment Patterns (Cross-Dimension):
├─ Speed + Scarcity           → Burnout risk
├─ Mission + Numbers-Averse   → Unproven impact
├─ Craftsmanship + Competitive → Paralysis by perfection
└─ Innovation + Scarcity      → Instability

↓

🎯 COMPLETE RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
File: /lib/complete-scoring.ts

Functions:
├─ calculateCompleteEDNAScore()  → All 7 layers
├─ generateProfileSummary()      → Human-readable profile
├─ generateRecommendations()     → Personalized next steps
└─ exportResults()               → JSON export
```

---

## 🔄 Data Flow Diagram

```
┌──────────────────┐
│  User Answers    │
│  Quiz Questions  │
└────────┬─────────┘
         │
         ├─── Layer 1 Questions → Tags: ['architect'|'alchemist'|'blurred']
         ├─── Layer 2 Questions → Subtype selection
         ├─── Layer 3 Questions → Mirror tags
         ├─── Layer 4 Questions → Dimension: modality/approach/etc.
         ├─── Layer 5 Questions → Trait: adhd/dyslexia/autism/sensory
         ├─── Layer 6 Questions → Dimension: mindset/risk/extraversion
         └─── Layer 7 Questions → Dimension: scaling/mission/etc.
         │
         ↓
┌────────────────────────────────┐
│ calculateCompleteEDNAScore()   │
│                                │
│  Orchestrates all 7 layers     │
│  Applies scoring algorithms    │
│  Detects patterns              │
└───────────┬────────────────────┘
            │
            ↓
┌───────────────────────────────────────────────────┐
│              CompleteEDNAResults                  │
├───────────────────────────────────────────────────┤
│  layer1: { core_type, mastery, scores }          │
│  layer2: { subtype, is_mixed, display_label }    │
│  layer3: { awareness_level, score }              │
│  layer4: { modality, approach, pace, ... }       │
│  layer5: { traits, flags, disclaimer }           │
│  layer6: { mindset, risk, extraversion }         │
│  layer7: { values, misalignments }               │
│  assessment_version, completed_at                │
└───────────┬───────────────────────────────────────┘
            │
            ├──→ generateProfileSummary()
            │    └─→ Markdown-formatted profile
            │
            ├──→ generateRecommendations()
            │    └─→ { learning[], development[], tools[] }
            │
            └──→ exportResults()
                 └─→ JSON string for storage
```

---

## 🎯 Scoring Algorithm Summary

### Layer 4: Contradiction Detection

```
IF user selects BOTH "visual" AND "auditory" modality
  → SET modality = "multimodal"

IF user selects BOTH "structured" AND "exploratory" approach
  → SET approach = "adaptive"

IF user selects BOTH "concrete" AND "abstract" processing
  → SET processing = "flexible"
```

### Layer 5: Threshold Logic

```
For each trait (adhd, dyslexia, autism, sensory):
  normalized = (trait_count / total_questions) * 100
  
  IF normalized ≥ 60%
    → FLAG as "PROBABLE" + recommend specialist
  
  ELSE IF normalized ≥ 40%
    → FLAG as "POSSIBLE" + suggest assessment
  
  ELSE IF normalized < 30%
    → FLAG as "LOW likelihood"

IF (adhd_flag AND dyslexia_flag)
  → WARN: "Co-occurrence possible"
```

### Layer 6: Mindset Delta

```
growth_norm = (growth_count / mindset_total) * 100
fixed_norm = (fixed_count / mindset_total) * 100
delta = growth_norm - fixed_norm

IF growth_norm ≥ 55%
  → mindset = "growth"

ELSE IF fixed_norm ≥ 55%
  → mindset = "fixed"

ELSE (45-55% range)
  → mindset = "mixed"
```

### Layer 7: Dominant Belief Detection

```
For each dimension:
  normalized = (belief_count / total_questions) * 100
  
  IF top_belief_norm ≥ 40% AND (top_belief_norm - second_belief_norm) ≥ 12%
    → is_dominant = TRUE
  ELSE
    → is_dominant = FALSE
```

### Layer 7: Conflicted Belief Detection

```
For each dimension:
  Calculate normalized % for each belief
  
  For each opposing belief pair:
    IF (belief1_norm ≥ 30% AND belief2_norm ≥ 30%)
      → FLAG as "cognitive_dissonance"
      → GENERATE coaching prompt
      
Example:
  Bold Scaling: 40%
  Craftsmanship: 35%
  → CONFLICT: "You value both rapid growth and quality. How can you build stage gates?"
```

### Layer 7: Misalignment Detection (Cross-Dimension)

```
IF (growth_philosophy > 70 AND resource_worldview < 30)
  → MISALIGNMENT: "Speed + Scarcity"
  → IMPACT: "Leads to burnout or financial strain"
  → REMEDY: "Add stage gates and stability checks"
```

---

## 📋 Question Format Cheat Sheet

```typescript
// LAYER 1
{ 
  question_id: 'L1_Q1',
  selected: 'option_value',
  layer: 1,
  tags: ['architect']  // ← Required!
}

// LAYER 3
{ 
  question_id: 'L3_Q2',
  selected: 'option_value',
  layer: 3,
  tags: ['alchemist']  // ← Required!
}

// LAYER 4
{ 
  question_id: 'L4_Q1',
  selected: 'visual',
  layer: 4,
  dimension: 'modality'  // ← Required!
}

// LAYER 5
{ 
  question_id: 'L5_Q1',
  selected: 'adhd',
  layer: 5,
  dimension: 'neurodiversity'
}

// LAYER 6
{ 
  question_id: 'L6_Q1',
  selected: 'growth',
  layer: 6,
  dimension: 'mindset'  // ← Required!
}

// LAYER 7
{ 
  question_id: 'L7_Q1',
  selected: 'bold_scaling',
  layer: 7,
  dimension: 'scaling'  // ← Required!
}
```

---

## 🎨 Results Display Template

```
┌─────────────────────────────────────────────────┐
│         YOUR EDNA PROFILE                       │
├─────────────────────────────────────────────────┤
│                                                 │
│  🎯 CORE TYPE: Architect                        │
│     Mastery: 72%                                │
│                                                 │
│  🔧 SUBTYPE: Master Strategist (48%)            │
│                                                 │
│  👁️ MIRROR AWARENESS: High (99%)                │
│     You correctly identified 6 of 7 responses   │
│                                                 │
├─────────────────────────────────────────────────┤
│  📚 LEARNING STYLE                              │
├─────────────────────────────────────────────────┤
│  • Modality: Visual                             │
│  • Approach: Structured                         │
│  • Processing: Concrete                         │
│  • Environment: Individual                      │
│  • Pace: Fast                                   │
│                                                 │
│  💡 Your learning style is visual with a        │
│     structured approach...                      │
│                                                 │
├─────────────────────────────────────────────────┤
│  🧠 ACCESSIBILITY PREFERENCES                   │
├─────────────────────────────────────────────────┤
│  ⚠️ Possible ADHD features present —            │
│     consider formal assessment                  │
│                                                 │
│  ℹ️  This is a screening tool, not diagnostic   │
│                                                 │
├─────────────────────────────────────────────────┤
│  🌱 MINDSET & PERSONALITY                       │
├─────────────────────────────────────────────────┤
│  • Mindset: Growth                              │
│  • Risk Tolerance: Moderate                     │
│  • Energy Style: Introverted                    │
│                                                 │
│  You have a growth mindset with moderate        │
│  risk tolerance...                              │
│                                                 │
├─────────────────────────────────────────────────┤
│  💎 META-BELIEFS & VALUES                       │
├─────────────────────────────────────────────────┤
│  Core Values:                                   │
│  • Bold Scaling                                 │
│  • Mission-Driven                               │
│  • Innovation-Oriented                          │
│                                                 │
│  ⚠️ Watch for: Speed + Scarcity                 │
│     Rapid expansion while fearing resources     │
│     → Add stage gates and stability checks      │
│                                                 │
├─────────────────────────────────────────────────┤
│  🎯 PERSONALIZED RECOMMENDATIONS                │
├─────────────────────────────────────────────────┤
│  📖 Learning:                                   │
│  • Focus on video tutorials and diagrams        │
│  • Use quick-start guides                       │
│                                                 │
│  🌱 Development:                                │
│  • Add stage gates to rapid scaling             │
│                                                 │
│  🔧 Tools:                                      │
│  • Task timers                                  │
│  • Gamified progress tracking                   │
│  • Visual dashboards                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🛠️ Code Usage Examples

### Complete Scoring

```typescript
import { calculateCompleteEDNAScore } from './lib/complete-scoring';

const results = calculateCompleteEDNAScore(answers);
```

### Access Specific Layers

```typescript
// Layer 4: Learning preferences
const { modality_preference, pace } = results.layer4;

// Layer 5: Neurodiversity
const { flags, disclaimer } = results.layer5;
// MUST display disclaimer!

// Layer 6: Personality
const { mindset, risk_tolerance } = results.layer6;

// Layer 7: Values
const { misalignments } = results.layer7;
```

### Generate Outputs

```typescript
import { 
  generateProfileSummary, 
  generateRecommendations,
  exportResults 
} from './lib/complete-scoring';

// Human-readable summary
const summary = generateProfileSummary(results);

// Personalized recommendations
const recs = generateRecommendations(results);
// { learning: [...], development: [...], tools: [...] }

// Export for storage
const json = exportResults(results);
```

---

## ✅ Integration Checklist

```
Pre-Integration:
□ Review /SCORING_LAYERS_4_5_6_COMPLETE.md
□ Review /lib/SCORING_QUICK_REFERENCE.md
□ Understand answer format requirements

EDNAQuiz.tsx Updates:
□ Import calculateCompleteEDNAScore
□ Collect answers with proper tagging
  □ Layer 1: tags array
  □ Layer 3: tags array  
  □ Layer 4: dimension property
  □ Layer 5: trait values
  □ Layer 6: dimension property
  □ Layer 7: dimension property
□ Call scoring on completion
□ Pass results to display component

QuizResults.tsx Updates:
□ Accept CompleteEDNAResults prop
□ Display Layer 4 learning preferences
□ Display Layer 5 with DISCLAIMER
□ Display Layer 6 personality
□ Display Layer 7 values + misalignments

New Components:
□ PersonalizedRecommendations.tsx
□ ExportProfile.tsx

Personalization:
□ Use Layer 4 for content delivery
□ Use Layer 5 for UI accommodations
□ Use Layer 7 for coaching tone

Testing:
□ Test all layers individually
□ Test edge cases (contradictions, borderlines)
□ Test Layer 5 thresholds and disclaimers
□ Test Layer 7 misalignment detection
□ Integration testing
```

---

## 📊 File Structure Map

```
/lib/
├── scoring-engine.ts          ← Core scoring functions
│   ├── calculateLayer1Score()
│   ├── calculateLayer2Score()
│   ��── calculateLayer3Score()
│   ├── calculateLayer4Score()  ✨ NEW
│   ├── calculateLayer5Score()  ✨ NEW
│   ├── calculateLayer6Score()  ✨ NEW
│   └── calculateLayer7Score()  ✨ NEW
│
├── complete-scoring.ts         ✨ NEW ← Orchestration
│   ├── calculateCompleteEDNAScore()
│   ├── generateProfileSummary()
│   ├── generateRecommendations()
│   └── exportResults()
│
├── layer4-7-questions.ts      ← Question data
│   ├── layer4Questions (5 questions)
│   ├── layer5Questions (5 questions) ✨ EXPANDED
│   ├── layer6Questions (6 questions) ✨ EXPANDED
│   └── layer7Questions (6 questions)
│
├── layer7-analysis.ts         ← Existing Layer 7 system
│
└── SCORING_QUICK_REFERENCE.md ✨ NEW ← Usage guide

/
├── SCORING_LAYERS_4_5_6_COMPLETE.md        ✨ NEW
├── IMPLEMENTATION_COMPLETE_LAYERS_4_5_6_7.md ✨ NEW
└── SCORING_VISUAL_GUIDE.md                  ✨ NEW (this file)
```

---

## 🎉 You're Ready!

Everything needed for Layers 4, 5, 6, and 7 scoring is **complete and documented**.

**Next**: Integrate with EDNAQuiz.tsx and update the results display! 🚀
