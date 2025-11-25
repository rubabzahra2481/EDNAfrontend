// Layer 7 Meta-Beliefs & Values - Comprehensive Analysis System
// Based on the 7-layer EDNA framework

export interface Layer7Scores {
  growth_philosophy: number; // 0-100: Craftsmanship (0) to Speed/Bold Scaling (100)
  purpose_filter: number; // 0-100: Profit-Focused (0) to Mission-Driven (100)
  change_appetite: number; // 0-100: Stability/Perfection (0) to Innovation (100)
  metrics_orientation: number; // 0-100: Numbers-Averse (0) to Numbers-Confident (100)
  social_worldview: number; // 0-100: Competitive (0) to Collaborative (100)
  resource_worldview: number; // 0-100: Scarcity (0) to Abundance (100)
}

export interface ValueProfile {
  headline: string;
  one_liner: string;
  strengths: string[];
  watchouts: string[];
  edna_adaptations: string[];
  next_7_days: string[];
  score_band: string;
}

export interface MisalignmentPattern {
  type: string;
  description: string;
  impact: string;
  remedy: string;
}

export interface ConflictedBelief {
  dimension: string;
  belief1: string;
  belief1_norm: number;
  belief2: string;
  belief2_norm: number;
  conflict_type: 'cognitive_dissonance';
  coaching_prompt: string;
}

export interface BeliefCategory {
  category: string;
  normalized_score: number;
  is_dominant: boolean; // norm ≥ 40% AND gap ≥ 12%
}

/**
 * Calculate normalized belief scores for Layer 7
 * Per specifications: Map options to belief categories and normalize
 * 
 * Belief categories:
 * - "bold scaling" vs "quality-first"
 * - "numbers-confidence" vs numbers-averse
 * - "scarcity/abundance"
 * - "perfectionism vs iterative"
 * - "zero-sum vs collaborative"
 */
