/**
 * Configuration React Hook
 * Provides components access to configuration with loading states and error handling
 */

import { useConfigContext } from '../contexts/ConfigContext';
import { ClientConfig } from '../api/types';

interface UseConfigReturn {
  config: ClientConfig | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

/**
 * Hook for components to access configuration
 * Uses the ConfigContext for consistent state management
 */
export function useConfig(): UseConfigReturn {
  return useConfigContext();
}

/**
 * Hook to get specific configuration sections with type safety
 */
export function useStripeConfig() {
  const { config, loading, error } = useConfig();

  return {
    stripeConfig: config?.stripe || null,
    loading,
    error,
  };
}

export function useApiConfig() {
  const { config, loading, error } = useConfig();

  return {
    apiConfig: config?.api || null,
    loading,
    error,
  };
}

export function useFeatureFlags() {
  const { config, loading, error } = useConfig();

  return {
    features: config?.features || {},
    loading,
    error,
    isFeatureEnabled: (featureName: string): boolean => {
      return config?.features?.[featureName] === true;
    },
  };
}