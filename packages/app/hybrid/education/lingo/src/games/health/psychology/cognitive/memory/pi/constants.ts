export const DIGIT_WIDTH = 24;

export const VIEWPORT_OFFSET = 4 * DIGIT_WIDTH;

export const HIGH_SCORE_KEY = 'pi-high-score';

export const ADVANCE_DELAY = 200;

export const KEYPAD = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0'];

export const PREVENTED_KEYS = ['ArrowLeft', 'ArrowRight', ' '];

export type Mode = 'practice' | 'game';

export interface PiState {
  locked: boolean;
  lastResult: 'correct' | 'wrong' | null;
  revealedIndex: number | null;
  highScore: number;
}

export const INITIAL_PI_STATE: PiState = {
  locked: false,
  lastResult: null,
  revealedIndex: null,
  highScore: 0,
};

export const getHighScore = (): number => {
  if (typeof window === 'undefined') return 0;

  const saved = Number(localStorage.getItem(HIGH_SCORE_KEY));

  return Number.isNaN(saved) ? 0 : saved;
};

export const saveHighScore = (highScore: number): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(HIGH_SCORE_KEY, String(highScore));
};
