import { Direction } from '../types';
import { DIRECTIONS, TUMBLING_E_LINES } from '../constants';

export function randomDirections(count: number): Direction[] {
  return Array.from(
    { length: count },
    () => DIRECTIONS[Math.floor(Math.random() * 4)]
  );
}

export function generateChart() {
  return TUMBLING_E_LINES.map((line) => ({
    ...line,
    directions: randomDirections(line.count),
  }));
}
