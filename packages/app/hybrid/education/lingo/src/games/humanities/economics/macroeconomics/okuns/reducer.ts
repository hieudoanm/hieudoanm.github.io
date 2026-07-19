import {
  C_DEFAULT,
  G_STAR_DEFAULT,
  STEER_ROUNDS,
  TOLERANCE,
  U_STAR_DEFAULT,
} from './constants';
import {
  closestCoef,
  estimateLine,
  estimatePoints,
  generateDataset,
  nextUnemployment,
  sampleStartGap,
  sampleTrueCoef,
  steerScore,
} from './game';
import type {
  CoefficientChoice,
  DataPoint,
  FittedLine,
  ModelParams,
  Phase,
  ResultKind,
} from './types';

export interface GameState {
  phase: Phase;
  resultKind: ResultKind | null;
  model: ModelParams;
  growth: number;
  startUnemployment: number;
  unemployment: number;
  steerStep: number;
  deviation: number;
  outcomeScore: number;
  onTarget: boolean;
  dataset: DataPoint[];
  chosenCoef: CoefficientChoice | null;
  line: FittedLine | null;
  correctCoef: CoefficientChoice | null;
}

export type GameAction =
  | { type: 'SET_POTENTIAL_GROWTH'; value: number }
  | { type: 'SET_OKUN_COEF'; value: number }
  | { type: 'SET_NATURAL_RATE'; value: number }
  | { type: 'SET_GROWTH'; value: number }
  | { type: 'START_STEER' }
  | { type: 'CHECK_STEER' }
  | { type: 'START_ESTIMATE' }
  | { type: 'CHOOSE_COEF'; value: CoefficientChoice }
  | { type: 'ESTIMATE_COEFFICIENT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'intro',
  resultKind: null,
  model: { gStar: G_STAR_DEFAULT, c: C_DEFAULT, uStar: U_STAR_DEFAULT },
  growth: G_STAR_DEFAULT,
  startUnemployment: 0,
  unemployment: 0,
  steerStep: 0,
  deviation: 0,
  outcomeScore: 0,
  onTarget: false,
  dataset: [],
  chosenCoef: null,
  line: null,
  correctCoef: null,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_POTENTIAL_GROWTH':
      if (state.phase !== 'intro') return state;
      return { ...state, model: { ...state.model, gStar: action.value } };
    case 'SET_OKUN_COEF':
      if (state.phase !== 'intro') return state;
      return { ...state, model: { ...state.model, c: action.value } };
    case 'SET_NATURAL_RATE':
      if (state.phase !== 'intro') return state;
      return { ...state, model: { ...state.model, uStar: action.value } };
    case 'SET_GROWTH':
      if (state.phase !== 'steer') return state;
      return { ...state, growth: action.value };
    case 'START_STEER': {
      if (state.phase !== 'intro' && state.phase !== 'done') return state;
      const startUnemployment =
        Math.round((state.model.uStar + sampleStartGap()) * 100) / 100;
      return {
        ...state,
        phase: 'steer',
        resultKind: null,
        startUnemployment,
        unemployment: startUnemployment,
        steerStep: 0,
        growth: state.model.gStar,
        deviation: 0,
        outcomeScore: 0,
        onTarget: false,
      };
    }
    case 'CHECK_STEER': {
      if (state.phase !== 'steer') return state;
      const unemployment = nextUnemployment(
        state.unemployment,
        state.model.c,
        state.model.gStar,
        state.growth
      );
      const steerStep = state.steerStep + 1;
      if (steerStep < STEER_ROUNDS) {
        return { ...state, unemployment, steerStep };
      }
      const deviation =
        Math.round((unemployment - state.model.uStar) * 100) / 100;
      return {
        ...state,
        phase: 'done',
        resultKind: 'steer',
        unemployment,
        steerStep,
        deviation,
        outcomeScore: steerScore(deviation),
        onTarget: Math.abs(deviation) <= TOLERANCE,
      };
    }
    case 'START_ESTIMATE': {
      if (state.phase === 'estimate') return state;
      return {
        ...state,
        phase: 'estimate',
        resultKind: null,
        dataset: generateDataset(sampleTrueCoef()),
        chosenCoef: null,
        line: null,
        correctCoef: null,
        deviation: 0,
        outcomeScore: 0,
        onTarget: false,
      };
    }
    case 'CHOOSE_COEF':
      if (state.phase !== 'estimate') return state;
      return { ...state, chosenCoef: action.value };
    case 'ESTIMATE_COEFFICIENT': {
      if (state.phase !== 'estimate' || state.chosenCoef === null) return state;
      const line = estimateLine(state.dataset);
      const correctCoef = closestCoef(line.slope);
      return {
        ...state,
        phase: 'done',
        resultKind: 'estimate',
        line,
        correctCoef,
        deviation: Math.abs(state.chosenCoef - Math.abs(line.slope)),
        outcomeScore: estimatePoints(state.chosenCoef, line.slope),
        onTarget: state.chosenCoef === correctCoef,
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
