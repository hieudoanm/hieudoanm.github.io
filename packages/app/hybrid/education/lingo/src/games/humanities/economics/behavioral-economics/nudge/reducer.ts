import { DOMAINS, TOTAL_ROUNDS } from './constants';
import { buildReport, computeSimulator } from './game';
import type {
  Design,
  DomainScript,
  Phase,
  RoundReport,
  SimulatorOutcome,
} from './types';

export interface GameState {
  phase: Phase;
  roundIndex: number;
  report: RoundReport | null;
  reports: RoundReport[];
  targetHits: number;
  simulator: SimulatorOutcome | null;
}

export type GameAction =
  | { type: 'CHECK_DESIGN'; design: Design; inertia: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'CHECK_SIM'; defaultRate: number }
  | { type: 'RESET_SIM' }
  | { type: 'FINISH' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'design',
  roundIndex: 0,
  report: null,
  reports: [],
  targetHits: 0,
  simulator: null,
});

const domainAt = (roundIndex: number): DomainScript | undefined =>
  DOMAINS[roundIndex];

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'CHECK_DESIGN': {
      if (state.phase !== 'design') return state;
      const domain = domainAt(state.roundIndex);
      if (!domain) return state;
      const report = buildReport(
        state.roundIndex + 1,
        domain,
        action.design,
        action.inertia
      );
      return {
        ...state,
        phase: 'reveal',
        report,
        targetHits: state.targetHits + (report.hitTarget ? 1 : 0),
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || !state.report) return state;
      const reports = [...state.reports, state.report];
      if (state.roundIndex + 1 >= TOTAL_ROUNDS) {
        return { ...state, phase: 'simulator', reports, report: null };
      }
      return {
        ...state,
        phase: 'design',
        roundIndex: state.roundIndex + 1,
        reports,
        report: null,
      };
    }
    case 'CHECK_SIM': {
      if (state.phase !== 'simulator' || state.simulator) return state;
      const simulator = computeSimulator(action.defaultRate);
      return {
        ...state,
        simulator,
        targetHits: state.targetHits + (simulator.hitTarget ? 1 : 0),
      };
    }
    case 'RESET_SIM': {
      if (state.phase !== 'simulator' || !state.simulator) return state;
      return {
        ...state,
        simulator: null,
        targetHits: state.targetHits - (state.simulator.hitTarget ? 1 : 0),
      };
    }
    case 'FINISH': {
      if (state.phase !== 'simulator' || !state.simulator) return state;
      return { ...state, phase: 'done' };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
