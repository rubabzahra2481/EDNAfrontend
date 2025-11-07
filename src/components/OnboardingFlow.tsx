// Onboarding Flow - Interactive Platform Introduction
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Check, 
  ArrowRight, 
  Brain, 
  Target, 
  BookOpen,
  MessageSquare,
  BarChart3,
  Sparkles,
  Award,
  Zap
} from 'lucide-react';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Welcome to Brandscaling',
      icon: Sparkles,
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            Brandscaling uses the <strong>7-Layer EDNA Framework</strong> to create a deeply personalized learning and mentorship experience for entrepreneurs.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-6 bg-[var(--bs-color-indigo)]/5 rounded-lg border-2 border-[var(--bs-color-indigo)]/20">
              <h4 className="typo-h3-bs mb-2 text-[var(--bs-color-indigo)]">🏗️ For Architects</h4>
              <p className="typo-body-bs text-gray-700">
                You think in systems, data, and structured frameworks. You value predictability and measurable outcomes.
              </p>
            </div>
            <div className="p-6 bg-[var(--bs-color-orange)]/5 rounded-lg border-2 border-[var(--bs-color-orange)]/20">
              <h4 className="typo-h3-bs mb-2 text-[var(--bs-color-orange)]">✨ For Alchemists</h4>
              <p className="typo-body-bs text-gray-700">
                You lead with vision, creativity, and narrative. You excel at innovation and inspiring others.
              </p>
            </div>
          </div>
          <p>
            Most entrepreneurs are one or the other—but the most successful learn to access <em>both</em> modes.
          </p>
        </div>
      )
    },
    {
      title: 'The 7-Layer EDNA Framework',
      icon: Brain,
      content: (
        <div className="space-y-4">
          <p>
            EDNA (Entrepreneurial DNA) maps <strong>7 layers</strong> of your cognitive, behavioral, and values profile:
          </p>
          <div className="space-y-3">
            <LayerPreview number={1} title="Core Type" description="Architect, Alchemist, or Blurred" color="purple" />
            <LayerPreview number={2} title="Subtype" description="11 detailed profiles with strengths & blindspots" color="blue" />
            <LayerPreview number={3} title="Mirror Awareness" description="How well you access your opposite validator" color="indigo" />
            <LayerPreview number={4} title="Learning Style" description="Modality, approach, pace, environment" color="teal" />
            <LayerPreview number={5} title="Neurodiversity" description="4 capability domains with adaptations" color="green" />
            <LayerPreview number={6} title="Mindset & Personality" description="Growth mindset, risk tolerance, energy source" color="pink" />
            <LayerPreview number={7} title="Meta-Beliefs & Values" description="6 value axes (0-100 scoring)" color="rose" />
          </div>
        </div>
      )
    },
    {
      title: 'The Assessment (15-18 Minutes)',
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            You'll answer <strong>30 questions</strong> that map your complete EDNA profile.
          </p>
          <Card className="bg-gradient-to-r from-purple-50 to-orange-50">
            <CardContent className="pt-6">
              <h4 className="font-medium mb-3">What You'll Discover:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Your core cognitive type and subtype profile</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Mirror awareness score across 5 weighted dimensions</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Personalized learning style and accessibility needs</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Value misalignments (failure patterns)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>8-section personalized playbook</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          <p className="text-sm text-gray-600">
            <em>Note: This is not a personality test. It's a performance calibration system.</em>
          </p>
        </div>
      )
    },
    {
      title: 'Your Personalized Experience',
      icon: Award,
      content: (
        <div className="space-y-4">
          <p className="text-lg">
            After completing the assessment, <strong>every aspect</strong> of the platform adapts to your profile:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard 
              icon={BookOpen}
              title="Personalized Learning"
              description="Course recommendations based on your core type, values, and mirror awareness level"
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Dual AI Mentors"
              description="Switch between Architect (systems) and Alchemist (vision) AI personalities"
            />
            <FeatureCard 
              icon={BarChart3}
              title="Profile Insights"
              description="Deep analytics with synergies, conflicts, and growth opportunities"
            />
            <FeatureCard 
              icon={Zap}
              title="130+ Adaptations"
              description="Neurodiversity features, pace controls, content formats auto-configured"
            />
          </div>
          <Card className="bg-blue-50 border-2 border-blue-300">
            <CardContent className="pt-6">
              <p className="text-center">
                <strong>Result:</strong> A learning experience that feels like it was built just for you—because it was.
              </p>
            </CardContent>
          </Card>
        </div>
      )
    },
    {
      title: 'Ready to Get Started?',
      icon: Sparkles,
      content: (
        <div className="space-y-6 text-center">
          <div className="w-24 h-24 bg-gradient-arch-scale rounded-full flex items-center justify-center mx-auto">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h3 className="typo-h2-bs">Your EDNA Profile Awaits</h3>
          <p className="typo-body-bs text-gray-700 max-w-2xl mx-auto">
            In just 15-18 minutes, you'll have a comprehensive understanding of how you think, learn, and lead—plus a personalized roadmap for growth.
          </p>
          <div className="flex flex-col items-center space-y-3">
            <button 
              className="cta-gradient-bs px-8 flex items-center gap-2"
              onClick={onComplete}
            >
              <Target className="w-5 h-5" />
              <span>Start Your Assessment</span>
            </button>
            <p className="typo-caption-bs text-gray-600">
              Takes 15-18 minutes · 30 questions · No wrong answers
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const StepIcon = currentStepData.icon;
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-white">
      <div className="section-padding-bs">
        <div className="max-w-4xl mx-auto px-6">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="typo-caption-bs text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="typo-caption-bs text-gray-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Main Card */}
          <div className="overflow-hidden rounded-lg border-2 border-gray-100 shadow-lg">
            {/* Gradient stripe */}
            <div className="h-[6px] bg-gradient-arch-scale-90" aria-hidden="true" />
            
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-arch-scale rounded-full flex items-center justify-center shadow-lg">
                  <StepIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="typo-h2-bs">{currentStepData.title}</h2>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 bg-white">
              {currentStepData.content}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            {currentStep > 0 ? (
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(currentStep - 1)}
                className="h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)] hover:bg-[var(--bs-color-indigo)] hover:text-white"
              >
                Previous
              </Button>
            ) : (
              <div />
            )}
            
            {currentStep < steps.length - 1 && (
              <button 
                onClick={() => setCurrentStep(currentStep + 1)}
                className="cta-gradient-bs px-8 flex items-center gap-2"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function LayerPreview({ number, title, description, color }: {
  number: number;
  title: string;
  description: string;
  color: string;
}) {
  const colorClasses: { [key: string]: string } = {
    purple: 'bg-purple-100 border-purple-300 text-purple-700',
    blue: 'bg-blue-100 border-blue-300 text-blue-700',
    indigo: 'bg-indigo-100 border-indigo-300 text-indigo-700',
    teal: 'bg-teal-100 border-teal-300 text-teal-700',
    green: 'bg-green-100 border-green-300 text-green-700',
    pink: 'bg-pink-100 border-pink-300 text-pink-700',
    rose: 'bg-rose-100 border-rose-300 text-rose-700'
  };

  return (
    <div className={`p-4 ${colorClasses[color]} rounded-lg border-2`}>
      <div className="flex items-start space-x-3">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white`}>
          <span className="font-bold">{number}</span>
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-purple-300 transition-colors">
      <Icon className="w-8 h-8 text-purple-600 mb-3" />
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
