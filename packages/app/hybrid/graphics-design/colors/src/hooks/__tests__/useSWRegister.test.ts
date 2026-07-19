import { renderHook } from '@testing-library/react';
import { useSWRegister } from '../useSWRegister';

const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

const setNodeEnv = (value: string) => {
  Object.assign(process.env, { NODE_ENV: value });
};

describe('useSWRegister', () => {
  let serviceWorkerMock: {
    register: jest.Mock;
    getRegistrations: jest.Mock;
  };

  beforeEach(() => {
    serviceWorkerMock = {
      register: jest.fn().mockResolvedValue({}),
      getRegistrations: jest.fn().mockResolvedValue([]),
    };
    Object.assign(navigator, { serviceWorker: serviceWorkerMock });
  });

  afterEach(() => {
    setNodeEnv(ORIGINAL_NODE_ENV ?? 'test');
    jest.restoreAllMocks();
  });

  describe('production branch', () => {
    beforeEach(() => {
      setNodeEnv('production');
    });

    it('registers the service worker at /sw.js', () => {
      renderHook(() => useSWRegister());
      expect(serviceWorkerMock.register).toHaveBeenCalledWith('/sw.js');
    });

    it('does not call getRegistrations in production', () => {
      renderHook(() => useSWRegister());
      expect(serviceWorkerMock.getRegistrations).not.toHaveBeenCalled();
    });
  });

  describe('development branch', () => {
    beforeEach(() => {
      setNodeEnv('development');
    });

    it('unregisters existing service workers and clears caches', async () => {
      const unregister = jest.fn().mockResolvedValue(undefined);
      (serviceWorkerMock.getRegistrations as jest.Mock).mockResolvedValue([
        { unregister },
      ]);

      const cacheKey = 'colors-cache';
      const keys = jest.fn().mockResolvedValue([cacheKey]);
      const cachesDelete = jest.fn().mockResolvedValue(true);
      const cachesMock = {
        keys,
        delete: cachesDelete,
      };

      const originalCaches = (globalThis as { caches?: unknown }).caches;
      Object.defineProperty(globalThis, 'caches', {
        value: cachesMock,
        configurable: true,
        writable: true,
      });

      renderHook(() => useSWRegister());

      for (let i = 0; i < 5; i += 1) {
        await Promise.resolve();
        await Promise.resolve();
      }

      expect(serviceWorkerMock.getRegistrations).toHaveBeenCalled();
      expect(unregister).toHaveBeenCalledWith();
      expect(keys).toHaveBeenCalled();
      expect(cachesDelete).toHaveBeenCalledWith(cacheKey);

      if (originalCaches === undefined) {
        delete (globalThis as { caches?: unknown }).caches;
      } else {
        Object.defineProperty(globalThis, 'caches', {
          value: originalCaches,
          configurable: true,
          writable: true,
        });
      }
    });

    it('does not call register in development', () => {
      renderHook(() => useSWRegister());
      expect(serviceWorkerMock.register).not.toHaveBeenCalled();
    });
  });
});
