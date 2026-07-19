import {
  budgetSatisfied,
  mrsAt,
  optimalBundle,
  qyOnBudget,
  score,
  utility,
} from './game';
import type { LabParams } from './game';
import {
  DEFAULT_ALPHA,
  DEFAULT_INCOME,
  DEFAULT_PX,
  DEFAULT_PY,
  PRESET_ORDER,
} from './constants';
import type { GoodType, Phase, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  income: number;
  px: number;
  py: number;
  alpha: number;
  goodType: GoodType;
  qx: number;
  qy: number;
  result: RoundResult | null;
  attempts: RoundResult[];
}

export type GameAction =
  | { type: 'SELECT_PRESET'; goodType: GoodType }
  | { type: 'SET_INCOME'; value: number }
  | { type: 'SET_PX'; value: number }
  | { type: 'SET_PY'; value: number }
  | { type: 'SET_QX'; value: number }
  | { type: 'OPTIMIZE' }
  | { type: 'TRY_AGAIN' }
  | { type: 'RESET' };

const paramsOf = (state: GameState): LabParams => ({
  income: state.income,
  px: state.px,
  py: state.py,
  alpha: state.alpha,
  goodType: state.goodType,
});

export const createInitialState = (): GameState => {
  const base: GameState = {
    phase: 'choose',
    income: DEFAULT_INCOME,
    px: DEFAULT_PX,
    py: DEFAULT_PY,
    alpha: DEFAULT_ALPHA,
    goodType: PRESET_ORDER[0],
    qx: 10,
    qy: 0,
    result: null,
    attempts: [],
  };
  return { ...base, qy: qyOnBudget(paramsOf(base), base.qx) };
};

const withQy = (state: GameState): GameState => ({
  ...state,
  qy: qyOnBudget(paramsOf(state), state.qx),
});

const selectPreset = (state: GameState, goodType: GoodType): GameState =>
  withQy({ ...state, goodType, alpha: DEFAULT_ALPHA });

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_PRESET':
      return selectPreset(state, action.goodType);
    case 'SET_INCOME':
      return withQy({ ...state, income: action.value });
    case 'SET_PX':
      return withQy({ ...state, px: action.value });
    case 'SET_PY':
      return withQy({ ...state, py: action.value });
    case 'SET_QX':
      return withQy({ ...state, qx: action.value });
    case 'OPTIMIZE': {
      if (state.phase !== 'choose') return state;
      const params = paramsOf(state);
      const opt = optimalBundle(params);
      const choiceUtility = utility(params, state.qx, state.qy);
      const optUtility = utility(params, opt.x, opt.y);
      const result: RoundResult = {
        round: state.attempts.length + 1,
        M: state.income,
        px: state.px,
        py: state.py,
        alpha: state.alpha,
        goodType: state.goodType,
        choiceX: state.qx,
        choiceY: state.qy,
        optX: opt.x,
        optY: opt.y,
        choiceUtility,
        optUtility,
        score: score(choiceUtility, optUtility),
        budgetSatisfied: budgetSatisfied(params, state.qx, state.qy),
        mrs: mrsAt(params, state.qx, state.qy),
      };
      return {
        ...state,
        phase: 'reveal',
        result,
        attempts: [...state.attempts, result],
      };
    }
    case 'TRY_AGAIN':
      if (state.phase !== 'reveal') return state;
      return { ...state, phase: 'choose', result: null };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
