/**
 * Context Providers Index
 * Centralized exports for all context providers and related utilities
 */

// Configuration Context
export {
  ConfigProvider,
  ConfigErrorBoundary,
  ConfigLoading,
  useConfigContext,
} from './ConfigContext';

// Authentication Context
export {
  AuthProvider,
  AuthErrorBoundary,
  AuthLoading,
  useAuthContext,
  useCurrentUser,
  useIsAuthenticated,
  useAuthLoading,
} from './AuthContext';

// Re-export types for convenience
export type { ClientConfig, User, AuthState } from '../api/types';