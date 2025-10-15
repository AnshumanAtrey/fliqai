/**
 * Environment Detection Utility
 * Automatically detects and configures environment-specific settings
 */

export interface EnvironmentConfig {
  isDevelopment: boolean;
  isProduction: boolean;
  backendUrl: string;
  environment: 'development' | 'production' | 'staging';
}

class EnvironmentDetector {
  private config: EnvironmentConfig;

  constructor() {
    this.config = this.detectEnvironment();
  }

  private detectEnvironment(): EnvironmentConfig {
    const nodeEnv = process.env.NODE_ENV;
    const isDevelopment = nodeEnv === 'development';
    const isProduction = nodeEnv === 'production';
    
    // Determine environment type
    let environment: 'development' | 'production' | 'staging' = 'development';
    if (process.env.NEXT_PUBLIC_ENV === 'staging') {
      environment = 'staging';
    } else if (isProduction) {
      environment = 'production';
    }

    // Configure backend URL based on environment
    // Following Render's best practices for environment variables
    let backendUrl: string;
    if (isDevelopment) {
      // Development: Use Render URL by default (can be overridden with env var for local development)
      backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
    } else if (environment === 'staging') {
      // Staging: Use staging Render URL or override with env var
      backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-staging.onrender.com';
    } else {
      // Production: Use production Render URL or override with env var
      backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
    }

    return {
      isDevelopment,
      isProduction,
      backendUrl,
      environment,
    };
  }

  public getConfig(): EnvironmentConfig {
    return this.config;
  }

  public getBackendUrl(): string {
    return this.config.backendUrl;
  }

  public isDevelopment(): boolean {
    return this.config.isDevelopment;
  }

  public isProduction(): boolean {
    return this.config.isProduction;
  }

  public getEnvironment(): string {
    return this.config.environment;
  }
}

// Export singleton instance
export const environmentDetector = new EnvironmentDetector();

// Export convenience functions
export const getEnvironmentConfig = (): EnvironmentConfig => environmentDetector.getConfig();
export const getBackendUrl = (): string => environmentDetector.getBackendUrl();
export const isDevelopment = (): boolean => environmentDetector.isDevelopment();
export const isProduction = (): boolean => environmentDetector.isProduction();