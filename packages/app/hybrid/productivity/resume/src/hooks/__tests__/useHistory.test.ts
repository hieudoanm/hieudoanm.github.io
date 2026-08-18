import { act, renderHook } from '@testing-library/react';
import { useHistory } from '../useHistory';

const advanceDebounce = () => {
  act(() => {
    jest.advanceTimersByTime(600);
  });
};

describe('useHistory', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
    window.localStorage.clear();
  });

  it('returns the initial value with no history', () => {
    const { result } = renderHook(() => useHistory<number>(0, 'count'));
    expect(result.current.present).toBe(0);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('records changes and undoes them', () => {
    const { result } = renderHook(() => useHistory<number>(0, 'count'));
    act(() => result.current.set(1));
    advanceDebounce();
    act(() => result.current.set(2));
    advanceDebounce();
    expect(result.current.canUndo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.present).toBe(1);
    expect(result.current.canRedo).toBe(true);

    act(() => result.current.undo());
    expect(result.current.present).toBe(0);
    expect(result.current.canUndo).toBe(false);
  });

  it('coalesces a burst of changes into a single undo step', () => {
    const { result } = renderHook(() => useHistory<number>(0, 'count'));
    act(() => result.current.set(1));
    act(() => result.current.set(2));
    advanceDebounce();

    act(() => result.current.undo());
    expect(result.current.present).toBe(1);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(true);
  });

  it('redoes after an undo', () => {
    const { result } = renderHook(() => useHistory<number>(0, 'count'));
    act(() => result.current.set(1));
    advanceDebounce();
    act(() => result.current.undo());
    act(() => result.current.redo());
    expect(result.current.present).toBe(1);
  });

  it('supports functional updates', () => {
    const { result } = renderHook(() => useHistory<number>(1, 'count'));
    act(() => result.current.set((previous) => previous + 1));
    expect(result.current.present).toBe(2);
  });

  it('resets the history to a new value', () => {
    const { result } = renderHook(() => useHistory<number>(0, 'count'));
    act(() => result.current.set(1));
    advanceDebounce();
    act(() => result.current.reset(7));
    expect(result.current.present).toBe(7);
    expect(result.current.canUndo).toBe(false);
    expect(result.current.canRedo).toBe(false);
  });

  it('persists the present value and history', () => {
    const { result } = renderHook(() => useHistory<number>(0, 'count'));
    act(() => result.current.set(1));
    advanceDebounce();

    const { result: restored } = renderHook(() =>
      useHistory<number>(0, 'count')
    );
    expect(restored.current.present).toBe(1);
    expect(restored.current.canUndo).toBe(true);

    act(() => restored.current.undo());
    expect(restored.current.present).toBe(0);
  });
});
