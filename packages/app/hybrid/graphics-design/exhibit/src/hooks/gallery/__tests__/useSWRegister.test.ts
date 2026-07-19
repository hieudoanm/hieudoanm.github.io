import { renderHook, waitFor } from '@testing-library/react';
import { useSWRegister } from '@/hooks/gallery/useSWRegister';

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
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    const register = jest.fn().mockResolvedValue({ scope: '/sw.js' });
    defineServiceWorker({ register });
    renderHook(() => useSWRegister());
    await waitFor(() => expect(register).toHaveBeenCalledWith('/sw.js'));
  });

  it('swallows registration failures', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV = 'production';
    const register = jest.fn().mockRejectedValue(new Error('blocked'));
    defineServiceWorker({ register });
    expect(() => renderHook(() => useSWRegister())).not.toThrow();
  });

  it('unregisters existing workers in development', async () => {
    (process.env as Record<string, string | undefined>).NODE_ENV =
      'development';
    const unregister = jest.fn().mockResolvedValue(undefined);
    const getRegistrations = jest
      .fn()
      .mockResolvedValue([{ scope: '/app/', unregister }]);
    defineServiceWorker({ getRegistrations, register: jest.fn() });
    renderHook(() => useSWRegister());
    await waitFor(() => expect(unregister).toHaveBeenCalled());
  });
});
