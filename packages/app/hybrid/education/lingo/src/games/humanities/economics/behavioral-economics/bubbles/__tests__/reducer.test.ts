import { FUNDAMENTALS, STARTING_CASH, TOTAL_ROUNDS } from '../constants';
import { createInitialState, gameReducer } from '../reducer';
import type { GameState } from '../types';

const holdThroughRound = (state: GameState): GameState =>
  gameReducer(gameReducer(state, { type: 'SUBMIT_ACTION', action: 'hold' }), {
    type: 'NEXT_ROUND',
  });

const holdWholeEpisode = (initial: GameState): GameState => {
  let current = initial;
  for (let index = 0; index < TOTAL_ROUNDS; index++) {
    current = holdThroughRound(current);
  }
  return current;
};

describe('bubble reducer', () => {
  it('starts in the play phase with a full portfolio', () => {
    const state = createInitialState();
    expect(state.phase).toBe('play');
    expect(state.episode).toBe(1);
    expect(state.round).toBe(1);
    expect(state.fundamental).toBe(FUNDAMENTALS[0]);
    expect(state.cash).toBe(STARTING_CASH);
    expect(state.units).toBe(0);
    expect(state.avgCost).toBe(0);
    expect(state.realized).toBe(0);
    expect(state.lastAction).toBeNull();
    expect(state.episodeScores).toEqual([]);
  });

  it('records an action and moves to the outcome phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'buy' });
    expect(state.phase).toBe('outcome');
    expect(state.lastAction).toBe('buy');
    expect(state.cash).toBe(STARTING_CASH - 33);
    expect(state.units).toBe(1);
  });

  it('advances to the next round after the outcome', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'hold' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('play');
    expect(state.round).toBe(2);
    expect(state.lastAction).toBeNull();
  });

  it('ignores submissions outside the play phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'buy' });
    const before = state;
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'sell' });
    expect(state).toBe(before);
  });

  it('ignores round advances outside the outcome phase', () => {
    let state = createInitialState();
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.round).toBe(1);
  });

  it('scores an episode and offers the next one', () => {
    const state = holdWholeEpisode(createInitialState());
    expect(state.phase).toBe('episode');
    expect(state.episodeScores).toEqual([STARTING_CASH]);
  });

  it('resets the portfolio for the next episode', () => {
    const held = holdWholeEpisode(createInitialState());
    const state = gameReducer(held, { type: 'NEXT_EPISODE' });
    expect(state.phase).toBe('play');
    expect(state.episode).toBe(2);
    expect(state.fundamental).toBe(FUNDAMENTALS[1]);
    expect(state.cash).toBe(STARTING_CASH);
    expect(state.units).toBe(0);
    expect(state.episodeScores).toEqual([STARTING_CASH]);
  });

  it('completes the game after the final episode', () => {
    let state = gameReducer(holdWholeEpisode(createInitialState()), {
      type: 'NEXT_EPISODE',
    });
    state = holdWholeEpisode(state);
    expect(state.phase).toBe('done');
    expect(state.episodeScores).toEqual([STARTING_CASH, STARTING_CASH]);
  });

  it('ignores episode advances outside the episode phase', () => {
    expect(
      gameReducer(createInitialState(), { type: 'NEXT_EPISODE' }).episode
    ).toBe(1);
  });

  it('resets to the initial state', () => {
    let state = gameReducer(holdWholeEpisode(createInitialState()), {
      type: 'NEXT_EPISODE',
    });
    state = holdWholeEpisode(state);
    const next = gameReducer(state, { type: 'RESET' });
    expect(next.phase).toBe('play');
    expect(next.episode).toBe(1);
    expect(next.round).toBe(1);
    expect(next.episodeScores).toEqual([]);
  });
});
