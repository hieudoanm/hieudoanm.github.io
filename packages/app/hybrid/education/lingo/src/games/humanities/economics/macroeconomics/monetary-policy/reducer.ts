import {
  RATE_STEP,
  SCENARIOS,
  TOTAL_ROUNDS,
  TRADEOFF_START,
} from './constants';
import { adjustTradeoff, makeResult, round1, tradeoffDistance } from './game';
import type { Phase, RoundResult, TradeoffState } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  result: RoundResult | null;
  history: RoundResult[];
  score: number;
  tradeoff: TradeoffState;
  tradeoffDistance: number;
}

export type GameAction =
  | { type: 'CHECK_RATE'; rate: number }
  | { type: 'NEXT' }
  | { type: 'ADJUST_RATE'; delta: number }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'setting',
  round: 1,
  result: null,
  history: [],
  score: 0,
  tradeoff: TRADEOFF_START,
  tradeoffDistance: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'CHECK_RATE': {
      if (state.phase !== 'setting') return state;
      if (!Number.isFinite(action.rate)) return state;
      const scenario = SCENARIOS[state.round - 1];
      const result = makeResult(state.round, scenario, action.rate);
      return {
        ...state,
        phase: 'reveal',
        result,
        score: round1(state.score + result.deviation),
      };
    }
    case 'NEXT': {
      if (state.phase === 'reveal' && state.result) {
        const history = [...state.history, state.result];
        if (state.round < TOTAL_ROUNDS) {
          return {
            ...state,
            phase: 'setting',
            round: state.round + 1,
            result: null,
            history,
          };
        }
        return {
          ...state,
          phase: 'tradeoff',
          result: null,
          history,
          tradeoff: TRADEOFF_START,
        };
      }
      if (state.phase === 'tradeoff') {
        const distance = tradeoffDistance(state.tradeoff);
        return {
          ...state,
          phase: 'done',
          tradeoffDistance: distance,
          score: round1(state.score + distance),
        };
      }
      return state;
    }
    case 'ADJUST_RATE': {
      if (state.phase !== 'tradeoff') return state;
      if (action.delta !== RATE_STEP && action.delta !== -RATE_STEP)
        return state;
      return {
        ...state,
        tradeoff: adjustTradeoff(state.tradeoff, action.delta),
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
