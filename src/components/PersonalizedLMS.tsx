// Personalized LMS Dashboard - Fully integrated with 7-layer EDNA profile
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { EDNAResults } from './EDNAQuiz';
import { 
  BookOpen, 
  TrendingUp, 
  Target, 
  Award, 
  Clock,
  PlayCircle,
  CheckCircle2,
  Lock,
  Zap,
  Brain,
  Lightbulb,
  Video,
  FileText,
  Headphones,
  Activity
} from 'lucide-react';

interface PersonalizedLMSProps {
  profile: EDNAResults;
  persona: 'architect' | 'alchemist';
}

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  modules: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  personalized_for: string[];
  content_type: string[];
  locked: boolean;
}

export function PersonalizedLMS({ profile, persona }: PersonalizedLMSProps) {
  const [activeTab, setActiveTab] = useState('learning');

  // Generate personalized course recommendations based on complete profile
  const generateCourseRecommendations = (): Course[] => {
    const baseCourses: Course[] = [];

    // Courses personalized by Layer 1: Core Type
    if (persona === 'architect') {
      baseCourses.push({
        id: 'arch-1',
        title: 'Systems Thinking for Scale',
        description: 'Build repeatable frameworks and data-driven decision systems',
        duration: '6 weeks',
        progress: 0,
        modules: 12,
        level: 'intermediate',
        personalized_for: ['Architect Core Type', 'Systems thinking'],
        content_type: getPreferredContentTypes(),
        locked: false
      });
    } else {
      baseCourses.push({
        id: 'alch-1',
        title: 'Vision to Reality: Alchemist Execution',
        description: 'Transform creative insights into market-ready innovations',
        duration: '6 weeks',
        progress: 0,
        modules: 12,
        level: 'intermediate',
        personalized_for: ['Alchemist Core Type', 'Creative innovation'],
        content_type: getPreferredContentTypes(),
        locked: false
      });
    }

    // Courses personalized by Layer 3: Mirror Awareness
    if (profile.opposite_awareness.overall < 70) {
      baseCourses.push({
        id: 'mirror-1',
        title: 'Building Your Mirror Capability',
        description: `Strengthen your ${persona === 'architect' ? 'narrative' : 'systems'} skills to reach ${profile.opposite_awareness.overall > 50 ? 'Mastery' : 'High'} level`,
        duration: '4 weeks',
        progress: 0,
        modules: 8,
        level: 'intermediate',
        personalized_for: ['Mirror Awareness Development', `Current: ${profile.score_band}`],
        content_type: getPreferredContentTypes(),
        locked: false
      });
    }

    // Courses personalized by Layer 7: Values
    if (profile.layer7_scores.purpose_filter > 70) {
      baseCourses.push({
        id: 'mission-1',
        title: 'Mission-Driven Business Models',
        description: 'Scale purpose without sacrificing profit',
        duration: '5 weeks',
        progress: 0,
        modules: 10,
        level: 'advanced',
        personalized_for: ['Mission-Driven Values', 'Impact measurement'],
        content_type: getPreferredContentTypes(),
        locked: false
      });
    } else if (profile.layer7_scores.purpose_filter < 40) {
      baseCourses.push({
        id: 'profit-1',
        title: 'Profit-First Growth Strategies',
        description: 'ROI-optimized scaling and financial systems',
        duration: '5 weeks',
        progress: 0,
        modules: 10,
        level: 'advanced',
        personalized_for: ['Profit-Focused Values', 'Financial optimization'],
        content_type: getPreferredContentTypes(),
        locked: false
      });
    }

    // Courses personalized by Layer 6: Mindset
    if (profile.layer6_profile.mindset_orientation.type === 'growth') {
      baseCourses.push({
        id: 'growth-1',
        title: 'Rapid Iteration Mastery',
        description: 'Build, test, and learn at velocity',
        duration: '3 weeks',
        progress: 0,
        modules: 6,
        level: 'intermediate',
        personalized_for: ['Growth Mindset', 'Experimentation'],
        content_type: getPreferredContentTypes(),
        locked: false
      });
    }

    return baseCourses;
  };

  const getPreferredContentTypes = (): string[] => {
    const types: string[] = [];
    
    // Based on Layer 4: Learning Style
    if (profile.learning_style.modality.includes('visual')) types.push('Video');
    if (profile.learning_style.modality.includes('auditory')) types.push('Audio');
    if (profile.learning_style.modality.includes('read_write')) types.push('Text');
    if (profile.learning_style.modality.includes('kinesthetic')) types.push('Interactive');
    
    return types.length > 0 ? types : ['Video', 'Text'];
  };

  const courses = generateCourseRecommendations();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header with Personalization Info */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl mb-2">Your Learning Hub</h1>
              <p className="text-gray-600 text-lg">
                Personalized for {persona === 'architect' ? 'Architects' : 'Alchemists'} · {profile.subtype[0].replace(/_/g, ' ')}
              </p>
            </div>
            <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-purple-600 to-orange-500">
              {profile.score_band} Mirror Awareness
            </Badge>
          </div>

          {/* Personalization Summary */}
          <Card className="bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-200">
            <CardContent className="pt-6">
              <h3 className="font-medium mb-3 flex items-center space-x-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span>Your Learning Profile Active</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline">
                  {profile.learning_style.pace} pace
                </Badge>
                <Badge variant="outline">
                  {profile.learning_style.approach} approach
                </Badge>
                <Badge variant="outline">
                  {profile.learning_style.modality.join(' + ')}
                </Badge>
                {profile.adaptations_summary.map((adaptation, i) => (
                  <Badge key={i} variant="outline" className="bg-teal-50">
                    {adaptation.split(':')[0]}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="edna-results">E-DNA Results</TabsTrigger>
            <TabsTrigger value="learning">My Learning</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="adaptations">Adaptations</TabsTrigger>
          </TabsList>

          {/* E-DNA Results Tab */}
          <TabsContent value="edna-results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6 text-purple-600" />
                  Your E-DNA Profile
                </CardTitle>
                <CardDescription>
                  Complete analysis of your entrepreneurial DNA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Core Type */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-orange-50 rounded-xl">
                  <h3 className="text-xl font-bold mb-2">Core Type: {profile.core_type === 'blurred' ? 'Architect' : profile.core_type.charAt(0).toUpperCase() + profile.core_type.slice(1)}</h3>
                  <p className="text-gray-700 mb-4">{profile.layer7_profile.headline}</p>
                  <Badge className="bg-gradient-to-r from-purple-600 to-orange-500 text-white">
                    {profile.score_band} Mirror Awareness
                  </Badge>
                </div>

                {/* RTI Scores */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-white border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Recognition</span>
                      <span className="text-2xl font-bold text-purple-600">{profile.opposite_awareness.R}%</span>
                    </div>
                    <Progress value={profile.opposite_awareness.R} className="h-2" />
                  </div>
                  <div className="p-4 bg-white border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Translation</span>
                      <span className="text-2xl font-bold text-purple-600">{profile.opposite_awareness.T}%</span>
                    </div>
                    <Progress value={profile.opposite_awareness.T} className="h-2" />
                  </div>
                  <div className="p-4 bg-white border-2 border-purple-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Integration</span>
                      <span className="text-2xl font-bold text-purple-600">{profile.opposite_awareness.I}%</span>
                    </div>
                    <Progress value={profile.opposite_awareness.I} className="h-2" />
                  </div>
                </div>

                {/* Layer 7 Profile */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Your Business DNA Profile</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Strengths</h4>
                      <ul className="space-y-2">
                        {profile.layer7_profile.strengths.map((strength, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Growth Areas</h4>
                      <ul className="space-y-2">
                        {profile.layer7_profile.growth_areas.map((area, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Target className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Button */}
                <div className="flex justify-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-orange-500 text-white hover:opacity-90"
                    onClick={() => window.open('/pdf-results', '_blank')}
                  >
                    <FileText className="w-5 h-5 mr-2" />
                    Download Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Learning Tab */}
          <TabsContent value="learning" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {courses.slice(0, 2).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Continue Where You Left Off</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  No active courses yet. Start your first course above!
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recommended Tab */}
          <TabsContent value="recommended" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Based on your {persona} profile, {profile.layer7_profile.headline.toLowerCase()}, and {profile.score_band.toLowerCase()} mirror awareness
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>

          {/* Progress Tab */}
          <TabsContent value="progress" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Courses Started</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Courses Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-600">Learning Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl">0 days</p>
                </CardContent>
              </Card>
            </div>

            {/* Skill Development */}
            <Card>
              <CardHeader>
                <CardTitle>Skill Development Path</CardTitle>
                <CardDescription>Your progression towards {persona === 'architect' ? 'Alchemist' : 'Architect'} capabilities</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <SkillProgress 
                  skill="Recognition (R)" 
                  current={profile.opposite_awareness.R}
                  target={85}
                />
                <SkillProgress 
                  skill="Translation (T)" 
                  current={profile.opposite_awareness.T}
                  target={85}
                  weighted
                />
                <SkillProgress 
                  skill="Integration (I)" 
                  current={profile.opposite_awareness.I}
                  target={85}
                />
                <SkillProgress 
                  skill="Governance (G)" 
                  current={profile.opposite_awareness.G}
                  target={85}
                  weighted
                />
                <SkillProgress 
                  skill="Conflict Recovery (C)" 
                  current={profile.opposite_awareness.C}
                  target={85}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Adaptations Tab */}
          <TabsContent value="adaptations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Active EDNA Adaptations</CardTitle>
                <CardDescription>
                  Your learning experience is customized across all 7 layers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Layer 4: Learning Preferences */}
                <AdaptationSection
                  title="Layer 4: Learning Style Adaptations"
                  icon={BookOpen}
                  adaptations={[
                    `Content delivery: ${profile.learning_style.modality.join(', ')} formats prioritized`,
                    `Pacing: ${profile.learning_style.pace} learning speed`,
                    `Structure: ${profile.learning_style.approach} approach to concepts`,
                    `Environment: ${profile.learning_style.working_environment} work settings`
                  ]}
                />

                {/* Layer 5: Accessibility */}
                {profile.adaptations_summary.length > 0 && (
                  <AdaptationSection
                    title="Layer 5: Accessibility Features"
                    icon={Activity}
                    adaptations={profile.adaptations_summary}
                  />
                )}

                {/* Layer 6: Mindset & Energy */}
                <AdaptationSection
                  title="Layer 6: Mindset & Energy Adaptations"
                  icon={Brain}
                  adaptations={[
                    ...profile.layer6_profile.mindset_orientation.adaptations,
                    ...profile.layer6_profile.risk_style.adaptations.slice(0, 1),
                    ...profile.layer6_profile.energy_modality.adaptations.slice(0, 1)
                  ]}
                />

                {/* Layer 7: Values */}
                <AdaptationSection
                  title="Layer 7: Value-Aligned Content"
                  icon={Target}
                  adaptations={profile.layer7_profile.edna_adaptations}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course }: { course: Course }) {
  const getContentIcon = (type: string) => {
    switch(type.toLowerCase()) {
      case 'video': return Video;
      case 'audio': return Headphones;
      case 'text': return FileText;
      default: return BookOpen;
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge>{course.level}</Badge>
          {course.locked && <Lock className="w-4 h-4 text-gray-400" />}
        </div>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </span>
          <span>{course.modules} modules</span>
        </div>

        {course.progress > 0 && (
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progress</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} />
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {course.personalized_for.slice(0, 2).map((reason, i) => (
            <Badge key={i} variant="outline" className="text-xs">
              {reason}
            </Badge>
          ))}
        </div>

        <div className="flex items-center space-x-2">
          {course.content_type.slice(0, 3).map((type, i) => {
            const Icon = getContentIcon(type);
            return (
              <div key={i} className="flex items-center space-x-1 text-xs text-gray-600">
                <Icon className="w-3 h-3" />
                <span>{type}</span>
              </div>
            );
          })}
        </div>

        <Button className="w-full" disabled={course.locked}>
          {course.locked ? (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Locked
            </>
          ) : course.progress > 0 ? (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              Continue
            </>
          ) : (
            <>
              <PlayCircle className="w-4 h-4 mr-2" />
              Start Course
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

// Skill Progress Component
function SkillProgress({ skill, current, target, weighted }: { 
  skill: string; 
  current: number; 
  target: number;
  weighted?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm">
          {skill} {weighted && <Badge variant="secondary" className="ml-2 text-xs">×1.25</Badge>}
        </span>
        <span className="text-sm text-gray-600">{current}/{target}</span>
      </div>
      <Progress value={(current / target) * 100} />
    </div>
  );
}

// Adaptation Section Component
function AdaptationSection({ 
  title, 
  icon: Icon, 
  adaptations 
}: { 
  title: string; 
  icon: any; 
  adaptations: string[];
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium flex items-center space-x-2">
        <Icon className="w-5 h-5 text-purple-600" />
        <span>{title}</span>
      </h4>
      <div className="space-y-2 pl-7">
        {adaptations.map((adaptation, i) => (
          <div key={i} className="flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-gray-700">{adaptation}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
