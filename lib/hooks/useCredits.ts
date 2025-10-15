"use client";
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './useAuth';

interface CreditBalance {
  credits: number;
  lastUpdated: string;
}

interface CreditTransaction {
  id: string;
  credits: number;
  transactionType: 'purchase' | 'usage' | 'refund' | 'bonus';
  description: string;
  packageType?: string;
  createdAt: string;
}

interface CreditHistoryResponse {
  success: boolean;
  data: {
    transactions: CreditTransaction[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalTransactions: number;
    };
  };
}

export const useCredits = () => {
  const [credits, setCredits] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, refreshToken } = useAuth();

  // Fetch current credit balance
  const fetchCredits = useCallback(async () => {
    if (!user) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const token = await refreshToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile/credits`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setCredits(data.data.credits);
      } else {
        throw new Error(data.message || 'Failed to fetch credits');
      }
    } catch (err) {
      console.error('Error fetching credits:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch credits');
      setCredits(0);
    } finally {
      setLoading(false);
    }
  }, [user, refreshToken]);

  // Add credits after purchase
  const addCredits = useCallback(async (
    creditsToAdd: number, 
    transactionType: 'purchase' | 'bonus' = 'purchase',
    description: string = 'Credit purchase',
    packageType?: string
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const token = await refreshToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile/credits/add`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credits: creditsToAdd,
          transactionType,
          description,
          packageType
        })
      });

      const data = await response.json();

      if (data.success) {
        setCredits(data.data.newBalance);
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to add credits');
      }
    } catch (err) {
      console.error('Error adding credits:', err);
      throw err;
    }
  }, [user, refreshToken]);

  // Deduct credits for usage
  const deductCredits = useCallback(async (
    creditsToDeduct: number,
    description: string = 'Service usage',
    serviceType?: string
  ) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const token = await refreshToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile/credits/deduct`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          credits: creditsToDeduct,
          description,
          serviceType
        })
      });

      const data = await response.json();

      if (data.success) {
        setCredits(data.data.newBalance);
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to deduct credits');
      }
    } catch (err) {
      console.error('Error deducting credits:', err);
      throw err;
    }
  }, [user, refreshToken]);

  // Get credit transaction history
  const getCreditHistory = useCallback(async (
    limit: number = 20,
    offset: number = 0
  ): Promise<CreditHistoryResponse> => {
    if (!user) throw new Error('User not authenticated');

    try {
      const token = await refreshToken();
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/profile/credits/history?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        return data;
      } else {
        throw new Error(data.message || 'Failed to fetch credit history');
      }
    } catch (err) {
      console.error('Error fetching credit history:', err);
      throw err;
    }
  }, [user, refreshToken]);

  // Check if user has sufficient credits
  const hasCredits = useCallback((requiredCredits: number): boolean => {
    return credits >= requiredCredits;
  }, [credits]);

  // Fetch credits on mount and when user changes
  useEffect(() => {
    fetchCredits();
  }, [fetchCredits]);

  // Refresh credits periodically (every 5 minutes)
  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        fetchCredits();
      }, 5 * 60 * 1000); // 5 minutes

      return () => clearInterval(interval);
    }
  }, [user, fetchCredits]);

  return {
    credits,
    loading,
    error,
    fetchCredits,
    addCredits,
    deductCredits,
    getCreditHistory,
    hasCredits
  };
};

export type { CreditTransaction, CreditHistoryResponse };