import { GROWTH, TOTAL_ROUNDS } from './constants';
import { peakIndex, phaseFor, scorePrediction, troughIndex } from './game';
import type {
  ExpansionCategory,
  HistoryRow,
  Phase,
  RoundResult,
} from './types';

export interface GameState {
  phase: Phase;
  round: number;
  results: RoundResult[];
  totalScore: number;
}

export type GameAction =
  | {
      type: 'SUBMIT_PREDICTION';
      prediction: number | null;
      category: ExpansionCategory | null;
    }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'predict',
  round: 2,
  results: [],
  totalScore: 0,
});

export const historyFor = (shown: number): HistoryRow[] =>
  GROWTH.slice(0, shown).map((actual, index) => ({
    round: index + 1,
    actual,
    phase: phaseFor(index === 0 ? actual : GROWTH[index - 1], actual),
    peak: index === peakIndex(GROWTH),
    trough: index === troughIndex(GROWTH),
  }));

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_PREDICTION': {
      if (state.phase !== 'predict') return state;
      const currentIndex = state.round - 1;
      const actual = GROWTH[currentIndex];
      const prev = GROWTH[currentIndex - 1];
      const phase = phaseFor(prev, actual);
      const numeric = action.prediction !== null ? action.prediction : null;
      const score = numeric !== null ? scorePrediction(numeric, actual) : 0;
      const result: RoundResult = {
        round: state.round,
        actual,
        predicted: numeric,
        category: action.category,
        phase,
        score,
      };
      return { ...state, phase: 'reveal', results: [...state.results, result] };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal') return state;
      const last = state.results[state.results.length - 1];
      const totalScore = state.totalScore + last.score;
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', totalScore };
      }
      return {
        ...state,
        phase: 'predict',
        round: state.round + 1,
        totalScore,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
