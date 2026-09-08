import {
  CHALLENGES,
  DEFAULT_COST,
  DEFAULT_R,
  DEFAULT_W0,
  DEFAULT_YEARS,
  TOTAL_CHALLENGES,
} from './constants';
import {
  annualWage,
  npv,
  optimalYears,
  pvCost,
  pvEarnings,
  scoreForChoice,
} from './game';
import type { Challenge, Mode, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  mode: Mode;
  round: number;
  r: number;
  costPerYear: number;
  w0: number;
  years: number;
  result: RoundResult | null;
  results: RoundResult[];
  score: number;
}

export type GameAction =
  | { type: 'SET_YEARS'; value: number }
  | { type: 'SET_R'; value: number }
  | { type: 'SET_COST'; value: number }
  | { type: 'SET_W0'; value: number }
  | { type: 'CHECK' }
  | { type: 'BACK_TO_CHOOSE' }
  | { type: 'START_CHALLENGE' }
  | { type: 'NEXT_CHALLENGE' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  mode: 'sandbox',
  round: 0,
  r: DEFAULT_R,
  costPerYear: DEFAULT_COST,
  w0: DEFAULT_W0,
  years: DEFAULT_YEARS,
  result: null,
  results: [],
  score: 0,
});

const readonlyParams = (state: GameState): boolean =>
  state.phase !== 'choose' || state.mode !== 'sandbox';

const buildResult = (state: GameState): RoundResult => {
  const optimal = optimalYears(state.w0, state.r, state.costPerYear);
  const wage = annualWage(state.years, state.w0);
  const earnings = pvEarnings(state.years, state.w0, state.r);
  const cost = pvCost(state.years, state.costPerYear);
  return {
    round: state.round,
    mode: state.mode,
    r: state.r,
    costPerYear: state.costPerYear,
    w0: state.w0,
    years: state.years,
    annualWage: wage,
    pvEarnings: earnings,
    pvCost: cost,
    npv: earnings - cost,
    optimalYears: optimal,
    optimalNpv: npv(optimal, state.w0, state.r, state.costPerYear),
    score:
      state.mode === 'challenge' ? scoreForChoice(state.years, optimal) : null,
  };
};

const applyChallenge = (
  state: GameState,
  challenge: Challenge,
  round: number
): GameState => ({
  ...state,
  phase: 'choose',
  mode: 'challenge',
  round,
  r: challenge.r,
  costPerYear: challenge.costPerYear,
  w0: challenge.w0,
  years: 0,
  result: null,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_YEARS':
      return { ...state, years: action.value };
    case 'SET_R':
      if (readonlyParams(state)) return state;
      return { ...state, r: action.value };
    case 'SET_COST':
      if (readonlyParams(state)) return state;
      return { ...state, costPerYear: action.value };
    case 'SET_W0':
      if (readonlyParams(state)) return state;
      return { ...state, w0: action.value };
    case 'CHECK': {
      if (state.phase !== 'choose') return state;
      const result = buildResult(state);
      const scored = state.mode === 'challenge';
      return {
        ...state,
        phase: 'reveal',
        result,
        results: scored ? [...state.results, result] : state.results,
      };
    }
    case 'BACK_TO_CHOOSE':
      if (state.phase !== 'reveal' || state.mode !== 'sandbox') return state;
      return { ...state, phase: 'choose', result: null };
    case 'START_CHALLENGE':
      if (state.phase !== 'reveal' || state.mode !== 'sandbox') return state;
      return applyChallenge(state, CHALLENGES[0], 1);
    case 'NEXT_CHALLENGE': {
      if (state.phase !== 'reveal' || state.mode !== 'challenge') return state;
      if (!state.result) return state;
      const score = state.score + (state.result.score ?? 0);
      if (state.round >= TOTAL_CHALLENGES) {
        return { ...state, phase: 'done', result: null, score };
      }
      return {
        ...applyChallenge(state, CHALLENGES[state.round], state.round + 1),
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
