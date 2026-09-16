import { nextPrize, revealGoat, updateTally } from './game';
import { TOTAL_TRIALS } from './constants';
import type { Door, Phase, Tally, TrialResult } from './types';

export interface GameState {
  phase: Phase;
  trial: number;
  prize: Door;
  picked: Door;
  revealed: Door;
  tally: Tally;
  results: TrialResult[];
  rand: () => number;
}

export type GameAction =
  | { type: 'TRIAL_START'; pick: Door }
  | { type: 'REVEAL_GOAT' }
  | { type: 'DECIDE'; switched: boolean }
  | { type: 'RESET' };

export const createInitialState = (
  rand: () => number = Math.random
): GameState => ({
  phase: 'pick',
  trial: 1,
  prize: 0,
  picked: 0,
  revealed: 0,
  tally: { switchWins: 0, stayWins: 0, total: 0 },
  results: [],
  rand,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'TRIAL_START': {
      if (state.phase !== 'pick') return state;
      return {
        ...state,
        phase: 'reveal',
        prize: nextPrize(state.rand),
        picked: action.pick,
        revealed: 0,
      };
    }
    case 'REVEAL_GOAT': {
      if (state.phase !== 'reveal') return state;
      return {
        ...state,
        phase: 'decide',
        revealed: revealGoat(state.prize, state.picked, state.rand),
      };
    }
    case 'DECIDE': {
      if (state.phase !== 'decide') return state;
      const switchWon = state.picked !== state.prize;
      const stayWon = state.picked === state.prize;
      const result: TrialResult = {
        trial: state.trial,
        prize: state.prize,
        picked: state.picked,
        revealed: state.revealed,
        stayed: !action.switched,
        switchWon,
        stayWon,
      };
      const tally = updateTally(state.tally, state.prize, state.picked);
      if (state.trial >= TOTAL_TRIALS) {
        return {
          ...state,
          phase: 'done',
          tally,
          results: [...state.results, result],
        };
      }
      return {
        ...state,
        phase: 'pick',
        trial: state.trial + 1,
        prize: 0,
        picked: 0,
        revealed: 0,
        tally,
        results: [...state.results, result],
      };
    }
    case 'RESET':
      return createInitialState(state.rand);
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
