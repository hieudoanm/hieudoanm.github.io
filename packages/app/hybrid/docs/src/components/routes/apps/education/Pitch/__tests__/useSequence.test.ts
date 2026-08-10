import { act, renderHook, waitFor } from '@testing-library/react';
import { useSequence } from '../useSequence';

jest.setTimeout(30000);

describe('with fake timers', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns initial state', () => {
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));
    expect(result.current.isPracticing).toBe(false);
    expect(result.current.highlightedKey).toBeNull();
  });

  it('playPractice sets practicing and starts at first key', () => {
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));
    act(() => {
      result.current.playPractice();
    });
    expect(result.current.isPracticing).toBe(true);
    expect(result.current.highlightedKey).toBe('c');
    expect(playTone).toHaveBeenCalledWith('c');
  });

  it('does not start a new sequence while already practicing', () => {
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));
    act(() => {
      result.current.playPractice();
    });
    act(() => {
      result.current.playPractice();
    });
    expect(playTone).toHaveBeenCalledTimes(1);
  });
});

describe('with real timers', () => {
  beforeEach(() => {
    jest.useRealTimers();
  });

  it('advances highlighted key after each step', async () => {
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));

    act(() => {
      result.current.playPractice();
    });
    expect(result.current.highlightedKey).toBe('c');
    expect(playTone).toHaveBeenCalledWith('c');

    await waitFor(
      () => {
        expect(result.current.highlightedKey).not.toBe('c');
      },
      { timeout: 5000 }
    );
  });

  it('playPractice completes all 7 keys', async () => {
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));

    act(() => {
      result.current.playPractice();
    });

    await waitFor(
      () => {
        expect(result.current.isPracticing).toBe(false);
      },
      { timeout: 15000, interval: 100 }
    );

    expect(playTone).toHaveBeenCalledTimes(7);
  });

  it('playTwinkle completes all 42 notes', async () => {
    const playTone = jest.fn();
    const { result } = renderHook(() => useSequence(playTone));

    act(() => {
      result.current.playTwinkle();
    });

    await waitFor(
      () => {
        expect(result.current.isPracticing).toBe(false);
      },
      { timeout: 45000, interval: 100 }
    );

    expect(playTone).toHaveBeenCalledTimes(42);
  });
});
