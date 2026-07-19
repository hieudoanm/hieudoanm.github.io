import { act, renderHook } from '@testing-library/react';
import { useOffline } from '../useOffline';

describe('useOffline', () => {
  it('reports online by default', () => {
    const { result } = renderHook(() => useOffline());
    expect(result.current).toBe(false);
  });

  it('starts offline when navigator reports offline', () => {
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: false,
    });
    const { result } = renderHook(() => useOffline());
    expect(result.current).toBe(true);
    Object.defineProperty(navigator, 'onLine', {
      configurable: true,
      value: true,
    });
  });

  it('tracks offline and online events', () => {
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
});
