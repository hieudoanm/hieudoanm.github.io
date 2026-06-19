import { LETTERS, LOGMAR_LINES } from '../constants';

export const randomLetters = (count: number): string => {
  const pool = LETTERS.split('');
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join('');
};

export const generateChart = () => {
  return LOGMAR_LINES.map((line) => ({ ...line, letters: randomLetters(5) }));
};
