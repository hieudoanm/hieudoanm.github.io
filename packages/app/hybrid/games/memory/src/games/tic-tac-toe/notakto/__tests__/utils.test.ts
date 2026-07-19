import { applyNotaktoMove, freshNotakto, undoNotaktoMove } from '../utils';

describe('notakto utils', () => {
  it('places X marks for alternating players', () => {
    const state = freshNotakto();
    const first = applyNotaktoMove(state, 0);
    expect(first.board[0]).toBe('X');
    expect(first.current).toBe(2);
    expect(first.loserCells).toBeNull();
    expect(first.draw).toBe(false);
  });

  it('marks the losing line when a player completes three', () => {
    let state = freshNotakto();
    // P1: 0, P2: 3, P1: 1, P2: 4, P1: 2 -> P1 completes the top row
    for (const idx of [0, 3, 1, 4, 2]) {
      state = { ...state, ...applyNotaktoMove(state, idx) };
    }
    expect(state.loserCells).toEqual([0, 1, 2]);
    expect(state.moves).toHaveLength(5);
  });

  it('ignores moves once a line is lost', () => {
    let state = freshNotakto();
    for (const idx of [0, 3, 1, 4, 2]) {
      state = { ...state, ...applyNotaktoMove(state, idx) };
    }
    const locked = applyNotaktoMove(state, 8);
    expect(locked.moves).toHaveLength(5);
  });

  it('ignores moves onto occupied cells', () => {
    let state = freshNotakto();
    state = applyNotaktoMove(state, 0);
    const rejected = applyNotaktoMove(state, 0);
    expect(rejected).toBe(state);
    expect(state.moves).toHaveLength(1);
  });

  it('undoes the last mark', () => {
    let state = freshNotakto();
    state = { ...state, ...applyNotaktoMove(state, 5) };
    const undone = undoNotaktoMove(state);
    expect(undone.board[5]).toBeNull();
    expect(undone.moves).toHaveLength(0);
    expect(undone.current).toBe(1);
  });

  it('refuses to undo after the game ended', () => {
    const lost = { ...freshNotakto(), loserCells: [0, 1, 2] };
    expect(undoNotaktoMove(lost)).toBe(lost);
    const drawn = { ...freshNotakto(), draw: true };
    expect(undoNotaktoMove(drawn)).toBe(drawn);
  });
});
