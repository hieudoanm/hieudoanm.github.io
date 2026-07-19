import { TOTAL_ROUNDS } from './constants';
import { phaseForRound, roundReport } from './game';
import type { GamePhase, GameState, RoundResult } from './types';

export type GameAction =
  | { type: 'PICK_OUTPUT'; q: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'pick',
  round: 1,
  q: null,
  result: null,
  results: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'PICK_OUTPUT': {
      if (state.phase !== 'pick') return state;
      const report = roundReport(state.round, action.q);
      const result: RoundResult = {
        round: state.round,
        phase: phaseForRound(state.round),
        q: action.q,
        ...report,
      };
      return { ...state, phase: 'result', q: action.q, result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const nextResults = [...state.results, state.result];
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results: nextResults };
      }
      return {
        ...state,
        phase: 'pick',
        round: state.round + 1,
        q: null,
        result: null,
        results: nextResults,
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
