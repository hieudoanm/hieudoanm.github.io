import {
  MAX_QUANTITY,
  MC,
  MODES,
  QUIZ_SCENARIOS,
  TOTAL_QUIZ_ROUNDS,
} from './constants';
import {
  bestQ,
  effectiveIntercept,
  profitAt,
  quizBestQ,
  quizProfit,
  slopeAt,
} from './game';
import type { Mode, Phase, QuizResult } from './types';

export interface GameState {
  phase: Phase;
  mode: Mode;
  differentiation: number;
  quantity: number;
  entryProgress: number;
  quizRound: number;
  quizSelected: number | null;
  quizAnswered: boolean;
  quizResults: QuizResult[];
  quizScore: number;
  labBestProfit: number;
}

export type GameAction =
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'SET_DIFFERENTIATION'; value: number }
  | { type: 'SET_PRICE'; price: number }
  | { type: 'SET_QUANTITY'; quantity: number }
  | { type: 'SIMULATE_ENTRY' }
  | { type: 'START_QUIZ' }
  | { type: 'SELECT_QUIZ_OPTION'; q: number }
  | { type: 'CHECK_QUIZ' }
  | { type: 'NEXT_QUIZ' }
  | { type: 'RESET' };

const clampQ = (q: number): number =>
  Math.min(MAX_QUANTITY, Math.max(0, Math.round(q)));

const withLabBest = (state: GameState): GameState => {
  const profit = Math.round(
    profitAt(
      state.quantity,
      state.differentiation,
      state.entryProgress,
      state.mode
    )
  );
  if (profit <= state.labBestProfit) return state;
  return { ...state, labBestProfit: profit };
};

const quizScenario = (selected: number, round: number): QuizResult => {
  const scenario = QUIZ_SCENARIOS[round - 1];
  const correct = quizBestQ(scenario.a, scenario.b);
  return {
    round,
    chosen: selected,
    correct,
    correctChoice: selected === correct,
    profitAtChoice: Math.round(quizProfit(selected, scenario.a, scenario.b)),
    profitAtCorrect: Math.round(quizProfit(correct, scenario.a, scenario.b)),
  };
};

export const createInitialState = (): GameState => {
  const quantity = bestQ(50, 0, 'monopolistic');
  return {
    phase: 'lab',
    mode: 'monopolistic',
    differentiation: 50,
    quantity,
    entryProgress: 0,
    quizRound: 1,
    quizSelected: null,
    quizAnswered: false,
    quizResults: [],
    quizScore: 0,
    labBestProfit: Math.round(profitAt(quantity, 50, 0, 'monopolistic')),
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_MODE':
      if (state.phase !== 'lab' || state.mode === action.mode) return state;
      return withLabBest({ ...state, mode: action.mode, entryProgress: 0 });
    case 'SET_DIFFERENTIATION': {
      if (state.phase !== 'lab') return state;
      const value = Math.min(100, Math.max(0, Math.round(action.value)));
      if (value === state.differentiation) return state;
      return withLabBest({ ...state, differentiation: value });
    }
    case 'SET_PRICE': {
      if (state.phase !== 'lab' || state.mode === 'perfect') return state;
      const a = effectiveIntercept(
        state.differentiation,
        state.entryProgress,
        state.mode
      );
      const price = Math.min(a, Math.max(MC, action.price));
      const quantity = clampQ((a - price) / slopeAt(state.differentiation));
      return withLabBest({ ...state, quantity });
    }
    case 'SET_QUANTITY': {
      if (state.phase !== 'lab') return state;
      const quantity = clampQ(action.quantity);
      if (quantity === state.quantity) return state;
      return withLabBest({ ...state, quantity });
    }
    case 'SIMULATE_ENTRY':
      if (state.phase !== 'lab' || !MODES[state.mode].erodes) return state;
      return withLabBest({
        ...state,
        entryProgress: Math.min(1, state.entryProgress + 0.2),
      });
    case 'START_QUIZ':
      if (state.phase !== 'lab') return state;
      return {
        ...state,
        phase: 'quiz',
        quizRound: 1,
        quizSelected: null,
        quizAnswered: false,
        quizResults: [],
        quizScore: 0,
      };
    case 'SELECT_QUIZ_OPTION':
      if (state.phase !== 'quiz' || state.quizAnswered) return state;
      return { ...state, quizSelected: action.q };
    case 'CHECK_QUIZ': {
      if (
        state.phase !== 'quiz' ||
        state.quizAnswered ||
        state.quizSelected === null
      ) {
        return state;
      }
      const result = quizScenario(state.quizSelected, state.quizRound);
      return {
        ...state,
        quizAnswered: true,
        quizResults: [...state.quizResults, result],
        quizScore: result.correctChoice ? state.quizScore + 1 : state.quizScore,
      };
    }
    case 'NEXT_QUIZ': {
      if (state.phase !== 'quiz' || !state.quizAnswered) return state;
      if (state.quizRound >= TOTAL_QUIZ_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        quizRound: state.quizRound + 1,
        quizSelected: null,
        quizAnswered: false,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
