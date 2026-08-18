import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '@/hooks/useSWRegister';

const setServiceWorker = (value: unknown): void => {
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value,
  });
};

const setNodeEnv = (value: string): void => {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
};

describe('useSWRegister', () => {
  const originalEnv = process.env.NODE_ENV;

  afterEach(() => {
    setNodeEnv(originalEnv);
    jest.restoreAllMocks();
    // @ts-expect-error cleanup global stub
    delete global.caches;
  });

  it('unregisters and clears caches in development', async () => {
    setNodeEnv('development');
    const unregister = jest.fn().mockResolvedValue(undefined);
    const deleteCache = jest.fn().mockResolvedValue(undefined);
    setServiceWorker({
      getRegistrations: jest
        .fn()
        .mockResolvedValue([{ unregister, scope: '/sw.js' }]),
    });
    Object.defineProperty(globalThis, 'caches', {
      configurable: true,
      value: {
        keys: jest.fn().mockResolvedValue(['cache-1']),
        delete: deleteCache,
      },
    });

    renderHook(() => useSWRegister());
    await waitFor(() => expect(unregister).toHaveBeenCalled());
    expect(deleteCache).toHaveBeenCalledWith('cache-1');
  });

  it('does nothing when service workers are unsupported', () => {
    setNodeEnv('development');
    delete (navigator as unknown as Record<string, unknown>).serviceWorker;
    expect(() => renderHook(() => useSWRegister())).not.toThrow();
  });

  it('registers the service worker in production', async () => {
    setNodeEnv('production');
    const register = jest.fn().mockResolvedValue({ scope: '/sw.js' });
    setServiceWorker({ register });

    renderHook(() => useSWRegister());
    await waitFor(() => expect(register).toHaveBeenCalledWith('/sw.js'));
  });

  it('warns when registration fails', async () => {
    setNodeEnv('production');
    const warn = jest.spyOn(console, 'warn').mockImplementation();
    setServiceWorker({
      register: jest
        .fn()
        .mockRejectedValue(new Error('no service worker support')),
    });

    renderHook(() => useSWRegister());
    await waitFor(() => expect(warn).toHaveBeenCalled());
  });
});
