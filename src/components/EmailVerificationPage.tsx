import { useState } from 'react';
import { supabase } from '../utils/supabase/client';
import { BACKEND_URL } from '../config';

interface EmailVerificationPageProps {
  onVerified: (email: string) => void;
  onCancel: () => void;
}

export function EmailVerificationPage({ onVerified, onCancel }: EmailVerificationPageProps) {
  const [step, setStep] = useState<'email' | 'otp'>('email');  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Send ONLY OTP to email using Supabase Auth
      // Do NOT send invite email here - it will be sent after OTP verification
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true, // Allow user creation
        }
      });

      if (error) throw error;

      // Move to OTP verification step
      setStep('otp');
    } catch (err: any) {
      setError(err.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Step 1: Verify OTP
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: 'email'
      });

      if (error) throw error;

      console.log('✅ Supabase OTP verified successfully');

      // Step 2: Call onVerified FIRST to set showShortResults = true
      // This MUST happen BEFORE signOut() so the auth listener sees the correct state
      console.log('✅ Calling onVerified to show short results');
      onVerified(email);

      // Step 3: Sign out user after setting showShortResults
      // User should NOT be logged in until they set a password
      // The auth listener will check showShortResultsRef and NOT clear quiz results
      try {
        await supabase.auth.signOut();
        console.log('🚪 User logged out - password must be set first');
      } catch (signOutErr) {
        console.log('⚠️ Sign out failed (non-critical):', signOutErr);
      }

      // Step 4: Send password reset email in background (non-blocking)
      // This allows user to set their password after account creation
      supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      }).then(({ error: resetError }) => {
        if (resetError) {
          console.error('⚠️ Failed to send password reset email:', resetError);
        } else {
          console.log('✅ Password reset email sent successfully');
        }
      }).catch((resetErr) => {
        // Log but don't block - OTP already verified
        console.log('⚠️ Password reset email failed (non-critical):', resetErr);
      });
    } catch (err: any) {
      setError(err.message || 'Invalid verification code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
            <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            E-DNA Quiz Complete!
          </h1>
          <p className="text-xl text-gray-600">
            Verify your email to see your results
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {step === 'email' ? (
            <div className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Verify Your Email
                </h2>
                <p className="text-lg text-gray-600">
                  Enter your email address to receive your personalized E-DNA results
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition"
                    placeholder="your@email.com"
                    required
                    disabled={loading}
                    autoFocus
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

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onCancel}
                    className="flex-1 px-8 py-4 text-lg border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg"
                    disabled={loading || !email}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Verification Code'
                    )}
                  </button>
                </div>
              </form>

              <div className="mt-8 p-6 bg-blue-50 rounded-xl">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Why do we need your email?
                    </h4>
                    <p className="text-blue-800 text-sm">
                      We'll send you a verification code to confirm your email address. 
                      This ensures you receive your personalized E-DNA results and full report after purchase.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Enter Verification Code
                </h2>
                <p className="text-lg text-gray-600">
                  We sent a 6-digit code to
                </p>
                <p className="text-lg font-semibold text-purple-600 mt-1">
                  {email}
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-3">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-6 py-4 text-3xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-center tracking-[0.5em] font-mono transition"
                    placeholder="000000"
                    maxLength={6}
                    required
                    disabled={loading}
                    autoFocus
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Enter the 6-digit code from your email
                  </p>
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

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('email');
                      setOtp('');
                      setError('');
                    }}
                    className="flex-1 px-8 py-4 text-lg border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
                    disabled={loading}
                  >
                    Change Email
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      'Verify Email'
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setStep('email');
                    setOtp('');
                    setError('');
                  }}
                  className="w-full text-purple-600 hover:text-purple-700 font-medium transition mt-4"
                  disabled={loading}
                >
                  Didn't receive the code? Resend
                </button>
              </form>

              <div className="mt-8 p-6 bg-green-50 rounded-xl">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">
                      Check your inbox
                    </h4>
                    <p className="text-green-800 text-sm">
                      The verification code was sent to your email. 
                      It may take a minute to arrive. Check your spam folder if you don't see it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p className="text-sm">
            Your privacy is important to us. We'll never share your email address.
          </p>
        </div>
      </div>
    </div>
  );
}


// import { useState } from 'react';
// import { supabase } from '../utils/supabase/client';
// import { BACKEND_URL } from '../config';

// interface EmailVerificationPageProps {
//   onVerified: (email: string) => void;
//   onCancel: () => void;
// }

// export function EmailVerificationPage({ onVerified, onCancel }: EmailVerificationPageProps) {
//   const [step, setStep] = useState<'email' | 'otp'>('email');  
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Send ONLY OTP to email using Supabase Auth
//       // Do NOT send invite email here - it will be sent after OTP verification
//       const { error } = await supabase.auth.signInWithOtp({
//         email,
//         options: {
//           shouldCreateUser: true, // Allow user creation
//         }
//       });

//       if (error) throw error;

//       // Move to OTP verification step
//       setStep('otp');
//     } catch (err: any) {
//       setError(err.message || 'Failed to send verification code');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       // Step 1: Verify OTP
//       const { error } = await supabase.auth.verifyOtp({
//         email,
//         token: otp,
//         type: 'email'
//       });

//       if (error) throw error;

//       // Step 2: Send password reset email (after OTP verification)
//       // This allows user to set their password after account creation
//       try {
//         const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
//           redirectTo: `${window.location.origin}/reset-password`
//         });

