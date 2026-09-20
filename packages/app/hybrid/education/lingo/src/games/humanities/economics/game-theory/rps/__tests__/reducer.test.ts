import { TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer, RpsState } from '../reducer';
import type { Move } from '../types';

jest.mock('../game', () => {
  const actual = jest.requireActual('../game');
  return {
    ...actual,
    botMove: (_id: unknown, _round: number, _history: Move[]) => 'scissors',
  };
});

const playAll = (move: Move): RpsState => {
  let state = gameReducer(createInitialState(), {
    type: 'PICK_BOT',
    botId: 'cycler',
  });
  for (let round = 1; round <= TOTAL_ROUNDS; round++) {
    state = gameReducer(state, { type: 'PLAY', move });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
  }
  return state;
};

describe('rps reducer', () => {
  it('creates an initial choose state', () => {
    const state = createInitialState();
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.botId).toBeNull();
    expect(state.score).toBe(0);
    expect(state.results).toEqual([]);
  });

  it('records the chosen bot', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PICK_BOT',
      botId: 'mirror',
    });
    expect(state.botId).toBe('mirror');
  });

  it('plays a round and reveals the outcome', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PICK_BOT',
      botId: 'cycler',
    });
    state = gameReducer(state, { type: 'PLAY', move: 'rock' });
    expect(state.phase).toBe('reveal');
    expect(state.mine).toBe('rock');
    expect(state.theirs).toBe('scissors');
    expect(state.outcome).toBe('win');
    expect(state.score).toBe(1);
    expect(state.results).toHaveLength(1);
  });

  it('ignores PLAY before a bot is chosen', () => {
    const state = gameReducer(createInitialState(), {
      type: 'PLAY',
      move: 'rock',
    });
    expect(state.results).toHaveLength(0);
  });

  it('advances to the next round', () => {
    let state = gameReducer(createInitialState(), {
      type: 'PICK_BOT',
      botId: 'cycler',
    });
    state = gameReducer(state, { type: 'PLAY', move: 'paper' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(2);
    expect(state.mine).toBeNull();
    expect(state.results).toHaveLength(1);
  });

  it('goes to done after the final round', () => {
    const state = playAll('rock');
    expect(state.phase).toBe('done');
    expect(state.round).toBe(TOTAL_ROUNDS);
    expect(state.results).toHaveLength(TOTAL_ROUNDS);
  });

  it('resets to the initial state', () => {
    const state = gameReducer(playAll('rock'), { type: 'RESET' });
    expect(state.phase).toBe('choose');
    expect(state.round).toBe(1);
    expect(state.score).toBe(0);
    expect(state.results).toEqual([]);
  });
});
