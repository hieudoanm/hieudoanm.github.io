import { createInitialState, gameReducer } from '../reducer';

const startWith = (strategyId: 'tit-for-tat' | 'grim-trigger') =>
  gameReducer(createInitialState(), { type: 'SELECT_OPPONENT', strategyId });

const playRounds = (
  state: ReturnType<typeof createInitialState>,
  action: 'C' | 'D',
  rounds: number
): ReturnType<typeof createInitialState> => {
  let next = state;
  for (let i = 0; i < rounds; i++) {
    next = gameReducer(next, { type: 'SUBMIT_ACTION', action });
    next = gameReducer(next, { type: 'NEXT_ROUND' });
  }
  return next;
};

describe('repeated game reducer', () => {
  it('starts in the select phase with an empty history', () => {
    const state = createInitialState();
    expect(state.phase).toBe('select');
    expect(state.round).toBe(1);
    expect(state.opponent).toBeNull();
    expect(state.history).toEqual([]);
    expect(state.totalScore).toBe(0);
  });

  it('selects an opponent and enters the play phase', () => {
    const state = startWith('tit-for-tat');
    expect(state.phase).toBe('play');
    expect(state.opponent).toBe('tit-for-tat');
  });

  it('ignores a second opponent selection while playing', () => {
    const first = startWith('tit-for-tat');
    const state = gameReducer(first, {
      type: 'SELECT_OPPONENT',
      strategyId: 'grim-trigger',
    });
    expect(state.opponent).toBe('tit-for-tat');
  });

  it('ignores submissions before an opponent is chosen', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SUBMIT_ACTION',
      action: 'C',
    });
    expect(state.phase).toBe('select');
    expect(state.history).toEqual([]);
  });

  it('resolves a round and reveals payoffs against tit for tat', () => {
    let state = startWith('tit-for-tat');
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'C' });
    expect(state.phase).toBe('reveal');
    expect(state.lastRound?.playerAction).toBe('C');
    expect(state.lastRound?.opponentAction).toBe('C');
    expect(state.lastRound?.payoff).toBe(3);
    expect(state.totalScore).toBe(3);
    expect(state.history).toHaveLength(1);
  });

  it('ignores resubmission during the reveal phase', () => {
    let state = startWith('tit-for-tat');
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'C' });
    const before = state;
    const next = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'D' });
    expect(next.lastRound).toBe(before.lastRound);
  });

  it('advances to the next round after a reveal', () => {
    let state = startWith('tit-for-tat');
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'C' });
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(state.phase).toBe('play');
    expect(state.round).toBe(2);
    expect(state.lastRound).toBeNull();
  });

  it('ignores NEXT_ROUND outside the reveal phase', () => {
    let state = startWith('tit-for-tat');
    const inPlay = gameReducer(state, { type: 'NEXT_ROUND' });
    expect(inPlay.phase).toBe('play');
    const inSelect = gameReducer(createInitialState(), { type: 'NEXT_ROUND' });
    expect(inSelect.phase).toBe('select');
  });

  it('scores 30 when cooperating every round against tit for tat', () => {
    const state = playRounds(startWith('tit-for-tat'), 'C', 10);
    expect(state.phase).toBe('done');
    expect(state.history).toHaveLength(10);
    expect(state.totalScore).toBe(30);
  });

  it('scores 5 + 9 = 14 when defecting every round against tit for tat', () => {
    const state = playRounds(startWith('tit-for-tat'), 'D', 10);
    expect(state.phase).toBe('done');
    expect(state.totalScore).toBe(14);
  });

  it('has the opponent retaliate the round after the player defects', () => {
    let state = startWith('tit-for-tat');
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'D' });
    expect(state.lastRound?.opponentAction).toBe('C');
    state = gameReducer(state, { type: 'NEXT_ROUND' });
    state = gameReducer(state, { type: 'SUBMIT_ACTION', action: 'C' });
    expect(state.lastRound?.opponentAction).toBe('D');
  });

  it('resets to the initial state', () => {
    const state = gameReducer(startWith('tit-for-tat'), { type: 'RESET' });
    expect(state.phase).toBe('select');
    expect(state.opponent).toBeNull();
    expect(state.history).toEqual([]);
  });
});
