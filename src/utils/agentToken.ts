/**
 * Agent Token Service
 * Manages lightweight JWT tokens for Agent iframe access
 * Replaces Supabase auth token to avoid cross-domain issues
 */

import { authHelpers } from './supabase/client';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080';
const TOKEN_STORAGE_KEY = 'agent_access_token';
const TOKEN_EXPIRY_KEY = 'agent_token_expiry';

interface AgentTokenResponse {
  success: boolean;
  token?: string;
  userId?: string;
  expiresIn?: string;
  error?: string;
}

/**
 * Request a new Agent access token from the backend
 * @returns {Promise<string|null>} Agent token or null if failed
 */
export async function requestAgentToken(): Promise<string | null> {
  try {
    console.log('🔑 Requesting Agent access token...');

    // Get current Supabase session
    const { session, error } = await authHelpers.getSession();

    if (error || !session?.access_token) {
      console.error('❌ No Supabase session available:', error);
      return null;
    }

    // Request Agent token from backend
    const response = await fetch(`${BACKEND_URL}/api/agent/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        supabaseToken: session.access_token,
      }),
    });

    const data: AgentTokenResponse = await response.json();

    if (!data.success || !data.token) {
      console.error('❌ Failed to get Agent token:', data.error);
      return null;
    }

    console.log('✅ Agent token received for user:', data.userId);

    // Store token and expiry time
    localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
    
    // Calculate expiry time (2 hours from now)
    const expiryTime = Date.now() + (2 * 60 * 60 * 1000); // 2 hours in milliseconds
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());

    return data.token;

  } catch (err) {
    console.error('❌ Error requesting Agent token:', err);
    return null;
  }
}

/**
 * Get the current Agent access token (from storage or request new one)
 * @param {boolean} forceRefresh - Force request a new token
 * @returns {Promise<string|null>} Agent token or null if failed
 */
export async function getAgentToken(forceRefresh = false): Promise<string | null> {
  // Check if we should force refresh
  if (forceRefresh) {
    console.log('🔄 Force refreshing Agent token...');
    return await requestAgentToken();
  }

  // Check for existing token
  const storedToken = localStorage.getItem(TOKEN_STORAGE_KEY);
  const storedExpiry = localStorage.getItem(TOKEN_EXPIRY_KEY);

  if (!storedToken || !storedExpiry) {
    console.log('ℹ️ No stored Agent token, requesting new one...');
    return await requestAgentToken();
  }

  // Check if token is expired (with 5 minute buffer)
  const expiryTime = parseInt(storedExpiry, 10);
  const bufferTime = 5 * 60 * 1000; // 5 minutes
  const now = Date.now();

  if (now >= (expiryTime - bufferTime)) {
    console.log('⏰ Agent token expired or expiring soon, refreshing...');
    return await requestAgentToken();
  }

  console.log('✅ Using cached Agent token');
  return storedToken;
}

/**
 * Clear Agent token from storage (call on logout)
 */
export function clearAgentToken(): void {
  console.log('🗑️ Clearing Agent token from storage');
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(TOKEN_EXPIRY_KEY);
}

/**
 * Send Agent token to iframe
 * @param {HTMLIFrameElement} iframe - The iframe element
 * @param {string} token - The Agent access token
 * @param {string} targetOrigin - The iframe origin URL
 */
export function sendTokenToIframe(
  iframe: HTMLIFrameElement,
  token: string,
  targetOrigin: string
): void {
  if (!iframe.contentWindow) {
    console.error('❌ Iframe contentWindow not available');
    return;
  }

  iframe.contentWindow.postMessage(
    {
      type: 'AGENT_AUTH',
      token: token,
      timestamp: Date.now(),
    },
    targetOrigin
  );

  console.log('✅ Agent token sent to iframe');
}

/**
 * Setup automatic token refresh (call when user logs in)
 * Refreshes token every 1.5 hours (before 2 hour expiry)
 * @returns {number} Interval ID (use to clear interval on logout)
 */
export function setupTokenRefresh(): number {
  const refreshInterval = 1.5 * 60 * 60 * 1000; // 1.5 hours in milliseconds

  const intervalId = window.setInterval(async () => {
    console.log('🔄 Auto-refreshing Agent token...');
    await requestAgentToken();
  }, refreshInterval);

  console.log('⏰ Agent token auto-refresh enabled (every 1.5 hours)');

  return intervalId;
}
