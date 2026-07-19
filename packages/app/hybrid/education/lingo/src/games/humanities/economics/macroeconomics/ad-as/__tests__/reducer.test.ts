import { createInitialState, gameReducer, GameState } from '../reducer';
import type { GapSign, PriceDirection } from '../types';

const submit = (
  state: GameState,
  gap: GapSign,
  price: PriceDirection
): GameState => gameReducer(state, { type: 'SUBMIT_PREDICTIONS', gap, price });

describe('ad-as reducer', () => {
  it('reveals the shock after submitting predictions', () => {
    let state = submit(createInitialState(), 'negative', 'same');
    expect(state.phase).toBe('reveal');
    expect(state.result?.gapCorrect).toBe(true);
    expect(state.result?.priceCorrect).toBe(true);
    expect(state.result?.points).toBe(2);
    expect(state.result?.shortRunPrice).toBeLessThan(100);
  });

  it('counts wrong predictions as zero points', () => {
    const state = submit(createInitialState(), 'positive', 'rises');
    expect(state.result?.points).toBe(0);
    expect(state.result?.gapCorrect).toBe(false);
    expect(state.result?.priceCorrect).toBe(false);
  });

  it('advances to the next shock with the running score', () => {
    let state = submit(createInitialState(), 'negative', 'same');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('predict');
    expect(state.round).toBe(2);
    expect(state.previousA).toBe(8500);
    expect(state.currentA).toBe(11500);
    expect(state.score).toBe(2);
    expect(state.result).toBeNull();
  });

  it('ignores submissions outside the predict phase', () => {
    let state = submit(createInitialState(), 'negative', 'same');
    const result = state.result;
    state = gameReducer(state, {
      type: 'SUBMIT_PREDICTIONS',
      gap: 'positive',
      price: 'rises',
    });
    expect(state.result).toBe(result);
  });

  it('ignores advancement before a reveal', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.round).toBe(1);
    expect(state.phase).toBe('predict');
  });

  it('completes all rounds and reaches the summary', () => {
    const plans: Array<[GapSign, PriceDirection]> = [
      ['negative', 'same'],
      ['positive', 'rises'],
      ['zero', 'falls'],
      ['negative', 'falls'],
      ['positive', 'rises'],
      ['positive', 'falls'],
    ];
    let state = createInitialState();
    for (const [gap, price] of plans) {
      state = submit(state, gap, price);
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.rounds).toHaveLength(6);
    expect(state.score).toBe(12);
  });

  it('resets to the initial state', () => {
    let state = submit(createInitialState(), 'negative', 'same');
    state = gameReducer(state as GameState, { type: 'RESET' });
    expect(state.phase).toBe('predict');
    expect(state.round).toBe(1);
    expect(state.rounds).toEqual([]);
    expect(state.score).toBe(0);
  });
});
