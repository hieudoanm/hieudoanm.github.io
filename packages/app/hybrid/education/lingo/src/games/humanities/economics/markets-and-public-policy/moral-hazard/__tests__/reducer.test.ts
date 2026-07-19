import { createInitialState, gameReducer } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    isLossDraw: () => true,
  };
});

describe('moral-hazard reducer', () => {
  it('starts in contract phase with round 1', () => {
    const state = createInitialState();
    expect(state.phase).toBe('contract');
    expect(state.round).toBe(1);
    expect(state.totalWealth).toBe(0);
    expect(state.roundResults).toEqual([]);
  });

  it('transitions to effort phase after contract selection', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'full',
    });
    expect(state.phase).toBe('effort');
    expect(state.selectedContract).toBe('full');
  });

  it('stores effort selection but stays in effort phase', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'none',
    });
    state = gameReducer(state, { type: 'SELECT_EFFORT', effort: 'high' });
    expect(state.phase).toBe('effort');
    expect(state.selectedEffort).toBe('high');
  });

  it('transitions to reveal after submit with a loss result', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'full',
    });
    state = gameReducer(state, { type: 'SELECT_EFFORT', effort: 'low' });
    state = gameReducer(state, { type: 'SUBMIT' });
    expect(state.phase).toBe('reveal');
    expect(state.roundResult?.loss).toBe(true);
    expect(state.roundResult?.netWealth).toBe(85);
    expect(state.totalWealth).toBe(85);
  });

  it('advances to next round after reveal', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'none',
    });
    state = gameReducer(state, { type: 'SELECT_EFFORT', effort: 'high' });
    state = gameReducer(state, { type: 'SUBMIT' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('contract');
    expect(state.round).toBe(2);
    expect(state.roundResults).toHaveLength(1);
    expect(state.selectedContract).toBeNull();
    expect(state.selectedEffort).toBeNull();
    expect(state.roundResult).toBeNull();
  });

  it('finishes after 6 rounds', () => {
    let state = createInitialState();
    for (let i = 1; i <= 6; i++) {
      state = gameReducer(state, {
        type: 'SELECT_CONTRACT',
        contract: 'full',
      });
      state = gameReducer(state, { type: 'SELECT_EFFORT', effort: 'low' });
      state = gameReducer(state, { type: 'SUBMIT' });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.roundResults).toHaveLength(6);
    expect(state.totalWealth).toBe(510);
  });

  it('ignores submit outside effort phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT' });
    expect(state.phase).toBe('contract');
  });

  it('ignores next_round outside reveal phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('contract');
  });

  it('ignores contract selection outside contract phase', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'full',
    });
    state = gameReducer(state, { type: 'SELECT_EFFORT', effort: 'low' });
    const before = state;
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'none',
    });
    expect(state).toBe(before);
  });

  it('ignores effort selection outside effort phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SELECT_EFFORT', effort: 'low' });
    expect(state.selectedEffort).toBeNull();
  });

  it('resets to initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, {
      type: 'SELECT_CONTRACT',
      contract: 'full',
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('contract');
    expect(state.round).toBe(1);
    expect(state.totalWealth).toBe(0);
    expect(state.roundResults).toEqual([]);
  });
});
