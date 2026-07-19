import { createInitialState, gameReducer } from '../reducer';
import type { GameId } from '../types';

describe('basics reducer', () => {
  it('selects a preset game and enters the explore phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'stag-hunt',
    });
    expect(state.phase).toBe('explore');
    expect(state.game?.name).toBe('Stag Hunt');
    expect(state.rowIdx).toBeNull();
  });

  it('generates a random challenge game', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'challenge',
    });
    expect(state.game?.name).toBe('Random Challenge');
    expect(state.game?.payoffs).toHaveLength(2);
  });

  it('ignores a game selection for an unknown id', () => {
    const initial = createInitialState();
    const state = gameReducer(initial, {
      type: 'SELECT_GAME',
      gameId: 'unknown' as GameId,
    });
    expect(state.phase).toBe('setup');
  });

  it('ignores action picks before a game is selected', () => {
    const initial = createInitialState();
    const state = gameReducer(initial, { type: 'CHOOSE_ROW', index: 1 });
    expect(state.rowIdx).toBeNull();
    expect(state.review).toBeNull();
  });

  it('builds a review once both row and column are chosen', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    state = gameReducer(state, { type: 'CHOOSE_ROW', index: 1 });
    expect(state.review).toBeNull();
    state = gameReducer(state, { type: 'CHOOSE_COL', index: 1 });
    expect(state.phase).toBe('review');
    expect(state.review?.payoffA).toBe(1);
    expect(state.review?.isNash).toBe(true);
  });

  it('rebuilds the review when an action changes', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    state = gameReducer(state, { type: 'CHOOSE_ROW', index: 0 });
    state = gameReducer(state, { type: 'CHOOSE_COL', index: 0 });
    expect(state.review?.payoffA).toBe(3);
    state = gameReducer(state, { type: 'CHOOSE_ROW', index: 1 });
    expect(state.review?.payoffA).toBe(5);
    expect(state.review?.isNash).toBe(false);
  });

  it('protects against out-of-range indices', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    const before = gameReducer(state, { type: 'CHOOSE_ROW', index: 1 });
    const next = gameReducer(before, { type: 'CHOOSE_COL', index: 9 });
    expect(next.colIdx).toBeNull();
  });

  it('starts the quiz only from a selected game', () => {
    const noGame = gameReducer(createInitialState(), { type: 'START_QUIZ' });
    expect(noGame.phase).toBe('setup');
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    state = gameReducer(state, { type: 'START_QUIZ' });
    expect(state.phase).toBe('quiz');
  });

  it('scores a correct quiz click', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'QUIZ_CLICK',
      cell: { row: 1, col: 1 },
    });
    expect(state.quizCell).toEqual({ row: 1, col: 1 });
    expect(state.quizAttempts).toBe(1);
    expect(state.quizCorrect).toBe(1);
  });

  it('records wrong quiz clicks without scoring', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'QUIZ_CLICK',
      cell: { row: 0, col: 0 },
    });
    expect(state.quizAttempts).toBe(1);
    expect(state.quizCorrect).toBe(0);
  });

  it('accepts any click in a game without pure equilibria', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'matching-pennies',
    });
    state = gameReducer(state, { type: 'START_QUIZ' });
    state = gameReducer(state, {
      type: 'QUIZ_CLICK',
      cell: { row: 0, col: 1 },
    });
    expect(state.quizCorrect).toBe(1);
  });

  it('ignores quiz clicks outside the quiz phase', () => {
    const state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'pd',
    });
    const next = gameReducer(state, {
      type: 'QUIZ_CLICK',
      cell: { row: 1, col: 1 },
    });
    expect(next.quizCorrect).toBe(0);
    expect(next.quizCell).toBeNull();
  });

  it('resets to the initial state', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SELECT_GAME',
      gameId: 'harmony',
    });
    state = gameReducer(state, { type: 'START_QUIZ' });
    const reset = gameReducer(state, { type: 'RESET' });
    expect(reset.phase).toBe('setup');
    expect(reset.game).toBeNull();
    expect(reset.quizCorrect).toBe(0);
  });
});
