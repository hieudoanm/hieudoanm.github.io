import { act, renderHook } from '@testing-library/react';
import { useSWRegister } from '../useSWRegister';

const setNodeEnv = (value: string) => {
  (process.env as Record<string, string | undefined>).NODE_ENV = value;
};

describe('useSWRegister', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    delete (navigator as { serviceWorker?: unknown }).serviceWorker;
    delete (window as { caches?: unknown }).caches;
    setNodeEnv('test');
  });

  it('does nothing when the service worker API is unsupported', () => {
    renderHook(() => useSWRegister());
  });

  it('registers the service worker in production', async () => {
    const register = jest.fn().mockResolvedValue({ scope: '/', active: null });
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { register },
      configurable: true,
    });
    setNodeEnv('production');
    renderHook(() => useSWRegister());
    await act(async () => {});
    expect(register).toHaveBeenCalledWith('/sw.js');
  });

  it('unregisters registrations and clears caches in development', async () => {
    const unregister = jest.fn().mockResolvedValue(undefined);
    const getRegistrations = jest
      .fn()
      .mockResolvedValue([{ scope: '/', unregister }]);
    const keys = jest.fn().mockResolvedValue(['cache-1']);
    const del = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'serviceWorker', {
      value: { getRegistrations },
      configurable: true,
    });
    Object.defineProperty(window, 'caches', {
      value: { keys, delete: del },
      configurable: true,
    });
    setNodeEnv('development');
    renderHook(() => useSWRegister());
    await act(async () => {});
    expect(getRegistrations).toHaveBeenCalled();
    expect(unregister).toHaveBeenCalled();
    expect(keys).toHaveBeenCalled();
    expect(del).toHaveBeenCalledWith('cache-1');
  });
});
