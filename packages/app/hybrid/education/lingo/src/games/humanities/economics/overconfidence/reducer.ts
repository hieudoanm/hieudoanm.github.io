import { buildBuckets, marketHitRate, positionOutcome } from './game';
import { NILE_LENGTH, QUESTIONS, TOTAL_QUESTIONS } from './constants';
import type { AnsweredQuestion, Bucket, MarketOutcome } from './types';
import type { Confidence, Option, Phase } from './types';

export interface GameState {
  phase: Phase;
  index: number;
  selected: Option | null;
  confidence: Confidence | null;
  answers: AnsweredQuestion[];
  buckets: Bucket[];
  marketActual: number;
  marketOutcome: MarketOutcome | null;
  position: number;
  low: number | null;
  high: number | null;
  nileInRange: boolean | null;
}

export type GameAction =
  | { type: 'SELECT_OPTION'; option: Option }
  | { type: 'SELECT_CONFIDENCE'; value: Confidence }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'AGGREGATE_NEXT' }
  | { type: 'SET_POSITION'; value: number }
  | { type: 'SUBMIT_MARKET' }
  | { type: 'MARKET_NEXT' }
  | { type: 'SET_BRACKET'; low: number; high: number }
  | { type: 'SUBMIT_SLIDER' }
  | { type: 'SLIDER_NEXT' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'question',
  index: 0,
  selected: null,
  confidence: null,
  answers: [],
  buckets: [],
  marketActual: 0,
  marketOutcome: null,
  position: 50,
  low: null,
  high: null,
  nileInRange: null,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SELECT_OPTION':
      if (state.phase !== 'question') return state;
      return { ...state, selected: action.option };
    case 'SELECT_CONFIDENCE':
      if (state.phase !== 'question') return state;
      return { ...state, confidence: action.value };
    case 'SUBMIT_ANSWER': {
      if (state.phase !== 'question' || !state.selected || !state.confidence)
        return state;
      const question = QUESTIONS[state.index];
      const answer: AnsweredQuestion = {
        questionIndex: state.index,
        option: state.selected,
        confidence: state.confidence,
        correct: state.selected === question.correct,
      };
      const answers = [...state.answers, answer];
      return {
        ...state,
        answers,
        buckets: buildBuckets(answers),
        phase: 'reveal',
      };
    }
    case 'NEXT_QUESTION':
      if (state.phase !== 'reveal') return state;
      if (state.answers.length >= TOTAL_QUESTIONS)
        return { ...state, phase: 'aggregate' };
      return {
        ...state,
        phase: 'question',
        index: state.index + 1,
        selected: null,
        confidence: null,
      };
    case 'AGGREGATE_NEXT':
      if (state.phase !== 'aggregate') return state;
      return {
        ...state,
        phase: 'market',
        marketActual: marketHitRate(state.answers),
      };
    case 'SET_POSITION':
      if (state.phase !== 'market') return state;
      return { ...state, position: action.value };
    case 'SUBMIT_MARKET':
      if (state.phase !== 'market') return state;
      return {
        ...state,
        marketOutcome: positionOutcome(state.position, state.marketActual),
        phase: 'market-result',
      };
    case 'MARKET_NEXT':
      if (state.phase !== 'market-result') return state;
      return { ...state, phase: 'slider' };
    case 'SET_BRACKET':
      if (state.phase !== 'slider') return state;
      return { ...state, low: action.low, high: action.high };
    case 'SUBMIT_SLIDER':
      if (state.phase !== 'slider' || state.low === null || state.high === null)
        return state;
      return {
        ...state,
        phase: 'slider-result',
        nileInRange: state.low <= NILE_LENGTH && NILE_LENGTH <= state.high,
      };
    case 'SLIDER_NEXT':
      if (state.phase !== 'slider-result') return state;
      return { ...state, phase: 'done' };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
