import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import {
  Mail,
  User,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Home as HomeIcon,
  ArrowLeft,
  RefreshCw
} from 'lucide-react';
import { authHelpers, supabase } from '../utils/supabase/client';

interface SignupPageProps {
  onSuccess?: () => void;
}

type SignupStep = 'signup' | 'verify-otp' | 'success';

export function SignupPage({ onSuccess }: SignupPageProps) {
  const [step, setStep] = useState<SignupStep>('signup');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.firstName || !formData.lastName) {
      setError('Please enter your first and last name');
      return false;
    }

    return true;
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      // Check if user already exists
      const { data: existingUsers } = await supabase
        .from('auth.users')
        .select('email')
        .eq('email', formData.email)
        .limit(1);

      // Try to sign in with OTP to check if account exists
      const { data: signInData, error: signInError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: false // Don't create user yet
        }
      });

      // If no error, it means either user exists or OTP was sent
      // We'll send OTP regardless and handle account creation after verification
      if (!signInError) {
        // Move to OTP verification step
        setStep('verify-otp');
      } else {
        throw signInError;
      }
    } catch (err: any) {
      console.error('OTP send error:', err);
      if (err.message?.includes('User already registered')) {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setError(err.message || 'Failed to send verification code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Step 1: Verify OTP
      const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
        email: formData.email,
        token: otp,
        type: 'email'
      });

      if (verifyError) {
        throw verifyError;
      }

      // Step 2: Check if user already has an account
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // User already exists, just verified email
        setStep('success');
        setTimeout(() => {
          if (onSuccess) {
            onSuccess();
          } else {
            window.location.href = '/';
          }
        }, 2000);
        return;
      }

      // Step 3: Create account without password (email is verified)
      const fullName = `${formData.firstName} ${formData.lastName}`;
      
      // Generate a random temporary password
      const tempPassword = Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-16);
      
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: tempPassword,
        options: {
          data: {
            full_name: fullName,
            first_name: formData.firstName,
            last_name: formData.lastName
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Step 4: Immediately send password reset email
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        formData.email,
        {
          redirectTo: `${window.location.origin}/reset-password`
        }
      );

      if (resetError) {
        console.error('Password reset email error:', resetError);
        // Don't throw - account is created, just log the error
      }

      // Success! Move to success screen
      setStep('success');

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        } else {
          window.location.href = '/';
        }
      }, 3000);

    } catch (err: any) {
      console.error('Verification error:', err);
      if (err.message?.includes('already registered')) {
        setError('This email is already registered. Please sign in instead.');
      } else {
        setError(err.message || 'Invalid verification code. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');
    setOtp('');

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          shouldCreateUser: false
        }
      });

      if (otpError) {
        throw otpError;
      }

      // Show success message
      setError('');
      alert('Verification code sent! Check your email.');
    } catch (err: any) {
      console.error('Resend OTP error:', err);
      setError(err.message || 'Failed to resend code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Success Screen
  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Account Created!</CardTitle>
            <CardDescription className="space-y-2">
              <p>Welcome to Brandscaling!</p>
              <p className="text-sm">
                Check your email for a link to set your password.
              </p>
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  // OTP Verification Screen
  if (step === 'verify-otp') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              We sent a 6-digit code to <br />
              <span className="font-semibold text-purple-600">{formData.email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="text-center text-2xl tracking-widest font-mono"
                  maxLength={6}
                  required
                  disabled={isLoading}
                  autoFocus
                />
                <p className="text-xs text-gray-500 text-center">
                  Enter the 6-digit code from your email
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
                disabled={isLoading || otp.length !== 6}
              >
                {isLoading ? (
                  'Creating Account...'
                ) : (
                  <>
                    Verify & Create Account
                    <CheckCircle className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setStep('signup');
                    setOtp('');
                    setError('');
                  }}
                  className="text-gray-600 hover:text-gray-800 inline-flex items-center"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to signup
                </button>
                <button
                  type="button"
                  onClick={handleResendOTP}
                  className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
                  disabled={isLoading}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Resend code
                </button>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-800">
                  <strong>Tip:</strong> Check your spam folder if you don't see the email.
                  The code may take up to 1 minute to arrive.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Initial Signup Form (No Password)
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl">Create Account</CardTitle>
          <CardDescription>
            Join thousands of entrepreneurs scaling their businesses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContinue} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="pl-10"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-sm text-purple-800">
                <strong>Next step:</strong> We'll send a verification code to your email. 
                After verification, you'll receive a link to set your password.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
              disabled={isLoading}
            >
              {isLoading ? (
                'Sending Verification Code...'
              ) : (
                <>
                  Continue
                  <ArrowRight className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
                  Sign in
                </a>
              </p>
              <a
                href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
              >
                <HomeIcon className="w-4 h-4 mr-1" />
                Back to homepage
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


// import { useState } from 'react';
// import { Button } from './ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Alert, AlertDescription } from './ui/alert';
// import {
//   Mail,
//   User,
//   ArrowRight,
//   CheckCircle,
//   AlertCircle,
//   Home as HomeIcon,
//   ArrowLeft,
//   RefreshCw
// } from 'lucide-react';
// import { authHelpers, supabase } from '../utils/supabase/client';

// interface SignupPageProps {
//   onSuccess?: () => void;
// }

// type SignupStep = 'signup' | 'verify-otp' | 'success';

// export function SignupPage({ onSuccess }: SignupPageProps) {
//   const [step, setStep] = useState<SignupStep>('signup');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [otp, setOtp] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     firstName: '',
//     lastName: ''
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setError('');
//   };

//   const validateForm = () => {
//     if (!formData.email || !formData.email.includes('@')) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     if (!formData.firstName || !formData.lastName) {
//       setError('Please enter your first and last name');
//       return false;
//     }

//     return true;
//   };

//   const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError('');

//     try {
//       // Check if user already exists
//       const { data: existingUsers } = await supabase
//         .from('auth.users')
//         .select('email')
//         .eq('email', formData.email)
//         .limit(1);

//       // Try to sign in with OTP to check if account exists
//       const { data: signInData, error: signInError } = await supabase.auth.signInWithOtp({
//         email: formData.email,
//         options: {
//           shouldCreateUser: false // Don't create user yet
//         }
//       });

//       // If no error, it means either user exists or OTP was sent
//       // We'll send OTP regardless and handle account creation after verification
//       if (!signInError) {
//         // Move to OTP verification step
//         setStep('verify-otp');
//       } else {
//         throw signInError;
//       }
//     } catch (err: any) {
//       console.error('OTP send error:', err);
//       if (err.message?.includes('User already registered')) {
//         setError('An account with this email already exists. Please sign in instead.');
//       } else {
//         setError(err.message || 'Failed to send verification code. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       setError('Please enter a 6-digit code');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       // Step 1: Verify OTP
//       const { data: verifyData, error: verifyError } = await supabase.auth.verifyOtp({
//         email: formData.email,
//         token: otp,
//         type: 'email'
//       });

//       if (verifyError) {
//         throw verifyError;
//       }

//       // Step 2: Check if user already has an account
//       const { data: { user } } = await supabase.auth.getUser();
      
//       if (user) {
//         // User already exists, just verified email
//         setStep('success');
//         setTimeout(() => {
//           if (onSuccess) {
//             onSuccess();
//           } else {
//             window.location.href = '/';
//           }
//         }, 2000);
//         return;
//       }

//       // Step 3: Create account without password (email is verified)
//       const fullName = `${formData.firstName} ${formData.lastName}`;
      
//       // Generate a random temporary password
//       const tempPassword = Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-16);
      
//       const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
//         email: formData.email,
//         password: tempPassword,
//         options: {
//           data: {
//             full_name: fullName,
//             first_name: formData.firstName,
//             last_name: formData.lastName
//           },
//           emailRedirectTo: window.location.origin
//         }
//       });

//       if (signUpError) {
//         throw signUpError;
//       }

//       // Step 4: Immediately send password reset email
//       const { error: resetError } = await supabase.auth.resetPasswordForEmail(
//         formData.email,
//         {
//           redirectTo: `${window.location.origin}/reset-password`
//         }
//       );

//       if (resetError) {
//         console.error('Password reset email error:', resetError);
//         // Don't throw - account is created, just log the error
//       }

//       // Success! Move to success screen
//       setStep('success');

//       setTimeout(() => {
//         if (onSuccess) {
//           onSuccess();
//         } else {
//           window.location.href = '/';
//         }
//       }, 3000);

//     } catch (err: any) {
//       console.error('Verification error:', err);
//       if (err.message?.includes('already registered')) {
//         setError('This email is already registered. Please sign in instead.');
//       } else {
//         setError(err.message || 'Invalid verification code. Please try again.');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setIsLoading(true);
//     setError('');
//     setOtp('');

//     try {
//       const { error: otpError } = await supabase.auth.signInWithOtp({
//         email: formData.email,
//         options: {
//           shouldCreateUser: false
//         }
//       });

//       if (otpError) {
//         throw otpError;
//       }

//       // Show success message
//       setError('');
//       alert('Verification code sent! Check your email.');
//     } catch (err: any) {
//       console.error('Resend OTP error:', err);
//       setError(err.message || 'Failed to resend code. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Success Screen
//   if (step === 'success') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
//               <CheckCircle className="w-8 h-8 text-white" />
//             </div>
//             <CardTitle className="text-2xl">Account Created!</CardTitle>
//             <CardDescription className="space-y-2">
//               <p>Welcome to Brandscaling!</p>
//               <p className="text-sm">
//                 Check your email for a link to set your password.
//               </p>
//             </CardDescription>
//           </CardHeader>
//         </Card>
//       </div>
//     );
//   }

//   // OTP Verification Screen
//   if (step === 'verify-otp') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
//               <Mail className="w-8 h-8 text-white" />
//             </div>
//             <CardTitle className="text-2xl">Verify Your Email</CardTitle>
//             <CardDescription>
//               We sent a 6-digit code to <br />
//               <span className="font-semibold text-purple-600">{formData.email}</span>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleVerifyOTP} className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="otp">Verification Code</Label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   placeholder="000000"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                   className="text-center text-2xl tracking-widest font-mono"
//                   maxLength={6}
//                   required
//                   disabled={isLoading}
//                   autoFocus
//                 />
//                 <p className="text-xs text-gray-500 text-center">
//                   Enter the 6-digit code from your email
//                 </p>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
//                 disabled={isLoading || otp.length !== 6}
//               >
//                 {isLoading ? (
//                   'Creating Account...'
//                 ) : (
//                   <>
//                     Verify & Create Account
//                     <CheckCircle className="ml-2 w-4 h-4" />
//                   </>
//                 )}
//               </Button>

//               <div className="flex items-center justify-between text-sm">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setStep('signup');
//                     setOtp('');
//                     setError('');
//                   }}
//                   className="text-gray-600 hover:text-gray-800 inline-flex items-center"
//                   disabled={isLoading}
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-1" />
//                   Back to signup
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleResendOTP}
//                   className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
//                   disabled={isLoading}
//                 >
//                   <RefreshCw className="w-4 h-4 mr-1" />
//                   Resend code
//                 </button>
//               </div>

//               <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-xs text-blue-800">
//                   <strong>Tip:</strong> Check your spam folder if you don't see the email.
//                   The code may take up to 1 minute to arrive.
//                 </p>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   // Initial Signup Form (No Password)
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
//             <User className="w-8 h-8 text-white" />
//           </div>
//           <CardTitle className="text-2xl">Create Account</CardTitle>
//           <CardDescription>
//             Join thousands of entrepreneurs scaling their businesses
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleContinue} className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="firstName"
//                     type="text"
//                     placeholder="First name"
//                     value={formData.firstName}
//                     onChange={(e) => handleInputChange('firstName', e.target.value)}
//                     className="pl-10"
//                     required
//                     disabled={isLoading}
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   id="lastName"
//                   type="text"
//                   placeholder="Last name"
//                   value={formData.lastName}
//                   onChange={(e) => handleInputChange('lastName', e.target.value)}
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="pl-10"
//                   required
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
//               <p className="text-sm text-purple-800">
//                 <strong>Next step:</strong> We'll send a verification code to your email. 
//                 After verification, you'll receive a link to set your password.
//               </p>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 'Sending Verification Code...'
//               ) : (
//                 <>
//                   Continue
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </>
//               )}
//             </Button>

//             <div className="text-center space-y-2">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
//                   Sign in
//                 </a>
//               </p>
//               <a
//                 href="/"
//                 className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
//               >
//                 <HomeIcon className="w-4 h-4 mr-1" />
//                 Back to homepage
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }


// import { useState } from 'react';
// import { Button } from './ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Alert, AlertDescription } from './ui/alert';
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   User,
//   ArrowRight,
//   CheckCircle,
//   AlertCircle,
//   Home as HomeIcon,
//   ArrowLeft,
//   RefreshCw
// } from 'lucide-react';
// import { authHelpers, supabase } from '../utils/supabase/client';

// interface SignupPageProps {
//   onSuccess?: () => void;
// }

// type SignupStep = 'signup' | 'verify-otp' | 'success';

// export function SignupPage({ onSuccess }: SignupPageProps) {
//   const [step, setStep] = useState<SignupStep>('signup');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [otp, setOtp] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: ''
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setError('');
//   };

//   const validateForm = () => {
//     if (!formData.email || !formData.email.includes('@')) {
//       setError('Please enter a valid email address');
//       return false;
//     }

//     if (!formData.firstName || !formData.lastName) {
//       setError('Please enter your first and last name');
//       return false;
//     }

//     if (formData.password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return false;
//     }

//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }

//     return true;
//   };

//   const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsLoading(true);
//     setError('');

//     try {
//       // Step 1: Send OTP to email (don't create account yet)
//       const { error: otpError } = await supabase.auth.signInWithOtp({
//         email: formData.email,
//         options: {
//           shouldCreateUser: false // Important: don't create user yet
//         }
//       });

//       if (otpError) {
//         throw otpError;
//       }

//       // Move to OTP verification step
//       setStep('verify-otp');
//     } catch (err: any) {
//       console.error('OTP send error:', err);
//       setError(err.message || 'Failed to send verification code. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleVerifyOTP = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (otp.length !== 6) {
//       setError('Please enter a 6-digit code');
//       return;
//     }

//     setIsLoading(true);
//     setError('');

//     try {
//       // Step 2: Verify OTP
//       const { error: verifyError } = await supabase.auth.verifyOtp({
//         email: formData.email,
//         token: otp,
//         type: 'email'
//       });

//       if (verifyError) {
//         throw verifyError;
//       }

//       // Step 3: NOW create the account (email is verified)
//       const fullName = `${formData.firstName} ${formData.lastName}`;
//       const { error: signUpError } = await authHelpers.signUp(
//         formData.email,
//         formData.password,
//         fullName
//       );

//       if (signUpError) {
//         throw signUpError;
//       }

//       // Success! Move to success screen
//       setStep('success');

//       setTimeout(() => {
//         if (onSuccess) {
//           onSuccess();
//         } else {
//           window.location.href = '/';
//         }
//       }, 2000);

//     } catch (err: any) {
//       console.error('Verification error:', err);
//       setError(err.message || 'Invalid verification code. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleResendOTP = async () => {
//     setIsLoading(true);
//     setError('');
//     setOtp('');

//     try {
//       const { error: otpError } = await supabase.auth.signInWithOtp({
//         email: formData.email,
//         options: {
//           shouldCreateUser: false
//         }
//       });

//       if (otpError) {
//         throw otpError;
//       }

//       // Show success message
//       setError('');
//       alert('Verification code sent! Check your email.');
//     } catch (err: any) {
//       console.error('Resend OTP error:', err);
//       setError(err.message || 'Failed to resend code. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Success Screen
//   if (step === 'success') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
//               <CheckCircle className="w-8 h-8 text-white" />
//             </div>
//             <CardTitle className="text-2xl">Account Created!</CardTitle>
//             <CardDescription>
//               Welcome to Brandscaling! Redirecting you to the homepage...
//             </CardDescription>
//           </CardHeader>
//         </Card>
//       </div>
//     );
//   }

//   // OTP Verification Screen
//   if (step === 'verify-otp') {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//         <Card className="w-full max-w-md">
//           <CardHeader className="text-center">
//             <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
//               <Mail className="w-8 h-8 text-white" />
//             </div>
//             <CardTitle className="text-2xl">Verify Your Email</CardTitle>
//             <CardDescription>
//               We sent a 6-digit code to <br />
//               <span className="font-semibold text-purple-600">{formData.email}</span>
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <form onSubmit={handleVerifyOTP} className="space-y-4">
//               {error && (
//                 <Alert variant="destructive">
//                   <AlertCircle className="h-4 w-4" />
//                   <AlertDescription>{error}</AlertDescription>
//                 </Alert>
//               )}

//               <div className="space-y-2">
//                 <Label htmlFor="otp">Verification Code</Label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   placeholder="000000"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
//                   className="text-center text-2xl tracking-widest font-mono"
//                   maxLength={6}
//                   required
//                   disabled={isLoading}
//                   autoFocus
//                 />
//                 <p className="text-xs text-gray-500 text-center">
//                   Enter the 6-digit code from your email
//                 </p>
//               </div>

//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
//                 disabled={isLoading || otp.length !== 6}
//               >
//                 {isLoading ? (
//                   'Verifying...'
//                 ) : (
//                   <>
//                     Verify & Create Account
//                     <CheckCircle className="ml-2 w-4 h-4" />
//                   </>
//                 )}
//               </Button>

//               <div className="flex items-center justify-between text-sm">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setStep('signup');
//                     setOtp('');
//                     setError('');
//                   }}
//                   className="text-gray-600 hover:text-gray-800 inline-flex items-center"
//                   disabled={isLoading}
//                 >
//                   <ArrowLeft className="w-4 h-4 mr-1" />
//                   Back to signup
//                 </button>
//                 <button
//                   type="button"
//                   onClick={handleResendOTP}
//                   className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center"
//                   disabled={isLoading}
//                 >
//                   <RefreshCw className="w-4 h-4 mr-1" />
//                   Resend code
//                 </button>
//               </div>

//               <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
//                 <p className="text-xs text-blue-800">
//                   <strong>Tip:</strong> Check your spam folder if you don't see the email.
//                   The code may take up to 1 minute to arrive.
//                 </p>
//               </div>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-orange-500 rounded-full flex items-center justify-center mb-4">
//             <User className="w-8 h-8 text-white" />
//           </div>
//           <CardTitle className="text-2xl">Create Account</CardTitle>
//           <CardDescription>
//             Join thousands of entrepreneurs scaling their businesses
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleRegister} className="space-y-4">
//             {error && (
//               <Alert variant="destructive">
//                 <AlertCircle className="h-4 w-4" />
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}

