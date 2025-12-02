// Onboarding Flow - Interactive Platform Introduction
import React, { useState, useEffect } from 'react';
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
  Zap,
  Settings,
  Users,
  FileText,
  Network,
  RefreshCw,
  Eye
} from 'lucide-react';
import brainIcon from '../assets/WhatsApp Image 2025-12-01 at 21.11.24_793bc2cc.png';
import brandscalingLogo from 'figma:asset/4ffc1593ac524b5a444c05cca1a8149a7e87be86.png';
import diagramFrame from '../assets/diagram.png';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Scroll to top on initial mount
  useEffect(() => {
    // Scroll to top immediately when component first loads
    window.scrollTo(0, 0);
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
    // Use requestAnimationFrame to ensure it happens after render
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      if (document.body) {
        document.body.scrollTop = 0;
      }
    });
  }, []); // Empty dependency array - runs only on mount

  // Scroll to top whenever step changes
  useEffect(() => {
    // Scroll to top immediately when step changes
    window.scrollTo(0, 0);
    // Also try document scrolling for better compatibility
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [currentStep]);

  const steps = [
    {
      title: 'Welcome to Brandscaling',
      icon: Sparkles,
      content: (
        <div className="space-y-8">
          {/* Opening Statement */}
          <div className="text-left max-w-3xl">
            <p className="typo-body-bs text-gray-700 leading-relaxed">
              The E-DNA Assessment helps you understand how your mind makes decisions — so you can think clearly, act confidently, and scale without confusion by making better decision
            </p>
          </div>
          
          {/* Two Main Concept Boxes */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 bg-white rounded-xl border-2 border-[var(--bs-color-indigo)]/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-[var(--bs-color-indigo)]/10 flex items-center justify-center mb-4">
                  <Network className="w-6 h-6 text-[var(--bs-color-indigo)]" />
                </div>
                <h4 className="typo-h3-bs mb-3 text-[var(--bs-color-indigo)]">Decision Intelligence</h4>
                <p className="typo-body-bs text-gray-600 leading-relaxed">
                  Inside this assessment, you'll discover the foundations of Decision Intelligence: how your brain processes logic and emotion every time you evaluate, choose, or commit.
              </p>
            </div>
            </div>
            
            <div className="p-8 bg-white rounded-xl border-2 border-[var(--bs-color-orange)]/20 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-[var(--bs-color-orange)]/10 flex items-center justify-center mb-4">
                  <RefreshCw className="w-6 h-6 text-[var(--bs-color-orange)]" />
                </div>
                <h4 className="typo-h3-bs mb-3 text-[var(--bs-color-orange)]">Decision Loop</h4>
                <p className="typo-body-bs text-gray-600 leading-relaxed">
                  This inner sequence is your Decision Loop — the pattern that guides every important decision you make.
              </p>
            </div>
          </div>
          </div>
          
          {/* Assessment Benefits Box */}
          <div className="p-8 bg-white rounded-xl border-2 border-purple-100 shadow-sm">
            <div className="flex items-start gap-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ backgroundColor: '#f6782f' }}
              >
              </div>
              <div className="flex-1">
                <h4 className="typo-h3-bs mb-4 text-gray-900">
                  The E-DNA Assessment makes this loop visible. It shows you:
                </h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                    <span className="typo-body-bs text-gray-700">how you naturally make decisions</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                    <span className="typo-body-bs text-gray-700">what stabilises your decision loop</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                    <span className="typo-body-bs text-gray-700">what destabilises it</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                    <span className="typo-body-bs text-gray-700">and how to improve your decision-making instantly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Closing Statement Box */}
          <div className="p-6 bg-white rounded-xl border-2 border-purple-100 shadow-sm">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ backgroundColor: '#42047d' }}
              >
              </div>
              <div className="flex-1 pt-1">
                <p className="typo-body-bs text-gray-800 font-semibold mb-2">
                  Your mind already has a decision making system.
                </p>
              <p className="typo-body-bs text-gray-700">
                  E-DNA helps you see it clearly and improve it.
                </p>
              </div>
            </div>
          </div>

           {/* EDNA Framework Diagram */}
           <div className="my-12 flex justify-center items-center">
             <div className="p-8 bg-white rounded-xl border-2 border-purple-100 shadow-sm hover:shadow-md transition-shadow w-full max-w-5xl">
               <h3 className="typo-h3-bs mb-6 text-center" style={{
                 backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 backgroundClip: 'text'
               }}>
                 Decision Network
               </h3>
               <img 
                 src={diagramFrame} 
                 alt="EDNA Framework Diagram" 
                 className="w-full h-auto rounded-lg"
                 style={{ objectFit: 'contain' }}
               />
             </div>
           </div>
        </div>
      )
    },
    {
      title: 'The 7-Layer EDNA Framework',
      icon: Brain,
      content: (
        <div className="space-y-6">
          {/* Header with Brain Icon Image */}
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              {/* Gradient circle background - matches Next button gradient */}
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(90deg, #42047D 0%, #F6782F 100%)'
                }}
              >
                <img 
                  src={brainIcon} 
                  alt="EDNA Brain Icon" 
                  className="w-12 h-12 object-contain brightness-0 invert"
                />
              </div>
            </div>
            <div>
              <h3 className="typo-h2-bs" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
                <span className="text-[#841477]">The 7-Layer</span>{' '}
                <span className="bg-gradient-to-r from-[#F6782F] to-[#EC4049] bg-clip-text text-transparent">
                  EDNA Framework
                </span>
              </h3>
            </div>
          </div>
          
          {/* Subtitle */}
          <p className="text-lg text-gray-700 mb-8 font-medium" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            The 7-LAYER Entrepreneurial – Decision Network Assessment
          </p>
          
          <p className="text-base text-gray-600 mb-8" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
          Assessing your Decision Intelligence Network, will reveal how you as an entrepreneur thinks, feels and decides across 7 layers. it will show your
          </p>
          
          {/* Layer Cards */}
          <div className="space-y-4">
            <LayerPreview 
              number={1} 
              title="Core Identity" 
              description="Shows your core decision loop — how you naturally think, feel, and decide, whether you rely more on logic or emotion when making decisions and navigating your environment." 
              circleColor="#F6782F"
            />
            <LayerPreview 
              number={2} 
              title="Execution Style" 
              description="How you move from a decision into action, including your natural patterns and tendencies." 
              circleColor="#EC4049"
            />
            <LayerPreview 
              number={3} 
              title="Mirror Awareness" 
              description="How well you understand and collaborate with people who decide differently from you." 
              circleColor="#C72170"
            />
            <LayerPreview 
              number={4} 
              title="Learning Style Preferences" 
              description="How you learn best — through seeing, hearing, writing, doing, structure, or big-picture thinking." 
              circleColor="#841477"
            />
            <LayerPreview 
              number={5} 
              title="Neuro-Performance Pattern" 
              description="How your body and brain manage focus, emotion, and sensory input." 
              circleColor="#F6782F"
            />
            <LayerPreview 
              number={6} 
              title="Mindset & Personality" 
              description="Your internal tendencies, mindset , traits and Behaviour — how you respond to pressure, risk, feedback, and growth." 
              circleColor="#42047D"
            />
            <LayerPreview 
              number={7} 
              title="Meta-Beliefs & Values" 
              description="Uncovers the deeper beliefs and values that quietly drive every decision you make." 
              circleColor="#EC4049"
            />
          </div>
        </div>
      )
    },
    {
      title: 'How to Take Your E-DNA Assessment',
      icon: Target,
      content: (
        <div className="space-y-8">
          {/* Opening Statement - GitHub style intro */}
          <div className="border-b border-gray-200 pb-6">
            <p className="typo-body-bs text-gray-700 leading-relaxed">
              Discover your <strong>Entrepreneurial Decision Network (E-DNA)</strong> — the internal decision system that shapes how you think, choose, act, and lead. This assessment helps you understand yourself accurately so you can operate with clarity, confidence, and alignment in every part of your business.
            </p>
          </div>

          {/* Assessment Overview - GitHub style info box */}
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bs-color-indigo)]/10 flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-[var(--bs-color-indigo)]" />
                </div>
                <h3 className="typo-h3-bs text-gray-900">Assessment Overview</h3>
              </div>
            </div>
            <div className="p-8">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                  <span className="typo-body-bs text-gray-700">45 scientifically-designed questions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                  <span className="typo-body-bs text-gray-700">30–40 minutes to complete</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                  <span className="typo-body-bs text-gray-700">A comprehensive 7-layer Decision Intelligence profile</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                  <span className="typo-body-bs text-gray-700">Personalised learning + AI recommendations based on your E-DNA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Assessment Purpose - GitHub style callout */}
          <div className="border-l-4 border-[var(--bs-color-indigo)] bg-blue-50 rounded-r-xl p-8">
            <div className="flex items-start gap-6">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ backgroundColor: '#f6782f' }}
              >
              </div>
              <div>
                <h4 className="typo-h3-bs text-gray-900 mb-3">
                  This assessment is designed to reveal your real mental wiring
                </h4>
                <p className="typo-body-bs text-gray-700 mb-3">
                  Not who you think you "should" be, not who others expect you to be, but who you truly are when making decisions that matter.
                </p>
                <p className="typo-body-bs text-gray-700">
                  It helps you operate from the strongest, clearest version of yourself instead of copying someone else's style.
                </p>
              </div>
            </div>
          </div>

          {/* How to Take This Assessment - GitHub style guide */}
          <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[var(--bs-color-orange)]/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-[var(--bs-color-orange)]" />
                </div>
                <h3 className="typo-h3-bs text-gray-900">How to Take This Assessment</h3>
              </div>
            </div>
            <div className="p-8">
              <p className="typo-body-bs text-gray-600 leading-relaxed mb-4">To get the most accurate results:</p>
              <ol className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #42047D 0%, #841477 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    1
                  </span>
                  <div>
                    <p className="typo-body-bs font-semibold text-gray-900 mb-1">Answer instinctively</p>
                    <p className="typo-body-bs text-gray-600">Go with your first natural response, not the one after pondering you think or feel is "ideal".</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #42047D 0%, #841477 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    2
                  </span>
                  <div>
                    <p className="typo-body-bs font-semibold text-gray-900 mb-1">Don't overthink your choices</p>
                    <p className="typo-body-bs text-gray-600">Your first internal signal is usually the most accurate.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #42047D 0%, #841477 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    3
                  </span>
                  <div>
                    <p className="typo-body-bs font-semibold text-gray-900 mb-1">Be honest, not aspirational</p>
                    <p className="typo-body-bs text-gray-600">This isn't measuring success — it's mapping your decision pattern.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #42047D 0%, #841477 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    4
                  </span>
                  <div>
                    <p className="typo-body-bs font-semibold text-gray-900 mb-1">Stay consistent with who you are in real situations</p>
                    <p className="typo-body-bs text-gray-600">Not the past version of you. Not the future version. Just you as you are today.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full text-white text-sm font-semibold flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #42047D 0%, #841477 100%)', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    5
                  </span>
                  <div>
                    <p className="typo-body-bs font-semibold text-gray-900 mb-1">There are no right or wrong answers — only truth</p>
                    <p className="typo-body-bs text-gray-600">Your authenticity is what makes your results powerful and useful.</p>
                  </div>
                </li>
              </ol>
            </div>
          </div>

          {/* Why Your Honesty Matters - GitHub style note */}
          <div className="border border-gray-200 rounded-xl bg-white p-8">
            <div className="flex items-start gap-6 mb-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-md"
                style={{ backgroundColor: '#42047d' }}
              >
              </div>
              <h4 className="typo-h3-bs text-gray-900">
                Why Your Honesty Matters
              </h4>
            </div>
            <p className="typo-body-bs text-gray-700 mb-4">
              Every answer helps the system understand:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                <span className="typo-body-bs text-gray-700">how your mind actually works now,</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                <span className="typo-body-bs text-gray-700">what stabilises your decision loop,</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                <span className="typo-body-bs text-gray-700">what destabilises it,</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[var(--bs-color-indigo)] mt-0.5 flex-shrink-0" />
                <span className="typo-body-bs text-gray-700">and how to upgrade your decisions instantly.</span>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="typo-body-bs text-gray-800 font-semibold">
                You are already wired for clarity — the assessment simply helps you see your pattern so you can use it to your advantage.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Your Personalized Experience',
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          {/* Header Section */}
        <div className="space-y-4">
            {/* Intro paragraph */}
            <p className="text-lg text-gray-600 max-w-2xl mr-auto text-left" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
              After completing the assessment, you'll gain clarity on how you make decisions, and receive the following:
            </p>
            
            {/* Separator line */}
            <div className="flex justify-center my-6">
              <div className="h-0.5 w-24" style={{ backgroundColor: '#F6782F' }}></div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <PersonalizedFeatureCard 
              icon={Brain}
              title="Decision Intelligence Results"
              description="Your E-DNA results uncover the full system behind your decisions — the interaction between your logic, intuition, learning style, wiring, patterns, mindset, and values — so you can lead from your strongest and most aligned self."
              iconGradient={['#42047D', '#841477']}
            />
            <PersonalizedFeatureCard 
              icon={Users}
              title="Dual AI Mentors"
              description="Two AI guides support you in real time: • one strengthens Decision Intelligence • one strengthens Collaboration Mastery. Together, they help you scale Faster."
              iconGradient={['#C72170', '#EC4049']}
            />
            <PersonalizedFeatureCard 
              icon={FileText}
              title="Interactive Workbooks"
              description="Step-by-step Decision Mastery Workbook translates your E-DNA insights into practical action — so you can stabilise your loop, avoid common traps, and make better decisions daily."
              iconGradient={['#F6782F', '#EC4049']}
            />
          </div>

          {/* Separator line */}
          <div className="flex justify-center my-6">
            <div className="h-0.5 w-24" style={{ backgroundColor: '#F6782F' }}></div>
          </div>

          {/* Result Section */}
          <Card className="rounded-lg" style={{ backgroundColor: '#F3E8FF', border: 'none' }}>
            <CardContent className="pt-6 pb-6">
              <p className="text-center">
                <strong style={{ color: '#841477', fontFamily: 'Inter, Poppins, sans-serif' }}>The Result</strong>
                <br />
                <span style={{ color: '#841477', fontFamily: 'Inter, Poppins, sans-serif' }}>
                  A complete ecosystem designed to help you make better decisions — consistently, confidently, and without confusion.
                </span>
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
            In just 30-40 mins, you'll have a comprehensive understanding of how you think, learn, and lead—plus a personalized roadmap for growth.
          </p>
            <p className="typo-caption-bs text-gray-600">
            Takes 30-40 mins · 45 questions · No wrong answers
            </p>
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
            
            {/* Header - Hide for step 2 (index 1) and step 5 (index 5) since they have custom headers in content */}
            {currentStep !== 1 && currentStep !== 5 && (
            <div className="bg-gradient-to-r from-purple-50 to-orange-50 p-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-arch-scale rounded-full flex items-center justify-center shadow-lg">
                  <StepIcon className="w-8 h-8 text-white" />
                </div>
                <h2 className="typo-h2-bs">{currentStepData.title}</h2>
              </div>
            </div>
            )}
            
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
            
            {/* Next/Start Your Assessment Button */}
              <button 
              onClick={() => {
                if (currentStep === steps.length - 1) { // Check if it's the last step
                  // Mark onboarding as complete and proceed to quiz
                  onComplete();
                } else {
                  setCurrentStep(currentStep + 1);
                }
              }}
                className="cta-gradient-bs px-8 flex items-center gap-2"
              >
              {currentStep === steps.length - 1 ? (
                <>
              <Target className="w-5 h-5" />
              <span>Start Your Assessment</span>
                </>
              ) : (
                <>
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
                </>
              )}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function LayerPreview({ number, title, description, circleColor }: {
  number: number;
  title: string;
  description: string;
  circleColor: string;
}) {
  return (
    <div 
      className="bg-white rounded-[16px] border border-gray-100 p-6 transition-shadow relative overflow-hidden"
      style={{ 
        fontFamily: 'Inter, Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
        borderLeftWidth: '4px',
        borderLeftColor: circleColor,
        borderLeftStyle: 'solid'
      }}
    >
      <div className="flex items-center gap-6">
        {/* Number circle - 40-50px with exact brand color */}
        <div 
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ 
            backgroundColor: circleColor,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <span className="text-2xl font-bold text-white leading-none">{number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <h4 className="typo-h3-bs text-gray-900 mb-2" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            {title}
          </h4>
          <p className="typo-body-bs text-gray-600" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function PersonalizedFeatureCard({ icon: Icon, title, description, iconGradient = ['#841477', '#841477'] }: {
  icon: any;
  title: string;
  description: string;
  iconGradient?: [string, string];
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-start gap-4">
      {/* Gradient square icon */}
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: `linear-gradient(90deg, ${iconGradient[0]} 0%, ${iconGradient[1]} 100%)`
        }}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      {/* Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          {/* Gradient circle around checkmark */}
          <div 
            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(90deg, #42047D 0%, #841477 100%)'
            }}
          >
            <Check className="w-4 h-4 text-white" />
          </div>
          <h4 className="text-lg font-semibold" style={{ color: '#841477', fontFamily: 'Inter, Poppins, sans-serif' }}>
            {title}
          </h4>
        </div>
        <p className="text-base text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, Poppins, sans-serif' }}>
          {description}
        </p>
      </div>
    </div>
  );
}