//         if (resetError) {
//           console.error('⚠️ Failed to send password reset email:', resetError);
//         } else {
//           console.log('✅ Password reset email sent successfully');
//         }
//       } catch (resetErr) {
//         // Log but don't block - OTP already verified
//         console.log('⚠️ Password reset email failed (non-critical):', resetErr);
//       }

//       // Step 3: Email verified successfully - show results
//       onVerified(email);
//     } catch (err: any) {
//       setError(err.message || 'Invalid verification code');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//       <div className="w-full max-w-2xl">
//         {/* Logo/Brand */}
//         <div className="text-center mb-8">
//           <div className="inline-block p-4 bg-white rounded-full shadow-lg mb-4">
//             <svg className="w-16 h-16 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//             </svg>
//           </div>
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             E-DNA Quiz Complete!
//           </h1>
//           <p className="text-xl text-gray-600">
//             Verify your email to see your results
//           </p>
//         </div>

//         {/* Main Card */}
//         <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
//           {step === 'email' ? (
//             <div className="p-12">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   Verify Your Email
//                 </h2>
//                 <p className="text-lg text-gray-600">
//                   Enter your email address to receive your personalized E-DNA results
//                 </p>
//               </div>

//               <form onSubmit={handleSendOTP} className="space-y-6">
//                 <div>
//                   <label className="block text-lg font-medium text-gray-700 mb-3">
//                     Email Address
//                   </label>
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="w-full px-6 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition"
//                     placeholder="your@email.com"
//                     required
//                     disabled={loading}
//                     autoFocus
//                   />
//                 </div>

//                 {error && (
//                   <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600">
//                     <div className="flex items-start gap-3">
//                       <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                       <span>{error}</span>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={onCancel}
//                     className="flex-1 px-8 py-4 text-lg border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
//                     disabled={loading}
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg"
//                     disabled={loading || !email}
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Sending...
//                       </span>
//                     ) : (
//                       'Send Verification Code'
//                     )}
//                   </button>
//                 </div>
//               </form>

//               <div className="mt-8 p-6 bg-blue-50 rounded-xl">
//                 <div className="flex gap-3">
//                   <svg className="w-6 h-6 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   <div>
//                     <h4 className="font-semibold text-blue-900 mb-1">
//                       Why do we need your email?
//                     </h4>
//                     <p className="text-blue-800 text-sm">
//                       We'll send you a verification code to confirm your email address. 
//                       This ensures you receive your personalized E-DNA results and full report after purchase.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="p-12">
//               <div className="text-center mb-8">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-3">
//                   Enter Verification Code
//                 </h2>
//                 <p className="text-lg text-gray-600">
//                   We sent a 6-digit code to
//                 </p>
//                 <p className="text-lg font-semibold text-purple-600 mt-1">
//                   {email}
//                 </p>
//               </div>

//               <form onSubmit={handleVerifyOTP} className="space-y-6">
//                 <div>
//                   <label className="block text-lg font-medium text-gray-700 mb-3">
//                     Verification Code
//                   </label>
//                   <input
//                     type="text"
//                     value={otp}
//                     onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                     className="w-full px-6 py-4 text-3xl border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 text-center tracking-[0.5em] font-mono transition"
//                     placeholder="000000"
//                     maxLength={6}
//                     required
//                     disabled={loading}
//                     autoFocus
//                   />
//                   <p className="text-sm text-gray-500 mt-2 text-center">
//                     Enter the 6-digit code from your email
//                   </p>
//                 </div>

//                 {error && (
//                   <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600">
//                     <div className="flex items-start gap-3">
//                       <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//                       </svg>
//                       <span>{error}</span>
//                     </div>
//                   </div>
//                 )}

//                 <div className="flex gap-4 pt-4">
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setStep('email');
//                       setOtp('');
//                       setError('');
//                     }}
//                     className="flex-1 px-8 py-4 text-lg border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 transition"
//                     disabled={loading}
//                   >
//                     Change Email
//                   </button>
//                   <button
//                     type="submit"
//                     className="flex-1 px-8 py-4 text-lg bg-gradient-to-r from-purple-600 to-orange-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 shadow-lg"
//                     disabled={loading || otp.length !== 6}
//                   >
//                     {loading ? (
//                       <span className="flex items-center justify-center gap-2">
//                         <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//                           <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//                           <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//                         </svg>
//                         Verifying...
//                       </span>
//                     ) : (
//                       'Verify Email'
//                     )}
//                   </button>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setStep('email');
//                     setOtp('');
//                     setError('');
//                   }}
//                   className="w-full text-purple-600 hover:text-purple-700 font-medium transition mt-4"
//                   disabled={loading}
//                 >
//                   Didn't receive the code? Resend
//                 </button>
//               </form>

//               <div className="mt-8 p-6 bg-green-50 rounded-xl">
//                 <div className="flex gap-3">
//                   <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//                   </svg>
//                   <div>
//                     <h4 className="font-semibold text-green-900 mb-1">
//                       Check your inbox
//                     </h4>
//                     <p className="text-green-800 text-sm">
//                       The verification code was sent to your email. 
//                       It may take a minute to arrive. Check your spam folder if you don't see it.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-8 text-gray-500">
//           <p className="text-sm">
//             Your privacy is important to us. We'll never share your email address.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
