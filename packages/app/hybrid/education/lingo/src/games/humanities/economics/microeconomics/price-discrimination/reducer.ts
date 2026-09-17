import { MC, OPTIMAL_TOLERANCE, TOTAL_ROUNDS } from './constants';
import {
  optimalDual,
  optimalSingle,
  profitDual,
  profitSingle,
  qBusiness,
  qLeisure,
  roundFlipped,
} from './game';
import type { Mode, Phase, RoundKind, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  mode: Mode;
  price: string;
  priceB: string;
  priceL: string;
  result: RoundResult | null;
  results: RoundResult[];
  totalProfit: number;
  pdTotal: number;
}

export type GameAction =
  | { type: 'SET_MODE'; mode: Mode }
  | { type: 'SET_PRICE'; value: string }
  | { type: 'SET_PRICE_B'; value: string }
  | { type: 'SET_PRICE_L'; value: string }
  | { type: 'SUBMIT' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

interface Pricing {
  round: number;
  mode: Mode;
  price: number | null;
  priceB: number | null;
  priceL: number | null;
}

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  mode: 'single',
  price: '',
  priceB: '',
  priceL: '',
  result: null,
  results: [],
  totalProfit: 0,
  pdTotal: 0,
});

const kindFor = (round: number): RoundKind =>
  roundFlipped(round) ? 'flipped' : 'standard';

const quantities = (pricing: Pricing): { qb: number; ql: number } => {
  const flipped = roundFlipped(pricing.round);
  if (pricing.mode === 'single' && pricing.price !== null) {
    return {
      qb: qBusiness(pricing.price, flipped),
      ql: qLeisure(pricing.price, flipped),
    };
  }
  if (
    pricing.mode === 'dual' &&
    pricing.priceB !== null &&
    pricing.priceL !== null
  ) {
    return {
      qb: qBusiness(pricing.priceB, flipped),
      ql: qLeisure(pricing.priceL, flipped),
    };
  }
  return { qb: 0, ql: 0 };
};

const computeResult = (pricing: Pricing): RoundResult => {
  const flipped = roundFlipped(pricing.round);
  const singleOpt = optimalSingle(flipped);
  const dualOpt = optimalDual(flipped);
  const singleProfit =
    pricing.mode === 'single' && pricing.price !== null
      ? profitSingle(pricing.price, flipped)
      : 0;
  const dualProfit =
    pricing.mode === 'dual' &&
    pricing.priceB !== null &&
    pricing.priceL !== null
      ? profitDual(pricing.priceB, pricing.priceL, flipped)
      : 0;
  const profit = pricing.mode === 'single' ? singleProfit : dualProfit;
  const { qb, ql } = quantities(pricing);
  const revenue = profit + MC * (qb + ql);
  const cost = MC * (qb + ql);

  let beatBenchmark: boolean;
  let foundOptimal: boolean;
  if (pricing.mode === 'single') {
    beatBenchmark = profit >= singleOpt.profit;
    foundOptimal = pricing.price !== null && pricing.price === singleOpt.price;
  } else {
    beatBenchmark = profit >= dualOpt.profit;
    foundOptimal =
      pricing.priceB !== null &&
      pricing.priceL !== null &&
      Math.abs(pricing.priceB - dualOpt.priceB) <= OPTIMAL_TOLERANCE &&
      Math.abs(pricing.priceL - dualOpt.priceL) <= OPTIMAL_TOLERANCE;
  }

  return {
    round: pricing.round,
    kind: kindFor(pricing.round),
    mode: pricing.mode,
    price: pricing.price,
    priceB: pricing.priceB,
    priceL: pricing.priceL,
    qb,
    ql,
    revenue,
    cost,
    profit,
    beatBenchmark,
    foundOptimal,
  };
};

const makePdTotal = (results: RoundResult[]): number =>
  results.reduce(
    (sum, result) => sum + optimalDual(roundFlipped(result.round)).profit,
    0
  );

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_MODE':
      if (state.phase !== 'choose') return state;
      return { ...state, mode: action.mode, price: '', priceB: '', priceL: '' };
    case 'SET_PRICE':
      if (state.phase !== 'choose' || state.mode !== 'single') return state;
      return { ...state, price: action.value };
    case 'SET_PRICE_B':
      if (state.phase !== 'choose' || state.mode !== 'dual') return state;
      return { ...state, priceB: action.value };
    case 'SET_PRICE_L':
      if (state.phase !== 'choose' || state.mode !== 'dual') return state;
      return { ...state, priceL: action.value };
    case 'SUBMIT': {
      if (state.phase !== 'choose') return state;
      if (state.mode === 'single') {
        const price = Math.round(Number(state.price));
        if (!Number.isFinite(price) || price < 1) return state;
        return {
          ...state,
          phase: 'reveal',
          result: computeResult({
            round: state.round,
            mode: 'single',
            price,
            priceB: null,
            priceL: null,
          }),
        };
      }
      const priceB = Math.round(Number(state.priceB));
      const priceL = Math.round(Number(state.priceL));
      if (
        !Number.isFinite(priceB) ||
        !Number.isFinite(priceL) ||
        priceB < 1 ||
        priceL < 1
      )
        return state;
      return {
        ...state,
        phase: 'reveal',
        result: computeResult({
          round: state.round,
          mode: 'dual',
          price: null,
          priceB,
          priceL,
        }),
      };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal' || state.result === null) return state;
      const results = [...state.results, state.result];
      const totalProfit = results.reduce((sum, r) => sum + r.profit, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return {
          ...state,
          phase: 'done',
          results,
          totalProfit,
          pdTotal: makePdTotal(results),
        };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results,
        totalProfit,
        price: '',
        priceB: '',
        priceL: '',
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
