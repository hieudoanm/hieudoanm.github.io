import {
  GRID,
  MIN_TICK,
  SPEED_LABELS,
  TICK_BASE,
  TICK_DECAY,
} from './constants';
import { Board, Cell, Dir, Pos, SnakeState } from './types';

const EMPTY_POS: Pos = { r: 0, c: 0 };

export const OPPOSITE: Record<Dir, Dir> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export const NEXT: Record<Dir, (pos: Pos) => Pos> = {
  UP: (pos) => ({ r: pos.r - 1, c: pos.c }),
  DOWN: (pos) => ({ r: pos.r + 1, c: pos.c }),
  LEFT: (pos) => ({ r: pos.r, c: pos.c - 1 }),
  RIGHT: (pos) => ({ r: pos.r, c: pos.c + 1 }),
};

export const isSame = (a: Pos, b: Pos): boolean => a.r === b.r && a.c === b.c;

export const isInside = (pos: Pos): boolean =>
  pos.r >= 0 && pos.r < GRID && pos.c >= 0 && pos.c < GRID;

export const initSnake = (): Pos[] => {
  const mid = Math.floor(GRID / 2);

  return [
    { r: mid, c: mid },
    { r: mid, c: mid - 1 },
    { r: mid, c: mid - 2 },
  ];
};

export const freeCells = (snake: Pos[]): Pos[] => {
  const taken = new Set(snake.map((pos) => `${pos.r},${pos.c}`));
  const pool: Pos[] = [];

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (!taken.has(`${r},${c}`)) pool.push({ r, c });
    }
  }

  return pool;
};

export const randomFood = (snake: Pos[]): Pos => {
  const pool = freeCells(snake);

  return pool[Math.floor(Math.random() * pool.length)] ?? EMPTY_POS;
};

export const createState = (): SnakeState => {
  const snake = initSnake();

  return {
    snake,
    food: randomFood(snake),
    direction: 'RIGHT',
    score: 0,
    status: 'running',
  };
};

export const canTurn = (state: SnakeState, dir: Dir): boolean =>
  dir !== OPPOSITE[state.direction];

export const turn = (state: SnakeState, dir: Dir): SnakeState =>
  canTurn(state, dir) && dir !== state.direction
    ? { ...state, direction: dir }
    : state;

export const advance = (state: SnakeState): SnakeState => {
  if (state.status !== 'running') return state;

  const head = NEXT[state.direction](state.snake[0]);

  if (!isInside(head) || state.snake.some((pos) => isSame(pos, head))) {
    return { ...state, status: 'over' };
  }

  const ate = isSame(head, state.food);
  const snake = ate
    ? [head, ...state.snake]
    : [head, ...state.snake.slice(0, -1)];

  if (!ate) return { ...state, snake };

  if (snake.length === GRID * GRID) {
    return { ...state, snake, score: state.score + 1, status: 'won' };
  }

  return {
    ...state,
    snake,
    food: randomFood(snake),
    score: state.score + 1,
  };
};

export const buildBoard = (state: SnakeState): Board => {
  const cells: Cell[][] = Array.from({ length: GRID }, () =>
    Array<Cell>(GRID).fill('empty')
  );

  cells[state.food.r][state.food.c] = 'food';
  state.snake.forEach((pos, index) => {
    cells[pos.r][pos.c] = index === 0 ? 'head' : 'snake';
  });

  return { cells, filled: state.snake.length };
};

export const tickFor = (speed: number): number =>
  Math.max(MIN_TICK, TICK_BASE - (speed - 1) * TICK_DECAY);

export const speedLabel = (speed: number): string =>
  SPEED_LABELS[speed] ?? SPEED_LABELS[1];
