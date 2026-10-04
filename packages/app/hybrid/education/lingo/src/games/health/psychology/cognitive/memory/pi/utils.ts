import { PiState } from './constants';
import { PI_DIGITS } from './piDigits';

export const DIGITS = PI_DIGITS.split('');

export const isDigitKey = (key: string): boolean => /^[0-9.]$/.test(key);

export const nudgeIndex = (
  key: string,
  index: number,
  maxIndex: number
): number => {
  if (key === 'ArrowRight') return Math.min(index + 1, maxIndex);
  if (key === 'ArrowLeft') return Math.max(index - 1, 0);

  return index;
};

export interface DigitOutcome {
  state: PiState;
  advance: boolean;
}

const miss = (state: PiState, index: number): PiState => ({
  ...state,
  locked: true,
  lastResult: 'wrong',
  revealedIndex: index,
  highScore: Math.max(state.highScore, index),
});

const hit = (state: PiState, index: number): PiState => ({
  ...state,
  lastResult: 'correct',
  revealedIndex: index,
});

export const applyDigit = (
  key: string,
  index: number,
  digits: string[],
  state: PiState
): DigitOutcome => {
  if (!isDigitKey(key)) return { state, advance: false };

  if (key !== digits[index]) {
    return { state: miss(state, index), advance: false };
  }

  return { state: hit(state, index), advance: true };
};

export const clearFeedback = (state: PiState): PiState => ({
  ...state,
  lastResult: null,
  revealedIndex: null,
});
