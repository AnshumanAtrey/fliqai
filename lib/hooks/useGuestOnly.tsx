'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '../contexts/AuthContext';

/**
 * Higher-order component for guest-only routes (login, signup)
 * Redirects authenticated users to appropriate dashboard
 */
export function withGuestOnly<P extends object>(
  Component: React.ComponentType<P>,
  redirectTo: string = '/discover-students'
) {
  return function GuestOnlyComponent(props: P) {
    const router = useRouter();
    const { user, loading } = useAuthContext();
    
    useEffect(() => {
      if (!loading && user) {
        // User is authenticated, redirect to dashboard
        router.push(redirectTo);
      }
    }, [user, loading, router]);

    // Show loading while checking authentication
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    // Don't render if user is authenticated (redirect is in progress)
    if (user) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting...</p>
          </div>
        </div>
      );
    }

    // Render the component for guest users
    return <Component {...props} />;
  };
}