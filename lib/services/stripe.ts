/**
 * Stripe Integration Service
 * Provides secure Stripe initialization and payment processing utilities
 */

import { loadStripe, Stripe, StripeError } from '@stripe/stripe-js';
import { configManager } from '../api/config';
import { StripeConfig } from '../api/types';

export interface StripeService {
  initialize(): Promise<Stripe | null>;
  getStripe(): Stripe | null;
  isInitialized(): boolean;
  getConfig(): StripeConfig | null;
}

export interface StripePaymentIntent {
  id: string;
  client_secret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface StripePaymentMethod {
  id: string;
  type: string;
  card?: {
    brand: string;
    last4: string;
    exp_month: number;
    exp_year: number;
  };
}

export class StripeServiceError extends Error {
  constructor(
    message: string,
    public code?: string,
    public type?: string,
    public originalError?: StripeError | Error
  ) {
    super(message);
    this.name = 'StripeServiceError';
  }
}

class StripeManager implements StripeService {
  private stripe: Stripe | null = null;
  private initializationPromise: Promise<Stripe | null> | null = null;
  private isInitializing = false;

  /**
   * Initialize Stripe with publishable key from configuration
   */
  async initialize(): Promise<Stripe | null> {
    // If already initializing, return the existing promise
    if (this.isInitializing && this.initializationPromise) {
      return this.initializationPromise;
    }

    // If already initialized, return the instance
    if (this.stripe) {
      return this.stripe;
    }

    this.isInitializing = true;
    
    this.initializationPromise = this.initializeStripe();
    
    try {
      this.stripe = await this.initializationPromise;
      return this.stripe;
    } catch (error) {
      this.handleStripeError(error, 'Failed to initialize Stripe');
      return null;
    } finally {
      this.isInitializing = false;
      this.initializationPromise = null;
    }
  }

  /**
   * Get the initialized Stripe instance
   */
  getStripe(): Stripe | null {
    return this.stripe;
  }

  /**
   * Check if Stripe is initialized
   */
  isInitialized(): boolean {
    return this.stripe !== null;
  }

  /**
   * Get Stripe configuration from config manager
   */
  getConfig(): StripeConfig | null {
    const config = configManager.getConfig();
    return config?.stripe || null;
  }

  /**
   * Create a payment intent (requires backend API call)
   */
  async createPaymentIntent(amount: number, currency?: string): Promise<StripePaymentIntent> {
    const stripeConfig = this.getConfig();
    if (!stripeConfig) {
      throw new StripeServiceError('Stripe configuration not available');
    }

    // This would typically make an API call to your backend
    // For now, we'll throw an error indicating this needs backend implementation
    throw new StripeServiceError(
      'Payment intent creation requires backend API implementation',
      'NOT_IMPLEMENTED'
    );
  }

  /**
   * Confirm a payment with payment method
   */
  async confirmPayment(
    clientSecret: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.stripe) {
      throw new StripeServiceError('Stripe not initialized');
    }

    try {
      const result = await this.stripe.confirmPayment({
        clientSecret,
        confirmParams: {
          payment_method: paymentMethodId,
        },
      });

      if (result.error) {
        return {
          success: false,
          error: this.getUserFriendlyErrorMessage(result.error),
        };
      }

      return { success: true };
    } catch (error) {
      this.handleStripeError(error, 'Failed to confirm payment');
      return {
        success: false,
        error: 'An unexpected error occurred during payment processing',
      };
    }
  }

  /**
   * Create payment method from card element
   */
  async createPaymentMethod(
    cardElement: any,
    billingDetails?: any
  ): Promise<{ paymentMethod?: StripePaymentMethod; error?: string }> {
    if (!this.stripe) {
      throw new StripeServiceError('Stripe not initialized');
    }

    try {
      const result = await this.stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (result.error) {
        return {
          error: this.getUserFriendlyErrorMessage(result.error),
        };
      }

      return {
        paymentMethod: result.paymentMethod as StripePaymentMethod,
      };
    } catch (error) {
      this.handleStripeError(error, 'Failed to create payment method');
      return {
        error: 'An unexpected error occurred while processing payment information',
      };
    }
  }

  /**
   * Initialize Stripe with configuration
   */
  private async initializeStripe(): Promise<Stripe | null> {
    // Ensure configuration is loaded
    await configManager.loadConfig();
    
    const stripeConfig = this.getConfig();
    if (!stripeConfig) {
      throw new StripeServiceError('Stripe configuration not available');
    }

    if (!stripeConfig.publishableKey) {
      throw new StripeServiceError('Stripe publishable key not configured');
    }

    // Validate publishable key format
    if (!stripeConfig.publishableKey.startsWith('pk_')) {
      throw new StripeServiceError('Invalid Stripe publishable key format');
    }

    try {
      const stripe = await loadStripe(stripeConfig.publishableKey, {
        locale: 'en', // Could be made configurable
      });

      if (!stripe) {
        throw new StripeServiceError('Failed to load Stripe library');
      }

      return stripe;
    } catch (error) {
      throw new StripeServiceError(
        'Failed to initialize Stripe',
        'INITIALIZATION_FAILED',
        'stripe_error',
        error as Error
      );
    }
  }

  /**
   * Handle Stripe errors with proper logging and user-friendly messages
   */
  private handleStripeError(error: any, context: string): void {
    console.error(`${context}:`, error);
    
    if (error instanceof StripeServiceError) {
      throw error;
    }

    // Convert Stripe errors to StripeServiceError
    if (error?.type) {
      throw new StripeServiceError(
        this.getUserFriendlyErrorMessage(error),
        error.code,
        error.type,
        error
      );
    }

    // Handle generic errors
    throw new StripeServiceError(
      `${context}: ${error?.message || 'Unknown error'}`,
      'UNKNOWN_ERROR',
      'generic_error',
      error
    );
  }

  /**
   * Convert Stripe error codes to user-friendly messages
   */
  private getUserFriendlyErrorMessage(error: StripeError): string {
    switch (error.code) {
      case 'card_declined':
        return 'Your card was declined. Please try a different payment method.';
      case 'expired_card':
        return 'Your card has expired. Please use a different payment method.';
      case 'incorrect_cvc':
        return 'Your card\'s security code is incorrect. Please check and try again.';
      case 'processing_error':
        return 'An error occurred while processing your payment. Please try again.';
      case 'incorrect_number':
        return 'Your card number is incorrect. Please check and try again.';
      case 'invalid_expiry_month':
      case 'invalid_expiry_year':
        return 'Your card\'s expiration date is invalid. Please check and try again.';
      case 'postal_code_invalid':
        return 'Your postal code is invalid. Please check and try again.';
      case 'email_invalid':
        return 'Your email address is invalid. Please check and try again.';
      case 'payment_intent_authentication_failure':
        return 'Payment authentication failed. Please try again.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }

  /**
   * Clear Stripe instance (useful for testing or re-initialization)
   */
  clear(): void {
    this.stripe = null;
    this.initializationPromise = null;
    this.isInitializing = false;
  }
}

// Export singleton instance
export const stripeService = new StripeManager();

// Export convenience functions
export const initializeStripe = (): Promise<Stripe | null> => stripeService.initialize();
export const getStripe = (): Stripe | null => stripeService.getStripe();
export const isStripeInitialized = (): boolean => stripeService.isInitialized();
export const getStripeConfig = (): StripeConfig | null => stripeService.getConfig();