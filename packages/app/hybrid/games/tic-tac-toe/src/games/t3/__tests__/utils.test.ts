import { aboutToDisappear, applyT3Move, freshT3, undoT3Move } from '../utils';

describe('t3 utils', () => {
  it('places marks and alternates players', () => {
    let state = freshT3();
    state = applyT3Move(state, 0);
    expect(state.board[0]).toBe('X');
    expect(state.history.X).toEqual([0]);
    state = applyT3Move(state, 4);
    expect(state.current).toBe('X');
  });

  it('removes the oldest mark when placing a fourth', () => {
    let state = freshT3();
    // X: 0,1,8 then X places 5 -> oldest (0) disappears
    for (const idx of [0, 3, 1, 6]) {
      state = applyT3Move(state, idx);
    }
    state = applyT3Move(state, 8);
    state = applyT3Move(state, 7);
    expect(state.history.X).toEqual([0, 1, 8]);
    expect(state.current).toBe('X');
    const fourth = applyT3Move(state, 5);
    expect(fourth.board[0]).toBeNull();
    expect(fourth.history.X).toEqual([1, 8, 5]);
  });

  it('detects a winner with three live marks', () => {
    let state = freshT3();
    // X: 0,1 then third mark 2 wins; O never gets three in line
    for (const idx of [0, 6, 1, 7]) {
      state = applyT3Move(state, idx);
    }
    expect(applyT3Move(state, 2).winner?.player).toBe('X');
  });

  it('undoes the last move', () => {
    let state = freshT3();
    state = applyT3Move(state, 5);
    const undone = undoT3Move(state);
    expect(undone.board[5]).toBeNull();
    expect(undone.moves).toHaveLength(0);
    expect(undone.current).toBe('X');
  });

  it('refuses to undo on an empty game', () => {
    const fresh = freshT3();
    expect(undoT3Move(fresh)).toBe(fresh);
  });

  it('flags the oldest mark as about to disappear', () => {
    let state = freshT3();
    for (const idx of [0, 3, 1, 6, 8]) {
      state = applyT3Move(state, idx);
    }
    expect(aboutToDisappear(state.history, 'X')).toBe(0);
    expect(aboutToDisappear(state.history, 'O')).toBeNull();
  });
});
