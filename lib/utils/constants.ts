/**
 * Application constants for FLIQ backend integration
 * Defines API endpoints, error codes, configuration keys, and validation schemas
 */

// API Endpoints
export const API_ENDPOINTS = {
  // Configuration endpoints
  CONFIG: {
    CLIENT: '/api/config/client',
  },
  
  // Authentication endpoints
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY: '/api/auth/verify',
  },
  
  // User management endpoints
  USERS: {
    PROFILE: '/api/users/profile',
    UPDATE: '/api/users/update',
    DELETE: '/api/users/delete',
  },
  
  // University endpoints
  UNIVERSITIES: {
    LIST: '/api/universities',
    SEARCH: '/api/universities/search',
    DETAILS: '/api/universities/:id',
    PROGRAMS: '/api/universities/:id/programs',
  },
  
  // Student profile endpoints
  STUDENTS: {
    PROFILE: '/api/students/profile',
    UPDATE: '/api/students/update',
    ACADEMICS: '/api/students/academics',
    EXTRACURRICULARS: '/api/students/extracurriculars',
    ESSAYS: '/api/students/essays',
  },
  
  // Application endpoints
  APPLICATIONS: {
    LIST: '/api/applications',
    CREATE: '/api/applications',
    UPDATE: '/api/applications/:id',
    DELETE: '/api/applications/:id',
    STATUS: '/api/applications/:id/status',
  },
  
  // Payment endpoints
  PAYMENTS: {
    CREATE_INTENT: '/api/payments/create-intent',
    CONFIRM: '/api/payments/confirm',
    HISTORY: '/api/payments/history',
    SUBSCRIPTIONS: '/api/payments/subscriptions',
  },
  
  // Essay builder endpoints
  ESSAYS: {
    LIST: '/api/essays',
    CREATE: '/api/essays',
    UPDATE: '/api/essays/:id',
    DELETE: '/api/essays/:id',
    FEEDBACK: '/api/essays/:id/feedback',
  },
} as const;

// Error Codes
export const ERROR_CODES = {
  // Network errors
  NETWORK: {
    CONNECTION_FAILED: 'NETWORK_CONNECTION_FAILED',
    TIMEOUT: 'NETWORK_TIMEOUT',
    OFFLINE: 'NETWORK_OFFLINE',
  },
  
  // Authentication errors
  AUTH: {
    INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
    TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
    TOKEN_INVALID: 'AUTH_TOKEN_INVALID',
    USER_NOT_FOUND: 'AUTH_USER_NOT_FOUND',
    USER_DISABLED: 'AUTH_USER_DISABLED',
    TOO_MANY_REQUESTS: 'AUTH_TOO_MANY_REQUESTS',
    WEAK_PASSWORD: 'AUTH_WEAK_PASSWORD',
    EMAIL_ALREADY_IN_USE: 'AUTH_EMAIL_ALREADY_IN_USE',
  },
  
  // Configuration errors
  CONFIG: {
    LOAD_FAILED: 'CONFIG_LOAD_FAILED',
    INVALID_FORMAT: 'CONFIG_INVALID_FORMAT',
    MISSING_REQUIRED: 'CONFIG_MISSING_REQUIRED',
    VALIDATION_FAILED: 'CONFIG_VALIDATION_FAILED',
  },
  
  // API errors
  API: {
    BAD_REQUEST: 'API_BAD_REQUEST',
    UNAUTHORIZED: 'API_UNAUTHORIZED',
    FORBIDDEN: 'API_FORBIDDEN',
    NOT_FOUND: 'API_NOT_FOUND',
    CONFLICT: 'API_CONFLICT',
    VALIDATION_ERROR: 'API_VALIDATION_ERROR',
    INTERNAL_ERROR: 'API_INTERNAL_ERROR',
    SERVICE_UNAVAILABLE: 'API_SERVICE_UNAVAILABLE',
  },
  
  // Stripe errors
  STRIPE: {
    CARD_DECLINED: 'STRIPE_CARD_DECLINED',
    EXPIRED_CARD: 'STRIPE_EXPIRED_CARD',
    INSUFFICIENT_FUNDS: 'STRIPE_INSUFFICIENT_FUNDS',
    INCORRECT_CVC: 'STRIPE_INCORRECT_CVC',
    PROCESSING_ERROR: 'STRIPE_PROCESSING_ERROR',
    INVALID_REQUEST: 'STRIPE_INVALID_REQUEST',
  },
} as const;

