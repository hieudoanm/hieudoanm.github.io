import {
  CURVE_SCENARIOS,
  DEFAULT_CURVE,
  QUIZ_SCENARIOS,
  TOTAL_QUIZ_ROUNDS,
} from './constants';
import { CURVE_RANGE } from './constants';
import { deficitAt, employmentAt, quizOptions, unemploymentAt } from './game';
import type { CurveKey, Phase, QuizRoundResult, QuizScenario } from './types';

export interface GameState {
  phase: Phase;
  a: number;
  b: number;
  c: number;
  d: number;
  wMin: number;
  round: number;
  quizIndex: number;
  scenario: QuizScenario | null;
  options: number[];
  correctIndex: number;
  selectedIndex: number | null;
  result: QuizRoundResult | null;
  results: QuizRoundResult[];
  score: number;
}

export type GameAction =
  | { type: 'SET_PARAM'; key: CurveKey; value: number }
  | { type: 'SET_WAGE'; value: number }
  | { type: 'LOAD_SCENARIO'; id: string }
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER'; index: number }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'explore',
  a: DEFAULT_CURVE.a,
  b: DEFAULT_CURVE.b,
  c: DEFAULT_CURVE.c,
  d: DEFAULT_CURVE.d,
  wMin: 0,
  round: 1,
  quizIndex: 0,
  scenario: null,
  options: [],
  correctIndex: 0,
  selectedIndex: null,
  result: null,
  results: [],
  score: 0,
});

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const maxWage = (a: number, b: number): number =>
  Math.max(0, Math.floor(b === 0 ? 0 : a / b));

const withParam = (
  state: GameState,
  key: CurveKey,
  value: number
): GameState => {
  const range = CURVE_RANGE[key];
  const next = clamp(value, range.min, range.max);
  const curve = { a: state.a, b: state.b, c: state.c, d: state.d };
  curve[key] = next;
  return {
    ...state,
    ...curve,
    wMin: Math.min(state.wMin, maxWage(curve.a, curve.b)),
  };
};

const startQuiz = (): GameState => {
  const first = QUIZ_SCENARIOS[0];
  const frame = quizOptions(first);
  return {
    ...createInitialState(),
    phase: 'quiz',
    scenario: first,
    a: first.a,
    b: first.b,
    c: first.c,
    d: first.d,
    options: frame.options,
    correctIndex: frame.correctIndex,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_PARAM':
      if (state.phase !== 'explore') return state;
      return withParam(state, action.key, action.value);
    case 'SET_WAGE':
      if (state.phase !== 'explore') return state;
      return {
        ...state,
        wMin: clamp(action.value, 0, maxWage(state.a, state.b)),
      };
    case 'LOAD_SCENARIO': {
      if (state.phase !== 'explore') return state;
      const preset = CURVE_SCENARIOS.find((c) => c.id === action.id);
      if (!preset) return state;
      return {
        ...state,
        a: preset.a,
        b: preset.b,
        c: preset.c,
        d: preset.d,
        wMin: 0,
      };
    }
    case 'START_QUIZ':
      if (state.phase !== 'explore') return state;
      return startQuiz();
    case 'ANSWER': {
      if (state.phase !== 'quiz' || state.selectedIndex !== null) return state;
      if (action.index < 0 || action.index >= state.options.length)
        return state;
      const scenario = state.scenario;
      if (!scenario) return state;
      const curve = { a: state.a, b: state.b, c: state.c, d: state.d };
      const wage = state.options[action.index];
      const result: QuizRoundResult = {
        round: state.round,
        scenarioId: scenario.id,
        correct: action.index === state.correctIndex,
        selected: wage,
        correctWage: state.options[state.correctIndex],
        employment: employmentAt(wage, curve),
        unemployment: unemploymentAt(wage, curve),
        deficit: deficitAt(wage, curve),
      };
      return { ...state, phase: 'reveal', selectedIndex: action.index, result };
    }
    case 'NEXT': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const results = [...state.results, state.result];
      const score = state.score + (state.result.correct ? 1 : 0);
      if (state.round >= TOTAL_QUIZ_ROUNDS) {
        return { ...state, phase: 'done', results, score };
      }
      const next = QUIZ_SCENARIOS[state.quizIndex + 1];
      const frame = quizOptions(next);
      return {
        ...state,
        phase: 'quiz',
        round: state.round + 1,
        quizIndex: state.quizIndex + 1,
        scenario: next,
        a: next.a,
        b: next.b,
        c: next.c,
        d: next.d,
        wMin: 0,
        options: frame.options,
        correctIndex: frame.correctIndex,
        selectedIndex: null,
        result: null,
        results,
        score,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
