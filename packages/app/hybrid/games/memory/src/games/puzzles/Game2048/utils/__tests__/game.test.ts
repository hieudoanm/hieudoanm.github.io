jest.mock('../../constants', () => ({
  SIZE: 4,
}));

import { empty, clone, randomEmpty, spawn, init, move, canMove } from '../game';
import { Grid, Dir } from '../../types';

describe('empty', () => {
  it('creates 4x4 grid of zeros', () => {
    const g = empty();
    expect(g).toHaveLength(4);
    g.forEach((row) => {
      expect(row).toHaveLength(4);
      row.forEach((v) => expect(v).toBe(0));
    });
  });
});

describe('clone', () => {
  it('creates a deep copy', () => {
    const g: Grid = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const c = clone(g);
    expect(c).toEqual(g);
    c[0][0] = 4;
    expect(g[0][0]).toBe(2);
  });
});

describe('randomEmpty', () => {
  it('returns a position with zero', () => {
    const g = empty();
    const cell = randomEmpty(g);
    expect(cell).not.toBeNull();
    const [r, c] = cell!;
    expect(g[r][c]).toBe(0);
  });

  it('returns null when full', () => {
    const g: Grid = Array.from({ length: 4 }, () => Array(4).fill(2));
    expect(randomEmpty(g)).toBeNull();
  });
});

describe('spawn', () => {
  it('adds a tile to empty grid', () => {
    const g = empty();
    const result = spawn(g);
    const flat = result.flat();
    const nonZero = flat.filter((v) => v !== 0);
    expect(nonZero).toHaveLength(1);
    expect([2, 4]).toContain(nonZero[0]);
  });

  it('returns same grid when no empty cell', () => {
    const g: Grid = Array.from({ length: 4 }, () => Array(4).fill(2));
    const result = spawn(g);
    expect(result).toBe(g);
  });
});

describe('init', () => {
  it('creates grid with exactly 2 tiles', () => {
    const g = init();
    const flat = g.flat();
    const nonZero = flat.filter((v) => v !== 0);
    expect(nonZero).toHaveLength(2);
  });
});

describe('move', () => {
  it('moves tiles left', () => {
    const g: Grid = [
      [0, 0, 2, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { grid, score, moved } = move(g, 'LEFT');
    expect(moved).toBe(true);
    expect(score).toBe(0);
    expect(grid[0][0]).toBe(2);
  });

  it('merges equal tiles', () => {
    const g: Grid = [
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { grid, score, moved } = move(g, 'LEFT');
    expect(moved).toBe(true);
    expect(grid[0][0]).toBe(4);
    expect(score).toBe(4);
  });

  it('moves tiles up', () => {
    const g: Grid = [
      [0, 0, 0, 0],
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { grid, moved } = move(g, 'UP');
    expect(moved).toBe(true);
    expect(grid[0][0]).toBe(2);
  });

  it('moves tiles down', () => {
    const g: Grid = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { grid, moved } = move(g, 'DOWN');
    expect(moved).toBe(true);
    expect(grid[3][0]).toBe(2);
  });

  it('moves tiles right', () => {
    const g: Grid = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { grid, moved } = move(g, 'RIGHT');
    expect(moved).toBe(true);
    expect(grid[0][3]).toBe(2);
  });

  it('reports no move when grid unchanged', () => {
    const g: Grid = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    const { moved } = move(g, 'LEFT');
    expect(moved).toBe(false);
  });
});

describe('canMove', () => {
  it('returns true when empty cell exists', () => {
    const g = empty();
    expect(canMove(g)).toBe(true);
  });

  it('returns true when adjacent cells match', () => {
    const g: Grid = [
      [2, 2, 4, 8],
      [16, 32, 64, 128],
      [256, 512, 1024, 2048],
      [0, 0, 0, 0],
    ];
    expect(canMove(g)).toBe(true);
  });

  it('returns false when no moves possible', () => {
    const g: Grid = [
      [2, 4, 8, 16],
      [32, 64, 128, 256],
      [512, 1024, 2048, 2],
      [4, 8, 16, 32],
    ];
    expect(canMove(g)).toBe(false);
  });
});
