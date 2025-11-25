// Profile Insights Dashboard - Comprehensive Analysis
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { EDNAResults } from './EDNAQuiz';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Target,
  Brain,
  Zap,
  Award,
  BarChart3,
  Lightbulb,
  Shield
} from 'lucide-react';

interface ProfileInsightsProps {
  results: EDNAResults;
}

export function ProfileInsights({ results }: ProfileInsightsProps) {
  // Calculate overall profile strength
  const profileStrength = calculateProfileStrength(results);
  
  // Identify growth opportunities
  const growthOpportunities = identifyGrowthOpportunities(results);
  
  // Detect synergies and conflicts
  const synergies = detectSynergies(results);
  const conflicts = detectConflicts(results);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl mb-2">Profile Insights & Analytics</h1>
          <p className="text-gray-600 text-lg">
            Deep analysis of your 7-layer EDNA profile
          </p>
        </div>

        {/* Profile Strength Score */}
        <Card className="mb-8 bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="w-6 h-6 text-purple-600" />
              <span>Overall Profile Strength</span>
            </CardTitle>
            <CardDescription>
              Composite score across all 7 layers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-5xl">{profileStrength.score}/100</span>
              <Badge className="text-lg px-4 py-2 bg-purple-600">
                {profileStrength.level}
              </Badge>
            </div>
            <Progress value={profileStrength.score} className="h-4 mb-4" />
            <p className="text-gray-700">{profileStrength.description}</p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Layer-by-Layer Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Layer-by-Layer Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <LayerScore 
                layer="Layer 1: Core Type"
                score={results.core_type === 'blurred' ? 50 : 90}
                description={results.core_type === 'blurred' ? 'Building clarity' : 'Strong identity'}
              />
              <LayerScore 
                layer="Layer 2: Subtype"
                score={85}
                description="Well-defined profile"
              />
              <LayerScore 
                layer="Layer 3: Mirror Awareness"
                score={results.opposite_awareness.overall}
                description={results.score_band}
              />
              <LayerScore 
                layer="Layer 4: Learning Style"
                score={80}
                description="Clear preferences"
              />
              <LayerScore 
                layer="Layer 5: Neurodiversity"
                score={results.neurodiversity_profile.capability_domains.attention_regulation.score}
                description={results.neurodiversity_profile.primary_pattern}
              />
              <LayerScore 
                layer="Layer 6: Mindset"
                score={results.layer6_profile.mindset_orientation.score}
                description={results.layer6_profile.mindset_orientation.type}
              />
              <LayerScore 
                layer="Layer 7: Values"
                score={(results.layer7_scores.growth_philosophy + results.layer7_scores.purpose_filter) / 2}
                description={results.layer7_profile.score_band}
              />
            </CardContent>
          </Card>

          {/* Growth Opportunities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Top Growth Opportunities</span>
              </CardTitle>
              <CardDescription>
                High-impact areas for development
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {growthOpportunities.map((opportunity, index) => (
                <div key={index} className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium">{opportunity.area}</h4>
                    <Badge variant="outline" className="text-xs">
                      +{opportunity.potential_impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700">{opportunity.description}</p>
                  <p className="text-sm text-green-700 mt-2">
                    <strong>Action:</strong> {opportunity.action}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Synergies */}
        {synergies.length > 0 && (
          <Card className="mb-8 border-2 border-teal-200 bg-teal-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-teal-600" />
                <span>Profile Synergies</span>
              </CardTitle>
              <CardDescription>
                Powerful combinations in your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {synergies.map((synergy, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-teal-300">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-teal-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">{synergy.combination}</h4>
                        <p className="text-sm text-gray-700">{synergy.benefit}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Conflicts/Tensions */}
        {conflicts.length > 0 && (
          <Card className="mb-8 border-2 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span>Profile Tensions</span>
              </CardTitle>
              <CardDescription>
                Areas requiring balance and integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conflicts.map((conflict, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-yellow-300">
                    <h4 className="font-medium mb-2 text-yellow-900">⚠️ {conflict.tension}</h4>
                    <p className="text-sm text-gray-700 mb-2">{conflict.description}</p>
                    <p className="text-sm text-green-700">
                      <strong>Integration Strategy:</strong> {conflict.resolution}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommended Focus Areas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span>Recommended Focus Areas (Next 90 Days)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <FocusArea 
                priority="High"
                title="Mirror Skill Development"
                description={`Strengthen your ${results.core_type === 'architect' ? 'Alchemist' : 'Architect'} capabilities`}
                progress={results.opposite_awareness.overall}
              />
              <FocusArea 
                priority="Medium"
                title="Value Alignment"
                description="Resolve detected misalignments"
                progress={results.misalignments.length === 0 ? 90 : 50}
              />
              <FocusArea 
                priority="Medium"
                title="Learning Optimization"
                description="Apply your learning style preferences"
                progress={70}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper Components
function LayerScore({ layer, score, description }: { layer: string; score: number; description: string }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium">{layer}</span>
        <span className="text-sm text-gray-600">{Math.round(score)}/100</span>
      </div>
      <Progress value={score} className="h-2 mb-1" />
      <p className="text-xs text-gray-600 capitalize">{description}</p>
    </div>
  );
}

function FocusArea({ priority, title, description, progress }: {
  priority: string;
  title: string;
  description: string;
  progress: number;
}) {
  const priorityColor = priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700';
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg border">
      <Badge className={`${priorityColor} mb-3`}>{priority} Priority</Badge>
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
}

// Analysis Functions
function calculateProfileStrength(results: EDNAResults) {
  const scores = [
    results.core_type === 'blurred' ? 50 : 90,
    85, // Subtype
    results.opposite_awareness.overall,
    80, // Learning style
    results.neurodiversity_profile.capability_domains.attention_regulation.score,
    results.layer6_profile.mindset_orientation.score,
    (results.layer7_scores.growth_philosophy + results.layer7_scores.purpose_filter) / 2
  ];
  
  const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  
  let level = 'Developing';
  let description = 'Your profile shows clear strengths and areas for growth.';
  
  if (avgScore >= 85) {
    level = 'Exceptional';
    description = 'Your profile demonstrates exceptional clarity and integration across all layers.';
  } else if (avgScore >= 75) {
    level = 'Strong';
    description = 'Your profile shows strong clarity with high integration potential.';
  } else if (avgScore >= 65) {
    level = 'Solid';
    description = 'Your profile is well-formed with clear development pathways.';
  }
  
  return { score: avgScore, level, description };
}

function identifyGrowthOpportunities(results: EDNAResults) {
  const opportunities = [];
  
  if (results.opposite_awareness.overall < 75) {
    opportunities.push({
      area: 'Mirror Awareness Development',
      potential_impact: 'High',
      description: `Build your ${results.core_type === 'architect' ? 'Alchemist' : 'Architect'} capabilities to reach Mastery level.`,
      action: `Focus on ${results.opposite_awareness.T < 70 ? 'Translation' : 'Integration'} skills through dedicated practice.`
    });
  }
  
  if (results.misalignments.length > 0) {
    opportunities.push({
      area: 'Value Alignment',
      potential_impact: 'High',
      description: 'Resolve value conflicts to unlock faster decision-making and execution.',
      action: results.misalignments[0].remedy
    });
  }
  
  if (results.layer6_profile.risk_style.type === 'low') {
    opportunities.push({
      area: 'Calculated Risk-Taking',
      potential_impact: 'Medium',
      description: 'Expand comfort zone with structured experimentation.',
      action: 'Start with one safe-to-fail experiment per month.'
    });
  }
  
  return opportunities.slice(0, 3);
}

function detectSynergies(results: EDNAResults) {
  const synergies = [];
  
  // Growth mindset + High risk = Innovation powerhouse
  if (results.layer6_profile.mindset_orientation.type === 'growth' && 
      results.layer6_profile.risk_style.type === 'high') {
    synergies.push({
      combination: 'Growth Mindset + High Risk Tolerance',
      benefit: 'Creates an innovation powerhouse—rapid iteration with learning mindset enables breakthrough discoveries.'
    });
  }
  
  // Mission-driven + Architect = Impact systemizer
  if (results.layer7_scores.purpose_filter > 70 && results.core_type === 'architect') {
    synergies.push({
      combination: 'Mission-Driven Values + Architect Type',
      benefit: 'Builds scalable impact systems—combines purpose with systematic execution for measurable change.'
    });
  }
  
  // High mirror awareness + Blurred = Ultimate integrator
  if (results.opposite_awareness.overall >= 75 && results.core_type === 'blurred') {
    synergies.push({
      combination: 'High Mirror Awareness + Blurred Type',
      benefit: 'Ultimate integrator capacity—can fluidly switch between systematic and creative modes as needed.'
    });
  }
  
  return synergies;
}

function detectConflicts(results: EDNAResults) {
  const conflicts = [];
  
  // Add Layer 7 misalignments
  results.misalignments.forEach(m => {
    conflicts.push({
      tension: m.type,
      description: `${m.description} - ${m.impact}`,
      resolution: m.remedy
    });
  });
  
  // Fixed mindset + Innovation values
  if (results.layer6_profile.mindset_orientation.type === 'fixed' && 
      results.layer7_scores.change_appetite > 70) {
    conflicts.push({
      tension: 'Fixed Mindset + Innovation Values',
      description: 'Values innovation but prefers stability—creates hesitation in experimentation.',
      resolution: 'Start with low-risk innovation sprints in controlled environments to build confidence.'
    });
  }
  
  return conflicts;
}
