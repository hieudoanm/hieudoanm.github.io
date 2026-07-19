import { applyReverseMove, freshReverse, undoReverseMove } from '../utils';

const playAll = (order: number[]) => {
  let state = freshReverse();
  for (const idx of order) {
    state = applyReverseMove(state, idx);
  }
  return state;
};

describe('reverse utils', () => {
  it('alternates marks like classic tic-tac-toe', () => {
    const first = applyReverseMove(freshReverse(), 4);
    expect(first.board[4]).toBe('X');
    expect(first.current).toBe('O');
    expect(first.loser).toBeNull();
  });

  it('makes the mover the loser when completing a line', () => {
    // X completes top row on their third move
    const state = playAll([0, 3, 1, 4, 2]);
    expect(state.loser?.player).toBe('X');
    expect(state.loser?.cells).toEqual([0, 1, 2]);
  });

  it('can end in a draw where nobody lost', () => {
    const state = playAll([0, 1, 3, 4, 7, 6, 8, 5, 2]);
    expect(state.loser).toBeNull();
    expect(state.draw).toBe(true);
  });

  it('ignores moves onto occupied cells', () => {
    let state = freshReverse();
    state = applyReverseMove(state, 0);
    const rejected = applyReverseMove(state, 0);
    expect(rejected.moves).toHaveLength(1);
  });

  it('undoes the last mark and restores the turn', () => {
    let state = freshReverse();
    state = applyReverseMove(state, 0);
    state = applyReverseMove(state, 4);
    const undone = undoReverseMove(state);
    expect(undone.board[4]).toBeNull();
    expect(undone.moves).toHaveLength(1);
    expect(undone.current).toBe('O');
  });
});
