import { createInitialState, gameReducer } from '../reducer';
import { futureValue } from '../game';
import { annuityPresentValue, netPresentValue } from '../game';

describe('time-value reducer', () => {
  it('starts in the calculator phase', () => {
    const state = createInitialState();
    expect(state.phase).toBe('calculator');
    expect(state.principal).toBe(1000);
    expect(state.compounding).toBe(12);
  });

  it('updates slider values', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_PRINCIPAL', value: 5000 });
    state = gameReducer(state, { type: 'SET_RATE', value: 8 });
    state = gameReducer(state, { type: 'SET_YEARS', value: 20 });
    state = gameReducer(state, { type: 'SET_COMPOUNDING', value: 2 });
    expect(state.principal).toBe(5000);
    expect(state.rate).toBe(8);
    expect(state.years).toBe(20);
    expect(state.compounding).toBe(2);
  });

  it('moves to compare after check', () => {
    const state = gameReducer(createInitialState(), { type: 'CHECK' });
    expect(state.phase).toBe('compare');
    expect(state.compareRound).toBe(0);
  });

  it('scores a correct offer selection', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    const fvA = futureValue(1000, 0.08, 10, 1);
    const fvB = futureValue(1000, 0.075, 10, 12);
    const correct = fvA >= fvB ? 'offer-a' : 'offer-b';
    state = gameReducer(state, { type: 'SELECT_OFFER', offer: correct });
    expect(state.compareData[0].correctChoice).toBe(true);
    expect(state.score).toBe(1);
  });

  it('advances through all compare rounds to annuity', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    while (state.phase === 'compare') {
      state = gameReducer(state, { type: 'SELECT_OFFER', offer: 'offer-a' });
    }
    expect(state.phase).toBe('annuity');
    expect(state.compareData).toHaveLength(3);
  });

  it('accepts the NPV-positive project', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    while (state.phase === 'compare') {
      state = gameReducer(state, { type: 'SELECT_OFFER', offer: 'offer-a' });
    }
    state = gameReducer(state, { type: 'SELECT_ANNUITY', answer: 'annuity' });
    state = gameReducer(state, { type: 'SELECT_NPV', answer: 'accept' });
    expect(state.phase).toBe('results');
    expect(state.npvData.correctChoice).toBe(true);
    expect(state.score).toBe(4);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), { type: 'CHECK' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('calculator');
    expect(state.score).toBe(0);
    expect(state.compareData).toEqual([]);
  });

  it('verifies annuity PV is better than lump sum at 6%', () => {
    const apv = annuityPresentValue(500, 10, 0.06);
    expect(apv).toBeGreaterThan(3500);
  });

  it('verifies the project returns positive NPV at 5%', () => {
    const npv = netPresentValue([-1000, 300, 400, 400, 500], 0.05);
    expect(npv).toBeGreaterThan(0);
  });
});
