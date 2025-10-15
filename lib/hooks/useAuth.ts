/**
 * Authentication React Hook
 * Provides authentication state and operations to React components
 */

import { useAuthContext, useCurrentUser as useCurrentUserContext, useIsAuthenticated as useIsAuthenticatedContext, useAuthLoading as useAuthLoadingContext } from '../contexts/AuthContext';
import { User, AuthState } from '../api/types';

interface UseAuthReturn extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

/**
 * Custom hook for authentication state and operations
 * Uses the AuthContext for consistent state management
 */
export function useAuth(): UseAuthReturn {
  return useAuthContext();
}

/**
 * Hook to get just the current user (useful for components that only need user info)
 */
export function useCurrentUser(): User | null {
  return useCurrentUserContext();
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  return useIsAuthenticatedContext();
}

/**
 * Hook to get authentication loading state
 */
export function useAuthLoading(): boolean {
  return useAuthLoadingContext();
}