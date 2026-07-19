import { randomThreshold, resolve } from './game';
import { POOL, TOTAL_ROUNDS } from './constants';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  keep: number | null;
  threshold: number;
  result: RoundResult | null;
  results: RoundResult[];
  totalKept: number;
  acceptedCount: number;
}

export type GameAction =
  | { type: 'SUBMIT_KEEP'; keep: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  keep: null,
  threshold: 0,
  result: null,
  results: [],
  totalKept: 0,
  acceptedCount: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_KEEP': {
      const threshold = randomThreshold();
      const { accepted, payoff } = resolve(action.keep, threshold);
      const result: RoundResult = {
        round: state.round,
        keep: action.keep,
        offer: POOL - action.keep,
        threshold,
        accepted,
        payoff,
      };
      return {
        ...state,
        phase: 'reveal',
        keep: action.keep,
        threshold,
        result,
      };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results,
          totalKept: results.reduce((sum, r) => sum + r.payoff, 0),
          acceptedCount: results.filter((r) => r.accepted).length,
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results,
        totalKept: results.reduce((sum, r) => sum + r.payoff, 0),
        acceptedCount: results.filter((r) => r.accepted).length,
        keep: null,
        threshold: 0,
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
