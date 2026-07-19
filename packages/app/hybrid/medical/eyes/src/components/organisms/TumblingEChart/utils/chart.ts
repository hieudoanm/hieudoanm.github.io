import { Direction } from '../types';
import { DIRECTIONS, TUMBLING_E_LINES } from '../constants';

export const randomDirections = (count: number): Direction[] =>
  Array.from(
    { length: count },
    () => DIRECTIONS[Math.floor(Math.random() * 4)]
  );

export const generateChart = () => {
  return TUMBLING_E_LINES.map((line) => ({
    ...line,
    directions: randomDirections(line.count),
  }));
};
