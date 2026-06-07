import { renderHook, act } from '@testing-library/react';
import { useToast } from '../useToast';

jest.useFakeTimers();
let nextId = 1;

jest.spyOn(Date, 'now').mockImplementation(() => nextId++);

describe('useToast', () => {
  it('starts with empty toasts', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  it('shows a toast', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show('success', 'Operation completed');
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toContain('Operation completed');
  });

  it('dismisses a toast', () => {
    const { result } = renderHook(() => useToast());
    let id: number;
    act(() => {
      id = result.current.show('error', 'Error occurred');
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => {
      result.current.dismiss(id!);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('auto-dismisses non-loading toasts after duration', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show('info', 'Info message');
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(2500);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('keeps loading toasts until dismissed', () => {
    const { result } = renderHook(() => useToast());
    let id: number;
    act(() => {
      id = result.current.show('loading', 'Loading...');
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(result.current.toasts).toHaveLength(1);
    act(() => {
      result.current.dismiss(id!);
    });
    expect(result.current.toasts).toHaveLength(0);
  });

  it('limits toasts to 3', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.show('success', 'First');
      result.current.show('success', 'Second');
      result.current.show('success', 'Third');
      result.current.show('success', 'Fourth');
    });
    expect(result.current.toasts).toHaveLength(3);
  });

  it('returns id from show', () => {
    const { result } = renderHook(() => useToast());
    let id: number;
    act(() => {
      id = result.current.show('info', 'Info');
    });
    expect(typeof id).toBe('number');
  });

  it('dismisses only the targeted toast', () => {
    const { result } = renderHook(() => useToast());
    let id1: number;
    let id2: number;
    act(() => {
      id1 = result.current.show('success', 'First');
      id2 = result.current.show('success', 'Second');
    });
    expect(result.current.toasts).toHaveLength(2);
    act(() => {
      result.current.dismiss(id1!);
    });
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toContain('Second');
  });
});
