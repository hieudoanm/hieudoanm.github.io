import { buildAnnuityRound, buildCompareRound, buildNpvRound } from './game';
import {
  ANNUITY_PAYMENT,
  ANNUITY_RATE,
  ANNUITY_YEARS,
  ANNUITY_LUMP_SUM,
  COMPARE_ROUNDS,
  PROJECT_CASH_FLOWS,
  PROJECT_RATE,
} from './constants';
import type {
  AnnuityRound,
  CompareRound,
  CompoundingFrequency,
  NpvRound,
} from './types';

export interface GameState {
  phase:
    | 'calculator'
    | 'compare'
    | 'compare-a'
    | 'compare-b'
    | 'annuity'
    | 'npv'
    | 'results';
  principal: number;
  rate: number;
  years: number;
  compounding: CompoundingFrequency;
  compareRound: number;
  compareData: CompareRound[];
  annuityData: AnnuityRound;
  npvData: NpvRound;
  score: number;
}

export type GameAction =
  | { type: 'SET_PRINCIPAL'; value: number }
  | { type: 'SET_RATE'; value: number }
  | { type: 'SET_YEARS'; value: number }
  | { type: 'SET_COMPOUNDING'; value: CompoundingFrequency }
  | { type: 'CHECK' }
  | { type: 'SELECT_OFFER'; offer: string }
  | { type: 'SELECT_ANNUITY'; answer: string }
  | { type: 'SELECT_NPV'; answer: string }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'calculator',
  principal: 1000,
  rate: 5,
  years: 10,
  compounding: 12,
  compareRound: 0,
  compareData: [],
  annuityData: {
    round: 0,
    payment: ANNUITY_PAYMENT,
    years: ANNUITY_YEARS,
    rate: ANNUITY_RATE,
    annuityPV: 0,
    lumpSum: ANNUITY_LUMP_SUM,
    answer: null,
    correctChoice: false,
  },
  npvData: {
    cashFlows: PROJECT_CASH_FLOWS,
    rate: PROJECT_RATE,
    npv: 0,
    answer: null,
    correctChoice: false,
  },
  score: 0,
});

const totalCorrect = (data: CompareRound[]): number =>
  data.reduce((sum, r) => sum + (r.correctChoice ? 1 : 0), 0);

const advanceCompare = (state: GameState, answer: string): GameState => {
  const roundData = buildCompareRound(state.compareRound, answer);
  const updatedData = [...state.compareData, roundData];
  const score = totalCorrect(updatedData);
  if (state.compareRound + 1 < COMPARE_ROUNDS.length) {
    return {
      ...state,
      phase: 'compare',
      compareRound: state.compareRound + 1,
      compareData: updatedData,
      score,
    };
  }
  return {
    ...state,
    phase: 'annuity',
    compareData: updatedData,
    annuityData: {
      ...state.annuityData,
      round: 4,
      annuityPV: buildAnnuityRound('annuity').annuityPV,
    },
    score,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_PRINCIPAL':
      return { ...state, principal: action.value };
    case 'SET_RATE':
      return { ...state, rate: action.value };
    case 'SET_YEARS':
      return { ...state, years: action.value };
    case 'SET_COMPOUNDING':
      return { ...state, compounding: action.value };
    case 'CHECK':
      if (state.phase !== 'calculator') return state;
      return { ...state, phase: 'compare' };
    case 'SELECT_OFFER':
      if (state.phase !== 'compare') return state;
      return advanceCompare(state, action.offer);
    case 'SELECT_ANNUITY': {
      if (state.phase !== 'annuity') return state;
      const round = buildAnnuityRound(action.answer);
      return {
        ...state,
        phase: 'npv',
        annuityData: round,
        score: state.score + (round.correctChoice ? 1 : 0),
      };
    }
    case 'SELECT_NPV': {
      if (state.phase !== 'npv') return state;
      const round = buildNpvRound(action.answer);
      return {
        ...state,
        phase: 'results',
        npvData: round,
        score: state.score + (round.correctChoice ? 1 : 0),
      };
    }
    case 'NEXT':
      return state;
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
