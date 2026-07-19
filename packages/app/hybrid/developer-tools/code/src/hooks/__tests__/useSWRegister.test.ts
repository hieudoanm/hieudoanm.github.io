import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '../useSWRegister';

const mockUnregister = jest.fn().mockResolvedValue(true);
const mockRegister = jest.fn();
const mockCacheDelete = jest.fn().mockResolvedValue(true);
const mockGetRegistrations = jest.fn();
const mockCacheKeys = jest.fn();

describe('useSWRegister', () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    jest.clearAllMocks();
    originalEnv = process.env.NODE_ENV;
    delete (globalThis as { caches?: unknown }).caches;
    delete (navigator as { serviceWorker?: unknown }).serviceWorker;
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: originalEnv });
    jest.restoreAllMocks();
  });

  const setEnv = (env: string) => {
    Object.defineProperty(process.env, 'NODE_ENV', { value: env });
  };

  const installServiceWorker = () => {
    (navigator as { serviceWorker?: unknown }).serviceWorker = {
      getRegistrations: mockGetRegistrations,
      register: mockRegister,
    };
  };

  it('does nothing when the service worker API is unavailable', () => {
    renderHook(() => useSWRegister());
    expect(mockGetRegistrations).not.toHaveBeenCalled();
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('unregisters and clears caches in development', async () => {
    setEnv('development');
    installServiceWorker();
    mockGetRegistrations.mockResolvedValueOnce([
      { scope: '/sw-1/', unregister: mockUnregister },
    ]);
    (globalThis as { caches?: unknown }).caches = {
      keys: mockCacheKeys,
      delete: mockCacheDelete,
    };
    mockCacheKeys.mockResolvedValueOnce(['cache-a', 'cache-b']);

    renderHook(() => useSWRegister());

    await waitFor(() => {
      expect(mockGetRegistrations).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockUnregister).toHaveBeenCalled();
    });
    await waitFor(() => {
      expect(mockCacheDelete).toHaveBeenCalledWith('cache-a');
    });
    expect(mockCacheDelete).toHaveBeenCalledWith('cache-b');
    expect(mockRegister).not.toHaveBeenCalled();
  });

  it('registers the service worker in production', async () => {
    setEnv('production');
    installServiceWorker();
    mockRegister.mockResolvedValueOnce({ scope: '/sw.js' });

    renderHook(() => useSWRegister());

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('/sw.js');
    });
    expect(console.log).toHaveBeenCalledWith('[SW] registered', '/sw.js');
  });

  it('warns when registration fails', async () => {
    setEnv('production');
    installServiceWorker();
    mockRegister.mockRejectedValueOnce(new Error('denied'));

    renderHook(() => useSWRegister());

    await waitFor(() => {
      expect(console.warn).toHaveBeenCalledWith(
        '[SW] registration failed',
        expect.any(Error)
      );
    });
  });
});
