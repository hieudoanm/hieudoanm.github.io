import { MAX_TRIALS, MIN_FINISH_TRIALS } from './constants';
import { bestTrial, offeredGoods, offeredLemons, poolStats } from './game';
import type { Phase, Trial } from './types';

export interface GameState {
  phase: Phase;
  trials: Trial[];
  best: Trial | null;
}

export type GameAction =
  | { type: 'SUBMIT_PRICE'; price: number }
  | { type: 'FINISH' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'playing',
  trials: [],
  best: null,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_PRICE': {
      if (state.phase !== 'playing') return state;
      if (state.trials.length >= MAX_TRIALS) return state;
      const stats = poolStats(action.price);
      const trial: Trial = {
        id: state.trials.length + 1,
        price: action.price,
        goodsOffered: offeredGoods(action.price),
        lemonsOffered: offeredLemons(action.price),
        expectedValue: stats.expectedValue,
        expectedProfit: stats.expectedProfit,
        verdict: stats.verdict,
      };
      const trials = [...state.trials, trial];
      return { ...state, trials, best: bestTrial(trials) };
    }
    case 'FINISH':
      if (state.phase !== 'playing') return state;
      if (state.trials.length < MIN_FINISH_TRIALS) return state;
      return { ...state, phase: 'done' };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
