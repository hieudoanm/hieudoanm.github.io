import { CHALLENGES, DEFAULT_SANDBOX, TOTAL_ROUNDS } from './constants';
import type { Phase, SandboxParams } from './types';
import { calcSandbox } from './game';

export interface GameState {
  phase: Phase;
  round: number;
  score: number;
  challengeIndex: number;
  selected: 'A' | 'B' | null;
  sandbox: SandboxParams;
}

export type GameAction =
  | { type: 'UPDATE_SANDBOX'; params: Partial<SandboxParams> }
  | { type: 'START_CHALLENGES' }
  | { type: 'PICK'; answer: 'A' | 'B' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'sandbox',
  round: 1,
  score: 0,
  challengeIndex: 0,
  selected: null,
  sandbox: { ...DEFAULT_SANDBOX },
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'UPDATE_SANDBOX':
      return {
        ...state,
        sandbox: { ...state.sandbox, ...action.params },
      };
    case 'START_CHALLENGES':
      return {
        ...state,
        phase: 'challenge',
        round: 1,
        score: 0,
        challengeIndex: 0,
        selected: null,
      };
    case 'PICK': {
      if (state.phase !== 'challenge' || state.selected) return state;
      const challenge = CHALLENGES[state.challengeIndex];
      const correct = action.answer === challenge.correctAnswer;
      return {
        ...state,
        selected: action.answer,
        score: state.score + (correct ? 1 : 0),
      };
    }
    case 'NEXT_ROUND': {
      if (!state.selected) return state;
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        phase: 'challenge',
        round: state.round + 1,
        challengeIndex: state.challengeIndex + 1,
        selected: null,
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
