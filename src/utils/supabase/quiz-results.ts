/**
 * Quiz Results API Helper
 * Provides clean functions for saving and loading E-DNA quiz results
 */

import { EDNAResults } from '../../components/EDNAQuiz';
import { projectId, publicAnonKey } from './info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-1695dddc`;

/**
 * Save quiz results for a user
 */
export async function saveQuizResults(userId: string, results: EDNAResults): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/quiz-results`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: userId,
        results: results
      })
    });

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      // Silent fail - backend not critical for app functionality
      return { success: false, error: data.error || 'Backend not available' };
    }

    const data = await response.json();
    return { success: true };
  } catch (error: any) {
    // Silent fail - results are saved locally which is fine
    return { success: false, error: 'Backend not available - results saved locally only' };
  }
}

/**
 * Load quiz results for a user
 */
export async function loadQuizResults(userId: string): Promise<{ results: EDNAResults | null; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/quiz-results/${userId}`, {
      headers: {
        'Authorization': `Bearer ${publicAnonKey}`
      }
    });

    if (response.status === 404) {
      // No results found - this is not an error
      return { results: null };
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      // Silent fail - no results found is expected without backend
      return { results: null, error: null };
    }

    const data = await response.json();
    return { results: data.results || null };
  } catch (error: any) {
    // Silent fail - Return null results so user can take the quiz
    return { results: null, error: null };
  }
}

/**
 * Check if a user has completed the quiz
 */
export async function hasCompletedQuiz(userId: string): Promise<boolean> {
  const { results } = await loadQuizResults(userId);
  return results !== null;
}
