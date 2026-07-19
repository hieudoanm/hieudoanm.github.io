import { GRID, MIN_TICK, TICK_BASE, TICK_DECAY } from '../constants';
import {
  advance,
  buildBoard,
  canTurn,
  createState,
  freeCells,
  initSnake,
  isInside,
  isSame,
  NEXT,
  OPPOSITE,
  randomFood,
  speedLabel,
  tickFor,
  turn,
} from '../snake';
import { Pos, SnakeState } from '../types';

const pos = (r: number, c: number): Pos => ({ r, c });

const state = (overrides: Partial<SnakeState> = {}): SnakeState => ({
  snake: [pos(5, 5), pos(5, 4), pos(5, 3)],
  food: pos(0, 0),
  direction: 'RIGHT',
  score: 0,
  status: 'running',
  ...overrides,
});

describe('direction helpers', () => {
  it('knows the opposite of every direction', () => {
    expect(OPPOSITE.UP).toBe('DOWN');
    expect(OPPOSITE.DOWN).toBe('UP');
    expect(OPPOSITE.LEFT).toBe('RIGHT');
    expect(OPPOSITE.RIGHT).toBe('LEFT');
  });

  it('steps one cell per direction', () => {
    expect(NEXT.UP(pos(5, 5))).toEqual(pos(4, 5));
    expect(NEXT.DOWN(pos(5, 5))).toEqual(pos(6, 5));
    expect(NEXT.LEFT(pos(5, 5))).toEqual(pos(5, 4));
    expect(NEXT.RIGHT(pos(5, 5))).toEqual(pos(5, 6));
  });
});

describe('geometry helpers', () => {
  it('compares positions', () => {
    expect(isSame(pos(1, 2), pos(1, 2))).toBe(true);
    expect(isSame(pos(1, 2), pos(2, 1))).toBe(false);
  });

  it('bounds-checks positions', () => {
    expect(isInside(pos(0, 0))).toBe(true);
    expect(isInside(pos(GRID - 1, GRID - 1))).toBe(true);
    expect(isInside(pos(-1, 0))).toBe(false);
    expect(isInside(pos(0, GRID))).toBe(false);
  });
});

describe('initSnake', () => {
  it('starts centred and pointing right', () => {
    const snake = initSnake();

    expect(snake).toHaveLength(3);
    expect(snake[0]).toEqual(pos(6, 6));
    expect(snake[2]).toEqual(pos(6, 4));
  });
});

describe('freeCells and randomFood', () => {
  it('reports every cell the snake does not cover', () => {
    expect(freeCells([])).toHaveLength(GRID * GRID);
    expect(freeCells(initSnake())).toHaveLength(GRID * GRID - 3);
  });

  it('never places food on the snake', () => {
    const snake = initSnake();

    for (let i = 0; i < 50; i++) {
      expect(snake.some((cell) => isSame(cell, randomFood(snake)))).toBe(false);
    }
  });

  it('falls back to the origin when the board is full', () => {
    const full = Array.from({ length: GRID * GRID }, (_, i) =>
      pos(Math.floor(i / GRID), i % GRID)
    );

    expect(randomFood(full)).toEqual(pos(0, 0));
  });
});

describe('createState', () => {
  it('starts running at the origin of the run', () => {
    const fresh = createState();

    expect(fresh.direction).toBe('RIGHT');
    expect(fresh.score).toBe(0);
    expect(fresh.status).toBe('running');
    expect(fresh.snake).toEqual(initSnake());
  });
});

describe('turn', () => {
  it('accepts a legal turn', () => {
    expect(turn(state(), 'DOWN').direction).toBe('DOWN');
  });

  it('refuses to reverse into the neck', () => {
    const current = state({ direction: 'RIGHT' });

    expect(turn(current, 'LEFT')).toBe(current);
  });

  it('ignores a turn to the current direction', () => {
    const same = state({ direction: 'UP' });

    expect(turn(same, 'UP')).toBe(same);
  });

  it('exposes the reversal guard', () => {
    expect(canTurn(state({ direction: 'UP' }), 'DOWN')).toBe(false);
    expect(canTurn(state({ direction: 'UP' }), 'LEFT')).toBe(true);
  });
});

describe('advance', () => {
  it('moves the head one cell forward', () => {
    const next = advance(state());

    expect(next.snake[0]).toEqual(pos(5, 6));
    expect(next.snake).toHaveLength(3);
    expect(next.score).toBe(0);
  });

  it('grows and scores when it eats', () => {
    const next = advance(state({ food: pos(5, 6) }));

    expect(next.snake).toHaveLength(4);
    expect(next.score).toBe(1);
    expect(next.snake.some((cell) => isSame(cell, next.food))).toBe(false);
  });

  it('ends the run at the wall', () => {
    const east = state({ snake: [pos(5, GRID - 1)] });

    expect(advance(east).status).toBe('over');

    const south = state({ snake: [pos(GRID - 1, 5)], direction: 'DOWN' });

    expect(advance(south).status).toBe('over');
  });

  it('ends the run on itself', () => {
    const coiled = state({
      direction: 'LEFT',
      snake: [pos(5, 5), pos(5, 6), pos(4, 6), pos(4, 5), pos(5, 4)],
    });

    expect(advance(coiled).status).toBe('over');
  });

  it('does nothing once the run is finished', () => {
    const over = state({ status: 'over' });

    expect(advance(over)).toBe(over);

    const won = state({ status: 'won' });

    expect(advance(won)).toBe(won);
  });

  it('wins when the board is filled', () => {
    const everyCell = Array.from({ length: GRID * GRID }, (_, i) =>
      pos(Math.floor(i / GRID), i % GRID)
    );
    const almostFull = [
      pos(5, 5),
      ...everyCell.filter(
        (cell) => !isSame(cell, pos(5, 5)) && !isSame(cell, pos(5, 6))
      ),
    ];
    const next = advance(state({ snake: almostFull, food: pos(5, 6) }));

    expect(next.snake).toHaveLength(GRID * GRID);
    expect(next.status).toBe('won');
  });
});

describe('buildBoard', () => {
  it('maps the snake, head, and food onto the grid', () => {
    const { cells, filled } = buildBoard(
      state({ snake: [pos(0, 0), pos(0, 1)], food: pos(2, 2) })
    );

    expect(cells).toHaveLength(GRID);
    expect(cells[0][0]).toBe('head');
    expect(cells[0][1]).toBe('snake');
    expect(cells[2][2]).toBe('food');
    expect(cells[1][1]).toBe('empty');
    expect(filled).toBe(2);
  });
});

describe('tickFor', () => {
  it('starts at the base interval', () => {
    expect(tickFor(1)).toBe(TICK_BASE);
  });

  it('shortens as the speed rises', () => {
    expect(tickFor(3)).toBe(TICK_BASE - 2 * TICK_DECAY);
  });

  it('never goes under the floor', () => {
    expect(tickFor(99)).toBe(MIN_TICK);
  });
});

describe('speedLabel', () => {
  it('names every level', () => {
    expect(speedLabel(1)).toBe('SLOW');
    expect(speedLabel(5)).toBe('BRUTAL');
  });

  it('falls back for an unknown level', () => {
    expect(speedLabel(42)).toBe('SLOW');
  });
});
