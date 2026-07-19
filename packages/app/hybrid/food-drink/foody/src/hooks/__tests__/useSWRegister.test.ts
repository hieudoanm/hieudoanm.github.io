import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '../useSWRegister';

describe('useSWRegister', () => {
  const unregister = jest.fn().mockResolvedValue(undefined);
  const register = jest.fn().mockResolvedValue({ scope: '/' });
  const serviceWorker = {
    getRegistrations: jest.fn().mockResolvedValue([{ unregister }]),
    register,
  };
  const cachesMock = {
    keys: jest.fn().mockResolvedValue(['old']),
    delete: jest.fn().mockResolvedValue(true),
  };

  const originalEnv = process.env.NODE_ENV;

  const setEnv = (value: string): void => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      configurable: true,
      value,
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: serviceWorker,
    });
    Object.defineProperty(global, 'caches', {
      configurable: true,
      value: cachesMock,
    });
  });

  afterEach(() => {
    setEnv(originalEnv ?? 'test');
  });

  it('unregisters workers and clears caches in development', async () => {
    setEnv('development');
    renderHook(() => useSWRegister());

    await waitFor(() => {
      expect(unregister).toHaveBeenCalled();
      expect(cachesMock.delete).toHaveBeenCalledWith('old');
      expect(register).not.toHaveBeenCalled();
    });
  });

  it('registers the worker outside development', async () => {
    setEnv('production');
    renderHook(() => useSWRegister());

    await waitFor(() => {
      expect(register).toHaveBeenCalledWith('/sw.js');
    });
    expect(unregister).not.toHaveBeenCalled();
  });
});
