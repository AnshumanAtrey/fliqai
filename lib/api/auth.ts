/**
 * Authentication Manager Service
 * Handles Firebase authentication with backend integration
 */

import {
  Auth,
  User as FirebaseUser,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  getIdToken as firebaseGetIdToken,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { User, AuthManager } from './types';
import { backendAPI } from './backendAPI';

class AuthManagerImpl implements AuthManager {
  private auth: Auth | null = null;
  private currentUser: User | null = null;
  private authStateListeners: ((user: User | null) => void)[] = [];
  private initialized: boolean = false;
  private firebaseConfig: Record<string, unknown> | null = null;

  constructor() {
    this.initializeAuth();
  }

  /**
   * Initialize authentication system
   */
  private async initializeAuth(): Promise<void> {
    if (this.initialized) return;

    try {
      let firebaseConfig: Record<string, unknown> | null = null;

      // Try to load Firebase configuration from backend first
      try {
        const configResponse = await backendAPI.loadConfiguration();
        if (configResponse?.success && configResponse?.config?.firebase) {
          firebaseConfig = configResponse.config.firebase as Record<string, unknown>;
        }
      } catch (error) {
        console.warn('Failed to load Firebase config from backend, using local environment variables:', error);
      }

      // Fallback to local environment variables if backend config failed
      if (!firebaseConfig) {
        firebaseConfig = {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
          measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
        };
      }

      // Ensure firebase config is a proper object with string keys
      if (typeof firebaseConfig === 'object' && firebaseConfig !== null && !Array.isArray(firebaseConfig)) {
        this.firebaseConfig = firebaseConfig;

        // Validate required Firebase config fields
        const requiredFields = ['apiKey', 'authDomain', 'projectId'];
        const missingFields = requiredFields.filter(field => !this.firebaseConfig![field]);

        if (missingFields.length > 0) {
          console.error('❌ Failed to initialize auth: Error: Missing Firebase configuration fields:', missingFields.join(', '));
          console.error('Environment variables check:');
          console.error('NEXT_PUBLIC_FIREBASE_API_KEY:', process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? 'Set' : 'Missing');
          console.error('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:', process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing');
          console.error('NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? 'Set' : 'Missing');
          throw new Error(`Missing Firebase configuration fields: ${missingFields.join(', ')}`);
        }

        // Initialize Firebase with config
        if (!getApps().length) {
          initializeApp(this.firebaseConfig);
        }

        this.auth = getAuth();

        // Set up Firebase auth state listener
        firebaseOnAuthStateChanged(this.auth, async (firebaseUser) => {
          if (firebaseUser) {
            // Get ID token and validate with backend
            try {
              const idToken = await firebaseUser.getIdToken();
              const response = await this.validateWithBackend(idToken) as { success?: boolean; data?: { uid: string; email: string; displayName: string; profileCompleted?: boolean } };

              if (response?.success && response?.data) {
                this.currentUser = {
                  uid: response.data.uid,
                  email: response.data.email,
                  displayName: response.data.displayName,
                  profileCompleted: response.data.profileCompleted ?? false
                };
              }
            } catch (error) {
              console.warn('Backend validation failed:', error);
              this.currentUser = this.mapFirebaseUser(firebaseUser);
            }
          } else {
            this.currentUser = null;
          }

          this.notifyAuthStateListeners(this.currentUser);
        });
      } else {
        throw new Error('Invalid Firebase configuration format');
      }

      this.initialized = true;
      this.notifyAuthStateListeners(this.currentUser);
    } catch (error) {
      console.error('❌ Failed to initialize auth:', error);
      this.initialized = true;
      this.notifyAuthStateListeners(null);
      throw error; // Re-throw to let calling code handle it
    }
  }

  /**
   * Validate Firebase user with backend
   */
  private async validateWithBackend(idToken: string): Promise<{ success?: boolean; data?: { uid: string; email: string; displayName: string; profileCompleted?: boolean } }> {
    return await backendAPI.post('/auth/signin', { idToken }, { requireAuth: false });
  }

  /**
   * Get the currently authenticated user
   */
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  /**
   * Check if authentication is available
   */
  isAuthenticationAvailable(): boolean {
    return this.firebaseConfig !== null;
  }

  /**
   * Get the current user's ID token
   */
  async getIdToken(): Promise<string | null> {
    if (!this.auth?.currentUser) {
      return null;
    }

    try {
      return await firebaseGetIdToken(this.auth.currentUser, true);
    } catch (error) {
      console.error('Error getting ID token:', error);
      return null;
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(email: string, password: string, displayName: string): Promise<User> {
    // Wait for initialization if not ready
    if (!this.initialized) {
      await this.initializeAuth();
    }

    if (!this.auth) {
      throw new Error('Authentication not initialized. Please check Firebase configuration.');
    }

    try {
      // Create user in Firebase (client-side)
      const { createUserWithEmailAndPassword } = await import('firebase/auth');
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);

      // Update display name if provided
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      // Try to register with backend (optional - for storing additional user data)
      try {
        const idToken = await userCredential.user.getIdToken();
        const response = await this.validateWithBackend(idToken);

        if (response?.success && response?.data) {
          // Backend has user data
          const user: User = {
            uid: response.data.uid,
            email: response.data.email,
            displayName: response.data.displayName
          };
          this.currentUser = user;
          return user;
        }
      } catch (backendError) {
        console.warn('Backend registration failed, continuing with Firebase user:', backendError);
      }

      // Fallback to Firebase user data
      const user = this.mapFirebaseUser(userCredential.user);
      this.currentUser = user;
      this.notifyAuthStateListeners(this.currentUser);
      return user;

    } catch (error: unknown) {
      console.error('Sign up error:', error);
      const errorCode = error && typeof error === 'object' && 'code' in error ? (error as { code: string }).code : undefined;
      const errorMessage = error instanceof Error ? error.message : 'Sign up failed';
      throw new Error(this.getAuthErrorMessage(errorCode || errorMessage));
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(email: string, password: string): Promise<User> {
    // Wait for initialization if not ready
    if (!this.initialized) {
      await this.initializeAuth();
    }

    if (!this.auth) {
      throw new Error('Authentication not initialized. Please check Firebase configuration.');
    }

    try {
      // Sign in with Firebase first
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);

      // Get ID token and validate with backend
      const idToken = await userCredential.user.getIdToken();
      const response = await this.validateWithBackend(idToken);

      if (response?.success && response?.data) {
        const user = {
          uid: response.data.uid,
          email: response.data.email,
          displayName: response.data.displayName
        };
        this.currentUser = user;
        return user;
      }

      // Fallback to Firebase user if backend validation fails
      const user = this.mapFirebaseUser(userCredential.user);
      this.currentUser = user;
      return user;

    } catch (error: unknown) {
      console.error('Sign in error:', error);
      const errorCode = error && typeof error === 'object' && 'code' in error ? (error as { code: string }).code : undefined;
      const errorMessage = error instanceof Error ? error.message : 'Sign in failed';
      throw new Error(this.getAuthErrorMessage(errorCode || errorMessage));
    }
  }

  /**
   * Sign in with Google OAuth
   */
  async signInWithGoogle(): Promise<User> {
    if (!this.auth) {
      throw new Error('Authentication not initialized');
    }

    try {
      // Create Google Auth Provider
      const provider = new GoogleAuthProvider();

      // Sign in with popup
      const result = await signInWithPopup(this.auth, provider);
      const idToken = await result.user.getIdToken();

      // Call backend OAuth endpoint
      const response = await backendAPI.post('/auth/oauth', {
        idToken,
        provider: 'google'
      }, { requireAuth: false }) as { success?: boolean; data?: { uid: string; email: string; displayName: string; profileCompleted?: boolean }; message?: string };

      if (response?.success && response?.data) {
        const user: User = {
          uid: response.data.uid,
          email: response.data.email,
          displayName: response.data.displayName,
          profileCompleted: response.data.profileCompleted ?? false
        };

        this.currentUser = user;
        return user;
      } else {
        throw new Error(response?.message || 'Google sign in failed');
      }
    } catch (error: unknown) {
      console.error('Google sign in error:', error);
      const errorCode = error && typeof error === 'object' && 'code' in error ? (error as { code: string }).code : undefined;
      const errorMessage = error instanceof Error ? error.message : 'Google sign in failed';
      throw new Error(this.getAuthErrorMessage(errorCode || errorMessage));
    }
  }

  /**
   * Sign out the current user
   */
  async signOut(): Promise<void> {
    try {
      // Sign out from Firebase
      if (this.auth) {
        await firebaseSignOut(this.auth);
      }

      // Call backend signout if available
      try {
        await backendAPI.post('/auth/signout', {});
      } catch (error) {
        // Backend signout is optional
        console.warn('Backend signout failed:', error);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      this.currentUser = null;
      this.notifyAuthStateListeners(null);
    }
  }

  /**
   * Listen for authentication state changes
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    this.authStateListeners.push(callback);

    // If not initialized yet, wait for initialization
    if (!this.initialized) {
      this.initializeAuth().then(() => {
        callback(this.currentUser);
      });
    } else {
      // Immediately call with current state
      callback(this.currentUser);
    }

    // Return unsubscribe function
    return () => {
      const index = this.authStateListeners.indexOf(callback);
      if (index > -1) {
        this.authStateListeners.splice(index, 1);
      }
    };
  }

  /**
   * Map Firebase user to our User interface
   */
  private mapFirebaseUser(firebaseUser: FirebaseUser): User {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      profileCompleted: false
    };
  }

  /**
   * Notify all authentication state listeners
   */
  private notifyAuthStateListeners(user: User | null): void {
    this.authStateListeners.forEach(listener => {
      try {
        listener(user);
      } catch (error) {
        console.error('Error in auth state listener:', error);
      }
    });
  }

  /**
   * Get user-friendly error message
   */
  private getAuthErrorMessage(errorCode: string): string {
    if (errorCode.startsWith('auth/')) {
      // Firebase error codes
      switch (errorCode) {
        case 'auth/user-not-found':
          return 'No account found with this email address.';
        case 'auth/wrong-password':
          return 'Incorrect password. Please try again.';
        case 'auth/invalid-email':
          return 'Please enter a valid email address.';
        case 'auth/email-already-in-use':
          return 'An account with this email already exists.';
        case 'auth/weak-password':
          return 'Password must be at least 6 characters long.';
        case 'auth/too-many-requests':
          return 'Too many failed attempts. Please try again later.';
        case 'auth/network-request-failed':
          return 'Network error. Please check your connection and try again.';
        case 'auth/invalid-credential':
          return 'Invalid credentials. Please check your email and password.';
        default:
          return 'Authentication failed. Please try again.';
      }
    }

    // Backend error messages
    const message = errorCode.toLowerCase();
    if (message.includes('email already') || message.includes('already exists')) {
      return 'An account with this email already exists.';
    }

    return errorCode || 'Authentication failed. Please try again.';
  }
}

// Export singleton instance
export const authManager = new AuthManagerImpl();

// Export class for testing
export { AuthManagerImpl };