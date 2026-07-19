import { COST, TOTAL_ROUNDS } from './constants';
import { aiReports, outcome, pivotTaxFor, sampleValues } from './game';
import type { Phase, RoundResult, Rule } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  rule: Rule | null;
  value: number;
  values: number[];
  reports: number[];
  playerReport: number | null;
  result: RoundResult | null;
  results: RoundResult[];
  netTotal: number;
}

export type GameAction =
  | { type: 'START_ROUND'; rule: Rule }
  | { type: 'SUBMIT_REPORT'; report: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  rule: null,
  value: 0,
  values: [],
  reports: [],
  playerReport: null,
  result: null,
  results: [],
  netTotal: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_ROUND': {
      const values = sampleValues();
      return {
        ...state,
        phase: 'choose',
        rule: action.rule,
        value: values[0],
        values,
        reports: aiReports(values),
        playerReport: null,
        result: null,
      };
    }
    case 'SUBMIT_REPORT': {
      if (!state.rule || state.phase !== 'choose') return state;
      const reports = state.reports.map((v, i) =>
        i === 0 ? action.report : v
      );
      const { built, payments, pivotTaxes } = outcome(
        state.rule,
        reports,
        COST
      );
      const pivotal = pivotTaxFor(reports, 0) > 0;
      const result: RoundResult = {
        round: state.round,
        rule: state.rule,
        value: state.value,
        values: state.values,
        reports,
        playerReport: action.report,
        built,
        payments,
        pivotTaxes,
        pivotal,
        reportedTruth: action.report === state.value,
        playerPayoff: built ? state.value - payments[0] : 0,
      };
      return { ...state, phase: 'reveal', playerReport: action.report, result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      const netTotal = results.reduce(
        (sumResult, r) => sumResult + r.playerPayoff,
        0
      );
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results, netTotal };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        rule: null,
        playerReport: null,
        result: null,
        results,
        netTotal,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
