import { createInitialState, gameReducer, GameState } from '../reducer';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    sampleStartGap: () => 1,
    sampleTrueCoef: () => 0.4,
    generateDataset: () =>
      Array.from({ length: 10 }, (_, index) => ({
        growth: -1 + index,
        du: 1 - 0.2 * index,
      })),
    estimateLine: () => ({ slope: -0.4, intercept: 1.25 }),
    closestCoef: () => 0.4,
    nextUnemployment: (unemployment: number) =>
      Math.round((unemployment + 1) * 100) / 100,
  };
});

describe('okuns reducer', () => {
  it('creates a default intro state', () => {
    const state = createInitialState();
    expect(state.phase).toBe('intro');
    expect(state.model.gStar).toBe(2.5);
    expect(state.model.c).toBe(0.5);
    expect(state.model.uStar).toBe(5);
  });

  it('updates the model sliders only from the intro phase', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_POTENTIAL_GROWTH',
      value: 3,
    });
    state = gameReducer(state, { type: 'SET_OKUN_COEF', value: 0.4 });
    state = gameReducer(state, { type: 'SET_NATURAL_RATE', value: 4 });
    expect(state.model).toEqual({ gStar: 3, c: 0.4, uStar: 4 });

    state = gameReducer(state, { type: 'START_STEER' });
    const afterStart = gameReducer(state, {
      type: 'SET_POTENTIAL_GROWTH',
      value: 1,
    });
    expect(afterStart.model.gStar).toBe(3);
    expect(afterStart.phase).toBe('steer');
  });

  it('starts a steer scenario from the natural rate plus a gap', () => {
    const state = gameReducer(createInitialState(), { type: 'START_STEER' });
    expect(state.phase).toBe('steer');
    expect(state.startUnemployment).toBe(6);
    expect(state.unemployment).toBe(6);
    expect(state.steerStep).toBe(0);
    expect(state.growth).toBe(2.5);
  });

  it('applies growth across two years and grades the final deviation', () => {
    let state = gameReducer(createInitialState(), { type: 'START_STEER' });
    state = gameReducer(state, { type: 'SET_GROWTH', value: 4.5 });
    state = gameReducer(state, { type: 'CHECK_STEER' });
    expect(state.phase).toBe('steer');
    expect(state.unemployment).toBe(7);
    expect(state.steerStep).toBe(1);

    state = gameReducer(state, { type: 'CHECK_STEER' });
    expect(state.phase).toBe('done');
    expect(state.resultKind).toBe('steer');
    expect(state.deviation).toBe(3);
    expect(state.outcomeScore).toBe(0);
    expect(state.onTarget).toBe(false);
  });

  it('ignores growth changes outside the steer phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SET_GROWTH',
      value: 1,
    });
    expect(state.growth).toBe(2.5);
  });

  it('resolves the estimated coefficient to a score', () => {
    let state = gameReducer(createInitialState(), { type: 'START_ESTIMATE' });
    expect(state.phase).toBe('estimate');
    expect(state.dataset).toHaveLength(10);
    expect(state.chosenCoef).toBeNull();

    state = gameReducer(state, { type: 'CHOOSE_COEF', value: 0.5 });
    state = gameReducer(state, { type: 'ESTIMATE_COEFFICIENT' });
    expect(state.phase).toBe('done');
    expect(state.resultKind).toBe('estimate');
    expect(state.line?.slope).toBe(-0.4);
    expect(state.correctCoef).toBe(0.4);
    expect(state.outcomeScore).toBe(90);
    expect(state.onTarget).toBe(false);
  });

  it('requires a coefficient choice before estimating', () => {
    let state = gameReducer(createInitialState(), { type: 'START_ESTIMATE' });
    state = gameReducer(state, { type: 'ESTIMATE_COEFFICIENT' });
    expect(state.phase).toBe('estimate');
    expect(state.line).toBeNull();
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState() as GameState, {
      type: 'START_STEER',
    });
    state = gameReducer(state, { type: 'RESET' });
    expect(state.phase).toBe('intro');
    expect(state.dataset).toEqual([]);
    expect(state.chosenCoef).toBeNull();
    expect(state.outcomeScore).toBe(0);
  });
});
