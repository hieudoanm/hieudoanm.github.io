import { createInitialState, gameReducer } from '../reducer';
import { TOTAL_DAYS } from '../constants';

describe('commitment reducer', () => {
  it('starts in setup phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('setup');
    expect(state.day).toBe(1);
    expect(state.commitment).toBe(false);
  });

  it('transitions to choose phase with commitment on', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    expect(state.phase).toBe('choose');
    expect(state.commitment).toBe(true);
    expect(state.day).toBe(1);
    expect(state.savingsBalance).toBe(0);
  });

  it('transitions to choose phase with commitment off', () => {
    const state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: false,
    });
    expect(state.phase).toBe('choose');
    expect(state.commitment).toBe(false);
  });

  it('processes a save action and reveals results', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 15,
      random01: 0.5,
    });
    expect(state.phase).toBe('reveal');
    expect(state.lastResult?.intendedSave).toBe(15);
    expect(state.lastResult?.actualSave).toBe(15);
    expect(state.lastResult?.newBalance).toBe(Math.round(0 * 1.1 + 15));
    expect(state.lastResult?.consume).toBe(5);
    expect(state.savingsBalance).toBe(15);
  });

  it('applies temptation when commitment is off and random < 0.4', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: false,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 15,
      random01: 0.3,
    });
    expect(state.lastResult?.actualSave).toBe(5);
    expect(state.lastResult?.splurgeLoss).toBe(10);
    expect(state.lastResult?.consume).toBe(15);
  });

  it('does not apply temptation when commitment is off but random >= 0.4', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: false,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 15,
      random01: 0.5,
    });
    expect(state.lastResult?.actualSave).toBe(15);
    expect(state.lastResult?.splurgeLoss).toBe(0);
  });

  it('accumulates total consumption utility', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 15,
      random01: 0.5,
    });
    const day1U = state.lastResult?.consumptionUtility ?? 0;
    state = gameReducer(state, { type: 'NEXT_DAY' });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 10,
      random01: 0.5,
    });
    expect(state.totalConsumptionUtility).toBe(
      Math.round((day1U + state.lastResult!.consumptionUtility) * 100) / 100
    );
  });

  it('advances through all days to done', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    for (let day = 1; day <= TOTAL_DAYS; day++) {
      state = gameReducer(state, {
        type: 'SAVE',
        intendedSave: 10,
        random01: 0.5,
      });
      state = gameReducer(state, { type: 'NEXT_DAY' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_DAYS);
  });

  it('ignores SAVE outside choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 10,
      random01: 0.5,
    });
    const before = { ...state };
    const next = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 10,
      random01: 0.5,
    });
    expect(next.lastResult).toEqual(before.lastResult);
  });

  it('resets to initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 10,
      random01: 0.5,
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('setup');
    expect(state.day).toBe(1);
    expect(state.results).toEqual([]);
  });

  it('has splurge loss of zero when commitment is on', () => {
    let state = gameReducer(createInitialState(), {
      type: 'START_GAME',
      commitment: true,
    });
    state = gameReducer(state, {
      type: 'SAVE',
      intendedSave: 15,
      random01: 0.1,
    });
    expect(state.lastResult?.splurgeLoss).toBe(0);
    expect(state.lastResult?.actualSave).toBe(15);
  });
});
