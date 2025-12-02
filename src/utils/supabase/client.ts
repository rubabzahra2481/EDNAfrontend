import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Create a single supabase client for the entire app
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

// Auth helper functions
export const authHelpers = {
  // Get current user session
  async getSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      // Handle invalid refresh token errors
      if (error) {
        const errorMsg = error.message?.toLowerCase() || '';
        if (errorMsg.includes('refresh token') || 
            errorMsg.includes('invalid') || 
            errorMsg.includes('expired')) {
          console.log('🔄 Clearing invalid session...');
          // Clear the invalid session
          await supabase.auth.signOut();
          return { session: null, error: null }; // Return null session without error
        }
      }
      
      return { session, error };
    } catch (err: any) {
      // Check if it's a refresh token error
      const errorMsg = err.message?.toLowerCase() || '';
      if (errorMsg.includes('refresh token') || 
          errorMsg.includes('invalid') || 
          errorMsg.includes('expired')) {
        console.log('🔄 Clearing invalid session after error...');
        // Clear the corrupted session
        try {
          await supabase.auth.signOut();
        } catch {
          // If signOut fails, just return null
        }
        return { session: null, error: null };
      }
      
      // Silent fail - return null session
      return { session: null, error: err };
    }
  },

  // Get current user
  async getUser() {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      // Handle invalid refresh token errors
      if (error) {
        const errorMsg = error.message?.toLowerCase() || '';
        if (errorMsg.includes('refresh token') || 
            errorMsg.includes('invalid') || 
            errorMsg.includes('expired')) {
          console.log('🔄 Clearing invalid user session...');
          await supabase.auth.signOut();
          return { user: null, error: null };
        }
      }
      
      return { user, error };
    } catch (err: any) {
      // Check if it's a refresh token error
      const errorMsg = err.message?.toLowerCase() || '';
      if (errorMsg.includes('refresh token') || 
          errorMsg.includes('invalid') || 
          errorMsg.includes('expired')) {
        console.log('🔄 Clearing invalid user session after error...');
        try {
          await supabase.auth.signOut();
        } catch {
          // If signOut fails, just return null
        }
        return { user: null, error: null };
      }
      
      // Silent fail - return null user
      return { user: null, error: err };
    }
  },

  // Sign up new user via server endpoint
  async signUp(email: string, password: string, name: string) {
    try {
      // Call server-side signup endpoint for proper user creation
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1695dddc/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({ email, password, name })
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        const errorMessage = result.message || result.error || 'Failed to create account';
        console.error('Sign up error:', errorMessage);
        return { 
          data: null, 
          error: { 
            message: errorMessage,
            error: result.error, // Pass through error code if available
            status: response.status
          } 
        };
      }

      // After successful signup, sign in the user to get session
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        console.error('Auto sign-in after signup failed:', signInError.message);
        // Return success but with sign-in error
        return { 
          data: null, 
          error: { message: 'Account created but auto sign-in failed. Please sign in manually.' } 
        };
      }

      return { data: signInData, error: null };
    } catch (err: any) {
      console.error('Sign up error:', err.message || 'Failed to create account');
      return { data: null, error: err };
    }
  },

  // Sign in existing user
  async signIn(email: string, password: string) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      return { data, error };
    } catch (err: any) {
      // Log auth errors since user is actively trying to sign in
      console.error('Sign in error:', err.message || 'Failed to sign in');
      return { data: null, error: err };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      return { error };
    } catch (err: any) {
      // Silent fail - clear local state anyway
      return { error: err };
    }
  },

  // Reset password - send reset email
  async resetPassword(email: string) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });
      return { error };
    } catch (err: any) {
      console.error('Reset password error:', err.message || 'Failed to send reset email');
      return { error: err };
    }
  },

  // Listen to auth changes
  onAuthStateChange(callback: (event: string, session: any) => void) {
    try {
      return supabase.auth.onAuthStateChange(callback);
    } catch (err: any) {
      // Return a dummy subscription that does nothing
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    }
  }
};


// import { createClient } from '@supabase/supabase-js';
// import { projectId, publicAnonKey } from './info';

// // Create a single supabase client for the entire app
// export const supabase = createClient(
//   `https://${projectId}.supabase.co`,
//   publicAnonKey,
//   {
//     auth: {
//       persistSession: true,
//       autoRefreshToken: true,
//       detectSessionInUrl: true
//     }
//   }
// );