export function calculateLayer7Scores(answers: any[]): Layer7Scores {
  const layer7Answers = answers.filter(a => a.layer === 7);
  
  // Count responses for each belief category
  const beliefCounts: { [key: string]: { [belief: string]: number } } = {
    growth_philosophy: { bold_scaling: 0, quality_first: 0, balanced: 0 },
    purpose_filter: { mission_driven: 0, profit_focused: 0, balanced: 0 },
    change_appetite: { iterative: 0, perfectionism: 0, balanced: 0 },
    metrics_orientation: { numbers_confident: 0, numbers_averse: 0, developing: 0 },
    social_worldview: { collaborative: 0, zero_sum: 0, independent: 0 },
    resource_worldview: { abundance: 0, scarcity: 0, realistic: 0 }
  };

  // Map answers to belief categories based on actual question values
  layer7Answers.forEach(answer => {
    const dimension = answer.dimension;
    const selected = answer.selected;

    // Growth beliefs: bold_scaling, quality_concern, quality_first, cautious_pacing
    if (dimension === 'growth_belief') {
      if (selected === 'bold_scaling') beliefCounts.growth_philosophy.bold_scaling++;
      else if (selected === 'quality_first' || selected === 'quality_concern') beliefCounts.growth_philosophy.quality_first++;
      else beliefCounts.growth_philosophy.balanced++;
    } 
    // Financial beliefs: strong_efficacy, avoidance, cautious_trust, anxiety_math
    else if (dimension === 'financial_belief') {
      if (selected === 'strong_efficacy') beliefCounts.metrics_orientation.numbers_confident++;
      else if (selected === 'avoidance' || selected === 'anxiety_math') beliefCounts.metrics_orientation.numbers_averse++;
      else beliefCounts.metrics_orientation.developing++;
    }
    // Money & success: financial_wealth, values_over_income, balanced_view, success_drawbacks
    else if (dimension === 'money_success') {
      if (selected === 'financial_wealth') beliefCounts.purpose_filter.profit_focused++;
      else if (selected === 'values_over_income') beliefCounts.purpose_filter.mission_driven++;
      else beliefCounts.purpose_filter.balanced++;
    }
    // Achievement response: achievement_fuels, anxiety_sustaining, impostor_feelings, never_satisfied
    else if (dimension === 'achievement_response') {
      if (selected === 'achievement_fuels') beliefCounts.resource_worldview.abundance++;
      else if (selected === 'anxiety_sustaining' || selected === 'impostor_feelings') beliefCounts.resource_worldview.scarcity++;
      else beliefCounts.resource_worldview.realistic++;
    }
    // Completion approach: perfectionism, iterative_progress, over_checking, speed_over_polish
    else if (dimension === 'completion_approach') {
      if (selected === 'iterative_progress' || selected === 'speed_over_polish') beliefCounts.change_appetite.iterative++;
      else if (selected === 'perfectionism' || selected === 'over_checking') beliefCounts.change_appetite.perfectionism++;
      else beliefCounts.change_appetite.balanced++;
    }
    // Competition view: zero_sum, abundance_partnering, independent_approach, cautious_cooperation
    else if (dimension === 'competition_view') {
      if (selected === 'zero_sum') beliefCounts.social_worldview.zero_sum++;
      else if (selected === 'abundance_partnering') beliefCounts.social_worldview.collaborative++;
      else beliefCounts.social_worldview.independent++;
    }
    // Challenge response, opportunity mindset, etc. - map to appropriate categories
    else if (dimension === 'challenge_response') {
      if (selected === 'bold_risk') beliefCounts.growth_philosophy.bold_scaling++;
      else if (selected === 'fear_hesitation' || selected === 'aversion_innovation') beliefCounts.growth_philosophy.quality_first++;
      else beliefCounts.growth_philosophy.balanced++;
    }
  });

  // Calculate normalized scores (0-100)
  // For polarized dimensions: high end = 85, balanced = 50, low end = 15
  
  // Growth Philosophy: Quality-First (0) to Bold Scaling (100)
  const growthTotal = beliefCounts.growth_philosophy.bold_scaling + 
                      beliefCounts.growth_philosophy.quality_first + 
                      beliefCounts.growth_philosophy.balanced;
  const growth_philosophy = growthTotal > 0 
    ? ((beliefCounts.growth_philosophy.bold_scaling * 85 + 
        beliefCounts.growth_philosophy.balanced * 50 + 
        beliefCounts.growth_philosophy.quality_first * 15) / growthTotal)
    : 50;

  // Purpose Filter: Profit (0) to Mission (100)
  const purposeTotal = beliefCounts.purpose_filter.mission_driven + 
                       beliefCounts.purpose_filter.profit_focused + 
                       beliefCounts.purpose_filter.balanced;
  const purpose_filter = purposeTotal > 0
    ? ((beliefCounts.purpose_filter.mission_driven * 85 + 
        beliefCounts.purpose_filter.balanced * 50 + 
        beliefCounts.purpose_filter.profit_focused * 15) / purposeTotal)
    : 50;

  // Change Appetite: Perfectionism (0) to Iterative (100)
  const changeTotal = beliefCounts.change_appetite.iterative + 
                      beliefCounts.change_appetite.perfectionism + 
                      beliefCounts.change_appetite.balanced;
  const change_appetite = changeTotal > 0
    ? ((beliefCounts.change_appetite.iterative * 85 + 
        beliefCounts.change_appetite.balanced * 50 + 
        beliefCounts.change_appetite.perfectionism * 15) / changeTotal)
    : 50;

  // Metrics Orientation: Numbers-Averse (0) to Numbers-Confident (100)
  const metricsTotal = beliefCounts.metrics_orientation.numbers_confident + 
                       beliefCounts.metrics_orientation.numbers_averse + 
                       beliefCounts.metrics_orientation.developing;
  const metrics_orientation = metricsTotal > 0
    ? ((beliefCounts.metrics_orientation.numbers_confident * 85 + 
        beliefCounts.metrics_orientation.developing * 50 + 
        beliefCounts.metrics_orientation.numbers_averse * 15) / metricsTotal)
    : 50;

  // Social Worldview: Zero-Sum (0) to Collaborative (100)
  const socialTotal = beliefCounts.social_worldview.collaborative + 
                      beliefCounts.social_worldview.zero_sum + 
                      beliefCounts.social_worldview.independent;
  const social_worldview = socialTotal > 0
    ? ((beliefCounts.social_worldview.collaborative * 85 + 
        beliefCounts.social_worldview.independent * 50 + 
        beliefCounts.social_worldview.zero_sum * 15) / socialTotal)
    : 50;

  // Resource Worldview: Scarcity (0) to Abundance (100)
  const resourceTotal = beliefCounts.resource_worldview.abundance + 
                        beliefCounts.resource_worldview.scarcity + 
                        beliefCounts.resource_worldview.realistic;
  const resource_worldview = resourceTotal > 0
    ? ((beliefCounts.resource_worldview.abundance * 85 + 
        beliefCounts.resource_worldview.realistic * 50 + 
        beliefCounts.resource_worldview.scarcity * 15) / resourceTotal)
    : 50;

  return {
    growth_philosophy,
    purpose_filter,
    change_appetite,
    metrics_orientation,
    social_worldview,
    resource_worldview
  };
}

