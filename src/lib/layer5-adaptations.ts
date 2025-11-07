// Layer 5 Neurodiversity & Accessibility - Platform Adaptations
// Neurocognitive variance and focus regulation

export interface NeurodiversityAdaptations {
  ui_modifications: string[];
  content_delivery: string[];
  communication_style: string[];
  workspace_features: string[];
  assessment_accommodations: string[];
}

export interface AccessibilityProfile {
  adhd_traits: boolean;
  dyslexia_traits: boolean;
  autism_traits: boolean;
  sensory_sensitivity: boolean;
  custom_needs: string[];
}

// ADHD-Specific Adaptations
const ADHD_ADAPTATIONS = {
  ui_modifications: [
    'Focus mode: Minimalist UI with reduced distractions',
    'Visual timers and progress indicators',
    'Gamification elements for sustained engagement',
    'Quick-access navigation shortcuts'
  ],
  content_delivery: [
    'Short, chunked content modules (5-10 min)',
    'Pomodoro-style work/break intervals (25min/5min)',
    'Multi-modal content: video, audio, interactive elements',
    'Immediate feedback loops'
  ],
  communication_style: [
    'Bullet-point summaries before deep content',
    'TL;DR sections at the top',
    'Visual anchors and color coding',
    'Action-oriented language'
  ],
  workspace_features: [
    'Customizable notification settings',
    'Task batching and priority highlighting',
    'Auto-save every 30 seconds',
    'Distraction-free writing mode'
  ]
};

// Dyslexia-Specific Adaptations
const DYSLEXIA_ADAPTATIONS = {
  ui_modifications: [
    'Dyslexia-friendly fonts (OpenDyslexic, Comic Sans)',
    'Increased line spacing (1.5-2.0)',
    'Text-to-speech for all written content',
    'Adjustable text size and contrast'
  ],
  content_delivery: [
    'Audio versions of all written materials',
    'Visual diagrams and flowcharts',
    'Video demonstrations over text instructions',
    'Reduced text density per screen'
  ],
  communication_style: [
    'Simple sentence structures',
    'Avoid dense paragraphs',
    'Use icons and visual metaphors',
    'Glossary tooltips for jargon'
  ],
  workspace_features: [
    'Voice-to-text input options',
    'Screen reader optimization',
    'High-contrast color themes',
    'Reading ruler/guide overlay'
  ]
};

// Autism-Specific Adaptations
const AUTISM_ADAPTATIONS = {
  ui_modifications: [
    'Predictable, consistent navigation patterns',
    'Clear visual hierarchy',
    'Explicit state indicators (loading, success, error)',
    'Reduced animations and transitions'
  ],
  content_delivery: [
    'Structured, sequential content flow',
    'Clear learning objectives upfront',
    'Detailed rubrics and expectations',
    'Consistent formatting and templates'
  ],
  communication_style: [
    'Direct, literal language (avoid idioms)',
    'Explicit instructions and expectations',
    'Clear success criteria',
    'Written confirmation of verbal discussions'
  ],
  workspace_features: [
    'Routine-based scheduling',
    'Advance notice of changes',
    'Private workspace option',
    'Sensory settings: mute sounds, reduce motion'
  ]
};

// Sensory Sensitivity Adaptations
const SENSORY_ADAPTATIONS = {
  ui_modifications: [
    'Soft color palettes (avoid bright/harsh colors)',
    'Dark mode option',
    'Minimal animations',
    'Reduced visual clutter'
  ],
  content_delivery: [
    'Adjustable playback speed for videos',
    'Captions/transcripts for audio/video',
    'Quiet background music option',
    'Soft transitions between sections'
  ],
  communication_style: [
    'Calm, neutral tone',
    'Avoid aggressive CTAs',
    'Gentle reminder notifications',
    'Opt-in rather than opt-out defaults'
  ],
  workspace_features: [
    'Focus mode with neutral background',
    'Customizable color temperature',
    'Volume controls on all media',
    'Zen mode: ultra-minimal interface'
  ]
};

