import React, { useRef, useState, useEffect } from 'react';
import { EDNAResults } from '../lib/scoring';
import { Home, ChevronLeft, ChevronRight, BookOpen, Brain, MessageSquare, FileText, User } from 'lucide-react';
import brandscalingLogo from 'figma:asset/4ffc1593ac524b5a444c05cca1a8149a7e87be86.png';
import { Courses } from './Courses';
import { AIMentorHub } from './AIMentorHub';
import { Workbooks } from './Workbooks';
import { BACKEND_URL } from '../config';
import { useIsMobile } from './ui/use-mobile';

interface CompleteResultsPageProps {
  results?: EDNAResults | null;
  userEmail: string;
  onGetFullReport?: () => void;
  onViewChange?: (view: string) => void;
  quizCompletedAt?: Date | null;
  isStandalone?: boolean; // If true, render as standalone page without sidebar. If false, render inside dashboard with sidebar.
  onDashboardViewChange?: (view: string) => void; // Callback for dashboard view changes (for mobile menu)
  activeDashboardView?: string; // Current active dashboard view (for mobile menu)
  isMobileMenuOpen?: boolean; // Whether the mobile menu is open (for adjusting content position)
}

export function CompleteResultsPage({ results, userEmail, onGetFullReport, onViewChange, quizCompletedAt, isStandalone = false, onDashboardViewChange, activeDashboardView: externalActiveView, isMobileMenuOpen = false }: CompleteResultsPageProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeView, setActiveView] = useState<string>(externalActiveView || 'profile'); // Always default to EDNA Profile section
  const isMobile = useIsMobile();
  
  // Calculate mobile menu height (approximately 280px for dashboard menu with 4 items + auth button)
  // Each item: ~50px (py-3 = 12px top + 12px bottom + ~26px content) + padding
  // Only apply on mobile devices, not desktop
  const mobileMenuHeight = (isMobile && isMobileMenuOpen) ? 280 : 0;
  
  // Sync external activeView if provided - always update when it changes
  useEffect(() => {
    if (externalActiveView !== undefined && externalActiveView !== null) {
      setActiveView(externalActiveView);
    }
  }, [externalActiveView]);
  
  // Update activeView and notify parent
  const handleViewChange = (view: string) => {
    setActiveView(view);
    onDashboardViewChange?.(view);
  };

  
  // Sidebar menu items - EDNA Profile shows message if no results
  const sidebarMenuItems = [
    { id: 'profile', label: 'EDNA Profile', icon: User, view: 'profile', hasResults: !!results },
    { id: 'workbooks', label: 'Workbooks', icon: FileText, view: 'workbooks', disabled: false },
    { id: 'chat', label: 'AI Mentor', icon: MessageSquare, view: 'chat' },
    { id: 'courses', label: 'Courses', icon: BookOpen, view: 'courses', disabled: true }, // Disabled for now, will be enabled later
  ];


  // Sidebar Component - Modern, appealing design inspired by top UI/UX
  const Sidebar = () => {
    return (
    <aside
      className="hidden md:flex fixed left-0 flex-col hide-scrollbar"
      style={{ 
        position: 'fixed', // Fixed positioning to stay connected to navbar
        top: '70px', // Start directly below navbar (64px nav + 6px gradient stripe)
        left: '0px', // Explicitly set left position
        width: isSidebarCollapsed ? '72px' : '260px',
        height: `calc(100vh - 70px - ${mobileMenuHeight}px)`,
        maxHeight: `calc(100vh - 70px - ${mobileMenuHeight}px)`, // Ensure it doesn't exceed viewport
        background: '#ffffff',
        borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        overflowY: 'auto',
        overflowX: 'hidden',
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
        scrollbarColor: 'transparent transparent', // Hide scrollbar in Firefox
        msOverflowStyle: 'none', // Hide scrollbar in IE and Edge
        // Webkit scrollbar styles added via className
        transition: 'width 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        WebkitTransition: 'width 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        willChange: 'width',
        transform: 'translateZ(0)', // Force GPU acceleration
        backfaceVisibility: 'hidden', // Prevent flickering
        WebkitTransform: 'translateZ(0)', // Safari GPU acceleration
        WebkitBackfaceVisibility: 'hidden', // Safari prevent flickering
        zIndex: 40, // Below navbar (z-50) but above content
        marginTop: '0px', // Ensure no margin offset
        marginLeft: '0px', // Ensure no margin offset
        marginRight: '0px', // Ensure no margin offset
        marginBottom: '0px' // Ensure no margin offset
      }}
    >
      {/* Sidebar Header - Ultra Minimal */}
      <div 
        className="h-12 border-b flex items-center justify-between px-3 relative"
        style={{ 
          borderColor: 'rgba(0, 0, 0, 0.06)',
          background: '#ffffff',
          marginTop: '0',
          paddingTop: '0'
        }}
      >
        <div className="flex items-center gap-2 flex-1 min-w-0" style={{ 
          opacity: isSidebarCollapsed ? 0 : 1,
          transition: 'opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          pointerEvents: isSidebarCollapsed ? 'none' : 'auto'
        }}>
          <BookOpen className="w-4 h-4 text-gray-600 flex-shrink-0" style={{ width: '16px', height: '16px' }} />
          <span className="font-semibold text-sm text-gray-900 truncate">Dashboard</span>
        </div>
        <BookOpen 
          className="w-4 h-4 text-gray-600 flex-shrink-0 absolute left-1/2 transform -translate-x-1/2" 
          style={{ 
            width: '16px', 
            height: '16px',
            opacity: isSidebarCollapsed ? 1 : 0,
            transition: 'opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            pointerEvents: isSidebarCollapsed ? 'auto' : 'none'
          }} 
        />
      </div>

      {/* Sidebar Menu - Clean spacing and design */}
      <nav className="flex-1 py-3 px-2 overflow-y-auto hide-scrollbar">
        <ul className="space-y-0.5">
          {sidebarMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.view;
            const hasResults = (item as any).hasResults !== false;
            const showNoResultsMessage = item.id === 'profile' && !hasResults;
            const isDisabled = (item as any).disabled === true;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => {
                    // Skip if disabled
                    if (isDisabled) return;
                    // Always update local state to show content within dashboard
                    handleViewChange(item.view);
                  }}
                  disabled={isDisabled}
                  className={`w-full flex items-center gap-3 rounded-md transition-all duration-150 group relative ${
                    isActive
                      ? 'text-white'
                      : isDisabled
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={{
                    padding: isSidebarCollapsed ? '10px' : '10px 12px',
                    fontSize: '14px',
                    fontWeight: isActive ? '600' : '500',
                    minHeight: '40px',
                    position: 'relative',
                    background: isActive 
                      ? 'linear-gradient(to right, #8B5CF6 0%, #F97316 100%)'
                      : 'transparent'
                  }}
                  title={isSidebarCollapsed ? (showNoResultsMessage ? 'Take quiz to see profile' : item.label) : undefined}
                >
                  <Icon className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${
                    isActive 
                      ? 'text-white' 
                      : isDisabled
                      ? 'text-gray-400'
                      : 'text-gray-600 group-hover:text-gray-900'
                  }`} style={{ width: '18px', height: '18px' }} />
                  <span 
                    className="font-medium whitespace-nowrap leading-tight text-sm"
                    style={{
                      opacity: isSidebarCollapsed ? 0 : 1,
                      transition: 'opacity 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      pointerEvents: isSidebarCollapsed ? 'none' : 'auto'
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

    </aside>
    );
  };
  
  // Content Renderer - Renders different views based on activeView (within dashboard layout)
  const renderContent = () => {
    switch (activeView) {
      case 'courses':
        return (
          <div className="w-full h-full overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
              <Courses onViewChange={onViewChange || (() => {})} isAuthenticated={true} />
            </div>
          </div>
        );
      case 'chat':
        return (
          <div className="w-full h-full overflow-y-auto bg-gray-50" style={{ display: 'flex', flexDirection: 'column' }}>
            <AIMentorHub onViewChange={onViewChange} isInDashboard={true} />
          </div>
        );
      case 'workbooks':
        // Show overlay if no results
        if (!results) {
          return (
            <div className="flex items-center justify-center h-full bg-gray-50">
              <div className="text-center px-4 py-8 max-w-md">
                <div className="mb-6">
                  <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-2xl font-bold mb-2" style={{
                    backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    No Workbooks Available Yet
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Complete your E-DNA assessment to unlock your personalized Decision Mastery Workbook
                  </p>
                </div>
                <button
                  onClick={() => {
                    if (onViewChange) {
                      onViewChange('quiz');
                    }
                  }}
                  className="cta-gradient-bs px-8 py-3"
                >
                  Take E-DNA Quiz
                </button>
              </div>
            </div>
          );
        }
        // Show workbooks if results exist
        return (
          <div className="w-full h-full overflow-y-auto bg-gray-50">
            <Workbooks onViewChange={onViewChange} coreType={core_type} />
          </div>
        );
      case 'profile':
        // Always show results if they exist, otherwise show "Take Quiz" prompt
        if (results) {
          // Results exist - return null to let the outer renderContent section show the full results page
          return null;
        }
        // No results - show "Take Quiz" prompt
        // Cooldown check is handled in App.tsx when clicking the quiz button
        return (
          <div className="max-w-4xl mx-auto w-full bg-gray-50 px-4 sm:px-6">
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 sm:p-8 md:p-12 text-center shadow-lg">
              <div className="mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-4" style={{
                  background: 'linear-gradient(to right, #8B5CF6 0%, #F97316 100%)'
                }}>
                  <Brain className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{
                  backgroundImage: 'linear-gradient(to right, #8B5CF6 0%, #F97316 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  No E-DNA Profile Yet
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                  Complete the E-DNA assessment to unlock your personalized profile, insights, and recommendations.
                </p>
                <button
                  onClick={() => {
                    onViewChange?.('quiz');
                  }}
                  className="cta-gradient-bs px-8 inline-flex items-center gap-2"
                >
                  <span>Take E-DNA Quiz</span>
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="max-w-4xl mx-auto w-full text-center py-8 sm:py-12 px-4">
            <p className="text-gray-600 text-sm sm:text-base">Select a view from the sidebar</p>
          </div>
        );
    }
  };

  // If no results, show sidebar with content renderer (only if not standalone)
  if (!results) {
    if (isStandalone) {
      // Standalone mode: show empty state without sidebar
      return (
        <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>
          <div className="max-w-4xl mx-auto w-full bg-gray-50 p-4 sm:p-6 md:p-12">
            {renderContent()}
          </div>
        </div>
      );
    }
    return (
      <div 
        className="bg-gray-50" 
        style={{ 
          fontFamily: 'Inter, sans-serif',
          height: `calc(100vh - 70px - ${mobileMenuHeight}px)`,
          overflow: 'hidden',
          position: 'fixed',
          top: `calc(70px + ${mobileMenuHeight}px)`, // Start below navbar + menu height
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          transition: 'top 300ms ease, height 300ms ease'
        }}
      >
        {/* COLLAPSIBLE SIDEBAR */}
        <Sidebar />


        {/* MAIN CONTENT AREA */}
        <div 
          className="flex flex-col bg-gray-50 md:ml-[260px]"
          style={{ 
            marginTop: '0px', // No margin needed since parent is positioned
            padding: activeView === 'profile' ? '20px 16px' : '0',
            height: `calc(100vh - 70px - ${mobileMenuHeight}px)`,
            overflow: 'hidden', // Child components handle their own scrolling
            transition: 'margin-left 800ms cubic-bezier(0.25, 0.46, 0.45, 0.94), padding 300ms ease, height 300ms ease',
            willChange: 'margin-left, padding, height',
            transform: 'translateZ(0)', // Force GPU acceleration
            backfaceVisibility: 'hidden', // Prevent flickering
            WebkitTransform: 'translateZ(0)', // Safari GPU acceleration
            WebkitBackfaceVisibility: 'hidden' // Safari prevent flickering
          }}
        >
          {renderContent()}
        </div>
      </div>
    );
  }
  
  // Variables already extracted above with defaults, skip duplicate extraction

  // Subtype data mapping
  const subtypeData: Record<string, { description: string; strength: string; blindSpot: string }> = {
    'Master Strategist': {
      description: 'Sees the world as sequence of moves',
      strength: 'Creates clarity through sequencing',
      blindSpot: 'Assumes a good plan ensures a good outcome'
    },
    'Internal Analyzer': {
      description: 'Notices patterns others overlook and refines ideas with data',
      strength: 'Turns complexity into actionable insights',
      blindSpot: 'Assumes endless refinement for real progress'
    },
    'Systemised Builder': {
      description: 'Builds systems that make progress predictable, reliable, and repeatable',
      strength: 'Calm and structured approach turns big visions into working realities',
      blindSpot: 'Assumes functionality for liveliness even if the spark is gone'
    },
    'Ultimate Architect': {
      description: 'Builds order that lasts, turning complexity into calm and vision into reality',
      strength: 'Creates order where others see confusion, turning big ideas into long-lasting system',
      blindSpot: "May undervalue emotional insight, forgetting that order alone doesn't always inspire people to move"
    },
    'Energetic Empath': {
      description: 'Turns emotion into understanding, helping people and teams find their rhythm',
      strength: 'Brings emotional energy to teams and processes, making sure progress stays people focused',
      blindSpot: "May overload, carrying others' feelings as their own"
    },
    'Magnetic Perfectionist': {
      description: 'Brings emotion to life through design, detail, and presence',
      strength: 'Turns ordinary into meaningful and unforgettable through refinement and perfection',
      blindSpot: 'May refine endlessly, missing the deadlines'
    },
    'Visionary Oracle': {
      description: 'Sees future before others',
      strength: 'Connects weak signals into foresight, inspires belief',
      blindSpot: 'Falls in love with story, mistakes resonance for traction'
    },
    'Ultimate Alchemist': {
      description: "Brings presence that calms, vision that uplifts, and understanding that bridges what others can't see",
      strength: 'Balances intuition with awareness, grounding insight in steady, clear action',
      blindSpot: 'May delay action while waiting for the perfect alignment of the energy'
    }
  };

  // Get subtype info and full name
  const getSubtypeInfo = (subtypeName: string): { fullName: string; description: string; strength: string; blindSpot: string } => {
    // Try exact match first
    if (subtypeData[subtypeName]) {
      return {
        fullName: subtypeName,
        ...subtypeData[subtypeName]
      };
    }
    
    // Try case-insensitive match
    const lowerName = subtypeName.toLowerCase();
    const matchedKey = Object.keys(subtypeData).find(key => key.toLowerCase() === lowerName);
    if (matchedKey) {
      return {
        fullName: matchedKey,
        ...subtypeData[matchedKey]
      };
    }
    
    // Try partial match (e.g., "Ultimate" should match "Ultimate Architect" or "Ultimate Alchemist")
    const partialMatch = Object.keys(subtypeData).find(key => 
      key.toLowerCase().includes(lowerName) || lowerName.includes(key.toLowerCase())
    );
    if (partialMatch) {
      return {
        fullName: partialMatch,
        ...subtypeData[partialMatch]
      };
    }
    
    // Return with original name if no match
    return {
      fullName: subtypeName,
      description: '',
      strength: '',
      blindSpot: ''
    };
  };

  // Mirror Pair Awareness descriptions - uses calculated dimension scores and labels from Layer 3
  const getMirrorAwarenessDescription = (score: number, layer3Result?: any): string => {
    // Use calculated score from layer3Result if available, otherwise use provided score
    const calculatedScore = layer3Result?.totalScore !== undefined && layer3Result?.maxScore !== undefined
      ? Math.round((layer3Result.totalScore / layer3Result.maxScore) * 100)
      : score;
    
    // If we have dimension data from Layer 3, generate personalized description
    if (layer3Result?.dimensions && Object.keys(layer3Result.dimensions).length > 0) {
      const dimensions = layer3Result.dimensions;
      const dimensionNames = Object.keys(dimensions);
      
      // Count high-performing dimensions (score >= 2, which is the "Full/Integrated/Aware" level)
      const highDimensions = dimensionNames.filter(dim => dimensions[dim].score >= 2);
      const mediumDimensions = dimensionNames.filter(dim => dimensions[dim].score === 1);
      const lowDimensions = dimensionNames.filter(dim => dimensions[dim].score === 0);
      
      // Get dimension labels to understand patterns
      const labels = dimensionNames.map(dim => dimensions[dim].label);
      const hasFullAwareness = labels.some(label => ['Full', 'Integrated', 'Open', 'Aware', 'Fast', 'Growth'].includes(label));
      const hasPartialAwareness = labels.some(label => ['Partial', 'Aware', 'Selective', 'Emerging', 'Moderate', 'Mixed'].includes(label));
      const hasLowAwareness = labels.some(label => ['Opposite', 'Reactive', 'Defensive', 'Unaware', 'Slow', 'Fixed'].includes(label));
      
      // Generate personalized description based on dimension performance
      if (calculatedScore >= 66 && highDimensions.length >= 4) {
        // High overall score with strong dimension performance
        if (hasFullAwareness && !hasLowAwareness) {
          return 'You consistently recognize and integrate different perspectives, actively adjusting decisions when others reveal insights you might miss.';
        }
        return 'You understand others perspectives well and integrate their insights into stronger decisions';
      } else if (calculatedScore >= 66) {
        // High score but mixed dimension performance
        return 'You generally understand different perspectives, though some areas may need more attention to fully integrate opposing views.';
      } else if (calculatedScore >= 33) {
        // Medium score - analyze which dimensions are weak
        if (hasLowAwareness && lowDimensions.length >= 2) {
          return 'You can collaborate with different thinkers, but struggle in some areas. When opposite styles clash, you may feel frustrated or misunderstood.';
        } else if (hasPartialAwareness) {
          return 'You can collaborate with different thinkers, but inconsistently. Alignment depends on the situation and your comfort level with their approach.';
        }
        return 'You can collaborate with different thinkers, but inconsistently. Alignment depends on the situation.';
      } else {
        // Low score - identify specific challenges
        if (hasLowAwareness && lowDimensions.length >= 3) {
          return 'You find opposite thinkers difficult to work with. Their style feels disruptive or confusing, and you often struggle to understand how they think.';
        } else if (labels.some(label => ['Defensive', 'Reactive'].includes(label))) {
          return 'You find opposite thinkers challenging. When they bring different views, you tend to defend your own approach rather than exploring their perspective.';
        }
        return 'You find opposite thinkers difficult to work with. Their style feels disruptive or confusing';
      }
    }
    
    // Fallback to score-based descriptions if no dimension data available
    if (calculatedScore >= 66) {
      return 'You understand others perspectives well and integrate their insights into stronger decisions';
    } else if (calculatedScore >= 33) {
      return 'You can collaborate with different thinkers, but inconsistently. Alignment depends on the situation.';
    } else {
      return 'You find opposite thinkers difficult to work with. Their style feels disruptive or confusing';
    }
  };

  // Get Neurodiversity classification and description - uses calculated dimension scores from Layer 5
  const getNeurodiversityInfo = (neurodiversityData: any, layer5Result?: any) => {
    // First, try to get primaryProfile and profile dimensions from layer5Result (from scoring logic)
    let primaryProfile: string | null = null;
    let profileDimensions: Record<string, string> | null = null;
    
    if (layer5Result?.primaryProfile) {
      primaryProfile = layer5Result.primaryProfile;
      profileDimensions = layer5Result.profile || null;
    } else if (layer5Result?.profile?.primaryProfile) {
      primaryProfile = layer5Result.profile.primaryProfile;
      profileDimensions = layer5Result.profile;
    }
    
    // If we have calculated primaryProfile and dimension data, generate personalized description
    if (primaryProfile && profileDimensions) {
      const dimensionNames = Object.keys(profileDimensions);
      const dimensionValues = Object.values(profileDimensions);
      
      // Count how many dimensions show neurodivergent vs neurotypical patterns
      const ndDimensions = dimensionValues.filter(v => v === 'neurodivergent').length;
      const ntDimensions = dimensionValues.filter(v => v === 'neurotypical').length;
      const teDimensions = dimensionValues.filter(v => v === 'twice_exceptional').length;
      
      // Analyze specific dimension patterns
      const hasFocusPattern = profileDimensions['Focus Pattern'];
      const hasProcessingSpeed = profileDimensions['Processing Speed'];
      const hasEnergyPattern = profileDimensions['Energy Pattern'];
      const hasTaskSwitching = profileDimensions['Task Switching'];
      const hasStressResponse = profileDimensions['Stress Response'];
      const hasRecoveryPattern = profileDimensions['Recovery Pattern'];
      
      // Generate personalized description based on dimension patterns
      if (primaryProfile === 'Twice-Exceptional') {
        // Analyze which dimensions are strengths vs challenges
        const strengthCount = teDimensions + (ndDimensions > 0 ? 1 : 0);
        const challengeCount = ndDimensions;
        
        if (strengthCount >= 3 && challengeCount >= 2) {
          return {
            classification: 'Twice exceptional (2E)',
            description: 'You excel in some areas with exceptional focus and depth, while other tasks may require different strategies or support to maintain consistent performance.'
          };
        } else if (hasFocusPattern === 'twice_exceptional' && hasProcessingSpeed === 'twice_exceptional') {
          return {
            classification: 'Twice exceptional (2E)',
            description: 'You demonstrate exceptional capabilities in focused work and processing, but may need varied approaches to maintain engagement across different task types.'
          };
        }
        return {
          classification: 'Twice exceptional (2E)',
          description: 'You work exceptionally well in some tasks but may struggle with others, requiring adaptive strategies to optimize your performance.'
        };
      } else if (primaryProfile === 'Neurodivergent') {
        // Analyze specific neurodivergent patterns
        if (hasEnergyPattern === 'neurodivergent' && hasTaskSwitching === 'neurodivergent') {
          return {
            classification: 'Neurodivergent',
            description: 'You work in waves of high energy and focus, and benefit from movement, variety, and flexible task switching to maintain engagement.'
          };
        } else if (hasFocusPattern === 'neurodivergent' && hasProcessingSpeed === 'neurodivergent') {
          return {
            classification: 'Neurodivergent',
            description: 'Your focus and processing work best with stimulation, movement, or variety. You may need breaks and different approaches to stay engaged effectively.'
          };
        } else if (hasStressResponse === 'neurodivergent' || hasRecoveryPattern === 'neurodivergent') {
          return {
            classification: 'Neurodivergent',
            description: 'You work in waves and may need stimulation, movement, or variety to stay engaged. Managing stress and recovery patterns is important for sustained performance.'
          };
        }
        return {
          classification: 'Neurodivergent',
          description: 'You work in waves and may need stimulation, movement or variety to stay engaged.'
        };
      } else if (primaryProfile === 'Neurotypical') {
        // Analyze neurotypical patterns
        if (ntDimensions >= 5) {
          return {
            classification: 'Neurotypical',
            description: 'You work in a consistent, natural rhythm with steady focus and predictable energy patterns across most tasks.'
          };
        } else if (hasFocusPattern === 'neurotypical' && hasEnergyPattern === 'neurotypical') {
          return {
            classification: 'Neurotypical',
            description: 'You maintain steady focus and energy patterns, working in a natural rhythm that supports consistent performance.'
          };
        }
        return {
          classification: 'Neurotypical',
          description: 'You work normally in a natural rhythm'
        };
      }
    }
    
    // If we have calculated primaryProfile but no dimension data, use basic classification
    if (primaryProfile) {
      const basicMap: Record<string, { classification: string; description: string }> = {
        'Twice-Exceptional': {
          classification: 'Twice exceptional (2E)',
          description: 'You work exceptionally good in some task but may struggle with others'
        },
        'Neurodivergent': {
          classification: 'Neurodivergent',
          description: 'You work in waves and may need stimulation, movement or variety to stay engaged.'
        },
        'Neurotypical': {
          classification: 'Neurotypical',
          description: 'You work normally in a natural rhythm'
        }
      };
      
      if (basicMap[primaryProfile]) {
        return basicMap[primaryProfile];
      }
    }
    
    // Fallback: Check legacy data structure
    const typedNeuro = neurodiversityData as any;
    const hasTraits = typedNeuro?.adhd_traits || typedNeuro?.dyslexia_traits || typedNeuro?.autism_traits || 
                      typedNeuro?.sensory_sensitivity || 
                      (Array.isArray(typedNeuro?.indicators) && typedNeuro.indicators.length > 0);
    
    // Check for 2E (Twice Exceptional) - has both strengths and challenges
    const hasMultipleTraits = (typedNeuro?.adhd_traits ? 1 : 0) + 
                              (typedNeuro?.dyslexia_traits ? 1 : 0) + 
                              (typedNeuro?.autism_traits ? 1 : 0) >= 2;
    
    if (hasMultipleTraits) {
      return {
        classification: 'Twice exceptional (2E)',
        description: 'You work exceptionally good in some task but may struggle with others'
      };
    } else if (hasTraits) {
      return {
        classification: 'Neurodivergent',
        description: 'You work in waves and may need stimulation, movement or variety to stay engaged.'
      };
    } else {
      return {
        classification: 'Neurotypical',
        description: 'You work normally in a natural rhythm'
      };
    }
  };

  // PDF content ref
  const pdfContentRef = useRef<HTMLDivElement>(null);

  // Extract variables from results (with defaults for when results is null)
  const {
    core_type = 'architect',
    core_type_mastery = 0,
    subtype = 'Unknown',
    mirror_awareness_score = 0,
    learning_style = {},
    neurodiversity = {},
    mindset = {},
    personality = {},
  } = results || {};
  
  // Extract layer results from scoring (if available)
  const layer2Result = (results as any)?.layer2;
  const layer3Result = (results as any)?.layer3;
  const layer4Result = (results as any)?.layer4;
  const layer5Result = (results as any)?.layer5;
  const layer6Result = (results as any)?.layer6;
  const layer7Result = (results as any)?.layer7;

  // Determine which template to use
  const isAlchemist = core_type === 'alchemist';
  const isArchitect = core_type === 'architect';
  const isMixed = core_type === 'blurred';

  // PDF Download Handler - Use browser's native print for perfect colors
  const handleDownloadPDF = () => {
    if (!results) {
      alert('No results available to download');
      return;
    }
    
    console.log('📥 Opening print dialog for PDF export...');
    console.log('💡 In the print dialog: Select "Save as PDF" as the destination');
    
    // Set document title for better filename suggestion
    const originalTitle = document.title;
    const coreTypeName = core_type === 'alchemist' ? 'Alchemist' : 
                        core_type === 'architect' ? 'Architect' : 'Mixed';
    document.title = `EDNA-Results-${coreTypeName}-${new Date().toISOString().split('T')[0]}`;
    
    // Scroll to top for better PDF capture
    const originalScrollY = window.scrollY;
    window.scrollTo(0, 0);
    
    // Small delay to ensure scroll completes
    setTimeout(() => {
      // Trigger browser's print dialog
      // The print.css stylesheet will hide UI elements and ensure perfect colors
      window.print();
      
      // Restore after print dialog closes
      setTimeout(() => {
        document.title = originalTitle;
        window.scrollTo(0, originalScrollY);
      }, 100);
    }, 100);
    
    console.log('✅ Print dialog opened - Use "Save as PDF" for perfect color matching!');
  };

  // Debug logging
  console.log('🔍 CompleteResultsPage Debug:', {
    core_type,
    isAlchemist,
    isArchitect,
    isMixed,
    resultsKeys: results ? Object.keys(results) : []
  });

  // Get display values
  const coreTypeDisplay = isAlchemist ? 'The Alchemist' : isArchitect ? 'The Architect' : 'Mixed';
  const subtypeDisplay = Array.isArray(subtype) ? subtype[0] : subtype;

  // Color schemes
  const gradientClass = isMixed 
    ? 'from-purple-900 via-orange-500 to-purple-900'
    : 'from-purple-900 to-orange-500';

  // Helper function to extract mindset values - uses calculated results from Layer 6
  const getMindsetValues = (mindsetData: any, layer6Result?: any) => {
    // First, try to get mindset from layer6Result (from scoring logic)
    if (layer6Result?.mindset) {
      return {
        growthFixed: layer6Result.mindset.growthFixed || '',
        abundanceScarcity: layer6Result.mindset.abundanceScarcity || '',
        challengeComfort: layer6Result.mindset.challengeComfort || ''
      };
    }
    
    // Fallback: Check legacy data structure
    const typedMindset = mindsetData as any;
    // Check if it's the new structure with mindset_personality
    if (typedMindset?.mindset_personality) {
      const m = typedMindset.mindset_personality.mindset;
      return {
        growthFixed: m?.growthFixed || '',
        abundanceScarcity: m?.abundanceScarcity || '',
        challengeComfort: m?.challengeComfort || ''
      };
    }
    // Check if it's an object with traits array
    if (Array.isArray(typedMindset?.traits)) {
      const traits = typedMindset.traits;
      return {
        growthFixed: traits.find((t: string) => t.includes('Growth') || t.includes('Fixed'))?.replace(' Mindset', '') || '',
        abundanceScarcity: traits.find((t: string) => t.includes('Abundance') || t.includes('Scarcity'))?.replace(' Mindset', '') || '',
        challengeComfort: traits.find((t: string) => t.includes('Challenge') || t.includes('Comfort'))?.replace(' Mindset', '') || ''
      };
    }
    // Return empty values if no data found (should not happen with proper scoring)
    return {
      growthFixed: '',
      abundanceScarcity: '',
      challengeComfort: ''
    };
  };

  // Helper function to determine Mixed type classification
  const getMixedTypeClassification = (resultsData: any) => {
    const typedResults = resultsData as any;
    
    // First, check if we have Layer 2 subtype (most accurate)
    if (layer2Result?.subtype) {
      const subtype = layer2Result.subtype;
      
      if (subtype === 'Architect-like') {
        return {
          classification: 'Architect-like',
          description: 'You are more dominant on your logical side'
        };
      } else if (subtype === 'Alchemist-like') {
        return {
          classification: 'Alchemist-like',
          description: 'You are more aligned with your emotional side'
        };
      }
      // Note: "Blended" type has been removed - only Architect-like or Alchemist-like exist
    }
    
    // Fallback: Check if we have normalized scores from layer1
    const normalizedScores = typedResults?.normalized_scores || 
                             (typedResults as any)?.raw_scores?.normalized_scores;
    
    if (normalizedScores) {
      const architectScore = normalizedScores.architect || 0;
      const alchemistScore = normalizedScores.alchemist || 0;
      
      // Determine based on which score is higher
      if (architectScore > alchemistScore) {
        return {
          classification: 'Architect-like',
          description: 'You are more dominant on your logical side'
        };
      } else {
        return {
          classification: 'Alchemist-like',
          description: 'You are more aligned with your emotional side'
        };
      }
    }
    
    // Final fallback - default to Architect-like
    return {
      classification: 'Architect-like',
      description: 'You are more dominant on your logical side'
    };
  };

  // Helper function to get execution strength
  const getExecutionStrength = (resultsData: any): string => {
    const typedResults = resultsData as any;
    // Check for execution_strength field
    if (typedResults?.execution_strength) {
      return typedResults.execution_strength;
    }
    // Check core_type_mastery to infer strength
    const mastery = typedResults?.core_type_mastery || 0;
    if (mastery >= 70) return 'Strong';
    if (mastery >= 50) return 'Moderate';
    if (mastery >= 30) return 'Light';
    return 'Diffuse';
  };

  // Helper function to get dominant subtype(s) for Mixed type
  const getDominantSubtypes = (subtypeData: string | string[]): string => {
    if (!subtypeData) return '';
    
    const subtypes = Array.isArray(subtypeData) ? subtypeData : [subtypeData];
    
    // If single subtype, return it
    if (subtypes.length === 1) {
      return subtypes[0];
    }
    
    // If multiple subtypes, join them with " + "
    // Filter out empty strings
    const validSubtypes = subtypes.filter(s => s && s.trim());
    
    if (validSubtypes.length === 0) return '';
    if (validSubtypes.length === 1) return validSubtypes[0];
    
    // Return joined subtypes
    return validSubtypes.join(' + ');
  };

  // Helper function to extract meta-beliefs values - uses calculated results from Layer 7
  const getMetaBeliefsValues = (metaBeliefsData: any, layer7Result?: any) => {
    // First, try to get beliefs from layer7Result (from scoring logic)
    let calculatedBeliefs: Record<string, string> | null = null;
    
    if (layer7Result?.beliefs) {
      calculatedBeliefs = layer7Result.beliefs;
    } else if (layer7Result?.layer7?.beliefs) {
      calculatedBeliefs = layer7Result.layer7.beliefs;
    }
    
    // If we have calculated beliefs, use them directly and clean up labels
    if (calculatedBeliefs) {
      const cleanLabel = (value: string) => {
        // Remove "View" suffix from Fairness View values
        if (value.endsWith(' View')) {
          return value.replace(' View', '');
        }
        // Remove "Impact" suffix from Impact Motivation values
        if (value.endsWith(' Impact')) {
          return value.replace(' Impact', '');
        }
        return value;
      };
      
      return {
        faithOrientation: cleanLabel(calculatedBeliefs['Grounding Source'] || calculatedBeliefs['GroundingSource'] || ''),
        controlOrientation: cleanLabel(calculatedBeliefs['Control Belief'] || calculatedBeliefs['ControlBelief'] || ''),
        fairnessView: cleanLabel(calculatedBeliefs['Fairness View'] || calculatedBeliefs['FairnessView'] || ''),
        integrityStyle: cleanLabel(calculatedBeliefs['Honesty Style'] || calculatedBeliefs['HonestyStyle'] || ''),
        growthPreference: cleanLabel(calculatedBeliefs['Growth Approach'] || calculatedBeliefs['GrowthApproach'] || ''),
        impactPreference: cleanLabel(calculatedBeliefs['Impact Motivation'] || calculatedBeliefs['ImpactMotivation'] || '')
      };
    }
    
    // Fallback: Check legacy data structure
    const typedMeta = metaBeliefsData as any;
    // Check if it has a beliefs object (from layer7 calculation)
    if (typedMeta?.beliefs) {
      return {
        faithOrientation: typedMeta.beliefs['Grounding Source'] || '',
        controlOrientation: typedMeta.beliefs['Control Belief'] || '',
        fairnessView: typedMeta.beliefs['Fairness View'] || '',
        integrityStyle: typedMeta.beliefs['Honesty Style'] || '',
        growthPreference: typedMeta.beliefs['Growth Approach'] || '',
        impactPreference: typedMeta.beliefs['Impact Motivation'] || ''
      };
    }
    // Check if it has composite_values
    if (typedMeta?.composite_values) {
      return {
        faithOrientation: typedMeta.composite_values.faithOrientation || typedMeta.composite_values['FaithOrientation'] || '',
        controlOrientation: typedMeta.composite_values.controlOrientation || typedMeta.composite_values['ControlOrientation'] || '',
        fairnessView: typedMeta.composite_values.fairnessView || typedMeta.composite_values['FairnessView'] || '',
        integrityStyle: typedMeta.composite_values.integrityStyle || typedMeta.composite_values['IntegrityStyle'] || '',
        growthPreference: typedMeta.composite_values.growthPreference || typedMeta.composite_values['GrowthPreference'] || '',
        impactPreference: typedMeta.composite_values.impactPreference || typedMeta.composite_values['ImpactPreference'] || ''
      };
    }
    // Return empty values if no data found (should not happen with proper scoring)
    return {
      faithOrientation: '',
      controlOrientation: '',
      fairnessView: '',
      integrityStyle: '',
      growthPreference: '',
      impactPreference: ''
    };
  };

  // Helper function to extract personality values - uses calculated results from Layer 6
  const getPersonalityValues = (personalityData: any, mindsetPersonalityData?: any, layer6Result?: any) => {
    // First, try to get personality from layer6Result (from scoring logic)
    if (layer6Result?.personality) {
      return {
        coreType: layer6Result.personality.coreType || '',
        communicationStyle: layer6Result.personality.communicationStyle || ''
      };
    }
    
    // Fallback: Check legacy data structure
    const typedPersonality = personalityData as any;
    const typedMindsetPersonality = mindsetPersonalityData as any;
    
    // Check if it's the new structure with mindset_personality
    if (typedMindsetPersonality?.mindset_personality?.personality) {
      const p = typedMindsetPersonality.mindset_personality.personality;
      return {
        coreType: p?.coreType || '',
        communicationStyle: p?.communicationStyle || ''
      };
    }
    // Check if it's an object with traits array
    if (Array.isArray(typedPersonality?.traits)) {
      const traits = typedPersonality.traits;
      const coreType = traits.find((t: string) => 
        t.includes('Confident & Steady') || 
        t.includes('Confident & Driven') || 
        t.includes('Considerate & Steady') || 
        t.includes('Fast-Moving & Adaptive')
      ) || '';
      const communicationStyle = traits.find((t: string) => 
        t.includes('Direct') || t.includes('Diplomatic')
      ) || '';
      return { coreType, communicationStyle };
    }
    // Return empty values if no data found (should not happen with proper scoring)
    return {
      coreType: '',
      communicationStyle: ''
    };
  };

  // Variables already extracted above, skip duplicate

  // Alchemist-specific colorful Figma design - Matching Mixed layout
  if (isAlchemist) {
    const typedLearningStyle = learning_style as any;
    // Use calculated values from Layer 4 scoring if available, otherwise fall back to legacy data structure
    const modalityValue = layer4Result?.dominantModality 
      ? layer4Result.dominantModality
      : (Array.isArray(typedLearningStyle?.modality) 
        ? typedLearningStyle.modality[0] 
        : typedLearningStyle?.modality || typedLearningStyle?.dominant || typedLearningStyle?.dominant_modality || 'Visual');
    // Map to display format (capitalize first letter, handle Read/Write)
    const dominantModality = modalityValue === 'readWrite' || modalityValue === 'Read/Write' ? 'Read/Write' 
      : modalityValue === 'read_write' ? 'Read/Write'
      : modalityValue.charAt(0).toUpperCase() + modalityValue.slice(1).toLowerCase();
    const approach = layer4Result?.approach || typedLearningStyle?.approach || '';
    const conceptProcessing = layer4Result?.conceptProcessing || typedLearningStyle?.concept_processing || typedLearningStyle?.conceptProcessing || '';
    const workingEnvironment = layer4Result?.workingEnvironment || typedLearningStyle?.working_environment || typedLearningStyle?.workingEnvironment || '';
    const pace = layer4Result?.pace || typedLearningStyle?.pace || '';
    const mirrorLevel = mirror_awareness_score >= 66 ? 'HIGH' : mirror_awareness_score >= 33 ? 'MEDIUM' : 'LOW';
    const subtypeDisplay = Array.isArray(subtype) ? subtype[0] : subtype;

  // Render sidebar and content wrapper (conditionally based on isStandalone)
  return (
      <div 
        className="bg-gray-50" 
        style={{ 
          fontFamily: 'Inter, sans-serif',
          paddingTop: isStandalone ? '0' : '70px',
          minHeight: '100vh'
        }}
      >
        {/* COLLAPSIBLE SIDEBAR - Only show if not standalone */}
        {!isStandalone && <Sidebar />}

        {/* MAIN CONTENT AREA */}
        <div 
          className="flex flex-col bg-gray-50"
          style={{ 
            marginLeft: isStandalone ? '0' : (isMobile ? '0' : '260px'),
            padding: isStandalone ? '0' : (activeView === 'profile' ? '20px 16px' : '0'),
            minHeight: `calc(100vh - 70px)`,
            overflow: 'visible'
          }}
        >
          {/* Render content based on activeView */}
          {isStandalone || activeView === 'profile' ? (
            // Standalone mode or profile view - show results page content directly
            <div style={{ height: 'auto', overflowY: 'visible' }}> {/* Removed inner scroll - outer container handles it */}
              {/* HEADER SECTION - Show only in standalone mode */}
              {isStandalone && (
                <header className="bg-white border-b" style={{ borderColor: '#C72170' }}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={brandscalingLogo} alt="Brandscaling" className="h-12 w-auto" />
                      <span className="font-semibold text-sm text-black">Entrepreneurial DNA</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button 
                        onClick={(e) => {
                          const isMobile = window.matchMedia('(max-width: 767px)').matches;
                          if (isMobile) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          onViewChange?.('dashboard');
                        }}
                        className="text-sm font-semibold flex items-center gap-2 text-black hover:text-gray-700 transition-colors px-3 py-2 md:cursor-pointer cursor-not-allowed opacity-50 md:opacity-100 pointer-events-none md:pointer-events-auto"
                      >
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Dashboard</span>
                      </button>
                      <button 
                        onClick={handleDownloadPDF}
                        data-pdf-download
                        className="text-white px-4 py-2 text-sm font-semibold transition-all cursor-pointer"
                        style={{ 
                          borderRadius: '5%', 
                          display: 'inline-block',
                          backgroundColor: '#50c55d',
                          border: 'none',
                          lineHeight: '1.4',
                          minHeight: '32px',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#45b04f';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#50c55d';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Download 
                      </button>
                    </div>
                  </div>
                </header>
              )}

              {/* MAIN CONTENT */}
              <div ref={pdfContentRef} data-pdf-content className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* TITLE SECTION */}
          <div className="text-center mb-6">
            <h1 
              className="text-2xl sm:text-3xl md:text-[32px] font-semibold mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              The Alchemist
            </h1>
            <p 
              className="text-[9px] sm:text-[10px] font-semibold mx-auto max-w-md px-2"
              style={{
                color: '#f6782f'
              }}
            >
              You lead with intuition, alignment and emotional intelligence. You translate meaning into motion.
            </p>
          </div>

          {/* PROGRESS BARS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '48px' }}>
            {/* Decision Mastery */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span 
                  className="text-[9px] sm:text-[10px] font-semibold"
                  style={{
                    color: '#f6782f'
                  }}
                >
                  Decision Mastery
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-gray-800">Core Level</span>
                  <div 
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor: '#f6782f'
                    }}
                  ></div>
                  <span 
                    className="text-[9px] sm:text-[10px] font-semibold"
                    style={{
                      color: '#000000'
                    }}
                  >
                    {core_type_mastery}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${core_type_mastery}%`,
                    background: 'linear-gradient(to right, #42047d, #f6782f)'
                  }}
                ></div>
              </div>
            </div>

            {/* Mirror Pair Awareness */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span 
                  className="text-[9px] sm:text-[10px] font-semibold"
                  style={{
                    color: '#f6782f'
                  }}
                >
                  Mirror Pair Awareness
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-gray-800">Integration</span>
                  <div 
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor: '#f6782f'
                    }}
                  ></div>
                  <span 
                    className="text-[9px] sm:text-[10px] font-semibold"
                    style={{
                      color: '#000000'
                    }}
                  >
                    {mirror_awareness_score}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${mirror_awareness_score}%`,
                    background: 'linear-gradient(to right, #42047d, #f6782f)'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* CORE IDENTITY SECTION - First Card */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#f6782f'
              }}
            >
              <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Core Identity</p>
            </div>
            <div className="p-6">
              <h3 className="text-[13px] font-bold mb-4 text-center text-black">
                Alchemist
              </h3>
              
              <div className="mb-4">
                <p className="text-[12px] font-semibold text-black mb-2">Default Decision Loop</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 mb-2">
                  <div 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center min-w-[80px] sm:min-w-[100px]"
                    style={{
                      background: 'linear-gradient(to right, #42047d, #f6782f)',
                      height: 'auto',
                      minHeight: '24px',
                      borderRadius: '5%'
                    }}
                  >
                    <p className="text-[9px] sm:text-[10px] font-semibold text-white">Emotion</p>
                  </div>
                  <span className="text-black rotate-90 sm:rotate-0">→</span>
                  <div 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center min-w-[80px] sm:min-w-[100px]"
                    style={{
                      background: 'linear-gradient(to right, #42047d, #f6782f)',
                      height: 'auto',
                      minHeight: '24px',
                      borderRadius: '5%'
                    }}
                  >
                    <p className="text-[9px] sm:text-[10px] font-semibold text-white">Logic</p>
                  </div>
                  <span className="text-black rotate-90 sm:rotate-0">→</span>
                  <div 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center relative min-w-[80px] sm:min-w-[100px]"
                    style={{
                      background: 'linear-gradient(to right, #42047d, #f6782f)',
                      height: 'auto',
                      minHeight: '24px',
                      borderRadius: '5%'
                    }}
                  >
                    <p className="text-[9px] sm:text-[10px] font-semibold text-white">Emotion</p>
                    <p className="text-black absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[13px]" style={{ top: '100%', marginTop: '4px' }}>End-validator</p>
                  </div>
                </div>
                <p className="text-[9px] sm:text-[10px] font-medium text-black text-center mt-6 sm:mt-0" style={{ marginTop: '24.5px' }}>Emotion overrides and validates your decisions.</p>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-black mb-2">Decision Process</p>
                <p className="text-[10px] font-medium text-black">
                  You intuitively begin with a feeling, test the most ideas through logics and then feeling revalidates and aligns your decision
                </p>
              </div>
            </div>
          </div>
          
          {/* SUBTYPE IDENTITY AND MIRROR PAIR AWARENESS - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column - Subtype Identity */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
              <div 
                className="h-[26px] flex items-center justify-center"
                style={{
                  backgroundColor: '#f6782f'
                }}
              >
                <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Subtype Identity</p>
              </div>
              <div className="p-4">
                {(() => {
                  const subtypeName = subtypeDisplay || 'Visionary Oracle';
                  const subtypeInfo = getSubtypeInfo(subtypeName);
                  
                  // Debug logging
                  console.log('Subtype Identity Debug:', {
                    subtypeName,
                    subtypeDisplay,
                    subtypeInfo,
                    hasDescription: !!subtypeInfo.description,
                    hasStrength: !!subtypeInfo.strength,
                    hasBlindSpot: !!subtypeInfo.blindSpot
                  });
                  
                  return (
                    <>
                      <h4 
                        className="text-[12px] font-bold mb-2 text-center"
                        style={{
                          color: '#f6782f'
                        }}
                      >
                        {subtypeInfo.fullName}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] font-normal text-black mb-3 text-center">{subtypeInfo.description}</p>
                      
                      <div className="mb-3">
                        <p 
                          className="text-[12px] font-bold mb-1 text-center"
                          style={{
                            color: '#f6782f'
                          }}
                        >
                          Strength
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-normal text-black text-center">{subtypeInfo.strength}</p>
                      </div>
                      
                      <div>
                        <p 
                          className="text-[12px] font-bold mb-1 text-center"
                          style={{
                            color: '#f6782f'
                          }}
                        >
                          Blind Spot
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-normal text-black text-center">{subtypeInfo.blindSpot}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            
            {/* Right Column - Mirror Pair Awareness */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
              <div 
                className="h-[26px] flex items-center justify-center"
                style={{
                  backgroundColor: '#f6782f'
                }}
              >
                <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Mirror Pair Awareness</p>
              </div>
              <div className="p-6 flex flex-col items-center justify-center h-full min-h-[150px]">
                <p 
                  className="text-[16px] font-bold mb-3"
                  style={{
                    color: '#f6782f'
                  }}
                >
                  {mirrorLevel}
                </p>
                <p className="text-[10px] font-normal text-black text-center">
                  {getMirrorAwarenessDescription(mirror_awareness_score, layer3Result)}
                </p>
              </div>
            </div>
          </div>

          {/* LEARNING STYLE PREFERENCES SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#f6782f'
              }}
            >
              <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Learning Style Preferences</p>
            </div>
            <div className="p-3 sm:p-4">
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
              >
                {/* Modality Preference */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Modality Preference</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {dominantModality}
                  </p>
                </div>

                {/* Approach */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Approach</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {approach}
                  </p>
                </div>

                {/* Concept Processing */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Concept Processing</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {conceptProcessing}
                  </p>
                </div>

                {/* Working Environment */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Working Environment</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {workingEnvironment}
                  </p>
                </div>

                {/* Pace */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Pace</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {pace}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* NEURODIVERSITY SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
            <div 
              className="h-[26px] flex items-center justify-center"
              style={{
                backgroundColor: '#f6782f'
              }}
            >
              <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Neurodiversity</p>
            </div>
            <div className="p-4">
              {(() => {
                const neuroInfo = getNeurodiversityInfo(neurodiversity, layer5Result);
                return (
                  <>
                    <p 
                      className="text-[12px] font-bold mb-2 text-center"
                      style={{
                        color: '#f6782f'
                      }}
                    >
                      {neuroInfo.classification}
                    </p>
                    <p className="text-[8px] font-normal text-black mb-2 text-center">
                      {neuroInfo.description}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        
          
          {/* MINDSET AND PERSONALITY SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#f6782f'
              }}
            >
              <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Mindset and Personality</p>
            </div>
            <div className="p-3 sm:p-4">
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
              >
                {/* Mindset */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Mindset</p>
                  {(() => {
                    const mindsetVals = getMindsetValues(mindset, layer6Result);
                    return (
                      <div className="flex flex-col gap-1">
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            color: '#f6782f'
                          }}
                        >
                          {mindsetVals.growthFixed} Mindset
                        </p>
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            color: '#f6782f'
                          }}
                        >
                          {mindsetVals.abundanceScarcity} Mindset
                        </p>
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            color: '#f6782f'
                          }}
                        >
                          {mindsetVals.challengeComfort} Mindset
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Personality */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Personality</p>
                  {(() => {
                    const personalityVals = getPersonalityValues(personality, results, layer6Result);
                    return (
                      <p 
                        className="text-[8px] font-bold text-center"
                        style={{
                          color: '#f6782f'
                        }}
                      >
                        {personalityVals.coreType}
                      </p>
                    );
                  })()}
                </div>

                {/* Communication */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Communication</p>
                  {(() => {
                    const personalityVals = getPersonalityValues(personality, results, layer6Result);
                    return (
                      <p 
                        className="text-[8px] font-bold text-center"
                        style={{
                          color: '#f6782f'
                        }}
                      >
                        {personalityVals.communicationStyle}
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          {/* META-BELIEFS AND VALUES SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#f6782f'
              }}
            >
              <p className="text-[14px] font-bold" style={{ color: '#000000' }}>Meta-Beliefs and Values</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4">
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Faith Orientation</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.faithOrientation;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Control Orientation</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.controlOrientation;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Fairness View</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.fairnessView;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Integrity Style</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.integrityStyle;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Growth Preference</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.growthPreference;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Impact Preference</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#f6782f'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.impactPreference;
                    })()}
                  </p>
                </div>
              </div>
              <p className="text-[7px] font-normal text-black text-center italic">
                This is just an awareness of your beliefs and not judgment
              </p>
            </div>
          </div>
          
          {/* FOOTER SECTION */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t" style={{ borderColor: '#C72170' }}>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My E-DNA Results',
                    text: `I'm The Alchemist! Check out my Entrepreneurial DNA results.`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="bg-[#ec4049] text-white px-6 py-2 rounded-[5px] text-[11px] font-semibold hover:bg-[#d6353e] transition-colors"
            >
              Share results
            </button>
          </div>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    );
  }

  // Architect-specific colorful Figma design - Matching Mixed layout
  if (isArchitect) {
    const typedLearningStyle = learning_style as any;
    // Use calculated values from Layer 4 scoring if available, otherwise fall back to legacy data structure
    const modalityValue = layer4Result?.dominantModality 
      ? layer4Result.dominantModality
      : (Array.isArray(typedLearningStyle?.modality) 
        ? typedLearningStyle.modality[0] 
        : typedLearningStyle?.modality || typedLearningStyle?.dominant || typedLearningStyle?.dominant_modality || 'Visual');
    // Map to display format (capitalize first letter, handle Read/Write)
    const dominantModality = modalityValue === 'readWrite' || modalityValue === 'Read/Write' ? 'Read/Write' 
      : modalityValue === 'read_write' ? 'Read/Write'
      : modalityValue.charAt(0).toUpperCase() + modalityValue.slice(1).toLowerCase();
    const approach = layer4Result?.approach || typedLearningStyle?.approach || '';
    const conceptProcessing = layer4Result?.conceptProcessing || typedLearningStyle?.concept_processing || typedLearningStyle?.conceptProcessing || '';
    const workingEnvironment = layer4Result?.workingEnvironment || typedLearningStyle?.working_environment || typedLearningStyle?.workingEnvironment || '';
    const pace = layer4Result?.pace || typedLearningStyle?.pace || '';
    const mirrorLevel = mirror_awareness_score >= 66 ? 'HIGH' : mirror_awareness_score >= 33 ? 'MEDIUM' : 'LOW';
    const subtypeDisplay = Array.isArray(subtype) ? subtype[0] : subtype;
    
    // Render sidebar and content wrapper (conditionally based on isStandalone)
    return (
      <div 
        className="bg-gray-50" 
        style={{ 
          fontFamily: 'Inter, sans-serif',
          paddingTop: isStandalone ? '0' : '70px',
          minHeight: '100vh'
        }}
      >
        {/* COLLAPSIBLE SIDEBAR - Only show if not standalone */}
        {!isStandalone && <Sidebar />}

        {/* MAIN CONTENT AREA */}
        <div 
          className="flex flex-col bg-gray-50"
          style={{ 
            marginLeft: isStandalone ? '0' : (isMobile ? '0' : '260px'),
            padding: isStandalone ? '0' : (activeView === 'profile' ? '20px 16px' : '0'),
            minHeight: `calc(100vh - 70px)`,
            overflow: 'visible'
          }}
        >
          {/* Render content based on activeView */}
          {isStandalone || activeView === 'profile' ? (
            // Standalone mode or profile view - show results page content directly
            <div style={{ height: 'auto', overflowY: 'visible' }}> {/* Removed inner scroll - outer container handles it */}
              {/* HEADER SECTION - Show only in standalone mode */}
              {isStandalone && (
                <header className="bg-white border-b" style={{ borderColor: '#C72170' }}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={brandscalingLogo} alt="Brandscaling" className="h-12 w-auto" />
                      <span className="font-semibold text-sm text-black">Entrepreneurial DNA</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button 
                        onClick={(e) => {
                          const isMobile = window.matchMedia('(max-width: 767px)').matches;
                          if (isMobile) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          onViewChange?.('dashboard');
                        }}
                        className="text-sm font-semibold flex items-center gap-2 text-black hover:text-gray-700 transition-colors px-3 py-2 md:cursor-pointer cursor-not-allowed opacity-50 md:opacity-100 pointer-events-none md:pointer-events-auto"
                      >
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Dashboard</span>
                      </button>
                      <button 
                        onClick={handleDownloadPDF}
                        data-pdf-download
                        className="text-white px-4 py-2 text-sm font-semibold transition-all cursor-pointer"
                        style={{ 
                          borderRadius: '5%', 
                          display: 'inline-block',
                          backgroundColor: '#50c55d',
                          border: 'none',
                          lineHeight: '1.4',
                          minHeight: '32px',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#45b04f';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#50c55d';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Download 
                      </button>
                    </div>
                  </div>
                </header>
              )}

              {/* MAIN CONTENT */}
              <div ref={pdfContentRef} data-pdf-content className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* TITLE SECTION */}
          <div className="text-center mb-6">
            <h1 
              className="text-[32px] font-semibold mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              The Architect
            </h1>
            <p 
              className="text-[10px] font-semibold mx-auto max-w-md"
              style={{
                color: '#42047d'
              }}
            >
              You lead with logic, structure and rational intelligence. You translate meaning into motion.
            </p>
          </div>

          {/* PROGRESS BARS SECTION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ marginBottom: '48px' }}>
            {/* Decision Mastery */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span 
                  className="text-[10px] font-semibold"
                  style={{
                    color: '#42047d'
                  }}
                >
                  Decision Mastery
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-gray-800">Core Level</span>
                  <div 
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor: '#42047d'
                    }}
                  ></div>
                  <span 
                    className="text-[9px] sm:text-[10px] font-semibold"
                    style={{
                      color: '#000000'
                    }}
                  >
                    {core_type_mastery}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${core_type_mastery}%`,
                    background: 'linear-gradient(to right, #42047d, #f6782f)'
                  }}
                ></div>
              </div>
            </div>

            {/* Mirror Pair Awareness */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span 
                  className="text-[10px] font-semibold"
                  style={{
                    color: '#42047d'
                  }}
                >
                  Mirror Pair Awareness
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-semibold text-gray-800">Integration</span>
                  <div 
                    className="w-[5px] h-[5px] rounded-full"
                    style={{
                      backgroundColor: '#42047d'
                    }}
                  ></div>
                  <span 
                    className="text-[9px] sm:text-[10px] font-semibold"
                    style={{
                      color: '#000000'
                    }}
                  >
                    {mirror_awareness_score}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${mirror_awareness_score}%`,
                    background: 'linear-gradient(to right, #42047d, #f6782f)'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* CORE IDENTITY SECTION - First Card */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#42047d'
              }}
            >
              <p className="text-[14px] font-bold text-white">Core Identity</p>
            </div>
            <div className="p-6">
              <h3 className="text-[13px] font-bold mb-4 text-center text-black">
                Architect
              </h3>
              
              <div className="mb-4">
                <p className="text-[12px] font-semibold text-black mb-2">Default Decision Loop</p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2 mb-2">
                  <div 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center min-w-[80px] sm:min-w-[100px]"
                    style={{
                      background: 'linear-gradient(to right, #42047d, #f6782f)',
                      height: 'auto',
                      minHeight: '24px',
                      borderRadius: '5%'
                    }}
                  >
                    <p className="text-[9px] sm:text-[10px] font-semibold text-white">Logic</p>
                  </div>
                  <span className="text-black rotate-90 sm:rotate-0">→</span>
                  <div 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center min-w-[80px] sm:min-w-[100px]"
                    style={{
                      background: 'linear-gradient(to right, #42047d, #f6782f)',
                      height: 'auto',
                      minHeight: '24px',
                      borderRadius: '5%'
                    }}
                  >
                    <p className="text-[9px] sm:text-[10px] font-semibold text-white">Emotion</p>
                  </div>
                  <span className="text-black rotate-90 sm:rotate-0">→</span>
                  <div 
                    className="px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-center relative min-w-[80px] sm:min-w-[100px]"
                    style={{
                      background: 'linear-gradient(to right, #42047d, #f6782f)',
                      height: 'auto',
                      minHeight: '24px',
                      borderRadius: '5%'
                    }}
                  >
                    <p className="text-[9px] sm:text-[10px] font-semibold text-white">Logic</p>
                    <p className="text-black absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] sm:text-[13px]" style={{ top: '100%', marginTop: '4px' }}>End-validator</p>
                  </div>
                </div>
                <p className="text-[9px] sm:text-[10px] font-medium text-black text-center mt-6 sm:mt-0" style={{ marginTop: '24.5px' }}>Logic overrides and validates your decisions.</p>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-black mb-2">Decision Process</p>
                <p className="text-[10px] font-medium text-black">
                  You filter decisions through logic first. Emotion confirms meaning and logic revalidates before you commit
                </p>
              </div>
            </div>
          </div>
          
          {/* SUBTYPE IDENTITY AND MIRROR PAIR AWARENESS - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column - Subtype Identity */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
              <div 
                className="h-[26px] flex items-center justify-center"
                style={{
                  backgroundColor: '#42047d'
                }}
              >
                <p className="text-[14px] font-bold text-white">Subtype Identity</p>
              </div>
              <div className="p-4">
                {(() => {
                  const subtypeName = subtypeDisplay || 'Master Strategist';
                  const subtypeInfo = getSubtypeInfo(subtypeName);
                  return (
                    <>
                      <h4 
                        className="text-[12px] font-bold mb-2 text-center"
                        style={{
                          color: '#42047d'
                        }}
                      >
                        {subtypeName}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] font-normal text-black mb-3 text-center">{subtypeInfo.description}</p>
                      
                      <div className="mb-3">
                        <p 
                          className="text-[12px] font-bold mb-1 text-center"
                          style={{
                            color: '#42047d'
                          }}
                        >
                          Strength
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-normal text-black text-center">{subtypeInfo.strength}</p>
                      </div>
                      
                      <div>
                        <p 
                          className="text-[12px] font-bold mb-1 text-center"
                          style={{
                            color: '#42047d'
                          }}
                        >
                          Blind Spot
                        </p>
                        <p className="text-[9px] sm:text-[10px] font-normal text-black text-center">{subtypeInfo.blindSpot}</p>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
            
            {/* Right Column - Mirror Pair Awareness */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
              <div 
                className="h-[26px] flex items-center justify-center"
                style={{
                  backgroundColor: '#42047d'
                }}
              >
                <p className="text-[14px] font-bold text-white">Mirror Pair Awareness</p>
              </div>
              <div className="p-6 flex flex-col items-center justify-center h-full min-h-[150px]">
                <p 
                  className="text-[16px] font-bold mb-3"
                  style={{
                    color: '#42047d'
                  }}
                >
                  {mirrorLevel}
                </p>
                <p className="text-[10px] font-normal text-black text-center">
                  {getMirrorAwarenessDescription(mirror_awareness_score, layer3Result)}
                </p>
              </div>
            </div>
          </div>

          {/* LEARNING STYLE PREFERENCES SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#42047d'
              }}
            >
              <p className="text-[14px] font-bold text-white">Learning Style Preferences</p>
            </div>
            <div className="p-3 sm:p-4">
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
              >
                {/* Modality Preference */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Modality Preference</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {dominantModality}
                  </p>
                </div>

                {/* Approach */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Approach</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {approach}
                  </p>
                </div>

                {/* Concept Processing */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Concept Processing</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {conceptProcessing}
                  </p>
                </div>

                {/* Working Environment */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Working Environment</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {workingEnvironment}
                  </p>
                </div>

                {/* Pace */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Pace</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {pace}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* NEURODIVERSITY SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
            <div 
              className="h-[26px] flex items-center justify-center"
              style={{
                backgroundColor: '#42047d'
              }}
            >
              <p className="text-[14px] font-bold text-white">Neurodiversity</p>
            </div>
            <div className="p-4">
              {(() => {
                const neuroInfo = getNeurodiversityInfo(neurodiversity, layer5Result);
                return (
                  <>
                    <p 
                      className="text-[12px] font-bold mb-2 text-center"
                      style={{
                        color: '#42047d'
                      }}
                    >
                      {neuroInfo.classification}
                    </p>
                    <p className="text-[8px] font-normal text-black mb-2 text-center">
                      {neuroInfo.description}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        
          
          {/* MINDSET AND PERSONALITY SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#42047d'
              }}
            >
              <p className="text-[14px] font-bold text-white">Mindset and Personality</p>
            </div>
            <div className="p-3 sm:p-4">
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
              >
                {/* Mindset */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Mindset</p>
                  {(() => {
                    const mindsetVals = getMindsetValues(mindset, layer6Result);
                    return (
                      <div className="flex flex-col gap-1">
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            color: '#42047d'
                          }}
                        >
                          {mindsetVals.growthFixed} Mindset
                        </p>
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            color: '#42047d'
                          }}
                        >
                          {mindsetVals.abundanceScarcity} Mindset
                        </p>
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            color: '#42047d'
                          }}
                        >
                          {mindsetVals.challengeComfort} Mindset
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Personality */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Personality</p>
                  {(() => {
                    const personalityVals = getPersonalityValues(personality, results, layer6Result);
                    return (
                      <p 
                        className="text-[8px] font-bold text-center"
                        style={{
                          color: '#42047d'
                        }}
                      >
                        {personalityVals.coreType}
                      </p>
                    );
                  })()}
                </div>

                {/* Communication */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Communication</p>
                  {(() => {
                    const personalityVals = getPersonalityValues(personality, results, layer6Result);
                    return (
                      <p 
                        className="text-[8px] font-bold text-center"
                        style={{
                          color: '#42047d'
                        }}
                      >
                        {personalityVals.communicationStyle}
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          {/* META-BELIEFS AND VALUES SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                backgroundColor: '#42047d'
              }}
            >
              <p className="text-[14px] font-bold text-white">Meta-Beliefs and Values</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4">
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Faith Orientation</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.faithOrientation;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Control Orientation</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.controlOrientation;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Fairness View</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.fairnessView;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Integrity Style</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.integrityStyle;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Growth Preference</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.growthPreference;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Impact Preference</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      color: '#42047d'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.impactPreference;
                    })()}
                  </p>
                </div>
              </div>
              <p className="text-[7px] font-normal text-black text-center italic">
                This is just an awareness of your beliefs and not judgment
              </p>
            </div>
          </div>
          
          {/* FOOTER SECTION */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t" style={{ borderColor: '#C72170' }}>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My E-DNA Results',
                    text: `I'm The Architect! Check out my Entrepreneurial DNA results.`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="bg-[#ec4049] text-white px-6 py-2 rounded-[5px] text-[11px] font-semibold hover:bg-[#d6353e] transition-colors"
            >
              Share results
            </button>
          </div>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    );
  }

  // Mixed/Blurred-specific colorful Figma design - FIXED ALIGNMENT
  if (isMixed) {
    console.log('✅ Rendering Mixed/Blurred design with fixed alignment');
    const typedLearningStyle = learning_style as any;
    // Use calculated values from Layer 4 scoring if available, otherwise fall back to legacy data structure
    const modalityValue = layer4Result?.dominantModality 
      ? layer4Result.dominantModality
      : (Array.isArray(typedLearningStyle?.modality) 
        ? typedLearningStyle.modality[0] 
        : typedLearningStyle?.modality || typedLearningStyle?.dominant || typedLearningStyle?.dominant_modality || 'Visual');
    // Map to display format (capitalize first letter, handle Read/Write)
    const dominantModality = modalityValue === 'readWrite' || modalityValue === 'Read/Write' ? 'Read/Write' 
      : modalityValue === 'read_write' ? 'Read/Write'
      : modalityValue.charAt(0).toUpperCase() + modalityValue.slice(1).toLowerCase();
    const approach = layer4Result?.approach || typedLearningStyle?.approach || '';
    const conceptProcessing = layer4Result?.conceptProcessing || typedLearningStyle?.concept_processing || typedLearningStyle?.conceptProcessing || '';
    const workingEnvironment = layer4Result?.workingEnvironment || typedLearningStyle?.working_environment || typedLearningStyle?.workingEnvironment || '';
    const pace = layer4Result?.pace || typedLearningStyle?.pace || '';
    const mirrorLevel = mirror_awareness_score >= 66 ? 'HIGH' : mirror_awareness_score >= 33 ? 'MEDIUM' : 'LOW';
    const subtypeDisplay = Array.isArray(subtype) ? subtype[0] : subtype;
    
    // Render sidebar and content wrapper (conditionally based on isStandalone)
    return (
      <div 
        className="bg-gray-50" 
        style={{ 
          fontFamily: 'Inter, sans-serif',
          paddingTop: isStandalone ? '0' : '70px',
          minHeight: '100vh'
        }}
      >
        {/* COLLAPSIBLE SIDEBAR - Only show if not standalone */}
        {!isStandalone && <Sidebar />}

        {/* MAIN CONTENT AREA */}
        <div 
          className="flex flex-col bg-gray-50"
          style={{ 
            marginLeft: isStandalone ? '0' : (isMobile ? '0' : '260px'),
            padding: isStandalone ? '0' : (activeView === 'profile' ? '20px 16px' : '0'),
            minHeight: `calc(100vh - 70px)`,
            overflow: 'visible'
          }}
        >
          {/* Render content based on activeView */}
          {isStandalone || activeView === 'profile' ? (
            // Standalone mode or profile view - show results page content directly
            <div style={{ height: 'auto', overflowY: 'visible' }}> {/* Removed inner scroll - outer container handles it */}
              {/* HEADER SECTION - Show only in standalone mode */}
              {isStandalone && (
                <header className="bg-white border-b" style={{ borderColor: '#C72170' }}>
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={brandscalingLogo} alt="Brandscaling" className="h-12 w-auto" />
                      <span className="font-semibold text-sm text-black">Entrepreneurial DNA</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <button 
                        onClick={(e) => {
                          const isMobile = window.matchMedia('(max-width: 767px)').matches;
                          if (isMobile) {
                            e.preventDefault();
                            e.stopPropagation();
                            return;
                          }
                          onViewChange?.('dashboard');
                        }}
                        className="text-sm font-semibold flex items-center gap-2 text-black hover:text-gray-700 transition-colors px-3 py-2 md:cursor-pointer cursor-not-allowed opacity-50 md:opacity-100 pointer-events-none md:pointer-events-auto"
                      >
                        <Home className="w-4 h-4" />
                        <span className="hidden sm:inline">Dashboard</span>
                      </button>
                      <button 
                        onClick={handleDownloadPDF}
                        data-pdf-download
                        className="text-white px-4 py-2 text-sm font-semibold transition-all cursor-pointer"
                        style={{ 
                          borderRadius: '5%', 
                          display: 'inline-block',
                          backgroundColor: '#50c55d',
                          border: 'none',
                          lineHeight: '1.4',
                          minHeight: '32px',
                          whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#45b04f';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#50c55d';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        Download 
                      </button>
                    </div>
                  </div>
                </header>
              )}

              {/* MAIN CONTENT */}
              <div ref={pdfContentRef} data-pdf-content className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* TITLE SECTION */}
          <div className="text-center mb-6">
            <h1 
              className="text-[32px] font-semibold mb-2"
              style={{
                backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Mixed
            </h1>
            <p 
              className="text-[10px] font-semibold mx-auto max-w-md"
              style={{
                backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              You shift between logic and emotion without a consistent pattern, making decisions feel unpredictable at times.
            </p>
          </div>

          {/* CORE IDENTITY SECTION - First Card */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(to right, #42047d, #f6782f)'
              }}
            >
              <p className="text-[14px] font-bold text-white">Core Identity</p>
            </div>
            <div className="p-6">
              <h3 
                className="text-[13px] font-bold mb-4 text-center"
                style={{
                  backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Mixed
              </h3>
              
              <div className="mb-4">
                <p className="text-[12px] font-semibold text-black mb-2 text-center">Default Decision Loop</p>
                <p className="text-[11px] font-normal text-black text-center mb-2">No dominant loop</p>
              </div>

              <div>
                <p className="text-[12px] font-semibold text-black mb-2 text-center">Decision Process</p>
                <p className="text-[10px] font-medium text-black text-center">
                  You use strengths from both Architect and Alchemist subtypes. You switch between structured execution and emotional momentum
                </p>
              </div>
            </div>
          </div>
          
          {/* SUBTYPE IDENTITY AND MIRROR PAIR AWARENESS - Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Left Column - Subtype Identity */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
              <div 
                className="h-[26px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, #42047d, #f6782f)'
                }}
              >
                <p className="text-[14px] font-bold text-white">Subtype Identity</p>
              </div>
              <div className="p-4">
                {(() => {
                  const mixedClassification = getMixedTypeClassification(results);
                  const executionStrength = getExecutionStrength(results);
                  const dominantSubtypes = getDominantSubtypes(subtype);
                  
                  return (
                    <>
                      <h4 
                        className="text-[12px] font-bold mb-2 text-center"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {mixedClassification.classification}
                      </h4>
                      <p className="text-[10px] font-normal text-black mb-3 text-center">{mixedClassification.description}</p>
                      
                      <div className="mb-3">
                        <p 
                          className="text-[12px] font-bold mb-1 text-center"
                          style={{
                            backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          Execution Strength
                        </p>
                        <p className="text-[10px] font-normal text-black text-center">{executionStrength}</p>
                      </div>
                      
                      {dominantSubtypes && (
                        <div>
                          <p 
                            className="text-[12px] font-bold mb-1 text-center"
                            style={{
                              backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text'
                            }}
                          >
                            Dominant Subtype
                          </p>
                          <p className="text-[10px] font-normal text-black text-center">{dominantSubtypes}</p>
                        </div>
                      )}
                    </>
                  );
                })()}
              </div>
            </div>
            
            {/* Right Column - Mirror Pair Awareness */}
            <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] overflow-hidden">
              <div 
                className="h-[26px] flex items-center justify-center"
                style={{
                  background: 'linear-gradient(to right, #42047d, #f6782f)'
                }}
              >
                <p className="text-[14px] font-bold text-white">Mirror Pair Awareness</p>
              </div>
              <div className="p-6 flex flex-col items-center justify-center h-full min-h-[150px]">
                <p 
                  className="text-[16px] font-bold mb-3"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {mirrorLevel}
                </p>
                <p className="text-[10px] font-normal text-black text-center">
                  {getMirrorAwarenessDescription(mirror_awareness_score, layer3Result)}
                </p>
              </div>
            </div>
          </div>

          {/* LEARNING STYLE PREFERENCES SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(to right, #42047d, #f6782f)'
              }}
            >
              <p className="text-[14px] font-bold text-white">Learning Style Preferences</p>
            </div>
            <div className="p-3 sm:p-4">
              <div 
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4"
              >
                {/* Modality Preference */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Modality Preference</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {dominantModality}
                  </p>
                </div>

                {/* Approach */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Approach</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {approach}
                  </p>
                </div>

                {/* Concept Processing */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Concept Processing</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {conceptProcessing}
                  </p>
                </div>

                {/* Working Environment */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Working Environment</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {workingEnvironment}
                  </p>
                </div>

                {/* Pace */}
                <div 
                  className="bg-white border border-[#42047d] py-3 px-2 sm:px-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1 text-center">Pace</p>
                  <p 
                    className="text-[8px] font-semibold text-center"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {pace}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* NEURODIVERSITY SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6 overflow-hidden">
            <div 
              className="h-[26px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(to right, #42047d, #f6782f)'
              }}
            >
              <p className="text-[14px] font-bold text-white">Neurodiversity</p>
            </div>
            <div className="p-4">
              {(() => {
                const neuroInfo = getNeurodiversityInfo(neurodiversity, layer5Result);
                return (
                  <>
                    <p 
                      className="text-[12px] font-bold mb-2 text-center"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      {neuroInfo.classification}
                    </p>
                    <p className="text-[8px] font-normal text-black mb-2 text-center">
                      {neuroInfo.description}
                    </p>
                  </>
                );
              })()}
            </div>
          </div>
        
          
          {/* MINDSET AND PERSONALITY SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(to right, #42047d, #f6782f)'
              }}
            >
              <p className="text-[14px] font-bold text-white">Mindset and Personality</p>
            </div>
            <div className="p-3 sm:p-4">
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
              >
                {/* Mindset */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Mindset</p>
                  {(() => {
                    const mindsetVals = getMindsetValues(mindset, layer6Result);
                    return (
                      <div className="flex flex-col gap-1">
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {mindsetVals.growthFixed} Mindset
                        </p>
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {mindsetVals.abundanceScarcity} Mindset
                        </p>
                        <p 
                          className="text-[8px] font-bold text-center"
                          style={{
                            backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                          }}
                        >
                          {mindsetVals.challengeComfort} Mindset
                        </p>
                      </div>
                    );
                  })()}
                </div>

                {/* Personality */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Personality</p>
                  {(() => {
                    const personalityVals = getPersonalityValues(personality, results, layer6Result);
                    return (
                      <p 
                        className="text-[8px] font-bold text-center"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {personalityVals.coreType}
                      </p>
                    );
                  })()}
                </div>

                {/* Communication */}
                <div 
                  className="bg-white border border-[#42047d] p-3 flex flex-col"
                  style={{ 
                    borderRadius: '5%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <p className="text-[10px] font-bold text-black mb-2 text-center">Communication</p>
                  {(() => {
                    const personalityVals = getPersonalityValues(personality, results, layer6Result);
                    return (
                      <p 
                        className="text-[8px] font-bold text-center"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}
                      >
                        {personalityVals.communicationStyle}
                      </p>
                    );
                  })()}
                </div>
              </div>
            </div>
          </div>
          
          {/* META-BELIEFS AND VALUES SECTION */}
          <div className="bg-white border border-[rgba(31,41,55,0.26)] rounded-[5px] mb-6">
            <div 
              className="h-[25px] flex items-center justify-center"
              style={{
                background: 'linear-gradient(to right, #42047d, #f6782f)'
              }}
            >
              <p className="text-[14px] font-bold text-white">Meta-Beliefs and Values</p>
            </div>
            <div className="p-3 sm:p-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-4">
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Faith Orientation</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.faithOrientation;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Control Orientation</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.controlOrientation;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Fairness View</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.fairnessView;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Integrity Style</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.integrityStyle;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Growth Preference</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.growthPreference;
                    })()}
                  </p>
                </div>
                <div 
                  className="bg-white border border-[#42047d] p-2 sm:p-3 text-center"
                  style={{ 
                    borderRadius: '5%'
                  }}
                >
                  <p className="text-[8px] font-bold text-black mb-1">Impact Preference</p>
                  <p 
                    className="text-[8px] font-semibold"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #42047d, #f6782f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {(() => {
                      const metaVals = getMetaBeliefsValues((results as any).meta_beliefs, layer7Result);
                      return metaVals.impactPreference;
                    })()}
                  </p>
                </div>
              </div>
              <p className="text-[7px] font-normal text-black text-center italic">
                This is just an awareness of your beliefs and not judgment
              </p>
            </div>
          </div>
          
          {/* FOOTER SECTION */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 border-t" style={{ borderColor: '#C72170' }}>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My E-DNA Results',
                    text: `I'm Mixed type! Check out my Entrepreneurial DNA results.`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="bg-[#ec4049] text-white px-6 py-2 rounded-[5px] text-[11px] font-semibold hover:bg-[#d6353e] transition-colors"
            >
              Share results
            </button>
          </div>
              </div>
            </div>
          ) : (
            renderContent()
          )}
        </div>
      </div>
    );
  }


  return (
    <div 
      className="bg-gray-50" 
      style={{ 
        fontFamily: 'Inter, sans-serif',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* COLLAPSIBLE SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT AREA */}
      <div 
        className="flex flex-col bg-gray-50"
        style={{ 
          marginLeft: isMobile ? '0' : '260px',
          marginTop: `calc(70px + ${mobileMenuHeight}px)`, // Account for topbar height + menu height
          height: `calc(100vh - 70px - ${mobileMenuHeight}px)`,
          overflow: 'auto',
          transition: 'margin-left 400ms cubic-bezier(0.4, 0, 0.2, 1), margin-top 300ms ease, height 300ms ease'
        }}
      >
        {/* HEADER SECTION - HIDDEN IN DASHBOARD */}
        {/* <div className="border-b border-pink-600">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-900 to-orange-500 rounded-full" />
            <span className="font-semibold text-sm">Entrepreneurial DNA</span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={(e) => {
                const isMobile = window.matchMedia('(max-width: 767px)').matches;
                if (isMobile) {
                  e.preventDefault();
                  e.stopPropagation();
                  return;
                }
                onViewChange?.('dashboard');
              }}
              className="text-sm font-semibold flex items-center space-x-2 hover:text-purple-600 transition-colors md:cursor-pointer cursor-not-allowed opacity-50 md:opacity-100 pointer-events-none md:pointer-events-auto"
            >
              <span>🏠</span>
              <span>Dashboard</span>
            </button>
            <button 
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My E-DNA Results',
                    text: `I'm ${coreTypeDisplay}! Check out my Entrepreneurial DNA results.`,
                    url: window.location.href
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="text-sm font-semibold flex items-center space-x-2 hover:text-purple-600 transition-colors"
            >
              <span>🔗</span>
              <span>Share</span>
            </button>
            <button 
              onClick={handleDownloadPDF}
              data-pdf-download
              className="text-white px-6 py-2 text-[11px] font-semibold transition-colors cursor-pointer"
              style={{ 
                borderRadius: '5%', 
                display: 'inline-block', 
                minWidth: '120px',
                backgroundColor: '#50c55d',
                border: 'none'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45b04f'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#50c55d'}
            >
              Download 
            </button>
          </div>
        </div>
      </div> */}

      {/* Main Content */}
      <div ref={pdfContentRef} data-pdf-content className="max-w-4xl mx-auto px-6 py-8">
        {/* Title */}
        <h1 className={`text-4xl font-bold text-center bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-4`}>
          {coreTypeDisplay}
        </h1>

        {/* Subtitle */}
        <p className={`text-center text-sm bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-8`}>
          {isMixed 
            ? "We've been unable to identify your core type. You shift between overthinking and overfeeling, struggling to find stable criteria for certainty."
            : "You're someone who understands people and situations on a deep, emotional level."}
        </p>

        {/* Decision Mastery and Mirror Awareness */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Decision <span className="text-orange-500">Mastery</span></span>
              <span className="text-sm font-semibold">Core Level • {core_type_mastery}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${gradientClass}`}
                style={{ width: `${core_type_mastery}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold">Mirror Pair <span className="text-orange-500">Awareness</span></span>
              <span className="text-sm font-semibold">Integration • {mirror_awareness_score}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${gradientClass}`}
                style={{ width: `${mirror_awareness_score}%` }}
              />
            </div>
          </div>
        </div>

        {/* Core Identity Section */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold text-lg`}>
            Core Identity
          </div>
          <div className="p-6">
            <h3 className={`text-xl font-bold text-center bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-4`}>
              {coreTypeDisplay.replace('The ', '')}
            </h3>
            
            <div className="mb-4">
              <h4 className="font-semibold text-sm mb-2">Default Decision Loop</h4>
              {!isMixed ? (
                <div className="flex items-center justify-center space-x-2 mb-2">
                  {isAlchemist ? (
                    <>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Emotion</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Logic</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Emotion</span>
                    </>
                  ) : (
                    <>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Logic</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Emotion</span>
                      <span>→</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-900 to-orange-500 text-white rounded">Logic</span>
                    </>
                  )}
                  <span className="text-xs">End-validator</span>
                </div>
              ) : (
                <p className="text-center text-sm text-gray-600">No dominant loop.</p>
              )}
              <p className="text-sm text-center">
                {isAlchemist && "Emotion overrides and validates your decisions."}
                {isArchitect && "Logic overrides and validates your decisions."}
                {isMixed && "You fluctuate between logic and emotion without consistent validation"}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-sm mb-2">Decision Process</h4>
              <p className="text-sm">
                {isAlchemist && "You lead through narrative and energy, translating emotion into motion."}
                {isArchitect && "You filter reality through logic first, then emotion confirms meaning before logic re-validates."}
                {isMixed && "You fluctuate between logic and emotion without consistent validation"}
              </p>
            </div>
          </div>
        </div>

        {/* Subtype Identity and Mirror Pair Awareness */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Subtype Identity */}
          {!isMixed ? (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
                Subtype Identity
              </div>
              <div className="p-4">
                <h4 className={`font-bold text-orange-500 mb-2`}>{subtypeDisplay}</h4>
                <p className="text-xs text-gray-600 mb-2">
                  {isAlchemist && "Sees futures before others"}
                  {isArchitect && "Sees the world as a sequence of moves"}
                </p>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-orange-500`}>Strength</h5>
                  <p className="text-xs">
                    {isAlchemist && "connects weak signals into foresight, inspires belief"}
                    {isArchitect && "creates clarity, sequences milestones, removes guesswork"}
                  </p>
                </div>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-orange-500`}>Blind Spot</h5>
                  <p className="text-xs">
                    {isAlchemist && "falls in love with story, mistakes resonance for traction"}
                    {isArchitect && "believes if a plan makes sense, it will work"}
                  </p>
                </div>
                <div>
                  <h5 className={`font-semibold text-xs text-orange-500`}>Trap</h5>
                  <p className="text-xs">
                    {isAlchemist && "True narrative ≠ valid plan."}
                    {isArchitect && "Valid map ≠ true adoption"}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
                Core Identity
              </div>
              <div className="p-4">
                <h4 className={`font-bold text-purple-900 mb-2`}>Operating Focus</h4>
                <p className="text-xs text-gray-600 mb-2">Driven by whatever feels right in the moment.</p>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-purple-900`}>Expression</h5>
                  <p className="text-xs">Flexible but inconsistent.</p>
                </div>
                <div className="mb-2">
                  <h5 className={`font-semibold text-xs text-purple-900`}>Root Cause</h5>
                  <p className="text-xs">No single source of internal certainty.</p>
                </div>
                <div>
                  <h5 className={`font-semibold text-xs text-purple-900`}>Stabilisation Path</h5>
                  <p className="text-xs">Use a simple sense → commit loop.</p>
                </div>
              </div>
            </div>
          )}

          {/* Mirror Pair Awareness */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
              Mirror Pair Awareness
            </div>
            <div className="p-4 flex items-center justify-center">
              <span className={`text-4xl font-bold bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                {mirror_awareness_score >= 66 ? 'HIGH' : mirror_awareness_score >= 33 ? 'MEDIUM' : 'LOW'}
              </span>
            </div>
          </div>
        </div>

        {/* Learning Style Preferences */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Learning Style Preferences
          </div>
          <div className="p-6">
            <div className="grid grid-cols-5 gap-4">
              {/* Modality Preference */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Modality Preference</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  {(learning_style as any)?.dominant || (learning_style as any)?.dominant_modality || 'Visual'}
                </p>
                <p className="text-xs text-gray-600">
                  Spatial or diagrammatic form. Patterns, visuals, and graphs
                </p>
              </div>

              {/* Approach */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Approach</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  Sequential
                </p>
                <p className="text-xs text-gray-600">
                  Step-by-step order. Sequence builds trust in completeness
                </p>
              </div>

              {/* Concept Processing */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Concept Processing</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  Abstract
                </p>
                <p className="text-xs text-gray-600">
                  Patterns and symbols reveal meaning through connection.
                </p>
              </div>

              {/* Working Environment */}
              <div className="border border-purple-900 rounded p-3">
                <h5 className="font-bold text-xs mb-2">Working Environment</h5>
                <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                  Individual
                </p>
                <p className="text-xs text-gray-600">
                  Deep work and solitude optimises comprehension for you
                </p>
              </div>

              {/* Pace */}
              <div className={`border-2 border-transparent bg-gradient-to-r ${gradientClass} rounded p-[2px]`}>
                <div className="bg-white rounded p-3 h-full">
                  <h5 className="font-bold text-xs mb-2">Pace</h5>
                  <p className={`text-xs font-semibold bg-gradient-to-b ${gradientClass} bg-clip-text text-transparent mb-1`}>
                    Flexible
                  </p>
                  <p className="text-xs text-gray-600">
                    Controlled tempo based on task complexity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Neurodiversity Section */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Neurodiversity
          </div>
          <div className="p-6">
            {(() => {
              const neuroInfo = getNeurodiversityInfo(neurodiversity, layer5Result);
              return (
                <>
                  <h4 className={`font-bold text-purple-900 mb-2`}>{neuroInfo.classification}</h4>
                  <p className="text-sm mb-2">
                    {neuroInfo.description}
                  </p>
                  <p className="text-xs text-gray-500 italic">
                    *This is a screening assessment to better understand your cognitive patterns*
                  </p>
                </>
              );
            })()}
          </div>
        </div>

        {/* Mindset and Personality */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-6">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Mindset and Personality
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Mindset */}
              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-bold text-sm mb-2">Mindset</h4>
                {(() => {
                  const mindsetVals = getMindsetValues(mindset, layer6Result);
                  return (
                    <>
                      <p className={`text-orange-500 font-semibold text-sm mb-2`}>
                        {mindsetVals.growthFixed} Mindset
                      </p>
                      <p className="text-xs">
                        {mindsetVals.growthFixed === 'Growth' 
                          ? 'You view challenges as opportunities and treat effort as improvement'
                          : 'You tend to believe abilities are static and unchangeable'}
                      </p>
                      <p className={`text-orange-500 font-semibold text-sm mb-2 mt-2`}>
                        {mindsetVals.abundanceScarcity} Mindset
                      </p>
                      <p className={`text-orange-500 font-semibold text-sm mb-2`}>
                        {mindsetVals.challengeComfort} Mindset
                      </p>
                    </>
                  );
                })()}
              </div>

              {/* Personality */}
              <div className="border border-gray-200 rounded p-4">
                <h4 className="font-bold text-sm mb-2">Personality</h4>
                {(() => {
                  const personalityVals = getPersonalityValues(personality, results, layer6Result);
                  return (
                    <>
                      <p className={`text-orange-500 font-semibold text-sm mb-2`}>
                        {personalityVals.coreType || 'Not Available'}
                      </p>
                      <p className="text-xs">
                        {personalityVals.coreType === 'Confident & Steady'
                          ? 'You are confident in your abilities and give your thoughts reasonable time to act on it'
                          : personalityVals.coreType === 'Confident & Driven'
                          ? 'You are confident and move quickly, driving results with decisive action'
                          : personalityVals.coreType === 'Considerate & Steady'
                          ? 'You are thoughtful and steady, taking time to consider before acting'
                          : personalityVals.coreType === 'Fast-Moving & Adaptive'
                          ? 'You move quickly and adapt easily to changing circumstances'
                          : 'Your personality reflects a balance of confidence and consideration'}
                      </p>
                      <p className={`text-orange-500 font-semibold text-sm mb-2 mt-2`}>
                        {personalityVals.communicationStyle || 'Not Available'}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Meta-Beliefs and Values */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
          <div className={`bg-gradient-to-r ${gradientClass} text-white text-center py-3 font-bold`}>
            Meta-Beliefs and Values
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Mission-Driven */}
              <div>
                <h4 className={`font-bold text-sm mb-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                  Mission-Driven and People-focused
                </h4>
                <p className="text-xs">
                  You define "right" by service and impact on people. This stabilises decisions under pressure and builds loyalty.
                </p>
              </div>

              {/* Meaning-Led */}
              <div>
                <h4 className={`font-bold text-sm mb-2 bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent`}>
                  Meaning-Led and Renewal-Oriented
                </h4>
                <p className="text-xs">
                  You act from purpose and renewal. This keeps culture alive. Add operating constraints so inspiration embeds as process
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic mt-4 text-center">
              This is just an awareness of your beliefs and not judgment
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: 'My E-DNA Results',
                  text: `I'm ${coreTypeDisplay}! Check out my Entrepreneurial DNA results.`,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
              }
            }}
            className="bg-red-500 text-white px-6 py-3 rounded font-semibold hover:bg-red-600 transition-colors"
          >
            Share results
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

