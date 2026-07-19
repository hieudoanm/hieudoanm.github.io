import { ROUNDS, TOTAL_ROUNDS } from './constants';
import {
  isRandomizedStudy,
  meanDiff,
  roundInfo,
  scoreRound,
  withinTolerance,
} from './game';
import type { Phase, Round, RoundResult, Study, StudyId } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  score: number;
  results: RoundResult[];
  chosenStudy: StudyId | null;
  estimate: number | null;
  result: RoundResult | null;
}

export type GameAction =
  | { type: 'SUBMIT'; studyId: StudyId; estimate: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  score: 0,
  results: [],
  chosenStudy: null,
  estimate: null,
  result: null,
});

const findStudy = (round: Round, id: StudyId): Study =>
  round.studies.find((s) => s.id === id)!;

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT': {
      if (state.phase !== 'choose') return state;
      const round = roundInfo(state.round);
      const study = findStudy(round, action.studyId);
      const result: RoundResult = {
        round: state.round,
        topic: round.topic,
        chosenStudy: action.studyId,
        estimate: action.estimate,
        diff: meanDiff(study),
        correctStudy: isRandomizedStudy(study),
        correctEstimate: withinTolerance(action.estimate, round),
        points: scoreRound(study, action.estimate, round),
        reveal: round.reveal,
      };
      return {
        ...state,
        phase: 'reveal',
        chosenStudy: action.studyId,
        estimate: action.estimate,
        result,
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || !state.result) return state;
      const results = [...state.results, state.result];
      const score = results.reduce((sum, r) => sum + r.points, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', score, results };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        score,
        results,
        chosenStudy: null,
        estimate: null,
        result: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
