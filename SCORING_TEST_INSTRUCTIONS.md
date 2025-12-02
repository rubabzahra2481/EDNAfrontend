# Testing Scoring Logic - Instructions

## Overview
This document explains how to test if the new scoring logic is working correctly and if results are being sent to the results page.

## What Was Updated

### Layer 2 Scoring
- **Weighting Added**: Questions Q9/Q12 (and Q9a/Q12a for Alchemist) now have 1.5x weight
- **Mixed Path Logic**: Properly counts Architect-like vs Alchemist-like with +2 threshold
- **Score Mapping**: Maps to client's naming (Master Strategist, Visionary Oracle, etc.)

### Layer 5 Scoring  
- **Primary Profile**: Calculates neurotypical/neurodivergent/twice_exceptional counts
- **Tie-Breaking**: If tied, precedence is 2E > ND > NT

### Layer 6 & 7 Scoring
- Updated to match client's exact specifications

## How to Test

### 1. Console Logging
The scoring functions now include console logs that will show:
- `🔍 [Layer 2 Scoring]` - Shows path determination and score calculations
- `📊 [Quiz Complete]` - Shows when results are calculated and transformed
- Check browser console when completing the quiz

### 2. Test Scenarios

#### Test Layer 2 Weighting:
1. Complete Layer 1 (get Architect result)
2. Answer Layer 2 questions
3. Check console for: `✅ [Layer 2 Scoring] Final scores:` - should show weighted scores
4. Verify Q9 and Q12 answers contribute 1.5x to their subtype scores

#### Test Layer 5 Tie-Breaking:
1. Complete quiz and get Layer 5 answers
2. Check console for primary profile calculation
3. If scores are tied, verify precedence: 2E > ND > NT

#### Test Results Flow:
1. Complete entire quiz
2. Check console for:
   - `📊 [Quiz Complete] Calculating results from answers: X answers`
   - `📊 [Quiz Complete] Quiz results calculated: {...}`
   - `📊 [Quiz Complete] EDNA results transformed: {...}`
3. Verify results page loads with correct data

### 3. What to Check in Results Page

- **Subtype**: Should show the weighted subtype (e.g., "Master Strategist")
- **Layer 3 Scores**: Should show dimension scores from Layer 3
- **Learning Style**: Should show VARK percentages
- **Neuro Profile**: Should show primary profile (Neurotypical/Neurodivergent/Twice-Exceptional)

## Debugging

If results don't appear correctly:
1. Check browser console for errors
2. Check the console logs showing calculated results
3. Verify all answers are being saved (check `newAnswers` object)
4. Verify Layer 1 result is calculated correctly (affects Layer 2 path)

## Files Modified
- `/lib/scoring.ts` - All scoring functions updated
- `/components/NewEDNAQuiz.tsx` - Added logging
