# Layer 3 Dynamic Loading - Test Plan

## Manual Testing Checklist

### Test 1: Architect Path ✅

**Steps:**
1. Start the quiz
2. Answer Layer 1 questions with majority Architect responses:
   - Q1: Select option A (systematic implementation)
   - Q2: Select option A (analytics-driven)
   - Q3: Select option A (metrics-based)
   - Q4: Select option A (analyze and plan)
   - Q5: Select option A (planning preference)
   - Q6: Select option A (data analysis)
   - Q7: Select option A (research first)
   - Q8: Select option A (planning before action)

3. Complete Layer 1 (Question 8)

**Expected Results After Layer 1:**
- ✅ Layer 1 core type calculated: **Architect**
- ✅ Questions dynamically loaded:
  - Layer 2: 6 Architect subtype questions (Q9-Q14)
  - Layer 3: 7 Architect mirror awareness questions (Q15-Q21)
- ✅ Total question count: **54 questions**
- ✅ Progress bar shows: "Question 9 of 54"

**Layer 3 Questions Should Ask:**
- "Someone opposite to you would..." (referring to Alchemist behavior)
- Example: "A colleague bursts in with a raw idea. Someone opposite to you would jump in to prototype and experiment."

**What to Verify:**
- [ ] No Alchemist Layer 2 questions appear
- [ ] No Blurred Layer 3 questions appear
- [ ] Only Architect-specific Layer 3 questions appear
- [ ] Question IDs are: L3_ARCH_Q13, L3_ARCH_Q14, etc.

---

### Test 2: Alchemist Path ✅

**Steps:**
1. Start the quiz
2. Answer Layer 1 questions with majority Alchemist responses:
   - Q1: Select option B (creative ideation)
   - Q2: Select option B (iteration-based)
   - Q3: Select option B (feeling-based)
   - Q4: Select option B (opportunistic start)
   - Q5: Select option B (adaptive approach)
   - Q6: Select option B (intuition-led)
   - Q7: Select option B (creative exploration)
   - Q8: Select option B (opportunistic)

3. Complete Layer 1 (Question 8)

**Expected Results After Layer 1:**
- ✅ Layer 1 core type calculated: **Alchemist**
- ✅ Questions dynamically loaded:
  - Layer 2: 6 Alchemist subtype questions (Q9-Q14)
  - Layer 3: 7 Alchemist mirror awareness questions (Q15-Q21)
- ✅ Total question count: **54 questions**
- ✅ Progress bar shows: "Question 9 of 54"

**Layer 3 Questions Should Ask:**
- "Someone opposite to you would..." (referring to Architect behavior)
- Example: "A promising idea needs to scale. Someone opposite to you would design a step-by-step roadmap."

**What to Verify:**
- [ ] No Architect Layer 2 questions appear
- [ ] No Blurred Layer 3 questions appear
- [ ] Only Alchemist-specific Layer 3 questions appear
- [ ] Question IDs are: L3_ALC_Q13, L3_ALC_Q14, etc.

---

### Test 3: Blurred Path ✅

**Steps:**
1. Start the quiz
2. Answer Layer 1 questions with mixed responses (alternating A and B):
   - Q1: Select option A (Architect)
   - Q2: Select option B (Alchemist)
   - Q3: Select option A (Architect)
   - Q4: Select option B (Alchemist)
   - Q5: Select option A (Architect)
   - Q6: Select option B (Alchemist)
   - Q7: Select option A (Architect)
   - Q8: Select option B (Alchemist)

3. Complete Layer 1 (Question 8)

**Expected Results After Layer 1:**
- ✅ Layer 1 core type calculated: **Blurred**
- ✅ Questions dynamically loaded:
  - Layer 2: **SKIPPED** (0 questions)
  - Layer 3: 6 Blurred mirror awareness questions (Q9-Q14)
- ✅ Total question count: **47 questions**
- ✅ Progress bar shows: "Question 9 of 47"
- ✅ Question 9 should be a Layer 3 question (not Layer 2)

**Layer 3 Questions Should Ask:**
- "Someone opposite to you would..." (referring to clear Architect or Alchemist behavior)
- Example: "The team needs structure. Someone opposite to you would impose a strict plan OR rally around a vision."

**What to Verify:**
- [ ] Layer 2 is completely skipped
- [ ] Next question after Q8 is a Layer 3 question
- [ ] Only Blurred-specific Layer 3 questions appear
- [ ] Question IDs are: L3_BLR_Q13, L3_BLR_Q14, etc.
- [ ] Question count is 47 (not 54)

---

### Test 4: Progress Bar Accuracy ✅

**For Each Path:**

**Architect:**
- [ ] Q1-8: Shows "Question X of 8" (before dynamic load)
- [ ] Q9 onwards: Shows "Question X of 54" (after dynamic load)

