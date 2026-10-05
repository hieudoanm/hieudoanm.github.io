import {
  countLit,
  createBoard,
  generatePuzzle,
  getNeighbors,
  isSolved,
  Pos,
  shuffle,
  toggleCell,
} from '../utils';

describe('createBoard', () => {
  it('creates a dark square board', () => {
    expect(createBoard(3)).toEqual([
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ]);
  });

  it('creates one row per requested size', () => {
    expect(createBoard(5)).toHaveLength(5);
    expect(createBoard(5)[0]).toHaveLength(5);
  });
});

describe('getNeighbors', () => {
  it('returns the cell plus four orthogonal neighbours in the centre', () => {
    const neighbors = getNeighbors(2, 2, 5).sort();
    expect(neighbors).toEqual([
      [1, 2],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 2],
    ]);
  });

  it('drops neighbours outside the board', () => {
    expect(getNeighbors(0, 0, 3)).toEqual([
      [0, 0],
      [1, 0],
      [0, 1],
    ]);
  });
});

describe('toggleCell', () => {
  it('flips the cell itself and every orthogonal neighbour', () => {
    const board = createBoard(5);
    const next = toggleCell(board, 2, 2);

    expect(next[2][2]).toBe(true);
    expect(next[1][2]).toBe(true);
    expect(next[3][2]).toBe(true);
    expect(next[2][1]).toBe(true);
    expect(next[2][3]).toBe(true);
    expect(next[0][0]).toBe(false);
  });

  it('does not mutate the original board', () => {
    const board = createBoard(5);
    toggleCell(board, 1, 1);

    expect(isSolved(board)).toBe(true);
  });

  it('toggles back to the starting state when pressed twice', () => {
    const once = toggleCell(createBoard(5), 2, 3);

    expect(toggleCell(once, 2, 3)).toEqual(createBoard(5));
  });

  it('commutes so the order of presses does not matter', () => {
    const first = toggleCell(toggleCell(createBoard(5), 0, 0), 4, 4);
    const second = toggleCell(toggleCell(createBoard(5), 4, 4), 0, 0);

    expect(first).toEqual(second);
  });
});

describe('isSolved', () => {
  it('is true for an all-dark board', () => {
    expect(isSolved(createBoard(5))).toBe(true);
  });

  it('is false when any cell is lit', () => {
    expect(isSolved(toggleCell(createBoard(5), 3, 1))).toBe(false);
  });
});

describe('countLit', () => {
  it('counts every lit cell', () => {
    const board = toggleCell(toggleCell(createBoard(5), 0, 0), 4, 4);
    expect(countLit(board)).toBe(3 + 3);
  });

  it('is zero on a fresh board', () => {
    expect(countLit(createBoard(5))).toBe(0);
  });
});

describe('shuffle', () => {
  it('keeps every element', () => {
    const items = [1, 2, 3, 4, 5];
    expect(shuffle(items).sort()).toEqual(items);
  });

  it('does not mutate the input', () => {
    const items = [1, 2, 3, 4, 5];
    shuffle(items);

    expect(items).toEqual([1, 2, 3, 4, 5]);
  });
});

describe('generatePuzzle', () => {
  it('produces a board of the requested size', () => {
    expect(generatePuzzle(4, 6).board).toHaveLength(4);
  });

  it('keeps no more presses than the board has cells', () => {
    const puzzle = generatePuzzle(3, 40);

    expect(puzzle.solution.length).toBeLessThanOrEqual(9);
  });

  it('is solvable by replaying the solution in reverse', () => {
    const puzzle = generatePuzzle(5, 8);
    let board = puzzle.board;

    for (const [row, col] of [...puzzle.solution].reverse()) {
      board = toggleCell(board, row, col);
    }

    expect(isSolved(board)).toBe(true);
  });

  it('uses the requested number of presses when the board allows it', () => {
    expect(generatePuzzle(6, 10).solution).toHaveLength(10);
  });

  it('only ever presses distinct cells', () => {
    const solution = generatePuzzle(6, 12).solution;
    const seen = new Set(solution.map(([row, col]) => `${row}-${col}`));

    expect(seen.size).toBe(solution.length);
  });

  it('generates a puzzle with at least one lit cell', () => {
    expect(countLit(generatePuzzle(5, 8).board)).toBeGreaterThan(0);
  });

  it('returns positions inside the board', () => {
    const inside = ([row, col]: Pos) =>
      row >= 0 && row < 5 && col >= 0 && col < 5;

    expect(generatePuzzle(5, 8).solution.every(inside)).toBe(true);
  });
});
