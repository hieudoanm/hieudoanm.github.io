export const GRID = 12;

export const TICK_BASE = 180;

export const MIN_TICK = 60;

export const TICK_DECAY = 3;

export const SPEED_LEVELS = [1, 2, 3, 4, 5];

export const SPEED_LABELS: Record<number, string> = {
  1: 'SLOW',
  2: 'EASY',
  3: 'FAIR',
  4: 'HARD',
  5: 'BRUTAL',
};

export const DIR_KEYS: Record<string, string> = {
  ArrowUp: 'UP',
  ArrowDown: 'DOWN',
  ArrowLeft: 'LEFT',
  ArrowRight: 'RIGHT',
  w: 'UP',
  s: 'DOWN',
  a: 'LEFT',
  d: 'RIGHT',
};
