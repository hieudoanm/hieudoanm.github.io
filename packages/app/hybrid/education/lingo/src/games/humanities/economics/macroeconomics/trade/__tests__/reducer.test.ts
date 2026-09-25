import { createInitialState, gameReducer } from '../reducer';
import type { GameState } from '../types';

describe('trade reducer', () => {
  it('opens in the exploring phase with free trade', () => {
    const state = createInitialState();
    expect(state.phase).toBe('explore');
    expect(state.tariff).toBe(0);
    expect(state.worldPrice).toBe(25);
  });

  it('clamps world price and tariff in the lab', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SET_WORLD_PRICE', value: 999 });
    expect(state.worldPrice).toBe(50);
    state = gameReducer(state, { type: 'SET_WORLD_PRICE', value: 2 });
    expect(state.worldPrice).toBe(10);
    state = gameReducer(state, { type: 'SET_TARIFF', value: 0.2 });
    expect(state.tariff).toBe(0.2);
  });

  it('ignores lab sliders once the challenge starts', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_ROUNDS' });
    const before = state;
    state = gameReducer(state, { type: 'SET_TARIFF', value: 0.5 });
    expect(state.tariff).toBe(before.tariff);
  });

  it('scores each round and finishes with a 400 total', () => {
    let state: GameState = createInitialState();
    state = gameReducer(state, { type: 'START_ROUNDS' });
    expect(state.phase).toBe('challenge');
    expect(state.round).toBe(1);

    state = gameReducer(state, { type: 'SUBMIT_CHOICE', tariff: 0.35 });
    expect(state.phase).toBe('reveal');
    expect(state.result?.score).toBe(100);
    state = gameReducer(state, { type: 'NEXT_ROUND' });

    state = gameReducer(state, { type: 'SUBMIT_CHOICE', tariff: 0.25 });
    expect(state.result?.score).toBe(100);
    state = gameReducer(state, { type: 'NEXT_ROUND' });

    state = gameReducer(state, { type: 'SUBMIT_CHOICE', tariff: 0.4 });
    expect(state.result?.score).toBe(100);
    state = gameReducer(state, { type: 'NEXT_ROUND' });

    expect(state.spec.kind).toBe('retaliation');
    state = gameReducer(state, { type: 'SET_MY_TARIFF', value: 0.5 });
    state = gameReducer(state, { type: 'SET_OTHER_TARIFF', value: 0.5 });
    state = gameReducer(state, { type: 'SUBMIT_RETALIATION' });
    expect(state.result?.kind).toBe('retaliation');
    expect(state.result?.score).toBe(100);
    state = gameReducer(state, { type: 'NEXT_ROUND' });

    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(4);
    expect(state.totalScore).toBe(400);
  });

  it('ignores submissions before the challenge starts', () => {
    let state = createInitialState();
    const before = state;
    state = gameReducer(state, { type: 'SUBMIT_CHOICE', tariff: 0.3 });
    expect(state).toBe(before);
  });

  it('rejects retaliation changes outside round 4', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_ROUNDS' });
    const before = state;
    state = gameReducer(state, { type: 'SET_MY_TARIFF', value: 0.5 });
    expect(state).toBe(before);
  });

  it('resets from any phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'START_ROUNDS' });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('explore');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
  });
});
