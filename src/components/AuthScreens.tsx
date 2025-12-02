import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Alert, AlertDescription } from './ui/alert';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { authHelpers } from '../utils/supabase/client';

interface AuthScreensProps {
  onAuthenticate: (user: { email: string; name: string }) => void;
  onCancel: () => void;
  initialMode?: 'login' | 'register' | 'forgot-password' | 'reset-success';
}

type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-success';

export function AuthScreens({ onAuthenticate, onCancel, initialMode = 'login' }: AuthScreensProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (mode === 'register') {
      if (!formData.firstName || !formData.lastName) {
        setError('Please enter your full name');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    } else if (mode === 'login') {
      if (!formData.password) {
        setError('Please enter your password');
        return false;
      }
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      if (mode === 'login') {
        // Real Supabase login
        const { data, error } = await authHelpers.signIn(formData.email, formData.password);
        
        if (error) {
          setError(error.message || 'Invalid email or password');
          setIsLoading(false);
          return;
        }
        
        if (data.user) {
          onAuthenticate({
            email: data.user.email || '',
            name: data.user.user_metadata?.name || 'User'
          });
        }
      } else if (mode === 'register') {
        // Real Supabase registration
        const fullName = `${formData.firstName} ${formData.lastName}`;
        const { data, error } = await authHelpers.signUp(
          formData.email, 
          formData.password,
          fullName
        );
        
        if (error) {
          // Check if it's a duplicate email error
          const errorCode = (error as any).error || '';
          const errorMsg = error.message || 'Registration failed';
          
          // Detect duplicate email errors from various sources
          if (errorCode === 'EMAIL_ALREADY_EXISTS' || 
              errorMsg.toLowerCase().includes('already') || 
              errorMsg.toLowerCase().includes('registered') ||
              errorMsg.toLowerCase().includes('duplicate') ||
              errorMsg.toLowerCase().includes('exists')) {
            setError('This email is already registered. Please sign in instead.');
            // Auto-switch to login after 2.5 seconds
            setTimeout(() => {
              setMode('login');
              setError('');
            }, 2500);
          } else {
            setError(errorMsg);
          }
          setIsLoading(false);
          return;
        }
        
        if (data.user) {
          // Check if email confirmation is required
          if (data.user.identities && data.user.identities.length === 0) {
            setError('Please check your email to confirm your account before signing in.');
            setMode('login');
            setIsLoading(false);
            return;
          }
          
          onAuthenticate({
            email: data.user.email || '',
            name: fullName
          });
        }
      } else if (mode === 'forgot-password') {
        // Send password reset email via Supabase
        const { error } = await authHelpers.resetPassword(formData.email);
        
        if (error) {
          setError(error.message || 'Failed to send reset email');
          setIsLoading(false);
          return;
        }
        
        setMode('reset-success');
      }
      
      setIsLoading(false);
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(err.message || 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  const renderLoginForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setMode('forgot-password')}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Forgot password?
        </button>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      
      <div className="text-center">
        <span className="text-sm text-gray-600">Don't have an account? </span>
        <button
          type="button"
          onClick={() => setMode('register')}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Sign up
        </button>
      </div>
    </form>
  );

  const renderRegisterForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              id="firstName"
              placeholder="First name"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            required
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
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-10 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-gray-500">Must be at least 8 characters</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      
      {error && (
        <Alert 
          variant={error.includes('already registered') ? 'default' : 'destructive'} 
          className={error.includes('already registered') ? 'border-blue-500 bg-blue-50 text-blue-900' : ''}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {error}
            {error.includes('already registered') && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-sm">Redirecting to sign in...</span>
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError('');
                  }}
                  className="text-sm text-purple-600 hover:text-purple-700 underline"
                >
                  Go now →
                </button>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Creating account...' : 'Create Account'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      
      <div className="text-center">
        <span className="text-sm text-gray-600">Already have an account? </span>
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-sm text-purple-600 hover:text-purple-700"
        >
          Sign in
        </button>
      </div>
    </form>
  );

  const renderForgotPasswordForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
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
          />
        </div>
        <p className="text-sm text-gray-500">
          We'll send you a link to reset your password
        </p>
      </div>
      
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Button 
        type="submit" 
        className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
      
      <div className="text-center">
        <button
          type="button"
          onClick={() => setMode('login')}
          className="text-sm text-purple-600 hover:text-purple-700 flex items-center justify-center space-x-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to login</span>
        </button>
      </div>
    </form>
  );

  const renderResetSuccess = () => (
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      <div>
        <h3 className="text-lg mb-2">Check your email</h3>
        <p className="text-gray-600 text-sm">
          We've sent a password reset link to {formData.email}
        </p>
      </div>
      <Button 
        onClick={() => setMode('login')}
        variant="outline"
        className="w-full"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to login
      </Button>
    </div>
  );

  const getTitle = () => {
    switch (mode) {
      case 'login': return 'Welcome Back';
      case 'register': return 'Create Account';
      case 'forgot-password': return 'Reset Password';
      case 'reset-success': return 'Email Sent';
      default: return 'Sign In';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'login': return 'Sign in to access your personalized learning dashboard';
      case 'register': return 'Join thousands of entrepreneurs scaling their businesses';
      case 'forgot-password': return 'Enter your email to receive a password reset link';
      case 'reset-success': return '';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center space-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">{getTitle()}</CardTitle>
            {getDescription() && (
              <CardDescription className="text-base">
                {getDescription()}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="space-y-6">
            {mode === 'login' && renderLoginForm()}
            {mode === 'register' && renderRegisterForm()}
            {mode === 'forgot-password' && renderForgotPasswordForm()}
            {mode === 'reset-success' && renderResetSuccess()}

            <div className="text-center">
              <button
                onClick={onCancel}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                ← Back to homepage
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
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
//   Lock, 
//   Eye, 
//   EyeOff, 
//   User, 
//   ArrowRight, 
//   CheckCircle, 
//   AlertCircle,
//   ArrowLeft
// } from 'lucide-react';
// import { authHelpers } from '../utils/supabase/client';

// interface AuthScreensProps {
//   onAuthenticate: (user: { email: string; name: string }) => void;
//   onCancel: () => void;
// }

// type AuthMode = 'login' | 'register' | 'forgot-password' | 'reset-success';

// export function AuthScreens({ onAuthenticate, onCancel }: AuthScreensProps) {
//   const [mode, setMode] = useState<AuthMode>('login');
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     confirmPassword: '',
//     firstName: '',
//     lastName: ''
//   });

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     setError(''); // Clear error when user starts typing
//   };

//   const validateForm = () => {
//     if (!formData.email || !formData.email.includes('@')) {
//       setError('Please enter a valid email address');
//       return false;
//     }
    
//     if (mode === 'register') {
//       if (!formData.firstName || !formData.lastName) {
//         setError('Please enter your full name');
//         return false;
//       }
//       if (formData.password.length < 8) {
//         setError('Password must be at least 8 characters long');
//         return false;
//       }
//       if (formData.password !== formData.confirmPassword) {
//         setError('Passwords do not match');
//         return false;
//       }
//     } else if (mode === 'login') {
//       if (!formData.password) {
//         setError('Please enter your password');
//         return false;
//       }
//     }
    
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;
    
//     setIsLoading(true);
//     setError('');
    
//     try {
//       if (mode === 'login') {
//         // Real Supabase login
//         const { data, error } = await authHelpers.signIn(formData.email, formData.password);
        
//         if (error) {
//           setError(error.message || 'Invalid email or password');
//           setIsLoading(false);
//           return;
//         }
        
//         if (data.user) {
//           onAuthenticate({
//             email: data.user.email || '',
//             name: data.user.user_metadata?.name || 'User'
//           });
//         }
//       } else if (mode === 'register') {
//         // Real Supabase registration
//         const fullName = `${formData.firstName} ${formData.lastName}`;
//         const { data, error } = await authHelpers.signUp(
//           formData.email, 
//           formData.password,
//           fullName
//         );
        
//         if (error) {
//           // Check if it's a duplicate email error
//           const errorCode = (error as any).error || '';
//           const errorMsg = error.message || 'Registration failed';
          
//           // Detect duplicate email errors from various sources
//           if (errorCode === 'EMAIL_ALREADY_EXISTS' || 
//               errorMsg.toLowerCase().includes('already') || 
//               errorMsg.toLowerCase().includes('registered') ||
//               errorMsg.toLowerCase().includes('duplicate') ||
//               errorMsg.toLowerCase().includes('exists')) {
//             setError('This email is already registered. Please sign in instead.');
//             // Auto-switch to login after 2.5 seconds
//             setTimeout(() => {
//               setMode('login');
//               setError('');
//             }, 2500);
//           } else {
//             setError(errorMsg);
//           }
//           setIsLoading(false);
//           return;
//         }
        
//         if (data.user) {
//           // Check if email confirmation is required
//           if (data.user.identities && data.user.identities.length === 0) {
//             setError('Please check your email to confirm your account before signing in.');
//             setMode('login');
//             setIsLoading(false);
//             return;
//           }
          
//           onAuthenticate({
//             email: data.user.email || '',
//             name: fullName
//           });
//         }
//       } else if (mode === 'forgot-password') {
//         // For now, show success (real password reset would need email configuration)
//         setMode('reset-success');
//       }
      
//       setIsLoading(false);
//     } catch (err: any) {
//       console.error('Auth error:', err);
//       setError(err.message || 'An unexpected error occurred');
//       setIsLoading(false);
//     }
//   };

//   const renderLoginForm = () => (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={(e) => handleInputChange('email', e.target.value)}
//             className="pl-10"
//             required
//           />
//         </div>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             id="password"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={(e) => handleInputChange('password', e.target.value)}
//             className="pl-10 pr-10"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//           </button>
//         </div>
//       </div>
      
//       <div className="flex items-center justify-between">
//         <button
//           type="button"
//           onClick={() => setMode('forgot-password')}
//           className="text-sm text-purple-600 hover:text-purple-700"
//         >
//           Forgot password?
//         </button>
//       </div>
      
//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}
      
//       <Button 
//         type="submit" 
//         className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Signing in...' : 'Sign In'}
//         <ArrowRight className="w-4 h-4 ml-2" />
//       </Button>
      
//       <div className="text-center">
//         <span className="text-sm text-gray-600">Don't have an account? </span>
//         <button
//           type="button"
//           onClick={() => setMode('register')}
//           className="text-sm text-purple-600 hover:text-purple-700"
//         >
//           Sign up
//         </button>
//       </div>
//     </form>
//   );

//   const renderRegisterForm = () => (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="grid grid-cols-2 gap-4">
//         <div className="space-y-2">
//           <Label htmlFor="firstName">First Name</Label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               id="firstName"
//               placeholder="First name"
//               value={formData.firstName}
//               onChange={(e) => handleInputChange('firstName', e.target.value)}
//               className="pl-10"
//               required
//             />
//           </div>
//         </div>
//         <div className="space-y-2">
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             placeholder="Last name"
//             value={formData.lastName}
//             onChange={(e) => handleInputChange('lastName', e.target.value)}
//             required
//           />
//         </div>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={(e) => handleInputChange('email', e.target.value)}
//             className="pl-10"
//             required
//           />
//         </div>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="password">Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             id="password"
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Create a password"
//             value={formData.password}
//             onChange={(e) => handleInputChange('password', e.target.value)}
//             className="pl-10 pr-10"
//             required
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//           >
//             {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//           </button>
//         </div>
//         <p className="text-xs text-gray-500">Must be at least 8 characters</p>
//       </div>
      
//       <div className="space-y-2">
//         <Label htmlFor="confirmPassword">Confirm Password</Label>
//         <div className="relative">
//           <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             id="confirmPassword"
//             type="password"
//             placeholder="Confirm your password"
//             value={formData.confirmPassword}
//             onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
//             className="pl-10"
//             required
//           />
//         </div>
//       </div>
      
//       {error && (
//         <Alert 
//           variant={error.includes('already registered') ? 'default' : 'destructive'} 
//           className={error.includes('already registered') ? 'border-blue-500 bg-blue-50 text-blue-900' : ''}
//         >
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>
//             {error}
//             {error.includes('already registered') && (
//               <div className="mt-3 flex items-center gap-2">
//                 <span className="text-sm">Redirecting to sign in...</span>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setMode('login');
//                     setError('');
//                   }}
//                   className="text-sm text-purple-600 hover:text-purple-700 underline"
//                 >
//                   Go now →
//                 </button>
//               </div>
//             )}
//           </AlertDescription>
//         </Alert>
//       )}
      
//       <Button 
//         type="submit" 
//         className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Creating account...' : 'Create Account'}
//         <ArrowRight className="w-4 h-4 ml-2" />
//       </Button>
      
//       <div className="text-center">
//         <span className="text-sm text-gray-600">Already have an account? </span>
//         <button
//           type="button"
//           onClick={() => setMode('login')}
//           className="text-sm text-purple-600 hover:text-purple-700"
//         >
//           Sign in
//         </button>
//       </div>
//     </form>
//   );

//   const renderForgotPasswordForm = () => (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div className="space-y-2">
//         <Label htmlFor="email">Email</Label>
//         <div className="relative">
//           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//           <Input
//             id="email"
//             type="email"
//             placeholder="Enter your email"
//             value={formData.email}
//             onChange={(e) => handleInputChange('email', e.target.value)}
//             className="pl-10"
//             required
//           />
//         </div>
//         <p className="text-sm text-gray-500">
//           We'll send you a link to reset your password
//         </p>
//       </div>
      
//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}
      
//       <Button 
//         type="submit" 
//         className="w-full bg-gradient-to-r from-purple-600 to-orange-500 text-white"
//         disabled={isLoading}
//       >
//         {isLoading ? 'Sending...' : 'Send Reset Link'}
//         <ArrowRight className="w-4 h-4 ml-2" />
//       </Button>
      
//       <div className="text-center">
//         <button
//           type="button"
//           onClick={() => setMode('login')}
//           className="text-sm text-purple-600 hover:text-purple-700 flex items-center justify-center space-x-1"
//         >
//           <ArrowLeft className="w-4 h-4" />
//           <span>Back to login</span>
//         </button>
//       </div>
//     </form>
//   );

//   const renderResetSuccess = () => (
//     <div className="text-center space-y-4">
//       <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
//         <CheckCircle className="w-8 h-8 text-green-600" />
//       </div>
//       <div>
//         <h3 className="text-lg mb-2">Check your email</h3>
//         <p className="text-gray-600 text-sm">
//           We've sent a password reset link to {formData.email}
//         </p>
//       </div>
//       <Button 
//         onClick={() => setMode('login')}
//         variant="outline"
//         className="w-full"
//       >
//         <ArrowLeft className="w-4 h-4 mr-2" />
//         Back to login
//       </Button>
//     </div>
//   );

//   const getTitle = () => {
//     switch (mode) {
//       case 'login': return 'Welcome Back';
//       case 'register': return 'Create Account';
//       case 'forgot-password': return 'Reset Password';
//       case 'reset-success': return 'Email Sent';
//       default: return 'Sign In';
//     }
//   };

//   const getDescription = () => {
//     switch (mode) {
//       case 'login': return 'Sign in to access your personalized learning dashboard';
//       case 'register': return 'Join thousands of entrepreneurs scaling their businesses';
//       case 'forgot-password': return 'Enter your email to receive a password reset link';
//       case 'reset-success': return '';
//       default: return '';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <Card className="shadow-lg">
//           <CardHeader className="text-center space-y-2">
//             <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <CardTitle className="text-2xl">{getTitle()}</CardTitle>
//             {getDescription() && (
//               <CardDescription className="text-base">
//                 {getDescription()}
//               </CardDescription>
//             )}
//           </CardHeader>
          
//           <CardContent className="space-y-6">
//             {mode === 'login' && renderLoginForm()}
//             {mode === 'register' && renderRegisterForm()}
//             {mode === 'forgot-password' && renderForgotPasswordForm()}
//             {mode === 'reset-success' && renderResetSuccess()}

//             <div className="text-center">
//               <button
//                 onClick={onCancel}
//                 className="text-sm text-gray-500 hover:text-gray-700"
//               >
//                 ← Back to homepage
//               </button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }