import { createInitialState, gameReducer } from '../reducer';

describe('sequential game reducer', () => {
  it('starts in the choose phase at round 1', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
  });

  it('records PLAY_ENTRY without leaving the choose phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'enter',
    });
    expect(state.phase).toBe('choose');
    expect(state.playerAction).toBe('enter');
  });

  it('reveals on REVEAL after inserting enter', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'enter',
    });
    state = gameReducer(state, { type: 'REVEAL' });
    expect(state.phase).toBe('reveal');
    expect(state.incumbentAction).toBe('accommodate');
    expect(state.playerPayoff).toBe(6);
    expect(state.spneMatch).toBe(true);
  });

  it('reveals to playerPayoff 4 after out', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'out',
    });
    state = gameReducer(state, { type: 'REVEAL' });
    expect(state.incumbentAction).toBeNull();
    expect(state.playerPayoff).toBe(4);
    expect(state.spneMatch).toBe(false);
  });

  it('ignores a second PLAY_ENTRY in the same choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'enter',
    });
    const before = state.playerAction;
    state = gameReducer(state, { type: 'PLAY_ENTRY', choice: 'out' });
    expect(state.playerAction).toBe(before);
  });

  it('ignores REVEAL without a chosen action', () => {
    const state = gameReducer(createInitialState(), { type: 'REVEAL' });
    expect(state.phase).toBe('choose');
  });

  it('ignores PLAY_ENTRY outside the choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'enter',
    });
    state = gameReducer(state, { type: 'REVEAL' });
    const before = state.playerAction;
    state = gameReducer(state, { type: 'PLAY_ENTRY', choice: 'out' });
    expect(state.playerAction).toBe(before);
  });

  it('advances to round 2 after NEXT_ROUND', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'enter',
    });
    state = gameReducer(state, { type: 'REVEAL' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(2);
    expect(state.results).toHaveLength(1);
    expect(state.totalScore).toBe(6);
  });

  it('ignores NEXT_ROUND outside the reveal phase', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
  });

  it('completes after 5 rounds', () => {
    let state = createInitialState();
    for (let i = 0; i < 5; i++) {
      state = gameReducer(state, { type: 'PLAY_ENTRY', choice: 'enter' });
      state = gameReducer(state, { type: 'REVEAL' });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(5);
    expect(state.totalScore).toBe(30);
  });

  it('resets to initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PLAY_ENTRY',
      choice: 'enter',
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.playerAction).toBeNull();
    expect(state.results).toEqual([]);
    expect(state.totalScore).toBe(0);
  });
});
