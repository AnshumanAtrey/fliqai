"use client";
import { useState, useEffect, useCallback } from 'react';

interface ClientConfig {
  stripe: {
    publishableKey: string;
    currency: string;
    country: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
  api: {
    baseUrl: string;
    version: string;
    timeout: number;
  };
  features: {
    paymentProcessing: boolean;
    userProfiles: boolean;
    notifications: boolean;
    authentication: boolean;
  };
}

interface ConfigResponse {
  success: boolean;
  config: ClientConfig;
  environment: string;
}

export const useSecureConfig = () => {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchConfig = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/config/client`);
      const data: ConfigResponse = await response.json();

      if (data.success) {
        setConfig(data.config);
        
        // Store config in sessionStorage for quick access
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('fliq_config', JSON.stringify(data.config));
        }
      } else {
        throw new Error('Failed to fetch configuration');
      }
    } catch (err) {
      console.error('Error fetching config:', err);
      
      // Try to get cached config from sessionStorage
      if (typeof window !== 'undefined') {
        const cachedConfig = sessionStorage.getItem('fliq_config');
        if (cachedConfig) {
          try {
            setConfig(JSON.parse(cachedConfig));
            setError('Using cached configuration');
            return;
          } catch (parseErr) {
            console.error('Error parsing cached config:', parseErr);
          }
        }
      }
      
      setError(err instanceof Error ? err.message : 'Failed to fetch configuration');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check configuration health
  const checkConfigHealth = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'https://fliq-backend-bxhr.onrender.com'}/api/config/health`);
      const data = await response.json();
      return data.health.configured;
    } catch (err) {
      console.error('Error checking config health:', err);
      return false;
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    config,
    loading,
    error,
    refetch: fetchConfig,
    checkHealth: checkConfigHealth
  };
};