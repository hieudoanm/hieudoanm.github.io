import { createInitialState, gameReducer } from '../reducer';
import { TOTAL_TRIALS } from '../constants';

const sequence = (values: number[]): (() => number) => {
  let index = 0;
  return () => values[index++ % values.length];
};

describe('bayesian reducer', () => {
  it('starts a trial with a pick and a random prize', () => {
    let state = createInitialState(sequence([0.1]));
    state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
    expect(state.phase).toBe('reveal');
    expect(state.prize).toBe(0);
    expect(state.picked).toBe(1);
  });

  it('reveals a goat and enters the decide phase', () => {
    let state = createInitialState(sequence([0.1, 0.9]));
    state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
    state = gameReducer(state, { type: 'REVEAL_GOAT' });
    expect(state.phase).toBe('decide');
    expect(state.revealed).toBe(2);
  });

  it('records both switch and stay outcomes on decide', () => {
    let state = createInitialState(sequence([0.1, 0.9]));
    state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
    state = gameReducer(state, { type: 'REVEAL_GOAT' });
    state = gameReducer(state, { type: 'DECIDE', switched: false });
    expect(state.results).toHaveLength(1);
    expect(state.results[0].switchWon).toBe(true);
    expect(state.results[0].stayWon).toBe(false);
    expect(state.results[0].stayed).toBe(true);
    expect(state.tally.switchWins).toBe(1);
    expect(state.tally.stayWins).toBe(0);
  });

  it('advances to the next trial after deciding', () => {
    let state = createInitialState(sequence([0.1, 0.9]));
    state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
    state = gameReducer(state, { type: 'REVEAL_GOAT' });
    state = gameReducer(state, { type: 'DECIDE', switched: true });
    expect(state.trial).toBe(2);
    expect(state.phase).toBe('pick');
    expect(state.picked).toBe(0);
    expect(state.revealed).toBe(0);
  });

  it('completes after 20 trials', () => {
    const draws: number[] = [];
    for (let i = 0; i < TOTAL_TRIALS; i++) {
      draws.push(0.1, 0.9);
    }
    let state = createInitialState(sequence(draws));
    for (let i = 0; i < TOTAL_TRIALS; i++) {
      state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
      state = gameReducer(state, { type: 'REVEAL_GOAT' });
      state = gameReducer(state, { type: 'DECIDE', switched: true });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_TRIALS);
    expect(state.tally.total).toBe(TOTAL_TRIALS);
  });

  it('ignores REVEAL_GOAT outside the reveal phase', () => {
    const state = createInitialState(sequence([0.1]));
    const next = gameReducer(state, { type: 'REVEAL_GOAT' });
    expect(next.phase).toBe('pick');
  });

  it('ignores DECIDE outside the decide phase', () => {
    const state = createInitialState(sequence([0.1]));
    const next = gameReducer(state, { type: 'DECIDE', switched: true });
    expect(next.phase).toBe('pick');
  });

  it('ignores TRIAL_START mid-trial', () => {
    let state = createInitialState(sequence([0.1]));
    state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
    const next = gameReducer(state, { type: 'TRIAL_START', pick: 2 });
    expect(next.picked).toBe(1);
  });

  it('resets to the initial state and keeps the injected entropy source', () => {
    let state = createInitialState(sequence([0.1, 0.9]));
    state = gameReducer(state, { type: 'TRIAL_START', pick: 1 });
    state = gameReducer(state, { type: 'REVEAL_GOAT' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('pick');
    expect(reset.trial).toBe(1);
    expect(reset.results).toEqual([]);
    expect(reset.rand).toBe(state.rand);
  });

  it('produces complementary tallies with the 2/3 vs 1/3 outcome', () => {
    const draws: number[] = [];
    for (let i = 0; i < TOTAL_TRIALS; i++) {
      draws.push(((i % 3) + 0.1) / 3, 0.9);
    }
    let state = createInitialState(sequence(draws));
    for (let i = 0; i < TOTAL_TRIALS; i++) {
      state = gameReducer(state, { type: 'TRIAL_START', pick: 0 });
      state = gameReducer(state, { type: 'REVEAL_GOAT' });
      state = gameReducer(state, { type: 'DECIDE', switched: true });
    }
    expect(state.phase).toBe('done');
    expect(state.tally.switchWins + state.tally.stayWins).toBe(TOTAL_TRIALS);
    expect(state.tally.switchWins).toBe(13);
    expect(state.tally.stayWins).toBe(7);
    state.results.forEach((result) => {
      expect(result.switchWon).toBe(result.picked !== result.prize);
      expect(result.stayWon).toBe(result.picked === result.prize);
    });
  });
});
