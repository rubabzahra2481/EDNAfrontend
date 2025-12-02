/**
 * Complete EDNA Scoring System
 * Orchestrates all 7 layers of the EDNA assessment
 */

import {
  QuizAnswer,
  Layer1Result,
  Layer2Result,
  Layer3Result,
  Layer4Result,
  Layer5Result,
  Layer6Result,
  Layer7Result,
  calculateLayer1Score,
  calculateLayer2Score,
  calculateLayer3Score,
  calculateLayer4Score,
  calculateLayer5Score,
  calculateLayer6Score,
  calculateLayer7Score
} from './scoring-engine';

export interface CompleteEDNAResults {
  // Layer 1: Core Identity
  layer1: Layer1Result;
  
  // Layer 2: Subtype Refinement
  layer2: Layer2Result;
  
  // Layer 3: Mirror Awareness
  layer3: Layer3Result;
  
  // Layer 4: Learning Style Preferences
  layer4: Layer4Result;
  
  // Layer 5: Neurodiversity Screening
  layer5: Layer5Result;
  
  // Layer 6: Mindset and Personality
  layer6: Layer6Result;
  
  // Layer 7: Meta-Beliefs & Values
  layer7: Layer7Result;
  
  // Overall Assessment
  assessment_version: string;
  completed_at: string;
  total_questions: number;
}

/**
 * Calculate complete EDNA assessment results across all 7 layers
 */
export function calculateCompleteEDNAScore(answers: QuizAnswer[]): CompleteEDNAResults {
  // Layer 1: Core Type Identification
  const layer1 = calculateLayer1Score(answers);
  
  // Layer 2: Subtype Refinement
  const layer2 = calculateLayer2Score(answers);
  
  // Layer 3: Mirror Pair Awareness (requires core type from Layer 1)
  const layer3 = calculateLayer3Score(answers, layer1.core_type);
  
  // Layer 4: Learning Style Preferences
  const layer4 = calculateLayer4Score(answers);
  
  // Layer 5: Neurodiversity Screening
  const layer5 = calculateLayer5Score(answers);
  
  // Layer 6: Mindset and Personality
  const layer6 = calculateLayer6Score(answers);
  
  // Layer 7: Meta-Beliefs & Values
  const layer7 = calculateLayer7Score(answers);
  
  return {
    layer1,
    layer2,
    layer3,
    layer4,
    layer5,
    layer6,
    layer7,
    assessment_version: '1.0.0',
    completed_at: new Date().toISOString(),
    total_questions: answers.length
  };
}

/**
 * Generate a comprehensive profile summary across all layers
 */
export function generateProfileSummary(results: CompleteEDNAResults): string {
  const { layer1, layer2, layer3, layer4, layer5, layer6, layer7 } = results;
  
  let summary = `## Your EDNA Profile\n\n`;
  
  // Core Identity
  summary += `### Core Type: ${formatCoreType(layer1.core_type)}\n`;
  summary += `Mastery Level: ${layer1.mastery}%\n\n`;
  
  // Subtype
  summary += `### Subtype: ${layer2.display_label}\n\n`;
  
  // Mirror Awareness
  summary += `### Mirror Awareness: ${formatMirrorLevel(layer3.mirror_awareness_level)} (${layer3.mirror_awareness_score}%)\n`;
  summary += `You correctly identified ${layer3.correct_mirror_count} of ${layer3.total_mirror_questions} mirror pair responses.\n\n`;
  
  // Learning Style
  summary += `### Learning Style\n`;
  summary += `${layer4.learning_style_summary}\n\n`;
  
  // Neurodiversity
  if (layer5.flags.length > 0) {
    summary += `### Accessibility & Learning Preferences\n`;
    layer5.flags.forEach(flag => {
      if (flag.level !== 'low') {
        summary += `- ${flag.message}\n`;
      }
    });
    if (layer5.co_occurrence_warning) {
      summary += `\n⚠️ ${layer5.co_occurrence_warning}\n`;
    }
    summary += `\n_${layer5.disclaimer}_\n\n`;
  }
  
  // Mindset & Personality
  summary += `### Mindset & Personality\n`;
  summary += `${layer6.personality_summary}\n`;
  summary += `- Mindset: ${formatMindset(layer6.mindset)}\n`;
  summary += `- Risk Tolerance: ${formatRiskTolerance(layer6.risk_tolerance)}\n`;
  summary += `- Energy Style: ${formatExtraversion(layer6.extraversion)}\n\n`;
  
  // Meta-Beliefs & Values
  summary += `### Meta-Beliefs & Values\n`;
  summary += `${layer7.value_profile_summary}\n\n`;
  
  // Dominant Beliefs
  if (layer7.dominant_beliefs && layer7.dominant_beliefs.length > 0) {
    const trulyDominant = layer7.dominant_beliefs.filter(b => b.is_dominant);
    if (trulyDominant.length > 0) {
      summary += `#### Dominant Meta-Beliefs (≥40% with ≥12% gap):\n`;
      trulyDominant.forEach(b => {
        summary += `- ${b.category}: ${Math.round(b.normalized_score)}%\n`;
      });
      summary += `\n`;
    }
  }
  
  // Conflicted Beliefs (Cognitive Dissonance)
  if (layer7.conflicted_beliefs && layer7.conflicted_beliefs.length > 0) {
    summary += `#### ⚠️ Conflicted Beliefs (Cognitive Dissonance):\n`;
    layer7.conflicted_beliefs.forEach(c => {
      summary += `- **${c.dimension}**: ${c.belief1} (${Math.round(c.belief1_norm)}%) ↔ ${c.belief2} (${Math.round(c.belief2_norm)}%)\n`;
      summary += `  💡 ${c.coaching_prompt}\n\n`;
    });
  }
  
  // Misalignments
  if (layer7.misalignments.length > 0) {
    summary += `#### Value Misalignments to Watch:\n`;
    layer7.misalignments.forEach(m => {
      summary += `- **${m.type}**: ${m.description}\n`;
      summary += `  - Impact: ${m.impact}\n`;
      summary += `  - Remedy: ${m.remedy}\n`;
    });
  }
  
  return summary;
}

