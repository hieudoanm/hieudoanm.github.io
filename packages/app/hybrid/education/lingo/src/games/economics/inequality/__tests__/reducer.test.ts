import { TOTAL_ROUNDS } from '../constants';
import { createInitialState, GameState, gameReducer } from '../reducer';

const submit = (state: GameState, tax: number): GameState =>
  gameReducer(gameReducer(state, { type: 'SET_TAX', value: tax }), {
    type: 'SUBMIT',
  } as const);

const next = (state: GameState): GameState =>
  gameReducer(state, { type: 'NEXT_ROUND' } as const);

describe('inequality reducer', () => {
  it('starts in the play phase of round one', () => {
    const state = createInitialState();
    expect(state.phase).toBe('play');
    expect(state.round).toBe(1);
    expect(state.taxInput).toBe(0);
    expect(state.outcome).toBeNull();
    expect(state.outcomes).toEqual([]);
    expect(state.totalScore).toBe(0);
  });

  it('records a tax rate without leaving the play phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_TAX',
      value: 0.25,
    });
    expect(state.taxInput).toBe(0.25);
    expect(state.phase).toBe('play');
  });

  it('submits the round and reveals the computed outcome', () => {
    const state = submit(createInitialState(), 0.25);
    expect(state.phase).toBe('reveal');
    expect(state.outcome).not.toBeNull();
    expect(state.outcome?.round).toBe(1);
    expect(state.outcome?.chosenTax).toBe(0.25);
    expect(state.outcome?.baseGini).toBeCloseTo(0.3056603774, 5);
    expect(state.outcome?.afterGini).toBeCloseTo(0.2292452831, 5);
    expect(state.outcome?.rebate).toBeCloseTo(13.25, 5);
    expect(state.outcome?.povertyBefore).toBe(0.2);
    expect(state.outcome?.povertyAfter).toBe(0.1);
    expect(state.outcome?.score).toBe(3);
    expect(state.outcome?.winning).toBe(true);
  });

  it('advances to the next round and accumulates the score', () => {
    const state = next(submit(createInitialState(), 0.25));
    expect(state.phase).toBe('play');
    expect(state.round).toBe(2);
    expect(state.taxInput).toBe(0);
    expect(state.outcome).toBeNull();
    expect(state.outcomes).toHaveLength(1);
    expect(state.totalScore).toBe(3);
  });

  it('accumulates win, near, and miss points across rounds', () => {
    let state = next(submit(createInitialState(), 0.29));
    state = next(submit(state, 0.2));
    state = next(submit(state, 0.4));
    expect(state.outcomes.map((o) => o.score)).toEqual([1, 3, 0]);
    expect(state.totalScore).toBe(4);
    expect(state.round).toBe(4);
  });

  it('ignores submissions outside the play phase', () => {
    const revealed = submit(createInitialState(), 0.25);
    const again = gameReducer(revealed, { type: 'SUBMIT' } as const);
    expect(again).toBe(revealed);
  });

  it('ignores round advancement outside the reveal phase', () => {
    const initial = createInitialState();
    const settled = gameReducer(initial, { type: 'NEXT_ROUND' } as const);
    expect(settled).toBe(initial);
  });

  it('finishes after all rounds and sums the final score', () => {
    const taxes = [0.25, 0.2, 0.3, 0.35, 0.35];
    let state = createInitialState();
    for (const tax of taxes) {
      state = next(submit(state, tax));
    }
    expect(state.phase).toBe('done');
    expect(state.outcomes).toHaveLength(TOTAL_ROUNDS);
    expect(state.totalScore).toBe(15);
  });

  it('ignores play actions once the game is done', () => {
    let state = createInitialState();
    for (const tax of [0.25, 0.2, 0.3, 0.35, 0.35]) {
      state = next(submit(state, tax));
    }
    expect(state.phase).toBe('done');
    expect(gameReducer(state, { type: 'SUBMIT' } as const)).toBe(state);
    expect(gameReducer(state, { type: 'NEXT_ROUND' } as const)).toBe(state);
  });

  it('resets to a fresh game', () => {
    const played = next(submit(createInitialState(), 0.25));
    const state = gameReducer(played, { type: 'RESET' } as const);
    expect(state.phase).toBe('play');
    expect(state.round).toBe(1);
    expect(state.taxInput).toBe(0);
    expect(state.outcome).toBeNull();
    expect(state.outcomes).toEqual([]);
    expect(state.totalScore).toBe(0);
  });
});