**Alchemist:**
- [ ] Q1-8: Shows "Question X of 8" (before dynamic load)
- [ ] Q9 onwards: Shows "Question X of 54" (after dynamic load)

**Blurred:**
- [ ] Q1-8: Shows "Question X of 8" (before dynamic load)
- [ ] Q9 onwards: Shows "Question X of 47" (after dynamic load)

---

### Test 5: Back Button Functionality ✅

**Steps:**
1. Complete Layer 1 as Architect
2. Verify Layer 2 questions load (Q9-14)
3. Click "Back" button
4. Return to Question 8 (Layer 1)

**Expected Results:**
- [ ] Back button works correctly
- [ ] Question state preserved
- [ ] No duplicate question loading
- [ ] Forward navigation still works

---

### Test 6: Answer Persistence ✅

**Steps:**
1. Start quiz as Architect
2. Answer Q1-8 (Layer 1)
3. Answer Q9-10 (Layer 2)
4. Click Back to Q9
5. Change answer to Q9
6. Click Next to Q10
7. Complete quiz

**Expected Results:**
- [ ] Changed answer to Q9 is saved
- [ ] Results calculation uses updated answers
- [ ] No duplicate answers in final results

---

### Test 7: Results Calculation ✅

**For Each Path:**

**Architect Results Should Include:**
- [ ] core_type: 'architect'
- [ ] subtype: ['ultimate_strategist'] (or other Architect subtype)
- [ ] mirror_awareness_score: (based on Layer 3 Architect questions)

**Alchemist Results Should Include:**
- [ ] core_type: 'alchemist'
- [ ] subtype: ['ultimate_alchemist'] (or other Alchemist subtype)
- [ ] mirror_awareness_score: (based on Layer 3 Alchemist questions)

**Blurred Results Should Include:**
- [ ] core_type: 'blurred'
- [ ] subtype: [] (empty or default)
- [ ] mirror_awareness_score: (based on Layer 3 Blurred questions)

---

## Automated Test Cases

### Unit Test 1: getLayer3Questions Function

```typescript
import { getLayer3Questions } from '../lib/layer3-questions';

describe('getLayer3Questions', () => {
  it('should return Architect questions for architect core type', () => {
    const questions = getLayer3Questions('architect');
    expect(questions.length).toBe(7);
    expect(questions[0].id).toBe('L3_ARCH_Q13');
    expect(questions[0].applicable_to).toBe('architect');
  });

  it('should return Alchemist questions for alchemist core type', () => {
    const questions = getLayer3Questions('alchemist');
    expect(questions.length).toBe(7);
    expect(questions[0].id).toBe('L3_ALC_Q13');
    expect(questions[0].applicable_to).toBe('alchemist');
  });

  it('should return Blurred questions for blurred core type', () => {
    const questions = getLayer3Questions('blurred');
    expect(questions.length).toBe(6);
    expect(questions[0].id).toBe('L3_BLR_Q13');
    expect(questions[0].applicable_to).toBe('blurred');
  });
});
```

### Unit Test 2: Dynamic Question Loading

```typescript
import { calculateLayer1Score } from '../lib/layer1-core-identity';
import { getLayer2Questions } from '../lib/layer2-questions';
import { getLayer3Questions } from '../lib/layer3-questions';

describe('Dynamic Question Loading', () => {
  it('should load correct questions for Architect path', () => {
    const layer1Answers = [
      { question_id: 'L1_Q1', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q2', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q3', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q4', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q5', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q6', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q7', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q8', selected: 'A', layer: 1, tags: ['architect'] }
    ];

    const layer1Score = calculateLayer1Score(layer1Answers);
    expect(layer1Score.classification).toBe('architect');

    const layer2Questions = getLayer2Questions('architect');
    expect(layer2Questions.length).toBe(6);

    const layer3Questions = getLayer3Questions('architect');
    expect(layer3Questions.length).toBe(7);
  });

  it('should load correct questions for Alchemist path', () => {
    const layer1Answers = [
      { question_id: 'L1_Q1', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q2', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q3', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q4', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q5', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q6', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q7', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q8', selected: 'B', layer: 1, tags: ['alchemist'] }
    ];

    const layer1Score = calculateLayer1Score(layer1Answers);
    expect(layer1Score.classification).toBe('alchemist');

    const layer2Questions = getLayer2Questions('alchemist');
    expect(layer2Questions.length).toBe(6);

    const layer3Questions = getLayer3Questions('alchemist');
    expect(layer3Questions.length).toBe(7);
  });

  it('should skip Layer 2 and load Blurred Layer 3 for Blurred path', () => {
    const layer1Answers = [
      { question_id: 'L1_Q1', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q2', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q3', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q4', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q5', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q6', selected: 'B', layer: 1, tags: ['alchemist'] },
      { question_id: 'L1_Q7', selected: 'A', layer: 1, tags: ['architect'] },
      { question_id: 'L1_Q8', selected: 'B', layer: 1, tags: ['alchemist'] }
    ];

    const layer1Score = calculateLayer1Score(layer1Answers);
    expect(layer1Score.classification).toBe('blurred');

    const layer2Questions = getLayer2Questions('blurred');
    expect(layer2Questions.length).toBe(0); // Blurred skips Layer 2

    const layer3Questions = getLayer3Questions('blurred');
    expect(layer3Questions.length).toBe(6);
  });
});
```