// Detect value misalignments (failure patterns)
export function detectMisalignments(scores: Layer7Scores): MisalignmentPattern[] {
  const patterns: MisalignmentPattern[] = [];

  // Speed + Scarcity: pushes rapid expansion while fearing resource depletion
  if (scores.growth_philosophy > 70 && scores.resource_worldview < 30) {
    patterns.push({
      type: 'Speed + Scarcity',
      description: 'Pushes rapid expansion while fearing resource depletion',
      impact: 'Leads to burnout or financial strain',
      remedy: 'Speed/Bold Scaling: adds stage gates and stability checks'
    });
  }

  // Mission + Numbers-Averse: deep purpose but weak proof of impact
  if (scores.purpose_filter > 70 && scores.metrics_orientation < 30) {
    patterns.push({
      type: 'Mission + Numbers-Averse',
      description: 'Deep purpose but weak proof of impact',
      impact: 'Makes impact claims without measurable validation',
      remedy: 'Mission-Driven: translates ROI into impact language'
    });
  }

  // Craftsmanship + Competitive: paralysis by perfection while trying to "win"
  if (scores.growth_philosophy < 30 && scores.social_worldview < 30) {
    patterns.push({
      type: 'Craftsmanship + Competitive',
      description: 'Paralysis by perfection while trying to "win"',
      impact: 'Over-polishing without shipping leads to being outpaced',
      remedy: 'Craftsmanship: prompts "good-enough to ship" thresholds'
    });
  }

  // Innovation + Scarcity: constant pivoting without stability
  if (scores.change_appetite > 70 && scores.resource_worldview < 30) {
    patterns.push({
      type: 'Innovation + Scarcity',
      description: 'Constant pivoting without stability',
      impact: 'Leads to instability or team fatigue',
      remedy: 'Innovation-Oriented: inserts consolidation and review cycles'
    });
  }

  return patterns;
}

/**
 * Detect dominant meta-beliefs
 * Per specifications: belief_norm ≥ 40% AND gap ≥ 12%
 */
export function detectDominantBeliefs(answers: any[]): BeliefCategory[] {
  const layer7Answers = answers.filter(a => a.layer === 7);
  const dominantBeliefs: BeliefCategory[] = [];

  // Count responses for each dimension
  const dimensionCounts: { [dimension: string]: { [belief: string]: number } } = {};
  
  layer7Answers.forEach(answer => {
    const dimension = answer.dimension;
    const selected = answer.selected;
    
    if (!dimensionCounts[dimension]) {
      dimensionCounts[dimension] = {};
    }
    
    dimensionCounts[dimension][selected] = (dimensionCounts[dimension][selected] || 0) + 1;
  });

  // For each dimension, calculate normalized scores and check for dominance
  Object.entries(dimensionCounts).forEach(([dimension, counts]) => {
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) return;

    // Calculate normalized percentages
    const beliefs = Object.entries(counts).map(([belief, count]) => ({
      belief,
      norm: (count / total) * 100
    }));

    // Sort by normalized score
    beliefs.sort((a, b) => b.norm - a.norm);

    // Check for dominant belief: norm ≥ 40% AND gap ≥ 12%
    const topBelief = beliefs[0];
    const secondBelief = beliefs[1];
    const gap = secondBelief ? (topBelief.norm - secondBelief.norm) : topBelief.norm;

    if (topBelief.norm >= 40 && gap >= 12) {
      dominantBeliefs.push({
        category: `${dimension}: ${topBelief.belief}`,
        normalized_score: topBelief.norm,
        is_dominant: true
      });
    } else {
      // Report top belief even if not dominant
      dominantBeliefs.push({
        category: `${dimension}: ${topBelief.belief}`,
        normalized_score: topBelief.norm,
        is_dominant: false
      });
    }
  });

  return dominantBeliefs;
}

