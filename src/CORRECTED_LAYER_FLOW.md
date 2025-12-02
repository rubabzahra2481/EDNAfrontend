# CORRECTED EDNA Quiz Layer Flow ✅

## Executive Summary

**Issue**: Previous implementation incorrectly skipped Layer 2 for Blurred users and showed Layer 3 to Blurred users.

**Correction**: 
- **Layer 2**: ALL core types (Architect, Alchemist, AND Blurred) get Layer 2 questions
- **Layer 3**: ONLY Architect and Alchemist get Layer 3 (Blurred SKIPS Layer 3 - no mirror pair)

**Status**: ✅ **CORRECTED**

---

## Correct Quiz Flow

### **Architect Path** (54 questions)
```
Layer 1: Core Identity (8 questions)
   → Result: ARCHITECT
   ↓
Layer 2: Architect Subtype (6 questions)
   → Subtypes: master_strategist, systemised_builder, internal_analyser
   ↓
Layer 3: Architect Mirror Awareness (7 questions)
   → Tests recognition of Alchemist (opposite) behavior
   ↓
Layer 4: Learning Style (10 questions)
   ↓
Layer 5: Neurodiversity (7 questions)
   ↓
Layer 6: Mindset & Personality (8 questions)
   ↓
Layer 7: Meta-Beliefs & Values (8 questions)
   ↓
RESULTS PAGE

Total: 54 questions
```

### **Alchemist Path** (54 questions)
```
Layer 1: Core Identity (8 questions)
   → Result: ALCHEMIST
   ↓
Layer 2: Alchemist Subtype (6 questions)
   → Subtypes: visionary_oracle, energetic_empath, ultimate_alchemist
   ↓
Layer 3: Alchemist Mirror Awareness (7 questions)
   → Tests recognition of Architect (opposite) behavior
   ↓
Layer 4: Learning Style (10 questions)
   ↓
Layer 5: Neurodiversity (7 questions)
   ↓
Layer 6: Mindset & Personality (8 questions)
   ↓
Layer 7: Meta-Beliefs & Values (8 questions)
   ↓
RESULTS PAGE

Total: 54 questions
```

### **Blurred Path** (47 questions) ✅ CORRECTED
```
Layer 1: Core Identity (8 questions)
   → Result: BLURRED
   ↓
Layer 2: Blurred Subtype (6 questions) ✅ NOT SKIPPED
   → Subtypes: overthinker, performer, self_forsaker, self_betrayer
   ↓
Layer 3: SKIPPED ✅ (No mirror pair for Blurred)
   ↓
Layer 4: Learning Style (10 questions)
   ↓
Layer 5: Neurodiversity (7 questions)
   ↓
Layer 6: Mindset & Personality (8 questions)
   ↓
Layer 7: Meta-Beliefs & Values (8 questions)
   ↓
RESULTS PAGE

Total: 47 questions (8 + 6 + 0 + 10 + 7 + 8 + 8)
```

---

## Layer Breakdown

### **Layer 1: Core Identity** (8 questions)
**Purpose**: Determine if user is Architect, Alchemist, or Blurred

**Shown to**: Everyone

**Scoring**: 
- Counts Architect vs Alchemist responses
- If difference < 15% → Blurred
- If difference ≥ 15% → Dominant type (Architect or Alchemist)

**Example Questions**:
- Q1: Project approach (systematic vs creative)
- Q2: Decision basis (data vs intuition)
- Q3: Validation preference (metrics vs feeling)
- ... (8 total)

---

### **Layer 2: Subtype Refinement** (6 questions)
**Purpose**: Determine specific subtype within core type

**Shown to**: Everyone (questions vary by Layer 1 result)

**Architect Subtypes**:
- Master Strategist (Translation-focused)
- Systemised Builder (Translation-focused)
- Internal Analyzer (Governance-focused)

**Alchemist Subtypes**:
- Visionary Oracle (Translation-focused)
- Energetic Empath (Translation-focused)
- Ultimate Alchemist (mixed)

**Blurred Subtypes**: ✅ NEW
- **Overthinker**: Over-analyzes, struggles with action
- **Performer**: Projects confidence, hides uncertainty
- **Self-Forsaker**: Abandons own approach for others'
- **Self-Betrayer**: Builds structure without emotional investment

