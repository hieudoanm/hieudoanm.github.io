import {
  A_MAX,
  DEFAULT_A,
  DEFAULT_DELTA_G,
  DEFAULT_GOVERNMENT,
  DEFAULT_INVESTMENT,
  DEFAULT_MPC,
  DELTA_G_MAX,
  GOV_MAX,
  INVEST_MAX,
  ROUNDS,
  TOTAL_ROUNDS,
} from './constants';
import {
  equilibriumOutput,
  outputGap,
  plannedExpenditure,
  requiredDeltaG,
  scoreRound,
  unplannedInventory,
} from './game';
import type { ExploreField, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  mpc: number;
  a: number;
  investment: number;
  government: number;
  target: number;
  gap: number;
  deltaG: number;
  result: RoundResult | null;
  results: RoundResult[];
  totalScore: number;
}

export type GameAction =
  | { type: 'SET_EXPLORE_SLIDER'; field: ExploreField; value: number }
  | { type: 'SET_DELTA_G'; value: number }
  | { type: 'START_CHALLENGE' }
  | { type: 'CHECK' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

const roundToTwo = (n: number): number => Math.round(n * 100) / 100;

const clampPositive = (value: number, max: number): number =>
  Math.max(0, Math.min(max, Math.round(value)));

const setInPhase = (
  state: GameState,
  phase: Phase,
  patch: Partial<GameState>
): GameState => (state.phase === phase ? { ...state, ...patch } : state);

const EXPLORE_PATCH: Record<
  ExploreField,
  (value: number) => Partial<GameState>
> = {
  mpc: (value) => ({ mpc: roundToTwo(value) }),
  a: (value) => ({ a: clampPositive(value, A_MAX) }),
  investment: (value) => ({ investment: clampPositive(value, INVEST_MAX) }),
  government: (value) => ({ government: clampPositive(value, GOV_MAX) }),
};

const sumScore = (results: RoundResult[]): number =>
  results.reduce((total, r) => total + r.score, 0);

const buildRoundResult = (state: GameState): RoundResult => {
  const government = state.government + state.deltaG;
  const required = requiredDeltaG(
    state.a,
    state.mpc,
    state.investment,
    state.government,
    state.target
  );
  return {
    round: state.round,
    mpc: state.mpc,
    a: state.a,
    investment: state.investment,
    government,
    target: state.target,
    gap: state.gap,
    requiredDeltaG: required,
    chosenDeltaG: state.deltaG,
    newEquilibrium: equilibriumOutput(
      state.a,
      state.mpc,
      state.investment,
      government
    ),
    plannedExpenditure: plannedExpenditure(
      state.a,
      state.mpc,
      state.investment,
      government,
      state.target
    ),
    unplannedInventory: unplannedInventory(
      state.a,
      state.mpc,
      state.investment,
      government,
      state.target
    ),
    score: scoreRound(state.deltaG, required),
  };
};

const applyRound = (state: GameState, round: number): GameState => {
  const profile = ROUNDS[round - 1];
  const gap = outputGap(
    profile.a,
    profile.mpc,
    profile.investment,
    profile.government,
    profile.target
  );
  return {
    ...state,
    phase: 'choose',
    round,
    mpc: profile.mpc,
    a: profile.a,
    investment: profile.investment,
    government: profile.government,
    target: profile.target,
    gap,
    deltaG: 0,
    result: null,
  };
};

const checkRound = (state: GameState): GameState => {
  if (state.phase !== 'choose') return state;
  return { ...state, phase: 'reveal', result: buildRoundResult(state) };
};

const advanceRound = (state: GameState): GameState => {
  if (!state.result) return state;
  const results = [...state.results, state.result];
  const totalScore = sumScore(results);
  if (state.round >= TOTAL_ROUNDS) {
    return { ...state, phase: 'done', results, totalScore };
  }
  return applyRound({ ...state, results, totalScore }, state.round + 1);
};

export const createInitialState = (): GameState => ({
  phase: 'explore',
  round: 1,
  mpc: DEFAULT_MPC,
  a: DEFAULT_A,
  investment: DEFAULT_INVESTMENT,
  government: DEFAULT_GOVERNMENT,
  target: ROUNDS[0].target,
  gap: 0,
  deltaG: DEFAULT_DELTA_G,
  result: null,
  results: [],
  totalScore: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_EXPLORE_SLIDER':
      return setInPhase(
        state,
        'explore',
        EXPLORE_PATCH[action.field](action.value)
      );
    case 'SET_DELTA_G':
      return setInPhase(state, 'choose', {
        deltaG: clampPositive(action.value, DELTA_G_MAX),
      });
    case 'START_CHALLENGE':
      return state.phase === 'explore' ? applyRound(state, 1) : state;
    case 'CHECK':
      return checkRound(state);
    case 'NEXT_ROUND':
      return advanceRound(state);
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