// Configuration Keys
export const CONFIG_KEYS = {
  // Stripe configuration
  STRIPE: {
    PUBLISHABLE_KEY: 'stripe.publishableKey',
    CURRENCY: 'stripe.currency',
    COUNTRY: 'stripe.country',
  },
  
  // API configuration
  API: {
    BASE_URL: 'api.baseUrl',
    VERSION: 'api.version',
    TIMEOUT: 'api.timeout',
  },
  
  // Feature flags
  FEATURES: {
    ESSAY_BUILDER: 'features.essayBuilder',
    UNIVERSITY_SEARCH: 'features.universitySearch',
    PAYMENT_PROCESSING: 'features.paymentProcessing',
    ANALYTICS: 'features.analytics',
  },
  
  // Environment settings
  ENVIRONMENT: {
    NODE_ENV: 'NODE_ENV',
    VERCEL_ENV: 'VERCEL_ENV',
    NEXT_PUBLIC_VERCEL_URL: 'NEXT_PUBLIC_VERCEL_URL',
  },
} as const;

// Environment-specific constants
export const ENVIRONMENT_CONFIG = {
  DEVELOPMENT: {
    BACKEND_URL: 'https://fliq-backend-bxhr.onrender.com',
    API_TIMEOUT: 30000,
    RETRY_ATTEMPTS: 1,
    LOG_LEVEL: 'debug',
  },
  
  PRODUCTION: {
    BACKEND_URL: 'https://fliq-backend.onrender.com',
    API_TIMEOUT: 15000,
    RETRY_ATTEMPTS: 2,
    LOG_LEVEL: 'error',
  },
  
  STAGING: {
    BACKEND_URL: 'https://fliq-backend-staging.onrender.com',
    API_TIMEOUT: 12000,
    RETRY_ATTEMPTS: 3,
    LOG_LEVEL: 'warn',
  },
} as const;

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
} as const;

// Request timeouts (in milliseconds)
export const TIMEOUTS = {
  DEFAULT_REQUEST: 10000,
  LONG_REQUEST: 30000,
  SHORT_REQUEST: 5000,
  CONFIG_LOAD: 15000,
  AUTH_REQUEST: 8000,
} as const;

// Retry configuration
export const RETRY_CONFIG = {
  MAX_ATTEMPTS: 3,
  BASE_DELAY: 1000,
  MAX_DELAY: 10000,
  BACKOFF_FACTOR: 2,
  JITTER_MAX: 1000,
} as const;

// Cache configuration
export const CACHE_CONFIG = {
  CONFIG_TTL: 5 * 60 * 1000, // 5 minutes
  USER_PROFILE_TTL: 10 * 60 * 1000, // 10 minutes
  UNIVERSITY_LIST_TTL: 30 * 60 * 1000, // 30 minutes
} as const;

