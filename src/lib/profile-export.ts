// Profile Export Utilities
// Generate comprehensive downloadable EDNA profile

import { EDNAResults } from '../components/EDNAQuiz';

export function generateProfileJSON(results: EDNAResults): string {
  const profileData = {
    assessment_version: '1.0',
    completed_date: new Date().toISOString(),
    
    // Layer 1: Core Type
    core_type: results.core_type,
    raw_scores: results.raw_scores,
    
    // Layer 2: Subtype
    subtype: results.subtype,
    framing_order: results.framing_order,
    default_artifacts: results.default_artifacts,
    decision_templates: results.decision_templates,
    sprint_style: results.sprint_style,
    
    // Layer 3: Mirror Pair Awareness
    opposite_awareness: results.opposite_awareness,
    score_band: results.score_band,
    
    // Layer 4: Learning Style
    learning_style: results.learning_style,
    
    // Layer 5: Neurodiversity
    neurodiversity: results.neurodiversity,
    
    // Layer 6: Mindset & Personality
    mindset_personality: results.mindset_personality,
    
    // Layer 7: Meta-Beliefs & Values
    meta_beliefs: results.meta_beliefs,
    layer7_scores: results.layer7_scores,
    layer7_profile: results.layer7_profile,
    misalignments: results.misalignments,
    
    // Progression
    progression_goals: results.progression_goals
  };
  
  return JSON.stringify(profileData, null, 2);
}

export function generateProfileMarkdown(results: EDNAResults): string {
  const sections: string[] = [];
  
  // Header
  sections.push('# Your Complete EDNA Profile');
  sections.push(`*Generated on ${new Date().toLocaleDateString()}*\n`);
  
  // Layer 1: Core Type
  sections.push('## Layer 1: Core Type');
  sections.push(`**Type:** ${results.core_type.toUpperCase()}`);
  sections.push(`**Architect Score:** ${results.raw_scores.architect}`);
  sections.push(`**Alchemist Score:** ${results.raw_scores.alchemist}\n`);
  
  // Layer 2: Subtype
  sections.push('## Layer 2: Subtype Profile');
  sections.push(`**Primary Subtype:** ${formatSubtype(results.subtype[0])}`);
  sections.push('\n**Framing Order:**');
  results.framing_order.forEach((frame, i) => {
    sections.push(`${i + 1}. ${frame}`);
  });
  sections.push('\n**Default Artifacts:**');
  results.default_artifacts.forEach(artifact => {
    sections.push(`- ${artifact}`);
  });
  sections.push('');
  
  // Layer 3: Mirror Awareness
  sections.push('## Layer 3: Mirror Pair Awareness');
  sections.push(`**Overall Score:** ${results.opposite_awareness.overall}/100 (${results.score_band})`);
  sections.push('\n**Dimension Scores:**');
  sections.push(`- Recognition (R): ${results.opposite_awareness.R}/100`);
  sections.push(`- Translation (T): ${results.opposite_awareness.T}/100 (weighted 1.25x)`);
  sections.push(`- Integration (I): ${results.opposite_awareness.I}/100`);
  sections.push(`- Governance (G): ${results.opposite_awareness.G}/100 (weighted 1.25x)`);
  sections.push(`- Conflict Recovery (C): ${results.opposite_awareness.C}/100\n`);
  
  // Layer 4: Learning Style
  sections.push('## Layer 4: Learning Style');
  sections.push(`**Modality:** ${results.learning_style.modality.join(', ')}`);
  sections.push(`**Approach:** ${results.learning_style.approach}`);
  sections.push(`**Concept Processing:** ${results.learning_style.concept_processing}`);
  sections.push(`**Working Environment:** ${results.learning_style.working_environment}`);
  sections.push(`**Pace:** ${results.learning_style.pace}\n`);
  
  // Layer 5: Neurodiversity
  if (results.neurodiversity.accessibility_needs.length > 0) {
    sections.push('## Layer 5: Accessibility Needs');
    results.neurodiversity.accessibility_needs.forEach(need => {
      sections.push(`- ${need}`);
    });
    sections.push('');
  }
  
  // Layer 6: Mindset & Personality
  sections.push('## Layer 6: Mindset & Personality');
  sections.push(`**Mindset:** ${results.mindset_personality.mindset}`);
  sections.push(`**Risk Tolerance:** ${results.mindset_personality.risk_tolerance}`);
  sections.push(`**Energy Source:** ${results.mindset_personality.extraversion}\n`);
  
  // Layer 7: Meta-Beliefs & Values
  sections.push('## Layer 7: Meta-Beliefs & Values');
  sections.push(`**${results.layer7_profile.headline}**\n`);
  sections.push(`> ${results.layer7_profile.one_liner}\n`);
  
  sections.push('**Value Axis Scores (0-100):**');
  sections.push(`- Growth Philosophy: ${results.layer7_scores.growth_philosophy}/100`);
  sections.push(`- Purpose Filter: ${results.layer7_scores.purpose_filter}/100`);
  sections.push(`- Change Appetite: ${results.layer7_scores.change_appetite}/100`);
  sections.push(`- Metrics Orientation: ${results.layer7_scores.metrics_orientation}/100`);
  sections.push(`- Social Worldview: ${results.layer7_scores.social_worldview}/100`);
  sections.push(`- Resource Worldview: ${results.layer7_scores.resource_worldview}/100\n`);
  
  sections.push('**Strengths:**');
  results.layer7_profile.strengths.forEach(strength => {
    sections.push(`- ${strength}`);
  });
  sections.push('');
  
  sections.push('**Watchouts:**');
  results.layer7_profile.watchouts.forEach(watchout => {
    sections.push(`- ${watchout}`);
  });
  sections.push('');
  
  if (results.misalignments.length > 0) {
    sections.push('**Detected Misalignments:**');
    results.misalignments.forEach(m => {
      sections.push(`- **${m.type}:** ${m.description}`);
      sections.push(`  - Impact: ${m.impact}`);
      sections.push(`  - Remedy: ${m.remedy}`);
    });
    sections.push('');
  }
  
  // Next 7 Days
  sections.push('## Your Next 7 Days');
  results.layer7_profile.next_7_days.forEach((action, i) => {
    sections.push(`${i + 1}. ${action}`);
  });
  sections.push('');
  
  // Progression Goals
  sections.push('## Progression Goals');
  results.progression_goals.forEach(goal => {
    sections.push(`- ${goal}`);
  });
  
  return sections.join('\n');
}

export function downloadProfile(results: EDNAResults, format: 'json' | 'markdown') {
  const content = format === 'json' 
    ? generateProfileJSON(results)
    : generateProfileMarkdown(results);
  
  const blob = new Blob([content], { type: format === 'json' ? 'application/json' : 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `edna-profile-${Date.now()}.${format === 'json' ? 'json' : 'md'}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function formatSubtype(subtype: string): string {
  return subtype.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}
