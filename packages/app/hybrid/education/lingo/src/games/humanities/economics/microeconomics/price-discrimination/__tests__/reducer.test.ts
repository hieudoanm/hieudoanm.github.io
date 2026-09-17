import { gameReducer, GameState, createInitialState } from '../reducer';

const submitDual = (
  state: GameState,
  priceB: string,
  priceL: string
): GameState => {
  let next = gameReducer(state, { type: 'SET_MODE', mode: 'dual' });
  next = gameReducer(next, { type: 'SET_PRICE_B', value: priceB });
  next = gameReducer(next, { type: 'SET_PRICE_L', value: priceL });
  return gameReducer(next, { type: 'SUBMIT' });
};

const submitSingle = (state: GameState, price: string): GameState => {
  let next = gameReducer(state, { type: 'SET_MODE', mode: 'single' });
  next = gameReducer(next, { type: 'SET_PRICE', value: price });
  return gameReducer(next, { type: 'SUBMIT' });
};

describe('segment pricing reducer', () => {
  it('creates the initial state', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.mode).toBe('single');
    expect(state.results).toEqual([]);
    expect(state.totalProfit).toBe(0);
  });

  it('switches modes and clears the other mode prices', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_MODE',
      mode: 'dual',
    });
    expect(state.mode).toBe('dual');
    state = gameReducer(state, { type: 'SET_PRICE_B', value: '55' });
    state = gameReducer(state, { type: 'SET_PRICE_L', value: '35' });
    state = gameReducer(state, { type: 'SET_MODE', mode: 'single' });
    expect(state.mode).toBe('single');
    expect(state.priceB).toBe('');
    expect(state.priceL).toBe('');
  });

  it('records quantities, revenue, cost and profit for a two-price round', () => {
    const state = submitDual(createInitialState(), '55', '35');
    expect(state.phase).toBe('reveal');
    expect(state.result?.qb).toBe(45);
    expect(state.result?.ql).toBe(50);
    expect(state.result?.revenue).toBe(4225);
    expect(state.result?.cost).toBe(950);
    expect(state.result?.profit).toBe(3275);
    expect(state.result?.beatBenchmark).toBe(true);
    expect(state.result?.foundOptimal).toBe(true);
  });

  it('computes the single-price profit for comparisons', () => {
    const state = submitSingle(createInitialState(), '42');
    expect(state.result?.qb).toBe(58);
    expect(state.result?.ql).toBe(36);
    expect(state.result?.revenue).toBe(3948);
    expect(state.result?.profit).toBe(3008);
    expect(state.result?.beatBenchmark).toBe(true);
  });

  it('marks near-optimal two prices within tolerance', () => {
    const state = submitDual(createInitialState(), '54', '36');
    expect(state.result?.profit).toBe(3272);
    expect(state.result?.foundOptimal).toBe(true);
  });

  it('rejects empty or invalid submissions', () => {
    let state = gameReducer(createInitialState(), { type: 'SUBMIT' });
    expect(state.phase).toBe('choose');
    state = gameReducer(state, { type: 'SET_PRICE', value: '0' });
    state = gameReducer(state, { type: 'SUBMIT' });
    expect(state.phase).toBe('choose');
  });

  it('flips the optimum prices in round 3', () => {
    let state = createInitialState();
    state = submitDual(state, '55', '35');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = submitDual(state, '55', '35');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.round).toBe(3);
    state = submitDual(state, '35', '55');
    expect(state.result?.qb).toBe(50);
    expect(state.result?.ql).toBe(45);
    expect(state.result?.profit).toBe(3275);
    expect(state.result?.kind).toBe('flipped');
  });

  it('ignores submissions outside the choose phase', () => {
    const state = submitDual(createInitialState(), '55', '35');
    const next = gameReducer(state, { type: 'SUBMIT' });
    expect(next.result).toEqual(state.result);
  });

  it('completes four rounds and reports the price-discrimination benchmark', () => {
    const rounds = [
      ['55', '35'],
      ['55', '35'],
      ['35', '55'],
      ['55', '35'],
    ] as const;
    let state = createInitialState();
    for (const [priceB, priceL] of rounds) {
      state = submitDual(state, priceB, priceL);
      expect(state.phase).toBe('reveal');
      state = gameReducer(state, { type: 'NEXT_ROUND' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(4);
    expect(state.totalProfit).toBe(13100);
    expect(state.pdTotal).toBe(13100);
  });

  it('resets to the initial state', () => {
    let state = submitDual(createInitialState(), '55', '35');
    state = gameReducer(state, { type: 'RESET' });
    expect(state).toEqual(createInitialState());
  });
});
