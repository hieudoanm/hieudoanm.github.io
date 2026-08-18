import { renderHook, act } from '@testing-library/react';
import { useHaptic } from '../useHaptic';

describe('useHaptic', () => {
  beforeEach(() => {
    (navigator.vibrate as jest.Mock).mockClear();
  });

  it('returns a vibrate function', () => {
    const { result } = renderHook(() => useHaptic());
    expect(typeof result.current.vibrate).toBe('function');
  });

  it('vibrates with the light pattern by default', () => {
    const { result } = renderHook(() => useHaptic());
    act(() => result.current.vibrate());
    expect(navigator.vibrate).toHaveBeenCalledWith(10);
  });

  it.each([
    ['light', 10],
    ['medium', 20],
    ['heavy', 30],
  ] as const)('vibrates with %s pattern', (pattern, ms) => {
    const { result } = renderHook(() => useHaptic());
    act(() => result.current.vibrate(pattern));
    expect(navigator.vibrate).toHaveBeenCalledWith(ms);
  });

  it('vibrates with the success pulse pattern', () => {
    const { result } = renderHook(() => useHaptic());
    act(() => result.current.vibrate('success'));
    expect(navigator.vibrate).toHaveBeenCalledWith([10, 50, 10]);
  });

  it('vibrates with the error burst pattern', () => {
    const { result } = renderHook(() => useHaptic());
    act(() => result.current.vibrate('error'));
    expect(navigator.vibrate).toHaveBeenCalledWith([30, 50, 30]);
  });

  it('skips vibration when navigator.vibrate is unavailable', () => {
    const vibrate = navigator.vibrate;
    Object.defineProperty(navigator, 'vibrate', {
      writable: true,
      value: undefined,
    });
    const { result } = renderHook(() => useHaptic());
    expect(() => act(() => result.current.vibrate())).not.toThrow();
    Object.defineProperty(navigator, 'vibrate', {
      writable: true,
      value: vibrate,
    });
  });
});
