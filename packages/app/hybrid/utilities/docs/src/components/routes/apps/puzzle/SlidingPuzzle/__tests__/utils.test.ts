import {
  createSolvedBoard,
  getAdjacent,
  isSolved,
  shuffleBoard,
} from '../utils';

describe('getAdjacent', () => {
  it('returns 4 neighbors for a center cell in 3x3', () => {
    const result = getAdjacent(4, 3);
    expect(result).toEqual([1, 7, 3, 5]);
  });

  it('returns 2 neighbors for top-left corner', () => {
    const result = getAdjacent(0, 3);
    expect(result).toEqual([3, 1]);
  });

  it('returns 2 neighbors for bottom-right corner', () => {
    const result = getAdjacent(8, 3);
    expect(result).toEqual([5, 7]);
  });

  it('returns 3 neighbors for an edge cell', () => {
    const result = getAdjacent(3, 3);
    expect(result).toEqual([0, 6, 4]);
  });

  it('works for 4x4 grid', () => {
    const result = getAdjacent(5, 4);
    expect(result).toEqual([1, 9, 4, 6]);
  });
});

describe('isSolved', () => {
  it('returns true for solved 3x3 board', () => {
    const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    expect(isSolved(board, 3)).toBe(true);
  });

  it('returns false for unsolved board', () => {
    const board = [1, 0, 3, 4, 2, 5, 7, 8, 6];
    expect(isSolved(board, 3)).toBe(false);
  });

  it('returns false for empty array', () => {
    expect(isSolved([], 3)).toBe(false);
  });

  it('returns true for solved 4x4 board', () => {
    const board = Array.from({ length: 16 }, (_, i) => i);
    expect(isSolved(board, 4)).toBe(true);
  });
});

describe('createSolvedBoard', () => {
  it('creates a 3x3 solved board with empty at start', () => {
    expect(createSolvedBoard(3)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('creates a 4x4 solved board with empty at start', () => {
    const board = createSolvedBoard(4);
    expect(board).toHaveLength(16);
    expect(board[0]).toBe(0);
    expect(board[1]).toBe(1);
    expect(board[15]).toBe(15);
  });

  it('creates a 5x5 solved board with empty at start', () => {
    const board = createSolvedBoard(5);
    expect(board).toHaveLength(25);
    expect(board[0]).toBe(0);
  });
});

describe('shuffleBoard', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns array of correct length', () => {
    const result = shuffleBoard(3);
    expect(result.tiles).toHaveLength(9);
    expect(result.shuffleMoves.length).toBeGreaterThan(0);
  });

  it('marks exactly one tile as empty', () => {
    const result = shuffleBoard(4);
    expect(result.tiles.filter((t) => t === 0)).toHaveLength(1);
    expect(result.tiles[result.emptyIndex]).toBe(0);
  });

  it('produces a valid puzzle (all tiles 0..n*n-1)', () => {
    const result = shuffleBoard(3);
    const sorted = [...result.tiles].sort((a, b) => a - b);
    expect(sorted).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('records moves that can solve the puzzle', () => {
    const result = shuffleBoard(3);
    const tiles = [...result.tiles];
    const reversed = [...result.shuffleMoves].reverse();

    for (const [a, b] of reversed) {
      [tiles[a], tiles[b]] = [tiles[b], tiles[a]];
    }

    expect(isSolved(tiles, 3)).toBe(true);
  });
});
