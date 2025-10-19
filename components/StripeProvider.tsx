"use client";
import React, { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useSecureConfig } from '../lib/hooks/useSecureConfig';

interface StripeProviderProps {
  children: ReactNode;
}

let stripePromise: Promise<import('@stripe/stripe-js').Stripe | null> | null = null;

const getStripe = (publishableKey: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

export const StripeProvider: React.FC<StripeProviderProps> = ({ children }) => {
  const { config, loading, error } = useSecureConfig();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF9269] mx-auto mb-4"></div>
          <p>Loading payment system...</p>
        </div>
      </div>
    );
  }

  if (error || !config?.stripe?.publishableKey) {
    console.error('Stripe configuration error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Payment system unavailable</p>
          <p className="text-sm mt-2">{error || 'Configuration not found'}</p>
        </div>
      </div>
    );
  }

  const stripe = getStripe(config.stripe.publishableKey);
  
  const options: StripeElementsOptions = {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#FF9269',
        colorBackground: '#ffffff',
        colorText: '#000000',
        colorDanger: '#df1b41',
        fontFamily: 'Outfit, sans-serif',
        spacingUnit: '4px',
        borderRadius: '0px', // Match the design's sharp corners
      },
    },
  };

  return (
    <Elements stripe={stripe} options={options}>
      {children}
    </Elements>
  );
};

export default StripeProvider;