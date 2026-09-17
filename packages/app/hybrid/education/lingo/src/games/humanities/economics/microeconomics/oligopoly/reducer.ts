import { bestReply, price, profit } from './game';
import { MAX_Q, TOTAL_ROUNDS } from './constants';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  qA: number | null;
  qB: number;
  pPrice: number;
  result: RoundResult | null;
  results: RoundResult[];
  totalProfitA: number;
  totalProfitB: number;
}

export type GameAction =
  { type: 'SUBMIT_Q'; qA: number } | { type: 'NEXT_ROUND' } | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  qA: null,
  qB: 0,
  pPrice: 0,
  result: null,
  results: [],
  totalProfitA: 0,
  totalProfitB: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_Q': {
      if (state.phase !== 'choose') return state;
      const q = Math.min(MAX_Q, Math.max(0, Math.round(action.qA)));
      const qB = bestReply(q);
      const p = price(q, qB);
      const result: RoundResult = {
        round: state.round,
        qA: q,
        qB,
        price: p,
        profitA: profit(q, p),
        profitB: profit(qB, p),
      };
      return { ...state, phase: 'reveal', qA: q, qB, pPrice: p, result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      const totalProfitA = results.reduce((sum, r) => sum + r.profitA, 0);
      const totalProfitB = results.reduce((sum, r) => sum + r.profitB, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results,
          totalProfitA,
          totalProfitB,
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        qA: null,
        qB: 0,
        pPrice: 0,
        result: null,
        results,
        totalProfitA,
        totalProfitB,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
