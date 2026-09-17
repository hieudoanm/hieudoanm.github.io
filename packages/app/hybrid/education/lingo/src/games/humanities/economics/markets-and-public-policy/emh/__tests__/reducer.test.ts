import { createInitialState, gameReducer } from '../reducer';
import { buyAndHoldWealth, tipStrategyWealth } from '../game';
import { RETURNS } from '../constants';

const playAll = (positions: ('in' | 'cash')[]) => {
  let state = createInitialState();
  for (const position of positions) {
    state = gameReducer(state, { type: 'SET_POSITION', position });
    state = gameReducer(state, { type: 'NEXT' });
  }
  return state;
};

describe('emh reducer', () => {
  it('creates the initial playable state', () => {
    const state = createInitialState();
    expect(state.phase).toBe('play');
    expect(state.round).toBe(1);
    expect(state.wealth).toBe(1000);
    expect(state.decisions).toEqual([]);
    expect(state.results).toEqual([]);
  });

  it('records a chosen position without advancing', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_POSITION',
      position: 'in',
    });
    expect(state.decisions).toEqual(['in']);
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
  });

  it('applies the return when invested and stays flat in cash', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_POSITION',
      position: 'cash',
    });
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.wealth).toBe(1000);
    expect(state.results[0]).toEqual({
      round: 1,
      returnPct: 3,
      tip: 0,
      position: 'cash',
      wealthAfter: 1000,
    });

    state = gameReducer(state, { type: 'SET_POSITION', position: 'in' });
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.wealth).toBe(980);
  });

  it('reflects the deterministic return of each round', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_POSITION', position: 'in' });
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.results[0].returnPct).toBe(RETURNS[0]);
    state = gameReducer(state, { type: 'SET_POSITION', position: 'in' });
    state = gameReducer(state, { type: 'NEXT' });
    expect(state.wealth).toBe(1000 * 1.03 * 0.98);
  });

  it('ignores NEXT until a position is chosen', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT' });
    expect(state.round).toBe(1);
  });

  it('completes after ten rounds with the buy-and-hold wealth', () => {
    const state = playAll(RETURNS.map(() => 'in'));
    expect(state.phase).toBe('done');
    expect(state.round).toBe(10);
    expect(state.wealth).toBe(buyAndHoldWealth());
    expect(state.results).toHaveLength(10);
  });

  it('reaches a tip-strategy outcome when following the tips', () => {
    const tips = [0, 1, 1, 0, 1, 1, 0, 1, 0, 1];
    const state = playAll(tips.map((tip) => (tip >= 1 ? 'in' : 'cash')));
    expect(state.wealth).toBe(tipStrategyWealth());
  });

  it('resets to the initial state', () => {
    const done = playAll(RETURNS.map(() => 'in'));
    const state = gameReducer(done, { type: 'RESET' });
    expect(state.phase).toBe('play');
    expect(state.round).toBe(1);
    expect(state.wealth).toBe(1000);
    expect(state.results).toEqual([]);
  });
});
