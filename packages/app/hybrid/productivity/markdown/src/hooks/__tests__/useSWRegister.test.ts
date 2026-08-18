import { act, renderHook } from '@testing-library/react';
import { useSWRegister } from '@/hooks/useSWRegister';

const savedEnv = process.env.NODE_ENV;

const setNodeEnv = (value: string) => {
  (process.env as { NODE_ENV: string }).NODE_ENV = value;
};

describe('useSWRegister', () => {
  afterEach(() => {
    delete (navigator as any).serviceWorker;
    delete (globalThis as any).caches;
    setNodeEnv(savedEnv ?? '');
    jest.restoreAllMocks();
  });

  it('is a no-op when service workers are unsupported', () => {
    expect(() => renderHook(() => useSWRegister())).not.toThrow();
  });

  it('registers the service worker in production', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const register = jest.fn().mockResolvedValue({ scope: '/sw.js' });
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { register },
    });
    setNodeEnv('production');

    await act(async () => {
      renderHook(() => useSWRegister());
    });

    expect(register).toHaveBeenCalledWith('/sw.js');
    expect(log).toHaveBeenCalledWith('[SW] registered', '/sw.js');
  });

  it('unregisters old registrations and clears caches in development', async () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const unregister = jest.fn().mockResolvedValue(undefined);
    const getRegistrations = jest
      .fn()
      .mockResolvedValue([{ unregister, scope: '/v1' }]);
    const keys = jest.fn().mockResolvedValue(['cache-a']);
    const del = jest.fn().mockResolvedValue(true);
    (globalThis as any).caches = { keys, delete: del };
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { getRegistrations },
    });
    setNodeEnv('development');

    await act(async () => {
      renderHook(() => useSWRegister());
    });

    expect(getRegistrations).toHaveBeenCalled();
    expect(unregister).toHaveBeenCalled();
    expect(log).toHaveBeenCalledWith('[SW] unregistered', '/v1');
    expect(del).toHaveBeenCalledWith('cache-a');
  });

  it('warns when registration fails', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const register = jest.fn().mockRejectedValue(new Error('denied'));
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { register },
    });
    setNodeEnv('production');

    await act(async () => {
      renderHook(() => useSWRegister());
    });

    expect(warn).toHaveBeenCalledWith(
      '[SW] registration failed',
      expect.any(Error)
    );
  });
});
