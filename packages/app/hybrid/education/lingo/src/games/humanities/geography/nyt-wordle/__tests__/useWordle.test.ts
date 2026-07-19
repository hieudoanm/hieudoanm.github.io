import { act, renderHook } from '@testing-library/react';
import { MAX_GUESSES } from '../types';
import { useWordle } from '../useWordle';

const FILLERS = ['GHANA', 'INDIA', 'KENYA', 'MALTA', 'EGYPT', 'SUDAN'];

describe('useWordle', () => {
  it('initialises with the given answer and empty board', () => {
    const { result } = renderHook(() => useWordle('CHILE'));
    expect(result.current.answer).toBe('CHILE');
    expect(result.current.answerLength).toBe(5);
    expect(result.current.guesses).toHaveLength(0);
    expect(result.current.current).toBe('');
    expect(result.current.status).toBe('playing');
    expect(result.current.attemptsLeft).toBe(MAX_GUESSES);
  });

  it('appends letters up to the answer length', () => {
    const { result } = renderHook(() => useWordle('CHAD'));
    for (const letter of 'CHADX') {
      act(() => {
        result.current.pressLetter(letter);
      });
    }
    expect(result.current.current).toBe('CHAD');
  });

  it('removes letters with backspace', () => {
    const { result } = renderHook(() => useWordle('CHAD'));
    act(() => {
      result.current.pressLetter('C');
    });
    act(() => {
      result.current.pressLetter('H');
    });
    act(() => {
      result.current.pressBackspace();
    });
    expect(result.current.current).toBe('C');
  });

  it('blocks input after the game ends', () => {
    const { result } = renderHook(() => useWordle('CHAD'));
    for (const letter of 'CHAD') {
      act(() => {
        result.current.pressLetter(letter);
      });
    }
    act(() => {
      result.current.pressEnter();
    });
    expect(result.current.status).toBe('won');
    act(() => {
      result.current.pressLetter('X');
    });
    act(() => {
      result.current.pressBackspace();
    });
    act(() => {
      result.current.pressEnter();
    });
    expect(result.current.current).toBe('');
    expect(result.current.guesses).toHaveLength(1);
  });

  it('shows a message when submitting an incomplete guess', () => {
    const { result } = renderHook(() => useWordle('CHILE'));
    act(() => {
      result.current.pressLetter('C');
    });
    act(() => {
      result.current.pressEnter();
    });
    expect(result.current.message).toBe('Not enough letters');
    expect(result.current.guesses).toHaveLength(0);
  });

  it('clears the message when typing continues', () => {
    const { result } = renderHook(() => useWordle('CHILE'));
    act(() => {
      result.current.pressEnter();
    });
    expect(result.current.message).toBe('Not enough letters');
    act(() => {
      result.current.pressLetter('B');
    });
    expect(result.current.message).toBeNull();
  });

  it('wins on the correct guess', () => {
    const { result } = renderHook(() => useWordle('CHILE'));
    for (const letter of 'CHILE') {
      act(() => {
        result.current.pressLetter(letter);
      });
    }
    act(() => {
      result.current.pressEnter();
    });
    expect(result.current.status).toBe('won');
    expect(result.current.attemptsLeft).toBe(MAX_GUESSES - 1);
    expect(result.current.keyboard.C).toBe('correct');
  });

  it('reveals the answer after losing all attempts', () => {
    const { result } = renderHook(() => useWordle('CHILE'));
    for (const filler of FILLERS) {
      for (const letter of filler) {
        act(() => {
          result.current.pressLetter(letter);
        });
      }
      act(() => {
        result.current.pressEnter();
      });
    }
    expect(result.current.guesses).toHaveLength(MAX_GUESSES);
    expect(result.current.status).toBe('lost');
    expect(result.current.message).toBe('The country was CHILE');
  });

  it('starts a fresh game via newGame with an explicit answer', () => {
    const { result } = renderHook(() => useWordle('CHILE'));
    for (const letter of 'CHILE') {
      act(() => {
        result.current.pressLetter(letter);
      });
    }
    act(() => {
      result.current.pressEnter();
    });
    expect(result.current.status).toBe('won');
    act(() => {
      result.current.newGame('JAPAN');
    });
    expect(result.current.answer).toBe('JAPAN');
    expect(result.current.status).toBe('playing');
    expect(result.current.guesses).toHaveLength(0);
    expect(result.current.keyboard).toEqual({});
    expect(result.current.message).toBeNull();
  });

  it('picks the daily answer when none is provided', () => {
    const { result } = renderHook(() => useWordle());
    expect(result.current.answer.length).toBeGreaterThanOrEqual(4);
  });
});
