/**
 * Application Configuration
 *
 * Environment variables for production deployment.
 * Uses Vite's import.meta.env with fallbacks for development.
 */

// Backend API URL
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';

// Supabase Configuration
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// GoHighLevel Checkout URL
export const GHL_CHECKOUT_URL = import.meta.env.VITE_GHL_CHECKOUT_URL || 'https://go.brandscaling.co.uk/checkout-page-quiz-report';

// Environment
export const IS_PRODUCTION = import.meta.env.PROD;
export const IS_DEVELOPMENT = import.meta.env.DEV;

// Log configuration in development
if (IS_DEVELOPMENT) {
  console.log('🔧 App Configuration:', {
    BACKEND_URL,
    SUPABASE_URL: SUPABASE_URL ? '✅ Set' : '❌ Missing',
    SUPABASE_ANON_KEY: SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing',
    GHL_CHECKOUT_URL,
    IS_PRODUCTION,
    IS_DEVELOPMENT
  });
}
