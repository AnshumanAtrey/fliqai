/**
 * API Client React Hook
 * Provides React components with API client functionality including loading states and error handling
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { apiClient, ErrorType } from '../api/client';
import { RequestOptions } from '../api/types';

// Hook state interface
interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: string | null;
    errorType: ErrorType | null;
}

// Hook return interface
interface UseApiReturn<T> {
    // State
    data: T | null;
    loading: boolean;
    error: string | null;
    errorType: ErrorType | null;

    // Actions
    execute: () => Promise<T | null>;
    reset: () => void;
    clearError: () => void;
}

// Request function type
type RequestFunction<T> = () => Promise<T>;

/**
 * Hook for making API requests with loading states and error handling
 */
export function useApi<T>(
    requestFn: RequestFunction<T>,
    options?: {
        immediate?: boolean;
        onSuccess?: (data: T) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): UseApiReturn<T> {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        loading: false,
        error: null,
        errorType: null,
    });

    // Use ref to track if component is mounted to prevent state updates after unmount
    const isMountedRef = useRef(true);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, []);

    const execute = useCallback(async (): Promise<T | null> => {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();

        if (!isMountedRef.current) return null;

        setState(prev => ({
            ...prev,
            loading: true,
            error: null,
            errorType: null,
        }));

        try {
            const result = await requestFn();

            if (!isMountedRef.current) return null;

            setState(prev => ({
                ...prev,
                data: result,
                loading: false,
                error: null,
                errorType: null,
            }));

            // Call success callback if provided
            if (options?.onSuccess) {
                options.onSuccess(result);
            }

            return result;
        } catch (error: unknown) {
            if (!isMountedRef.current) return null;

            // Don't update state if request was aborted
            const errorObj = error as Error;
            if (errorObj.name === 'AbortError' || errorObj.message?.includes('aborted')) {
                return null;
            }

            const errorMessage = (error as Error)?.message || 'An unexpected error occurred';
            const errorType = (error as { type?: ErrorType })?.type || ErrorType.UNKNOWN;

            setState(prev => ({
                ...prev,
                loading: false,
                error: errorMessage,
                errorType,
            }));

            // Call error callback if provided
            if (options?.onError) {
                options.onError(errorMessage, errorType);
            }

            return null;
        }
    }, [requestFn, options]);

    const reset = useCallback(() => {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        if (!isMountedRef.current) return;

        setState({
            data: null,
            loading: false,
            error: null,
            errorType: null,
        });
    }, []);

    const clearError = useCallback(() => {
        if (!isMountedRef.current) return;

        setState(prev => ({
            ...prev,
            error: null,
            errorType: null,
        }));
    }, []);

    // Execute immediately if requested
    useEffect(() => {
        if (options?.immediate) {
            execute();
        }
    }, [execute, options?.immediate]);

    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        errorType: state.errorType,
        execute,
        reset,
        clearError,
    };
}

/**
 * Hook for making GET requests
 */
export function useApiGet<T>(
    endpoint: string,
    requestOptions?: RequestOptions,
    hookOptions?: {
        immediate?: boolean;
        onSuccess?: (data: T) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): UseApiReturn<T> {
    const requestFn = useCallback(
        () => apiClient.get<T>(endpoint, requestOptions),
        [endpoint, requestOptions]
    );

    return useApi(requestFn, hookOptions);
}

/**
 * Hook for making POST requests
 */
export function useApiPost<T, D extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    requestOptions?: RequestOptions,
    hookOptions?: {
        onSuccess?: (data: T) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): UseApiReturn<T> & { execute: (data?: D) => Promise<T | null> } {
    const [requestData, setRequestData] = useState<D | undefined>();

    const requestFn = useCallback(
        () => apiClient.post<T>(endpoint, requestData, requestOptions),
        [endpoint, requestData, requestOptions]
    );

    const baseHook = useApi(requestFn, { ...hookOptions, immediate: false });

    const execute = useCallback(
        async (data?: D): Promise<T | null> => {
            setRequestData(data);
            // Use setTimeout to ensure state update is processed before request
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await baseHook.execute();
                    resolve(result);
                }, 0);
            });
        },
        [baseHook.execute]
    );

    return {
        ...baseHook,
        execute,
    };
}

/**
 * Hook for making PUT requests
 */
