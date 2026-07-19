import { randomFood, initSnake, OPPOSITE, NEXT } from '../snake';
import { Dir, Pos } from '../../types';
import { GRID } from '../../constants';

describe('initSnake', () => {
  it('creates snake of length 3 in the middle', () => {
    const snake = initSnake();
    expect(snake).toHaveLength(3);
    const mid = Math.floor(GRID / 2);
    expect(snake[0]).toEqual({ r: mid, c: mid });
    expect(snake[1]).toEqual({ r: mid, c: mid - 1 });
    expect(snake[2]).toEqual({ r: mid, c: mid - 2 });
  });
});

describe('randomFood', () => {
  it('returns a position not occupied by snake', () => {
    const snake: Pos[] = [{ r: 5, c: 5 }];
    const food = randomFood(snake);
    expect(food).not.toEqual({ r: 5, c: 5 });
  });

  it('returns position within grid bounds', () => {
    const snake = initSnake();
    for (let i = 0; i < 10; i++) {
      const food = randomFood(snake);
      expect(food.r).toBeGreaterThanOrEqual(0);
      expect(food.r).toBeLessThan(GRID);
      expect(food.c).toBeGreaterThanOrEqual(0);
      expect(food.c).toBeLessThan(GRID);
    }
  });
});

describe('OPPOSITE', () => {
  it('maps each direction to its opposite', () => {
    expect(OPPOSITE.UP).toBe('DOWN');
    expect(OPPOSITE.DOWN).toBe('UP');
    expect(OPPOSITE.LEFT).toBe('RIGHT');
    expect(OPPOSITE.RIGHT).toBe('LEFT');
  });
});

describe('NEXT', () => {
  it('moves position in each direction', () => {
    const pos: Pos = { r: 5, c: 5 };
    expect(NEXT.UP(pos)).toEqual({ r: 4, c: 5 });
    expect(NEXT.DOWN(pos)).toEqual({ r: 6, c: 5 });
    expect(NEXT.LEFT(pos)).toEqual({ r: 5, c: 4 });
    expect(NEXT.RIGHT(pos)).toEqual({ r: 5, c: 6 });
  });
});
