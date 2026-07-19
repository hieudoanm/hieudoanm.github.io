import { act, renderHook } from '@testing-library/react';
import { useOffline } from '@/hooks/useOffline';

const setOnline = (online: boolean): void => {
  Object.defineProperty(navigator, 'onLine', {
    value: online,
    configurable: true,
  });
};

describe('useOffline', () => {
  const originalOnline = navigator.onLine;

  afterEach(() => {
    setOnline(originalOnline);
    jest.restoreAllMocks();
  });

  it('starts online when the browser reports a connection', () => {
    setOnline(true);
    const { result } = renderHook(() => useOffline());
    expect(result.current).toBe(false);
  });

  it('starts offline when the browser reports no connection', () => {
    setOnline(false);
    const { result } = renderHook(() => useOffline());
    expect(result.current).toBe(true);
  });

  it('tracks online and offline events', () => {
    setOnline(true);
    const { result } = renderHook(() => useOffline());
    act(() => {
      window.dispatchEvent(new Event('offline'));
    });
    expect(result.current).toBe(true);
    act(() => {
      window.dispatchEvent(new Event('online'));
    });
    expect(result.current).toBe(false);
  });

  it('removes its listeners on unmount', () => {
    setOnline(true);
    const { unmount } = renderHook(() => useOffline());
    const removeOnline = jest.spyOn(window, 'removeEventListener');
    unmount();
    expect(removeOnline).toHaveBeenCalledWith('online', expect.any(Function));
    expect(removeOnline).toHaveBeenCalledWith('offline', expect.any(Function));
  });
});
