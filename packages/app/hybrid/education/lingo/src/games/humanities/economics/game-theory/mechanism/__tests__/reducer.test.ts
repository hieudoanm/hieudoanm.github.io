import { createInitialState, gameReducer } from '../reducer';
import { TOTAL_ROUNDS } from '../constants';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    sampleValues: () => [80, 40, 40],
  };
});

describe('mechanism reducer', () => {
  it('starts a round with a rule, fresh values and truthful AI reports', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rule: 'pivot',
    });
    expect(state.phase).toBe('choose');
    expect(state.rule).toBe('pivot');
    expect(state.value).toBe(80);
    expect(state.values).toEqual([80, 40, 40]);
    expect(state.reports).toEqual([80, 40, 40]);
    expect(state.playerReport).toBeNull();
  });

  it('reveals the build decision, pivot tax and player payoff', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rule: 'pivot',
    });
    state = gameReducer(state, { type: 'SUBMIT_REPORT', report: 80 });
    expect(state.phase).toBe('reveal');
    expect(state.result?.built).toBe(true);
    expect(state.result?.pivotal).toBe(true);
    expect(state.result?.reportedTruth).toBe(true);
    expect(state.result?.pivotTaxes).toEqual([70, 30, 30]);
    expect(state.result?.playerPayoff).toBe(-40);
  });

  it('builds with equal shares and no tax under Equal Share', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rule: 'equal',
    });
    state = gameReducer(state, { type: 'SUBMIT_REPORT', report: 70 });
    expect(state.result?.built).toBe(true);
    expect(state.result?.payments).toEqual([50, 50, 50]);
    expect(state.result?.pivotTaxes).toEqual([0, 0, 0]);
    expect(state.result?.playerPayoff).toBe(30);
  });

  it('advances rounds and completes after all rounds', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'START_ROUND', rule: 'pivot' });
      state = gameReducer(state, { type: 'SUBMIT_REPORT', report: 80 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
    expect(state.netTotal).toBe(-200);
  });

  it('ignores reports outside the choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rule: 'pivot',
    });
    state = gameReducer(state, { type: 'SUBMIT_REPORT', report: 80 });
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_REPORT', report: 0 });
    expect(next.result).toBe(before.result);
  });

  it('ignores a round advance before any report', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rule: 'equal',
    });
    const next = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(next).toBe(state);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_ROUND',
      rule: 'pivot',
    });
    state = gameReducer(state, { type: 'SUBMIT_REPORT', report: 80 });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.rule).toBeNull();
    expect(state.results).toEqual([]);
    expect(state.netTotal).toBe(0);
  });
});
