"use client";
import { useState, useCallback } from 'react';
import { loadStripe, Stripe, StripeElements, PaymentIntent } from '@stripe/stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuth } from './useAuth';
import { useSecureConfig } from './useSecureConfig';

interface PaymentPlan {
  planId: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular?: boolean;
  selected?: boolean;
  packageType: 'student_profiles' | 'essay_revisions' | 'combo_package';
  category?: string;
  profilesUnlocked?: number;
  revisionsUnlocked?: number;
}

interface CreatePaymentIntentResponse {
  success: boolean;
  clientSecret: string;
  plan: {
    id: string;
    credits: number;
    price: number;
    name: string;
    priceFormatted: string;
  };
}

interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  creditsAdded: number;
  plan: {
    credits: number;
    price: number;
    name: string;
  };
}

export const usePayment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plans, setPlans] = useState<PaymentPlan[]>([]);
  
  const { user, refreshToken } = useAuth();
  const { config } = useSecureConfig();



  // Fetch available payment plans
  const fetchPlans = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${config?.api?.baseUrl || 'https://fliq-backend-bxhr.onrender.com'}/api/payment/plans`);
      const data = await response.json();

      if (data.success && data.plans) {
        // Transform backend plans to frontend format
        const transformedPlans: PaymentPlan[] = data.plans.map((plan: any) => {
          // Use the category from backend to determine package type
          let packageType: 'student_profiles' | 'essay_revisions' | 'combo_package';
          if (plan.category === 'student_profiles') {
            packageType = 'student_profiles';
          } else if (plan.category === 'essay_revisions') {
            packageType = 'essay_revisions';
          } else {
            packageType = 'combo_package';
          }
          
          return {
            planId: plan.id,
            credits: plan.credits,
            price: plan.price / 100, // Convert paise to rupees
            currency: 'inr',
            description: plan.name,
            popular: plan.id === 'student_profiles_100', // Mark 100 credit student profiles as popular
            packageType,
            category: plan.category,
            selected: plan.selected || false,
            profilesUnlocked: plan.profilesUnlocked,
            revisionsUnlocked: plan.revisionsUnlocked
          };
        });
        
        setPlans(transformedPlans);
        return transformedPlans;
      } else {
        throw new Error(data.message || 'Failed to fetch payment plans');
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch payment plans');
      
      // Return default plans as fallback
      const defaultPlans: PaymentPlan[] = [
        {
          planId: 'student_profiles_50',
          credits: 50,
          price: 3499,
          currency: 'inr',
          description: '50 Credits - Student Profiles',
          packageType: 'student_profiles',
          category: 'student_profiles',
          profilesUnlocked: 5
        },
        {
          planId: 'student_profiles_100',
          credits: 100,
          price: 5999,
          currency: 'inr',
          description: '100 Credits - Student Profiles',
          popular: true,
          packageType: 'student_profiles',
          category: 'student_profiles',
          profilesUnlocked: 10
        },
        {
          planId: 'essay_revisions_50',
          credits: 50,
          price: 2499,
          currency: 'inr',
          description: '50 Credits - Essay Revisions',
          packageType: 'essay_revisions',
          category: 'essay_revisions',
          revisionsUnlocked: 10
        }
      ];
      
      setPlans(defaultPlans);
      return defaultPlans;
    } finally {
      setLoading(false);
    }
  }, [config]);

  // Create payment intent
  const createPaymentIntent = useCallback(async (planId: string): Promise<CreatePaymentIntentResponse> => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setLoading(true);
      setError(null);

      const token = await refreshToken();
      const response = await fetch(`${config?.api?.baseUrl || 'https://fliq-backend-bxhr.onrender.com'}/api/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ planId })
      });

      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to create payment intent');
      }
    } catch (err) {
      console.error('Error creating payment intent:', err);
      setError(err instanceof Error ? err.message : 'Failed to create payment intent');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, refreshToken, config]);

  // Process payment with Stripe Elements
  const processPayment = useCallback(async (
    clientSecret: string,
    paymentData?: {
      name?: string;
      email?: string;
    }
  ): Promise<PaymentIntent | null> => {
    if (!stripe || !elements) {
      throw new Error('Stripe not initialized or elements not provided');
    }

    try {
      setLoading(true);
      setError(null);

      const cardElement = elements.getElement('card');
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: paymentData?.name || user?.displayName || '',
            email: paymentData?.email || user?.email || '',
          },
        },
      });

      if (error) {
        throw new Error(error.message || 'Payment failed');
      }

      return paymentIntent;
    } catch (err) {
      console.error('Error processing payment:', err);
      setError(err instanceof Error ? err.message : 'Payment processing failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [stripe, elements, user]);

  // Verify payment and add credits
  const verifyPayment = useCallback(async (paymentIntentId: string): Promise<VerifyPaymentResponse> => {
    if (!user) throw new Error('User must be authenticated');

    try {
      setLoading(true);
      setError(null);

      const token = await refreshToken();
      const response = await fetch(`${config?.api?.baseUrl || 'https://fliq-backend-bxhr.onrender.com'}/api/payment/verify-payment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paymentIntentId })
      });

      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to verify payment');
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      setError(err instanceof Error ? err.message : 'Failed to verify payment');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user, refreshToken, config]);

  // Get payment history
  const getPaymentHistory = useCallback(async () => {
    if (!user) throw new Error('User must be authenticated');

    try {
      const token = await refreshToken();
      const response = await fetch(`${config?.api?.baseUrl || 'https://fliq-backend-bxhr.onrender.com'}/api/payment/history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        return data.payments;
      } else {
        throw new Error(data.message || 'Failed to fetch payment history');
      }
    } catch (err) {
      console.error('Error fetching payment history:', err);
      throw err;
    }
  }, [user, refreshToken, config]);

  // Complete payment flow helper
  const purchaseCredits = useCallback(async (
    plan: PaymentPlan,
    paymentData?: { name?: string; email?: string }
  ) => {
    try {
      // Step 1: Create payment intent
      const paymentIntentData = await createPaymentIntent(plan.planId);
      
      // Step 2: Process payment with Stripe
      const paymentIntent = await processPayment(
        paymentIntentData.clientSecret,
        paymentData
      );

      if (paymentIntent?.status === 'succeeded') {
        // Step 3: Verify payment and add credits
        const verificationResult = await verifyPayment(paymentIntent.id);
        
        return {
          success: true,
          paymentIntent,
          creditsAdded: verificationResult.creditsAdded,
          plan: verificationResult.plan
        };
      } else {
        throw new Error('Payment not completed successfully');
      }
    } catch (err) {
      console.error('Complete purchase flow error:', err);
      throw err;
    }
  }, [createPaymentIntent, processPayment, verifyPayment]);

  return {
    stripe,
    elements,
    loading,
    error,
    plans,
    fetchPlans,
    createPaymentIntent,
    processPayment,
    verifyPayment,
    getPaymentHistory,
    purchaseCredits
  };
};