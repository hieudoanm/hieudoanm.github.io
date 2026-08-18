import { renderHook, act } from '@testing-library/react';
import { useSWRegister } from '@/hooks/useSWRegister';

const mockRegister = jest.fn();

describe('useSWRegister', () => {
  beforeEach(() => {
    jest.resetModules();
    mockRegister.mockReset();
  });

  const setupNavigator = (hasServiceWorker: boolean) => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {
        serviceWorker: hasServiceWorker
          ? { register: mockRegister }
          : undefined,
      },
      configurable: true,
    });
  };

  it('returns false and does nothing without a service worker', () => {
    setupNavigator(false);
    const { result } = renderHook(() => useSWRegister());
    expect(result.current).toBe(false);
  });

  it('registers the worker in production', async () => {
    setupNavigator(true);
    mockRegister.mockResolvedValue(undefined);
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'production' });
    const { result } = renderHook(() => useSWRegister());
    await act(async () => {});
    expect(mockRegister).toHaveBeenCalledWith('/sw.js');
    expect(result.current).toBe(true);
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv });
  });

  it('does not register in development', () => {
    setupNavigator(true);
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development' });
    const { result } = renderHook(() => useSWRegister());
    expect(mockRegister).not.toHaveBeenCalled();
    expect(result.current).toBe(false);
  });

  it('returns false when registration fails', async () => {
    setupNavigator(true);
    mockRegister.mockRejectedValue(new Error('no'));
    const { result } = renderHook(() => useSWRegister());
    await act(async () => {});
    expect(result.current).toBe(false);
  });
});
