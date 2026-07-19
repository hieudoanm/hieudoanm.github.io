import { act, renderHook } from '@testing-library/react';
import { useSequence } from '../useSequence';
import { whiteKeys } from '../constants';

describe('useSequence', () => {
  it('walks through the practice scale highlighting each key', async () => {
    jest.useFakeTimers();
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));
    expect(result.current.isPracticing).toBe(false);

    let done = false;
    act(() => {
      result.current.playPractice().then(() => {
        done = true;
      });
    });
    expect(result.current.isPracticing).toBe(true);

    for (const { id } of whiteKeys) {
      await act(async () => {
        await jest.advanceTimersByTimeAsync(800);
      });
      expect(playTone).toHaveBeenCalledWith(id);
    }
    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(done).toBe(true);
    expect(result.current.highlightedKey).toBeNull();
    expect(result.current.isPracticing).toBe(false);
    jest.useRealTimers();
  });

  it('ignores overlapping sequences', async () => {
    jest.useFakeTimers();
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));

    act(() => {
      result.current.playPractice();
    });
    act(() => {
      result.current.playTwinkle();
    });

    await act(async () => {
      await jest.runAllTimersAsync();
    });
    expect(result.current.isPracticing).toBe(false);
    jest.useRealTimers();
  });
});
