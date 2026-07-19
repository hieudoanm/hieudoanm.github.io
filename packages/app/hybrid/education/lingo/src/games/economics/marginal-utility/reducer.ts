import {
  DEFAULT_INCOME,
  DEFAULT_PA,
  DEFAULT_PC,
  SCENARIOS,
  TOTAL_ROUNDS,
} from './constants';
import { affordableNext, challengeResult, labResult } from './game';
import type { ChallengeResult, Good, LabResult, Mode, Phase } from './types';

export interface GameState {
  mode: Mode;
  phase: Phase;
  pa: number;
  pc: number;
  income: number;
  apples: number;
  cookies: number;
  result: LabResult | null;
  history: LabResult[];
  round: number;
  selected: number;
  challengeResult: ChallengeResult | null;
  challengeHistory: ChallengeResult[];
  totalCorrect: number;
}

export type GameAction =
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'SET_PRICE'; good: Good; value: number }
  | { type: 'SET_INCOME'; value: number }
  | { type: 'BUY'; good: Good }
  | { type: 'SELL'; good: Good }
  | { type: 'CHECK' }
  | { type: 'SET_OPTION'; index: number }
  | { type: 'SUBMIT_CHALLENGE' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  mode: 'lab',
  phase: 'choose',
  pa: DEFAULT_PA,
  pc: DEFAULT_PC,
  income: DEFAULT_INCOME,
  apples: 0,
  cookies: 0,
  result: null,
  history: [],
  round: 1,
  selected: -1,
  challengeResult: null,
  challengeHistory: [],
  totalCorrect: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_MODE':
      if (state.mode === action.mode) return state;
      if (action.mode === 'challenge') {
        return {
          ...state,
          mode: 'challenge',
          phase: 'choose',
          round: 1,
          selected: -1,
          challengeResult: null,
        };
      }
      return { ...state, mode: 'lab', phase: 'choose', result: null };
    case 'SET_PRICE': {
      if (state.mode !== 'lab') return state;
      const patch =
        action.good === 'apple' ? { pa: action.value } : { pc: action.value };
      return { ...state, ...patch, result: null };
    }
    case 'SET_INCOME':
      if (state.mode !== 'lab') return state;
      return { ...state, income: action.value, result: null };
    case 'BUY': {
      if (state.mode !== 'lab') return state;
      if (
        !affordableNext(
          action.good,
          state.apples,
          state.cookies,
          state.pa,
          state.pc,
          state.income
        )
      ) {
        return state;
      }
      const patch =
        action.good === 'apple'
          ? { apples: state.apples + 1 }
          : { cookies: state.cookies + 1 };
      return { ...state, ...patch, result: null };
    }
    case 'SELL': {
      if (state.mode !== 'lab') return state;
      if (action.good === 'apple' && state.apples === 0) return state;
      if (action.good === 'cookie' && state.cookies === 0) return state;
      const patch =
        action.good === 'apple'
          ? { apples: state.apples - 1 }
          : { cookies: state.cookies - 1 };
      return { ...state, ...patch, result: null };
    }
    case 'CHECK': {
      if (state.mode !== 'lab') return state;
      const result = labResult({
        round: state.history.length + 1,
        pa: state.pa,
        pc: state.pc,
        income: state.income,
        apples: state.apples,
        cookies: state.cookies,
      });
      return {
        ...state,
        result,
        history: [...state.history, result],
      };
    }
    case 'SET_OPTION': {
      if (state.mode !== 'challenge' || state.phase !== 'choose') return state;
      const optionCount = SCENARIOS[state.round - 1].options.length;
      if (action.index < 0 || action.index >= optionCount) return state;
      return { ...state, selected: action.index };
    }
    case 'SUBMIT_CHALLENGE': {
      if (
        state.mode !== 'challenge' ||
        state.phase !== 'choose' ||
        state.selected < 0
      ) {
        return state;
      }
      const scenario = SCENARIOS[state.round - 1];
      const result = challengeResult(scenario, state.round, state.selected);
      return {
        ...state,
        phase: 'reveal',
        challengeResult: result,
        challengeHistory: [...state.challengeHistory, result],
        totalCorrect: state.totalCorrect + (result.correct ? 1 : 0),
      };
    }
    case 'NEXT_ROUND': {
      if (
        state.mode !== 'challenge' ||
        state.phase !== 'reveal' ||
        !state.challengeResult
      ) {
        return state;
      }
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        selected: -1,
        challengeResult: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
