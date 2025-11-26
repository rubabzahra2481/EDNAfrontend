import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { About } from './components/About';
import { Courses } from './components/Courses';
import { NewEDNAQuiz } from './components/NewEDNAQuiz';
import { EDNAResults } from './components/EDNAQuiz';
import { QuizResults } from './components/QuizResults';
import { EDNAResultsPage } from './components/EDNAResultsPage';
import { LMSDashboard } from './components/LMSDashboard';
import { PersonalizedLMS } from './components/PersonalizedLMS';
import { ResultsDashboard } from './components/ResultsDashboard';
import { AIChat } from './components/AIChat';
import { PersonalizedAIChat } from './components/PersonalizedAIChat';
import { AIMentorHub } from './components/AIMentorHub';
import { ProfileInsights } from './components/ProfileInsights';
import { OnboardingFlow } from './components/OnboardingFlow';
import { AuthScreens } from './components/AuthScreens';
import { EmailVerificationPage } from './components/EmailVerificationPage';
import { CompleteResultsPage } from './components/CompleteResultsPage';
import { PDFResultsPage } from './components/PDFResultsPage';
import { QuizCooldownMessage } from './components/QuizCooldownMessage';
import { SignupPage } from './components/SignupPage';
import { authHelpers, supabase } from './utils/supabase/client';
import { saveQuizResults, loadQuizResults } from './utils/supabase/quiz-results';
import { checkBackendStatus } from './utils/supabase/backend-status';
import { BACKEND_URL, GHL_CHECKOUT_URL } from './config';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { clearAgentToken } from './utils/agentToken';
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

  // Signup Route - direct access to registration
  if (window.location.pathname === '/signup') {
    return <SignupPage />;
  }

  // Reset Password Route - for password reset flow
  if (window.location.pathname === '/reset-password') {
    return <ResetPasswordPage />;
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
  const showShortResultsRef = useRef(false);
  const [quizCompletedAt, setQuizCompletedAt] = useState<Date | null>(null);

  // Check for existing session on mount
  // Sync ref with state
  useEffect(() => {
    showShortResultsRef.current = showShortResults;
  }, [showShortResults]);

  useEffect(() => {
    // Restore pending quiz results from localStorage if they exist
    // This allows users to see short results even after page reload or logout
    const pendingResults = localStorage.getItem('pendingQuizResults');
    const pendingEmail = localStorage.getItem('pendingVerifiedEmail');
    
    if (pendingResults && pendingEmail) {
      try {
        const results = JSON.parse(pendingResults);
        // Validate that results have the expected structure
        if (results && typeof results === 'object' && results.core_type) {
          setQuizResults(results);
          setVerifiedEmail(pendingEmail);
          setShowShortResults(true);
          // CRITICAL: Update ref immediately to prevent checkSession from clearing results
          showShortResultsRef.current = true;
          console.log('✅ Restored pending quiz results from localStorage');
        } else {
          console.warn('⚠️ Invalid quiz results format in localStorage, clearing...');
          localStorage.removeItem('pendingQuizResults');
          localStorage.removeItem('pendingVerifiedEmail');
        }
      } catch (err) {
        console.error('⚠️ Failed to restore quiz results:', err);
        localStorage.removeItem('pendingQuizResults');
        localStorage.removeItem('pendingVerifiedEmail');
      }
    }

    // Restore quiz completion timestamp from localStorage
    const savedQuizCompletedAt = localStorage.getItem('quizCompletedAt');
    if (savedQuizCompletedAt) {
      try {
        const completedDate = new Date(savedQuizCompletedAt);
        // Only restore if it's a valid date and within the last 7 days
        if (!isNaN(completedDate.getTime())) {
          setQuizCompletedAt(completedDate);
          console.log('✅ Restored quiz completion timestamp from localStorage:', completedDate);
        }
      } catch (err) {
        console.error('⚠️ Failed to restore quiz completion timestamp:', err);
        localStorage.removeItem('quizCompletedAt');
      }
    }

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
          // Don't clear quiz results if we're showing short results (after OTP verification)
          // This allows users to see their results even after being logged out
          if (!showShortResultsRef.current) {
            setQuizResults(null);
          }
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
        if (session.user.email) {
          await loadUserQuizResults(session.user.email);
        }
      } else if (event !== 'SIGNED_OUT') {
        // Only clear state if not already handling sign out
        setUser(null);
        setIsAuthenticated(false);
        // Don't clear quiz results if showing short results
        if (!showShortResultsRef.current) {
          setQuizResults(null);
        }
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
        // Don't clear quiz results if showing short results
        if (!showShortResultsRef.current) {
          setQuizResults(null);
        }
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
      // Don't clear quiz results if showing short results
      if (!showShortResultsRef.current) {
        setQuizResults(null);
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const loadUserQuizResults = async (userEmail: string) => {
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const response = await fetch(`${BACKEND_URL}/api/quiz/results-by-email?email=${encodeURIComponent(userEmail)}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.results) {
          setQuizResults(data.results);
          // Store quiz completion timestamp for 7-day cooldown
          if (data.createdAt) {
            const completedDate = new Date(data.createdAt);
            setQuizCompletedAt(completedDate);
            // Persist to localStorage
            localStorage.setItem('quizCompletedAt', completedDate.toISOString());
          }
          console.log('✅ Loaded quiz results from backend for', userEmail);
        }
      } else if (response.status === 404) {
        console.log('ℹ️ No quiz results found for', userEmail);
      }
    } catch (err) {
      console.log('⚠️ Failed to load quiz results:', err);
      // Fail silently - user can still take the quiz
    }
  };

  const handleAuthenticate = async (userData: User) => {
    setUser(userData);
    setIsAuthenticated(true);
    setShowAuth(false);
    
    // Clear pending quiz results from localStorage since user is now authenticated
    localStorage.removeItem('pendingQuizResults');
    localStorage.removeItem('pendingVerifiedEmail');
    setShowShortResults(false);
    
    // IMPORTANT: Load quiz results FIRST before deciding navigation
    if (userData.email) {
      await loadUserQuizResults(userData.email);
    }
    
    // After loading results, check quiz cooldown and redirect appropriately
    // Note: We need to check the results that were just loaded
    // Since state updates are async, we need to fetch again or use the response
    try {
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
      const response = await fetch(`${BACKEND_URL}/api/quiz/results-by-email?email=${encodeURIComponent(userData.email || '')}`);
      
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.results && data.createdAt) {
          // User has quiz results, check cooldown
          const completedAt = new Date(data.createdAt);
          const daysSinceCompletion = (new Date().getTime() - completedAt.getTime()) / (1000 * 60 * 60 * 24);
          
          if (daysSinceCompletion < 7) {
            // Cooldown active, go to home
            console.log('✅ User has quiz results with active cooldown, redirecting to home');
            setCurrentView('home');
          } else {
            // Cooldown expired, go to dashboard
            console.log('✅ User has quiz results, cooldown expired, redirecting to dashboard');
            setCurrentView('dashboard');
          }
        } else {
          // No quiz results, show onboarding
          console.log('ℹ️ No quiz results found, showing onboarding');
          setShowOnboarding(true);
        }
      } else {
        // No quiz results found, show onboarding
        console.log('ℹ️ No quiz results found, showing onboarding');
        setShowOnboarding(true);
      }
    } catch (err) {
      console.error('Error checking quiz results:', err);
      // On error, show onboarding as fallback
      setShowOnboarding(true);
    }
  };

  const handleLogout = async () => {
    await authHelpers.signOut();
    
    // Clear Agent access token from storage
    clearAgentToken();
    
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
    // Hide short results when navigating away
    if (showShortResults) {
      setShowShortResults(false);
    }

    // Require authentication for dashboard and AI mentor (chat) only
    // Quiz is now publicly accessible without authentication
    if (!isAuthenticated && (view === 'dashboard' || view === 'chat')) {
      setShowAuth(true);
      return;
    }

    // Check 7-day cooldown for quiz retake - ENFORCE STRICTLY
    if (view === 'quiz') {
      // Check both state and localStorage for completion timestamp
      const checkDate = quizCompletedAt || (() => {
        const saved = localStorage.getItem('quizCompletedAt');
        return saved ? new Date(saved) : null;
      })();
      
      // Also check if user has quiz results (indicates they completed the quiz)
      const hasCompletedQuiz = quizResults || localStorage.getItem('pendingQuizResults');
      
      if (hasCompletedQuiz && checkDate) {
        const daysSinceCompletion = (new Date().getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24);
        if (daysSinceCompletion < 7) {
          const daysRemaining = Math.ceil(7 - daysSinceCompletion);
          console.log(`⏳ Quiz cooldown active. ${daysRemaining} days remaining`);
          // Set the timestamp in state if it was only in localStorage
          if (!quizCompletedAt && checkDate) {
            setQuizCompletedAt(checkDate);
          }
          // Continue to setCurrentView below to show cooldown message
        } else {
          // Cooldown expired, clear the timestamp
          console.log('✅ Quiz cooldown expired, allowing retake');
          setQuizCompletedAt(null);
          localStorage.removeItem('quizCompletedAt');
        }
      }
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
    
    // If user is already authenticated, skip email verification
    if (isAuthenticated && user?.email) {
      console.log('✅ User already authenticated, skipping email verification');
      // Directly call handleEmailVerified with user's email
      await handleEmailVerified(user.email);
      return;
    }
    
    // Show email verification modal for unauthenticated users
    setShowEmailVerification(true);
  };

  const handleRetakeQuiz = () => {
    // Check 7-day cooldown before allowing retake
    if (quizCompletedAt) {
      const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceCompletion < 7) {
        console.log(`⏳ Cannot retake quiz yet. ${(7 - daysSinceCompletion).toFixed(1)} days remaining`);
        // Navigate to quiz view which will show the cooldown message
        setCurrentView('quiz');
        return;
      }
    }
    // Allow retake if cooldown has expired
    setQuizResults(null);
    setQuizCompletedAt(null);
    localStorage.removeItem('quizCompletedAt');
    localStorage.removeItem('pendingQuizResults');
    localStorage.removeItem('pendingVerifiedEmail');
    setVerifiedEmail(null);
    setShowShortResults(false);
    setCurrentView('quiz');
  };

  const handleEmailVerified = async (email: string) => {
    // CRITICAL: Update ref FIRST, before ANY other operations
    // This ensures auth listener sees correct value even if signOut() happens during async operations
    showShortResultsRef.current = true;
    console.log('✅ showShortResultsRef set to true IMMEDIATELY (before any async operations)');
    
    setVerifiedEmail(email);
    setShowEmailVerification(false);
    setShowShortResults(true);

    // Store quiz results in localStorage so they persist even after logout
    if (quizResults) {
      localStorage.setItem('pendingQuizResults', JSON.stringify(quizResults));
      localStorage.setItem('pendingVerifiedEmail', email);
    }

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
          // Set quiz completion timestamp for 7-day cooldown
          const completedDate = new Date();
          setQuizCompletedAt(completedDate);
          // Persist to localStorage
          localStorage.setItem('quizCompletedAt', completedDate.toISOString());
          console.log('✅ Quiz completion timestamp saved:', completedDate);
        }
      } catch (error) {
        console.error('Failed to save results:', error);
      }
    }
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
      <CompleteResultsPage
        results={quizResults}
        userEmail={verifiedEmail}
        onGetFullReport={handleGetFullReport}
        onViewChange={handleViewChange}
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
      
      {currentView === 'quiz' && (() => {
        // Check if user is in 7-day cooldown period
        // Check both state and localStorage for completion timestamp
        const checkDate = quizCompletedAt || (() => {
          const saved = localStorage.getItem('quizCompletedAt');
          return saved ? new Date(saved) : null;
        })();
        
        // Also check if user has quiz results (indicates they completed the quiz)
        const hasCompletedQuiz = quizResults || localStorage.getItem('pendingQuizResults');
        
        if (hasCompletedQuiz && checkDate) {
          const daysSinceCompletion = (new Date().getTime() - checkDate.getTime()) / (1000 * 60 * 60 * 24);
          if (daysSinceCompletion < 7) {
            // Set the timestamp in state if it was only in localStorage
            if (!quizCompletedAt && checkDate) {
              setQuizCompletedAt(checkDate);
            }
            return (
              <QuizCooldownMessage 
                completedAt={checkDate}
                onViewDashboard={() => setCurrentView('dashboard')}
              />
            );
          } else {
            // Cooldown expired, clear the timestamp
            if (quizCompletedAt) {
              setQuizCompletedAt(null);
              localStorage.removeItem('quizCompletedAt');
            }
          }
        }
        // Show quiz if no cooldown or cooldown expired
        return (
          <NewEDNAQuiz 
            onComplete={handleQuizComplete}
            onBackToHome={() => setCurrentView('home')}
            userEmail={user?.email || null}
          />
        );
      })()}
      
      {currentView === 'results' && quizResults && (
        <EDNAResultsPage 
          results={quizResults}
          onViewChange={handleViewChange}
          onRetakeQuiz={handleRetakeQuiz}
        />
      )}
      
      {currentView === 'dashboard' && isAuthenticated && quizResults && (
        <CompleteResultsPage 
          results={quizResults}
          userEmail={user?.email || ''}
          onViewChange={handleViewChange}
        />
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
// import React, { useState, useEffect, useRef } from 'react';
// import { Navigation } from './components/Navigation';
// import { Home } from './components/Home';
// import { About } from './components/About';
// import { Courses } from './components/Courses';
// import { NewEDNAQuiz } from './components/NewEDNAQuiz';
// import { EDNAResults } from './components/EDNAQuiz';
// import { QuizResults } from './components/QuizResults';
// import { EDNAResultsPage } from './components/EDNAResultsPage';
// import { LMSDashboard } from './components/LMSDashboard';
// import { PersonalizedLMS } from './components/PersonalizedLMS';
// import { ResultsDashboard } from './components/ResultsDashboard';
// import { AIChat } from './components/AIChat';
// import { PersonalizedAIChat } from './components/PersonalizedAIChat';
// import { AIMentorHub } from './components/AIMentorHub';
// import { ProfileInsights } from './components/ProfileInsights';
// import { OnboardingFlow } from './components/OnboardingFlow';
// import { AuthScreens } from './components/AuthScreens';
// import { EmailVerificationPage } from './components/EmailVerificationPage';
// import { CompleteResultsPage } from './components/CompleteResultsPage';ew';
// import { PDFResultsPage } from './components/PDFResultsPage';
// import { QuizCooldownMessage } from './components/QuizCooldownMessage';
// import { SignupPage } from './components/SignupPage';
// import { authHelpers, supabase } from './utils/supabase/client';
// import { saveQuizResults, loadQuizResults } from './utils/supabase/quiz-results';
// import { checkBackendStatus } from './utils/supabase/backend-status';
// import { BACKEND_URL, GHL_CHECKOUT_URL } from './config';
// import { ResetPasswordPage } from './pages/ResetPasswordPage';
// import { clearAgentToken } from './utils/agentToken';
// interface User {
//   email: string;
//   name: string;
//   id?: string;
// }

// export default function App() {
//   // PDF Generation Route - must be first
//   if (window.location.pathname === '/pdf-results') {
//     return <PDFResultsPage />;
//   }

//   // Signup Route - direct access to registration
//   if (window.location.pathname === '/signup') {
//     return <SignupPage />;
//   }

//   // Reset Password Route - for password reset flow
//   if (window.location.pathname === '/reset-password') {
//     return <ResetPasswordPage />;
//   }

//   const [currentView, setCurrentView] = useState('home');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [quizResults, setQuizResults] = useState<EDNAResults | null>(null);
//   const [showAuth, setShowAuth] = useState(false);
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [isLoadingAuth, setIsLoadingAuth] = useState(true);
//   const [showEmailVerification, setShowEmailVerification] = useState(false);
//   const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
//   const [showShortResults, setShowShortResults] = useState(false);
//   const showShortResultsRef = useRef(false);
//   const [quizCompletedAt, setQuizCompletedAt] = useState<Date | null>(null);

//   // Check for existing session on mount
//   // Sync ref with state
//   useEffect(() => {
//     showShortResultsRef.current = showShortResults;
//   }, [showShortResults]);

//   useEffect(() => {
//     // Restore pending quiz results from localStorage if they exist
//     // This allows users to see short results even after page reload or logout
//     const pendingResults = localStorage.getItem('pendingQuizResults');
//     const pendingEmail = localStorage.getItem('pendingVerifiedEmail');
    
//     if (pendingResults && pendingEmail) {
//       try {
//         const results = JSON.parse(pendingResults);
//         setQuizResults(results);
//         setVerifiedEmail(pendingEmail);
//         setShowShortResults(true);
//         console.log('✅ Restored pending quiz results from localStorage');
//       } catch (err) {
//         console.error('⚠️ Failed to restore quiz results:', err);
//       }
//     }

//     // Check backend status (non-blocking, just for logging)
//     checkBackendStatus();
    
//     checkSession();

//     // Listen for auth changes
//     const { data: { subscription } } = authHelpers.onAuthStateChange(async (event, session) => {
//       console.log('🔐 Auth state change:', event);
      
//       if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
//         // Handle sign out or token refresh
//         if (!session) {
//           setUser(null);
//           setIsAuthenticated(false);
//           // Don't clear quiz results if we're showing short results (after OTP verification)
//           // This allows users to see their results even after being logged out
//           if (!showShortResultsRef.current) {
//             setQuizResults(null);
//           }
//           console.log('👋 User signed out');
//         }
//       }
      
//       if (session?.user) {
//         setUser({
//           email: session.user.email || '',
//           name: session.user.user_metadata?.name || 'User',
//           id: session.user.id
//         });
//         setIsAuthenticated(true);
        
//         // Load quiz results if they exist
//         if (session.user.email) {
//           await loadUserQuizResults(session.user.email);
//         }
//       } else if (event !== 'SIGNED_OUT') {
//         // Only clear state if not already handling sign out
//         setUser(null);
//         setIsAuthenticated(false);
//         // Don't clear quiz results if showing short results
//         if (!showShortResultsRef.current) {
//           setQuizResults(null);
//         }
//       }
//     });

//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, []);

//   const checkSession = async () => {
//     setIsLoadingAuth(true);
    
//     try {
//       const { session, error } = await authHelpers.getSession();
      
//       if (error) {
//         console.log('⚠️ Session check error (handled):', error.message);
//         // Error was handled in authHelpers, session is null
//         setUser(null);
//         setIsAuthenticated(false);
//         setQuizResults(null);
//         setIsLoadingAuth(false);
//         return;
//       }
      
//       if (session?.user) {
//         console.log('✅ Session restored for:', session.user.email);
//         setUser({
//           email: session.user.email || '',
//           name: session.user.user_metadata?.name || 'User',
//           id: session.user.id
//         });
//         setIsAuthenticated(true);
        
//         // Load quiz results if they exist (non-blocking, silent)
//         loadUserQuizResults(session.user.id).catch(() => {
//           // Fail silently - user can still use the app
//         });
//       } else {
//         console.log('ℹ️ No active session found');
//       }
//     } catch (err: any) {
//       // Silent fail - user will just appear as logged out
//       console.log('⚠️ Session check failed:', err.message);
//       setUser(null);
//       setIsAuthenticated(false);
//       setQuizResults(null);
//     } finally {
//       setIsLoadingAuth(false);
//     }
//   };

//   const loadUserQuizResults = async (userEmail: string) => {
//     try {
//       const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
//       const response = await fetch(`${BACKEND_URL}/api/quiz/results-by-email?email=${encodeURIComponent(userEmail)}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.results) {
//           setQuizResults(data.results);
//           // Store quiz completion timestamp for 7-day cooldown
//           if (data.createdAt) {
//             setQuizCompletedAt(new Date(data.createdAt));
//           }
//           console.log('✅ Loaded quiz results from backend for', userEmail);
//         }
//       } else if (response.status === 404) {
//         console.log('ℹ️ No quiz results found for', userEmail);
//       }
//     } catch (err) {
//       console.log('⚠️ Failed to load quiz results:', err);
//       // Fail silently - user can still take the quiz
//     }
//   };

//   const handleAuthenticate = (userData: User) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     setShowAuth(false);
    
//     // Clear pending quiz results from localStorage since user is now authenticated
//     localStorage.removeItem('pendingQuizResults');
//     localStorage.removeItem('pendingVerifiedEmail');
//     setShowShortResults(false);
    
//     // After auth, check quiz cooldown and redirect appropriately
//     if (!quizResults) {
//       setShowOnboarding(true);
//     } else if (quizCompletedAt) {
//       // Check if user is in cooldown period
//       const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//       if (daysSinceCompletion < 7) {
//         // Cooldown active, go to home instead of quiz
//         setCurrentView('home');
//       } else {
//         setCurrentView('dashboard');
//       }
//     } else {
//       setCurrentView('dashboard');
//     }
//   };

//   const handleLogout = async () => {
//     await authHelpers.signOut();
    
//     // Clear Agent access token from storage
//     clearAgentToken();
    
//     setUser(null);
//     setIsAuthenticated(false);
//     setQuizResults(null);
//     setCurrentView('home');
//   };

//   const handleAuthToggle = () => {
//     if (isAuthenticated) {
//       handleLogout();
//     } else {
//       setShowAuth(true);
//     }
//   };

//   const handleViewChange = (view: string) => {
//     // Hide short results when navigating away
//     if (showShortResults) {
//       setShowShortResults(false);
//     }

//     // Require authentication for dashboard and AI mentor (chat) only
//     // Quiz is now publicly accessible without authentication
//     if (!isAuthenticated && (view === 'dashboard' || view === 'chat')) {
//       setShowAuth(true);
//       return;
//     }

//     // Check 7-day cooldown for quiz retake
//     // Don't block navigation - let the quiz view show the cooldown message
//     if (view === 'quiz' && quizResults && quizCompletedAt) {
//       const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//       if (daysSinceCompletion < 7) {
//         console.log(`⏳ Quiz cooldown active. ${(7 - daysSinceCompletion).toFixed(1)} days remaining`);
//         // Continue to setCurrentView below to show cooldown message
//       }
//     }

//     // Show onboarding for authenticated first-time quiz takers only
//     // Unauthenticated users can take quiz directly without onboarding
//     if (view === 'quiz' && isAuthenticated && !quizResults) {
//       setShowOnboarding(true);
//       return;
//     }

//     setCurrentView(view);
//   };

//   const handleQuizComplete = async (results: EDNAResults) => {
//     setQuizResults(results);
    
//     // If user is already authenticated, skip email verification
//     if (isAuthenticated && user?.email) {
//       console.log('✅ User already authenticated, skipping email verification');
//       // Directly call handleEmailVerified with user's email
//       await handleEmailVerified(user.email);
//       return;
//     }
    
//     // Show email verification modal for unauthenticated users
//     setShowEmailVerification(true);
//   };

//   const handleRetakeQuiz = () => {
//     // Check 7-day cooldown before allowing retake
//     if (quizCompletedAt) {
//       const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//       if (daysSinceCompletion < 7) {
//         console.log(`⏳ Cannot retake quiz yet. ${(7 - daysSinceCompletion).toFixed(1)} days remaining`);
//         // Navigate to quiz view which will show the cooldown message
//         setCurrentView('quiz');
//         return;
//       }
//     }
//     // Allow retake if cooldown has expired
//     setQuizResults(null);
//     setQuizCompletedAt(null);
//     setVerifiedEmail(null);
//     setShowShortResults(false);
//     setCurrentView('quiz');
//   };

//   const handleEmailVerified = async (email: string) => {
//     // CRITICAL: Update ref FIRST, before ANY other operations
//     // This ensures auth listener sees correct value even if signOut() happens during async operations
//     showShortResultsRef.current = true;
//     console.log('✅ showShortResultsRef set to true IMMEDIATELY (before any async operations)');
    
//     setVerifiedEmail(email);
//     setShowEmailVerification(false);
//     setShowShortResults(true);

//     // Store quiz results in localStorage so they persist even after logout
//     if (quizResults) {
//       localStorage.setItem('pendingQuizResults', JSON.stringify(quizResults));
//       localStorage.setItem('pendingVerifiedEmail', email);
//     }

//     // Save results and trigger background PDF generation (NEW FAST ENDPOINT)
//     if (quizResults) {
//       try {
//         const response = await fetch(`${BACKEND_URL}/api/quiz/save-results`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email,
//             name: email.split('@')[0],
//             results: quizResults
//           })
//         });

//         const data = await response.json();

//         if (data.success) {
//           console.log('✅ Results saved, PDF generating in background');
//           localStorage.setItem('resultId', data.resultId);
//           localStorage.setItem('userEmail', email);
//           // Set quiz completion timestamp for 7-day cooldown
//           setQuizCompletedAt(new Date());
//         }
//       } catch (error) {
//         console.error('Failed to save results:', error);
//       }
//     }
//   };

//   const handleGetFullReport = () => {
//     // Redirect to GHL checkout page
//     // Store email and result ID for post-purchase email
//     if (verifiedEmail) {
//       localStorage.setItem('purchaseEmail', verifiedEmail);
//     }

//     // Open checkout in new tab or redirect
//     window.location.href = GHL_CHECKOUT_URL;
//   };

//   // Show loading state while checking authentication
//   if (isLoadingAuth) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (showOnboarding) {
//     return (
//       <OnboardingFlow 
//         onComplete={() => {
//           setShowOnboarding(false);
//           setCurrentView('quiz');
//         }}
//       />
//     );
//   }

//   if (showAuth) {
//     return (
//       <AuthScreens
//         onAuthenticate={handleAuthenticate}
//         onCancel={() => setShowAuth(false)}
//       />
//     );
//   }

//   // Show email verification as full page after quiz completion
//   if (showEmailVerification && quizResults) {
//     return (
//       <EmailVerificationPage
//         onVerified={handleEmailVerified}
//         onCancel={() => {
//           setShowEmailVerification(false);
//           setCurrentView('home');
//         }}
//       />
//     );
//   }

//   // Show short results preview if email is verified
//   if (showShortResults && quizResults && verifiedEmail) {
//     return (
//       <ShortResultsPreview
//         results={quizResults}
//         userEmail={verifiedEmail}
//         onGetFullReport={handleGetFullReport}
//         onViewChange={handleViewChange}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
      
//       <Navigation 
//         currentView={currentView}
//         onViewChange={handleViewChange}
//         isAuthenticated={isAuthenticated}
//         onAuthToggle={handleAuthToggle}
//       />
      
//       {currentView === 'home' && (
//         <Home onViewChange={handleViewChange} />
//       )}
      
//       {currentView === 'about' && (
//         <About onViewChange={handleViewChange} />
//       )}
      
//       {currentView === 'courses' && (
//         <Courses onViewChange={handleViewChange} isAuthenticated={isAuthenticated} />
//       )}
      
//       {currentView === 'quiz' && (() => {
//         // Check if user is in 7-day cooldown period
//         if (quizResults && quizCompletedAt) {
//           const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//           if (daysSinceCompletion < 7) {
//             return (
//               <QuizCooldownMessage 
//                 completedAt={quizCompletedAt}
//                 onViewDashboard={() => setCurrentView('dashboard')}
//               />
//             );
//           }
//         }
//         // Show quiz if no cooldown or cooldown expired
//         return (
//           <NewEDNAQuiz 
//             onComplete={handleQuizComplete}
//             onBackToHome={() => setCurrentView('home')}
//           />
//         );
//       })()}
      
//       {currentView === 'results' && quizResults && (
//         <EDNAResultsPage 
//           results={quizResults}
//           onViewChange={handleViewChange}
//           onRetakeQuiz={handleRetakeQuiz}
//         />
//       )}
      
//       {currentView === 'dashboard' && isAuthenticated && (
//         <ResultsDashboard 
//           profile={quizResults}
//           userEmail={user?.email || ''}
//         />
//       )}
      
//       {currentView === 'chat' && isAuthenticated && (
//         <AIMentorHub />
//       )}
      
//       {currentView === 'insights' && quizResults && (
//         <ProfileInsights results={quizResults} />
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect, useRef } from 'react';
// import { Navigation } from './components/Navigation';
// import { Home } from './components/Home';
// import { About } from './components/About';
// import { Courses } from './components/Courses';
// import { NewEDNAQuiz } from './components/NewEDNAQuiz';
// import { EDNAResults } from './components/EDNAQuiz';
// import { QuizResults } from './components/QuizResults';
// import { EDNAResultsPage } from './components/EDNAResultsPage';
// import { LMSDashboard } from './components/LMSDashboard';
// import { PersonalizedLMS } from './components/PersonalizedLMS';
// import { ResultsDashboard } from './components/ResultsDashboard';
// import { AIChat } from './components/AIChat';
// import { PersonalizedAIChat } from './components/PersonalizedAIChat';
// import { AIMentorHub } from './components/AIMentorHub';
// import { ProfileInsights } from './components/ProfileInsights';
// import { OnboardingFlow } from './components/OnboardingFlow';
// import { AuthScreens } from './components/AuthScreens';
// import { EmailVerificationPage } from './components/EmailVerificationPage';
// import { CompleteResultsPage } from './components/CompleteResultsPage';
// import { PDFResultsPage } from './components/PDFResultsPage';
// import { QuizCooldownMessage } from './components/QuizCooldownMessage';
// import { SignupPage } from './components/SignupPage';
// import { authHelpers, supabase } from './utils/supabase/client';
// import { saveQuizResults, loadQuizResults } from './utils/supabase/quiz-results';
// import { checkBackendStatus } from './utils/supabase/backend-status';
// import { BACKEND_URL, GHL_CHECKOUT_URL } from './config';
// import { ResetPasswordPage } from './pages/ResetPasswordPage';
// import { clearAgentToken } from './utils/agentToken';
// interface User {
//   email: string;
//   name: string;
//   id?: string;
// }

// export default function App() {
//   // PDF Generation Route - must be first
//   if (window.location.pathname === '/pdf-results') {
//     return <PDFResultsPage />;
//   }

//   // Signup Route - direct access to registration
//   if (window.location.pathname === '/signup') {
//     return <SignupPage />;
//   }

//   // Reset Password Route - for password reset flow
//   if (window.location.pathname === '/reset-password') {
//     return <ResetPasswordPage />;
//   }

//   const [currentView, setCurrentView] = useState('home');
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState<User | null>(null);
//   const [quizResults, setQuizResults] = useState<EDNAResults | null>(null);
//   const [showAuth, setShowAuth] = useState(false);
//   const [showOnboarding, setShowOnboarding] = useState(false);
//   const [isLoadingAuth, setIsLoadingAuth] = useState(true);
//   const [showEmailVerification, setShowEmailVerification] = useState(false);
//   const [verifiedEmail, setVerifiedEmail] = useState<string | null>(null);
//   const [showShortResults, setShowShortResults] = useState(false);
//   const showShortResultsRef = useRef(false);
//   const [quizCompletedAt, setQuizCompletedAt] = useState<Date | null>(null);

//   // Check for existing session on mount
//   // Sync ref with state
//   useEffect(() => {
//     showShortResultsRef.current = showShortResults;
//   }, [showShortResults]);

//   useEffect(() => {
//     // Restore pending quiz results from localStorage if they exist
//     // This allows users to see short results even after page reload or logout
//     const pendingResults = localStorage.getItem('pendingQuizResults');
//     const pendingEmail = localStorage.getItem('pendingVerifiedEmail');
    
//     if (pendingResults && pendingEmail) {
//       try {
//         const results = JSON.parse(pendingResults);
//         setQuizResults(results);
//         setVerifiedEmail(pendingEmail);
//         setShowShortResults(true);
//         console.log('✅ Restored pending quiz results from localStorage');
//       } catch (err) {
//         console.error('⚠️ Failed to restore quiz results:', err);
//       }
//     }

//     // Check backend status (non-blocking, just for logging)
//     checkBackendStatus();
    
//     checkSession();

//     // Listen for auth changes
//     const { data: { subscription } } = authHelpers.onAuthStateChange(async (event, session) => {
//       console.log('🔐 Auth state change:', event);
      
//       if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
//         // Handle sign out or token refresh
//         if (!session) {
//           setUser(null);
//           setIsAuthenticated(false);
//           // Don't clear quiz results if we're showing short results (after OTP verification)
//           // This allows users to see their results even after being logged out
//           if (!showShortResultsRef.current) {
//             setQuizResults(null);
//           }
//           console.log('👋 User signed out');
//         }
//       }
      
//       if (session?.user) {
//         setUser({
//           email: session.user.email || '',
//           name: session.user.user_metadata?.name || 'User',
//           id: session.user.id
//         });
//         setIsAuthenticated(true);
        
//         // Load quiz results if they exist
//         if (session.user.email) {
//           await loadUserQuizResults(session.user.email);
//         }
//       } else if (event !== 'SIGNED_OUT') {
//         // Only clear state if not already handling sign out
//         setUser(null);
//         setIsAuthenticated(false);
//         // Don't clear quiz results if showing short results
//         if (!showShortResultsRef.current) {
//           setQuizResults(null);
//         }
//       }
//     });

//     return () => {
//       subscription?.unsubscribe();
//     };
//   }, []);

//   const checkSession = async () => {
//     setIsLoadingAuth(true);
    
//     try {
//       const { session, error } = await authHelpers.getSession();
      
//       if (error) {
//         console.log('⚠️ Session check error (handled):', error.message);
//         // Error was handled in authHelpers, session is null
//         setUser(null);
//         setIsAuthenticated(false);
//         setQuizResults(null);
//         setIsLoadingAuth(false);
//         return;
//       }
      
//       if (session?.user) {
//         console.log('✅ Session restored for:', session.user.email);
//         setUser({
//           email: session.user.email || '',
//           name: session.user.user_metadata?.name || 'User',
//           id: session.user.id
//         });
//         setIsAuthenticated(true);
        
//         // Load quiz results if they exist (non-blocking, silent)
//         loadUserQuizResults(session.user.id).catch(() => {
//           // Fail silently - user can still use the app
//         });
//       } else {
//         console.log('ℹ️ No active session found');
//       }
//     } catch (err: any) {
//       // Silent fail - user will just appear as logged out
//       console.log('⚠️ Session check failed:', err.message);
//       setUser(null);
//       setIsAuthenticated(false);
//       setQuizResults(null);
//     } finally {
//       setIsLoadingAuth(false);
//     }
//   };

//   const loadUserQuizResults = async (userEmail: string) => {
//     try {
//       const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
//       const response = await fetch(`${BACKEND_URL}/api/quiz/results-by-email?email=${encodeURIComponent(userEmail)}`);
      
//       if (response.ok) {
//         const data = await response.json();
//         if (data.success && data.results) {
//           setQuizResults(data.results);
//           // Store quiz completion timestamp for 7-day cooldown
//           if (data.createdAt) {
//             setQuizCompletedAt(new Date(data.createdAt));
//           }
//           console.log('✅ Loaded quiz results from backend for', userEmail);
//         }
//       } else if (response.status === 404) {
//         console.log('ℹ️ No quiz results found for', userEmail);
//       }
//     } catch (err) {
//       console.log('⚠️ Failed to load quiz results:', err);
//       // Fail silently - user can still take the quiz
//     }
//   };

//   const handleAuthenticate = (userData: User) => {
//     setUser(userData);
//     setIsAuthenticated(true);
//     setShowAuth(false);
    
//     // Clear pending quiz results from localStorage since user is now authenticated
//     localStorage.removeItem('pendingQuizResults');
//     localStorage.removeItem('pendingVerifiedEmail');
//     setShowShortResults(false);
    
//     // After auth, show onboarding if they haven't taken quiz yet
//     if (!quizResults) {
//       setShowOnboarding(true);
//     } else {
//       setCurrentView('dashboard');
//     }
//   };

//   const handleLogout = async () => {
//     await authHelpers.signOut();
    
//     // Clear Agent access token from storage
//     clearAgentToken();
    
//     setUser(null);
//     setIsAuthenticated(false);
//     setQuizResults(null);
//     setCurrentView('home');
//   };

//   const handleAuthToggle = () => {
//     if (isAuthenticated) {
//       handleLogout();
//     } else {
//       setShowAuth(true);
//     }
//   };

//   const handleViewChange = (view: string) => {
//     // Hide short results when navigating away
//     if (showShortResults) {
//       setShowShortResults(false);
//     }

//     // Require authentication for dashboard and AI mentor (chat) only
//     // Quiz is now publicly accessible without authentication
//     if (!isAuthenticated && (view === 'dashboard' || view === 'chat')) {
//       setShowAuth(true);
//       return;
//     }

//     // Check 7-day cooldown for quiz retake
//     if (view === 'quiz' && quizResults && quizCompletedAt) {
//       const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//       if (daysSinceCompletion < 7) {
//         // Still within 7-day cooldown, stay on current view
//         console.log(`⏳ Quiz cooldown active. ${(7 - daysSinceCompletion).toFixed(1)} days remaining`);
//         return;
//       }
//     }

//     // Show onboarding for authenticated first-time quiz takers only
//     // Unauthenticated users can take quiz directly without onboarding
//     if (view === 'quiz' && isAuthenticated && !quizResults) {
//       setShowOnboarding(true);
//       return;
//     }

//     setCurrentView(view);
//   };

//   const handleQuizComplete = async (results: EDNAResults) => {
//     setQuizResults(results);
    
//     // Show email verification modal
//     setShowEmailVerification(true);
//   };

//   const handleRetakeQuiz = () => {
//     // Check 7-day cooldown before allowing retake
//     if (quizCompletedAt) {
//       const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//       if (daysSinceCompletion < 7) {
//         console.log(`⏳ Cannot retake quiz yet. ${(7 - daysSinceCompletion).toFixed(1)} days remaining`);
//         // Navigate to quiz view which will show the cooldown message
//         setCurrentView('quiz');
//         return;
//       }
//     }
//     // Allow retake if cooldown has expired
//     setQuizResults(null);
//     setQuizCompletedAt(null);
//     setVerifiedEmail(null);
//     setShowShortResults(false);
//     setCurrentView('quiz');
//   };

//   const handleEmailVerified = async (email: string) => {
//     // CRITICAL: Update ref FIRST, before ANY other operations
//     // This ensures auth listener sees correct value even if signOut() happens during async operations
//     showShortResultsRef.current = true;
//     console.log('✅ showShortResultsRef set to true IMMEDIATELY (before any async operations)');
    
//     setVerifiedEmail(email);
//     setShowEmailVerification(false);
//     setShowShortResults(true);

//     // Store quiz results in localStorage so they persist even after logout
//     if (quizResults) {
//       localStorage.setItem('pendingQuizResults', JSON.stringify(quizResults));
//       localStorage.setItem('pendingVerifiedEmail', email);
//     }

//     // Save results and trigger background PDF generation (NEW FAST ENDPOINT)
//     if (quizResults) {
//       try {
//         const response = await fetch(`${BACKEND_URL}/api/quiz/save-results`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             email,
//             name: email.split('@')[0],
//             results: quizResults
//           })
//         });

//         const data = await response.json();

//         if (data.success) {
//           console.log('✅ Results saved, PDF generating in background');
//           localStorage.setItem('resultId', data.resultId);
//           localStorage.setItem('userEmail', email);
//           // Set quiz completion timestamp for 7-day cooldown
//           setQuizCompletedAt(new Date());
//         }
//       } catch (error) {
//         console.error('Failed to save results:', error);
//       }
//     }
//   };

//   const handleGetFullReport = () => {
//     // Redirect to GHL checkout page
//     // Store email and result ID for post-purchase email
//     if (verifiedEmail) {
//       localStorage.setItem('purchaseEmail', verifiedEmail);
//     }

//     // Open checkout in new tab or redirect
//     window.location.href = GHL_CHECKOUT_URL;
//   };

//   // Show loading state while checking authentication
//   if (isLoadingAuth) {
//     return (
//       <div className="min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (showOnboarding) {
//     return (
//       <OnboardingFlow 
//         onComplete={() => {
//           setShowOnboarding(false);
//           setCurrentView('quiz');
//         }}
//       />
//     );
//   }

//   if (showAuth) {
//     return (
//       <AuthScreens
//         onAuthenticate={handleAuthenticate}
//         onCancel={() => setShowAuth(false)}
//       />
//     );
//   }

//   // Show email verification as full page after quiz completion
//   if (showEmailVerification && quizResults) {
//     return (
//       <EmailVerificationPage
//         onVerified={handleEmailVerified}
//         onCancel={() => {
//           setShowEmailVerification(false);
//           setCurrentView('home');
//         }}
//       />
//     );
//   }

//   // Show short results preview if email is verified
//   if (showShortResults && quizResults && verifiedEmail) {
//     return (
//       <ShortResultsPreview
//         results={quizResults}
//         userEmail={verifiedEmail}
//         onGetFullReport={handleGetFullReport}
//         onViewChange={handleViewChange}
//       />
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white">
      
//       <Navigation 
//         currentView={currentView}
//         onViewChange={handleViewChange}
//         isAuthenticated={isAuthenticated}
//         onAuthToggle={handleAuthToggle}
//       />
      
//       {currentView === 'home' && (
//         <Home onViewChange={handleViewChange} />
//       )}
      
//       {currentView === 'about' && (
//         <About onViewChange={handleViewChange} />
//       )}
      
//       {currentView === 'courses' && (
//         <Courses onViewChange={handleViewChange} isAuthenticated={isAuthenticated} />
//       )}
      
//       {currentView === 'quiz' && (() => {
//         // Check if user is in 7-day cooldown period
//         if (quizResults && quizCompletedAt) {
//           const daysSinceCompletion = (new Date().getTime() - quizCompletedAt.getTime()) / (1000 * 60 * 60 * 24);
//           if (daysSinceCompletion < 7) {
//             return (
//               <QuizCooldownMessage 
//                 completedAt={quizCompletedAt}
//                 onViewDashboard={() => setCurrentView('dashboard')}
//               />
//             );
//           }
//         }
//         // Show quiz if no cooldown or cooldown expired
//         return (
//           <NewEDNAQuiz 
//             onComplete={handleQuizComplete}
//             onBackToHome={() => setCurrentView('home')}
//           />
//         );
//       })()}
      
//       {currentView === 'results' && quizResults && (
//         <EDNAResultsPage 
//           results={quizResults}
//           onViewChange={handleViewChange}
//           onRetakeQuiz={handleRetakeQuiz}
//         />
//       )}
      
//       {currentView === 'dashboard' && isAuthenticated && (
//         <ResultsDashboard 
//           profile={quizResults}
//           userEmail={user?.email || ''}
//         />
//       )}
      
//       {currentView === 'chat' && isAuthenticated && (
//         <AIMentorHub />
//       )}
      
//       {currentView === 'insights' && quizResults && (
//         <ProfileInsights results={quizResults} />
//       )}
//     </div>
//   );
// }