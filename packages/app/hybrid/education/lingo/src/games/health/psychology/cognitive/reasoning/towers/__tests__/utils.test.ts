import {
  applyMoves,
  canDrop,
  createStacks,
  generateMoves,
  isSolved,
  moveDisk,
  optimalMoves,
  Tower,
} from '../utils';

describe('createStacks', () => {
  it('puts every disk on the first peg in descending order', () => {
    expect(createStacks(3)).toEqual([[3, 2, 1], [], []]);
  });

  it('creates one empty array per peg', () => {
    expect(createStacks(5)).toHaveLength(3);
  });
});

describe('canDrop', () => {
  it('allows a smaller disk onto a larger one', () => {
    expect(canDrop(0, 1, [[2, 1], [2], []])).toBe(true);
  });

  it('rejects a larger disk onto a smaller one', () => {
    expect(canDrop(0, 1, [[2], [1], []])).toBe(false);
  });

  it('rejects a move onto the same peg', () => {
    expect(canDrop(0, 0, [[1], [], []])).toBe(false);
  });

  it('rejects a move from an empty peg', () => {
    expect(canDrop(1, 2, [[1], [], []])).toBe(false);
  });

  it('allows any disk onto an empty peg', () => {
    expect(canDrop(0, 2, [[1], [], []])).toBe(true);
  });
});

describe('moveDisk', () => {
  it('moves the top disk between pegs', () => {
    expect(moveDisk([[2, 1], [2], []], 0, 1)).toEqual([[2], [2, 1], []]);
  });

  it('leaves the state untouched for an illegal move', () => {
    const towers: Tower[] = [[2], [1], []];

    expect(moveDisk(towers, 0, 1)).toBe(towers);
  });

  it('does not mutate the input', () => {
    const towers: Tower[] = [[2, 1], [], []];
    moveDisk(towers, 0, 1);

    expect(towers).toEqual([[2, 1], [], []]);
  });
});

describe('optimalMoves', () => {
  it('follows two to the power of n minus one', () => {
    expect(optimalMoves(1)).toBe(1);
    expect(optimalMoves(3)).toBe(7);
    expect(optimalMoves(5)).toBe(31);
  });
});

describe('isSolved', () => {
  it('is true when every disk is on the last peg', () => {
    expect(isSolved([[], [], [1, 2, 3]], 3)).toBe(true);
  });

  it('is false while disks remain elsewhere', () => {
    expect(isSolved([[1], [], [2, 3]], 3)).toBe(false);
  });
});

describe('generateMoves', () => {
  it('returns no moves for zero disks', () => {
    expect(generateMoves(0)).toEqual([]);
  });

  it('produces 2 to the power of n minus one moves', () => {
    expect(generateMoves(4)).toHaveLength(15);
  });

  it('solves a single disk in one move', () => {
    expect(generateMoves(1)).toEqual([[0, 2]]);
  });

  it('solves the puzzle when replayed from the start', () => {
    const solution = generateMoves(4);

    expect(applyMoves(createStacks(4), solution)).toEqual([
      [],
      [],
      [4, 3, 2, 1],
    ]);
  });

  it('produces the same sequence for the same input', () => {
    expect(generateMoves(5)).toEqual(generateMoves(5));
  });

  it('never moves from and to the same peg', () => {
    const illegal = generateMoves(5).filter(([from, to]) => from === to);

    expect(illegal).toEqual([]);
  });
});

describe('applyMoves', () => {
  it('applies moves in order', () => {
    const towers = createStacks(2);

    expect(
      applyMoves(towers, [
        [0, 1],
        [0, 2],
        [1, 2],
      ])
    ).toEqual([[], [], [2, 1]]);
  });

  it('returns the starting state for an empty move list', () => {
    expect(applyMoves(createStacks(3), [])).toEqual([[3, 2, 1], [], []]);
  });
});
