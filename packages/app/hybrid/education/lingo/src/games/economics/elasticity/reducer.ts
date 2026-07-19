import { EPSILONS, MAX_PRICE, MIN_PRICE, TOTAL_ROUNDS } from './constants';
import { makeTrial } from './game';
import type { Phase, RoundState, Trial } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  epsilon: number;
  trials: Trial[];
  rounds: RoundState[];
  bestPrice: number;
  bestRevenue: number;
}

export type GameAction =
  | { type: 'SUBMIT_PRICE'; price: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  epsilon: EPSILONS[0],
  trials: [],
  rounds: [],
  bestPrice: 0,
  bestRevenue: 0,
});

const buildRoundState = (
  round: number,
  epsilon: number,
  trials: Trial[]
): RoundState => {
  const best = trials.reduce(
    (acc, t) => (t.revenue > acc.revenue ? t : acc),
    trials[0]
  );
  return {
    round,
    epsilon,
    trials,
    bestRevenue: best.revenue,
    bestPrice: best.price,
    done: true,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_PRICE': {
      if (state.phase !== 'choose') return state;
      const { price } = action;
      if (!Number.isFinite(price)) return state;
      if (price < MIN_PRICE || price > MAX_PRICE) return state;
      if (state.trials.some((t) => t.price === price)) return state;
      const trial = makeTrial(price, state.epsilon);
      const trials = [...state.trials, trial];
      const best = trials.reduce(
        (acc, t) => (t.revenue > acc.revenue ? t : acc),
        trials[0]
      );
      return {
        ...state,
        trials,
        bestPrice: best.price,
        bestRevenue: best.revenue,
      };
    }
    case 'NEXT_ROUND': {
      if (state.trials.length === 0) return state;
      const roundState = buildRoundState(
        state.round,
        state.epsilon,
        state.trials
      );
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'reveal',
          rounds: [...state.rounds, roundState],
        };
      }
      const nextEpsilon = EPSILONS[state.round];
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        epsilon: nextEpsilon,
        trials: [],
        bestPrice: 0,
        bestRevenue: 0,
        rounds: [...state.rounds, roundState],
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
