import { LETTERS, LOGMAR_LINES } from '../constants';

export function randomLetters(count: number): string {
  const pool = LETTERS.split('');
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).join('');
}

export function generateChart() {
  return LOGMAR_LINES.map((line) => ({ ...line, letters: randomLetters(5) }));
}
