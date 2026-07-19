import {
  createBoard,
  getNeighbors,
  isSolved,
  toggleCell,
  generatePuzzle,
} from '../utils';

describe('createBoard', () => {
  it('creates 5x5 board of falses', () => {
    const board = createBoard(5);
    expect(board).toHaveLength(5);
    expect(board[0]).toHaveLength(5);
    expect(board.flat().every((c) => c === false)).toBe(true);
  });
});

describe('getNeighbors', () => {
  it('returns 5 neighbors for center cell', () => {
    const result = getNeighbors(2, 2, 5);
    expect(result).toHaveLength(5);
    expect(result).toContainEqual([2, 2]);
    expect(result).toContainEqual([1, 2]);
    expect(result).toContainEqual([3, 2]);
    expect(result).toContainEqual([2, 1]);
    expect(result).toContainEqual([2, 3]);
  });

  it('returns 3 neighbors for corner', () => {
    expect(getNeighbors(0, 0, 5)).toHaveLength(3);
    expect(getNeighbors(4, 4, 5)).toHaveLength(3);
  });

  it('returns 4 neighbors for edge', () => {
    expect(getNeighbors(0, 2, 5)).toHaveLength(4);
  });
});

describe('toggleCell', () => {
  it('toggles cell and its neighbors', () => {
    const board = createBoard(5);
    const next = toggleCell(board, 2, 2);
    expect(next[2][2]).toBe(true);
    expect(next[1][2]).toBe(true);
    expect(next[3][2]).toBe(true);
    expect(next[2][1]).toBe(true);
    expect(next[2][3]).toBe(true);
    expect(next[0][0]).toBe(false);
  });

  it('does not mutate original board', () => {
    const board = createBoard(5);
    toggleCell(board, 2, 2);
    expect(board[2][2]).toBe(false);
  });

  it('toggling twice returns to original', () => {
    const board = createBoard(5);
    const once = toggleCell(board, 1, 1);
    const twice = toggleCell(once, 1, 1);
    expect(twice).toEqual(board);
  });
});

describe('isSolved', () => {
  it('returns true for all off', () => {
    expect(isSolved(createBoard(5))).toBe(true);
  });

  it('returns false when lights are on', () => {
    const board = createBoard(5);
    const next = toggleCell(board, 2, 2);
    expect(isSolved(next)).toBe(false);
  });
});

describe('generatePuzzle', () => {
  beforeEach(() => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns a board with some lights on', () => {
    const { board, solution } = generatePuzzle(5, 8);
    expect(board.flat().some((c) => c === true)).toBe(true);
    expect(solution.length).toBe(8);
  });

  it('replaying solution toggles solve puzzle', () => {
    const { board, solution } = generatePuzzle(5, 5);
    let current = board.map((r) => [...r]);
    for (const [r, c] of [...solution].reverse()) {
      current = toggleCell(current, r, c);
    }
    expect(isSolved(current)).toBe(true);
  });
});