**Example Questions** (Blurred):
- Q7: "You're asked to lead a routine task. How do you show up?"
- Q8: "A major opportunity opens up, but timeline is tight..."
- ... (6 total)

---

### **Layer 3: Mirror Awareness** (7 questions for Arch/Alch, 0 for Blurred)
**Purpose**: Test ability to recognize and work with opposite type

**Shown to**: Architect and Alchemist ONLY

**SKIPPED for**: Blurred ✅ (No clear opposite/mirror pair)

**Architect Questions** (7 questions):
- "Someone opposite to you (Alchemist) would..."
- Tests recognition of creative, intuitive, experimental behavior

**Alchemist Questions** (7 questions):
- "Someone opposite to you (Architect) would..."
- Tests recognition of systematic, analytical, structured behavior

**Blurred**: No questions (Layer 3 completely skipped)

---

### **Layer 4: Learning Style** (10 questions)
**Purpose**: Assess learning preferences across 5 dimensions

**Shown to**: Everyone

**5 Assessments**:

1. **Modality Preference (VARK)**:
   - Visual learner
   - Auditory learner
   - Read/Write learner
   - Kinesthetic learner
   - Multimodal learner

2. **Approach**:
   - Structured approach
   - Exploratory approach
   - Global (open to both)

3. **Concept Processing**:
   - Concrete concepts
   - Abstract concepts

4. **Working Environment**:
   - Individual learning
   - Collaborative learning

5. **Pace**:
   - Fast learner
   - Slow learner
   - Adaptive learner

**Example Questions**:
- Q1: "How do you prefer to learn new material?" (Modality)
- Q2: "When tackling a new concept, do you prefer..." (Approach)
- Q3: "Do you learn better with..." (Concept Processing)
- Q4: "Do you prefer to study..." (Working Environment)
- Q5: "What pace works best for you?" (Pace)
- ... (10 total)

---

### **Layer 5: Neurodiversity** (7 questions)
**Purpose**: Assess neurodivergent traits and accessibility needs

**Shown to**: Everyone

**Assesses**:
- ADHD traits
- ASD (Autism Spectrum) traits
- Dyslexia traits
- Sensory sensitivity
- Other neurodivergent characteristics

**Example Questions**:
- Q1: "Do you identify with any neurodivergent traits?"
- Q2: "How do you handle sensory input?"
- Q3: "Do you prefer detailed instructions or flexibility?"
- ... (7 total)

**Scoring**: Generates accessibility adaptations and capability profile

---

### **Layer 6: Mindset & Personality** (8 questions)
**Purpose**: Assess mindset, risk tolerance, and social preferences

**Shown to**: Everyone

**3 Assessments**:

1. **Mindset**:
   - Growth mindset
   - Fixed mindset
   - Mixed mindset

2. **Risk Tolerance**:
   - High risk tolerance
   - Moderate risk tolerance
   - Low risk tolerance

3. **Extraversion**:
   - Introvert
   - Extrovert
   - Ambivert

**Example Questions**:
- Q1: "When you face a challenge, do you believe..." (Mindset)
- Q2: "How comfortable are you with uncertainty?" (Risk Tolerance)
- Q3: "In social settings, do you..." (Extraversion)
- ... (8 total)

---

### **Layer 7: Meta-Beliefs & Values** (8 questions)
**Purpose**: Assess deep beliefs about business and scaling

**Shown to**: Everyone

**6 Dimensions**:

1. **Scaling Orientation**:
   - Bold scaling
   - Craftsmanship
   - Both

2. **Mission Orientation**:
   - Mission-driven
   - Profit-driven
   - Both

3. **Innovation Orientation**:
   - First-mover
   - Fast-follower
   - Both

4. **Numbers Orientation**:
   - Numbers-confident
   - Numbers-developing
   - Numbers-resistant

5. **Abundance Orientation**:
   - Optimistic
   - Realistic
   - Cautious

6. **Market Orientation**:
   - Blue ocean
   - Red ocean
   - Both

