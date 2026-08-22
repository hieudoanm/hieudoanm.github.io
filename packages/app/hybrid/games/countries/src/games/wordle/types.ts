export type LetterStatus = 'correct' | 'present' | 'absent';

export interface GuessRow {
  word: string;
  statuses: LetterStatus[];
}

export type GameStatus = 'playing' | 'won' | 'lost';

/** Statuses ranked strongest-first; used to merge keyboard hints. */
export const STATUS_RANK: Record<LetterStatus, number> = {
  correct: 3,
  present: 2,
  absent: 1,
};

export const MAX_GUESSES = 6;

export const KEYBOARD_ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'] as const;
