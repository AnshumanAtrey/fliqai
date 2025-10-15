'use client';

/**
 * Configuration Context Provider
 * Provides configuration management across the application
 */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { ClientConfig } from '../api/types';
import { configManager } from '../api/config';

interface ConfigContextValue {
  config: ClientConfig | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextValue | undefined>(undefined);

interface ConfigProviderProps {
  children: ReactNode;
}

/**
 * Configuration Provider Component
 * Manages configuration loading and provides it to child components
 */
export function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useState<ClientConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadConfig = async () => {
    // If config is already loaded, return it immediately
    if (configManager.isConfigLoaded()) {
      const existingConfig = configManager.getConfig();
      if (existingConfig) {
        setConfig(existingConfig);
        setError(null);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      const loadedConfig = await configManager.loadConfig();
      setConfig(loadedConfig);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load configuration';
      setError(errorMessage);
      console.error('Configuration loading error:', err);

      // Still try to get fallback config if available
      const fallbackConfig = configManager.getConfig();
      if (fallbackConfig) {
        setConfig(fallbackConfig);
      }
    } finally {
      setLoading(false);
    }
  };

  const refetch = async () => {
    // Clear existing config to force reload
    configManager.clearConfig();
    await loadConfig();
  };

  // Load configuration on mount
  useEffect(() => {
    loadConfig();
  }, []);

  const value: ConfigContextValue = {
    config,
    loading,
    error,
    refetch,
  };

  return (
    <ConfigContext.Provider value={value}>
      {children}
    </ConfigContext.Provider>
  );
}

/**
 * Hook to use configuration context
 */
export function useConfigContext(): ConfigContextValue {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
}

/**
 * Error Boundary for Configuration Loading
 */
interface ConfigErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

interface ConfigErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export class ConfigErrorBoundary extends React.Component<
  ConfigErrorBoundaryProps,
  ConfigErrorBoundaryState
> {
  constructor(props: ConfigErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ConfigErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Configuration Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Configuration Error
              </h2>
              <p className="text-gray-600 mb-4">
                Failed to load application configuration. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

/**
 * Configuration Loading Component
 * Shows loading state while configuration is being loaded
 */
interface ConfigLoadingProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ConfigLoading({ children, fallback }: ConfigLoadingProps) {
  const { loading, error } = useConfigContext();

  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading application configuration...</p>
          </div>
        </div>
      )
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Configuration Error
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            The application will continue with fallback configuration.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}