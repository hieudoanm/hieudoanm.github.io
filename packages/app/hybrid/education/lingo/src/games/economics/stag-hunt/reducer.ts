import { TOTAL_ROUNDS } from './constants';
import {
  payoffs,
  fellowHunter,
  hareSeeker,
  mimicMove,
  grudgerMove,
} from './game';
import type { Move, PartnerId, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  partnerId: PartnerId | null;
  playerMove: Move | null;
  partnerMove: Move | null;
  result: RoundResult | null;
  results: RoundResult[];
  playerTotal: number;
  partnerTotal: number;
  playerHistory: Move[];
}

export type GameAction =
  | { type: 'SELECT_PARTNER'; partnerId: PartnerId }
  | { type: 'MAKE_MOVE'; move: Move }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  partnerId: null,
  playerMove: null,
  partnerMove: null,
  result: null,
  results: [],
  playerTotal: 0,
  partnerTotal: 0,
  playerHistory: [],
});

const partnerResponse = (partnerId: PartnerId, history: Move[]): Move => {
  switch (partnerId) {
    case 'fellow-hunter':
      return fellowHunter();
    case 'hare-seeker':
      return hareSeeker();
    case 'mimic':
      return mimicMove(history);
    case 'grudger':
      return grudgerMove(history);
  }
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_PARTNER':
      return { ...state, partnerId: action.partnerId, phase: 'choose' };
    case 'MAKE_MOVE': {
      if (state.phase !== 'choose' || !state.partnerId) return state;
      const partnerMove = partnerResponse(state.partnerId, state.playerHistory);
      const [pp, op] = payoffs(action.move, partnerMove);
      const result: RoundResult = {
        round: state.round,
        playerMove: action.move,
        partnerMove,
        playerPayoff: pp,
        partnerPayoff: op,
      };
      return {
        ...state,
        phase: 'reveal',
        playerMove: action.move,
        partnerMove,
        result,
        playerHistory: [...state.playerHistory, action.move],
        playerTotal: state.playerTotal + pp,
        partnerTotal: state.partnerTotal + op,
      };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results: [...state.results, state.result],
          result: null,
          playerMove: null,
          partnerMove: null,
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results: [...state.results, state.result],
        result: null,
        playerMove: null,
        partnerMove: null,
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