**Example Questions**:
- Q1: "What's your stance on growth?" (Scaling)
- Q2: "What drives you most?" (Mission)
- Q3: "How do you approach innovation?" (Innovation)
- ... (8 total)

**Scoring**: Detects conflicted beliefs and generates value profile

---

## Implementation Changes Made

### 1. **EDNAQuiz.tsx** ✅

**Before** (INCORRECT):
```typescript
// Blurred types skip Layer 2
const layer2Qs = coreType === 'blurred' ? [] : getLayer2Questions(coreType);

// Load appropriate Layer 3 questions
const layer3Qs = getLayer3Questions(coreType);
```

**After** (CORRECT):
```typescript
// ALL core types get Layer 2 questions (Architect, Alchemist, AND Blurred)
const layer2Qs = getLayer2Questions(coreType);

// Blurred types SKIP Layer 3 (no mirror pair)
const layer3Qs = coreType === 'blurred' ? [] : getLayer3Questions(coreType);
```

### 2. **Helper Functions** ✅

Added support for Blurred subtypes:

**determineFramingOrder()**:
```typescript
overthinker: ['analytics', 'strategy', 'narrative', 'sop', 'partner'],
performer: ['narrative', 'partner', 'strategy', 'analytics', 'sop'],
self_forsaker: ['strategy', 'sop', 'analytics', 'narrative', 'partner'],
self_betrayer: ['strategy', 'narrative', 'analytics', 'sop', 'partner']
```

**determineDefaultArtifacts()**:
```typescript
overthinker: ['notebook', 'roadmap', 'narrative_brief'],
performer: ['narrative_brief', 'trac', 'roadmap'],
self_forsaker: ['sop', 'roadmap', 'notebook'],
self_betrayer: ['roadmap', 'notebook', 'narrative_brief']
```

**determineSprintStyle()**:
```typescript
overthinker: 'reflection_cycle',
performer: 'momentum_sprint',
self_forsaker: 'structured_flow',
self_betrayer: 'adaptive_sprint'
```

### 3. **Subtype Profile Handling** ✅

```typescript
// Blurred subtypes don't have profiles in subtype-data.ts
const blurredSubtypes = ['overthinker', 'performer', 'self_forsaker', 'self_betrayer'];
const subtypeProfile = blurredSubtypes.includes(subtype) ? null : getSubtypeProfile(subtype);
```

---

## Question Counts by Path

| Path | L1 | L2 | L3 | L4 | L5 | L6 | L7 | **Total** |
|------|----|----|----|----|----|----|----|----|
| **Architect** | 8 | 6 | 7 | 10 | 7 | 8 | 8 | **54** |
| **Alchemist** | 8 | 6 | 7 | 10 | 7 | 8 | 8 | **54** |
| **Blurred** | 8 | 6 | 0 ✅ | 10 | 7 | 8 | 8 | **47** |

---

## Blurred Subtype Details

### **Overthinker**
**Characteristics**:
- Over-analyzes before taking action
- Struggles to commit to a direction
- Combines analytical depth with creative paralysis

**Default Settings**:
- **Framing**: Analytics → Strategy → Narrative → SOP → Partner
- **Artifacts**: Notebook, Roadmap, Narrative Brief
- **Sprint**: Reflection Cycle (extra time for analysis)

### **Performer**
**Characteristics**:
- Projects confidence even when uncertain
- Acts energetically but may lack internal clarity
- Combines outward momentum with inner doubt

**Default Settings**:
- **Framing**: Narrative → Partner → Strategy → Analytics → SOP
- **Artifacts**: Narrative Brief, TRAC, Roadmap
- **Sprint**: Momentum Sprint (maintains forward motion)

### **Self-Forsaker**
**Characteristics**:
- Abandons own approach to follow others
- Creates systems but without personal conviction
- Combines structure with self-doubt

**Default Settings**:
- **Framing**: Strategy → SOP → Analytics → Narrative → Partner
- **Artifacts**: SOP, Roadmap, Notebook
- **Sprint**: Structured Flow (follows established patterns)

### **Self-Betrayer**
**Characteristics**:
- Builds structure without emotional investment
- Appears systematic but lacks internal alignment
- Combines planning with emotional disconnect

