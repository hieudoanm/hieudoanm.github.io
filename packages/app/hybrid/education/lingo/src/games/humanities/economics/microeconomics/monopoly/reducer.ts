import { MARGINAL_COST, TOTAL_ROUNDS } from './constants';
import { dwlAt, guidance, priceAt, profitAt } from './game';
import type { GamePhase, RoundResult } from './types';

export interface GameState {
  phase: GamePhase;
  round: number;
  result: RoundResult | null;
  results: RoundResult[];
  showComparison: boolean;
}

export type GameAction =
  | { type: 'SUBMIT_OUTPUT'; q: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'TOGGLE_COMPARISON' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  result: null,
  results: [],
  showComparison: false,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_OUTPUT': {
      if (state.phase !== 'choose') return state;
      const price = priceAt(action.q);
      const result: RoundResult = {
        round: state.round,
        q: action.q,
        price,
        tr: price * action.q,
        tc: MARGINAL_COST * action.q,
        profit: profitAt(action.q),
        dwl: dwlAt(action.q),
        guidance: guidance(action.q),
      };
      return { ...state, phase: 'reveal', result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results,
        result: null,
      };
    }
    case 'TOGGLE_COMPARISON': {
      if (state.phase !== 'done') return state;
      return { ...state, showComparison: !state.showComparison };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
