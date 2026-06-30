export type Phase = 'ready' | 'show' | 'input' | 'result';

export const TIME_PER_DIGIT = 650;
export const MIN_TIME = 1200;
export const MAX_TIME = 6000;

export const chunkDigits = (value: string, size = 3) => {
  const firstGroupLength = value.length % size || size;
  const first = value.slice(0, firstGroupLength);
  const rest = value
    .slice(firstGroupLength)
    .match(new RegExp(`.{1,${size}}`, 'g'))
    ?.join(',');
  return rest ? `${first},${rest}` : first;
};

export const generateNumber = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');

export const highlightMistakes = (input: string, correct: string) =>
  input
    .split('')
    .map((digit, i) =>
      digit === correct[i]
        ? digit
        : `<span class="text-red-500 font-bold">${digit}</span>`
    )
    .join('');
