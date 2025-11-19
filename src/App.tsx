import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { EDNAQuiz, EDNAResults } from './components/EDNAQuiz';
import { QuizResults } from './components/QuizResults';
import { EDNAResultsPage } from './components/EDNAResultsPage';
import { LMSDashboard } from './components/LMSDashboard';
import { PersonalizedLMS } from './components/PersonalizedLMS';
import { AIChat } from './components/AIChat';
import { PersonalizedAIChat } from './components/PersonalizedAIChat';
import { AIMentorHub } from './components/AIMentorHub';
import { ProfileInsights } from './components/ProfileInsights';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AuthScreens } from './components/AuthScreens';
import { EmailVerificationPage } from './components/EmailVerificationPage';
import { ShortResultsPreview } from './components/ShortResultsPreview';
import { PDFResultsPage } from './components/PDFResultsPage';
import { authHelpers, supabase } from './utils/supabase/client';
import { saveQuizResults, loadQuizResults } from './utils/supabase/quiz-results';
import { checkBackendStatus } from './utils/supabase/backend-status';
import { BACKEND_URL, GHL_CHECKOUT_URL } from './config';

interface User {
  email: string;
  name: string;
  id?: string;
}

export default function App() {
  // PDF Generation Route - must be first
  if (window.location.pathname === '/pdf-results') {
    return <PDFResultsPage />;
  }

  const [currentView, setCurrentView] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [quizResults, setQuizResults] = useState<EDNAResults | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
  const [showShortResults, setShowShortResults] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    // Check backend status (non-blocking, just for logging)
    checkBackendStatus();
    
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = authHelpers.onAuthStateChange(async (event, session) => {
      console.log('🔐 Auth state change:', event);
      
      if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
        // Handle sign out or token refresh
        if (!session) {
          setUser(null);
          setIsAuthenticated(false);
          setQuizResults(null);
          console.log('👋 User signed out');
        }
      }
      
      if (session?.user) {
        setUser({
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'User',
          id: session.user.id
        });
        setIsAuthenticated(true);
        
        // Load quiz results if they exist
        await loadUserQuizResults(session.user.id);
      } else if (event !== 'SIGNED_OUT') {
        // Only clear state if not already handling sign out
        setUser(null);
        setIsAuthenticated(false);
        setQuizResults(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkSession = async () => {
    setIsLoadingAuth(true);
    
    try {
      const { session, error } = await authHelpers.getSession();
      
      if (error) {
        console.log('⚠️ Session check error (handled):', error.message);
        // Error was handled in authHelpers, session is null
        setUser(null);
        setIsAuthenticated(false);
        setQuizResults(null);
        setIsLoadingAuth(false);
        return;
      }
      
      if (session?.user) {
        console.log('✅ Session restored for:', session.user.email);
        setUser({
          email: session.user.email || '',
          name: session.user.user_metadata?.name || 'User',
          id: session.user.id
        });
        setIsAuthenticated(true);
        
        // Load quiz results if they exist (non-blocking, silent)
        loadUserQuizResults(session.user.id).catch(() => {
          // Fail silently - user can still use the app
        });
      } else {
        console.log('ℹ️ No active session found');
      }
    } catch (err: any) {
      // Silent fail - user will just appear as logged out
      console.log('⚠️ Session check failed:', err.message);
      setUser(null);
      setIsAuthenticated(false);
      setQuizResults(null);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const loadUserQuizResults = async (userId: string) => {
    try {
      const { results } = await loadQuizResults(userId);
      
      if (results) {
        setQuizResults(results);
      }
    } catch (err) {
      // Fail silently - user can still take the quiz
    }
  };

  const handleAuthenticate = (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
    // After auth, show onboarding if they haven't taken quiz yet
    if (!quizResults) {
      setShowOnboarding(true);
    } else {
      setCurrentView('dashboard');
    }
  };

  const handleLogout = async () => {
    await authHelpers.signOut();
    setUser(null);
    setIsAuthenticated(false);
    setQuizResults(null);
    setCurrentView('home');
  };

  const handleAuthToggle = () => {
    if (isAuthenticated) {
      handleLogout();
    } else {
      setShowAuth(true);
    }
  };

  const handleViewChange = (view: string) => {
    // Require authentication for dashboard and AI mentor (chat) only
    // Quiz is now publicly accessible without authentication
    if (!isAuthenticated && (view === 'dashboard' || view === 'chat')) {
      setShowAuth(true);
      return;
    }

    // Show onboarding for authenticated first-time quiz takers only
    // Unauthenticated users can take quiz directly without onboarding
    if (view === 'quiz' && isAuthenticated && !quizResults) {
      setShowOnboarding(true);
      return;
    }

    setCurrentView(view);
  };

  const handleQuizComplete = async (results: EDNAResults) => {
    setQuizResults(results);
    
    // Show email verification modal
    setShowEmailVerification(true);
  };

  const handleRetakeQuiz = () => {
    setQuizResults(null);
    setVerifiedEmail(null);
    setShowShortResults(false);
    setCurrentView('quiz');
  };

  const handleEmailVerified = async (email: string) => {
    setVerifiedEmail(email);
    setShowEmailVerification(false);

    // Save results and trigger background PDF generation (NEW FAST ENDPOINT)
    if (quizResults) {
      try {
        const response = await fetch(`${BACKEND_URL}/api/quiz/save-results`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: email.split('@')[0],
            results: quizResults
          })
        });

        const data = await response.json();

        if (data.success) {
          console.log('✅ Results saved, PDF generating in background');
          localStorage.setItem('resultId', data.resultId);
          localStorage.setItem('userEmail', email);
        }
      } catch (error) {
        console.error('Failed to save results:', error);
      }
    }

    // Show short results preview immediately (don't wait for PDF)
    setShowShortResults(true);
  };

  const handleGetFullReport = () => {
    // Redirect to GHL checkout page
    // Store email and result ID for post-purchase email
    if (verifiedEmail) {
      localStorage.setItem('purchaseEmail', verifiedEmail);
    }

    // Open checkout in new tab or redirect
    window.location.href = GHL_CHECKOUT_URL;
  };

  // Show loading state while checking authentication
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={() => {
          setShowOnboarding(false);
          setCurrentView('quiz');
        }}
      />
    );
  }

  if (showAuth) {
    return (
      <AuthScreens
        onAuthenticate={handleAuthenticate}
        onCancel={() => setShowAuth(false)}
      />
    );
  }

  // Show email verification as full page after quiz completion
  if (showEmailVerification && quizResults) {
    return (
      <EmailVerificationPage
        onVerified={handleEmailVerified}
        onCancel={() => {
          setShowEmailVerification(false);
          setCurrentView('home');
        }}
      />
    );
  }

  // Show short results preview if email is verified
  if (showShortResults && quizResults && verifiedEmail) {
    return (
      <ShortResultsPreview
        results={quizResults}
        userEmail={verifiedEmail}
        onGetFullReport={handleGetFullReport}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      
      <Navigation 
        currentView={currentView}
        onViewChange={handleViewChange}
        isAuthenticated={isAuthenticated}
        onAuthToggle={handleAuthToggle}
      />
      
      {currentView === 'home' && (
        <Home onViewChange={handleViewChange} />
      )}
      
      {currentView === 'about' && (
        <About onViewChange={handleViewChange} />
      )}
      
      {currentView === 'courses' && (
        <Courses onViewChange={handleViewChange} isAuthenticated={isAuthenticated} />
      )}
      
      {currentView === 'quiz' && (
        <EDNAQuiz 
          onComplete={handleQuizComplete}
          onBackToHome={() => setCurrentView('home')}
        />
      )}
      
      {currentView === 'results' && quizResults && (
        <EDNAResultsPage 
          results={quizResults}
          onViewChange={handleViewChange}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
      
      {currentView === 'dashboard' && isAuthenticated && (
        quizResults ? (
          <PersonalizedLMS 
            profile={quizResults}
            persona={quizResults.core_type === 'blurred' ? 'architect' : quizResults.core_type} 
          />
        ) : (
          <LMSDashboard persona="architect" />
        )
      )}
      
      {currentView === 'chat' && isAuthenticated && (
        <AIMentorHub />
      )}
      
      {currentView === 'insights' && quizResults && (
        <ProfileInsights results={quizResults} />
      )}
    </div>
  );
}