/**
 * Detect conflicted beliefs (cognitive dissonance)
 * Per specifications: two beliefs both ≥30% and opposing
 * Example: "growth is priority" AND "growth compromises quality"
 */
export function detectConflictedBeliefs(answers: any[]): ConflictedBelief[] {
  const layer7Answers = answers.filter(a => a.layer === 7);
  const conflicts: ConflictedBelief[] = [];

  // Define opposing belief pairs for each dimension
  const opposingPairs: { [dimension: string]: string[][] } = {
    growth_belief: [['bold_scaling', 'quality_first'], ['bold_scaling', 'quality_concern']],
    financial_belief: [['strong_efficacy', 'avoidance'], ['strong_efficacy', 'anxiety_math']],
    money_success: [['financial_wealth', 'values_over_income']],
    achievement_response: [['achievement_fuels', 'anxiety_sustaining'], ['achievement_fuels', 'impostor_feelings']],
    completion_approach: [['perfectionism', 'iterative_progress'], ['perfectionism', 'speed_over_polish']],
    competition_view: [['zero_sum', 'abundance_partnering']],
    challenge_response: [['bold_risk', 'fear_hesitation'], ['bold_risk', 'aversion_innovation']]
  };

  // Count responses for each dimension
  const dimensionCounts: { [dimension: string]: { [belief: string]: number } } = {};
  
  layer7Answers.forEach(answer => {
    const dimension = answer.dimension;
    const selected = answer.selected;
    
    if (!dimensionCounts[dimension]) {
      dimensionCounts[dimension] = {};
    }
    
    dimensionCounts[dimension][selected] = (dimensionCounts[dimension][selected] || 0) + 1;
  });

  // Check each dimension for conflicted beliefs
  Object.entries(dimensionCounts).forEach(([dimension, counts]) => {
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    if (total === 0) return;

    // Calculate normalized percentages
    const beliefNorms: { [belief: string]: number } = {};
    Object.entries(counts).forEach(([belief, count]) => {
      beliefNorms[belief] = (count / total) * 100;
    });

    // Check each opposing pair
    const pairs = opposingPairs[dimension] || [];
    pairs.forEach(([belief1, belief2]) => {
      const norm1 = beliefNorms[belief1] || 0;
      const norm2 = beliefNorms[belief2] || 0;

      // Both beliefs ≥ 30% indicates conflict
      if (norm1 >= 30 && norm2 >= 30) {
        conflicts.push({
          dimension,
          belief1,
          belief1_norm: norm1,
          belief2,
          belief2_norm: norm2,
          conflict_type: 'cognitive_dissonance',
          coaching_prompt: generateCoachingPrompt(dimension, belief1, belief2)
        });
      }
    });
  });

  return conflicts;
}

/**
 * Generate coaching prompts for conflicted beliefs
 */
function generateCoachingPrompt(dimension: string, belief1: string, belief2: string): string {
  const prompts: { [key: string]: string } = {
    scaling_bold_craftsmanship: 'You value both rapid growth and quality craftsmanship. Consider: How can you build stage gates that protect quality while maintaining momentum? What does "good enough to scale" look like for your business?',
    mission_profit: 'You\'re torn between mission impact and financial returns. Explore: How might your mission drive sustainable profitability? What metrics prove both impact AND financial health?',
    innovation_stability: 'You want both innovation and stability. Reflect: Can you create innovation windows within stable frameworks? How do you balance experimentation with proven processes?',
    numbers_confident_averse: 'You have conflicting feelings about metrics and data. Consider: What stories do your numbers tell? How can visual dashboards make data feel less intimidating?',
    market_contrarian_competitive: 'You want to stand out but also compete directly. Explore: Where does differentiation create competitive advantage? When is it better to be different vs. better?',
    abundance_scarcity: 'You oscillate between abundance and scarcity mindset. Reflect: What evidence supports abundance in your market? What fears drive scarcity thinking?'
  };

  const key = `${dimension}_${belief1}_${belief2}`.replace(/_oriented|_driven|_focused/g, '');
  return prompts[key] || `You show conflicting beliefs in ${dimension}. Take time to explore which belief serves your goals best, or how these beliefs might complement each other in different contexts.`;
}

