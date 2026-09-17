import { CHALLENGES, PRESETS, SLIDER_MAX, TOTAL_ROUNDS } from './constants';
import {
  challengeIdealWeight,
  challengeSigma,
  minVarianceWeights,
  scoreChallenge,
} from './game';
import type {
  AssetId,
  ChallengeResult,
  Phase,
  PortfolioWeights,
} from './types';

export interface GameState {
  phase: Phase;
  round: number;
  weights: PortfolioWeights;
  nAssets: number;
  challengeWeight: number;
  result: ChallengeResult | null;
  results: ChallengeResult[];
  totalScore: number;
}

export type GameAction =
  | { type: 'SET_WEIGHT'; asset: AssetId; value: number }
  | { type: 'APPLY_PRESET'; preset: string }
  | { type: 'SET_N'; value: number }
  | { type: 'SET_CHALLENGE_WEIGHT'; value: number }
  | { type: 'SUBMIT_CHECK' }
  | { type: 'NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  weights: { tech: 1 / 3, property: 1 / 3, bonds: 1 / 3 },
  nAssets: 1,
  challengeWeight: 0.5,
  result: null,
  results: [],
  totalScore: 0,
});

const clampSlider = (v: number): number => Math.min(SLIDER_MAX, Math.max(0, v));

const setWeight = (
  state: GameState,
  action: Extract<GameAction, { type: 'SET_WEIGHT' }>
): GameState => {
  if (state.phase !== 'choose') return state;
  return {
    ...state,
    weights: { ...state.weights, [action.asset]: clampSlider(action.value) },
  };
};

const applyPreset = (
  state: GameState,
  action: Extract<GameAction, { type: 'APPLY_PRESET' }>
): GameState => {
  if (state.phase !== 'choose') return state;
  const preset = PRESETS.find((p) => p.id === action.preset);
  if (!preset) return state;
  const weights = preset.weights ?? minVarianceWeights();
  return { ...state, weights };
};

const setNAssets = (
  state: GameState,
  action: Extract<GameAction, { type: 'SET_N' }>
): GameState => {
  if (state.phase !== 'choose') return state;
  return {
    ...state,
    nAssets: Math.max(1, Math.min(20, Math.round(action.value))),
  };
};

const setChallengeWeight = (
  state: GameState,
  action: Extract<GameAction, { type: 'SET_CHALLENGE_WEIGHT' }>
): GameState => {
  if (state.phase !== 'choose') return state;
  return { ...state, challengeWeight: action.value };
};

const submitCheck = (state: GameState): GameState => {
  if (state.phase !== 'choose') return state;
  const config = CHALLENGES[state.round - 1];
  if (!config) return state;
  const w = state.challengeWeight;
  const result: ChallengeResult = {
    round: state.round,
    mode: config.mode,
    target: config.targetReturn,
    playerW: w,
    idealW: challengeIdealWeight(config),
    sigma: challengeSigma(config, w),
    score: scoreChallenge(w, config),
  };
  return { ...state, phase: 'reveal', result };
};

const nextRound = (state: GameState): GameState => {
  if (state.phase !== 'reveal' || !state.result) return state;
  const results = [...state.results, state.result];
  const totalScore = results.reduce((s, r) => s + r.score, 0);
  if (state.round >= TOTAL_ROUNDS) {
    return {
      ...state,
      phase: 'done',
      result: null,
      results,
      totalScore,
      challengeWeight: 0.5,
    };
  }
  return {
    ...state,
    phase: 'choose',
    round: state.round + 1,
    result: null,
    results,
    totalScore,
    challengeWeight: 0.5,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_WEIGHT':
      return setWeight(state, action);
    case 'APPLY_PRESET':
      return applyPreset(state, action);
    case 'SET_N':
      return setNAssets(state, action);
    case 'SET_CHALLENGE_WEIGHT':
      return setChallengeWeight(state, action);
    case 'SUBMIT_CHECK':
      return submitCheck(state);
    case 'NEXT':
      return nextRound(state);
    case 'RESET':
      return createInitialState();
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};
