import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '../useSWRegister';

const originalEnv = process.env.NODE_ENV;
const realNavigator = globalThis.navigator;

afterEach(() => {
  (process.env as Record<string, string | undefined>).NODE_ENV = originalEnv;
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: realNavigator,
  });
  delete (globalThis as unknown as Record<string, unknown>).caches;
  jest.restoreAllMocks();
});

const mockServiceWorker = () => {
  const unregister = jest.fn().mockResolvedValue(undefined);
  const getRegistrations = jest
    .fn()
    .mockResolvedValue([{ scope: '/scope/', unregister }]);
  const register = jest.fn().mockResolvedValue({ scope: '/scope/' });
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: { getRegistrations, register },
  });
  return { getRegistrations, register, unregister };
};

const mockCaches = () => {
  const caches = {
    keys: jest.fn().mockResolvedValue(['cache-a']),
    delete: jest.fn().mockResolvedValue(true),
  };
  Object.defineProperty(globalThis, 'caches', {
    configurable: true,
    value: caches,
  });
  return caches;
};

describe('useSWRegister', () => {
  it('returns early when serviceWorker is unsupported', () => {
    Object.defineProperty(globalThis, 'navigator', {
      configurable: true,
      value: {},
    });
    expect(() => renderHook(() => useSWRegister())).not.toThrow();
  });

  it('unregisters and clears caches in development', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      'development';
    const { getRegistrations, unregister } = mockServiceWorker();
    const caches = mockCaches();
    renderHook(() => useSWRegister());
    await waitFor(() => expect(unregister).toHaveBeenCalled());
    expect(getRegistrations).toHaveBeenCalled();
    expect(caches.keys).toHaveBeenCalled();
    expect(caches.delete).toHaveBeenCalledWith('cache-a');
  });

  it('registers the service worker in production', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    const { register } = mockServiceWorker();
    renderHook(() => useSWRegister());
    await waitFor(() => expect(register).toHaveBeenCalledWith('/sw.js'));
  });

  it('logs a warning when registration fails', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { register } = mockServiceWorker();
    register.mockRejectedValue(new Error('nope'));
    renderHook(() => useSWRegister());
    await waitFor(() => expect(warnSpy).toHaveBeenCalled());
  });
});
