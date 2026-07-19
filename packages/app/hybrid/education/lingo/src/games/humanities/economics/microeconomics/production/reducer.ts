import { MAX_LABOR, TOTAL_QUIZ_ROUNDS } from './constants';
import { buildCostSchedule, getQuizQuestions, profitMaxQ } from './game';
import type { Phase, QuizResult } from './types';

export interface GameState {
  phase: Phase;
  labor: number;
  wage: number;
  fixedCost: number;
  price: number;
  targetQ: string;
  checkResult: 'idle' | 'correct' | 'wrong';
  quizIndex: number;
  selected: number | null;
  quizResults: QuizResult[];
  score: number;
}

export type GameAction =
  | { type: 'SET_LABOR'; value: number }
  | { type: 'SET_WAGE'; value: number }
  | { type: 'SET_FIXED_COST'; value: number }
  | { type: 'SET_PRICE'; value: number }
  | { type: 'SET_TARGET_Q'; value: string }
  | { type: 'CHECK_PROFIT' }
  | { type: 'START_QUIZ' }
  | { type: 'CHECK_ANSWER'; selected: number }
  | { type: 'NEXT_QUIZ' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'lab',
  labor: 8,
  wage: 10,
  fixedCost: 100,
  price: 20,
  targetQ: '',
  checkResult: 'idle',
  quizIndex: 0,
  selected: null,
  quizResults: [],
  score: 0,
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SET_LABOR':
      return { ...state, labor: action.value, checkResult: 'idle' };
    case 'SET_WAGE':
      return { ...state, wage: action.value, checkResult: 'idle' };
    case 'SET_FIXED_COST':
      return { ...state, fixedCost: action.value, checkResult: 'idle' };
    case 'SET_PRICE':
      return { ...state, price: action.value, checkResult: 'idle' };
    case 'SET_TARGET_Q':
      return { ...state, targetQ: action.value, checkResult: 'idle' };
    case 'CHECK_PROFIT': {
      if (state.phase !== 'lab' || state.targetQ === '') return state;
      const rows = buildCostSchedule(MAX_LABOR, state.wage, state.fixedCost);
      const pm = profitMaxQ(rows, state.price);
      if (!pm) return state;
      const guess = Number(state.targetQ);
      if (!Number.isFinite(guess)) return state;
      const feedback = Math.abs(guess - pm.Q) <= 1 ? 'correct' : 'wrong';
      return { ...state, checkResult: feedback };
    }
    case 'START_QUIZ': {
      if (state.phase !== 'lab') return state;
      return {
        ...state,
        phase: 'quiz',
        quizIndex: 0,
        selected: null,
        quizResults: [],
        score: 0,
      };
    }
    case 'CHECK_ANSWER': {
      if (state.phase !== 'quiz' || state.selected !== null) return state;
      const q = getQuizQuestions()[state.quizIndex];
      const correct = q && q.correctIndex === action.selected;
      return {
        ...state,
        selected: action.selected,
        score: correct ? state.score + 1 : state.score,
      };
    }
    case 'NEXT_QUIZ': {
      if (state.phase !== 'quiz' || state.selected === null) return state;
      const q = getQuizQuestions()[state.quizIndex];
      if (!q) return state;
      const result: QuizResult = {
        questionId: q.id,
        selected: state.selected,
        correct: state.selected === q.correctIndex,
      };
      const results = [...state.quizResults, result];
      if (state.quizIndex + 1 >= TOTAL_QUIZ_ROUNDS) {
        return { ...state, phase: 'done', quizResults: results };
      }
      return {
        ...state,
        quizIndex: state.quizIndex + 1,
        selected: null,
        quizResults: results,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
