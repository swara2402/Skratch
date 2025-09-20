export interface Project {
  id: string;
  title: string;
  description: string;
  date: string;
  user_id: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  project_id: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

// OAuth Provider types
export type OAuthProvider = 'google' | 'github';

// Auth error interface
export interface AuthError {
  message: string;
  code?: string;
}

// Auth result interface
export interface AuthResult {
  success: boolean;
  error?: AuthError;
}
