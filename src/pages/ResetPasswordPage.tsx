import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase/client';

export function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Handle Supabase auth hash fragments (access_token, etc.)
    const handleAuthHash = async () => {
      // Check if there's a hash fragment with auth tokens or errors
      if (window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const error = hashParams.get('error');
        const errorDescription = hashParams.get('error_description');
        const errorCode = hashParams.get('error_code');
        
        // Handle errors from hash fragment
        if (error) {
          console.error('Auth error from hash:', { error, errorDescription, errorCode });
          
          if (errorCode === 'otp_expired' || errorDescription?.includes('expired')) {
            setError('This password reset link has expired. Please request a new password reset link from the login page.');
          } else if (error === 'access_denied') {
            setError('Access denied. The reset link may be invalid or expired. Please request a new one from the login page.');
          } else {
            setError(errorDescription || 'Invalid reset link. Please request a new one from the login page.');
          }
          
          // Clear the hash fragment to clean up the URL
          window.history.replaceState(null, '', window.location.pathname);
          // Don't return - let the page render with the error message
        }
        
        // If we have an access_token, Supabase will process it automatically
        // Wait a moment for Supabase to process the hash fragment and create a session
        const hasAccessToken = hashParams.get('access_token') || hashParams.get('type') === 'recovery';
        
        if (hasAccessToken) {
          // Wait for Supabase to process the hash fragment (it does this automatically)
          // Give it time to exchange the token for a session
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          // Clear the hash fragment after processing
          window.history.replaceState(null, '', window.location.pathname);
        }
      }
      
      // Check if we have a valid session with recovery token
      // Wait a bit more to ensure Supabase has processed the hash
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        console.error('Session error:', sessionError);
        setError('Failed to verify reset link. Please request a new one.');
        return;
      }
      
      if (!session) {
        // No session after processing hash - link is invalid/expired
        // But don't show error immediately if we just processed a hash
        // Give it one more try
        setTimeout(async () => {
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          if (!retrySession) {
            setError('Invalid or expired reset link. Please request a new password reset link from the login page.');
          }
        }, 1000);
      } else {
        console.log('✅ Valid session found for password reset');
      }
    };

    handleAuthHash();
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Update password using Supabase
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      console.log('✅ Password updated successfully');
      
      // Clear pending quiz results from localStorage
      // User has set password, so they should login to see dashboard (not short results)
      localStorage.removeItem('pendingQuizResults');
      localStorage.removeItem('pendingVerifiedEmail');
      console.log('✅ Cleared pending quiz results from localStorage');
      
      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);

    } catch (err: any) {
      console.error('❌ Error updating password:', err);
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-6">
              <svg className="w-16 h-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Password Set Successfully!
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Your password has been updated. You can now log in to access your E-DNA results.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Set Your Password
          </h1>
          <p className="text-lg text-gray-600">
            Create a secure password for your E-DNA account
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <form onSubmit={handleResetPassword} className="space-y-6">
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition"
                placeholder="Enter new password"
                required
                disabled={loading}
                autoFocus
                minLength={6}
              />
              <p className="text-sm text-gray-500 mt-2">
                Must be at least 6 characters long
              </p>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700 mb-3">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition"
                placeholder="Confirm new password"
                required
                disabled={loading}
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg"
              disabled={loading || !password || !confirmPassword}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Setting Password...
                </span>
              ) : (
                'Set Password'
              )}
            </button>
          </form>

          <div className="mt-8 p-6 bg-purple-50 rounded-xl">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">
                  Password Requirements
                </h4>
                <ul className="text-purple-800 text-sm space-y-1">
                  <li>• At least 6 characters long</li>
                  <li>• Use a unique password you don't use elsewhere</li>
                  <li>• Consider using a mix of letters, numbers, and symbols</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <button
            onClick={() => window.location.href = '/'}
            className="text-purple-600 hover:text-purple-700 font-medium transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
