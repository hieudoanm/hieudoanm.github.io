import { createInitialState, gameReducer, GameState } from '../reducer';

describe('stag-hunt reducer', () => {
  it('starts in choose phase with no partner', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.partnerId).toBeNull();
    expect(state.round).toBe(1);
  });

  it('selects a partner and stays in choose phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_PARTNER',
      partnerId: 'fellow-hunter',
    });
    expect(state.partnerId).toBe('fellow-hunter');
    expect(state.phase).toBe('choose');
  });

  it('resolves a round against fellow-hunter (always stag)', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PARTNER',
      partnerId: 'fellow-hunter',
    });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
    expect(state.phase).toBe('reveal');
    expect(state.partnerMove).toBe('stag');
    expect(state.result?.playerPayoff).toBe(4);
    expect(state.result?.partnerPayoff).toBe(4);
    expect(state.playerTotal).toBe(4);
    expect(state.partnerTotal).toBe(4);
  });

  it('resolves a round against hare-seeker (always hare)', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PARTNER',
      partnerId: 'hare-seeker',
    });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
    expect(state.partnerMove).toBe('hare');
    expect(state.result?.playerPayoff).toBe(0);
    expect(state.result?.partnerPayoff).toBe(3);
  });

  it('resolves a round against mimic (copies last player move)', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PARTNER',
      partnerId: 'mimic',
    });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'hare' });
    expect(state.partnerMove).toBe('stag');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'hare' });
    expect(state.partnerMove).toBe('hare');
  });

  it('resolves a round against grudger (turns hare after first player hare)', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PARTNER',
      partnerId: 'grudger',
    });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
    expect(state.partnerMove).toBe('stag');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'hare' });
    expect(state.partnerMove).toBe('stag');
    expect(state.result?.partnerPayoff).toBe(0);
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
    expect(state.partnerMove).toBe('hare');
  });

  it('advances rounds and completes the game', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_PARTNER',
      partnerId: 'fellow-hunter',
    });
    for (let round = 1; round <= 8; round++) {
      state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(8);
    expect(state.playerTotal).toBe(32);
    expect(state.partnerTotal).toBe(32);
  });

  it('ignores MAKE_MOVE outside choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_PARTNER',
      partnerId: 'fellow-hunter',
    });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
    const before = state;
    const next = gameReducer(state, { type: 'MAKE_MOVE', move: 'hare' });
    expect(next.result).toBe(before.result);
  });

  it('ignores NEXT_ROUND without a result', () => {
    const state = createInitialState();
    const next = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(next).toEqual(state);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState() as GameState, {
      type: 'SELECT_PARTNER',
      partnerId: 'fellow-hunter',
    });
    state = gameReducer(state, { type: 'MAKE_MOVE', move: 'stag' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.round).toBe(1);
    expect(state.partnerId).toBeNull();
    expect(state.results).toEqual([]);
    expect(state.phase).toBe('choose');
  });

  it('does nothing on unknown action (exhaustive check)', () => {
    const state = createInitialState();
    // @ts-expect-error testing exhaustive default
    const next = gameReducer(state, { type: 'UNKNOWN' });
    expect(next).toBe(state);
  });
});
