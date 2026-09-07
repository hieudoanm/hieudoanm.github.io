import { BOTS, PLAYER_ID, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';

describe('dictator reducer', () => {
  it('records the player give and reveals all four dictators', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GIVE',
      amount: 30,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.playerGive).toBe(30);
    expect(state.result?.gives[PLAYER_ID]).toBe(30);
    for (const bot of BOTS) {
      expect(state.result?.gives[bot.id]).toBe(bot.give);
    }
  });

  it('tracks total giving across rounds', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GIVE',
      amount: 20,
    });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'SUBMIT_GIVE', amount: 40 });
    expect(state.totalGiven).toBe(60);
  });

  it('ignores submissions outside the choose phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SUBMIT_GIVE',
      amount: 30,
    });
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_GIVE', amount: 50 });
    expect(next.result).toBe(before.result);
    expect(next.totalGiven).toBe(before.totalGiven);
  });

  it('ignores NEXT_ROUND without a result', () => {
    const state = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
  });

  it('advances rounds and completes the game', () => {
    let state = createInitialState();
    for (let round = 1; round <= TOTAL_ROUNDS; round++) {
      state = gameReducer(state, { type: 'SUBMIT_GIVE', amount: 25 });
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
    expect(state.totalGiven).toBe(25 * TOTAL_ROUNDS);
  });

  it('resets to the initial state', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_GIVE', amount: 30 });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('choose');
    expect(next.round).toBe(1);
    expect(next.results).toEqual([]);
    expect(next.totalGiven).toBe(0);
  });
});