// Generate comprehensive value profile
export function generateValueProfile(scores: Layer7Scores, misalignments: MisalignmentPattern[]): ValueProfile {
  const dominantValues = getDominantValues(scores);
  const headline = generateHeadline(dominantValues);
  const one_liner = generateOneLiner(dominantValues, scores);
  
  return {
    headline,
    one_liner,
    strengths: generateStrengths(dominantValues),
    watchouts: generateWatchouts(dominantValues, misalignments),
    edna_adaptations: generateAdaptations(scores),
    next_7_days: generateNext7Days(dominantValues, scores),
    score_band: getScoreBand(scores)
  };
}

function getDominantValues(scores: Layer7Scores): string[] {
  const values: string[] = [];
  
  if (scores.growth_philosophy > 70) values.push('Bold Scaling');
  else if (scores.growth_philosophy < 40) values.push('Craftsmanship');
  
  if (scores.purpose_filter > 70) values.push('Mission-Driven');
  else if (scores.purpose_filter < 40) values.push('Profit-Focused');
  
  if (scores.change_appetite > 70) values.push('Innovation');
  else if (scores.change_appetite < 40) values.push('Stability');
  
  if (scores.social_worldview > 60) values.push('Collaborative');
  else if (scores.social_worldview < 40) values.push('Competitive');
  
  return values;
}

function generateHeadline(values: string[]): string {
  if (values.length === 0) return 'Balanced & Adaptive Values';
  
  const combinations: { [key: string]: string } = {
    'Bold Scaling,Mission-Driven': 'Meta-Beliefs & Values: Mission-Driven, Bold Scaling, Collaborative',
    'Bold Scaling,Profit-Focused': 'Meta-Beliefs & Values: Profit-Focused, Bold Scaling, Competitive',
    'Craftsmanship,Mission-Driven': 'Meta-Beliefs & Values: Mission-Driven, Craftsmanship-Oriented, Collaborative',
    'Craftsmanship,Profit-Focused': 'Meta-Beliefs & Values: Profit-Focused, Craftsmanship-Oriented',
  };
  
  const key = values.slice(0, 2).join(',');
  return combinations[key] || `Meta-Beliefs & Values: ${values.slice(0, 3).join(', ')}`;
}

function generateOneLiner(values: string[], scores: Layer7Scores): string {
  if (scores.purpose_filter > 70 && scores.growth_philosophy < 40) {
    return 'You believe success means creating meaningful, high-quality work that benefits others.';
  }
  if (scores.purpose_filter > 70 && scores.growth_philosophy > 70) {
    return 'You believe success means rapid, mission-driven impact at scale.';
  }
  if (scores.purpose_filter < 40 && scores.growth_philosophy > 70) {
    return 'You believe success means building wealth through aggressive scaling and market dominance.';
  }
  if (scores.purpose_filter < 40 && scores.growth_philosophy < 40) {
    return 'You believe success means sustainable profitability through excellence and craftsmanship.';
  }
  
  return 'You approach uncertainty as opportunity, test before committing, and adapt your energy flow to context.';
}

function generateStrengths(values: string[]): string[] {
  const strengthMap: { [key: string]: string[] } = {
    'Bold Scaling': ['Aggressive growth mindset', 'Comfortable with rapid change', 'Market-disruption thinking'],
    'Craftsmanship': ['Purpose-anchored focus', 'Commitment to quality and trust', 'Builds loyal, value-aligned communities'],
    'Mission-Driven': ['Strong values alignment', 'Authentic stakeholder relationships', 'Long-term sustainability focus'],
    'Profit-Focused': ['Clear financial metrics', 'ROI-driven decisions', 'Resource efficiency'],
    'Innovation': ['Experimentation mindset', 'Adaptability to change', 'Creative problem-solving'],
    'Stability': ['Predictable execution', 'Risk mitigation', 'Process excellence'],
    'Collaborative': ['Partnership orientation', 'Co-creation mindset', 'Network effects'],
    'Competitive': ['Performance-driven', 'Benchmark focus', 'Winning mentality']
  };
  
  const strengths: string[] = [];
  values.forEach(value => {
    if (strengthMap[value]) {
      strengths.push(...strengthMap[value]);
    }
  });
  
  return strengths.slice(0, 3);
}

