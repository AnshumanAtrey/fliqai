/**
 * Stripe Service Tests
 */

import { stripeService, StripeServiceError } from '../stripe';
import { configManager } from '../../api/config';

// Mock Stripe
jest.mock('@stripe/stripe-js', () => ({
  loadStripe: jest.fn(),
}));

// Mock config manager
jest.mock('../../api/config', () => ({
  configManager: {
    loadConfig: jest.fn(),
    getConfig: jest.fn(),
    isConfigLoaded: jest.fn(),
  },
}));

const mockLoadStripe = require('@stripe/stripe-js').loadStripe;
const mockConfigManager = configManager as jest.Mocked<typeof configManager>;

describe('StripeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    stripeService.clear();
  });

  describe('initialization', () => {
    it('should initialize successfully with valid configuration', async () => {
      const mockStripeConfig = {
        publishableKey: 'pk_test_123',
        currency: 'usd',
        country: 'US',
      };

      const mockConfig = {
        stripe: mockStripeConfig,
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      };

      const mockStripeInstance = { id: 'stripe-instance' };

      mockConfigManager.loadConfig.mockResolvedValue(mockConfig);
      mockConfigManager.getConfig.mockReturnValue(mockConfig);
      mockLoadStripe.mockResolvedValue(mockStripeInstance);

      const result = await stripeService.initialize();

      expect(result).toBe(mockStripeInstance);
      expect(stripeService.isInitialized()).toBe(true);
      expect(mockLoadStripe).toHaveBeenCalledWith('pk_test_123', { locale: 'en' });
    });

    it('should throw error for invalid publishable key', async () => {
      const mockStripeConfig = {
        publishableKey: 'invalid_key',
        currency: 'usd',
        country: 'US',
      };

      const mockConfig = {
        stripe: mockStripeConfig,
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      };

      mockConfigManager.loadConfig.mockResolvedValue(mockConfig);
      mockConfigManager.getConfig.mockReturnValue(mockConfig);

      await expect(stripeService.initialize()).rejects.toThrow(StripeServiceError);
      expect(stripeService.isInitialized()).toBe(false);
    });

    it('should throw error when configuration is not available', async () => {
      mockConfigManager.loadConfig.mockResolvedValue({
        stripe: { publishableKey: '', currency: 'usd', country: 'US' },
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      });
      mockConfigManager.getConfig.mockReturnValue(null);

      await expect(stripeService.initialize()).rejects.toThrow(StripeServiceError);
      expect(stripeService.isInitialized()).toBe(false);
    });

    it('should return existing instance on subsequent calls', async () => {
      const mockStripeConfig = {
        publishableKey: 'pk_test_123',
        currency: 'usd',
        country: 'US',
      };

      const mockConfig = {
        stripe: mockStripeConfig,
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      };

      const mockStripeInstance = { id: 'stripe-instance' };

      mockConfigManager.loadConfig.mockResolvedValue(mockConfig);
      mockConfigManager.getConfig.mockReturnValue(mockConfig);
      mockLoadStripe.mockResolvedValue(mockStripeInstance);

      const result1 = await stripeService.initialize();
      const result2 = await stripeService.initialize();

      expect(result1).toBe(result2);
      expect(mockLoadStripe).toHaveBeenCalledTimes(1);
    });
  });

  describe('getStripe', () => {
    it('should return null when not initialized', () => {
      expect(stripeService.getStripe()).toBeNull();
    });

    it('should return Stripe instance when initialized', async () => {
      const mockStripeConfig = {
        publishableKey: 'pk_test_123',
        currency: 'usd',
        country: 'US',
      };

      const mockConfig = {
        stripe: mockStripeConfig,
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      };

      const mockStripeInstance = { id: 'stripe-instance' };

      mockConfigManager.loadConfig.mockResolvedValue(mockConfig);
      mockConfigManager.getConfig.mockReturnValue(mockConfig);
      mockLoadStripe.mockResolvedValue(mockStripeInstance);

      await stripeService.initialize();
      expect(stripeService.getStripe()).toBe(mockStripeInstance);
    });
  });

  describe('getConfig', () => {
    it('should return Stripe configuration', () => {
      const mockStripeConfig = {
        publishableKey: 'pk_test_123',
        currency: 'usd',
        country: 'US',
      };

      const mockConfig = {
        stripe: mockStripeConfig,
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      };

      mockConfigManager.getConfig.mockReturnValue(mockConfig);

      expect(stripeService.getConfig()).toBe(mockStripeConfig);
    });

    it('should return null when no configuration available', () => {
      mockConfigManager.getConfig.mockReturnValue(null);

      expect(stripeService.getConfig()).toBeNull();
    });
  });

  describe('error handling', () => {
    it('should handle loadStripe failure gracefully', async () => {
      const mockStripeConfig = {
        publishableKey: 'pk_test_123',
        currency: 'usd',
        country: 'US',
      };

      const mockConfig = {
        stripe: mockStripeConfig,
        api: { baseUrl: 'http://localhost:3001', version: 'v1', timeout: 30000 },
        features: {},
      };

      mockConfigManager.loadConfig.mockResolvedValue(mockConfig);
      mockConfigManager.getConfig.mockReturnValue(mockConfig);
      mockLoadStripe.mockRejectedValue(new Error('Network error'));

      await expect(stripeService.initialize()).rejects.toThrow(StripeServiceError);
      expect(stripeService.isInitialized()).toBe(false);
    });
  });
});