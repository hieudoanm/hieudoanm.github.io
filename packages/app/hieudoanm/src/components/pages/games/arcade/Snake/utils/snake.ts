import { Dir, Pos } from '../types';
import { GRID } from '../constants';

export const randomFood = (snake: Pos[]): Pos => {
  const set = new Set(snake.map((p) => `${p.r},${p.c}`));
  const pool: Pos[] = [];
  for (let r = 0; r < GRID; r++)
    for (let c = 0; c < GRID; c++)
      if (!set.has(`${r},${c}`)) pool.push({ r, c });
  return pool[Math.floor(Math.random() * pool.length)];
};

export const initSnake = (): Pos[] => {
  const mid = Math.floor(GRID / 2);
  return [
    { r: mid, c: mid },
    { r: mid, c: mid - 1 },
    { r: mid, c: mid - 2 },
  ];
};

export const OPPOSITE: Record<Dir, Dir> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export const NEXT: Record<Dir, (p: Pos) => Pos> = {
  UP: (p) => ({ r: p.r - 1, c: p.c }),
  DOWN: (p) => ({ r: p.r + 1, c: p.c }),
  LEFT: (p) => ({ r: p.r, c: p.c - 1 }),
  RIGHT: (p) => ({ r: p.r, c: p.c + 1 }),
};