function generateWatchouts(values: string[], misalignments: MisalignmentPattern[]): string[] {
  const watchouts: string[] = misalignments.map(m => m.description);
  
  const watchoutMap: { [key: string]: string } = {
    'Bold Scaling': 'May delay scaling to protect standards',
    'Craftsmanship': 'Can underweight speed or financial proof',
    'Mission-Driven': 'Risk of over-collaboration without boundaries',
    'Profit-Focused': 'May miss purpose-driven market opportunities',
    'Innovation': 'May skip reflection after rapid execution',
    'Stability': 'Risk of decision fatigue under pressure',
    'Competitive': 'May burn relationships in pursuit of winning'
  };
  
  values.forEach(value => {
    if (watchoutMap[value] && watchouts.length < 3) {
      watchouts.push(watchoutMap[value]);
    }
  });
  
  return watchouts;
}

function generateAdaptations(scores: Layer7Scores): string[] {
  const adaptations: string[] = [];
  
  if (scores.growth_philosophy > 70) {
    adaptations.push('Speed/Bold Scaling: adds stage gates and stability checks');
  } else if (scores.growth_philosophy < 40) {
    adaptations.push('Craftsmanship: prompts "good-enough to ship" thresholds');
  }
  
  if (scores.purpose_filter > 70) {
    adaptations.push('Mission-Driven: translates ROI into impact language');
  } else if (scores.purpose_filter < 40) {
    adaptations.push('Profit-Focused: frames outcomes as financial progress first');
  }
  
  if (scores.change_appetite > 70) {
    adaptations.push('Innovation-Oriented: inserts consolidation and review cycles');
  } else if (scores.change_appetite < 40) {
    adaptations.push('Stability-Oriented: adds periodic innovation windows');
  }
  
  if (scores.metrics_orientation > 70) {
    adaptations.push('Numbers-Confident: integrates qualitative context reminders');
  } else if (scores.metrics_orientation < 40) {
    adaptations.push('Numbers-Averse: pairs stories with proof summaries');
  }
  
  if (scores.social_worldview > 60) {
    adaptations.push('Collaborative: builds boundary contracts and role clarity');
  } else if (scores.social_worldview < 40) {
    adaptations.push('Competitive: frames competition as positive-sum benchmarking');
  }
  
  if (scores.resource_worldview > 70) {
    adaptations.push('Abundance: adds resource and feasibility checks');
  } else if (scores.resource_worldview < 40) {
    adaptations.push('Scarcity: adds experiments for resource leverage and expansion');
  }
  
  return adaptations;
}

function generateNext7Days(values: string[], scores: Layer7Scores): string[] {
  const actions: string[] = [];
  
  if (scores.purpose_filter > 70) {
    actions.push('Define a "good-enough" threshold for a live project');
    actions.push('Translate mission into two quantifiable impact metrics');
  } else {
    actions.push('Identify one mission element that drives your financial strategy');
    actions.push('Set one profitability milestone for the next quarter');
  }
  
  if (scores.social_worldview > 60) {
    actions.push('Run a collaborative task with explicit success boundaries');
  } else {
    actions.push('Identify one competitor strength you can learn from');
  }
  
  return actions.slice(0, 3);
}

function getScoreBand(scores: Layer7Scores): string {
  // Determine if values are polarized or balanced
  const allScores = Object.values(scores);
  const extremeScores = allScores.filter(s => s < 40 || s > 70).length;
  
  if (extremeScores >= 4) return 'Highly Polarized';
  if (extremeScores >= 2) return 'Moderately Polarized';
  return 'Balanced & Contextual';
}

// Generate data schema for backend storage
export function generateLayer7DataSchema(scores: Layer7Scores, profile: ValueProfile) {
  return {
    meta_beliefs: {
      growth: scores.growth_philosophy > 70 ? 'speed | craftsmanship' : 
             scores.growth_philosophy < 40 ? 'craftsmanship' : 'balanced',
      purpose: scores.purpose_filter > 70 ? 'mission | profit' : 
               scores.purpose_filter < 40 ? 'profit' : 'balanced',
      scores: {
        growth_philosophy: scores.growth_philosophy,
        purpose_filter: scores.purpose_filter,
        change_appetite: scores.change_appetite,
        metrics_orientation: scores.metrics_orientation,
        social_worldview: scores.social_worldview,
        resource_worldview: scores.resource_worldview
      },
      risk: '0-100',
      energy: '0-100'
    },
    adaptations_enabled: profile.edna_adaptations,
    misalignments_detected: []
  };
}
