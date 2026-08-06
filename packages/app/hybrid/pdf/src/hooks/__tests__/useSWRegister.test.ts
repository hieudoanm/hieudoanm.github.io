import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '@/hooks/useSWRegister';

const unregister = jest.fn();
const register = jest.fn();
const cachesMock = {
  keys: jest.fn().mockResolvedValue(['v1']),
  delete: jest.fn().mockResolvedValue(true),
};

const setServiceWorker = (overrides: Record<string, unknown> = {}) => {
  Object.defineProperty(navigator, 'serviceWorker', {
    configurable: true,
    value: {
      getRegistrations: jest.fn().mockResolvedValue([]),
      register,
      ...overrides,
    },
  });
};

describe('useSWRegister', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    register.mockReset();
    unregister.mockReset();
    cachesMock.keys.mockReset().mockResolvedValue(['v1']);
    cachesMock.delete.mockReset().mockResolvedValue(true);
    Object.defineProperty(globalThis, 'caches', {
      configurable: true,
      value: cachesMock,
    });
    (process.env as Record<string, string | undefined>).NODE_ENV = 'test';
  });

  it('does nothing when service workers are unsupported', () => {
    Reflect.deleteProperty(navigator, 'serviceWorker');
    renderHook(() => useSWRegister());
    expect(register).not.toHaveBeenCalled();
    expect(unregister).not.toHaveBeenCalled();
  });

  it('unregisters and clears caches in development', async () => {
    setServiceWorker({
      getRegistrations: jest
        .fn()
        .mockResolvedValue([{ scope: '/sw.js', unregister }]),
    });
    (process.env as Record<string, string | undefined>).NODE_ENV =
      'development';
    renderHook(() => useSWRegister());
    await waitFor(() => expect(unregister).toHaveBeenCalled());
    await waitFor(() => expect(cachesMock.keys).toHaveBeenCalled());
    await waitFor(() => expect(cachesMock.delete).toHaveBeenCalledWith('v1'));
  });

  it('registers the service worker in production', async () => {
    setServiceWorker();
    register.mockResolvedValue({ scope: '/sw.js' });
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    renderHook(() => useSWRegister());
    await waitFor(() => expect(register).toHaveBeenCalledWith('/sw.js'));
  });

  it('warns when registration fails', async () => {
    setServiceWorker();
    register.mockRejectedValue(new Error('nope'));
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    renderHook(() => useSWRegister());
    await waitFor(() => expect(warn).toHaveBeenCalled());
    warn.mockRestore();
  });
});
