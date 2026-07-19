import { budgetLeft, getScenario, revealHint, scoreForScenario } from './game';
import { STARTING_BUDGET, TOTAL_SCENARIOS } from './constants';
import type {
  Classification,
  GameAction,
  Hint,
  Phase,
  ScenarioResult,
} from './types';

export interface GameState {
  phase: Phase;
  round: number;
  scenarioIndex: number;
  budgetSpent: number;
  hints: Hint[];
  answer: Classification | null;
  results: ScenarioResult[];
  totalScore: number;
}

export const createInitialState = (): GameState => ({
  phase: 'investigate',
  round: 1,
  scenarioIndex: 0,
  budgetSpent: 0,
  hints: [],
  answer: null,
  results: [],
  totalScore: 0,
});

const addResult = (state: GameState, answer: Classification): GameState => {
  const scenario = getScenario(state.scenarioIndex);
  const correct = answer === scenario.correct;
  const unused = budgetLeft(state.budgetSpent);
  const pts = scoreForScenario(correct, unused);
  const result: ScenarioResult = {
    scenarioId: scenario.id,
    correct,
    answer,
    unusedBudget: unused,
    hints: state.hints,
  };
  return {
    ...state,
    phase: 'reveal',
    answer,
    results: [...state.results, result],
    totalScore: state.totalScore + pts,
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'START_GAME':
      return createInitialState();
    case 'INVESTIGATE': {
      if (state.phase !== 'investigate') return state;
      if (budgetLeft(state.budgetSpent) <= 0) return state;
      const scenario = getScenario(state.scenarioIndex);
      const text = revealHint(scenario, action.action);
      return {
        ...state,
        budgetSpent: state.budgetSpent + 1,
        hints: [...state.hints, { action: action.action, text }],
      };
    }
    case 'SUBMIT_ANSWER': {
      if (state.phase !== 'investigate') return state;
      return addResult(state, action.answer);
    }
    case 'NEXT_SCENARIO': {
      if (state.phase !== 'reveal') return state;
      if (state.round >= TOTAL_SCENARIOS) {
        return {
          ...state,
          phase: 'done',
          results: state.results,
          totalScore: state.totalScore,
        };
      }
      return {
        ...state,
        phase: 'investigate',
        round: state.round + 1,
        scenarioIndex: state.scenarioIndex + 1,
        budgetSpent: 0,
        hints: [],
        answer: null,
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
