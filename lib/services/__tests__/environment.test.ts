/**
 * Unit Tests for Environment Service
 * Tests environment detection and configuration
 */

// Mock process.env before importing
const originalEnv = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...originalEnv };
});

afterAll(() => {
  process.env = originalEnv;
});

describe('Environment Service', () => {
  describe('Development Environment', () => {
    it('should configure development environment correctly', () => {
      process.env.NODE_ENV = 'development';
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.isDevelopment).toBe(true);
      expect(config.isProduction).toBe(false);
      expect(config.backendUrl).toBe('http://localhost:3001');
      expect(config.environment).toBe('development');
    });

    it('should use custom backend URL in development when provided', () => {
      process.env.NODE_ENV = 'development';
      process.env.NEXT_PUBLIC_BACKEND_URL = 'http://localhost:8080';

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.isDevelopment).toBe(true);
      expect(config.backendUrl).toBe('http://localhost:8080');
    });
  });

  describe('Production Environment', () => {
    it('should configure production environment correctly', () => {
      process.env.NODE_ENV = 'production';
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.isDevelopment).toBe(false);
      expect(config.isProduction).toBe(true);
      expect(config.backendUrl).toBe('https://fliq-backend-bxhr.onrender.com');
      expect(config.environment).toBe('production');
    });

    it('should use custom backend URL in production when provided', () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_BACKEND_URL = 'https://custom-api.example.com';

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.isProduction).toBe(true);
      expect(config.backendUrl).toBe('https://custom-api.example.com');
    });
  });

  describe('Staging Environment', () => {
    it('should configure staging environment correctly', () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_ENV = 'staging';
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.isDevelopment).toBe(false);
      expect(config.isProduction).toBe(true);
      expect(config.backendUrl).toBe('https://fliq-backend-staging.onrender.com');
      expect(config.environment).toBe('staging');
    });

    it('should use custom backend URL in staging when provided', () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_ENV = 'staging';
      process.env.NEXT_PUBLIC_BACKEND_URL = 'https://staging-api.example.com';

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.environment).toBe('staging');
      expect(config.backendUrl).toBe('https://staging-api.example.com');
    });
  });

  describe('Convenience Functions', () => {
    it('should provide correct convenience functions', () => {
      process.env.NODE_ENV = 'development';

      const {
        getBackendUrl,
        isDevelopment,
        isProduction,
        environmentDetector
      } = require('../environment');

      expect(getBackendUrl()).toBe('http://localhost:3001');
      expect(isDevelopment()).toBe(true);
      expect(isProduction()).toBe(false);
      expect(environmentDetector.getEnvironment()).toBe('development');
    });

    it('should provide correct production convenience functions', () => {
      process.env.NODE_ENV = 'production';

      const {
        getBackendUrl,
        isDevelopment,
        isProduction,
        environmentDetector
      } = require('../environment');

      expect(getBackendUrl()).toBe('https://fliq-backend-bxhr.onrender.com');
      expect(isDevelopment()).toBe(false);
      expect(isProduction()).toBe(true);
      expect(environmentDetector.getEnvironment()).toBe('production');
    });
  });

  describe('Render.com Configuration', () => {
    it('should use correct production URL for Render deployment', () => {
      process.env.NODE_ENV = 'production';
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      // Verify it uses the correct Render.com URL
      expect(config.backendUrl).toBe('https://fliq-backend-bxhr.onrender.com');
    });

    it('should support environment variable override for Render', () => {
      process.env.NODE_ENV = 'production';
      // Simulate Render environment variable
      process.env.NEXT_PUBLIC_BACKEND_URL = 'https://fliq-backend-bxhr.onrender.com';

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.backendUrl).toBe('https://fliq-backend-bxhr.onrender.com');
    });

    it('should handle development with localhost correctly', () => {
      process.env.NODE_ENV = 'development';
      delete process.env.NEXT_PUBLIC_BACKEND_URL;

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      // Verify it uses localhost for development
      expect(config.backendUrl).toBe('http://localhost:3001');
      expect(config.backendUrl.startsWith('http://localhost')).toBe(true);
    });
  });

  describe('Environment Detection Logic', () => {
    it('should detect environment based on NODE_ENV', () => {
      const testCases = [
        { NODE_ENV: 'development', expected: 'development' },
        { NODE_ENV: 'production', expected: 'production' },
        { NODE_ENV: 'test', expected: 'development' }, // fallback
        { NODE_ENV: undefined, expected: 'development' } // fallback
      ];

      testCases.forEach(({ NODE_ENV, expected }) => {
        jest.resetModules();
        if (NODE_ENV) {
          process.env.NODE_ENV = NODE_ENV;
        } else {
          delete process.env.NODE_ENV;
        }

        const { getEnvironmentConfig } = require('../environment');
        const config = getEnvironmentConfig();

        expect(config.environment).toBe(expected);
      });
    });

    it('should override environment with NEXT_PUBLIC_ENV', () => {
      process.env.NODE_ENV = 'production';
      process.env.NEXT_PUBLIC_ENV = 'staging';

      const { getEnvironmentConfig } = require('../environment');
      const config = getEnvironmentConfig();

      expect(config.environment).toBe('staging');
      expect(config.isProduction).toBe(true); // Still production build
    });
  });
});