### Integration Test: Complete Quiz Flow

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { EDNAQuiz } from '../components/EDNAQuiz';

describe('EDNAQuiz - Dynamic Layer 3 Loading', () => {
  it('should load Architect Layer 3 questions after Architect Layer 1 result', async () => {
    const onComplete = jest.fn();
    render(<EDNAQuiz onComplete={onComplete} />);

    // Start quiz
    fireEvent.click(screen.getByText('Start Assessment'));

    // Answer Layer 1 as Architect
    for (let i = 0; i < 8; i++) {
      const optionA = screen.getAllByRole('radio')[0]; // First option = Architect
      fireEvent.click(optionA);
      fireEvent.click(screen.getByText('Next'));
    }

    // Verify Layer 2 loads (Architect subtype questions)
    expect(screen.getByText(/Question 9 of 54/i)).toBeInTheDocument();

    // Answer Layer 2
    for (let i = 0; i < 6; i++) {
      const firstOption = screen.getAllByRole('radio')[0];
      fireEvent.click(firstOption);
      fireEvent.click(screen.getByText('Next'));
    }

    // Verify Layer 3 loads (Architect mirror awareness)
    expect(screen.getByText(/Someone opposite to you/i)).toBeInTheDocument();
    expect(screen.getByText(/Question 15 of 54/i)).toBeInTheDocument();
  });

  it('should load Blurred Layer 3 questions and skip Layer 2 for Blurred result', async () => {
    const onComplete = jest.fn();
    render(<EDNAQuiz onComplete={onComplete} />);

    // Start quiz
    fireEvent.click(screen.getByText('Start Assessment'));

    // Answer Layer 1 as Blurred (alternating A and B)
    for (let i = 0; i < 8; i++) {
      const option = screen.getAllByRole('radio')[i % 2]; // Alternate
      fireEvent.click(option);
      fireEvent.click(screen.getByText('Next'));
    }

    // Verify Layer 3 loads immediately (skipping Layer 2)
    expect(screen.getByText(/Question 9 of 47/i)).toBeInTheDocument();
    expect(screen.getByText(/Someone opposite to you/i)).toBeInTheDocument();
  });
});
```

---

## Edge Cases to Test

### Edge Case 1: Exact 15% Threshold
- Answer Layer 1 with exactly 15% difference
- Should classify as Blurred
- Should skip Layer 2

### Edge Case 2: Near Threshold (14.9%)
- Answer Layer 1 with 14.9% difference
- Should classify as dominant type (Architect or Alchemist)
- Should load appropriate Layer 2

### Edge Case 3: Perfect Score (100% Architect)
- Answer all Layer 1 as Architect
- Should classify as Architect
- Should load Architect Layer 2 and Layer 3

### Edge Case 4: Perfect Alchemist (100%)
- Answer all Layer 1 as Alchemist
- Should classify as Alchemist
- Should load Alchemist Layer 2 and Layer 3

---

## Performance Testing

### Metrics to Track:
- [ ] Time to load questions after Layer 1: < 100ms
- [ ] Memory usage: No memory leaks
- [ ] Re-render count: Minimal re-renders
- [ ] Bundle size: Verify tree-shaking works

### Load Testing:
- [ ] 100 concurrent users taking quiz
- [ ] No performance degradation
- [ ] Smooth transitions between layers

---

## Accessibility Testing

### WCAG 2.1 AA Compliance:
- [ ] Progress bar updates are announced to screen readers
- [ ] Question transitions maintain focus
- [ ] Back/Next buttons remain keyboard accessible
- [ ] Dynamic content loading doesn't break tab order

---

## Browser Compatibility

### Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

---

## Status Checklist

### Pre-Launch:
- [ ] All manual tests pass
- [ ] All automated tests pass
- [ ] Edge cases handled
- [ ] Performance benchmarks met
- [ ] Accessibility verified
- [ ] Cross-browser tested
- [ ] Documentation complete

### Post-Launch:
- [ ] Monitor analytics for completion rates
- [ ] Track which paths users take most
- [ ] Collect user feedback on question relevance
- [ ] Verify scoring accuracy

---

**Document Version**: 1.0  
**Created**: December 2024  
**Status**: Ready for Testing ✅
