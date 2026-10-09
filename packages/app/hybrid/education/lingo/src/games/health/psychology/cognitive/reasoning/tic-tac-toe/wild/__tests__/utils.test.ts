import { applyWildMove, freshWild, selectMark, undoWildMove } from '../utils';

describe('wild utils', () => {
  it('plays the selected mark', () => {
    const state = freshWild();
    const first = applyWildMove(state, 4);
    expect(first.board[4]).toBe('X');
    expect(first.moves[0].player).toBe('X');
    expect(first.current).toBe(2);
  });

  it('lets the next player pick the other mark', () => {
    let state = applyWildMove(freshWild(), 0);
    state = selectMark(state, 'O');
    expect(state.selectedMark).toBe('O');
    const second = applyWildMove(state, 1);
    expect(second.board[1]).toBe('O');
    // a line of either mark wins
    state = selectMark(second, 'X');
    state = applyWildMove(state, 3);
    const win = applyWildMove(state, 6);
    expect(win.winner?.player).toBe('X');
    expect(win.winner?.cells).toEqual([0, 3, 6]);
  });

  it('reports draw on a full board without a line', () => {
    const play =
      (mark: 'X' | 'O', idx: number) => (state: ReturnType<typeof freshWild>) =>
        applyWildMove(selectMark(state, mark), idx);
    let state = freshWild();
    for (const [mark, idx] of [
      ['X', 0],
      ['O', 1],
      ['X', 2],
      ['O', 4],
      ['X', 3],
      ['O', 5],
      ['X', 7],
      ['O', 6],
      ['X', 8],
    ] as ['X' | 'O', number][]) {
      state = play(mark, idx)(state);
    }
    expect(state.winner).toBeNull();
    expect(state.draw).toBe(true);
  });

  it('ignores moves after the game ended', () => {
    let state = freshWild();
    for (const idx of [0, 3, 6]) {
      state = selectMark(state, 'X');
      state = applyWildMove(state, idx);
    }
    expect(state.winner?.cells).toEqual([0, 3, 6]);
    const locked = applyWildMove(state, 8);
    expect(locked.moves).toHaveLength(3);
  });

  it('undoes the last move', () => {
    let state = freshWild();
    state = applyWildMove(state, 2);
    const undone = undoWildMove(state);
    expect(undone.board[2]).toBeNull();
    expect(undone.moves).toHaveLength(0);
    expect(undone.current).toBe(1);
  });
});
