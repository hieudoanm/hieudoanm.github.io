import { act, renderHook } from '@testing-library/react';
import { useMatch } from '@/hooks/useMatch';
import { fullMatchSeconds } from '@/lib/clock';
import { defaultMatch, loadMatch } from '@/lib/match';

describe('useMatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    window.localStorage.clear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts, ticks, and pauses the clock', () => {
    const { result } = renderHook(() => useMatch());
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(result.current.match.elapsed).toBe(3);
    act(() => result.current.pause());
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(result.current.match.elapsed).toBe(3);
  });

  it('whistles at half time, pauses, and calls onHalfTime once', () => {
    const onHalfTime = jest.fn();
    const { result } = renderHook(() => useMatch({ onHalfTime }));
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });
    expect(result.current.match.elapsed).toBe(45 * 60);
    expect(result.current.match.running).toBe(false);
    expect(result.current.match.events.map((e) => e.type)).toContain(
      'half-time-whistle'
    );
    expect(onHalfTime).toHaveBeenCalledTimes(1);
  });

  it('records a full-time whistle and stops the clock', () => {
    const { result } = renderHook(() => useMatch());
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime((45 * 60 + 15 * 60) * 1000);
    });
    expect(result.current.match.elapsed).toBe(fullMatchSeconds());
    expect(result.current.match.running).toBe(false);
    expect(result.current.match.events.map((e) => e.type)).toContain(
      'full-time-whistle'
    );
  });

  it('restarts a fresh match when started after full time', () => {
    const { result } = renderHook(() => useMatch());
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime((45 * 60 + 15 * 60) * 1000);
    });
    act(() => result.current.start());
    expect(result.current.match.running).toBe(true);
    expect(result.current.match.elapsed).toBe(0);
    expect(result.current.match.events).toHaveLength(0);
  });

  it('resets added time when the second half kicks off', () => {
    const { result } = renderHook(() => useMatch());
    act(() => result.current.setAddedTime(2));
    act(() => result.current.start());
    act(() => {
      jest.advanceTimersByTime(45 * 60 * 1000);
    });
    expect(result.current.match.addedTime).toBe(2);
    act(() => result.current.start());
    expect(result.current.match.addedTime).toBe(0);
  });

  it('tracks goals, cards, and substitutions through the controller', () => {
    const { result } = renderHook(() => useMatch());
    act(() => result.current.addGoal());
    act(() => result.current.addConcede());
    act(() => result.current.addCard('yellow'));
    act(() => result.current.recordSubstitution('Salah'));
    expect(result.current.match.goalsFor).toBe(1);
    expect(result.current.match.goalsAgainst).toBe(1);
    expect(result.current.match.events).toHaveLength(4);
    expect(result.current.match.events.map((e) => e.type)).toEqual([
      'goal',
      'concede',
      'yellow-card',
      'substitution',
    ]);
    expect(result.current.match.substitutions).toBe(1);
  });

  it('resets the match to its default state', () => {
    const { result } = renderHook(() => useMatch());
    act(() => result.current.addGoal());
    act(() => result.current.setAddedTime(2));
    act(() => result.current.reset());
    expect(result.current.match).toEqual(defaultMatch());
  });

  it('persists match state to localStorage', () => {
    const { result, unmount } = renderHook(() => useMatch());
    act(() => result.current.addGoal());
    act(() => result.current.setAddedTime(3));
    expect(loadMatch()).toMatchObject({ goalsFor: 1, addedTime: 3 });
    unmount();
  });

  it('restores persisted match state on mount', () => {
    const first = renderHook(() => useMatch());
    act(() => first.result.current.addGoal());
    act(() => first.result.current.recordSubstitution('Salah'));
    first.unmount();

    const { result } = renderHook(() => useMatch());
    expect(result.current.match.goalsFor).toBe(1);
    expect(result.current.match.substitutions).toBe(1);
  });
});
