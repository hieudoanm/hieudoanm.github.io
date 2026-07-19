import { DEFAULT_COMPONENTS, PRICE_INDEX_DEFAULT, TARGETS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';
import type { GameState } from '../reducer';

const zeroComponents = (state: GameState): GameState => {
  let next = state;
  for (const key of [
    'consumption',
    'investment',
    'government',
    'netExports',
  ] as const) {
    next = gameReducer(next, { type: 'SET_COMPONENT', key, value: 0 });
  }
  return next;
};

const solveTarget = (state: GameState, target: number): GameState => {
  const consumption = Math.min(200, target);
  let remaining = target - consumption;
  const investment = Math.min(120, remaining);
  remaining -= investment;
  const government = Math.min(80, remaining);
  let next = gameReducer(state, {
    type: 'SET_COMPONENT',
    key: 'consumption',
    value: consumption,
  });
  next = gameReducer(next, {
    type: 'SET_COMPONENT',
    key: 'investment',
    value: investment,
  });
  next = gameReducer(next, {
    type: 'SET_COMPONENT',
    key: 'government',
    value: government,
  });
  return gameReducer(next, {
    type: 'SET_COMPONENT',
    key: 'netExports',
    value: remaining - government,
  });
};

describe('gdp reducer', () => {
  it('starts in explore mode with the default economy', () => {
    const state = createInitialState();
    expect(state.phase).toBe('explore');
    expect(state.components).toEqual(DEFAULT_COMPONENTS);
    expect(state.priceIndex).toBe(PRICE_INDEX_DEFAULT);
    expect(state.results).toEqual([]);
  });

  it('clamps component values to their slider range', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_COMPONENT',
      key: 'consumption',
      value: 9999,
    });
    expect(state.components.consumption).toBe(200);
    state = gameReducer(state, {
      type: 'SET_COMPONENT',
      key: 'netExports',
      value: -9999,
    });
    expect(state.components.netExports).toBe(-40);
  });

  it('clamps the price index to its range', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_PRICE_INDEX',
      value: 300,
    });
    expect(state.priceIndex).toBe(200);
  });

  it('starts the quiz with the first target', () => {
    const state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    expect(state.phase).toBe('round');
    expect(state.round).toBe(1);
    expect(state.target).toBe(TARGETS[0]);
  });

  it('ignores START_QUIZ outside the explore phase', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    const before = state;
    const next = gameReducer(state, { type: 'START_QUIZ' });
    expect(next).toBe(before);
  });

  it('scores an exact hit on the target', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = zeroComponents(state);
    state = gameReducer(state, {
      type: 'SET_COMPONENT',
      key: 'consumption',
      value: TARGETS[0],
    });
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.results).toHaveLength(1);
    expect(state.results[0]).toEqual({
      round: 1,
      target: TARGETS[0],
      actual: TARGETS[0],
      solved: true,
    });
    expect(state.solved).toBe(1);
    expect(state.round).toBe(2);
  });

  it('records a miss without scoring', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = zeroComponents(state);
    state = gameReducer(state, { type: 'CHECK' });
    expect(state.results[0].solved).toBe(false);
    expect(state.solved).toBe(0);
    expect(state.round).toBe(2);
  });

  it('ignores CHECK outside the round phase', () => {
    const state = gameReducer(createInitialState(), { type: 'CHECK' });
    expect(state.phase).toBe('explore');
    expect(state.results).toEqual([]);
  });

  it('finishes the quiz and shows the summary', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    for (const target of TARGETS) {
      state = solveTarget(state, target);
      state = gameReducer(state, { type: 'CHECK' });
    }
    expect(state.phase).toBe('summary');
    expect(state.results).toHaveLength(TARGETS.length);
    expect(state.solved).toBe(TARGETS.length);
    expect(state.round).toBe(TARGETS.length);
  });

  it('resets to the initial explore state', () => {
    let state = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    state = zeroComponents(state);
    state = gameReducer(state, { type: 'CHECK' });
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('explore');
    expect(next.components).toEqual(DEFAULT_COMPONENTS);
    expect(next.results).toEqual([]);
    expect(next.solved).toBe(0);
  });
});
