import { pickStrategy } from './game';
import { Move, Phase, Round, Strategy } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  playerMove: Move | null;
  opponentMove: Move | null;
  playerScore: number;
  opponentScore: number;
  history: Round[];
  strategy: Strategy;
  revealStrategy: boolean;
}

export type GameAction =
  | {
      type: 'SUBMIT_MOVE';
      playerMove: Move;
      opponentMove: Move;
      pAdd: number;
      oAdd: number;
    }
  | { type: 'NEXT_ROUND'; totalRounds: number }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  playerMove: null,
  opponentMove: null,
  playerScore: 0,
  opponentScore: 0,
  history: [],
  strategy: pickStrategy(),
  revealStrategy: false,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_MOVE':
      return {
        ...state,
        phase: 'reveal',
        playerMove: action.playerMove,
        opponentMove: action.opponentMove,
        playerScore: state.playerScore + action.pAdd,
        opponentScore: state.opponentScore + action.oAdd,
        history: [
          ...state.history,
          {
            round: state.round,
            player: action.playerMove,
            opponent: action.opponentMove,
            pScore: action.pAdd,
            oScore: action.oAdd,
          },
        ],
      };
    case 'NEXT_ROUND':
      if (state.round >= action.totalRounds) {
        return { ...state, phase: 'done', revealStrategy: true };
      }
      return {
        ...state,
        phase: 'choose' as const,
        round: state.round + 1,
        playerMove: null,
        opponentMove: null,
      };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
