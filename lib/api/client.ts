/**
 * Centralized API Client Service
 * Handles all backend communications with automatic authentication and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError, RequestOptions } from './types';
import { authManager } from './auth';
import { configManager } from './config';
import { getEnvironmentConfig } from '../services/environment';

// Retry configuration
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryCondition: (error: AxiosError) => boolean;
}

// Error types for categorization
export enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}

export interface CategorizedError {
  type: ErrorType;
  code: string;
  message: string;
  originalError?: any;
}

/**
 * Main API Client class for all backend communications
 */
export class ApiClient {
  private axiosInstance: AxiosInstance;
  private baseUrl: string;
  private retryConfig: RetryConfig;

  constructor() {
    // Get base URL from environment or config
    const envConfig = getEnvironmentConfig();
    this.baseUrl = envConfig.backendUrl;

    // Default retry configuration
    this.retryConfig = {
      maxRetries: 1, // Reduced retries for faster failures
      retryDelay: 2000, // 2 second base delay
      retryCondition: (error: AxiosError) => {
        // Only retry on 5xx server errors, not network errors (to fail faster)
        return !!(error.response && error.response.status >= 500 && error.response.status < 600);
      }
    };

    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Set up request interceptor for authentication
    this.setupRequestInterceptor();
    
    // Set up response interceptor for error handling
    this.setupResponseInterceptor();
  }

