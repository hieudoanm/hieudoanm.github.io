import { RETURNS, START_WEALTH, TIPS, TOTAL_ROUNDS } from './constants';
import {
  applyReturn,
  buyAndHoldWealth,
  coinFlipWealth,
  tipStrategyWealth,
} from './game';
import type { Phase, Position, RoundResult, Summary } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  wealth: number;
  decisions: Position[];
  results: RoundResult[];
}

export type GameAction =
  | { type: 'SET_POSITION'; position: Position }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'play',
  round: 1,
  wealth: START_WEALTH,
  decisions: [],
  results: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_POSITION': {
      if (state.phase !== 'play') return state;
      return { ...state, decisions: [...state.decisions, action.position] };
    }
    case 'NEXT': {
      if (state.phase !== 'play') return state;
      if (state.decisions.length !== state.round) return state;
      const position = state.decisions[state.decisions.length - 1];
      const returnPct = RETURNS[state.round - 1];
      const wealthAfter =
        position === 'in' ? applyReturn(state.wealth, returnPct) : state.wealth;
      const result: RoundResult = {
        round: state.round,
        returnPct,
        tip: TIPS[state.round - 1],
        position,
        wealthAfter,
      };
      const results = [...state.results, result];
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          wealth: wealthAfter,
          results,
        };
      }
      return {
        ...state,
        phase: 'play',
        round: state.round + 1,
        wealth: wealthAfter,
        results,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};

export const buildSummary = (results: RoundResult[]): Summary => {
  const playerWealth =
    results.length > 0 ? results[results.length - 1].wealthAfter : START_WEALTH;
  return {
    playerWealth,
    buyAndHoldWealth: buyAndHoldWealth(),
    coinFlipWealth: coinFlipWealth(),
    tipStrategyWealth: tipStrategyWealth(),
    rounds: results,
  };
};
