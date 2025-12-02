import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarContent, AvatarFallback } from './ui/avatar';
import { 
  Send, 
  Building2, 
  Sparkles, 
  MessageSquare, 
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Loader2
} from 'lucide-react';

interface AIChatProps {
  persona?: 'architect' | 'alchemist';
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'architect' | 'alchemist';
  timestamp: Date;
  typing?: boolean;
}

const architectPersonality = {
  name: 'Alex (Architect AI)',
  avatar: 'AA',
  color: 'purple',
  icon: Building2,
  description: 'Systematic business strategist focused on data-driven growth',
  greetings: [
    "Hello! I'm Alex, your Architect AI advisor. I specialize in systematic business building, process optimization, and data-driven strategies. How can I help you structure your business for scalable growth today?",
    "Welcome back! Ready to dive into some strategic planning? I'm here to help you build robust systems and processes that will scale with your business.",
    "Hi there! As your Architect AI, I'm excited to help you create structured, measurable approaches to your business challenges. What would you like to systematize today?"
  ],
  responses: {
    general: "As an Architect, I recommend taking a systematic approach to this challenge. Let's break it down into measurable components...",
    strategy: "For strategic planning, I suggest we start with clear KPIs and build a framework that allows for systematic optimization...",
    operations: "Operational efficiency is key here. Let me outline a structured process that will help you scale this systematically..."
  }
};

const alchemistPersonality = {
  name: 'Luna (Alchemist AI)',
  avatar: 'LA',
  color: 'orange',
  icon: Sparkles,
  description: 'Creative innovation catalyst focused on breakthrough solutions',
  greetings: [
    "Hey there! I'm Luna, your Alchemist AI mentor. I thrive on turning wild ideas into breakthrough innovations. What creative challenge can we transform together today?",
    "Welcome to the realm of possibilities! I'm here to help you think outside the box and discover innovative solutions that others might miss. What's sparking your imagination?",
    "Greetings, fellow innovator! Ready to explore some unconventional approaches? I love helping visionaries like you turn bold concepts into reality."
  ],
  responses: {
    general: "What an intriguing challenge! Let's explore some creative angles that might unlock breakthrough opportunities...",
    innovation: "I sense there's a unique opportunity here. What if we approached this from a completely different perspective?",
    creativity: "This is where magic happens! Let's brainstorm some unconventional solutions that could transform your entire approach..."
  }
};

const mockConversations = {
  architect: [
    {
      user: "How do I scale my marketing efficiently?",
      ai: "Excellent question! For scalable marketing, I recommend implementing a systematic approach:\n\n1. **Set up tracking infrastructure** - Implement comprehensive analytics to measure every touchpoint\n2. **Create standardized processes** - Document your successful campaigns as repeatable templates\n3. **Build automation workflows** - Use tools to nurture leads systematically\n4. **Establish clear KPIs** - Track metrics like CAC, LTV, and conversion rates at each stage\n\nWould you like me to help you create a specific measurement framework for your current marketing efforts?"
    },
    {
      user: "What metrics should I track for my SaaS business?",
      ai: "For a robust SaaS metrics framework, focus on these key areas:\n\n**Growth Metrics:**\n• Monthly Recurring Revenue (MRR)\n• Annual Recurring Revenue (ARR)\n• Customer Acquisition Cost (CAC)\n• Customer Lifetime Value (LTV)\n\n**Operational Metrics:**\n• Churn Rate (monthly/annual)\n• Net Revenue Retention\n• Daily/Monthly Active Users\n• Feature Adoption Rates\n\n**Financial Health:**\n• Gross Revenue Retention\n• Payback Period\n• Unit Economics\n\nI can help you set up a dashboard to track these systematically. Which area would you like to dive deeper into first?"
    }
  ],
  alchemist: [
    {
      user: "How can I make my brand stand out in a crowded market?",
      ai: "What an exciting challenge! Let's unleash some creative magic to make your brand unforgettable:\n\n✨ **Find your unique story angle** - What's the unconventional origin story that only you can tell?\n\n🎨 **Create an emotional experience** - Instead of selling products, craft moments that transform how people feel\n\n🚀 **Embrace bold contradictions** - What industry 'rules' can you playfully break?\n\n💫 **Build a movement, not just a brand** - What change do you want to inspire in the world?\n\n🌟 **Design surprise moments** - How can you delight customers in unexpected ways?\n\nWhat resonates most with your vision? Let's explore how to amplify that unique spark!"
    },
    {
      user: "I'm stuck on product innovation. Any creative ideas?",
      ai: "Innovation block? Perfect - that's where the breakthrough magic begins! 🌟\n\nLet's shake things up with some creative catalysts:\n\n🔄 **Reverse assumptions** - What if your product did the opposite of what everyone expects?\n\n🎭 **Cross-pollinate wildly** - What can you borrow from completely unrelated industries?\n\n🔮 **Future-back thinking** - If this product existed in 2030, what would it look like?\n\n🎪 **Constraint creativity** - What if you had to solve this with 10% of your current resources?\n\n🌊 **Emotion-first design** - What feeling do you want people to have? Start there!\n\nWhich direction sparks something interesting? Let's dive deeper into that creative rabbit hole!"
    }
  ]
};

