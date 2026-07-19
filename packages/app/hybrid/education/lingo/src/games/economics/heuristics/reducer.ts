import { ROUNDS, TOTAL_ROUNDS } from './constants';
import { absError, scoreConjunction, scoreRound } from './game';
import type { Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  roundIndex: number;
  guessA: number | null;
  guessB: number | null;
  result: RoundResult | null;
  results: RoundResult[];
  totalPoints: number;
}

export type GameAction =
  | { type: 'SUBMIT_GUESS'; guess: number }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'answer',
  roundIndex: 0,
  guessA: null,
  guessB: null,
  result: null,
  results: [],
  totalPoints: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_GUESS': {
      const item = ROUNDS[state.roundIndex];
      if (!item || state.phase !== 'answer' || !Number.isFinite(action.guess)) {
        return state;
      }
      if (item.kind !== 'representativeness') {
        const result: RoundResult = {
          roundId: item.id,
          guess: action.guess,
          error: absError(action.guess, item.trueAnswer),
          points: scoreRound(action.guess, item.trueAnswer),
        };
        return {
          ...state,
          phase: 'reveal',
          guessA: action.guess,
          result,
          totalPoints: state.totalPoints + result.points,
        };
      }
      if (state.guessA === null) return { ...state, guessA: action.guess };
      if (state.guessB !== null) return state;
      const base = state.guessA;
      const overlap = action.guess;
      const points = scoreConjunction(base, overlap);
      const result: RoundResult = {
        roundId: item.id,
        guess: base,
        conjunction: { base, overlap, adhered: points === 2 },
        error: absError(base, item.trueAnswer),
        points,
      };
      return {
        ...state,
        phase: 'reveal',
        guessB: overlap,
        result,
        totalPoints: state.totalPoints + points,
      };
    }
    case 'NEXT': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      if (state.roundIndex + 1 >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results };
      }
      return {
        ...state,
        phase: 'answer',
        roundIndex: state.roundIndex + 1,
        guessA: null,
        guessB: null,
        result: null,
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
