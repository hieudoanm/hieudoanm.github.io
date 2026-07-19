import { Direction } from './types';

export const TUMBLING_E_LINES = [
  { size: 'text-[9rem]', count: 1, label: '20/200' },
  { size: 'text-[6rem]', count: 2, label: '20/100' },
  { size: 'text-[4.5rem]', count: 3, label: '20/70' },
  { size: 'text-[3.2rem]', count: 4, label: '20/50' },
  { size: 'text-[2.5rem]', count: 5, label: '20/40' },
  { size: 'text-[1.8rem]', count: 6, label: '20/30' },
  { size: 'text-[1.4rem]', count: 7, label: '20/25' },
  { size: 'text-[1.1rem]', count: 8, label: '20/20' },
  { size: 'text-[0.8rem]', count: 9, label: '20/15' },
  { size: 'text-[0.6rem]', count: 10, label: '20/10' },
];

export const DIRECTIONS: Direction[] = ['right', 'down', 'left', 'up'];

export const DIRECTION_LABELS: Record<Direction, string> = {
  right: '→',
  down: '↓',
  left: '←',
  up: '↑',
};
export const ROTATION: Record<Direction, string> = {
  right: 'rotate-0',
  down: 'rotate-90',
  left: 'rotate-180',
  up: '-rotate-90',
};
