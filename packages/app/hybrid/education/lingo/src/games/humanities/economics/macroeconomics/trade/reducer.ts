import {
  FIRST_ROUND_SPEC,
  LAB_MARKET,
  NASH_TARIFF,
  RETALIATION_MAX,
  RETALIATION_MIN,
  ROUNDS,
  TARIFF_MAX,
  TARIFF_MIN,
  TOTAL_ROUNDS,
  WORLD_PRICE_MAX,
  WORLD_PRICE_MIN,
} from './constants';
import { answerFor, scoreFor } from './game';
import type { GameAction, GameState, RoundResult } from './types';

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export const createInitialState = (): GameState => ({
  phase: 'explore',
  worldPrice: LAB_MARKET.worldP,
  tariff: 0,
  round: 1,
  spec: FIRST_ROUND_SPEC,
  myTariff: 0,
  otherTariff: 0,
  result: null,
  results: [],
  totalScore: 0,
});

const tally = (results: RoundResult[]): number =>
  results.reduce((sum, r) => sum + r.score, 0);

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_WORLD_PRICE':
      if (state.phase !== 'explore') return state;
      return {
        ...state,
        worldPrice: clamp(action.value, WORLD_PRICE_MIN, WORLD_PRICE_MAX),
      };
    case 'SET_TARIFF':
      if (state.phase !== 'explore') return state;
      return { ...state, tariff: clamp(action.value, TARIFF_MIN, TARIFF_MAX) };
    case 'START_ROUNDS':
      if (state.phase !== 'explore') return state;
      return { ...state, phase: 'challenge', spec: ROUNDS[0] };
    case 'SET_MY_TARIFF':
      if (state.phase !== 'challenge' || state.spec.kind !== 'retaliation')
        return state;
      return {
        ...state,
        myTariff: clamp(action.value, RETALIATION_MIN, RETALIATION_MAX),
      };
    case 'SET_OTHER_TARIFF':
      if (state.phase !== 'challenge' || state.spec.kind !== 'retaliation')
        return state;
      return {
        ...state,
        otherTariff: clamp(action.value, RETALIATION_MIN, RETALIATION_MAX),
      };
    case 'SUBMIT_CHOICE': {
      if (state.phase !== 'challenge' || state.spec.kind === 'retaliation')
        return state;
      const result: RoundResult = {
        round: state.round,
        kind: state.spec.kind,
        chosen: action.tariff,
        answer: answerFor(state.spec),
        score: scoreFor(state.spec, action.tariff, state.otherTariff),
      };
      return { ...state, phase: 'reveal', result };
    }
    case 'SUBMIT_RETALIATION': {
      if (state.phase !== 'challenge' || state.spec.kind !== 'retaliation')
        return state;
      const result: RoundResult = {
        round: state.round,
        kind: 'retaliation',
        chosen: state.myTariff,
        answer: NASH_TARIFF,
        score: scoreFor(state.spec, state.myTariff, state.otherTariff),
      };
      return { ...state, phase: 'reveal', result };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const results = [...state.results, state.result];
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results, totalScore: tally(results) };
      }
      return {
        ...state,
        phase: 'challenge',
        round: state.round + 1,
        spec: ROUNDS[state.round],
        myTariff: 0,
        otherTariff: 0,
        result: null,
        results,
        totalScore: tally(results),
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
