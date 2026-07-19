import { COUNT } from './constants';
import {
  resolveCandidates,
  sampleSchedule,
  scheduleCandidates,
  totalProfit,
} from './game';
import type { Candidate, Phase, Wages } from './types';

export interface GameState {
  phase: Phase;
  w0: number;
  w1: number;
  candidates: Candidate[];
  totalProfit: number;
}

export type GameAction =
  | { type: 'SUBMIT_WAGES'; w0: number; w1: number }
  | { type: 'REVEAL_RESULTS' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  w0: 0,
  w1: 0,
  candidates: [],
  totalProfit: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_WAGES': {
      if (state.phase !== 'choose') return state;
      const wages: Wages = { w0: action.w0, w1: action.w1 };
      const types = scheduleCandidates(sampleSchedule(), COUNT);
      return {
        ...state,
        phase: 'reveal',
        w0: action.w0,
        w1: action.w1,
        candidates: resolveCandidates(types, wages),
        totalProfit: totalProfit(types, wages),
      };
    }
    case 'REVEAL_RESULTS':
      if (state.phase !== 'reveal') return state;
      return { ...state, phase: 'done' };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
