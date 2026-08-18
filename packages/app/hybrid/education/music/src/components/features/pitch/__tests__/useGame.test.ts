import { act, renderHook } from '@testing-library/react';
import { useGame } from '../useGame';

const playTone = jest.fn();

describe('useGame', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.removeItem('pitch-high-score');
    jest.spyOn(Math, 'random').mockReturnValue(0);
  });
  afterEach(() => {
    (Math.random as jest.Mock).mockRestore();
  });

  it('restores a saved high score on mount', () => {
    localStorage.setItem('pitch-high-score', '42');
    const { result } = renderHook(() => useGame(playTone));
    expect(result.current.highScore).toBe(42);
  });

  it('starts a game and plays the first note', () => {
    const { result } = renderHook(() => useGame(playTone));
    act(() => {
      result.current.startGame();
    });
    expect(result.current.started).toBe(true);
    expect(result.current.score).toBe(0);
    expect(result.current.target).toBe('c');
    expect(playTone).toHaveBeenCalledWith('c');
  });

  it('advances to a new round after a correct guess', async () => {
    jest.useFakeTimers();
    const { result } = renderHook(() => useGame(playTone));
    act(() => {
      result.current.startGame();
    });

    act(() => {
      result.current.handleGuess('c');
    });
    expect(result.current.feedback).toEqual({ correctId: 'c' });
    expect(result.current.score).toBe(1);

    await act(async () => {
      await jest.advanceTimersByTimeAsync(700);
    });
    expect(result.current.feedback).toBeNull();
    expect(playTone).toHaveBeenCalledTimes(2);
    jest.useRealTimers();
  });

  it('levels up every ten correct answers', () => {
    const { result } = renderHook(() => useGame(playTone));
    act(() => {
      result.current.startGame();
    });
    for (let i = 0; i < 10; i++) {
      act(() => {
        result.current.handleGuess('c');
      });
    }
    expect(result.current.level).toBe(2);
  });

  it('ends the game and saves the high score after a wrong guess', async () => {
    jest.useFakeTimers();
    localStorage.setItem('pitch-high-score', '1');
    const { result } = renderHook(() => useGame(playTone));
    act(() => {
      result.current.startGame();
    });
    for (let i = 0; i < 3; i++) {
      act(() => {
        result.current.handleGuess('c');
      });
      await act(async () => {
        await jest.advanceTimersByTimeAsync(700);
      });
    }
    expect(result.current.score).toBe(3);

    act(() => {
      result.current.handleGuess('d');
    });
    expect(result.current.feedback).toEqual({
      correctId: 'c',
      wrongId: 'd',
    });

    await act(async () => {
      await jest.advanceTimersByTimeAsync(900);
    });
    expect(result.current.started).toBe(false);
    expect(result.current.target).toBeNull();
    expect(result.current.highScore).toBe(3);
    expect(localStorage.getItem('pitch-high-score')).toBe('3');
    jest.useRealTimers();
  });

  it('ignores guesses before starting', () => {
    const { result } = renderHook(() => useGame(playTone));
    act(() => {
      result.current.handleGuess('c');
    });
    expect(result.current.score).toBe(0);
  });
});
