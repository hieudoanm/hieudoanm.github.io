import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '@/hooks/useSWRegister';

describe('useSWRegister', () => {
  const originalNODE_ENV = process.env.NODE_ENV;
  const originalServiceWorker = navigator.serviceWorker;

  const defineServiceWorker = (value: unknown) => {
    Object.defineProperty(navigator, 'serviceWorker', {
      value,
      configurable: true,
    });
  };

  afterEach(() => {
    Object.defineProperty(navigator, 'serviceWorker', {
      value: originalServiceWorker,
      configurable: true,
    });
    (process.env as Record<string, string | undefined>).NODE_ENV =
      originalNODE_ENV;
  });

  it('does nothing when service worker is unsupported', () => {
    Reflect.deleteProperty(navigator, 'serviceWorker');
    expect(() => renderHook(() => useSWRegister())).not.toThrow();
  });

  it('registers the service worker in production', async () => {
    const register = jest.fn().mockResolvedValue({ scope: '/sw.js' });
    defineServiceWorker({ register });
    renderHook(() => useSWRegister());
    await waitFor(() => expect(register).toHaveBeenCalledWith('/sw.js'));
  });

  it('warns when registration fails', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const register = jest.fn().mockRejectedValue(new Error('blocked'));
    defineServiceWorker({ register });
    renderHook(() => useSWRegister());
    await waitFor(() => expect(warn).toHaveBeenCalled());
    warn.mockRestore();
  });

  it('unregisters and clears caches in development', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      'development';
    const unregister = jest.fn().mockResolvedValue(undefined);
    const getRegistrations = jest
      .fn()
      .mockResolvedValue([{ scope: '/app/', unregister }]);
    const keys = jest.fn().mockResolvedValue(['v1', 'v2']);
    const deleteCache = jest.fn().mockResolvedValue(true);
    defineServiceWorker({ getRegistrations });
    Object.defineProperty(window, 'caches', {
      value: { keys, delete: deleteCache },
      configurable: true,
    });
    renderHook(() => useSWRegister());
    await waitFor(() => expect(unregister).toHaveBeenCalled());
    expect(deleteCache).toHaveBeenCalledWith('v1');
    expect(deleteCache).toHaveBeenCalledWith('v2');
  });
});
