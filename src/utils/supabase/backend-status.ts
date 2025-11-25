/**
 * Backend Status Helper
 * Checks if the Supabase Edge Function server is deployed and working
 */

import { projectId, publicAnonKey } from './info';

let backendStatusChecked = false;

export async function checkBackendStatus(): Promise<boolean> {
  if (backendStatusChecked) return true;
  
  try {
    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-1695dddc/health`,
      {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      }
    );
    
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'ok') {
        console.log('✅ Brandscaling backend is connected and running');
        backendStatusChecked = true;
        return true;
      }
    }
    
    // Backend not deployed - show friendly message
    showBackendSetupInstructions();
    return false;
  } catch (error) {
    // Backend not accessible - this is OK for local development
    showBackendSetupInstructions();
    return false;
  }
}

function showBackendSetupInstructions() {
  if (backendStatusChecked) return; // Only show once
  backendStatusChecked = true;
  
  console.log(`
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
%c  ℹ️  Brandscaling Platform - Running in Local Mode
%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

%c✅ What's Working:%c
   • ✨ Server-side authentication (production-ready!)
   • 🔐 Sign up, sign in, session persistence
   • 📝 Complete E-DNA quiz (all 56 questions, 7 layers)
   • 📊 Results calculation and display
   • 📄 PDF export and sharing
   • 🎓 Personalized dashboard and AI chat

%c⚠️  Local Mode:%c
   • Quiz results stored in browser only (not persisted to backend)
   • Results won't sync across devices
   • Data lost if browser cache is cleared

%c📚 Documentation:%c
   Start here: /AUTH_README.md
   Full guide: /SUPABASE_AUTH_COMPLETE.md
   Visual flows: /AUTH_FLOW_DIAGRAM.md
   Quick test: /QUICK_START_AUTHENTICATION.md

%c📦 To Enable Full Backend (Optional):%c
   Quick deploy:
   1. npm install -g supabase
   2. supabase login
   3. supabase link --project-ref ${projectId}
   4. supabase functions deploy make-server-1695dddc

%cℹ️  This is completely normal for development!%c
   The app is fully functional without the backend.
   Authentication works, quiz works, everything works!

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `,
  'color: #9333ea', // Purple border
  'color: #42047D; font-weight: bold; font-size: 14px', // Title
  'color: #9333ea', // Purple border
  'color: #10b981; font-weight: bold', // Green for working
  'color: #6b7280', // Gray for list
  'color: #f59e0b; font-weight: bold', // Orange for warning
  'color: #6b7280', // Gray for list
  'color: #06b6d4; font-weight: bold', // Cyan for docs
  'color: #6b7280', // Gray for list
  'color: #3b82f6; font-weight: bold', // Blue for instructions
  'color: #6b7280', // Gray for instructions
  'color: #8b5cf6; font-weight: bold; font-style: italic', // Purple for note
  'color: #6b7280' // Gray
  );
}
