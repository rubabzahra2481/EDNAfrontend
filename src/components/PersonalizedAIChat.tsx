// Personalized AI Chat - Dual Personalities adapted to 7-layer profile
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { EDNAResults } from './EDNAQuiz';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  BarChart3,
  Lightbulb,
  Target,
  Brain,
  Zap
} from 'lucide-react';

interface PersonalizedAIChatProps {
  profile: EDNAResults;
  persona: 'architect' | 'alchemist';
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  aiPersonality?: 'architect' | 'alchemist';
}

export function PersonalizedAIChat({ profile, persona }: PersonalizedAIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: generateWelcomeMessage(),
      timestamp: new Date(),
      aiPersonality: persona
    }
  ]);
  const [input, setInput] = useState('');
  const [activePersonality, setActivePersonality] = useState<'architect' | 'alchemist'>(persona);

  function generateWelcomeMessage(): string {
    const subtypeName = profile.subtype[0].replace(/_/g, ' ');
    const mirrorLevel = profile.score_band.toLowerCase();
    
    if (persona === 'architect') {
      return `Welcome! I'm your Architect AI mentor, calibrated for ${subtypeName} types with ${mirrorLevel} mirror awareness.

I can help you with:
• Building scalable systems and processes
• Data-driven decision frameworks  
• ROI analysis and metrics setup
• Strategic planning and roadmaps

${profile.layer7_scores.purpose_filter > 70 
  ? 'I notice you\'re mission-driven. I\'ll help you measure impact alongside profit.' 
  : ''}

What would you like to work on today?`;
    } else {
      return `Hey there! I'm your Alchemist AI mentor, tuned to your ${subtypeName} profile and ${mirrorLevel} opposite awareness.

I can help you with:
• Innovative problem-solving and creativity
• Vision development and storytelling
• Market positioning and differentiation
• Breakthrough strategies

${profile.layer6_profile.risk_style.type === 'high'
  ? 'I see you have high risk tolerance. Let\'s explore some bold ideas!'
  : ''}

What vision are we bringing to life?`;
    }
  }

  function generateAIResponse(userMessage: string): string {
    const isArchitect = activePersonality === 'architect';
    
    // Adapt response based on Layer 7 values
    const isMissionDriven = profile.layer7_scores.purpose_filter > 70;
    const isProfitFocused = profile.layer7_scores.purpose_filter < 40;
    const isInnovationOriented = profile.layer7_scores.change_appetite > 70;
    
    // Sample responses (in production, this would call actual AI API)
    const architectResponses = [
      `Let's break this down systematically. ${isMissionDriven ? 'We\'ll measure both impact and revenue.' : 'First, what\'s the ROI target?'}

Here's a framework:
1. Define clear success metrics
2. Map dependencies and constraints
3. Build a staged rollout plan
4. Set up tracking dashboards

${profile.opposite_awareness.T < 70 ? '💡 Translation tip: Consider how you\'ll explain this vision to stakeholders.' : ''}

What's your primary goal here?`,

      `Good question. Let's apply data-driven thinking:

**Framework**: ${profile.decision_templates[0]?.replace(/_/g, ' ') || 'Structured analysis'}

Key questions:
• What metrics will prove success?
• What are the dependency chains?
• Where are the failure points?
• How do we stage the rollout?

${isInnovationOriented ? 'Since you value innovation, let\'s also build in experimental loops.' : ''}

Which aspect should we tackle first?`
    ];

    const alchemistResponses = [
      `Love it! Let's think bigger. ${isMissionDriven ? 'How does this advance your mission?' : 'What\'s the market disruption potential?'}

Here's what I'm seeing:
✨ The core insight: Transform this into narrative
🎯 The positioning angle: How you differentiate  
🚀 The breakthrough move: What competitors won't expect
💫 The story that sells: How customers will feel

${profile.opposite_awareness.T < 70 ? '📊 Systems note: We\'ll need proof points and data to back this up.' : ''}

What excites you most about this?`,

      `This is where vision meets reality! Let me share some creative angles:

**Approach**: ${profile.learning_style.concept_processing === 'abstract' ? 'Conceptual exploration' : 'Concrete examples'}

Possibilities:
• Reframe the problem completely
• Find the emotional hook
• Design the experience first
• Build narrative momentum

${profile.layer6_profile.risk_style.type === 'high' ? 'With your risk tolerance, we could try the bold pivot approach.' : 'Let\'s prototype this safely first.'}

What direction feels right?`
    ];

    const responses = isArchitect ? architectResponses : alchemistResponses;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Generate AI response with delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
        aiPersonality: activePersonality
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const switchPersonality = () => {
    const newPersonality = activePersonality === 'architect' ? 'alchemist' : 'architect';
    setActivePersonality(newPersonality);
    
    const switchMessage: Message = {
      id: Date.now().toString(),
      role: 'assistant',
      content: `Switching to ${newPersonality === 'architect' ? 'Architect' : 'Alchemist'} mode. ${newPersonality === 'architect' ? 'Let\'s add structure and metrics to this.' : 'Let\'s explore the creative possibilities!'}`,
      timestamp: new Date(),
      aiPersonality: newPersonality
    };
    
    setMessages(prev => [...prev, switchMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl mb-2">AI Business Advisor</h1>
              <p className="text-gray-600">
                Personalized for your {profile.subtype[0].replace(/_/g, ' ')} profile
              </p>
            </div>
            <Button 
              onClick={switchPersonality}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Switch to {activePersonality === 'architect' ? 'Alchemist' : 'Architect'}</span>
            </Button>
          </div>

          {/* Active Adaptations */}
          <Card className="bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-200">
            <CardContent className="pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="w-5 h-5 text-purple-600" />
                    <span className="font-medium">
                      {activePersonality === 'architect' ? 'Architect' : 'Alchemist'} Mode Active
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {profile.learning_style.modality.join(' + ')} learner
                    </Badge>
                    <Badge variant="outline">
                      {profile.layer7_scores.purpose_filter > 70 ? 'Mission-driven' : 
                       profile.layer7_scores.purpose_filter < 40 ? 'Profit-focused' : 'Balanced'} values
                    </Badge>
                    <Badge variant="outline">
                      {profile.layer6_profile.risk_style.type} risk
                    </Badge>
                    {profile.opposite_awareness.overall < 70 && (
                      <Badge variant="outline" className="bg-yellow-50">
                        Building mirror skills
                      </Badge>
                    )}
                  </div>
                </div>
                {activePersonality === 'architect' ? (
                  <BarChart3 className="w-12 h-12 text-blue-600" />
                ) : (
                  <Sparkles className="w-12 h-12 text-orange-600" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Conversation</span>
            </CardTitle>
          </CardHeader>

          {/* Messages */}
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map(message => (
              <ChatMessage 
                key={message.id} 
                message={message}
                userPersona={persona}
              />
            ))}
          </CardContent>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about your business..."
                className="flex-1"
              />
              <Button onClick={handleSend} className="bg-gradient-to-r from-purple-600 to-orange-500">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setInput('Help me build a scalable process for...')}
              >
                Build a process
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setInput('What metrics should I track for...')}
              >
                Define metrics
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setInput('Help me innovate on...')}
              >
                Brainstorm ideas
              </Button>
            </div>
          </div>
        </Card>

        {/* Context Awareness */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium mb-1">AI is adapting to your profile</p>
                <p className="text-sm text-gray-700">
                  Responses are personalized based on your {profile.subtype[0].replace(/_/g, ' ')} subtype,
                  {' '}{profile.layer7_profile.headline.toLowerCase()}, and {profile.learning_style.approach} learning approach.
                  {profile.opposite_awareness.overall < 70 && (
                    <> I'll also suggest ways to strengthen your mirror awareness skills.</>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Chat Message Component
function ChatMessage({ 
  message, 
  userPersona 
}: { 
  message: Message;
  userPersona: 'architect' | 'alchemist';
}) {
  const isUser = message.role === 'user';
  const aiPersonality = message.aiPersonality || userPersona;

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex space-x-3 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser 
            ? 'bg-gray-200' 
            : aiPersonality === 'architect'
            ? 'bg-blue-100'
            : 'bg-orange-100'
        }`}>
          {isUser ? (
            <User className="w-4 h-4 text-gray-600" />
          ) : aiPersonality === 'architect' ? (
            <BarChart3 className="w-4 h-4 text-blue-600" />
          ) : (
            <Sparkles className="w-4 h-4 text-orange-600" />
          )}
        </div>

        {/* Message */}
        <div>
          <div className={`rounded-lg p-4 ${
            isUser 
              ? 'bg-gradient-to-r from-purple-600 to-orange-500 text-white' 
              : 'bg-white border shadow-sm'
          }`}>
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          <p className="text-xs text-gray-500 mt-1 px-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    </div>
  );
}
