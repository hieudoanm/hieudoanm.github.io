import { SCENARIOS } from './constants';
import { isValidAllocation } from './game';
import type { ChoiceId, Phase } from './types';

export interface GameState {
  phase: Phase;
  index: number;
  answers: ChoiceId[];
  revealed: boolean;
  allocations: Record<string, number>;
}

export type GameAction =
  | { type: 'PICK_CHOICE'; choice: ChoiceId }
  | { type: 'NEXT' }
  | { type: 'ALLOCATE'; allocations: Record<string, number> }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'scenario',
  index: 0,
  answers: [],
  revealed: false,
  allocations: {},
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'PICK_CHOICE': {
      if (state.phase !== 'scenario' || state.revealed) return state;
      const answers = [...state.answers];
      answers[state.index] = action.choice;
      return { ...state, answers, revealed: true };
    }
    case 'NEXT': {
      if (state.phase !== 'scenario' || !state.revealed) return state;
      if (state.index < SCENARIOS.length - 1) {
        return { ...state, index: state.index + 1, revealed: false };
      }
      return { ...state, phase: 'framer', revealed: false };
    }
    case 'ALLOCATE': {
      if (state.phase !== 'framer') return state;
      if (!isValidAllocation(action.allocations)) return state;
      return { ...state, phase: 'done', allocations: action.allocations };
    }
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
