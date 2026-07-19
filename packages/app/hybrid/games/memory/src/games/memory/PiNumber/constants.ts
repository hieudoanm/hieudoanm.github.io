export const DIGIT_WIDTH = 24;
export const VIEWPORT_OFFSET = 4 * DIGIT_WIDTH;
export const HIGH_SCORE_KEY = 'pi-high-score';

export type Mode = 'practice' | 'game';

export const getHighScore = () => {
  if (typeof window === 'undefined') return 0;
  const saved = Number(localStorage.getItem(HIGH_SCORE_KEY));
  return Number.isNaN(saved) ? 0 : saved;
};
