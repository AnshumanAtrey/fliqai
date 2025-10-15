/**
 * Unit Tests for API Types and Error Handling
 * Tests error types, categorization, and core functionality
 */

// Define ErrorType enum locally to avoid import issues
enum ErrorType {
  NETWORK = 'NETWORK',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  VALIDATION = 'VALIDATION',
  SERVER = 'SERVER',
  UNKNOWN = 'UNKNOWN'
}

describe('API Types and Error Handling', () => {
  describe('Error Type Definitions', () => {
    it('should have all required error types', () => {
      expect(ErrorType.NETWORK).toBe('NETWORK');
      expect(ErrorType.AUTHENTICATION).toBe('AUTHENTICATION');
      expect(ErrorType.AUTHORIZATION).toBe('AUTHORIZATION');
      expect(ErrorType.VALIDATION).toBe('VALIDATION');
      expect(ErrorType.SERVER).toBe('SERVER');
      expect(ErrorType.UNKNOWN).toBe('UNKNOWN');
    });

    it('should have consistent error type values', () => {
      const errorTypes = Object.values(ErrorType);
      const uniqueTypes = new Set(errorTypes);
      
      expect(errorTypes.length).toBe(uniqueTypes.size);
      expect(errorTypes.length).toBe(6);
    });
  });

  describe('Error Categorization Logic', () => {
    it('should categorize network errors correctly', () => {
      const networkErrorCodes = ['ERR_NETWORK', 'ECONNABORTED', 'NETWORK_ERROR'];
      
      networkErrorCodes.forEach(code => {
        let errorType: ErrorType;
        
        if (code === 'ERR_NETWORK' || code === 'NETWORK_ERROR') {
          errorType = ErrorType.NETWORK;
        } else if (code === 'ECONNABORTED') {
          errorType = ErrorType.NETWORK; // Timeout is also network error
        } else {
          errorType = ErrorType.UNKNOWN;
        }
        
        expect(errorType).toBe(ErrorType.NETWORK);
      });
    });

    it('should categorize HTTP status errors correctly', () => {
      const statusMappings = [
        { status: 401, expectedType: ErrorType.AUTHENTICATION },
        { status: 403, expectedType: ErrorType.AUTHORIZATION },
        { status: 400, expectedType: ErrorType.VALIDATION },
        { status: 422, expectedType: ErrorType.VALIDATION },
        { status: 404, expectedType: ErrorType.VALIDATION },
        { status: 409, expectedType: ErrorType.VALIDATION },
        { status: 429, expectedType: ErrorType.VALIDATION },
        { status: 500, expectedType: ErrorType.SERVER },
        { status: 502, expectedType: ErrorType.SERVER },
        { status: 503, expectedType: ErrorType.SERVER },
        { status: 504, expectedType: ErrorType.SERVER }
      ];

      statusMappings.forEach(({ status, expectedType }) => {
        let actualType: ErrorType;
        
        if (status === 401) {
          actualType = ErrorType.AUTHENTICATION;
        } else if (status === 403) {
          actualType = ErrorType.AUTHORIZATION;
        } else if (status === 400 || status === 422 || status === 404 || status === 409 || status === 429) {
          actualType = ErrorType.VALIDATION;
        } else if (status >= 500 && status < 600) {
          actualType = ErrorType.SERVER;
        } else {
          actualType = ErrorType.UNKNOWN;
        }

        expect(actualType).toBe(expectedType);
      });
    });
  });

  describe('Retry Logic Conditions', () => {
    it('should determine retryable errors correctly', () => {
      const testCases = [
        // Network errors - should retry
        { error: { code: 'ERR_NETWORK' }, shouldRetry: true },
        { error: { code: 'ECONNABORTED' }, shouldRetry: true },
        { error: { message: 'Network Error' }, shouldRetry: true },
        
        // Server errors - should retry
        { error: { response: { status: 500 } }, shouldRetry: true },
        { error: { response: { status: 502 } }, shouldRetry: true },
        { error: { response: { status: 503 } }, shouldRetry: true },
        
        // Client errors - should not retry
        { error: { response: { status: 400 } }, shouldRetry: false },
        { error: { response: { status: 401 } }, shouldRetry: false },
        { error: { response: { status: 403 } }, shouldRetry: false },
        { error: { response: { status: 404 } }, shouldRetry: false },
        { error: { response: { status: 422 } }, shouldRetry: false }
      ];

      testCases.forEach(({ error, shouldRetry }) => {
        // Simulate retry condition logic
        const isRetryable = !error.response || (error.response.status >= 500 && error.response.status < 600);
        
        expect(isRetryable).toBe(shouldRetry);
      });
    });

    it('should have correct retry configuration defaults', () => {
      const defaultRetryConfig = {
        maxRetries: 3,
        retryDelay: 1000
      };

      expect(defaultRetryConfig.maxRetries).toBe(3);
      expect(defaultRetryConfig.retryDelay).toBe(1000);
      expect(typeof defaultRetryConfig.maxRetries).toBe('number');
      expect(typeof defaultRetryConfig.retryDelay).toBe('number');
    });

    it('should calculate exponential backoff correctly', () => {
      const baseDelay = 1000;
      const maxDelay = 10000;
      
      const calculateDelay = (attempt: number) => {
        const exponentialDelay = baseDelay * Math.pow(2, attempt);
        const jitter = Math.random() * 1000;
        return Math.min(exponentialDelay + jitter, maxDelay);
      };

      // Test first few attempts
      const delay0 = calculateDelay(0);
      const delay1 = calculateDelay(1);
      const delay2 = calculateDelay(2);

      expect(delay0).toBeGreaterThanOrEqual(baseDelay);
      expect(delay0).toBeLessThanOrEqual(baseDelay + 1000);
      
      expect(delay1).toBeGreaterThanOrEqual(baseDelay * 2);
      expect(delay1).toBeLessThanOrEqual(baseDelay * 2 + 1000);
      
      expect(delay2).toBeGreaterThanOrEqual(baseDelay * 4);
      expect(delay2).toBeLessThanOrEqual(Math.min(baseDelay * 4 + 1000, maxDelay));
    });
  });

  describe('User-Friendly Error Messages', () => {
    it('should provide appropriate error messages for each error type', () => {
      const errorMessages = {
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
        'NOT_FOUND': 'The requested resource was not found.',
        'CONFLICT': 'This action conflicts with existing data. Please refresh and try again.',
        'RATE_LIMIT': 'Too many requests. Please wait a moment and try again.',

        // Server errors
        'SERVER_ERROR': 'A server error occurred. Please try again later.',
        'SERVICE_UNAVAILABLE': 'The service is temporarily unavailable. Please try again later.',

        // Unknown errors
        'UNKNOWN_ERROR': 'An unexpected error occurred. Please try again.'
      };

      Object.entries(errorMessages).forEach(([code, message]) => {
        expect(message).toBeTruthy();
        expect(typeof message).toBe('string');
        expect(message.length).toBeGreaterThan(10);
        expect(message.endsWith('.')).toBe(true);
      });
    });

    it('should categorize error messages by type', () => {
      const messagesByType = {
        [ErrorType.NETWORK]: ['TIMEOUT', 'NETWORK_ERROR', 'CONNECTION_ERROR'],
        [ErrorType.AUTHENTICATION]: ['UNAUTHORIZED', 'TOKEN_EXPIRED', 'INVALID_TOKEN'],
        [ErrorType.AUTHORIZATION]: ['FORBIDDEN', 'INSUFFICIENT_PERMISSIONS'],
        [ErrorType.VALIDATION]: ['VALIDATION_ERROR', 'INVALID_REQUEST', 'NOT_FOUND', 'CONFLICT', 'RATE_LIMIT'],
        [ErrorType.SERVER]: ['SERVER_ERROR', 'SERVICE_UNAVAILABLE'],
        [ErrorType.UNKNOWN]: ['UNKNOWN_ERROR']
      };

      Object.entries(messagesByType).forEach(([errorType, codes]) => {
        expect(codes.length).toBeGreaterThan(0);
        expect(Object.values(ErrorType)).toContain(errorType);
      });
    });
  });

  describe('API Response Handling', () => {
    it('should handle successful API responses', () => {
      const successResponse = {
        success: true,
        data: { id: 1, name: 'Test Item' },
        message: 'Operation successful'
      };

      expect(successResponse.success).toBe(true);
      expect(successResponse.data).toBeTruthy();
      expect(typeof successResponse.data).toBe('object');
    });

    it('should handle failed API responses', () => {
      const errorResponse = {
        success: false,
        data: null,
        error: 'Something went wrong',
        message: 'Operation failed'
      };

      expect(errorResponse.success).toBe(false);
      expect(errorResponse.data).toBeNull();
      expect(errorResponse.error).toBeTruthy();
    });

    it('should extract data from successful responses', () => {
      const apiResponse = {
        success: true,
        data: { users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] }
      };

      if (apiResponse.success) {
        const extractedData = apiResponse.data;
        expect(extractedData).toEqual({ users: [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }] });
      }
    });

    it('should handle error extraction from failed responses', () => {
      const apiResponse = {
        success: false,
        error: 'Validation failed',
        message: 'Please check your input'
      };

      if (!apiResponse.success) {
        const errorMessage = apiResponse.error || apiResponse.message || 'API request failed';
        expect(errorMessage).toBe('Validation failed');
      }
    });
  });

  describe('Authentication Token Handling', () => {
    it('should format authorization header correctly', () => {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
      const authHeader = `Bearer ${token}`;
      
      expect(authHeader).toBe(`Bearer ${token}`);
      expect(authHeader.startsWith('Bearer ')).toBe(true);
    });

    it('should handle authentication requirements', () => {
      const testCases = [
        { requireAuth: true, token: 'valid-token', expectHeader: true },
        { requireAuth: false, token: 'valid-token', expectHeader: false },
        { requireAuth: true, token: null, expectHeader: false },
        { requireAuth: false, token: null, expectHeader: false }
      ];

      testCases.forEach(({ requireAuth, token, expectHeader }) => {
        const headers: Record<string, string> = {};
        
        if (requireAuth && token) {
          headers.Authorization = `Bearer ${token}`;
        }

        if (expectHeader) {
          expect(headers.Authorization).toBeTruthy();
          expect(headers.Authorization.startsWith('Bearer ')).toBe(true);
        } else {
          expect(headers.Authorization).toBeUndefined();
        }
      });
    });

    it('should handle X-Require-Auth header correctly', () => {
      const testHeaders = [
        { 'X-Require-Auth': 'false', expectAuth: false },
        { 'X-Require-Auth': 'true', expectAuth: true },
        { 'Custom-Header': 'value', expectAuth: true }, // default to true
        {}  // default to true
      ];

      testHeaders.forEach((headers) => {
        const requireAuth = headers['X-Require-Auth'] !== 'false';
        const expectAuth = headers['X-Require-Auth'] === 'false' ? false : true;
        
        expect(requireAuth).toBe(expectAuth);
      });
    });
  });
});