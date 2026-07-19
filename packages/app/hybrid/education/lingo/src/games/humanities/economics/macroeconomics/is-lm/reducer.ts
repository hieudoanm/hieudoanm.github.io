import {
  DEFAULT_A,
  DEFAULT_B,
  DEFAULT_C,
  DEFAULT_D,
  SCENARIOS,
  TOTAL_ROUNDS,
} from './constants';
import { invert, matches, pointsFor, shiftFor } from './game';
import type { Phase, Scenario, ScenarioResult, Shift } from './types';

export interface GameState {
  phase: Phase;
  a: number;
  c: number;
  b: number;
  d: number;
  round: number;
  current: Scenario | null;
  result: ScenarioResult | null;
  results: ScenarioResult[];
  score: number;
}

export type GameAction =
  | { type: 'SET_SLIDERS'; a: number; c: number }
  | { type: 'START_QUIZ' }
  | { type: 'SUBMIT_ANSWER'; isShift: Shift; lmShift: Shift }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'explore',
  a: DEFAULT_A,
  c: DEFAULT_C,
  b: DEFAULT_B,
  d: DEFAULT_D,
  round: 1,
  current: null,
  result: null,
  results: [],
  score: 0,
});

const buildResult = (
  state: GameState,
  scenario: Scenario,
  isShift: Shift,
  lmShift: Shift
): ScenarioResult => {
  const expectedIs = shiftFor(scenario.startA, scenario.targetA);
  const expectedLm = invert(shiftFor(scenario.startC, scenario.targetC));
  const isOk = matches(isShift, expectedIs);
  const lmOk = matches(lmShift, expectedLm);
  return {
    round: state.round,
    scenario,
    isShift,
    lmShift,
    expectedIs,
    expectedLm,
    correct: isOk && lmOk,
    points: pointsFor(isOk, lmOk),
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_SLIDERS': {
      if (state.phase !== 'explore') return state;
      return { ...state, a: action.a, c: action.c };
    }
    case 'START_QUIZ': {
      if (state.phase !== 'explore') return state;
      return { ...state, phase: 'quiz', round: 1, current: SCENARIOS[0] };
    }
    case 'SUBMIT_ANSWER': {
      if (state.phase !== 'quiz' || !state.current) return state;
      return {
        ...state,
        phase: 'reveal',
        result: buildResult(
          state,
          state.current,
          action.isShift,
          action.lmShift
        ),
      };
    }
    case 'NEXT_SCENARIO': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const results = [...state.results, state.result];
      const score = results.reduce((sum, r) => sum + r.points, 0);
      if (state.round >= TOTAL_ROUNDS || !SCENARIOS[state.round]) {
        return { ...state, phase: 'done', results, score, result: null };
      }
      return {
        ...state,
        phase: 'quiz',
        round: state.round + 1,
        current: SCENARIOS[state.round],
        results,
        score,
        result: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
