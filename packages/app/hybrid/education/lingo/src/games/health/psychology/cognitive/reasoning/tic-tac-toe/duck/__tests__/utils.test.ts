import {
  freshDuck,
  isCellFree,
  isDraw,
  moveDuck,
  placeMark,
  undoDuckMove,
} from '../utils';

describe('duck utils', () => {
  it('splits each turn into mark and duck phases', () => {
    let state = freshDuck();
    state = placeMark(state, 0);
    expect(state.board[0]).toBe('X');
    expect(state.phase).toBe('duck');
    expect(state.pendingMark).toBe(0);

    state = moveDuck(state, 4);
    expect(state.duck).toBe(4);
    expect(state.moves).toHaveLength(1);
    expect(state.current).toBe('O');
    expect(state.phase).toBe('mark');
  });

  it('treats the duck cell as blocked', () => {
    let state = freshDuck();
    state = placeMark(state, 0);
    state = moveDuck(state, 4);
    expect(isCellFree(state, 4)).toBe(false);
    expect(isCellFree(state, 1)).toBe(true);
    const blocked = placeMark(state, 4);
    expect(blocked.pendingMark).toBeNull();
  });

  it('rejects placing the duck on the just-marked cell', () => {
    let state = freshDuck();
    state = placeMark(state, 0);
    const rejected = moveDuck(state, 0);
    expect(rejected.duck).toBeNull();
    expect(rejected.moves).toHaveLength(0);
  });

  it('wins immediately on a completed line during the mark phase', () => {
    // X:0/duck8, O:2/duck7, X:3/duck5 then X completes column 0-3-6
    let state = freshDuck();
    for (const [mark, duck] of [
      [0, 8],
      [2, 7],
      [3, 5],
      [1, 4],
    ] as [number, number][]) {
      state = placeMark(state, mark);
      state = moveDuck(state, duck);
    }
    state = placeMark(state, 6);
    expect(state.winner?.player).toBe('X');
    expect(state.winner?.cells).toEqual([0, 3, 6]);
  });

  it('undo steps back within the turn and across turns', () => {
    let state = freshDuck();
    state = placeMark(state, 2);
    const midTurnUndo = undoDuckMove(state);
    expect(midTurnUndo.board[2]).toBeNull();
    expect(midTurnUndo.phase).toBe('mark');

    state = moveDuck(placeMark(state, 2), 8);
    const fullUndo = undoDuckMove(state);
    expect(fullUndo.duck).toBeNull();
    expect(fullUndo.board[2]).toBeNull();
    expect(fullUndo.current).toBe('X');
    expect(fullUndo.moves).toHaveLength(0);
  });

  it('reports draw only when the board fills without a line', () => {
    const empty = freshDuck();
    expect(isDraw(empty)).toBe(false);
  });
});
