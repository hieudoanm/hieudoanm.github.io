import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '@/hooks/useSWRegister';

const installServiceWorker = (sw: unknown) => {
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: sw,
  });
};

const removeServiceWorker = () => {
  Reflect.deleteProperty(navigator, 'serviceWorker');
};

const installCaches = (caches: unknown) => {
  Object.defineProperty(globalThis, 'caches', {
    configurable: true,
    value: caches,
  });
};

const setNodeEnv = (env: string) => {
  Object.defineProperty(process.env, 'NODE_ENV', {
    configurable: true,
    value: env,
  });
};

describe('useSWRegister', () => {
  const originalNodeEnv = process.env.NODE_ENV;
  let logSpy: jest.SpyInstance;
  let warnSpy: jest.SpyInstance;

  beforeEach(() => {
    logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    setNodeEnv(originalNodeEnv ?? 'test');
    removeServiceWorker();
    Object.defineProperty(globalThis, 'caches', {
      configurable: true,
      value: undefined,
    });
    logSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it('returns early when service worker is unsupported', () => {
    removeServiceWorker();
    renderHook(() => useSWRegister());
    expect(logSpy).not.toHaveBeenCalled();
  });

  it('unregisters and clears caches in development', async () => {
    setNodeEnv('development');
    const unregister = jest.fn().mockResolvedValue(undefined);
    installServiceWorker({
      getRegistrations: jest
        .fn()
        .mockResolvedValue([{ scope: '/svg/', unregister }]),
    });
    const cacheDelete = jest.fn().mockResolvedValue(true);
    installCaches({
      keys: jest.fn().mockResolvedValue(['cache-v1', 'cache-v2']),
      delete: cacheDelete,
    });
    renderHook(() => useSWRegister());
    await Promise.resolve();
    await Promise.resolve();
    expect(unregister).toHaveBeenCalled();
    expect(cacheDelete).toHaveBeenCalledTimes(2);
    expect(logSpy).toHaveBeenCalledWith('[SW] unregistered', '/svg/');
    expect(logSpy).toHaveBeenCalledWith('[SW] cleared cache', 'cache-v1');
  });

  it('registers the service worker in production', async () => {
    setNodeEnv('production');
    installServiceWorker({
      register: jest.fn().mockResolvedValue({ scope: '/sw.js' }),
    });
    renderHook(() => useSWRegister());
    await Promise.resolve();
    expect(logSpy).toHaveBeenCalledWith('[SW] registered', '/sw.js');
  });

  it('warns when registration fails', async () => {
    setNodeEnv('production');
    const err = new Error('blocked');
    installServiceWorker({
      register: jest.fn().mockRejectedValue(err),
    });
    renderHook(() => useSWRegister());
    await waitFor(() =>
      expect(warnSpy).toHaveBeenCalledWith('[SW] registration failed', err)
    );
  });
});