// Generate comprehensive adaptations based on profile
export function generateAccessibilityAdaptations(
  profile: AccessibilityProfile
): NeurodiversityAdaptations {
  const adaptations: NeurodiversityAdaptations = {
    ui_modifications: [],
    content_delivery: [],
    communication_style: [],
    workspace_features: [],
    assessment_accommodations: []
  };

  // ADHD adaptations
  if (profile.adhd_traits) {
    adaptations.ui_modifications.push(...ADHD_ADAPTATIONS.ui_modifications);
    adaptations.content_delivery.push(...ADHD_ADAPTATIONS.content_delivery);
    adaptations.communication_style.push(...ADHD_ADAPTATIONS.communication_style);
    adaptations.workspace_features.push(...ADHD_ADAPTATIONS.workspace_features);
    adaptations.assessment_accommodations.push(
      'Extended time for assessments',
      'Ability to pause and resume',
      'Breaks between question sets'
    );
  }

  // Dyslexia adaptations
  if (profile.dyslexia_traits) {
    adaptations.ui_modifications.push(...DYSLEXIA_ADAPTATIONS.ui_modifications);
    adaptations.content_delivery.push(...DYSLEXIA_ADAPTATIONS.content_delivery);
    adaptations.communication_style.push(...DYSLEXIA_ADAPTATIONS.communication_style);
    adaptations.workspace_features.push(...DYSLEXIA_ADAPTATIONS.workspace_features);
    adaptations.assessment_accommodations.push(
      'Audio narration of questions',
      'Voice-to-text for responses',
      'Dyslexia-friendly fonts'
    );
  }

  // Autism adaptations
  if (profile.autism_traits) {
    adaptations.ui_modifications.push(...AUTISM_ADAPTATIONS.ui_modifications);
    adaptations.content_delivery.push(...AUTISM_ADAPTATIONS.content_delivery);
    adaptations.communication_style.push(...AUTISM_ADAPTATIONS.communication_style);
    adaptations.workspace_features.push(...AUTISM_ADAPTATIONS.workspace_features);
    adaptations.assessment_accommodations.push(
      'Clear progress indicators',
      'Estimated time remaining',
      'Option to preview all questions'
    );
  }

  // Sensory sensitivity adaptations
  if (profile.sensory_sensitivity) {
    adaptations.ui_modifications.push(...SENSORY_ADAPTATIONS.ui_modifications);
    adaptations.content_delivery.push(...SENSORY_ADAPTATIONS.content_delivery);
    adaptations.communication_style.push(...SENSORY_ADAPTATIONS.communication_style);
    adaptations.workspace_features.push(...SENSORY_ADAPTATIONS.workspace_features);
  }

  // Remove duplicates
  adaptations.ui_modifications = [...new Set(adaptations.ui_modifications)];
  adaptations.content_delivery = [...new Set(adaptations.content_delivery)];
  adaptations.communication_style = [...new Set(adaptations.communication_style)];
  adaptations.workspace_features = [...new Set(adaptations.workspace_features)];
  adaptations.assessment_accommodations = [...new Set(adaptations.assessment_accommodations)];

  return adaptations;
}

// Get summary of enabled adaptations
export function getAdaptationsSummary(profile: AccessibilityProfile): string[] {
  const summary: string[] = [];
  
  if (profile.adhd_traits) {
    summary.push('ADHD Support: Focus mode, chunked content, immediate feedback');
  }
  if (profile.dyslexia_traits) {
    summary.push('Dyslexia Support: Audio content, dyslexic fonts, text-to-speech');
  }
  if (profile.autism_traits) {
    summary.push('Autism Support: Consistent patterns, clear expectations, structured flow');
  }
  if (profile.sensory_sensitivity) {
    summary.push('Sensory Support: Soft colors, reduced motion, calm interface');
  }
  
  return summary;
}

// QA Checklist for neurodiversity support
export const NEURODIVERSITY_QA_CHECKLIST = {
  general: [
    'Frames traits as neutral patterns, not diagnoses',
    'Lists strengths and watchouts equally',
    'Adaptations are behavioral and contextual—not UI accessibility',
    'Language neutral, empowering, and aligned with EDNA core philosophy',
    'Integrates smoothly with Layers 1-4 data models'
  ],
  layer5_specific: [
    'No overlap with Layer 4 (learning preferences)',
    'No personality or risk profiling (→ Layer 6)',
    'No value orientation or belief mapping (→ Layer 7)',
    'Strictly focused on neurocognitive variance and focus regulation, not physical accessibility'
  ]
};
