import {
  CONSUMPTION_MAX,
  CONSUMPTION_MIN,
  DEFAULT_COMPONENTS,
  GOVERNMENT_MAX,
  GOVERNMENT_MIN,
  INVESTMENT_MAX,
  INVESTMENT_MIN,
  NET_EXPORTS_MAX,
  NET_EXPORTS_MIN,
  PRICE_INDEX_DEFAULT,
  PRICE_INDEX_MAX,
  PRICE_INDEX_MIN,
  TARGETS,
  TOTAL_ROUNDS,
} from './constants';
import { computeGdp, withinTolerance } from './game';
import type { Components, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  components: Components;
  priceIndex: number;
  target: number;
  results: RoundResult[];
  lastChecked: RoundResult | null;
  solved: number;
}

export type GameAction =
  | { type: 'SET_COMPONENT'; key: keyof Components; value: number }
  | { type: 'SET_PRICE_INDEX'; value: number }
  | { type: 'START_QUIZ' }
  | { type: 'CHECK' }
  | { type: 'RESET' };

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

const RANGES: Record<keyof Components, { min: number; max: number }> = {
  consumption: { min: CONSUMPTION_MIN, max: CONSUMPTION_MAX },
  investment: { min: INVESTMENT_MIN, max: INVESTMENT_MAX },
  government: { min: GOVERNMENT_MIN, max: GOVERNMENT_MAX },
  netExports: { min: NET_EXPORTS_MIN, max: NET_EXPORTS_MAX },
};

export const createInitialState = (): GameState => ({
  phase: 'explore',
  round: 0,
  components: DEFAULT_COMPONENTS,
  priceIndex: PRICE_INDEX_DEFAULT,
  target: 0,
  results: [],
  lastChecked: null,
  solved: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_COMPONENT': {
      const range = RANGES[action.key];
      return {
        ...state,
        components: {
          ...state.components,
          [action.key]: clamp(action.value, range.min, range.max),
        },
      };
    }
    case 'SET_PRICE_INDEX':
      return {
        ...state,
        priceIndex: clamp(action.value, PRICE_INDEX_MIN, PRICE_INDEX_MAX),
      };
    case 'START_QUIZ': {
      if (state.phase !== 'explore') return state;
      return {
        ...state,
        phase: 'round',
        round: 1,
        target: TARGETS[0],
        lastChecked: null,
      };
    }
    case 'CHECK': {
      if (state.phase !== 'round') return state;
      const actual = computeGdp(state.components);
      const solved = withinTolerance(actual, state.target);
      const lastChecked: RoundResult = {
        round: state.round,
        target: state.target,
        actual,
        solved,
      };
      const results = [...state.results, lastChecked];
      const score = state.solved + (solved ? 1 : 0);
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'summary',
          results,
          solved: score,
          lastChecked,
        };
      }
      return {
        ...state,
        round: state.round + 1,
        target: TARGETS[state.round],
        results,
        solved: score,
        lastChecked,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
