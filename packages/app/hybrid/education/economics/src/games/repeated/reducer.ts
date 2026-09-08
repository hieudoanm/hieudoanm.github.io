import { nextMove, scoreRow } from './game';
import { TOTAL_ROUNDS } from './constants';
import type { Action, Phase, RoundEntry, StrategyId } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  opponent: StrategyId | null;
  history: RoundEntry[];
  totalScore: number;
  lastRound: RoundEntry | null;
}

export type GameAction =
  | { type: 'SELECT_OPPONENT'; strategyId: StrategyId }
  | { type: 'SUBMIT_ACTION'; action: Action }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'select',
  round: 1,
  opponent: null,
  history: [],
  totalScore: 0,
  lastRound: null,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_OPPONENT':
      if (state.phase !== 'select') return state;
      return { ...state, phase: 'play', opponent: action.strategyId };
    case 'SUBMIT_ACTION': {
      if (
        state.phase !== 'play' ||
        !state.opponent ||
        state.round > TOTAL_ROUNDS
      ) {
        return state;
      }
      const opponentAction = nextMove(state.opponent, state.history);
      const entry = scoreRow(
        action.action,
        opponentAction,
        state.round,
        state.totalScore
      );
      return {
        ...state,
        phase: 'reveal',
        history: [...state.history, entry],
        totalScore: state.totalScore + entry.payoff,
        lastRound: entry,
      };
    }
    case 'NEXT_ROUND':
      if (state.phase !== 'reveal' || !state.lastRound) return state;
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        phase: 'play',
        round: state.round + 1,
        lastRound: null,
      };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
