import { DEFAULT_PRESET, PRESETS } from './constants';
import { isConverged, payoffSnapshot, stepsFrom } from './game';
import type { FitnessSnapshot, PresetId } from './types';

export interface GameState {
  preset: PresetId;
  startP: number;
  p: number;
  generation: number;
  lastFitness: FitnessSnapshot;
  converged: boolean;
}

export type GameAction =
  | { type: 'SELECT_PRESET'; preset: PresetId }
  | { type: 'SET_START'; p: number }
  | { type: 'STEP'; n: number }
  | { type: 'RESET' };

const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

export const createInitialState = (): GameState => {
  const preset = PRESETS[DEFAULT_PRESET];
  return {
    preset: DEFAULT_PRESET,
    startP: preset.startP,
    p: preset.startP,
    generation: 0,
    lastFitness: payoffSnapshot(preset.startP, preset.matrix),
    converged: false,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_PRESET': {
      const next = PRESETS[action.preset];
      return {
        ...state,
        preset: action.preset,
        startP: next.startP,
        p: next.startP,
        generation: 0,
        lastFitness: payoffSnapshot(next.startP, next.matrix),
        converged: false,
      };
    }
    case 'SET_START': {
      if (!Number.isFinite(action.p)) return state;
      const start = clamp01(action.p);
      const matrix = PRESETS[state.preset].matrix;
      return {
        ...state,
        startP: start,
        p: start,
        generation: 0,
        lastFitness: payoffSnapshot(start, matrix),
        converged: false,
      };
    }
    case 'STEP': {
      if (!Number.isInteger(action.n) || action.n <= 0) return state;
      const preset = PRESETS[state.preset];
      const trace = stepsFrom(state.p, preset.matrix, action.n);
      const nextP = trace[trace.length - 1];
      const prevP = trace[trace.length - 2];
      return {
        ...state,
        p: nextP,
        generation: state.generation + action.n,
        lastFitness: payoffSnapshot(nextP, preset.matrix),
        converged: isConverged(prevP, nextP),
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
