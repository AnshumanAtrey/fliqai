'use client';

/**
 * Authentication Context Provider
 * Provides authentication state and operations across the application
 */

import React, { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { User, AuthState } from '../api/types';
import { authManager } from '../api/auth';

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  refreshToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Authentication Provider Component
 * Manages authentication state and provides it to child components
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null
  });

  // Sign in function with error handling
  const signIn = useCallback(async (email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await authManager.signIn(email, password);
      
      // Get and store the ID token for API calls
      const token = await authManager.getIdToken();
      if (token) {
        localStorage.setItem('token', token);
        console.log('✅ Token stored in localStorage');
      }
      
      setAuthState({
        user,
        loading: false,
        error: null
      });
    } catch (error: any) {
      setAuthState({
        user: null,
        loading: false,
        error: error.message || 'Sign in failed'
      });
      throw error; // Re-throw so components can handle it
    }
  }, []);

  // Sign up function with error handling
  const signUp = useCallback(async (email: string, password: string, displayName: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await authManager.signUp(email, password, displayName);
      
      // Get and store the ID token for API calls
      const token = await authManager.getIdToken();
      if (token) {
        localStorage.setItem('token', token);
        console.log('✅ Token stored in localStorage');
      }
      
      setAuthState({
        user,
        loading: false,
        error: null
      });
    } catch (error: any) {
      setAuthState({
        user: null,
        loading: false,
        error: error.message || 'Sign up failed'
      });
      throw error; // Re-throw so components can handle it
    }
  }, []);

  // Google sign in function with error handling
  const signInWithGoogle = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const user = await authManager.signInWithGoogle();
      
      // Get and store the ID token for API calls
      const token = await authManager.getIdToken();
      if (token) {
        localStorage.setItem('token', token);
        console.log('✅ Token stored in localStorage');
      }
      
      setAuthState({
        user,
        loading: false,
        error: null
      });
    } catch (error: any) {
      setAuthState({
        user: null,
        loading: false,
        error: error.message || 'Google sign in failed'
      });
      throw error; // Re-throw so components can handle it
    }
  }, []);

  // Sign out function with error handling
  const signOut = useCallback(async (): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await authManager.signOut();
      
      // Remove token from localStorage
      localStorage.removeItem('token');
      console.log('✅ Token removed from localStorage');
      
      setAuthState({
        user: null,
        loading: false,
        error: null
      });
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: error.message || 'Sign out failed'
      }));
      throw error; // Re-throw so components can handle it
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async (): Promise<string | null> => {
    try {
      return await authManager.getIdToken();
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  }, []);

  // Set up authentication state listener and persistence
  useEffect(() => {
    // Set up backend auth state listener
    const unsubscribe = authManager.onAuthStateChanged(async (user: User | null) => {
      if (user) {
        // Get and store the ID token for API calls
        const token = await authManager.getIdToken();
        if (token) {
          localStorage.setItem('token', token);
          console.log('✅ Token refreshed and stored in localStorage');
        }
      } else {
        // Remove token when user is null
        localStorage.removeItem('token');
      }
      
      setAuthState(prev => ({
        user,
        loading: false,
        error: prev.error // Preserve existing errors unless cleared
      }));
    });

    return unsubscribe;
  }, []);

  // Clear error when user changes (successful authentication)
  useEffect(() => {
    if (authState.user) {
      setAuthState(prev => ({ ...prev, error: null }));
    }
  }, [authState.user]);

  const value: AuthContextValue = {
    ...authState,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to use authentication context
 */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

/**
 * Hook to get just the current user (useful for components that only need user info)
 */
export function useCurrentUser(): User | null {
  const { user } = useAuthContext();
  return user;
}

/**
 * Hook to check if user is authenticated
 */
export function useIsAuthenticated(): boolean {
  const { user, loading } = useAuthContext();
  return !loading && user !== null;
}

/**
 * Hook to get authentication loading state
 */
export function useAuthLoading(): boolean {
  const { loading } = useAuthContext();
  return loading;
}

/**
 * Error Boundary for Authentication
 */
interface AuthErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface AuthErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class AuthErrorBoundary extends React.Component<
  AuthErrorBoundaryProps,
  AuthErrorBoundaryState
> {
  constructor(props: AuthErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): AuthErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Authentication Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                Authentication Error
              </h2>
              <p className="text-gray-600 mb-4">
                An error occurred with the authentication system. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Authentication Loading Component
 * Shows loading state while authentication is being initialized
 */
interface AuthLoadingProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthLoading({ children, fallback }: AuthLoadingProps) {
  const { loading } = useAuthContext();

  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Initializing authentication...</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
}