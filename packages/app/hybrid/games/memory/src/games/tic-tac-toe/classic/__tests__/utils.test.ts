import { applyClassicMove, freshClassic, undoClassicMove } from '../utils';

const playAll = (order: number[]) => {
  let state = freshClassic();
  for (const idx of order) {
    state = applyClassicMove(state, idx);
  }
  return state;
};

describe('classic utils', () => {
  it('places a mark and passes the turn', () => {
    const result = applyClassicMove(freshClassic(), 0);
    expect(result.board[0]).toBe('X');
    expect(result.current).toBe('O');
    expect(result.moves).toHaveLength(1);
    expect(result.winner).toBeNull();
    expect(result.draw).toBe(false);
  });

  it('ignores occupied cells and moves after game over', () => {
    const once = applyClassicMove(freshClassic(), 0);
    expect(applyClassicMove(once, 0)).toBe(once);
    const won = playAll([0, 3, 1, 4, 2]);
    expect(applyClassicMove(won, 8)).toBe(won);
  });

  it('detects a row win for X', () => {
    const state = playAll([0, 3, 1, 4, 2]);
    expect(state.winner?.player).toBe('X');
    expect(state.winner?.cells).toEqual([0, 1, 2]);
  });

  it('detects a diagonal win for O', () => {
    const state = playAll([0, 4, 1, 2, 8, 6]);
    expect(state.winner?.player).toBe('O');
    expect(state.winner?.cells).toEqual([2, 4, 6]);
  });

  it('reports draw on a full board without a line', () => {
    const state = playAll([0, 1, 3, 4, 7, 6, 8, 5, 2]);
    expect(state.winner).toBeNull();
    expect(state.draw).toBe(true);
  });

  it('undoes the last move and restores the turn', () => {
    let state = freshClassic();
    state = applyClassicMove(state, 0);
    state = applyClassicMove(state, 4);
    const undone = undoClassicMove(state);
    expect(undone.board[4]).toBeNull();
    expect(undone.moves).toHaveLength(1);
    expect(undone.current).toBe('O');
  });

  it('undo on an empty board is a no-op', () => {
    const fresh = freshClassic();
    expect(undoClassicMove(fresh)).toBe(fresh);
  });
});
