"use client";
import React, { useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { usePayment } from '../lib/hooks/usePayment';
import { useCredits } from '../lib/hooks/useCredits';
import { useAuth } from '../lib/hooks/useAuth';

interface PaymentPlan {
  planId: string;
  credits: number;
  price: number;
  currency: string;
  description: string;
  popular?: boolean;
  packageType: 'student_profiles' | 'essay_revisions' | 'combo_package';
}

interface PaymentFormProps {
  plan: PaymentPlan;
  onSuccess: (result: any) => void;
  onCancel: () => void;
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      fontFamily: 'Outfit, sans-serif',
      color: '#000000',
      '::placeholder': {
        color: '#666666',
      },
      border: '1px solid #000000',
    },
    invalid: {
      color: '#df1b41',
    },
  },
};

export const PaymentForm: React.FC<PaymentFormProps> = ({ plan, onSuccess, onCancel }) => {
  const { purchaseCredits, loading: paymentLoading } = usePayment();
  const { fetchCredits, credits } = useCredits();
  const { user } = useAuth();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentData, setPaymentData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();



    if (!user) {
      setError('Please log in to continue.');
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // Process the complete payment flow
      const result = await purchaseCredits(plan, paymentData);
      
      if (result.success) {
        // Refresh credits in the header
        await fetchCredits();
        
        // Calculate new balance (current credits + added credits)
        const newBalance = credits + result.creditsAdded;
        
        // Call success callback
        onSuccess({
          paymentIntent: result.paymentIntent,
          creditsAdded: result.creditsAdded,
          newBalance: newBalance,
          plan: result.plan
        });
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white border border-black p-6 shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]">
      {/* Payment Summary */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-2">Complete Purchase</h3>
        <div className="bg-[#FFF5F0] border border-[#FF9269] p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{plan.description}</span>
            <span className="font-bold">{plan.credits} Credits</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-[#FF9269]">
              {plan.currency === 'inr' ? `₹${plan.price.toLocaleString('en-IN')}` : `$${plan.price.toFixed(2)}`} {plan.currency.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Billing Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={paymentData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full p-3 border border-black focus:outline-none focus:border-[#FF9269]"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={paymentData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full p-3 border border-black focus:outline-none focus:border-[#FF9269]"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        {/* Card Information */}
        <div>
          <label className="block text-sm font-medium mb-2">Card Information</label>
          <div className="border border-black p-3 bg-white">
            <CardElement options={cardElementOptions} />
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 px-6 py-3 border border-black hover:bg-gray-50 transition-colors font-medium"
            disabled={processing}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={processing || paymentLoading}
            className="flex-1 px-6 py-3 bg-[#FF9269] text-white font-medium hover:bg-[#e5825a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-black shadow-[2px_2px_0_0_rgba(0,0,0,0.8)]"
          >
            {processing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Processing...
              </div>
            ) : (
              plan.currency === 'inr' ? `Pay ₹${plan.price.toLocaleString('en-IN')}` : `Pay $${plan.price.toFixed(2)}`
            )}
          </button>
        </div>
      </form>

      {/* Security Notice */}
      <div className="mt-4 text-sm text-gray-600 text-center">
        <p>🔒 Your payment information is secure and encrypted</p>
      </div>
    </div>
  );
};