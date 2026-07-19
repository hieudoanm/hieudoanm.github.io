import { buildRoundResult, isLossDraw } from './game';
import { TOTAL_ROUNDS } from './constants';
import type { Contract, Effort, GameState, Phase, RoundResult } from './types';

export const createInitialState = (): GameState => ({
  phase: 'contract',
  round: 1,
  totalWealth: 0,
  selectedContract: null,
  selectedEffort: null,
  roundResult: null,
  roundResults: [],
});

export type GameAction =
  | { type: 'SELECT_CONTRACT'; contract: Contract }
  | { type: 'SELECT_EFFORT'; effort: Effort }
  | { type: 'SUBMIT'; rand?: () => number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_CONTRACT':
      if (state.phase !== 'contract') return state;
      return { ...state, selectedContract: action.contract, phase: 'effort' };

    case 'SELECT_EFFORT':
      if (state.phase !== 'effort') return state;
      return { ...state, selectedEffort: action.effort };

    case 'SUBMIT': {
      if (state.phase !== 'effort') return state;
      if (!state.selectedContract || !state.selectedEffort) return state;
      const rand = action.rand ?? Math.random;
      const loss = isLossDraw(state.selectedEffort === 'low' ? 0.3 : 0.1, rand);
      const roundResult = buildRoundResult(
        state.round,
        state.selectedContract,
        state.selectedEffort,
        loss
      );
      return {
        ...state,
        phase: 'reveal',
        roundResult,
        totalWealth: state.totalWealth + roundResult.netWealth,
      };
    }

    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal') return state;
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          roundResults: [
            ...state.roundResults,
            state.roundResult as RoundResult,
          ],
        };
      }
      return {
        ...state,
        phase: 'contract',
        round: state.round + 1,
        roundResults: [...state.roundResults, state.roundResult as RoundResult],
        selectedContract: null,
        selectedEffort: null,
        roundResult: null,
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
