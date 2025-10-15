/**
 * Unit tests for Configuration Manager Service
 * Tests configuration loading success and failure scenarios, caching behavior, and fallback mechanisms
 */

import { configManager } from '../config';
import { getBackendUrl } from '../../services/environment';
import { ClientConfig, ApiResponse } from '../types';

// Mock the environment service
jest.mock('../../services/environment');
const mockGetBackendUrl = getBackendUrl as jest.MockedFunction<typeof getBackendUrl>;

// Mock fetch globally
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('Configuration Manager', () => {
  const mockBackendUrl = 'https://fliq-backend-bxhr.onrender.com';
  const mockValidConfig: ClientConfig = {
    stripe: {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    },
    api: {
      baseUrl: mockBackendUrl,
      version: 'v1',
      timeout: 30000,
    },
    features: {
      paymentProcessing: true,
      userProfiles: true,
      notifications: false,
    },
  };

  const mockApiResponse: ApiResponse<ClientConfig> = {
    success: true,
    data: mockValidConfig,
  };

  beforeEach(() => {
    // Reset the configuration manager state before each test
    configManager.clearConfig();
    
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockGetBackendUrl.mockReturnValue(mockBackendUrl);
    
    // Mock successful fetch by default
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: jest.fn().mockResolvedValue(mockApiResponse),
    } as any);
  });

  afterEach(() => {
    // Clean up after each test
    configManager.clearConfig();
  });

  describe('loadConfig', () => {
    it('should successfully load configuration from backend', async () => {
      const config = await configManager.loadConfig();

      expect(config).toEqual(mockValidConfig);
      expect(mockFetch).toHaveBeenCalledWith(
        `${mockBackendUrl}/api/config/client`,
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should cache configuration after first load', async () => {
      // First load
      const config1 = await configManager.loadConfig();
      expect(config1).toEqual(mockValidConfig);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      // Second load should use cache
      const config2 = await configManager.loadConfig();
      expect(config2).toEqual(mockValidConfig);
      expect(mockFetch).toHaveBeenCalledTimes(1); // Still only called once
    });

    it('should handle network errors with fallback configuration', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      const config = await configManager.loadConfig();

      // Should return fallback config
      expect(config).toBeDefined();
      expect(config.stripe.publishableKey).toBe(''); // Fallback has empty key
      expect(config.api.baseUrl).toBe(mockBackendUrl);
      expect(config.features.paymentProcessing).toBe(false); // Fallback disables features
    });

    it('should handle HTTP error responses with fallback configuration', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      } as any);

      const config = await configManager.loadConfig();

      // Should return fallback config
      expect(config).toBeDefined();
      expect(config.stripe.publishableKey).toBe('');
      expect(config.features.paymentProcessing).toBe(false);
    });

    it('should handle API error responses with fallback configuration', async () => {
      const errorResponse: ApiResponse<ClientConfig> = {
        success: false,
        error: 'Configuration not found',
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(errorResponse),
      } as any);

      const config = await configManager.loadConfig();

      // Should return fallback config
      expect(config).toBeDefined();
      expect(config.stripe.publishableKey).toBe('');
    });

    it('should validate configuration structure', async () => {
      const invalidConfig = {
        stripe: {
          // Missing publishableKey
          currency: 'usd',
        },
        api: {
          baseUrl: mockBackendUrl,
        },
        features: {},
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({
          success: true,
          data: invalidConfig,
        }),
      } as any);

      const config = await configManager.loadConfig();

      // Should return fallback config due to validation failure
      expect(config).toBeDefined();
      expect(config.stripe.publishableKey).toBe('');
    });

    it('should handle concurrent load requests', async () => {
      // Simulate slow network response
      let resolvePromise: (value: any) => void;
      const slowPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });

      mockFetch.mockReturnValue(slowPromise as any);

      // Start multiple concurrent loads
      const promise1 = configManager.loadConfig();
      const promise2 = configManager.loadConfig();
      const promise3 = configManager.loadConfig();

      // Resolve the network request
      resolvePromise!({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockApiResponse),
      });

      const [config1, config2, config3] = await Promise.all([promise1, promise2, promise3]);

      // All should return the same config
      expect(config1).toEqual(mockValidConfig);
      expect(config2).toEqual(mockValidConfig);
      expect(config3).toEqual(mockValidConfig);

      // Fetch should only be called once
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should handle timeout errors', async () => {
      // Mock a timeout scenario
      mockFetch.mockImplementation(() => {
        return new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Timeout')), 100);
        });
      });

      const config = await configManager.loadConfig();

      // Should return fallback config
      expect(config).toBeDefined();
      expect(config.stripe.publishableKey).toBe('');
    });
  });

  describe('getConfig', () => {
    it('should return null when no configuration is loaded', () => {
      const config = configManager.getConfig();
      expect(config).toBeNull();
    });

    it('should return cached configuration after loading', async () => {
      await configManager.loadConfig();
      const config = configManager.getConfig();
      expect(config).toEqual(mockValidConfig);
    });

    it('should return fallback configuration after failed load', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      await configManager.loadConfig();
      
      const config = configManager.getConfig();
      expect(config).toBeDefined();
      expect(config!.stripe.publishableKey).toBe('');
    });
  });

  describe('isConfigLoaded', () => {
    it('should return false when no configuration is loaded', () => {
      expect(configManager.isConfigLoaded()).toBe(false);
    });

    it('should return true after successful configuration load', async () => {
      await configManager.loadConfig();
      expect(configManager.isConfigLoaded()).toBe(true);
    });

    it('should return true after fallback configuration load', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      await configManager.loadConfig();
      expect(configManager.isConfigLoaded()).toBe(true);
    });
  });

  describe('clearConfig', () => {
    it('should clear cached configuration', async () => {
      await configManager.loadConfig();
      expect(configManager.isConfigLoaded()).toBe(true);

      configManager.clearConfig();
      expect(configManager.isConfigLoaded()).toBe(false);
      expect(configManager.getConfig()).toBeNull();
    });

    it('should allow reloading after clearing', async () => {
      await configManager.loadConfig();
      configManager.clearConfig();

      const config = await configManager.loadConfig();
      expect(config).toEqual(mockValidConfig);
      expect(mockFetch).toHaveBeenCalledTimes(2); // Called twice due to clear
    });
  });

  describe('fallback configuration', () => {
    it('should use environment variables in fallback when available', async () => {
      const originalEnv = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = 'pk_test_fallback';

      mockFetch.mockRejectedValue(new Error('Network error'));
      const config = await configManager.loadConfig();

      expect(config.stripe.publishableKey).toBe('pk_test_fallback');

      // Restore original environment
      if (originalEnv) {
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = originalEnv;
      } else {
        delete process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
      }
    });

    it('should disable all features in fallback configuration', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));
      const config = await configManager.loadConfig();

      expect(config.features.paymentProcessing).toBe(false);
      expect(config.features.userProfiles).toBe(false);
      expect(config.features.notifications).toBe(false);
    });

    it('should use correct backend URL in fallback', async () => {
      const customBackendUrl = 'https://api.example.com';
      mockGetBackendUrl.mockReturnValue(customBackendUrl);
      mockFetch.mockRejectedValue(new Error('Network error'));

      const config = await configManager.loadConfig();

      expect(config.api.baseUrl).toBe(customBackendUrl);
    });
  });

  describe('configuration validation', () => {
    it('should reject configuration with missing stripe config', async () => {
      const invalidConfig = {
        // Missing stripe config
        api: { baseUrl: mockBackendUrl, version: 'v1', timeout: 30000 },
        features: {},
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({
          success: true,
          data: invalidConfig,
        }),
      } as any);

      const config = await configManager.loadConfig();
      expect(config.stripe.publishableKey).toBe(''); // Should use fallback
    });

    it('should reject configuration with missing api config', async () => {
      const invalidConfig = {
        stripe: { publishableKey: 'pk_test_123', currency: 'usd', country: 'US' },
        // Missing api config
        features: {},
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({
          success: true,
          data: invalidConfig,
        }),
      } as any);

      const config = await configManager.loadConfig();
      expect(config.stripe.publishableKey).toBe(''); // Should use fallback
    });

    it('should reject configuration with missing features config', async () => {
      const invalidConfig = {
        stripe: { publishableKey: 'pk_test_123', currency: 'usd', country: 'US' },
        api: { baseUrl: mockBackendUrl, version: 'v1', timeout: 30000 },
        // Missing features config
      };

      mockFetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue({
          success: true,
          data: invalidConfig,
        }),
      } as any);

      const config = await configManager.loadConfig();
      expect(config.stripe.publishableKey).toBe(''); // Should use fallback
    });
  });
});