export function AIChat({ persona = 'architect' }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<'architect' | 'alchemist'>(persona);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activePersonality = currentPersona === 'architect' ? architectPersonality : alchemistPersonality;

  useEffect(() => {
    // Initialize with greeting
    const greeting = activePersonality.greetings[Math.floor(Math.random() * activePersonality.greetings.length)];
    setMessages([{
      id: '1',
      content: greeting,
      sender: currentPersona,
      timestamp: new Date()
    }]);
  }, [currentPersona]);

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const conversation = mockConversations[currentPersona];
    
    // Check for similar questions in mock conversations
    for (const conv of conversation) {
      if (userMessage.toLowerCase().includes(conv.user.toLowerCase().split(' ')[0])) {
        return conv.ai;
      }
    }

    // Default responses based on keywords
    const keywords = userMessage.toLowerCase();
    
    if (currentPersona === 'architect') {
      if (keywords.includes('metric') || keywords.includes('measure') || keywords.includes('track')) {
        return "Great question about metrics! For systematic measurement, I recommend starting with these key frameworks:\n\n1. **Leading vs Lagging indicators** - Track both predictive and outcome metrics\n2. **North Star metric** - One primary metric that drives all decisions\n3. **Cohort analysis** - Understand behavior patterns over time\n4. **Funnel optimization** - Measure conversion at each step\n\nWhat specific area of your business would you like to create measurement frameworks for?";
      }
      
      if (keywords.includes('scale') || keywords.includes('grow') || keywords.includes('system')) {
        return "Scaling systematically is exactly what Architects excel at! Here's my recommended approach:\n\n📊 **Document current processes** - Create standard operating procedures\n⚙️ **Identify bottlenecks** - Find and optimize constraint points\n🔄 **Build feedback loops** - Continuous improvement mechanisms\n📈 **Create predictable systems** - Reduce dependency on individual performance\n\nWhich area of your business feels most chaotic right now? Let's bring some structure to it!";
      }
      
      return "As your Architect AI, I recommend we approach this systematically. Let me break this down into structured components and help you build a framework for success. What specific challenge would you like to systematize?";
    } else {
      if (keywords.includes('creative') || keywords.includes('innovation') || keywords.includes('idea')) {
        return "Oh, I LOVE creativity challenges! 🎨✨\n\nLet's unlock your innovative potential with these creative catalysts:\n\n🌪️ **Constraint creativity** - Sometimes limits spark the best ideas\n🔀 **Random connections** - Combine unrelated concepts for breakthrough insights\n🎭 **Role play** - How would a child/artist/scientist approach this?\n🚀 **What if scenarios** - Push boundaries with impossible possibilities\n\nWhat's the wildest idea you've had about this challenge? Let's make it happen!";
      }
      
      if (keywords.includes('brand') || keywords.includes('story') || keywords.includes('unique')) {
        return "Your brand story is your secret weapon! 🌟\n\nLet's craft something magnetic:\n\n💫 **Find your 'why'** - What change do you want to create in the world?\n🎪 **Embrace the weird** - Your quirks are your superpowers\n🌈 **Create emotional bridges** - Connect hearts, not just minds\n🔮 **Think beyond products** - You're selling transformation\n\nWhat makes you come alive when you talk about your business? That passion is where your unique story lives!";
      }
      
      return "What a fascinating challenge! 🌟 Let's explore this from some unexpected angles and see what innovative solutions we can discover together. The best breakthroughs often come from the most surprising directions!";
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputMessage),
        sender: currentPersona,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    const greeting = activePersonality.greetings[Math.floor(Math.random() * activePersonality.greetings.length)];
    setMessages([{
      id: Date.now().toString(),
      content: greeting,
      sender: currentPersona,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  currentPersona === 'architect' ? 'bg-purple-600' : 'bg-orange-500'
                } text-white`}>
                  {currentPersona === 'architect' ? (
                    <Building2 className="w-6 h-6" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <CardTitle className="text-xl">{activePersonality.name}</CardTitle>
                  <p className="text-sm text-gray-600">{activePersonality.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={currentPersona === 'architect' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPersona('architect')}
                  className="flex items-center space-x-2"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Architect</span>
                </Button>
                <Button
                  variant={currentPersona === 'alchemist' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPersona('alchemist')}
                  className="flex items-center space-x-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Alchemist</span>
                </Button>
                <Button variant="outline" size="sm" onClick={clearChat}>
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Interface */}
        <Card className="h-[600px] flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>AI Business Advisor Chat</span>
              </div>
              <Badge variant="secondary">
                {currentPersona === 'architect' ? 'Architect Mode' : 'Alchemist Mode'}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col space-y-4">
            {/* Messages */}
            <ScrollArea className="flex-1 pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                
                {isTyping && (
                  <div className="flex items-start space-x-3">
                    <Avatar>
                      <AvatarFallback className={`${
                        currentPersona === 'architect' ? 'bg-purple-600' : 'bg-orange-500'
                      } text-white`}>
                        {activePersonality.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-sm">
                      <div className="flex items-center space-x-1">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-sm text-gray-600">Thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </ScrollArea>
            
            {/* Input */}
            <div className="flex items-center space-x-2">
              <Input
                placeholder={`Ask ${activePersonality.name} anything about your business...`}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className={`${
                  currentPersona === 'architect' 
                    ? 'bg-purple-600 hover:bg-purple-700' 
                    : 'bg-orange-500 hover:bg-orange-600'
                } text-white`}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Questions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Suggested Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-3">
              {(currentPersona === 'architect' ? [
                "How do I create scalable business processes?",
                "What metrics should I track for growth?",
                "How can I systematize my operations?",
                "What's the best way to optimize my sales funnel?"
              ] : [
                "How can I innovate in a saturated market?",
                "What creative strategies can differentiate my brand?",
                "How do I turn wild ideas into viable products?",
                "What's an unconventional approach to customer acquisition?"
              ]).map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(question)}
                  className="text-left p-3 border rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  {question}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === 'user';
  const isArchitect = message.sender === 'architect';
  
  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg p-3 max-w-sm lg:max-w-md">
          <p className="whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs text-blue-100 mt-1">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-start space-x-3">
      <Avatar>
        <AvatarFallback className={`${
          isArchitect ? 'bg-purple-600' : 'bg-orange-500'
        } text-white`}>
          {isArchitect ? 'AA' : 'LA'}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="bg-white border rounded-lg p-3 max-w-lg lg:max-w-xl shadow-sm">
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500">
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Copy className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ThumbsUp className="w-3 h-3" />
              </Button>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <ThumbsDown className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}