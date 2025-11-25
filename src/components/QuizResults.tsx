import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { EDNAResults } from './EDNAQuiz';
import { getSubtypeProfile, SUBTYPE_PROFILES } from '../lib/subtype-data';
import { downloadProfile } from '../lib/profile-export';
import { generatePersonalizedPlaybook } from '../lib/playbook-generator';
import { 
  BarChart3, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  BookOpen, 
  MessageSquare,
  Share2,
  RefreshCw,
  Building2,
  Sparkles,
  Brain,
  Eye,
  ArrowLeftRight,
  Layers,
  Shield,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Award,
  Download,
  FileText,
  Activity
} from 'lucide-react';

interface QuizResultsProps {
  results: EDNAResults;
  onViewChange: (view: string) => void;
  onRetakeQuiz: () => void;
}

export function QuizResults({ results, onViewChange, onRetakeQuiz }: QuizResultsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  const getPersonaDisplay = () => {
    if (results.core_type === 'blurred') {
      return {
        title: 'The Blurred Ultimate',
        subtitle: 'Balanced Integrator',
        color: 'teal',
        icon: Brain,
        description: 'You exhibit balanced traits from both Architect and Alchemist, with the unique ability to integrate systematic and creative approaches. This positions you as a versatile leader who can bridge different thinking styles.'
      };
    } else if (results.core_type === 'architect') {
      return {
        title: 'The Architect',
        subtitle: 'Systematic Builder',
        color: 'purple',
        icon: Building2,
        description: 'You are a systematic builder who creates structured, scalable businesses through strategic planning and data-driven decisions.'
      };
    } else {
      return {
        title: 'The Alchemist',
        subtitle: 'Creative Innovator',
        color: 'orange',
        icon: Sparkles,
        description: 'You are an intuitive innovator who transforms creative ideas into breakthrough solutions through experimentation and vision.'
      };
    }
  };

  const persona = getPersonaDisplay();
  const PersonaIcon = persona.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient */}
      <section className="section-padding-bs bg-gradient-arch-scale">
        <div className="container-bs-desktop">
          <div className="text-center max-w-4xl mx-auto">
            <div className="w-28 h-28 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 border-white/40">
              <PersonaIcon className="w-14 h-14 text-white" />
            </div>
            <h1 className="typo-h1-bs text-white mb-4">Your E-DNA Results</h1>
            <h2 className="typo-h2-bs text-white mb-4">{persona.title}</h2>
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <span className="typo-h3-bs text-white">{persona.subtitle}</span>
            </div>
            <p className="typo-body-bs text-white/90 max-w-2xl mx-auto">
              {persona.description}
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="py-8 border-b border-gray-100 bg-gray-50">
        <div className="container-bs-desktop">
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => onViewChange('dashboard')} 
              className="cta-gradient-bs px-6 flex items-center gap-2"
            >
              <Target className="w-5 h-5" />
              <span>Go to Dashboard</span>
            </button>
            <Button 
              onClick={() => onViewChange('chat')} 
              variant="outline"
              className="h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)] hover:bg-[var(--bs-color-indigo)] hover:text-white"
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Chat with AI Mentor
            </Button>
            <Button 
              onClick={() => downloadProfile(results, 'markdown')} 
              variant="outline"
              className="h-[var(--bs-cta-height)] border-2 border-gray-300 hover:bg-gray-100"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Profile
            </Button>
            <Button 
              onClick={onRetakeQuiz} 
              variant="outline"
              className="h-[var(--bs-cta-height)] border-2 border-gray-300 hover:bg-gray-100"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Assessment
            </Button>
          </div>
        </div>
      </section>

      {/* Key Metrics Summary */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <h2 className="typo-h2-bs text-center mb-[var(--bs-spacing-section-heading)]">
            Your DNA Profile
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="program-flow-card text-center">
              <p className="typo-caption-bs text-gray-600 mb-2">Core Type</p>
              <p className="typo-h3-bs text-gradient-arch-scale capitalize">{results.core_type}</p>
            </div>
            
            <div className="program-flow-card text-center">
              <p className="typo-caption-bs text-gray-600 mb-2">Primary Subtype</p>
              <p className="typo-body-bs capitalize">{formatSubtype(results.subtype[0])}</p>
            </div>
            
            <div className="program-flow-card text-center">
              <p className="typo-caption-bs text-gray-600 mb-2">Mirror Awareness</p>
              <p className="typo-h3-bs text-[var(--bs-color-orange)]">{results.opposite_awareness.overall}/100</p>
              <Badge variant="secondary" className="mt-1">{results.score_band}</Badge>
            </div>
            
            <div className="program-flow-card text-center">
              <p className="typo-caption-bs text-gray-600 mb-2">Sprint Style</p>
              <p className="typo-body-bs capitalize">
                {typeof results.sprint_style === 'string' 
                  ? results.sprint_style.replace(/_/g, ' ')
                  : Array.isArray(results.sprint_style)
                    ? results.sprint_style.join(', ')
                    : 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="section-padding-bs bg-gray-50">
        <div className="container-bs-desktop">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="mirror">Mirror Awareness</TabsTrigger>
            <TabsTrigger value="subtype">Subtype Profile</TabsTrigger>
            <TabsTrigger value="learning">Learning & Growth</TabsTrigger>
            <TabsTrigger value="playbook">Your Playbook</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Core Type Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Core Type Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4 text-purple-600" />
                        <span>Architect Traits</span>
                      </div>
                      <Badge>{results.raw_scores.architect} pts</Badge>
                    </div>
                    <Progress 
                      value={(results.raw_scores.architect / (results.raw_scores.architect + results.raw_scores.alchemist)) * 100} 
                      className="h-3" 
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 text-orange-500" />
                        <span>Alchemist Traits</span>
                      </div>
                      <Badge>{results.raw_scores.alchemist} pts</Badge>
                    </div>
                    <Progress 
                      value={(results.raw_scores.alchemist / (results.raw_scores.architect + results.raw_scores.alchemist)) * 100} 
                      className="h-3" 
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Subtype Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span>Your Subtypes</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.subtype.map((sub, index) => (
                      <div key={index} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                            index === 0 ? 'bg-purple-600' : 'bg-orange-500'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium capitalize">{formatSubtype(sub)}</p>
                            <p className="text-sm text-gray-600">{getSubtypeDescription(sub)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Score Band Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5" />
                  <span>Mirror Awareness Level: {results.score_band}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{getScoreBandDescription(results.score_band)}</p>
                {results.score_band !== 'Mastery' && (
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-medium mb-2">Next Steps to Improve:</h4>
                    <ul className="space-y-1 text-sm">
                      {results.progression_goals.map((goal, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600">•</span>
                          <span className="capitalize">{goal.replace(/_/g, ' ')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Mirror Awareness Tab */}
          <TabsContent value="mirror" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Eye className="w-5 h-5" />
                  <span>5 Dimensions of Mirror Pair Awareness</span>
                </CardTitle>
                <CardDescription>
                  How effectively you can recognize, translate, and integrate your opposite type's strengths
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <DimensionScore 
                  icon={Eye}
                  name="Recognition"
                  description="Spotting valid mirror signals from your opposite type"
                  score={results.opposite_awareness.R}
                />
                <DimensionScore 
                  icon={ArrowLeftRight}
                  name="Translation"
                  description="Converting opposite outputs into usable forms"
                  score={results.opposite_awareness.T}
                  weighted
                />
                <DimensionScore 
                  icon={Layers}
                  name="Integration"
                  description="Timing and sequencing across different loops"
                  score={results.opposite_awareness.I}
                />
                <DimensionScore 
                  icon={Shield}
                  name="Governance"
                  description="Managing dual KPIs from both validator types"
                  score={results.opposite_awareness.G}
                  weighted
                />
                <DimensionScore 
                  icon={Zap}
                  name="Conflict Recovery"
                  description="Speed and quality of repair after validator collisions"
                  score={results.opposite_awareness.C}
                />
              </CardContent>
            </Card>

            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle>Overall Mirror Awareness</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{results.opposite_awareness.overall}/100</span>
                  <Badge className="text-lg px-4 py-1">{results.score_band}</Badge>
                </div>
                <Progress value={results.opposite_awareness.overall} className="h-4" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subtype Profile Tab */}
          <TabsContent value="subtype" className="space-y-6">
            <SubtypeDetailView subtypeId={results.subtype[0]} framingOrder={results.framing_order} defaultArtifacts={results.default_artifacts} />
          </TabsContent>

          {/* Learning & Growth Tab - Layers 4-7 */}
          <TabsContent value="learning" className="space-y-6">
            <Layers4to7View results={results} />
          </TabsContent>

          {/* Playbook Tab */}
          <TabsContent value="playbook" className="space-y-6">
            <PersonalizedPlaybookView results={results} />
          </TabsContent>

          {/* Legacy Playbook Tab Content - Keeping for reference */}
          <TabsContent value="playbook-old" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Personalized Playbook</CardTitle>
                <CardDescription>
                  Recommendations based on your {results.core_type} type and {formatSubtype(results.subtype[0])} subtype
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center space-x-2">
                    <Lightbulb className="w-5 h-5" />
                    <span>Progression Goals:</span>
                  </h4>
                  <div className="grid gap-3">
                    {results.progression_goals.map((goal, index) => (
                      <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg border">
                        <p className="capitalize font-medium">{goal.replace(/_/g, ' ')}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Recommended Sprint Style:</h4>
                  <div className="p-6 bg-teal-50 rounded-lg border-2 border-teal-200">
                    <p className="text-xl capitalize mb-2">
                      {typeof results.sprint_style === 'string' 
                        ? results.sprint_style.replace(/_/g, ' ')
                        : Array.isArray(results.sprint_style)
                          ? results.sprint_style.join(', ')
                          : 'Not specified'}
                    </p>
                    <p className="text-gray-600">
                      {typeof results.sprint_style === 'string' 
                        ? getSprintStyleDescription(results.sprint_style)
                        : Array.isArray(results.sprint_style)
                          ? 'Multi-faceted sprint approach combining: ' + results.sprint_style.join(', ')
                          : 'A personalized work rhythm optimized for your profile'}
                    </p>
                  </div>
                </div>

                {results.core_type === 'blurred' && (
                  <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                    <h4 className="font-medium mb-3 flex items-center space-x-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span>Special Guidance for Blurred Types:</span>
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Run two-track weeks alternating between systematic and creative phases</li>
                      <li>• Track energy, throughput, defect rate, and adoption metrics</li>
                      <li>• Oppose expert chairs in meetings to get both perspectives</li>
                      <li>• Publish decision records to anchor back to core validators weekly</li>
                      <li>• Schedule co-chaired postmortems with both Architect and Alchemist reviewers</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}

function DimensionScore({ 
  icon: Icon, 
  name, 
  description, 
  score, 
  weighted 
}: { 
  icon: any; 
  name: string; 
  description: string; 
  score: number; 
  weighted?: boolean;
}) {
  const getColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    if (score >= 30) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-600" />
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{name}</span>
              {weighted && <Badge variant="secondary" className="text-xs">Weighted 1.25x</Badge>}
            </div>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg ${getColor(score)}`}>
          <span className="font-medium">{score}/100</span>
        </div>
      </div>
      <Progress value={score} className="h-2" />
    </div>
  );
}

function formatSubtype(subtype: string): string {
  return subtype.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function getSubtypeDescription(subtype: string): string {
  const descriptions: { [key: string]: string } = {
    master_strategist: 'Focuses on roadmaps, strategic planning, and long-term vision',
    systemised_builder: 'Excels at SOPs, process automation, and scalable systems',
    internal_analyser: 'Leads with data, analytics, and quantitative insights',
    visionary_oracle: 'Creates compelling narratives and inspiring visions',
    energetic_empath: 'Builds partnerships, facilitates experiments, and drives collaboration',
    magnetic_perfectionist: 'Combines systematic refinement with creative flair',
    ultimate_architect: 'Masters all systematic building approaches at scale',
    ultimate_alchemist: 'Masters all creative innovation methodologies',
    blurred_overplanner: 'Integrates planning from both systematic and creative angles',
    blurred_overthinker: 'Deeply analyzes from multiple perspectives',
    blurred_ultimate: 'Seamlessly integrates all approaches'
  };
  return descriptions[subtype] || 'A unique blend of approaches';
}

function getScoreBandDescription(band: string): string {
  const descriptions: { [key: string]: string } = {
    'Mastery': 'You demonstrate full integration of mirror pair awareness. You seamlessly use mirror input without identity loss and can fluidly translate between opposite approaches.',
    'High': 'You show accurate mirror translation with rare validator leaks. You\'re effective at recognizing and integrating opposite perspectives.',
    'Moderate': 'You can toggle between different loops but need guardrails and regular re-clearing. With practice, you can achieve higher integration.',
    'Low': 'You borrow approaches without strong anchoring, leading to frequent loop switches. Focus on strengthening your core identity first.',
    'Very Low': 'There\'s identity confusion between validators. Start with clarifying your primary approach before integrating mirrors.'
  };
  return descriptions[band] || '';
}

function getSprintStyleDescription(style: string): string {
  const descriptions: { [key: string]: string } = {
    bet_cycle: 'Systematic validation cycles with clear hypotheses and measurable outcomes',
    oga_kaisen: 'Continuous improvement focused on incremental optimization',
    exp_cycle: 'Experimental loops with rapid testing and learning',
    demo_burst: 'Creative sprint focused on producing tangible demonstrations',
    ritual_sprint: 'Structured creative rituals that maintain momentum and inspiration'
  };
  return descriptions[style] || 'A personalized work rhythm optimized for your profile';
}

// Detailed Subtype View Component
function SubtypeDetailView({ 
  subtypeId, 
  framingOrder, 
  defaultArtifacts 
}: { 
  subtypeId: string; 
  framingOrder: string[]; 
  defaultArtifacts: string[];
}) {
  const profile = getSubtypeProfile(subtypeId);
  
  if (!profile) {
    return <div>Subtype profile not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Core Statement */}
      <Card className="bg-gradient-to-r from-purple-50 to-orange-50 border-2">
        <CardHeader>
          <CardTitle className="text-2xl">{profile.name}</CardTitle>
          <CardDescription className="text-lg">{profile.core_statement}</CardDescription>
        </CardHeader>
      </Card>

      {/* Strengths & Weaknesses Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Strengths */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-green-700">
              <CheckCircle className="w-5 h-5" />
              <span>Core Strengths</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.strengths.map((strength, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                  <span className="capitalize">{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Blindspots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-700">
              <AlertTriangle className="w-5 h-5" />
              <span>Blindspots</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.blindspots.map((blindspot, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                  <span className="capitalize">{blindspot}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Failure Modes & Best Contexts */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Failure Modes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-700">
              <XCircle className="w-5 h-5" />
              <span>Failure Modes</span>
            </CardTitle>
            <CardDescription>Patterns to watch out for</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.failure_modes.map((mode, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                  <span className="capitalize">{mode}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Best Contexts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-700">
              <Award className="w-5 h-5" />
              <span>Best Contexts</span>
            </CardTitle>
            <CardDescription>Where you thrive</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {profile.best_contexts.map((context, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <span className="capitalize">{context}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* EDNA Adaptations */}
      <Card>
        <CardHeader>
          <CardTitle>Your EDNA Adaptations</CardTitle>
          <CardDescription>Personalized frameworks and tools for your subtype</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Framing Order */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Framing Order:</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {profile.edna_adaptations.framing_order.map((frame, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {index + 1}. {frame}
                </Badge>
              ))}
            </div>
          </div>

          {/* Artifacts */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Go-To Artifacts:</span>
            </h4>
            <div className="grid md:grid-cols-3 gap-3">
              {profile.edna_adaptations.artifacts.map((artifact, index) => (
                <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm">{artifact}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Decision Hygiene */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Decision Hygiene:</span>
            </h4>
            <div className="space-y-2">
              {profile.edna_adaptations.decision_hygiene.map((hygiene, index) => (
                <div key={index} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                  <p className="text-sm">{hygiene}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sprint Style */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Sprint Style:</span>
            </h4>
            <div className="p-4 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg border-2 border-purple-200">
              <p className="font-medium">{profile.edna_adaptations.sprint_style}</p>
            </div>
          </div>

          {/* Team Interface */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Team Interface:</span>
            </h4>
            <div className="space-y-2">
              {profile.edna_adaptations.team_interface.map((interface_item, index) => (
                <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm">{interface_item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Metric Focus */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Metric Focus:</span>
            </h4>
            <div className="grid md:grid-cols-2 gap-3">
              {profile.edna_adaptations.metric_focus.map((metric, index) => (
                <div key={index} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <p className="text-sm">{metric}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Progression Path */}
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Path to Ultimate:</span>
            </h4>
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <p>{profile.edna_adaptations.progression_path}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Line */}
      <Card className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
        <CardContent className="pt-6">
          <p className="text-xl text-center italic">&ldquo;{profile.result_line}&rdquo;</p>
        </CardContent>
      </Card>
    </div>
  );
}

// Personalized Playbook View Component
function PersonalizedPlaybookView({ results }: { results: EDNAResults }) {
  const playbookSections = generatePersonalizedPlaybook(results);
  
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
        <CardHeader>
          <CardTitle className="text-3xl">Your Personalized EDNA Playbook</CardTitle>
          <CardDescription className="text-white/90 text-lg">
            A comprehensive operating system based on your complete 7-layer profile
          </CardDescription>
        </CardHeader>
      </Card>

      {playbookSections.map((section, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white">
                {index + 1}
              </div>
              <span>{section.title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <div 
                  key={itemIndex} 
                  className={`${
                    item.startsWith('**') 
                      ? 'font-medium text-lg mt-4 mb-2' 
                      : item.startsWith('  ') 
                      ? 'pl-6 text-sm text-gray-700'
                      : 'p-3 bg-gray-50 rounded-lg border'
                  }`}
                >
                  {item.startsWith('**') 
                    ? item.replace(/\*\*/g, '') 
                    : item.startsWith('  ')
                    ? item
                    : <p>{item}</p>
                  }
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Special Blurred Guidance */}
      {results.core_type === 'blurred' && (
        <Card className="bg-yellow-50 border-2 border-yellow-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-yellow-900">
              <AlertCircle className="w-5 h-5" />
              <span>Critical Guidance for Blurred Types</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-gray-700">
              <li>• Run two-track weeks alternating between systematic and creative phases</li>
              <li>• Track energy, throughput, defect rate, and adoption metrics</li>
              <li>• Oppose expert chairs in meetings to get both perspectives</li>
              <li>• Publish decision records to anchor back to core validators weekly</li>
              <li>• Schedule co-chaired postmortems with both Architect and Alchemist reviewers</li>
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Quick Action Card */}
      <Card className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
        <CardContent className="pt-6">
          <h3 className="text-xl mb-4">🚀 Ready to Get Started?</h3>
          <p className="mb-4">
            Your personalized playbook is now configured. Start with Section 7's immediate actions and iterate from there.
          </p>
          <Button 
            onClick={() => downloadProfile(results, 'markdown')}
            variant="secondary"
            size="lg"
          >
            <Download className="w-5 h-5 mr-2" />
            Download Complete Playbook
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// Capability Domain Card Component
function CapabilityDomainCard({ 
  title, 
  domain, 
  icon: Icon, 
  description 
}: { 
  title: string;
  domain: any;
  icon: any;
  description: string;
}) {
  const getColor = () => {
    if (domain.level === 'high') return 'border-green-300 bg-green-50';
    if (domain.level === 'moderate') return 'border-yellow-300 bg-yellow-50';
    return 'border-orange-300 bg-orange-50';
  };

  const getLevelColor = () => {
    if (domain.level === 'high') return 'text-green-700 bg-green-100';
    if (domain.level === 'moderate') return 'text-yellow-700 bg-yellow-100';
    return 'text-orange-700 bg-orange-100';
  };

  return (
    <Card className={`${getColor()} border-2`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Icon className="w-5 h-5 text-gray-700" />
          <Badge className={getLevelColor()}>
            {domain.score}/100 - {domain.level}
          </Badge>
        </div>
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {domain.patterns.length > 0 && (
          <div>
            <p className="text-xs font-medium mb-1">Patterns:</p>
            <ul className="space-y-1">
              {domain.patterns.slice(0, 2).map((pattern: string, i: number) => (
                <li key={i} className="text-xs text-gray-700">• {pattern}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Value Score Bar Component
function ValueScoreBar({ 
  label, 
  score, 
  leftLabel, 
  rightLabel 
}: { 
  label: string; 
  score: number; 
  leftLabel: string; 
  rightLabel: string;
}) {
  const getColor = () => {
    if (score < 40) return 'bg-blue-500';
    if (score > 70) return 'bg-rose-500';
    return 'bg-purple-500';
  };

  const getPosition = () => {
    return `${score}%`;
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-600">{score}/100</span>
      </div>
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`absolute h-full ${getColor()} transition-all duration-500 rounded-full`}
          style={{ width: getPosition() }}
        />
      </div>
      <div className="flex items-center justify-between text-xs text-gray-600">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

// Layers 4-7 Display Component
function Layers4to7View({ results }: { results: EDNAResults }) {
  return (
    <div className="space-y-6">
      {/* Layer 4: Learning Style */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Layer 4: Learning Style Preferences</span>
          </CardTitle>
          <CardDescription>How you best absorb and retain information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2">Primary Modality</h4>
              <p className="capitalize">{results.learning_style.modality.join(', ')}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2">Learning Approach</h4>
              <p className="capitalize">{results.learning_style.approach}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2">Concept Processing</h4>
              <p className="capitalize">{results.learning_style.concept_processing}</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2">Working Environment</h4>
              <p className="capitalize">{results.learning_style.working_environment}</p>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
            <h4 className="font-medium mb-2">Learning Pace</h4>
            <p className="capitalize text-lg">{results.learning_style.pace}</p>
          </div>
        </CardContent>
      </Card>

      {/* Layer 5: Neurodiversity - Enhanced with Capability Model */}
      <Card className="border-2 border-green-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <Brain className="w-6 h-6 text-green-600" />
            <span>{results.neurodiversity_profile.result_blocks.headline}</span>
          </CardTitle>
          <CardDescription className="text-base italic mt-2">
            &ldquo;{results.neurodiversity_profile.result_blocks.one_liner}&rdquo;
          </CardDescription>
          <div className="flex gap-2 mt-3">
            <Badge className="bg-green-600">{results.neurodiversity_profile.primary_pattern}</Badge>
            <Badge variant="outline">{results.neurodiversity_profile.clarity_rating}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          {/* 4 Capability Domains */}
          <div>
            <h4 className="font-medium mb-4 text-lg">Capability Domains (0-100 Scale)</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <CapabilityDomainCard
                title="Attention & Regulation"
                domain={results.neurodiversity_profile.capability_domains.attention_regulation}
                icon={Activity}
                description="How focus is initiated, maintained, and transitioned"
              />
              <CapabilityDomainCard
                title="Language & Processing"
                domain={results.neurodiversity_profile.capability_domains.language_processing}
                icon={BookOpen}
                description="Ease and mode of understanding symbols, text, or speech"
              />
              <CapabilityDomainCard
                title="Structure & Routine"
                domain={results.neurodiversity_profile.capability_domains.structure_routine}
                icon={Target}
                description="Need for predictability, stability, and explicit rules"
              />
              <CapabilityDomainCard
                title="Sensory Input Management"
                domain={results.neurodiversity_profile.capability_domains.sensory_management}
                icon={Zap}
                description="How the brain filters or prioritizes sensory input"
              />
            </div>
          </div>

          {/* Compound Profiles */}
          {results.neurodiversity_profile.compound_profiles.length > 0 && (
            <Card className="bg-blue-50 border-2 border-blue-300">
              <CardHeader>
                <CardTitle className="text-base">Compound Profile Detected</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.neurodiversity_profile.compound_profiles.map((profile, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
                      <span>{profile}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Strengths & Adaptations */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="bg-green-50 border-green-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span>Core Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.neurodiversity_profile.result_blocks.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 border-purple-200">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base text-purple-700">
                  <Sparkles className="w-5 h-5" />
                  <span>EDNA Adaptations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.neurodiversity_profile.result_blocks.adaptations.map((adaptation, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-1.5" />
                      <span>{adaptation}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* EDNA Tuning */}
          {results.neurodiversity_profile.edna_tuning.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Platform Tuning</CardTitle>
                <CardDescription>
                  How EDNA dynamically adapts based on your cognitive rhythm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {results.neurodiversity_profile.edna_tuning.map((tuning, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-lg border text-sm">
                      {tuning}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Layer 6: Mindset & Personality */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-pink-600" />
            <span>Layer 6: Mindset & Personality</span>
          </CardTitle>
          <CardDescription>Your psychological stance on growth, risk, and interaction</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h4 className="font-medium mb-2">Mindset</h4>
              <Badge className="capitalize">{results.mindset_personality.mindset}</Badge>
              <p className="text-sm mt-2 text-gray-600">
                {results.mindset_personality.mindset === 'growth' 
                  ? 'You see challenges as opportunities to develop'
                  : results.mindset_personality.mindset === 'fixed'
                  ? 'You may benefit from growth mindset coaching'
                  : 'You\'re developing a growth orientation'}
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h4 className="font-medium mb-2">Risk Tolerance</h4>
              <Badge className="capitalize">{results.mindset_personality.risk_tolerance}</Badge>
              <p className="text-sm mt-2 text-gray-600">
                {results.mindset_personality.risk_tolerance === 'high'
                  ? 'Comfortable with bold moves and uncertainty'
                  : results.mindset_personality.risk_tolerance === 'low'
                  ? 'Prefers proven paths and risk mitigation'
                  : 'Takes calculated risks with planning'}
              </p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
              <h4 className="font-medium mb-2">Energy Source</h4>
              <Badge className="capitalize">{results.mindset_personality.extraversion}</Badge>
              <p className="text-sm mt-2 text-gray-600">
                {results.mindset_personality.extraversion === 'extroverted'
                  ? 'Energized by collaboration and networking'
                  : results.mindset_personality.extraversion === 'introverted'
                  ? 'Recharges through solo focused work'
                  : 'Adapts well to both social and solo modes'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layer 7: Meta-Beliefs & Values - Enhanced */}
      <Card className="border-2 border-rose-300">
        <CardHeader className="bg-gradient-to-r from-rose-50 to-pink-50">
          <CardTitle className="flex items-center space-x-2 text-2xl">
            <Sparkles className="w-6 h-6 text-rose-600" />
            <span>{results.layer7_profile.headline}</span>
          </CardTitle>
          <CardDescription className="text-lg italic">
            &ldquo;{results.layer7_profile.one_liner}&rdquo;
          </CardDescription>
          <Badge className="w-fit mt-2">{results.layer7_profile.score_band}</Badge>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          {/* Value Scores Visualization */}
          <div>
            <h4 className="font-medium mb-4">Your Value Axis Scores (0-100)</h4>
            <div className="space-y-4">
              <ValueScoreBar 
                label="Growth Philosophy" 
                score={results.layer7_scores.growth_philosophy}
                leftLabel="Craftsmanship"
                rightLabel="Bold Scaling"
              />
              <ValueScoreBar 
                label="Purpose Filter" 
                score={results.layer7_scores.purpose_filter}
                leftLabel="Profit-Focused"
                rightLabel="Mission-Driven"
              />
              <ValueScoreBar 
                label="Change Appetite" 
                score={results.layer7_scores.change_appetite}
                leftLabel="Stability"
                rightLabel="Innovation"
              />
              <ValueScoreBar 
                label="Metrics Orientation" 
                score={results.layer7_scores.metrics_orientation}
                leftLabel="Numbers-Averse"
                rightLabel="Numbers-Confident"
              />
              <ValueScoreBar 
                label="Social Worldview" 
                score={results.layer7_scores.social_worldview}
                leftLabel="Competitive"
                rightLabel="Collaborative"
              />
              <ValueScoreBar 
                label="Resource Worldview" 
                score={results.layer7_scores.resource_worldview}
                leftLabel="Scarcity"
                rightLabel="Abundance"
              />
            </div>
          </div>

          {/* Strengths & Watchouts */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-5 h-5" />
                  <span>Core Strengths</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.layer7_profile.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-yellow-700">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Watchouts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {results.layer7_profile.watchouts.map((watchout, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2" />
                      <span>{watchout}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Value Misalignments (Failure Patterns) */}
          {results.misalignments.length > 0 && (
            <Card className="border-2 border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-700">
                  <AlertCircle className="w-5 h-5" />
                  <span>Detected Value Misalignments</span>
                </CardTitle>
                <CardDescription>
                  These patterns may create tension or stall progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {results.misalignments.map((misalignment, index) => (
                  <div key={index} className="p-4 bg-white rounded-lg border border-red-200">
                    <h4 className="font-medium text-red-900 mb-2">⚠️ {misalignment.type}</h4>
                    <p className="text-sm text-gray-700 mb-2">{misalignment.description}</p>
                    <p className="text-sm text-red-700 mb-2"><strong>Impact:</strong> {misalignment.impact}</p>
                    <p className="text-sm text-green-700"><strong>EDNA Remedy:</strong> {misalignment.remedy}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* EDNA Adaptations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>How EDNA Adapts to Your Values</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {results.layer7_profile.edna_adaptations.map((adaptation, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm">{adaptation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Next 7 Days Action Plan */}
          <Card className="bg-gradient-to-r from-rose-600 to-orange-500 text-white">
            <CardHeader>
              <CardTitle className="text-xl">🎯 Your Next 7 Days</CardTitle>
              <CardDescription className="text-white/90">
                Immediate actions aligned with your value system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.layer7_profile.next_7_days.map((action, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sm">{index + 1}</span>
                    </div>
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Platform Personalization Summary */}
      <Card className="bg-gradient-to-r from-purple-600 to-rose-500 text-white">
        <CardContent className="pt-6">
          <h3 className="text-xl mb-4">🎯 Your Personalized Platform Experience</h3>
          <p className="mb-4">
            Based on your complete 7-layer profile, the Brandscaling platform will automatically:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start space-x-2">
              <span>✓</span>
              <span>Deliver content in your preferred {results.learning_style.modality.join(' and ')} format</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>✓</span>
              <span>Structure courses with a {results.learning_style.approach} approach at a {results.learning_style.pace} pace</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>✓</span>
              <span>Provide {results.mindset_personality.mindset} mindset coaching and {results.mindset_personality.risk_tolerance} risk guidance</span>
            </li>
            <li className="flex items-start space-x-2">
              <span>✓</span>
              <span>Align recommendations with your {results.meta_beliefs.scaling_orientation.replace(/_/g, ' ')} philosophy</span>
            </li>
            {results.neurodiversity.accessibility_needs.length > 0 && (
              <li className="flex items-start space-x-2">
                <span>✓</span>
                <span>Enable accessibility features for optimal learning experience</span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
