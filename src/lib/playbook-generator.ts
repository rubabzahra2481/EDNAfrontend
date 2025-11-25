// Personalized Playbook Generator
// Creates customized action plans based on complete 7-layer EDNA profile

import { EDNAResults } from '../components/EDNAQuiz';
import { getSubtypeProfile } from './subtype-data';

export interface PlaybookSection {
  title: string;
  items: string[];
}

export function generatePersonalizedPlaybook(results: EDNAResults): PlaybookSection[] {
  const subtypeProfile = getSubtypeProfile(results.subtype[0]);
  const sections: PlaybookSection[] = [];

  // Section 1: Your Operational System
  sections.push({
    title: 'Your Operational System',
    items: [
      `Core Identity: ${results.core_type.toUpperCase()} - ${subtypeProfile?.name || 'Custom Profile'}`,
      `Mirror Awareness Level: ${results.score_band} (${results.opposite_awareness.overall}/100)`,
      `Sprint Rhythm: ${results.sprint_style.replace(/_/g, ' ')}`,
      `Learning Mode: ${results.learning_style.approach} approach at ${results.learning_style.pace} pace`
    ]
  });

  // Section 2: Daily Workflow Adaptations
  const dailyWorkflow: string[] = [];
  
  if (results.core_type === 'architect') {
    dailyWorkflow.push('Start with structure: Review OKRs and systems before creative work');
    dailyWorkflow.push('Build in narrative time: 15% of capacity for story development');
  } else if (results.core_type === 'alchemist') {
    dailyWorkflow.push('Start with vision: Morning creative ideation before systematization');
    dailyWorkflow.push('Build in proof time: 15% of capacity for data validation');
  } else {
    dailyWorkflow.push('Choose your core mode each morning: Architect or Alchemist stance');
    dailyWorkflow.push('Set mode-switching boundaries: Limit to 2 transitions per day');
  }
  
  // Add learning style adaptations
  if (results.learning_style.pace === 'fast') {
    dailyWorkflow.push('Time-box learning: 25-minute sprints with quick reviews');
  } else if (results.learning_style.pace === 'slow') {
    dailyWorkflow.push('Deep work blocks: 90-minute focused sessions for mastery');
  }
  
  // Add neurodiversity adaptations
  if (results.neurodiversity.adhd_traits) {
    dailyWorkflow.push('Use pomodoro technique: 25-min work / 5-min break cycles');
  }
  if (results.neurodiversity.autism_traits) {
    dailyWorkflow.push('Maintain consistent routines: Same time, same structure daily');
  }
  
  sections.push({
    title: 'Daily Workflow Adaptations',
    items: dailyWorkflow
  });

  // Section 3: Decision-Making Framework
  const decisionFramework: string[] = [];
  
  if (subtypeProfile) {
    decisionFramework.push(`Use your framing order: ${subtypeProfile.edna_adaptations.framing_order.slice(0, 3).join(' → ')}`);
  }
  
  decisionFramework.push(...results.decision_templates.map(t => 
    `Apply ${t.replace(/_/g, ' ')}: ${getDecisionTemplateDescription(t)}`
  ));
  
  // Add Layer 7 value-driven decisions
  if (results.layer7_scores.purpose_filter > 70) {
    decisionFramework.push('Mission filter: Will this advance meaningful impact?');
  } else if (results.layer7_scores.purpose_filter < 40) {
    decisionFramework.push('ROI filter: What\'s the financial return on this decision?');
  }
  
  if (results.layer7_scores.change_appetite > 70) {
    decisionFramework.push('Innovation check: Does this push boundaries or iterate?');
  }
  
  sections.push({
    title: 'Decision-Making Framework',
    items: decisionFramework
  });

  // Section 4: Communication & Collaboration
  const communication: string[] = [];
  
  if (results.mindset_personality.extraversion === 'extroverted') {
    communication.push('Leverage group brainstorming and collaborative sessions');
    communication.push('Schedule regular check-ins and partner meetings');
  } else if (results.mindset_personality.extraversion === 'introverted') {
    communication.push('Prepare written briefs before meetings');
    communication.push('Limit collaborative sessions; protect solo deep work time');
  }
  
  if (results.layer7_scores.social_worldview > 60) {
    communication.push('Build partnerships: Set up win-win collaboration frameworks');
  } else {
    communication.push('Benchmark competitors: Study and outperform market leaders');
  }
  
  sections.push({
    title: 'Communication & Collaboration',
    items: communication
  });

  // Section 5: Growth & Learning Plan
  const learningPlan: string[] = [];
  
  learningPlan.push(`Primary modality: Focus on ${results.learning_style.modality.join(' and ')} content`);
  learningPlan.push(`Concept processing: Prefer ${results.learning_style.concept_processing} examples and case studies`);
  
  if (results.opposite_awareness.overall < 70) {
    learningPlan.push('Mirror skill development: Practice opposite validator perspectives weekly');
    if (results.opposite_awareness.T < 70) {
      learningPlan.push('Translation practice: Convert 1 spec to story (or vice versa) per week');
    }
  }
  
  sections.push({
    title: 'Growth & Learning Plan',
    items: learningPlan
  });

  // Section 6: Risk Management & Blind Spots
  const riskManagement: string[] = [];
  
  if (subtypeProfile) {
    riskManagement.push(...subtypeProfile.blindspots.map(b => 
      `Watch for: ${b}`
    ));
  }
  
  // Add Layer 7 misalignment risks
  results.misalignments.forEach(m => {
    riskManagement.push(`Misalignment risk: ${m.type} - ${m.remedy}`);
  });
  
  // Add mindset-based risks
  if (results.mindset_personality.risk_tolerance === 'high') {
    riskManagement.push('Balance boldness: Set up guardrails and review checkpoints');
  } else if (results.mindset_personality.risk_tolerance === 'low') {
    riskManagement.push('Stretch comfort zone: Take 1 calculated risk per quarter');
  }
  
  sections.push({
    title: 'Risk Management & Blind Spots',
    items: riskManagement
  });

  // Section 7: 30-60-90 Day Roadmap
  const roadmap: string[] = [];
  
  // Next 30 days
  roadmap.push('**Days 1-30: Foundation**');
  results.layer7_profile.next_7_days.forEach((action, i) => {
    roadmap.push(`  Week ${Math.floor(i / 2) + 1}: ${action}`);
  });
  
  // 30-60 days
  roadmap.push('**Days 30-60: Integration**');
  if (results.opposite_awareness.overall < 70) {
    roadmap.push('  Strengthen mirror awareness through deliberate practice');
  }
  roadmap.push('  Apply EDNA adaptations to 2-3 live projects');
  roadmap.push('  Measure and iterate on your sprint rhythm');
  
  // 60-90 days
  roadmap.push('**Days 60-90: Optimization**');
  roadmap.push('  Refine decision templates based on outcomes');
  roadmap.push('  Codify your personalized operating system');
  if (results.core_type === 'blurred') {
    roadmap.push('  Choose and strengthen your primary core validator');
  }
  
  sections.push({
    title: '30-60-90 Day Roadmap',
    items: roadmap
  });

  // Section 8: Key Metrics to Track
  const metrics: string[] = [];
  
  if (subtypeProfile) {
    metrics.push(...subtypeProfile.edna_adaptations.metric_focus.slice(0, 3));
  }
  
  metrics.push(`Mirror awareness score: Track quarterly improvements`);
  
  if (results.layer7_scores.metrics_orientation > 70) {
    metrics.push('Quantitative dashboards: OKRs, KPIs, and data analytics');
  } else {
    metrics.push('Qualitative check-ins: Impact stories and customer feedback');
  }
  
  sections.push({
    title: 'Key Metrics to Track',
    items: metrics
  });

  return sections;
}

function getDecisionTemplateDescription(template: string): string {
  const descriptions: { [key: string]: string } = {
    premortem: 'Imagine failure, identify risks before starting',
    stopping_rules: 'Set clear "stop" criteria before investing',
    commit_log: 'Document decisions with reasoning for future review',
    monthly_strategy_ops: 'Review strategy alignment monthly',
    dual_metrics: 'Track both impact and stability KPIs',
    experiment_backlogs: 'Prioritize tests and validate hypotheses',
    demo_driven_discovery: 'Build proofs of concept before full commitment'
  };
  
  return descriptions[template] || 'Apply structured decision criteria';
}