  /**
   * GET request with retry logic
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.executeWithRetry(async () => {
      const config = this.buildRequestConfig(options);
      const response = await this.axiosInstance.get<ApiResponse<T>>(endpoint, config);
      return this.extractData(response);
    });
  }

  /**
   * POST request with retry logic
   */
  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.executeWithRetry(async () => {
      const config = this.buildRequestConfig(options);
      const response = await this.axiosInstance.post<ApiResponse<T>>(endpoint, data, config);
      return this.extractData(response);
    });
  }

  /**
   * PUT request with retry logic
   */
  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.executeWithRetry(async () => {
      const config = this.buildRequestConfig(options);
      const response = await this.axiosInstance.put<ApiResponse<T>>(endpoint, data, config);
      return this.extractData(response);
    });
  }

  /**
   * DELETE request with retry logic
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.executeWithRetry(async () => {
      const config = this.buildRequestConfig(options);
      const response = await this.axiosInstance.delete<ApiResponse<T>>(endpoint, config);
      return this.extractData(response);
    });
  }

  /**
   * Build request configuration from options
   */
  private buildRequestConfig(options?: RequestOptions): AxiosRequestConfig {
    const config: AxiosRequestConfig = {
      headers: { ...options?.headers },
    };

    if (options?.timeout) {
      config.timeout = options.timeout;
    }

    return config;
  }

  /**
   * Execute request with retry logic
   */
  private async executeWithRetry<T>(requestFn: () => Promise<T>): Promise<T> {
    let lastError: any;
    
    for (let attempt = 0; attempt <= this.retryConfig.maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error: any) {
        lastError = error;
        
        // Don't retry on the last attempt
        if (attempt === this.retryConfig.maxRetries) {
          break;
        }
        
        // Check if we should retry this error
        const axiosError = error as AxiosError;
        if (!this.retryConfig.retryCondition(axiosError)) {
          break;
        }
        
        // Calculate delay with exponential backoff
        const delay = this.calculateRetryDelay(attempt);
        
        console.warn(`API request failed (attempt ${attempt + 1}/${this.retryConfig.maxRetries + 1}), retrying in ${delay}ms:`, {
          error: error.message,
          endpoint: axiosError.config?.url,
          method: axiosError.config?.method?.toUpperCase(),
        });
        
        // Wait before retrying
        await this.sleep(delay);
      }
    }
    
    throw lastError;
  }

  /**
   * Calculate retry delay with exponential backoff
   */
  private calculateRetryDelay(attempt: number): number {
    // Exponential backoff: base delay * 2^attempt + random jitter
    const exponentialDelay = this.retryConfig.retryDelay * Math.pow(2, attempt);
    const jitter = Math.random() * 1000; // Add up to 1 second of random jitter
    return Math.min(exponentialDelay + jitter, 10000); // Cap at 10 seconds
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Extract data from API response wrapper
   */
  private extractData<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const apiResponse = response.data;
    
    if (!apiResponse.success) {
      throw new Error(apiResponse.error || apiResponse.message || 'API request failed');
    }

    return apiResponse.data;
  }

  /**
   * Set up request interceptor for automatic authentication
   */
  private setupRequestInterceptor(): void {
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Check if authentication is required (default to true for most endpoints)
        const requireAuth = config.headers?.['X-Require-Auth'] !== 'false';
        
        if (requireAuth) {
          try {
            const token = await authManager.getIdToken();
            if (token) {
              config.headers = config.headers || {};
              config.headers.Authorization = `Bearer ${token}`;
            }
          } catch (error) {
            console.warn('Failed to get authentication token:', error);
            // Continue with request without token - let backend handle auth error
          }
        }

        // Remove our custom header
        if (config.headers?.['X-Require-Auth']) {
          delete config.headers['X-Require-Auth'];
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  /**
   * Set up response interceptor for error handling
   */
  private setupResponseInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        const categorizedError = this.categorizeError(error);
        
        // Log error for debugging
        console.error('API Error:', {
          type: categorizedError.type,
          code: categorizedError.code,
          message: categorizedError.message,
          endpoint: error.config?.url,
          method: error.config?.method?.toUpperCase(),
        });

        // Convert to a more user-friendly error
        const friendlyError = new Error(categorizedError.message);
        (friendlyError as any).type = categorizedError.type;
        (friendlyError as any).code = categorizedError.code;
        (friendlyError as any).originalError = categorizedError.originalError;

        return Promise.reject(friendlyError);
      }
    );
  }

  /**
   * Categorize errors for better handling
   */
  private categorizeError(error: AxiosError): CategorizedError {
    // Network errors (no response received)
    if (!error.response) {
      return this.handleNetworkError(error);
    }

    const status = error.response.status;
    const responseData = error.response.data as any;

    // Authentication errors
    if (status === 401) {
      return this.handleAuthenticationError(responseData, error);
    }

    // Authorization errors
    if (status === 403) {
      return this.handleAuthorizationError(responseData, error);
    }

    // Validation errors
    if (status === 400 || status === 422) {
      return this.handleValidationError(responseData, error);
    }

    // Server errors
    if (status >= 500) {
      return this.handleServerError(responseData, error);
    }

    // Client errors (404, 409, etc.)
    if (status >= 400 && status < 500) {
      return this.handleClientError(status, responseData, error);
    }

    // Unknown errors
    return {
      type: ErrorType.UNKNOWN,
      code: responseData?.code || 'UNKNOWN_ERROR',
      message: this.getFriendlyErrorMessage('UNKNOWN_ERROR', responseData?.message),
      originalError: error
    };
  }

  /**
   * Handle network-related errors
   */
  private handleNetworkError(error: AxiosError): CategorizedError {
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return {
        type: ErrorType.NETWORK,
        code: 'TIMEOUT',
        message: this.getFriendlyErrorMessage('TIMEOUT'),
        originalError: error
      };
    }

    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      return {
        type: ErrorType.NETWORK,
        code: 'NETWORK_ERROR',
        message: this.getFriendlyErrorMessage('NETWORK_ERROR'),
        originalError: error
      };
    }

    return {
      type: ErrorType.NETWORK,
      code: 'CONNECTION_ERROR',
      message: this.getFriendlyErrorMessage('CONNECTION_ERROR'),
      originalError: error
    };
  }

  /**
   * Handle authentication errors
   */
  private handleAuthenticationError(responseData: any, error: AxiosError): CategorizedError {
    const code = responseData?.code || 'UNAUTHORIZED';
    return {
      type: ErrorType.AUTHENTICATION,
      code,
      message: this.getFriendlyErrorMessage(code, responseData?.message),
      originalError: error
    };
  }

  /**
   * Handle authorization errors
   */
  private handleAuthorizationError(responseData: any, error: AxiosError): CategorizedError {
    const code = responseData?.code || 'FORBIDDEN';
    return {
      type: ErrorType.AUTHORIZATION,
      code,
      message: this.getFriendlyErrorMessage(code, responseData?.message),
      originalError: error
    };
  }

  /**
   * Handle validation errors
   */
  private handleValidationError(responseData: any, error: AxiosError): CategorizedError {
    const code = responseData?.code || 'VALIDATION_ERROR';
    return {
      type: ErrorType.VALIDATION,
      code,
      message: this.getFriendlyErrorMessage(code, responseData?.message),
      originalError: error
    };
  }

  /**
   * Handle server errors
   */
  private handleServerError(responseData: any, error: AxiosError): CategorizedError {
    const code = responseData?.code || 'SERVER_ERROR';
    return {
      type: ErrorType.SERVER,
      code,
      message: this.getFriendlyErrorMessage(code, responseData?.message),
      originalError: error
    };
  }

  /**
   * Handle other client errors
   */
  private handleClientError(status: number, responseData: any, error: AxiosError): CategorizedError {
    let code = responseData?.code;
    let type = ErrorType.UNKNOWN;

    switch (status) {
      case 404:
        code = code || 'NOT_FOUND';
        type = ErrorType.VALIDATION;
        break;
      case 409:
        code = code || 'CONFLICT';
        type = ErrorType.VALIDATION;
        break;
      case 429:
        code = code || 'RATE_LIMIT';
        type = ErrorType.VALIDATION;
        break;
      default:
        code = code || 'CLIENT_ERROR';
    }

    return {
      type,
      code,
      message: this.getFriendlyErrorMessage(code, responseData?.message),
      originalError: error
    };
  }

  /**
   * Get user-friendly error messages
   */
  private getFriendlyErrorMessage(code: string, fallbackMessage?: string): string {
    const errorMessages: Record<string, string> = {
      // Network errors
      'TIMEOUT': 'The request took too long to complete. Please check your connection and try again.',
      'NETWORK_ERROR': 'Unable to connect to the server. Please check your internet connection.',
      'CONNECTION_ERROR': 'Connection failed. Please check your internet connection and try again.',

      // Authentication errors
      'UNAUTHORIZED': 'You need to sign in to access this feature.',
      'TOKEN_EXPIRED': 'Your session has expired. Please sign in again.',
      'INVALID_TOKEN': 'Authentication failed. Please sign in again.',

      // Authorization errors
      'FORBIDDEN': 'You do not have permission to perform this action.',
      'INSUFFICIENT_PERMISSIONS': 'You need additional permissions to access this feature.',

      // Validation errors
      'VALIDATION_ERROR': 'Please check your input and try again.',
      'INVALID_REQUEST': 'The request contains invalid data. Please check your input.',
      'MISSING_REQUIRED_FIELD': 'Please fill in all required fields.',
      'NOT_FOUND': 'The requested resource was not found.',
      'CONFLICT': 'This action conflicts with existing data. Please refresh and try again.',
      'RATE_LIMIT': 'Too many requests. Please wait a moment and try again.',

      // Server errors
      'SERVER_ERROR': 'A server error occurred. Please try again later.',
      'SERVICE_UNAVAILABLE': 'The service is temporarily unavailable. Please try again later.',
      'MAINTENANCE': 'The service is under maintenance. Please try again later.',

      // Unknown errors
      'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again.',
    };

    return errorMessages[code] || fallbackMessage || errorMessages['UNKNOWN_ERROR'];
  }

  /**
   * Update base URL (useful for configuration changes)
   */
  updateBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl;
    this.axiosInstance.defaults.baseURL = newBaseUrl;
  }

  /**
   * Get current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Update retry configuration
   */
  updateRetryConfig(config: Partial<RetryConfig>): void {
    this.retryConfig = { ...this.retryConfig, ...config };
  }

  /**
   * Get current retry configuration
   */
  getRetryConfig(): RetryConfig {
    return { ...this.retryConfig };
  }

  /**
   * Check if an error is retryable
   */
  isRetryableError(error: any): boolean {
    if (error.type) {
      // Use our categorized error type
      return error.type === ErrorType.NETWORK || error.type === ErrorType.SERVER;
    }
    
    // Fallback to axios error checking
    const axiosError = error as AxiosError;
    return this.retryConfig.retryCondition(axiosError);
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export class for testing
export { ApiClient as ApiClientClass };