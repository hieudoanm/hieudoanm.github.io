import { DIRECTIONS, TUMBLING_E_LINES, TumblingELine } from './constants';
import { Direction } from './types';

export interface TumblingEChartLine extends TumblingELine {
  directions: Direction[];
}

export const randomDirections = (count: number): Direction[] =>
  Array.from(
    { length: count },
    () => DIRECTIONS[Math.floor(Math.random() * 4)]
  );

export const generateChart = (): TumblingEChartLine[] =>
  TUMBLING_E_LINES.map((line) => ({
    ...line,
    directions: randomDirections(line.count),
  }));
