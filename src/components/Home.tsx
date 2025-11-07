/**
 * Home Component
 * Updated with Brandscaling Design System
 */

import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Brain, BookOpen, MessageSquare, TrendingUp, Sparkles, Target } from 'lucide-react';

interface HomeProps {
  onViewChange: (view: string) => void;
}

export function Home({ onViewChange }: HomeProps) {
  const features = [
    {
      icon: Brain,
      title: 'E-DNA Assessment',
      description: 'Discover your entrepreneurial DNA - are you an Architect or an Alchemist?',
      action: () => onViewChange('quiz'),
      actionText: 'Take Quiz'
    },
    {
      icon: BookOpen,
      title: 'Personalized Learning',
      description: 'Access courses tailored to your unique business profile and learning style.',
      action: () => onViewChange('dashboard'),
      actionText: 'View Courses'
    },
    {
      icon: MessageSquare,
      title: 'AI Mentor',
      description: 'Get guidance from AI mentors designed for your specific entrepreneur type.',
      action: () => onViewChange('chat'),
      actionText: 'Start Chat'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="section-padding-bs bg-gradient-arch-scale relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-depth-plum opacity-30" aria-hidden="true" />
        
        <div className="container-bs-desktop relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="typo-h1-bs text-white mb-6">
              Discover Your Entrepreneurial DNA
            </h1>
            <p className="typo-body-bs text-white/90 max-w-3xl mx-auto mb-12">
              Take the EDNA assessment and unlock personalized learning experiences, 
              AI mentorship, and growth strategies designed specifically for your business DNA.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onViewChange('quiz')}
                className="cta-gradient-bs px-8 flex items-center justify-center gap-2 bg-white text-[var(--bs-color-indigo)] hover:bg-gray-50"
                style={{ 
                  background: 'white',
                  color: 'var(--bs-color-indigo)'
                }}
              >
                <Brain className="w-5 h-5" />
                <span>Take the E-DNA Quiz</span>
              </button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => onViewChange('dashboard')}
                className="h-[var(--bs-cta-height)] px-8 border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding-bs bg-gray-50">
        <div className="container-bs-desktop">
          <div className="text-center mb-[var(--bs-spacing-section-heading)]">
            <h2 className="typo-h2-bs mb-6">
              Everything You Need to Scale
            </h2>
            <p className="typo-body-bs text-gray-600 max-w-2xl mx-auto">
              Our platform combines assessment, education, and AI guidance to accelerate your business growth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="program-flow-card text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-gradient-arch-scale"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="typo-h3-bs mb-4">{feature.title}</h3>
                  <p className="typo-body-bs text-gray-600 mb-6">
                    {feature.description}
                  </p>
                  <button 
                    onClick={feature.action}
                    className="cta-gradient-bs px-6 w-full"
                  >
                    {feature.actionText}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding-bs bg-white">
        <div className="container-bs-desktop">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Entrepreneurs Assessed' },
              { number: '500+', label: 'Business Strategies' },
              { number: '24/7', label: 'AI Support Available' },
              { number: '95%', label: 'Success Rate' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="typo-h2-bs text-gradient-arch-scale mb-2">
                  {stat.number}
                </div>
                <p className="typo-caption-bs text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding-bs bg-white border-t border-gray-100">
        <div className="container-bs-desktop">
          <div className="text-center mb-[var(--bs-spacing-section-heading)]">
            <h2 className="typo-h2-bs mb-6">
              How It Works
            </h2>
            <p className="typo-body-bs text-gray-600 max-w-2xl mx-auto">
              Three simple steps to unlock your entrepreneurial potential
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                icon: Brain,
                title: 'Take Assessment',
                description: 'Complete our 7-layer EDNA quiz to discover your entrepreneurial DNA type'
              },
              {
                step: '02',
                icon: Target,
                title: 'Get Your Profile',
                description: 'Receive detailed insights and personalized recommendations based on your results'
              },
              {
                step: '03',
                icon: Sparkles,
                title: 'Start Growing',
                description: 'Access tailored courses, AI mentorship, and strategies designed for your DNA'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-block px-4 py-2 rounded-full bg-gradient-arch-scale mb-4">
                    <span className="typo-h3-bs text-white">{item.step}</span>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[var(--bs-color-indigo)]" />
                  </div>
                  <h3 className="typo-h3-bs mb-3">{item.title}</h3>
                  <p className="typo-body-bs text-gray-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding-bs bg-gradient-arch-scale">
        <div className="container-bs-desktop">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="typo-h2-bs text-white mb-6">
              Ready to Discover Your Business DNA?
            </h2>
            <p className="typo-body-bs text-white/90 mb-12">
              Join thousands of entrepreneurs who have transformed their businesses with our AI-powered platform.
            </p>
            <button
              onClick={() => onViewChange('quiz')}
              className="cta-gradient-bs px-8 bg-white text-[var(--bs-color-indigo)] hover:bg-gray-50 inline-flex items-center gap-2"
              style={{ 
                background: 'white',
                color: 'var(--bs-color-indigo)'
              }}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Start Your Journey</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}