**Default Settings**:
- **Framing**: Strategy → Narrative → Analytics → SOP → Partner
- **Artifacts**: Roadmap, Notebook, Narrative Brief
- **Sprint**: Adaptive Sprint (flexible approach)

---

## Testing Checklist

### ✅ Test 1: Architect Path
- [ ] Complete Layer 1 as Architect
- [ ] Verify Layer 2 Architect questions appear (6 questions)
- [ ] Verify Layer 3 Architect questions appear (7 questions)
- [ ] Complete Layers 4-7 (33 questions)
- [ ] Total: 54 questions
- [ ] Results show Architect subtype

### ✅ Test 2: Alchemist Path
- [ ] Complete Layer 1 as Alchemist
- [ ] Verify Layer 2 Alchemist questions appear (6 questions)
- [ ] Verify Layer 3 Alchemist questions appear (7 questions)
- [ ] Complete Layers 4-7 (33 questions)
- [ ] Total: 54 questions
- [ ] Results show Alchemist subtype

### ✅ Test 3: Blurred Path (CRITICAL)
- [ ] Complete Layer 1 as Blurred (balanced answers)
- [ ] Verify Layer 2 Blurred questions appear (6 questions) ✅
- [ ] Verify Layer 3 is SKIPPED (jumps to Layer 4) ✅
- [ ] Complete Layers 4-7 (33 questions)
- [ ] Total: 47 questions ✅
- [ ] Results show Blurred subtype (overthinker/performer/self_forsaker/self_betrayer)

---

## Results Page Structure

After completing ALL 7 layers, the results page shows:

### **Core Type Section**
- Core type (Architect/Alchemist/Blurred)
- Core type mastery percentage
- Raw scores (Architect vs Alchemist points)

### **Subtype Section**
- Primary subtype
- Subtype mastery percentage
- Subtype description and characteristics

### **Mirror Awareness Section** (Architect/Alchemist only)
- Mirror awareness level (Low/Moderate/High)
- Mirror awareness score (0-100%)
- Recognition score (how well they identify opposite behavior)
- **Blurred users**: This section is skipped or shows "N/A - No mirror pair"

### **Learning Style Section**
- Modality preference (Visual/Auditory/Read-Write/Kinesthetic/Multimodal)
- Approach (Structured/Exploratory/Global)
- Concept processing (Concrete/Abstract)
- Working environment (Individual/Collaborative)
- Pace (Fast/Slow/Adaptive)

### **Neurodiversity Section**
- Identified traits (ADHD/ASD/Dyslexia/Sensory/None)
- Accessibility adaptations
- Capability strengths and support needs

### **Mindset & Personality Section**
- Mindset (Growth/Fixed/Mixed)
- Risk tolerance (High/Moderate/Low)
- Extraversion (Introvert/Extrovert/Ambivert)

### **Meta-Beliefs & Values Section**
- Scaling orientation
- Mission orientation
- Innovation orientation
- Numbers orientation
- Abundance orientation
- Market orientation
- Conflicted beliefs (if any detected)

### **Personalized Recommendations**
- Learning path suggestions
- Development priorities
- Tool recommendations
- Next 7-day action items

---

## Summary of Corrections

### ❌ Previous (INCORRECT)
- Blurred users skipped Layer 2
- Blurred users saw Layer 3 questions
- Total for Blurred: 41 questions

### ✅ Current (CORRECT)
- Blurred users get Layer 2 (with Blurred-specific subtypes)
- Blurred users SKIP Layer 3 (no mirror pair)
- Total for Blurred: 47 questions

### Why Blurred Skips Layer 3
**Reason**: Layer 3 tests "Mirror Awareness" - the ability to recognize and work with your opposite type.

- **Architect opposite** = Alchemist
- **Alchemist opposite** = Architect
- **Blurred opposite** = ??? (No clear opposite)

Since Blurred users operate in BOTH modes simultaneously, they don't have a single "opposite" to recognize. Therefore, Layer 3 mirror awareness questions are not applicable.

---

**Document Version**: 1.0  
**Created**: December 2024  
**Status**: ✅ Complete and Correct
