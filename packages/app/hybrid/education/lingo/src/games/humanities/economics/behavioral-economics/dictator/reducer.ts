import { BOTS, PLAYER_ID, TOTAL_ROUNDS } from './constants';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  playerGive: number | null;
  result: RoundResult | null;
  results: RoundResult[];
  totalGiven: number;
}

export type GameAction =
  | { type: 'SUBMIT_GIVE'; amount: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  playerGive: null,
  result: null,
  results: [],
  totalGiven: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_GIVE': {
      if (state.phase !== 'choose') return state;
      const gives: Record<string, number> = Object.fromEntries(
        BOTS.map((bot) => [bot.id, bot.give])
      );
      gives[PLAYER_ID] = action.amount;
      const result: RoundResult = {
        round: state.round,
        playerGive: action.amount,
        gives,
      };
      return {
        ...state,
        phase: 'reveal',
        playerGive: action.amount,
        result,
        totalGiven: state.totalGiven + action.amount,
      };
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
        playerGive: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
