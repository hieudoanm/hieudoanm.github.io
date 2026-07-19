import { COUNTRIES, isCountry, normalizeCountry } from '../_shared/countries';
import {
  MAX_GUESSES,
  STATUS_RANK,
  type GameStatus,
  type GuessRow,
  type LetterStatus,
} from './types';

/** Country names usable as Wordle answers: one word, 4-10 letters. */
export const ANSWER_POOL: readonly string[] = COUNTRIES.filter(
  (name) => !name.includes(' ') && name.length >= 4 && name.length <= 10
);

/** Any single-word country name is a valid guess. */
export const GUESSABLE = new Set(
  COUNTRIES.filter((name) => !name.includes(' ')).map(normalizeCountry)
);

export const isValidGuess = (guess: string): boolean =>
  isCountry(guess) && !guess.trim().includes(' ');

/** Classic Wordle scoring with correct duplicate-letter handling. */
export const evaluateGuess = (
  guess: string,
  answer: string
): LetterStatus[] => {
  const target = normalizeCountry(answer);
  const statuses: LetterStatus[] = Array(target.length).fill('absent');
  const remaining: Record<string, number> = {};
  for (let index = 0; index < target.length; index += 1) {
    const letter = target[index];
    if (guess[index] === letter) {
      statuses[index] = 'correct';
    } else {
      remaining[letter] = (remaining[letter] ?? 0) + 1;
    }
  }
  for (let index = 0; index < target.length; index += 1) {
    if (statuses[index] === 'correct') continue;
    const left = remaining[guess[index]] ?? 0;
    if (left > 0) {
      statuses[index] = 'present';
      remaining[guess[index]] = left - 1;
    }
  }
  return statuses;
};

/** Merges a scored row into the aggregated keyboard state. */
export const mergeKeyboard = (
  keyboard: Record<string, LetterStatus>,
  word: string,
  statuses: LetterStatus[]
): Record<string, LetterStatus> => {
  const next = { ...keyboard };
  for (let index = 0; index < word.length; index += 1) {
    const letter = word[index];
    const current = next[letter];
    if (!current || STATUS_RANK[statuses[index]] > STATUS_RANK[current]) {
      next[letter] = statuses[index];
    }
  }
  return next;
};

/** Deterministic daily answer: same date key always picks the same country. */
export const dailyAnswerIndex = (dateKey: string): number => {
  let hash = 7;
  for (const character of dateKey) {
    hash = (hash * 31 + character.charCodeAt(0)) % 100_000;
  }
  return hash % ANSWER_POOL.length;
};

export const dailyAnswer = (dateKey: string): string =>
  ANSWER_POOL[dailyAnswerIndex(dateKey)];

export const todayKey = (now: Date = new Date()): string =>
  `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;

export interface SubmitResult {
  guesses: GuessRow[];
  keyboard: Record<string, LetterStatus>;
  message: string | null;
  status: GameStatus;
}

/** Pure core of a Wordle turn. */
export const submitGuess = (
  current: string,
  answer: string,
  guesses: GuessRow[],
  keyboard: Record<string, LetterStatus>
): SubmitResult => {
  const word = normalizeCountry(current);
  if (word.length !== normalizeCountry(answer).length) {
    return {
      guesses,
      keyboard,
      message: `Not enough letters`,
      status: 'playing',
    };
  }
  if (!GUESSABLE.has(word)) {
    return {
      guesses,
      keyboard,
      message: 'Not a country name',
      status: 'playing',
    };
  }
  const statuses = evaluateGuess(word, answer);
  const row: GuessRow = { word, statuses };
  const nextGuesses = [...guesses, row];
  const won = word === normalizeCountry(answer);
  const lost = !won && nextGuesses.length >= MAX_GUESSES;
  return {
    guesses: nextGuesses,
    keyboard: mergeKeyboard(keyboard, word, statuses),
    message: null,
    status: won ? 'won' : lost ? 'lost' : 'playing',
  };
};