// // Auth helper functions
// export const authHelpers = {
//   // Get current user session
//   async getSession() {
//     try {
//       const { data: { session }, error } = await supabase.auth.getSession();
      
//       // Handle invalid refresh token errors
//       if (error) {
//         const errorMsg = error.message?.toLowerCase() || '';
//         if (errorMsg.includes('refresh token') || 
//             errorMsg.includes('invalid') || 
//             errorMsg.includes('expired')) {
//           console.log('🔄 Clearing invalid session...');
//           // Clear the invalid session
//           await supabase.auth.signOut();
//           return { session: null, error: null }; // Return null session without error
//         }
//       }
      
//       return { session, error };
//     } catch (err: any) {
//       // Check if it's a refresh token error
//       const errorMsg = err.message?.toLowerCase() || '';
//       if (errorMsg.includes('refresh token') || 
//           errorMsg.includes('invalid') || 
//           errorMsg.includes('expired')) {
//         console.log('🔄 Clearing invalid session after error...');
//         // Clear the corrupted session
//         try {
//           await supabase.auth.signOut();
//         } catch {
//           // If signOut fails, just return null
//         }
//         return { session: null, error: null };
//       }
      
//       // Silent fail - return null session
//       return { session: null, error: err };
//     }
//   },

//   // Get current user
//   async getUser() {
//     try {
//       const { data: { user }, error } = await supabase.auth.getUser();
      
//       // Handle invalid refresh token errors
//       if (error) {
//         const errorMsg = error.message?.toLowerCase() || '';
//         if (errorMsg.includes('refresh token') || 
//             errorMsg.includes('invalid') || 
//             errorMsg.includes('expired')) {
//           console.log('🔄 Clearing invalid user session...');
//           await supabase.auth.signOut();
//           return { user: null, error: null };
//         }
//       }
      
//       return { user, error };
//     } catch (err: any) {
//       // Check if it's a refresh token error
//       const errorMsg = err.message?.toLowerCase() || '';
//       if (errorMsg.includes('refresh token') || 
//           errorMsg.includes('invalid') || 
//           errorMsg.includes('expired')) {
//         console.log('🔄 Clearing invalid user session after error...');
//         try {
//           await supabase.auth.signOut();
//         } catch {
//           // If signOut fails, just return null
//         }
//         return { user: null, error: null };
//       }
      
//       // Silent fail - return null user
//       return { user: null, error: err };
//     }
//   },

//   // Sign up new user via server endpoint
//   async signUp(email: string, password: string, name: string) {
//     try {
//       // Call server-side signup endpoint for proper user creation
//       const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-1695dddc/signup`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${publicAnonKey}`
//         },
//         body: JSON.stringify({ email, password, name })
//       });

//       const result = await response.json();

//       if (!response.ok || result.error) {
//         const errorMessage = result.message || result.error || 'Failed to create account';
//         console.error('Sign up error:', errorMessage);
//         return { 
//           data: null, 
//           error: { 
//             message: errorMessage,
//             error: result.error, // Pass through error code if available
//             status: response.status
//           } 
//         };
//       }

//       // After successful signup, sign in the user to get session
//       const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
//         email,
//         password
//       });

//       if (signInError) {
//         console.error('Auto sign-in after signup failed:', signInError.message);
//         // Return success but with sign-in error
//         return { 
//           data: null, 
//           error: { message: 'Account created but auto sign-in failed. Please sign in manually.' } 
//         };
//       }

//       return { data: signInData, error: null };
//     } catch (err: any) {
//       console.error('Sign up error:', err.message || 'Failed to create account');
//       return { data: null, error: err };
//     }
//   },

//   // Sign in existing user
//   async signIn(email: string, password: string) {
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password
//       });
//       return { data, error };
//     } catch (err: any) {
//       // Log auth errors since user is actively trying to sign in
//       console.error('Sign in error:', err.message || 'Failed to sign in');
//       return { data: null, error: err };
//     }
//   },

//   // Sign out
//   async signOut() {
//     try {
//       const { error } = await supabase.auth.signOut();
//       return { error };
//     } catch (err: any) {
//       // Silent fail - clear local state anyway
//       return { error: err };
//     }
//   },

//   // Listen to auth changes
//   onAuthStateChange(callback: (event: string, session: any) => void) {
//     try {
//       return supabase.auth.onAuthStateChange(callback);
//     } catch (err: any) {
//       // Return a dummy subscription that does nothing
//       return {
//         data: {
//           subscription: {
//             unsubscribe: () => {}
//           }
//         }
//       };
//     }
//   }
// };
