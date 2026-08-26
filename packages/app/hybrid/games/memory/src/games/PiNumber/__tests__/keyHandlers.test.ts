import { handleEscape, handlePracticeKey, handleGameKey } from '../keyHandlers';
import { HIGH_SCORE_KEY } from '../constants';
import type { GameState } from '../usePiGame';

beforeEach(() => {
  localStorage.clear();
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
  jest.clearAllMocks();
});

describe('handleEscape', () => {
  it('calls onClose and returns true for Escape key', () => {
    const onClose = jest.fn();
    const result = handleEscape('Escape', onClose);
    expect(onClose).toHaveBeenCalledTimes(1);
    expect(result).toBe(true);
  });

  it('does not call onClose and returns false for other keys', () => {
    const onClose = jest.fn();
    const result = handleEscape('a', onClose);
    expect(onClose).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  it('returns false for ArrowRight', () => {
    const onClose = jest.fn();
    expect(handleEscape('ArrowRight', onClose)).toBe(false);
  });
});

describe('handlePracticeKey', () => {
  it('ArrowRight increments index', () => {
    const setIndex = jest.fn();
    handlePracticeKey('ArrowRight', setIndex, 10);
    expect(setIndex).toHaveBeenCalledWith(expect.any(Function));
    const fn = setIndex.mock.calls[0][0];
    expect(fn(5)).toBe(6);
  });

  it('ArrowRight does not exceed maxIndex', () => {
    const setIndex = jest.fn();
    handlePracticeKey('ArrowRight', setIndex, 5);
    const fn = setIndex.mock.calls[0][0];
    expect(fn(5)).toBe(5);
  });

  it('ArrowLeft decrements index', () => {
    const setIndex = jest.fn();
    handlePracticeKey('ArrowLeft', setIndex, 10);
    expect(setIndex).toHaveBeenCalledWith(expect.any(Function));
    const fn = setIndex.mock.calls[0][0];
    expect(fn(5)).toBe(4);
  });

  it('ArrowLeft does not go below 0', () => {
    const setIndex = jest.fn();
    handlePracticeKey('ArrowLeft', setIndex, 10);
    const fn = setIndex.mock.calls[0][0];
    expect(fn(0)).toBe(0);
  });

  it('does nothing for other keys', () => {
    const setIndex = jest.fn();
    handlePracticeKey('a', setIndex, 10);
    expect(setIndex).not.toHaveBeenCalled();
  });
});

describe('handleGameKey', () => {
  const createGameState = (overrides: Partial<GameState> = {}): GameState => ({
    locked: false,
    lastResult: null,
    revealedIndex: null,
    highScore: 0,
    ...overrides,
  });

  it('does nothing for non-digit keys', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn();
    handleGameKey(
      'ArrowRight',
      0,
      ['3', '1', '4'],
      false,
      setIndex,
      setGameState,
      0
    );
    expect(setGameState).not.toHaveBeenCalled();
    expect(setIndex).not.toHaveBeenCalled();
  });

  it('does nothing for letter keys', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn();
    handleGameKey('a', 0, ['3', '1', '4'], false, setIndex, setGameState, 0);
    expect(setGameState).not.toHaveBeenCalled();
  });

  it('sets revealedIndex on any valid digit', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState());
    });
    handleGameKey('3', 0, ['3', '1', '4'], false, setIndex, setGameState, 0);
    expect(setGameState).toHaveBeenCalled();
    const firstCall = setGameState.mock.calls[0][0];
    const state = createGameState();
    const result = firstCall(state);
    expect(result.revealedIndex).toBe(0);
  });

  it('correct guess sets lastResult to correct and advances after timeout', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState());
    });
    handleGameKey('3', 0, ['3', '1', '4'], false, setIndex, setGameState, 0);

    const secondCall = setGameState.mock.calls[1][0];
    const state = createGameState();
    const result = secondCall(state);
    expect(result.lastResult).toBe('correct');

    jest.advanceTimersByTime(200);
    expect(setIndex).toHaveBeenCalled();
    const indexFn = setIndex.mock.calls[0][0];
    expect(indexFn(0)).toBe(1);
  });

  it('wrong guess sets locked and lastResult to wrong', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState());
    });
    handleGameKey('1', 0, ['3', '1', '4'], false, setIndex, setGameState, 0);

    const calls = setGameState.mock.calls;
    const wrongCall = calls[calls.length - 1][0];
    const state = createGameState();
    const result = wrongCall(state);
    expect(result.locked).toBe(true);
    expect(result.lastResult).toBe('wrong');
  });

  it('wrong guess updates high score if index is higher', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState({ highScore: 2 }));
    });
    handleGameKey('1', 5, ['3', '1', '4'], false, setIndex, setGameState, 2);

    const calls = setGameState.mock.calls;
    const wrongCall = calls[calls.length - 1][0];
    const state = createGameState({ highScore: 2 });
    const result = wrongCall(state);
    expect(result.highScore).toBe(5);
    expect(localStorage.getItem(HIGH_SCORE_KEY)).toBe('5');
  });

  it('wrong guess does not decrease high score', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState({ highScore: 10 }));
    });
    handleGameKey('1', 3, ['3', '1', '4'], false, setIndex, setGameState, 10);

    const calls = setGameState.mock.calls;
    const wrongCall = calls[calls.length - 1][0];
    const state = createGameState({ highScore: 10 });
    const result = wrongCall(state);
    expect(result.highScore).toBe(10);
  });

  it('still processes when locked (no guard in handleGameKey)', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState({ locked: true }));
    });
    handleGameKey('3', 0, ['3', '1', '4'], true, setIndex, setGameState, 0);
    expect(setGameState).toHaveBeenCalled();
  });

  it('handles dot as valid digit', () => {
    const setIndex = jest.fn();
    const setGameState = jest.fn((fn: (p: GameState) => GameState) => {
      fn(createGameState());
    });
    handleGameKey('.', 1, ['3', '.', '1'], false, setIndex, setGameState, 0);
    expect(setGameState).toHaveBeenCalled();
  });
});