//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label htmlFor="firstName">First Name</Label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                   <Input
//                     id="firstName"
//                     type="text"
//                     placeholder="First name"
//                     value={formData.firstName}
//                     onChange={(e) => handleInputChange('firstName', e.target.value)}
//                     className="pl-10"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="lastName">Last Name</Label>
//                 <Input
//                   id="lastName"
//                   type="text"
//                   placeholder="Last name"
//                   value={formData.lastName}
//                   onChange={(e) => handleInputChange('lastName', e.target.value)}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="email">Email</Label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="Enter your email"
//                   value={formData.email}
//                   onChange={(e) => handleInputChange('email', e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="password">Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   id="password"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Create a password"
//                   value={formData.password}
//                   onChange={(e) => handleInputChange('password', e.target.value)}
//                   className="pl-10 pr-10"
//                   required
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                 >
//                   {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                 </button>
//               </div>
//               <p className="text-xs text-gray-500">Must be at least 8 characters</p>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="confirmPassword">Confirm Password</Label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   id="confirmPassword"
//                   type={showPassword ? 'text' : 'password'}
//                   placeholder="Confirm your password"
//                   value={formData.confirmPassword}
//                   onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>

//             <Button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 to-orange-500 hover:from-purple-700 hover:to-orange-600"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 'Sending Verification Code...'
//               ) : (
//                 <>
//                   Continue
//                   <ArrowRight className="ml-2 w-4 h-4" />
//                 </>
//               )}
//             </Button>

//             <div className="text-center space-y-2">
//               <p className="text-sm text-gray-600">
//                 Already have an account?{' '}
//                 <a href="/" className="text-purple-600 hover:text-purple-700 font-medium">
//                   Sign in
//                 </a>
//               </p>
//               <a
//                 href="/"
//                 className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
//               >
//                 <HomeIcon className="w-4 h-4 mr-1" />
//                 Back to homepage
//               </a>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
