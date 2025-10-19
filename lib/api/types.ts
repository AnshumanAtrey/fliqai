/**
 * API Type Definitions
 * Defines interfaces for API requests, responses, and configuration
 */

// Client Configuration from Backend
export interface ClientConfig {
  stripe: StripeConfig;
  api: ApiConfig;
  features: FeatureFlags;
}

export interface StripeConfig {
  publishableKey: string;
  currency: string;
  country: string;
}

export interface ApiConfig {
  baseUrl: string;
  version: string;
  timeout: number;
}

export interface FeatureFlags {
  [featureName: string]: boolean;
}

// Standard API Response Wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Error Response
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Request Options
export interface RequestOptions {
  requireAuth?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
}

// Authentication Models
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  profileCompleted?: boolean;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

// Authentication Manager Interface
export interface AuthManager {
  getCurrentUser(): User | null;
  getIdToken(): Promise<string | null>;
  signIn(email: string, password: string): Promise<User>;
  signUp(email: string, password: string, displayName: string): Promise<User>;
  signInWithGoogle(): Promise<User>;
  signOut(): Promise<void>;
  onAuthStateChanged(callback: (user: User | null) => void): () => void;
  isAuthenticationAvailable(): boolean;
}

// Configuration Manager Interface
export interface ConfigManager {
  loadConfig(): Promise<ClientConfig>;
  getConfig(): ClientConfig | null;
  isConfigLoaded(): boolean;
}

// API Client Interface
export interface ApiClient {
  get<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  post<T>(endpoint: string, data?: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  put<T>(endpoint: string, data?: Record<string, unknown>, options?: RequestOptions): Promise<T>;
  delete<T>(endpoint: string, options?: RequestOptions): Promise<T>;
  updateBaseUrl(newBaseUrl: string): void;
  getBaseUrl(): string;
}