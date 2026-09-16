import { QUIZ_SCENARIOS, TOTAL_QUIZ_ROUNDS } from '../constants';
import { createInitialState, gameReducer, GameState } from '../reducer';
import { quizOptions } from '../game';

const startQuizState = (): GameState =>
  gameReducer(createInitialState(), { type: 'START_QUIZ' });

describe('labor reducer', () => {
  it('creates the default explore state with the baseline curve', () => {
    const state = createInitialState();
    expect(state.phase).toBe('explore');
    expect(state).toMatchObject({ a: 100, b: 2, c: 10, d: 1, wMin: 0 });
    expect(state.results).toEqual([]);
    expect(state.score).toBe(0);
  });

  it('updates curve parameters and clamps them to slider ranges', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_PARAM',
      key: 'a',
      value: 160,
    });
    expect(state.a).toBe(160);
    state = gameReducer(state, { type: 'SET_PARAM', key: 'b', value: 9 });
    expect(state.b).toBe(5);
    state = gameReducer(state, { type: 'SET_PARAM', key: 'c', value: -4 });
    expect(state.c).toBe(0);
  });

  it('sets the wage floor and clamps it to the choicest wage', () => {
    let state = gameReducer(createInitialState(), {
      type: 'SET_WAGE',
      value: 35,
    });
    expect(state.wMin).toBe(35);
    state = gameReducer(state, { type: 'SET_WAGE', value: 80 });
    expect(state.wMin).toBe(50);
    state = gameReducer(state, { type: 'SET_WAGE', value: -3 });
    expect(state.wMin).toBe(0);
  });

  it('ignores curve and wage edits outside the explore phase', () => {
    const state = gameReducer(startQuizState(), {
      type: 'SET_PARAM',
      key: 'a',
      value: 160,
    });
    expect(state.a).toBe(QUIZ_SCENARIOS[0].a);
    const next = gameReducer(state, { type: 'SET_WAGE', value: 10 });
    expect(next.wMin).toBe(0);
  });

  it('loads a preset scenario and resets the floor', () => {
    const state = gameReducer(createInitialState(), {
      type: 'LOAD_SCENARIO',
      id: 'strong-hiring',
    });
    expect(state).toMatchObject({ a: 140, b: 2, c: 10, d: 1, wMin: 0 });
  });

  it('ignores unknown presets', () => {
    const state = gameReducer(createInitialState(), {
      type: 'LOAD_SCENARIO',
      id: 'nope',
    });
    expect(state.a).toBe(100);
  });

  it('starts the quiz on the first scenario', () => {
    const state = startQuizState();
    expect(state.phase).toBe('quiz');
    expect(state.round).toBe(1);
    expect(state.scenario?.id).toBe('q1');
    expect(state.options).toHaveLength(4);
  });

  it('marks a round correct when the correct floor is chosen', () => {
    const initial = startQuizState();
    const state = gameReducer(initial, {
      type: 'ANSWER',
      index: initial.correctIndex,
    });
    expect(state.phase).toBe('reveal');
    expect(state.result?.correct).toBe(true);
    expect(state.result?.selected).toBe(initial.options[initial.correctIndex]);
    expect(state.result?.unemployment).toBe(0);
  });

  it('marks a round wrong when any other floor is chosen', () => {
    const initial = startQuizState();
    const wrongIndex = (initial.correctIndex + 1) % 4;
    const state = gameReducer(initial, { type: 'ANSWER', index: wrongIndex });
    expect(state.phase).toBe('reveal');
    expect(state.result?.correct).toBe(false);
    expect(state.result?.selected).toBe(initial.options[wrongIndex]);
  });

  it('ignores re-answers and out-of-range answers', () => {
    const initial = startQuizState();
    let state = gameReducer(initial, {
      type: 'ANSWER',
      index: initial.correctIndex,
    });
    const before = state;
    state = gameReducer(state, {
      type: 'ANSWER',
      index: (initial.correctIndex + 1) % 4,
    });
    expect(state.result).toBe(before.result);
    expect(gameReducer(before, { type: 'ANSWER', index: 9 })).toBe(before);
  });

  it('plays a full quiz and tallies a perfect score', () => {
    let state = startQuizState();
    for (let round = 1; round <= TOTAL_QUIZ_ROUNDS; round++) {
      expect(state.phase).toBe('quiz');
      expect(state.options).toHaveLength(4);
      state = gameReducer(state, {
        type: 'ANSWER',
        index: state.correctIndex,
      });
      expect(state.phase).toBe('reveal');
      state = gameReducer(state, { type: 'NEXT' });
    }
    expect(state.phase).toBe('done');
    expect(state.results).toHaveLength(TOTAL_QUIZ_ROUNDS);
    expect(state.score).toBe(TOTAL_QUIZ_ROUNDS);
    expect(state.results.map((r) => r.scenarioId)).toEqual(
      QUIZ_SCENARIOS.map((s) => s.id)
    );
  });

  it('ignores NEXT outside the reveal phase', () => {
    const state = gameReducer(startQuizState(), { type: 'NEXT' });
    expect(state.phase).toBe('quiz');
  });

  it('consistently regenerates the same options as game.quizOptions', () => {
    let state = startQuizState();
    for (let round = 1; round <= TOTAL_QUIZ_ROUNDS; round++) {
      expect(state.options).toEqual(
        quizOptions(state.scenario as (typeof QUIZ_SCENARIOS)[number]).options
      );
      state = gameReducer(state, {
        type: 'ANSWER',
        index: state.correctIndex,
      });
      state = gameReducer(state, { type: 'NEXT' });
    }
    expect(state.phase).toBe('done');
  });

  it('resets to the initial explore state', () => {
    let played = startQuizState();
    for (let round = 1; round <= TOTAL_QUIZ_ROUNDS; round++) {
      played = gameReducer(played, {
        type: 'ANSWER',
        index: played.correctIndex,
      });
      played = gameReducer(played, { type: 'NEXT' });
    }
    expect(played.phase).toBe('done');
    const state = gameReducer(played as GameState, { type: 'RESET' });
    expect(state.phase).toBe('explore');
    expect(state.round).toBe(1);
    expect(state.results).toEqual([]);
    expect(state.score).toBe(0);
  });
});
