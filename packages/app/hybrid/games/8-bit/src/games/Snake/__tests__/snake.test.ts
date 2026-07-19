import { randomFood, initSnake, OPPOSITE, NEXT } from '../snake';
import { GRID } from '../constants';

describe('initSnake', () => {
  it('returns 3 segments', () => {
    expect(initSnake()).toHaveLength(3);
  });

  it('places head at center of grid', () => {
    const snake = initSnake();
    const mid = Math.floor(GRID / 2);
    expect(snake[0]).toEqual({ r: mid, c: mid });
  });

  it('segments are horizontally aligned going left', () => {
    const snake = initSnake();
    const mid = Math.floor(GRID / 2);
    expect(snake[1]).toEqual({ r: mid, c: mid - 1 });
    expect(snake[2]).toEqual({ r: mid, c: mid - 2 });
  });
});

describe('randomFood', () => {
  it('returns a position not occupied by the snake', () => {
    const snake = initSnake();
    const food = randomFood(snake);
    const occupied = new Set(snake.map((p) => `${p.r},${p.c}`));
    expect(occupied.has(`${food.r},${food.c}`)).toBe(false);
  });

  it('returns a position within the grid', () => {
    const snake = initSnake();
    const food = randomFood(snake);
    expect(food.r).toBeGreaterThanOrEqual(0);
    expect(food.r).toBeLessThan(GRID);
    expect(food.c).toBeGreaterThanOrEqual(0);
    expect(food.c).toBeLessThan(GRID);
  });

  it('works with a single-cell snake', () => {
    const snake = [{ r: 0, c: 0 }];
    const food = randomFood(snake);
    expect(`${food.r},${food.c}`).not.toBe('0,0');
  });
});

describe('OPPOSITE', () => {
  it('maps each direction to its opposite', () => {
    expect(OPPOSITE.UP).toBe('DOWN');
    expect(OPPOSITE.DOWN).toBe('UP');
    expect(OPPOSITE.LEFT).toBe('RIGHT');
    expect(OPPOSITE.RIGHT).toBe('LEFT');
  });

  it('double opposite returns original', () => {
    expect(OPPOSITE[OPPOSITE.UP]).toBe('UP');
    expect(OPPOSITE[OPPOSITE.DOWN]).toBe('DOWN');
    expect(OPPOSITE[OPPOSITE.LEFT]).toBe('LEFT');
    expect(OPPOSITE[OPPOSITE.RIGHT]).toBe('RIGHT');
  });
});

describe('NEXT', () => {
  it('UP moves one cell up', () => {
    expect(NEXT.UP({ r: 5, c: 5 })).toEqual({ r: 4, c: 5 });
  });

  it('DOWN moves one cell down', () => {
    expect(NEXT.DOWN({ r: 5, c: 5 })).toEqual({ r: 6, c: 5 });
  });

  it('LEFT moves one cell left', () => {
    expect(NEXT.LEFT({ r: 5, c: 5 })).toEqual({ r: 5, c: 4 });
  });

  it('RIGHT moves one cell right', () => {
    expect(NEXT.RIGHT({ r: 5, c: 5 })).toEqual({ r: 5, c: 6 });
  });
});
