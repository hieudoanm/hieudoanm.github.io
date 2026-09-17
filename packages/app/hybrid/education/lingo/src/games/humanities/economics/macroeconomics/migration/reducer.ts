import { TOTAL_QUIZ_ROUNDS } from './constants';
import {
  evaluateDecision,
  generateQuizParams,
  judgeQuizAnswer,
  simulateMacro,
} from './game';
import type {
  DecisionResult,
  MacroSnapshot,
  QuizAnswer,
  QuizRound,
} from './types';

export interface GameState {
  phase: Phase;
  originWage: number;
  destWage: number;
  movingCost: number;
  jobProb: number;
  familyFactor: number;
  decision: DecisionResult | null;
  macro: MacroSnapshot | null;
  quizRound: number;
  quizParams: { w0: number; w1: number; m: number; p: number };
  quizAnswer: QuizAnswer | null;
  quizRounds: QuizRound[];
  correctCount: number;
  laborSupply: number;
  laborDemand: number;
  migrantCount: number;
}

export type Phase = 'input' | 'result' | 'quiz' | 'done';

export type GameAction =
  | { type: 'SET_ORIGIN_WAGE'; value: number }
  | { type: 'SET_DEST_WAGE'; value: number }
  | { type: 'SET_MOVING_COST'; value: number }
  | { type: 'SET_JOB_PROB'; value: number }
  | { type: 'SET_FAMILY_FACTOR'; value: number }
  | { type: 'COMPUTE_DECISION' }
  | { type: 'SET_MIGRANT_COUNT'; value: number }
  | { type: 'SET_LABOR_SUPPLY'; value: number }
  | { type: 'SET_LABOR_DEMAND'; value: number }
  | { type: 'SIMULATE_MACRO' }
  | { type: 'START_QUIZ' }
  | { type: 'ANSWER_QUIZ'; answer: QuizAnswer }
  | { type: 'NEXT_QUIZ' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'input',
  originWage: 30000,
  destWage: 55000,
  movingCost: 5000,
  jobProb: 0.85,
  familyFactor: 0,
  decision: null,
  macro: null,
  quizRound: 1,
  quizParams: { w0: 30000, w1: 55000, m: 5000, p: 0.85 },
  quizAnswer: null,
  quizRounds: [],
  correctCount: 0,
  laborSupply: 100,
  laborDemand: 120,
  migrantCount: 10,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_ORIGIN_WAGE':
      return { ...state, originWage: action.value };
    case 'SET_DEST_WAGE':
      return { ...state, destWage: action.value };
    case 'SET_MOVING_COST':
      return { ...state, movingCost: action.value };
    case 'SET_JOB_PROB':
      return { ...state, jobProb: action.value };
    case 'SET_FAMILY_FACTOR':
      return { ...state, familyFactor: action.value };
    case 'SET_MIGRANT_COUNT':
      return { ...state, migrantCount: action.value };
    case 'SET_LABOR_SUPPLY':
      return { ...state, laborSupply: action.value };
    case 'SET_LABOR_DEMAND':
      return { ...state, laborDemand: action.value };
    case 'COMPUTE_DECISION': {
      const decision = evaluateDecision(
        state.originWage,
        state.destWage,
        state.movingCost,
        state.jobProb
      );
      return { ...state, decision, phase: 'result' };
    }
    case 'SIMULATE_MACRO': {
      const macro = simulateMacro(
        state.originWage,
        state.destWage,
        state.migrantCount,
        state.laborSupply,
        state.laborDemand
      );
      return { ...state, macro, phase: 'result' };
    }
    case 'START_QUIZ':
      return {
        ...state,
        phase: 'quiz',
        quizRound: 1,
        quizRounds: [],
        correctCount: 0,
        quizAnswer: null,
        quizParams: generateQuizParams(),
      };
    case 'ANSWER_QUIZ': {
      if (state.quizAnswer) return state;
      const { w0, w1, m, p } = state.quizParams;
      const { correct, npv } = judgeQuizAnswer(action.answer, w0, w1, m, p);
      const round: QuizRound = {
        round: state.quizRound,
        w0,
        w1,
        m,
        p,
        correct,
        npv,
        answer: action.answer,
      };
      const quizRounds = [...state.quizRounds, round];
      return {
        ...state,
        quizAnswer: action.answer,
        quizRounds,
        correctCount: correct ? state.correctCount + 1 : state.correctCount,
      };
    }
    case 'NEXT_QUIZ': {
      if (!state.quizAnswer) return state;
      if (state.quizRound >= TOTAL_QUIZ_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        quizRound: state.quizRound + 1,
        quizAnswer: null,
        quizParams: generateQuizParams(),
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
