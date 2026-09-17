import { PRICE_SEQUENCE, TOTAL_ROUNDS } from './constants';
import { longRunNote, minAVC, profitAt, profitMaxQ } from './game';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  price: number;
  chosenQ: number | null;
  result: RoundResult | null;
  results: RoundResult[];
  totalProfit: number;
  optimalCount: number;
}

export type GameAction =
  { type: 'SUBMIT_Q'; q: number } | { type: 'NEXT_ROUND' } | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  price: PRICE_SEQUENCE[0],
  chosenQ: null,
  result: null,
  results: [],
  totalProfit: 0,
  optimalCount: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_Q': {
      if (state.phase !== 'choose') return state;
      const optimalQ = profitMaxQ(state.price);
      const profit = profitAt(state.price, action.q);
      const operating = state.price >= minAVC();
      const optimal = action.q === optimalQ;
      const result: RoundResult = {
        round: state.round,
        price: state.price,
        chosenQ: action.q,
        optimalQ,
        profit,
        operating,
        longRun: longRunNote(state.price),
      };
      return {
        ...state,
        phase: 'reveal',
        chosenQ: action.q,
        result,
        results: [...state.results, result],
        totalProfit: state.totalProfit + profit,
        optimalCount: state.optimalCount + (optimal ? 1 : 0),
      };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      const nextPrice = PRICE_SEQUENCE[state.round];
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        price: nextPrice,
        chosenQ: null,
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
