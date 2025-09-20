import { supabase } from '../supabaseClient';
import { AuthError, AuthResult } from '../types/supabase';

/**
 * Sign in with Google OAuth
 */
export async function signInWithGoogle(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Google OAuth error:', error);
      return {
        success: false,
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error during Google OAuth:', error);
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred during Google sign-in',
      },
    };
  }
}

/**
 * Sign in with GitHub OAuth
 */
export async function signInWithGitHub(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/`,
        scopes: 'read:user user:email',
      },
    });

    if (error) {
      console.error('GitHub OAuth error:', error);
      return {
        success: false,
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error during GitHub OAuth:', error);
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred during GitHub sign-in',
      },
    };
  }
}

/**
 * Get the current session
 */
export async function getCurrentSession() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      console.error('Error getting session:', error);
      return null;
    }

    return session;
  } catch (error) {
    console.error('Unexpected error getting session:', error);
    return null;
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      return {
        success: false,
        error: {
          message: error.message,
          code: error.status?.toString(),
        },
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error during sign out:', error);
    return {
      success: false,
      error: {
        message: 'An unexpected error occurred during sign-out',
      },
    };
  }
}
