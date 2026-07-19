import { MAX_TIME, MIN_TIME, TIME_PER_DIGIT } from './constants';

export const chunkDigits = (value: string, size = 3): string => {
  const firstGroupLength = value.length % size || size;
  const first = value.slice(0, firstGroupLength);
  const rest = value
    .slice(firstGroupLength)
    .match(new RegExp(`.{1,${size}}`, 'g'))
    ?.join(',');

  return rest ? `${first},${rest}` : first;
};

export const generateNumber = (length: number): string =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

export const showDuration = (level: number): number =>
  Math.min(MAX_TIME, Math.max(MIN_TIME, level * TIME_PER_DIGIT));

export const compareDigits = (input: string, correct: string): boolean =>
  input === correct;

export const mistakesOf = (input: string, correct: string): number =>
  correct.split('').filter((digit, index) => digit !== input[index]).length;