// Validation schemas using simple object validation
export const VALIDATION_SCHEMAS = {
  // Client configuration validation
  CLIENT_CONFIG: {
    required: ['stripe', 'api'],
    properties: {
      stripe: {
        required: ['publishableKey', 'currency'],
        properties: {
          publishableKey: { type: 'string', minLength: 1 },
          currency: { type: 'string', pattern: /^[A-Z]{3}$/ },
          country: { type: 'string', pattern: /^[A-Z]{2}$/ },
        },
      },
      api: {
        required: ['baseUrl', 'version'],
        properties: {
          baseUrl: { type: 'string', pattern: /^https?:\/\/.+/ },
          version: { type: 'string', minLength: 1 },
          timeout: { type: 'number', minimum: 1000, maximum: 60000 },
        },
      },
      features: {
        type: 'object',
        additionalProperties: { type: 'boolean' },
      },
    },
  },
  
  // API response validation
  API_RESPONSE: {
    required: ['success'],
    properties: {
      success: { type: 'boolean' },
      data: { type: 'any' },
      message: { type: 'string' },
      error: { type: 'string' },
    },
  },
  
  // User profile validation
  USER_PROFILE: {
    required: ['uid', 'email'],
    properties: {
      uid: { type: 'string', minLength: 1 },
      email: { type: 'string', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      displayName: { type: 'string' },
      photoURL: { type: 'string', pattern: /^https?:\/\/.+/ },
    },
  },
} as const;

// Firebase configuration keys
export const FIREBASE_CONFIG_KEYS = {
  API_KEY: 'apiKey',
  AUTH_DOMAIN: 'authDomain',
  PROJECT_ID: 'projectId',
  STORAGE_BUCKET: 'storageBucket',
  MESSAGING_SENDER_ID: 'messagingSenderId',
  APP_ID: 'appId',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  CONFIG_CACHE: 'fliq_config_cache',
  USER_PREFERENCES: 'fliq_user_preferences',
  THEME: 'fliq_theme',
  LAST_VISITED: 'fliq_last_visited',
} as const;

// Event names for analytics and tracking
export const EVENT_NAMES = {
  CONFIG_LOADED: 'config_loaded',
  CONFIG_LOAD_FAILED: 'config_load_failed',
  USER_SIGNED_IN: 'user_signed_in',
  USER_SIGNED_OUT: 'user_signed_out',
  API_REQUEST_STARTED: 'api_request_started',
  API_REQUEST_COMPLETED: 'api_request_completed',
  API_REQUEST_FAILED: 'api_request_failed',
  PAYMENT_INITIATED: 'payment_initiated',
  PAYMENT_COMPLETED: 'payment_completed',
  PAYMENT_FAILED: 'payment_failed',
} as const;

// Application limits and constraints
export const LIMITS = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_ESSAY_LENGTH: 5000,
  MAX_UNIVERSITIES_PER_USER: 20,
  MAX_APPLICATIONS_PER_USER: 50,
  MAX_RETRY_ATTEMPTS: 3,
  MIN_PASSWORD_LENGTH: 8,
} as const;

// Regular expressions for validation
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s\-\(\)]+$/,
  URL: /^https?:\/\/.+/,
  CURRENCY: /^[A-Z]{3}$/,
  COUNTRY_CODE: /^[A-Z]{2}$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;

// Type definitions for constants
export type ApiEndpoint = typeof API_ENDPOINTS;
export type ErrorCode = typeof ERROR_CODES;
export type ConfigKey = typeof CONFIG_KEYS;
export type HttpStatus = typeof HTTP_STATUS;
export type ValidationSchema = typeof VALIDATION_SCHEMAS;

/**
 * Utility function to get nested configuration values
 */
export function getConfigValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Utility function to validate object against schema
 */
export function validateSchema(data: any, schema: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  // Check properties
  if (schema.properties) {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in data) {
        const value = data[key];
        const prop = propSchema as any;
        
        // Type validation
        if (prop.type && prop.type !== 'any') {
          const actualType = Array.isArray(value) ? 'array' : typeof value;
          if (actualType !== prop.type) {
            errors.push(`Field ${key} should be of type ${prop.type}, got ${actualType}`);
          }
        }
        
        // String validations
        if (prop.type === 'string' && typeof value === 'string') {
          if (prop.minLength && value.length < prop.minLength) {
            errors.push(`Field ${key} should have minimum length ${prop.minLength}`);
          }
          if (prop.pattern && !prop.pattern.test(value)) {
            errors.push(`Field ${key} does not match required pattern`);
          }
        }
        
        // Number validations
        if (prop.type === 'number' && typeof value === 'number') {
          if (prop.minimum && value < prop.minimum) {
            errors.push(`Field ${key} should be at least ${prop.minimum}`);
          }
          if (prop.maximum && value > prop.maximum) {
            errors.push(`Field ${key} should be at most ${prop.maximum}`);
          }
        }
        
        // Nested object validation
        if (prop.properties) {
          const nestedResult = validateSchema(value, prop);
          errors.push(...nestedResult.errors.map(err => `${key}.${err}`));
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

/**
 * Utility function to build API endpoint URLs with parameters
 */
export function buildEndpointUrl(endpoint: string, params?: Record<string, string | number>): string {
  let url = endpoint;
  
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url = url.replace(`:${key}`, String(value));
    }
  }
  
  return url;
}

/**
 * Utility function to get environment-specific configuration
 */
export function getEnvironmentConfig() {
  const env = process.env.NODE_ENV || 'development';
  
  switch (env) {
    case 'production':
      return ENVIRONMENT_CONFIG.PRODUCTION;
    case 'staging':
      return ENVIRONMENT_CONFIG.STAGING;
    default:
      return ENVIRONMENT_CONFIG.DEVELOPMENT;
  }
}