'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../contexts/AuthContext';
import { User } from 'firebase/auth';

interface ProfileStatus {
  profileCompleted: boolean;
  loading: boolean;
  error: string | null;
}

interface AuthProtectionState {
  isAuthenticated: boolean;
  isProfileComplete: boolean;
  isLoading: boolean;
  shouldRedirect: boolean;
  redirectTo: string;
  error: string | null;
}

/**
 * Custom hook for authentication and profile completion protection
 */
export function useAuthProtection(options: {
  requireAuth?: boolean;
  requireProfile?: boolean;
  redirectTo?: string;
  allowedRoutes?: string[];
} = {}): AuthProtectionState {
  const {
    requireAuth = true,
    requireProfile = true,
    redirectTo = '/login',
    allowedRoutes = ['/login', '/signup', '/onboarding']
  } = options;

  const { user, loading: authLoading } = useAuthContext();
  const router = useRouter();
  const [profileStatus, setProfileStatus] = useState<ProfileStatus>({
    profileCompleted: false,
    loading: true,
    error: null
  });

  // Check if user has completed their profile
  useEffect(() => {
    const checkProfileCompletion = async () => {
      console.log('🔍 Checking profile completion for user:', user?.uid);
      
      if (!user) {
        console.log('❌ No user found, setting profile as not completed');
        setProfileStatus({
          profileCompleted: false,
          loading: false,
          error: null
        });
        return;
      }

      try {
        // Get token from localStorage or refresh from auth context
        let token = localStorage.getItem('token');
        if (!token) {
          console.log('🔄 No token in localStorage, getting fresh token...');
          // Try to get a fresh token from Firebase auth
          try {
            if (user && 'getIdToken' in user && typeof user.getIdToken === 'function') {
              token = await user.getIdToken();
              if (token) {
                localStorage.setItem('token', token);
                console.log('✅ Got fresh token and stored in localStorage');
              }
            }
          } catch (tokenError) {
            console.error('❌ Failed to get fresh token:', tokenError);
          }
        }

        if (!token) {
          console.log('❌ Still no token available, skipping profile check');
          throw new Error('No authentication token available');
        }

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
        console.log('🌐 Making profile check request to:', `${backendUrl}/api/profile`);
        
        const response = await fetch(`${backendUrl}/api/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          console.log('❌ Profile check failed:', response.status, response.statusText);
          throw new Error(`Profile check failed: ${response.status}`);
        }

        const result = await response.json();
        console.log('✅ Profile check result:', result);
        
        setProfileStatus({
          profileCompleted: result.data?.profileCompleted || false,
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('❌ Error checking profile completion:', error);
        setProfileStatus({
          profileCompleted: false,
          loading: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    };

    if (!authLoading && user) {
      checkProfileCompletion();
    } else if (!authLoading && !user) {
      setProfileStatus({
        profileCompleted: false,
        loading: false,
        error: null
      });
    }
  }, [user, authLoading]);

  // Calculate protection state
  const isAuthenticated = !authLoading && !!user;
  const isProfileComplete = profileStatus.profileCompleted;
  const isLoading = authLoading || profileStatus.loading;

  // Determine if redirect is needed
  let shouldRedirect = false;
  let redirectPath = redirectTo;

  if (!isLoading) {
    if (requireAuth && !isAuthenticated) {
      shouldRedirect = true;
      redirectPath = '/login';
    } else if (requireProfile && isAuthenticated && !isProfileComplete) {
      shouldRedirect = true;
      redirectPath = '/onboarding';
    }
  }

  return {
    isAuthenticated,
    isProfileComplete,
    isLoading,
    shouldRedirect,
    redirectTo: redirectPath,
    error: profileStatus.error
  };
}

/**
 * Higher-order component for route protection
 */
export function withAuthProtection<P extends object>(
  Component: React.ComponentType<P>,
  options: {
    requireAuth?: boolean;
    requireProfile?: boolean;
    redirectTo?: string;
    allowedRoutes?: string[];
  } = {}
) {
  return function ProtectedComponent(props: P) {
    const router = useRouter();
    const authState = useAuthProtection(options);
    
    useEffect(() => {
      console.log('🔐 withAuthProtection state:', {
        isAuthenticated: authState.isAuthenticated,
        isProfileComplete: authState.isProfileComplete,
        isLoading: authState.isLoading,
        shouldRedirect: authState.shouldRedirect,
        redirectTo: authState.redirectTo,
        error: authState.error,
        options
      });

      if (authState.shouldRedirect && !authState.isLoading) {
        console.log('🚀 Redirecting to:', authState.redirectTo);
        // Save the current URL for redirect after authentication
        if (authState.redirectTo === '/login') {
          const currentPath = window.location.pathname + window.location.search;
          sessionStorage.setItem('redirectAfterLogin', currentPath);
          console.log('💾 Saved redirect path:', currentPath);
        }
        router.push(authState.redirectTo);
      }
    }, [authState.shouldRedirect, authState.redirectTo, authState.isLoading, router]);

    // Show loading while checking authentication and profile
    if (authState.isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Checking authentication...</p>
          </div>
        </div>
      );
    }

    // Show error if there's an authentication error
    if (authState.error) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Authentication Error
            </h2>
            <p className="text-gray-600 mb-4">
              {authState.error}
            </p>
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-2"
            >
              Go to Login
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Refresh
            </button>
          </div>
        </div>
      );
    }

    // Don't render the component if redirect is needed
    if (authState.shouldRedirect) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting...</p>
          </div>
        </div>
      );
    }

    // Render the protected component
    return <Component {...props} />;
  };
}