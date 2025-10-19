/**
 * Configuration Manager Service
 * Dynamically loads and manages client-safe configuration from backend
 */

import { ClientConfig, ApiResponse, ConfigManager } from './types';
import { getBackendUrl } from '../services/environment';

class ConfigurationManager implements ConfigManager {
  private config: ClientConfig | null = null;
  private loading = false;
  private loadPromise: Promise<ClientConfig> | null = null;

  /**
   * Load configuration from backend /api/config/client endpoint
   */
  async loadConfig(): Promise<ClientConfig> {
    // If already loading, return the existing promise
    if (this.loading && this.loadPromise) {
      return this.loadPromise;
    }

    // If config is already loaded, return it
    if (this.config) {
      return this.config;
    }

    this.loading = true;

    this.loadPromise = this.fetchConfiguration();

    try {
      this.config = await this.loadPromise;
      return this.config;
    } catch (error) {
      // Handle configuration loading failure with fallback
      console.error('Failed to load configuration from backend:', error);
      this.config = this.getFallbackConfig();
      return this.config;
    } finally {
      this.loading = false;
      this.loadPromise = null;
    }
  }

  /**
   * Get cached configuration
   */
  getConfig(): ClientConfig | null {
    return this.config;
  }

  /**
   * Check if configuration is loaded
   */
  isConfigLoaded(): boolean {
    return this.config !== null;
  }

  /**
   * Clear cached configuration (useful for testing or forced refresh)
   */
  clearConfig(): void {
    this.config = null;
    this.loading = false;
    this.loadPromise = null;
  }

  /**
   * Fetch configuration from backend
   */
  private async fetchConfiguration(): Promise<ClientConfig> {
    const backendUrl = getBackendUrl();
    const configEndpoint = `${backendUrl}/api/config/client`;

    const response = await fetch(configEndpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch configuration: ${response.status} ${response.statusText}`);
    }

    const apiResponse: ApiResponse<ClientConfig> = await response.json();

    if (!apiResponse.success) {
      throw new Error(`Configuration API error: ${apiResponse.error || 'Unknown error'}`);
    }

    // Validate the configuration structure
    this.validateConfiguration(apiResponse.data as unknown as Record<string, unknown>);

    return apiResponse.data;
  }

  /**
   * Validate configuration structure
   */
  private validateConfiguration(config: Record<string, unknown>): void {
    if (!config) {
      throw new Error('Configuration is null or undefined');
    }

    // Validate Stripe configuration
    const stripe = config.stripe as Record<string, unknown>;
    if (!stripe || typeof stripe?.publishableKey !== 'string') {
      throw new Error('Invalid Stripe configuration: missing or invalid publishableKey');
    }

    // Validate API configuration
    const api = config.api as Record<string, unknown>;
    if (!api || typeof api?.baseUrl !== 'string') {
      throw new Error('Invalid API configuration: missing or invalid baseUrl');
    }

    // Validate features configuration
    if (!config.features || typeof config.features !== 'object') {
      throw new Error('Invalid features configuration: missing or invalid features object');
    }
  }

  /**
   * Provide fallback configuration when backend is unavailable
   */
  private getFallbackConfig(): ClientConfig {
    const backendUrl = getBackendUrl();

    console.warn('Using fallback configuration due to backend unavailability');

    return {
      stripe: {
        publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
        currency: 'usd',
        country: 'US',
      },
      api: {
        baseUrl: backendUrl,
        version: 'v1',
        timeout: 30000,
      },
      features: {
        // Default feature flags - all disabled for safety
        paymentProcessing: false,
        userProfiles: false,
        notifications: false,
      },
    };
  }
}

// Export singleton instance
export const configManager = new ConfigurationManager();

// Export convenience functions
export const loadConfiguration = (): Promise<ClientConfig> => configManager.loadConfig();
export const getConfiguration = (): ClientConfig | null => configManager.getConfig();
export const isConfigurationLoaded = (): boolean => configManager.isConfigLoaded();