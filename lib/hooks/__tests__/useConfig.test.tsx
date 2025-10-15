/**
 * Unit tests for useConfig React Hook
 * Tests hook state management, error handling, and configuration access
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { useConfig, useStripeConfig, useApiConfig, useFeatureFlags } from '../useConfig';
import { configManager } from '../../api/config';
import { ClientConfig } from '../../api/types';

// Mock the configuration manager
jest.mock('../../api/config');
const mockConfigManager = configManager as jest.Mocked<typeof configManager>;

describe('useConfig Hook', () => {
  const mockValidConfig: ClientConfig = {
    stripe: {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    },
    api: {
      baseUrl: 'http://localhost:3001',
      version: 'v1',
      timeout: 30000,
    },
    features: {
      paymentProcessing: true,
      userProfiles: true,
      notifications: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockConfigManager.isConfigLoaded.mockReturnValue(false);
    mockConfigManager.getConfig.mockReturnValue(null);
    mockConfigManager.loadConfig.mockResolvedValue(mockValidConfig);
    mockConfigManager.clearConfig.mockImplementation(() => {});
  });

  describe('useConfig', () => {
    it('should initialize with correct initial state', () => {
      const { result } = renderHook(() => useConfig());

      expect(result.current.config).toBeNull();
      expect(result.current.loading).toBe(true); // Loading starts immediately due to useEffect
      expect(result.current.error).toBeNull();
      expect(typeof result.current.refetch).toBe('function');
    });

    it('should load configuration on mount', async () => {
      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(mockConfigManager.loadConfig).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(result.current.config).toEqual(mockValidConfig);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    it('should use cached configuration when available', async () => {
      mockConfigManager.isConfigLoaded.mockReturnValue(true);
      mockConfigManager.getConfig.mockReturnValue(mockValidConfig);

      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(result.current.config).toEqual(mockValidConfig);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });

      // Should not call loadConfig since config is already loaded
      expect(mockConfigManager.loadConfig).not.toHaveBeenCalled();
    });

    it('should handle configuration loading errors', async () => {
      const errorMessage = 'Failed to load configuration';
      mockConfigManager.loadConfig.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.loading).toBe(false);
        expect(result.current.config).toBeNull();
      });
    });

    it('should handle configuration loading errors with fallback config', async () => {
      const errorMessage = 'Network error';
      const fallbackConfig: ClientConfig = {
        ...mockValidConfig,
        stripe: { ...mockValidConfig.stripe, publishableKey: '' },
      };

      mockConfigManager.loadConfig.mockRejectedValue(new Error(errorMessage));
      mockConfigManager.getConfig.mockReturnValue(fallbackConfig);

      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.config).toEqual(fallbackConfig);
        expect(result.current.loading).toBe(false);
      });
    });

    it('should handle non-Error exceptions', async () => {
      mockConfigManager.loadConfig.mockRejectedValue('String error');

      const { result } = renderHook(() => useConfig());

      await waitFor(() => {
        expect(result.current.error).toBe('Failed to load configuration');
        expect(result.current.loading).toBe(false);
      });
    });

    it('should refetch configuration when refetch is called', async () => {
      const { result } = renderHook(() => useConfig());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.config).toEqual(mockValidConfig);
      });

      // Clear mocks to track refetch calls
      jest.clearAllMocks();

      // Call refetch
      await act(async () => {
        await result.current.refetch();
      });

      expect(mockConfigManager.clearConfig).toHaveBeenCalled();
      expect(mockConfigManager.loadConfig).toHaveBeenCalled();
    });

    it('should handle refetch errors', async () => {
      const { result } = renderHook(() => useConfig());

      // Wait for initial load
      await waitFor(() => {
        expect(result.current.config).toEqual(mockValidConfig);
      });

      // Setup error for refetch
      const errorMessage = 'Refetch failed';
      mockConfigManager.loadConfig.mockRejectedValue(new Error(errorMessage));

      // Call refetch
      await act(async () => {
        await result.current.refetch();
      });

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
      });
    });

    it('should show loading state during configuration load', async () => {
      let resolveLoad: (config: ClientConfig) => void;
      const loadPromise = new Promise<ClientConfig>((resolve) => {
        resolveLoad = resolve;
      });
      mockConfigManager.loadConfig.mockReturnValue(loadPromise);

      const { result } = renderHook(() => useConfig());

      // Should be loading initially
      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      // Resolve the load
      act(() => {
        resolveLoad!(mockValidConfig);
      });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
        expect(result.current.config).toEqual(mockValidConfig);
      });
    });
  });

  describe('useStripeConfig', () => {
    it('should return stripe configuration when available', async () => {
      mockConfigManager.isConfigLoaded.mockReturnValue(true);
      mockConfigManager.getConfig.mockReturnValue(mockValidConfig);

      const { result } = renderHook(() => useStripeConfig());

      await waitFor(() => {
        expect(result.current.stripeConfig).toEqual(mockValidConfig.stripe);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    it('should return null stripe config when configuration is not loaded', () => {
      const { result } = renderHook(() => useStripeConfig());

      expect(result.current.stripeConfig).toBeNull();
    });

    it('should handle loading and error states', async () => {
      const errorMessage = 'Load failed';
      mockConfigManager.loadConfig.mockRejectedValue(new Error(errorMessage));

      const { result } = renderHook(() => useStripeConfig());

      await waitFor(() => {
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.stripeConfig).toBeNull();
      });
    });
  });

  describe('useApiConfig', () => {
    it('should return API configuration when available', async () => {
      mockConfigManager.isConfigLoaded.mockReturnValue(true);
      mockConfigManager.getConfig.mockReturnValue(mockValidConfig);

      const { result } = renderHook(() => useApiConfig());

      await waitFor(() => {
        expect(result.current.apiConfig).toEqual(mockValidConfig.api);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
      });
    });

    it('should return null API config when configuration is not loaded', () => {
      const { result } = renderHook(() => useApiConfig());

      expect(result.current.apiConfig).toBeNull();
    });
  });

  describe('useFeatureFlags', () => {
    it('should return feature flags when available', async () => {
      mockConfigManager.isConfigLoaded.mockReturnValue(true);
      mockConfigManager.getConfig.mockReturnValue(mockValidConfig);

      const { result } = renderHook(() => useFeatureFlags());

      await waitFor(() => {
        expect(result.current.features).toEqual(mockValidConfig.features);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
        expect(typeof result.current.isFeatureEnabled).toBe('function');
      });
    });

    it('should return empty features object when configuration is not loaded', () => {
      const { result } = renderHook(() => useFeatureFlags());

      expect(result.current.features).toEqual({});
    });

    it('should correctly check if feature is enabled', async () => {
      mockConfigManager.isConfigLoaded.mockReturnValue(true);
      mockConfigManager.getConfig.mockReturnValue(mockValidConfig);

      const { result } = renderHook(() => useFeatureFlags());

      await waitFor(() => {
        expect(result.current.isFeatureEnabled('paymentProcessing')).toBe(true);
        expect(result.current.isFeatureEnabled('userProfiles')).toBe(true);
        expect(result.current.isFeatureEnabled('notifications')).toBe(false);
        expect(result.current.isFeatureEnabled('nonExistentFeature')).toBe(false);
      });
    });

    it('should return false for feature checks when no configuration is loaded', () => {
      const { result } = renderHook(() => useFeatureFlags());

      expect(result.current.isFeatureEnabled('paymentProcessing')).toBe(false);
      expect(result.current.isFeatureEnabled('anyFeature')).toBe(false);
    });

    it('should handle configuration with undefined features', async () => {
      const configWithoutFeatures = {
        ...mockValidConfig,
        features: undefined as any,
      };
      
      mockConfigManager.isConfigLoaded.mockReturnValue(true);
      mockConfigManager.getConfig.mockReturnValue(configWithoutFeatures);

      const { result } = renderHook(() => useFeatureFlags());

      await waitFor(() => {
        expect(result.current.features).toEqual({});
        expect(result.current.isFeatureEnabled('anyFeature')).toBe(false);
      });
    });
  });

  describe('hook cleanup and memory leaks', () => {
    it('should not update state after component unmount', async () => {
      let resolveLoad: (config: ClientConfig) => void;
      const loadPromise = new Promise<ClientConfig>((resolve) => {
        resolveLoad = resolve;
      });
      mockConfigManager.loadConfig.mockReturnValue(loadPromise);

      const { result, unmount } = renderHook(() => useConfig());

      // Start loading
      await waitFor(() => {
        expect(result.current.loading).toBe(true);
      });

      // Unmount before load completes
      unmount();

      // Complete the load after unmount
      act(() => {
        resolveLoad!(mockValidConfig);
      });

      // Should not cause any errors or warnings
      // This test mainly ensures no memory leaks or state updates after unmount
    });
  });
});