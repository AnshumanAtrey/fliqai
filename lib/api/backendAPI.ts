/**
 * Backend A  private getDefaultBaseUrl(): string {
    // Always use Render URL by default (can be overridden with env var for local backend development)
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
  } Handles communication with the FLIQ backend API
 */

import { User, ApiResponse, ApiClient, RequestOptions } from './types';

class BackendAPIClient implements ApiClient {
  private baseUrl: string;
  private defaultTimeout: number = 30000;

  constructor(baseUrl?: string) {
    // Auto-detect base URL based on environment
    this.baseUrl = baseUrl || this.getDefaultBaseUrl();
  }

  private getDefaultBaseUrl(): string {
    if (typeof window !== 'undefined') {
      // Client-side - check hostname
      const hostname = window.location.hostname;
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'https://fliq-backend-bxhr.onrender.com';
      }
    }
    
    // Production or server-side
    return process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com';
  }

  /**
   * Load configuration from backend
   */
  async loadConfiguration(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/config/client`);
      
      if (!response.ok) {
        throw new Error(`Failed to load configuration: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Backend returns both 'data' and 'config' for compatibility
      // Extract the configuration from either field
      const configData = data.data || data.config;
      
      return { 
        success: data.success, 
        config: configData
      };
    } catch (error: any) {
      console.error('Configuration load error:', error);
      return { success: false, message: error.message };
    }
  }

  /**
   * Update base URL
   */
  updateBaseUrl(newBaseUrl: string): void {
    this.baseUrl = newBaseUrl;
  }

  /**
   * Get current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Make HTTP request to backend
   */
  private async makeRequest<T>(
    method: string, 
    endpoint: string, 
    data?: any, 
    options: RequestOptions = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`;
    
    // Get auth token if required
    let authToken = null;
    if (options.requireAuth !== false) {
      authToken = this.getStoredToken();
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (authToken) {
      headers['Authorization'] = `Bearer ${authToken}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), options.timeout || this.defaultTimeout);

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      if (!responseData.success) {
        throw new Error(responseData.message || 'API request failed');
      }

      return responseData;
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }
      
      throw error;
    }
  }

  /**
   * GET request
   */
  async get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>('GET', endpoint, undefined, options);
  }

  /**
   * POST request
   */
  async post<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>('POST', endpoint, data, options);
  }

  /**
   * PUT request
   */
  async put<T>(endpoint: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>('PUT', endpoint, data, options);
  }

  /**
   * DELETE request
   */
  async delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
    return this.makeRequest<T>('DELETE', endpoint, undefined, options);
  }

  /**
   * Authentication Methods
   */

  /**
   * Sign up new user
   */
  async signUp(email: string, password: string, displayName: string): Promise<ApiResponse<User>> {
    return this.post('/auth/signup', {
      email,
      password,
      displayName
    }, { requireAuth: false });
  }

  /**
   * Sign in user
   */
  async signIn(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await this.post<ApiResponse<{ user: User; token: string }>>('/auth/signin', {
      email,
      password
    }, { requireAuth: false });

    // Store token for subsequent requests
    if (response.success && response.data?.token) {
      this.storeToken(response.data.token);
    }

    return response;
  }

  /**
   * Sign out user
   */
  async signOut(): Promise<ApiResponse<any>> {
    const result = await this.post<ApiResponse<any>>('/auth/signout', {}, { requireAuth: true });
    
    // Clear stored token
    this.clearToken();
    
    return result;
  }

  /**
   * Get current user info
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return this.get('/auth/me', { requireAuth: true });
  }

  /**
   * Token Management
   */

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('fliq_auth_token');
  }

  private storeToken(token: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('fliq_auth_token', token);
  }

  private clearToken(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('fliq_auth_token');
  }

  /**
   * Check if user has valid token
   */
  hasValidToken(): boolean {
    const token = this.getStoredToken();
    if (!token) return false;

    try {
      // Basic JWT structure check
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      // Decode payload to check expiry (basic check)
      const payload = JSON.parse(atob(parts[1]));
      const now = Date.now() / 1000;
      
      return payload.exp && payload.exp > now;
    } catch (error) {
      console.warn('Invalid token format:', error);
      return false;
    }
  }
}

// Export singleton instance
export const backendAPI = new BackendAPIClient();

// Export class for testing
export { BackendAPIClient };