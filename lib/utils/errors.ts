/**
 * Error handling utilities for FLIQ backend integration
 * Provides error classification, mapping, and user-friendly message generation
 */

// Error categories for classification
export enum ErrorCategory {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  CONFIGURATION = 'CONFIGURATION',
  API = 'API',
  STRIPE = 'STRIPE',
  VALIDATION = 'VALIDATION',
  UNKNOWN = 'UNKNOWN'
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

// Base error interface
export interface ClassifiedError {
  category: ErrorCategory;
  severity: ErrorSeverity;
  code: string;
  message: string;
  userMessage: string;
  originalError?: Error;
  timestamp: Date;
  context?: Record<string, any>;
}

// Network error types
export class NetworkError extends Error {
  constructor(message: string, public statusCode?: number, public endpoint?: string) {
    super(message);
    this.name = 'NetworkError';
  }
}

// Authentication error types
export class AuthenticationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

// Configuration error types
export class ConfigurationError extends Error {
  constructor(message: string, public configKey?: string) {
    super(message);
    this.name = 'ConfigurationError';
  }
}

// API error types
export class ApiError extends Error {
  constructor(
    message: string, 
    public statusCode?: number, 
    public code?: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Stripe error types
export class StripeError extends Error {
  constructor(message: string, public code?: string, public type?: string) {
    super(message);
    this.name = 'StripeError';
  }
}

/**
 * Error classification function
 * Categorizes errors based on type and content
 */
export function classifyError(error: Error | unknown): ClassifiedError {
  const timestamp = new Date();
  
  // Handle known error types
  if (error instanceof NetworkError) {
    return {
      category: ErrorCategory.NETWORK,
      severity: error.statusCode && error.statusCode >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM,
      code: `NETWORK_${error.statusCode || 'UNKNOWN'}`,
      message: error.message,
      userMessage: getUserFriendlyMessage(ErrorCategory.NETWORK, error.statusCode),
      originalError: error,
      timestamp,
      context: { statusCode: error.statusCode, endpoint: error.endpoint }
    };
  }

  if (error instanceof AuthenticationError) {
    return {
      category: ErrorCategory.AUTHENTICATION,
      severity: ErrorSeverity.HIGH,
      code: error.code || 'AUTH_UNKNOWN',
      message: error.message,
      userMessage: getUserFriendlyMessage(ErrorCategory.AUTHENTICATION, error.code),
      originalError: error,
      timestamp,
      context: { code: error.code }
    };
  }

  if (error instanceof ConfigurationError) {
    return {
      category: ErrorCategory.CONFIGURATION,
      severity: ErrorSeverity.CRITICAL,
      code: 'CONFIG_ERROR',
      message: error.message,
      userMessage: getUserFriendlyMessage(ErrorCategory.CONFIGURATION),
      originalError: error,
      timestamp,
      context: { configKey: error.configKey }
    };
  }

  if (error instanceof ApiError) {
    return {
      category: ErrorCategory.API,
      severity: error.statusCode && error.statusCode >= 500 ? ErrorSeverity.HIGH : ErrorSeverity.MEDIUM,
      code: error.code || `API_${error.statusCode || 'UNKNOWN'}`,
      message: error.message,
      userMessage: getUserFriendlyMessage(ErrorCategory.API, error.statusCode),
      originalError: error,
      timestamp,
      context: { statusCode: error.statusCode, code: error.code, details: error.details }
    };
  }

  if (error instanceof StripeError) {
    return {
      category: ErrorCategory.STRIPE,
      severity: ErrorSeverity.HIGH,
      code: error.code || 'STRIPE_UNKNOWN',
      message: error.message,
      userMessage: getUserFriendlyMessage(ErrorCategory.STRIPE, error.code),
      originalError: error,
      timestamp,
      context: { code: error.code, type: error.type }
    };
  }

  // Handle generic errors
  if (error instanceof Error) {
    // Check for common error patterns
    if (error.message.includes('fetch') || error.message.includes('network')) {
      return {
        category: ErrorCategory.NETWORK,
        severity: ErrorSeverity.MEDIUM,
        code: 'NETWORK_GENERIC',
        message: error.message,
        userMessage: getUserFriendlyMessage(ErrorCategory.NETWORK),
        originalError: error,
        timestamp
      };
    }

    if (error.message.includes('auth') || error.message.includes('token')) {
      return {
        category: ErrorCategory.AUTHENTICATION,
        severity: ErrorSeverity.HIGH,
        code: 'AUTH_GENERIC',
        message: error.message,
        userMessage: getUserFriendlyMessage(ErrorCategory.AUTHENTICATION),
        originalError: error,
        timestamp
      };
    }
  }

  // Unknown error fallback
  return {
    category: ErrorCategory.UNKNOWN,
    severity: ErrorSeverity.MEDIUM,
    code: 'UNKNOWN_ERROR',
    message: error instanceof Error ? error.message : String(error),
    userMessage: getUserFriendlyMessage(ErrorCategory.UNKNOWN),
    originalError: error instanceof Error ? error : undefined,
    timestamp
  };
}

/**
 * Generate user-friendly error messages
 */
export function getUserFriendlyMessage(
  category: ErrorCategory, 
  code?: string | number
): string {
  switch (category) {
    case ErrorCategory.NETWORK:
      if (typeof code === 'number') {
        if (code >= 500) {
          return 'Our servers are experiencing issues. Please try again in a few moments.';
        }
        if (code === 404) {
          return 'The requested resource was not found. Please check your request and try again.';
        }
        if (code === 403) {
          return 'You do not have permission to access this resource.';
        }
        if (code === 401) {
          return 'Please sign in to continue.';
        }
      }
      return 'Unable to connect to our servers. Please check your internet connection and try again.';

    case ErrorCategory.AUTHENTICATION:
      if (code === 'auth/user-not-found') {
        return 'No account found with this email address.';
      }
      if (code === 'auth/wrong-password') {
        return 'Incorrect password. Please try again.';
      }
      if (code === 'auth/too-many-requests') {
        return 'Too many failed attempts. Please try again later.';
      }
      if (code === 'auth/user-disabled') {
        return 'This account has been disabled. Please contact support.';
      }
      return 'Authentication failed. Please sign in again.';

    case ErrorCategory.CONFIGURATION:
      return 'Application configuration error. Please refresh the page or contact support if the issue persists.';

    case ErrorCategory.API:
      if (typeof code === 'number') {
        if (code >= 500) {
          return 'Server error occurred. Please try again later.';
        }
        if (code === 400) {
          return 'Invalid request. Please check your input and try again.';
        }
      }
      return 'An error occurred while processing your request. Please try again.';

    case ErrorCategory.STRIPE:
      if (code === 'card_declined') {
        return 'Your card was declined. Please try a different payment method.';
      }
      if (code === 'expired_card') {
        return 'Your card has expired. Please use a different payment method.';
      }
      if (code === 'insufficient_funds') {
        return 'Insufficient funds. Please try a different payment method.';
      }
      if (code === 'incorrect_cvc') {
        return 'Your card security code is incorrect. Please check and try again.';
      }
      return 'Payment processing failed. Please try again or use a different payment method.';

    case ErrorCategory.VALIDATION:
      return 'Please check your input and try again.';

    default:
      return 'An unexpected error occurred. Please try again or contact support if the issue persists.';
  }
}

/**
 * Error logging and reporting utilities
 */
export interface ErrorLogger {
  log(error: ClassifiedError): void;
  logError(error: Error | unknown, context?: Record<string, any>): void;
  report(error: ClassifiedError): Promise<void>;
}

class ConsoleErrorLogger implements ErrorLogger {
  log(error: ClassifiedError): void {
    const logLevel = this.getLogLevel(error.severity);
    const logData = {
      category: error.category,
      severity: error.severity,
      code: error.code,
      message: error.message,
      timestamp: error.timestamp.toISOString(),
      context: error.context
    };

    console[logLevel](`[${error.category}] ${error.code}:`, logData);
    
    if (error.originalError && error.severity === ErrorSeverity.CRITICAL) {
      console.error('Original error:', error.originalError);
    }
  }

  logError(error: Error | unknown, context?: Record<string, any>): void {
    const classified = classifyError(error);
    if (context) {
      classified.context = { ...classified.context, ...context };
    }
    this.log(classified);
  }

  async report(error: ClassifiedError): Promise<void> {
    // In a real implementation, this would send to an error reporting service
    // For now, we'll just log critical errors
    if (error.severity === ErrorSeverity.CRITICAL) {
      console.error('CRITICAL ERROR REPORTED:', error);
    }
  }

  private getLogLevel(severity: ErrorSeverity): 'log' | 'warn' | 'error' {
    switch (severity) {
      case ErrorSeverity.LOW:
        return 'log';
      case ErrorSeverity.MEDIUM:
        return 'warn';
      case ErrorSeverity.HIGH:
      case ErrorSeverity.CRITICAL:
        return 'error';
      default:
        return 'log';
    }
  }
}

// Default error logger instance
export const errorLogger: ErrorLogger = new ConsoleErrorLogger();

/**
 * Utility function to handle and log errors consistently
 */
export function handleError(
  error: Error | unknown, 
  context?: Record<string, any>
): ClassifiedError {
  const classified = classifyError(error);
  
  if (context) {
    classified.context = { ...classified.context, ...context };
  }
  
  errorLogger.log(classified);
  
  // Report critical errors
  if (classified.severity === ErrorSeverity.CRITICAL) {
    errorLogger.report(classified).catch(reportError => {
      console.error('Failed to report critical error:', reportError);
    });
  }
  
  return classified;
}

/**
 * Error boundary helper for React components
 */
export function createErrorBoundaryHandler(componentName: string) {
  return (error: Error, errorInfo: { componentStack: string }) => {
    handleError(error, {
      component: componentName,
      componentStack: errorInfo.componentStack
    });
  };
}

/**
 * Retry utility with exponential backoff
 */
export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000,
  maxDelay: number = 10000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Calculate delay with exponential backoff and jitter
      const delay = Math.min(
        baseDelay * Math.pow(2, attempt) + Math.random() * 1000,
        maxDelay
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}