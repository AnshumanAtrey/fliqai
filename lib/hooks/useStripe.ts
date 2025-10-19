/**
 * Stripe React Hook
 * Provides components access to Stripe functionality with loading states and error handling
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { Stripe } from '@stripe/stripe-js';
import { 
  stripeService, 
  StripePaymentMethod 
} from '../services/stripe';
import { StripeConfig } from '../api/types';

interface UseStripeReturn {
  stripe: Stripe | null;
  config: StripeConfig | null;
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initialize: () => Promise<void>;
  createPaymentMethod: (
    cardElement: import('@stripe/stripe-js').StripeCardElement,
    billingDetails?: Record<string, unknown>
  ) => Promise<{ paymentMethod?: StripePaymentMethod; error?: string }>;
  confirmPayment: (
    clientSecret: string,
    paymentMethodId: string
  ) => Promise<{ success: boolean; error?: string }>;
}

interface UseStripePaymentReturn {
  processing: boolean;
  error: string | null;
  success: boolean;
  processPayment: (
    clientSecret: string,
    paymentMethodId: string
  ) => Promise<boolean>;
  createPaymentMethod: (
    cardElement: import('@stripe/stripe-js').StripeCardElement,
    billingDetails?: Record<string, unknown>
  ) => Promise<StripePaymentMethod | null>;
  clearError: () => void;
  reset: () => void;
}

/**
 * Main Stripe hook for components to access Stripe functionality
 */
export function useStripe(): UseStripeReturn {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [config, setConfig] = useState<StripeConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [initialized, setInitialized] = useState<boolean>(false);
  const initializationAttempted = useRef<boolean>(false);

  const initialize = useCallback(async () => {
    // Prevent multiple initialization attempts
    if (initializationAttempted.current || initialized) {
      return;
    }

    initializationAttempted.current = true;
    setLoading(true);
    setError(null);

    try {
      const stripeInstance = await stripeService.initialize();
      const stripeConfig = stripeService.getConfig();

      setStripe(stripeInstance);
      setConfig(stripeConfig);
      setInitialized(stripeInstance !== null);
      setError(null);
    } catch (err) {
      const errorMessage = (err as Error)?.name === 'StripeServiceError'
        ? (err as Error).message 
        : 'Failed to initialize Stripe';
      
      setError(errorMessage);
      setInitialized(false);
      console.error('Stripe initialization error:', err);
    } finally {
      setLoading(false);
    }
  }, [initialized]);

  const createPaymentMethod = useCallback(async (
    cardElement: import('@stripe/stripe-js').StripeCardElement,
    billingDetails?: Record<string, unknown>
  ): Promise<{ paymentMethod?: StripePaymentMethod; error?: string }> => {
    if (!initialized || !stripe) {
      return { error: 'Stripe not initialized' };
    }

    try {
      return await stripeService.createPaymentMethod(cardElement, billingDetails);
    } catch (err) {
      const errorMessage = (err as Error)?.name === 'StripeServiceError'
        ? (err as Error).message 
        : 'Failed to create payment method';
      
      return { error: errorMessage };
    }
  }, [initialized, stripe]);

  const confirmPayment = useCallback(async (
    clientSecret: string,
    paymentMethodId: string
  ): Promise<{ success: boolean; error?: string }> => {
    if (!initialized || !stripe) {
      return { success: false, error: 'Stripe not initialized' };
    }

    try {
      return await stripeService.confirmPayment(clientSecret, paymentMethodId);
    } catch (err) {
      const errorMessage = (err as Error)?.name === 'StripeServiceError'
        ? (err as Error).message 
        : 'Failed to confirm payment';
      
      return { success: false, error: errorMessage };
    }
  }, [initialized, stripe]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    stripe,
    config,
    loading,
    error,
    initialized,
    initialize,
    createPaymentMethod,
    confirmPayment,
  };
}

/**
 * Specialized hook for payment processing with enhanced state management
 */
export function useStripePayment(): UseStripePaymentReturn {
  const { stripe, initialized } = useStripe();
  const [processing, setProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const processPayment = useCallback(async (
    clientSecret: string,
    paymentMethodId: string
  ): Promise<boolean> => {
    if (!initialized || !stripe) {
      setError('Stripe not initialized');
      return false;
    }

    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await stripeService.confirmPayment(clientSecret, paymentMethodId);
      
      if (result.success) {
        setSuccess(true);
        return true;
      } else {
        setError(result.error || 'Payment failed');
        return false;
      }
    } catch (err) {
      const errorMessage = (err as Error)?.name === 'StripeServiceError'
        ? (err as Error).message 
        : 'Payment processing failed';
      
      setError(errorMessage);
      return false;
    } finally {
      setProcessing(false);
    }
  }, [initialized, stripe]);

  const createPaymentMethod = useCallback(async (
    cardElement: import('@stripe/stripe-js').StripeCardElement,
    billingDetails?: Record<string, unknown>
  ): Promise<StripePaymentMethod | null> => {
    if (!initialized || !stripe) {
      setError('Stripe not initialized');
      return null;
    }

    setError(null);

    try {
      const result = await stripeService.createPaymentMethod(cardElement, billingDetails);
      
      if (result.paymentMethod) {
        return result.paymentMethod;
      } else {
        setError(result.error || 'Failed to create payment method');
        return null;
      }
    } catch (err) {
      const errorMessage = (err as Error)?.name === 'StripeServiceError'
        ? (err as Error).message 
        : 'Failed to create payment method';
      
      setError(errorMessage);
      return null;
    }
  }, [initialized, stripe]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setProcessing(false);
    setError(null);
    setSuccess(false);
  }, []);

  return {
    processing,
    error,
    success,
    processPayment,
    createPaymentMethod,
    clearError,
    reset,
  };
}

/**
 * Hook for accessing Stripe configuration only
 */
export function useStripeConfig() {
  const { config, loading, error } = useStripe();

  return {
    config,
    loading,
    error,
    isConfigured: config !== null && !!config.publishableKey,
  };
}

/**
 * Hook for checking if Stripe is ready for use
 */
export function useStripeReady() {
  const { stripe, initialized, loading, error } = useStripe();

  return {
    ready: initialized && stripe !== null && !loading && !error,
    loading,
    error,
    stripe,
  };
}