/**
 * Helper formatting functions
 */
function formatCoreType(type: string): string {
  const map: { [key: string]: string } = {
    'architect': 'Architect (Systematic & Data-Driven)',
    'alchemist': 'Alchemist (Creative & Innovative)',
    'blurred': 'Blurred (Balanced Hybrid)'
  };
  return map[type] || type;
}

function formatMirrorLevel(level: string): string {
  const map: { [key: string]: string } = {
    'low': 'Low',
    'moderate': 'Moderate',
    'high': 'High'
  };
  return map[level] || level;
}

function formatMindset(mindset: string): string {
  const map: { [key: string]: string } = {
    'growth': 'Growth Mindset',
    'fixed': 'Fixed Mindset',
    'mixed': 'Mixed/Situational Mindset'
  };
  return map[mindset] || mindset;
}

function formatRiskTolerance(risk: string): string {
  const map: { [key: string]: string } = {
    'high': 'High Risk Tolerance',
    'moderate': 'Moderate Risk Tolerance',
    'low': 'Low Risk Tolerance',
    'mixed': 'Context-Dependent Risk Approach'
  };
  return map[risk] || risk;
}

function formatExtraversion(extraversion: string): string {
  const map: { [key: string]: string } = {
    'extroverted': 'Extroverted (Energized by Interaction)',
    'introverted': 'Introverted (Energized by Solo Work)',
    'balanced': 'Ambivert (Balanced Energy Flow)',
    'ambivert': 'Ambivert (Balanced Energy Flow)'
  };
  return map[extraversion] || extraversion;
}

/**
 * Export results for backend storage or sharing
 */
export function exportResults(results: CompleteEDNAResults): string {
  return JSON.stringify(results, null, 2);
}

/**
 * Generate personalized recommendations based on complete profile
 */
export function generateRecommendations(results: CompleteEDNAResults): {
  learning: string[];
  development: string[];
  tools: string[];
} {
  const { layer1, layer4, layer5, layer6, layer7 } = results;
  
  const learning: string[] = [];
  const development: string[] = [];
  const tools: string[] = [];
  
  // Learning recommendations based on Layer 4
  if (layer4.modality_preference === 'visual') {
    learning.push('Focus on video tutorials, diagrams, and visual content');
    tools.push('Mind mapping tools, visual planning boards');
  } else if (layer4.modality_preference === 'auditory') {
    learning.push('Utilize podcasts, audio courses, and discussion groups');
    tools.push('Voice recording apps, audio note-taking');
  } else if (layer4.modality_preference === 'kinesthetic') {
    learning.push('Prioritize hands-on practice and interactive exercises');
    tools.push('Simulation tools, interactive workshops');
  }
  
  if (layer4.pace === 'fast') {
    learning.push('Use quick-start guides and rapid iteration cycles');
  } else if (layer4.pace === 'slow') {
    learning.push('Allow time for deep processing and mastery before moving on');
  }
  
  // Development recommendations based on Layer 6 & 7
  if (layer6.mindset === 'fixed') {
    development.push('Practice reframing challenges as learning opportunities');
    development.push('Celebrate progress and effort, not just outcomes');
  }
  
  if (layer7.growth_philosophy > 70) {
    development.push('Add stage gates and quality checkpoints to rapid scaling');
  } else if (layer7.growth_philosophy < 40) {
    development.push('Define "good-enough to ship" thresholds to increase velocity');
  }
  
  if (layer7.metrics_orientation < 40) {
    development.push('Build comfort with key financial metrics through storytelling');
    tools.push('Visual dashboards, narrative-driven analytics');
  }
  
  // Neurodiversity accommodations
  layer5.flags.forEach(flag => {
    if (flag.level === 'probable' || flag.level === 'possible') {
      if (flag.trait === 'adhd') {
        tools.push('Task timers, gamified progress tracking, short focused sessions');
      } else if (flag.trait === 'dyslexia') {
        tools.push('Text-to-speech tools, dyslexia-friendly fonts, audio alternatives');
      } else if (flag.trait === 'autism') {
        tools.push('Structured schedules, clear expectations, routine-based planning');
      } else if (flag.trait === 'sensory') {
        tools.push('Low-stimulus workspace, noise-canceling tools, minimal visual complexity');
      }
    }
  });
  
  return {
    learning: learning.slice(0, 3),
    development: development.slice(0, 3),
    tools: tools.slice(0, 5)
  };
}
