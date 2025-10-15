/**
 * useStripe Hook Tests
 */

import { renderHook, act } from '@testing-library/react';
import { useStripe, useStripePayment, useStripeConfig } from '../useStripe';
import { stripeService } from '../../services/stripe';

// Mock the stripe service
jest.mock('../../services/stripe', () => ({
  stripeService: {
    initialize: jest.fn(),
    getConfig: jest.fn(),
    isInitialized: jest.fn(),
    createPaymentMethod: jest.fn(),
    confirmPayment: jest.fn(),
  },
}));

const mockStripeService = stripeService as jest.Mocked<typeof stripeService>;

describe('useStripe', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize Stripe on mount', async () => {
    const mockStripeInstance = { id: 'stripe-instance' };
    const mockConfig = {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    };

    mockStripeService.initialize.mockResolvedValue(mockStripeInstance as any);
    mockStripeService.getConfig.mockReturnValue(mockConfig);

    const { result } = renderHook(() => useStripe());

    expect(result.current.loading).toBe(true);
    expect(result.current.initialized).toBe(false);

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(mockStripeService.initialize).toHaveBeenCalled();
  });

  it('should handle initialization error', async () => {
    const error = new Error('Initialization failed');
    mockStripeService.initialize.mockRejectedValue(error);

    const { result } = renderHook(() => useStripe());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.error).toBe('Failed to initialize Stripe');
    expect(result.current.initialized).toBe(false);
  });

  it('should create payment method', async () => {
    const mockStripeInstance = { id: 'stripe-instance' };
    const mockConfig = {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    };
    const mockPaymentMethod = { id: 'pm_123', type: 'card' };

    mockStripeService.initialize.mockResolvedValue(mockStripeInstance as any);
    mockStripeService.getConfig.mockReturnValue(mockConfig);
    mockStripeService.createPaymentMethod.mockResolvedValue({
      paymentMethod: mockPaymentMethod as any,
    });

    const { result } = renderHook(() => useStripe());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    let paymentMethodResult;
    await act(async () => {
      paymentMethodResult = await result.current.createPaymentMethod({});
    });

    expect(paymentMethodResult).toEqual({ paymentMethod: mockPaymentMethod });
  });

  it('should confirm payment', async () => {
    const mockStripeInstance = { id: 'stripe-instance' };
    const mockConfig = {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    };

    mockStripeService.initialize.mockResolvedValue(mockStripeInstance as any);
    mockStripeService.getConfig.mockReturnValue(mockConfig);
    mockStripeService.confirmPayment.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useStripe());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    let paymentResult;
    await act(async () => {
      paymentResult = await result.current.confirmPayment('pi_123_secret', 'pm_123');
    });

    expect(paymentResult).toEqual({ success: true });
  });
});

describe('useStripePayment', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process payment successfully', async () => {
    const mockStripeInstance = { id: 'stripe-instance' };
    const mockConfig = {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    };

    mockStripeService.initialize.mockResolvedValue(mockStripeInstance as any);
    mockStripeService.getConfig.mockReturnValue(mockConfig);
    mockStripeService.confirmPayment.mockResolvedValue({ success: true });

    const { result } = renderHook(() => useStripePayment());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    let paymentResult;
    await act(async () => {
      paymentResult = await result.current.processPayment('pi_123_secret', 'pm_123');
    });

    expect(paymentResult).toBe(true);
    expect(result.current.success).toBe(true);
    expect(result.current.error).toBeNull();
  });

  it('should handle payment failure', async () => {
    const mockStripeInstance = { id: 'stripe-instance' };
    const mockConfig = {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    };

    mockStripeService.initialize.mockResolvedValue(mockStripeInstance as any);
    mockStripeService.getConfig.mockReturnValue(mockConfig);
    mockStripeService.confirmPayment.mockResolvedValue({ 
      success: false, 
      error: 'Payment declined' 
    });

    const { result } = renderHook(() => useStripePayment());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    let paymentResult;
    await act(async () => {
      paymentResult = await result.current.processPayment('pi_123_secret', 'pm_123');
    });

    expect(paymentResult).toBe(false);
    expect(result.current.success).toBe(false);
    expect(result.current.error).toBe('Payment declined');
  });

  it('should reset state', async () => {
    const { result } = renderHook(() => useStripePayment());

    act(() => {
      result.current.reset();
    });

    expect(result.current.processing).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.success).toBe(false);
  });
});

describe('useStripeConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return Stripe configuration', async () => {
    const mockStripeInstance = { id: 'stripe-instance' };
    const mockConfig = {
      publishableKey: 'pk_test_123',
      currency: 'usd',
      country: 'US',
    };

    mockStripeService.initialize.mockResolvedValue(mockStripeInstance as any);
    mockStripeService.getConfig.mockReturnValue(mockConfig);

    const { result } = renderHook(() => useStripeConfig());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.config).toBe(mockConfig);
    expect(result.current.isConfigured).toBe(true);
  });

  it('should indicate when not configured', async () => {
    mockStripeService.initialize.mockResolvedValue(null);
    mockStripeService.getConfig.mockReturnValue(null);

    const { result } = renderHook(() => useStripeConfig());

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.config).toBeNull();
    expect(result.current.isConfigured).toBe(false);
  });
});