export function useApiPut<T, D extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    requestOptions?: RequestOptions,
    hookOptions?: {
        onSuccess?: (data: T) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): UseApiReturn<T> & { execute: (data?: D) => Promise<T | null> } {
    const [requestData, setRequestData] = useState<D | undefined>();

    const requestFn = useCallback(
        () => apiClient.put<T>(endpoint, requestData, requestOptions),
        [endpoint, requestData, requestOptions]
    );

    const baseHook = useApi(requestFn, { ...hookOptions, immediate: false });

    const execute = useCallback(
        async (data?: D): Promise<T | null> => {
            setRequestData(data);
            // Use setTimeout to ensure state update is processed before request
            return new Promise((resolve) => {
                setTimeout(async () => {
                    const result = await baseHook.execute();
                    resolve(result);
                }, 0);
            });
        },
        [baseHook.execute]
    );

    return {
        ...baseHook,
        execute,
    };
}

/**
 * Hook for making DELETE requests
 */
export function useApiDelete<T>(
    endpoint: string,
    requestOptions?: RequestOptions,
    hookOptions?: {
        onSuccess?: (data: T) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): UseApiReturn<T> {
    const requestFn = useCallback(
        () => apiClient.delete<T>(endpoint, requestOptions),
        [endpoint, requestOptions]
    );

    return useApi(requestFn, { ...hookOptions, immediate: false });
}

/**
 * Hook for making multiple API requests in parallel
 */
export function useApiMultiple<T extends Record<string, unknown>>(
    requests: Record<keyof T, RequestFunction<T[keyof T]>>,
    options?: {
        immediate?: boolean;
        onSuccess?: (data: T) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): UseApiReturn<T> {
    const requestFn = useCallback(async (): Promise<T> => {
        const keys = Object.keys(requests) as Array<keyof T>;
        const promises = keys.map(key => requests[key]());

        const results = await Promise.all(promises);

        const data = {} as T;
        keys.forEach((key, index) => {
            data[key] = results[index];
        });

        return data;
    }, [requests]);

    return useApi(requestFn, options);
}

/**
 * Hook for paginated API requests
 */
export function useApiPaginated<T>(
    endpoint: string,
    requestOptions?: RequestOptions,
    hookOptions?: {
        pageSize?: number;
        onSuccess?: (data: T[], hasMore: boolean) => void;
        onError?: (error: string, errorType: ErrorType) => void;
    }
): Omit<UseApiReturn<{ items: T[]; hasMore: boolean; total?: number }>, 'data'> & {
    data: T[];
    loadMore: () => Promise<void>;
    hasMore: boolean;
    page: number;
    reset: () => void;
} {
    const [page, setPage] = useState(1);
    const [allData, setAllData] = useState<T[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const pageSize = hookOptions?.pageSize || 20;

    const requestFn = useCallback(
        () => apiClient.get<{ items: T[]; hasMore: boolean; total?: number }>(
            `${endpoint}?page=${page}&limit=${pageSize}`,
            requestOptions
        ),
        [endpoint, page, pageSize, requestOptions]
    );

    const baseHook = useApi<{ items: T[]; hasMore: boolean; total?: number }>(requestFn, {
        immediate: false,
        onSuccess: (response) => {
            const newItems = response.items || [];
            const newHasMore = response.hasMore ?? false;

            if (page === 1) {
                setAllData(newItems);
            } else {
                setAllData(prev => [...prev, ...newItems]);
            }

            setHasMore(newHasMore);

            if (hookOptions?.onSuccess) {
                hookOptions.onSuccess(newItems, newHasMore);
            }
        },
        onError: hookOptions?.onError,
    });

    const loadMore = useCallback(async () => {
        if (!hasMore || baseHook.loading) return;

        setPage(prev => prev + 1);
        await baseHook.execute();
    }, [hasMore, baseHook.loading, baseHook.execute]);

    const reset = useCallback(() => {
        setPage(1);
        setAllData([]);
        setHasMore(true);
        baseHook.reset();
    }, [baseHook.reset]);

    // Load first page on mount or when dependencies change
    useEffect(() => {
        if (page === 1) {
            baseHook.execute();
        }
    }, [baseHook.execute, page]);

    return {
        data: allData,
        loading: baseHook.loading,
        error: baseHook.error,
        errorType: baseHook.errorType,
        execute: baseHook.execute,
        reset,
        clearError: baseHook.clearError,
        loadMore,
        hasMore,
        page,
    };
}