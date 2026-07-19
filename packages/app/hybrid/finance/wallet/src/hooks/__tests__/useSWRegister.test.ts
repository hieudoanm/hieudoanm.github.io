import { renderHook, act, waitFor } from '@testing-library/react';
import { useSWRegister } from '../useSWRegister';

const mockRegistrations = [{ scope: '/sw.js', unregister: jest.fn() }];

const mockServiceWorker = {
  getRegistrations: jest.fn().mockResolvedValue(mockRegistrations),
  register: jest.fn().mockResolvedValue({ scope: '/sw.js' }),
};

const mockCaches = {
  keys: jest.fn().mockResolvedValue(['wallet-cache-1']),
  delete: jest.fn().mockResolvedValue(true),
};

const realNodeEnv = process.env.NODE_ENV;

describe('useSWRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      writable: true,
      value: mockServiceWorker,
    });
    Object.defineProperty(globalThis, 'caches', {
      configurable: true,
      writable: true,
      value: mockCaches,
    });
  });

  afterEach(() => {
    (process.env as Record<string, string | undefined>).NODE_ENV = realNodeEnv;
    delete (navigator as { serviceWorker?: unknown }).serviceWorker;
    delete (globalThis as { caches?: unknown }).caches;
  });

  it('does nothing when service workers are unsupported', () => {
    delete (navigator as { serviceWorker?: unknown }).serviceWorker;
    renderHook(() => useSWRegister());
    expect(mockServiceWorker.register).not.toHaveBeenCalled();
  });

  it('registers the service worker in production', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    renderHook(() => useSWRegister());
    await waitFor(() => {
      expect(mockServiceWorker.register).toHaveBeenCalledWith('/sw.js');
    });
  });

  it('logs a warning when registration fails', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    const warn = jest
      .spyOn(console, 'warn')
      .mockImplementation(() => undefined);
    mockServiceWorker.register.mockRejectedValueOnce(new Error('blocked'));
    renderHook(() => useSWRegister());
    await waitFor(() => {
      expect(warn).toHaveBeenCalled();
    });
    expect(warn.mock.calls[0][0]).toContain('failed');
    warn.mockRestore();
  });

  it('unregisters existing workers and clears caches in development', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      'development';
    renderHook(() => useSWRegister());
    await waitFor(() => {
      expect(mockServiceWorker.getRegistrations).toHaveBeenCalled();
    });
    await act(async () => {
      await Promise.resolve();
    });
    expect(mockRegistrations[0].unregister).toHaveBeenCalled();
    expect(mockCaches.keys).toHaveBeenCalled();
    expect(mockCaches.delete).toHaveBeenCalledWith('wallet-cache-1');
    expect(mockServiceWorker.register).not.toHaveBeenCalled();
  });
});
