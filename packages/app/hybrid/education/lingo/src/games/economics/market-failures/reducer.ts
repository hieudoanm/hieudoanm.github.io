import { SCENARIOS, POLLUTION_DEFAULT_GAP } from './constants';
import { isPolicyCorrect } from './game';
import type {
  GameState,
  Policy,
  PollutionState,
  ScenarioAnswer,
} from './types';

export type { GameState };

export type GameAction =
  | { type: 'ANSWER_POLICY'; policy: Policy }
  | { type: 'SET_GAP'; gap: number }
  | { type: 'SET_TAX'; tax: number }
  | { type: 'CONFIRM_TAX' }
  | { type: 'NEXT_SCENARIO' }
  | { type: 'RESET' };

export const createInitialPollution = (): PollutionState => ({
  gap: POLLUTION_DEFAULT_GAP,
  tax: 0,
  output: 0,
  confirmed: false,
});

export const createInitialState = (): GameState => ({
  phase: 'scenario',
  scenarioIndex: 0,
  answers: [],
  lastAnswer: null,
  score: 0,
  pollution: createInitialPollution(),
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'ANSWER_POLICY': {
      if (state.phase !== 'scenario') return state;
      const scenario = SCENARIOS[state.scenarioIndex];
      const policyCorrect = isPolicyCorrect(action.policy, scenario.bestPolicy);
      const answer: ScenarioAnswer = {
        scenarioId: scenario.id,
        policy: action.policy,
        policyCorrect,
      };
      if (state.answers.some((a) => a.scenarioId === answer.scenarioId)) {
        return state;
      }
      return {
        ...state,
        answers: [...state.answers, answer],
        lastAnswer: answer,
        score: state.score + (policyCorrect ? 1 : 0),
      };
    }
    case 'SET_GAP': {
      if (state.phase !== 'pollution') return state;
      return {
        ...state,
        pollution: {
          ...state.pollution,
          gap: action.gap,
          output: 0,
          confirmed: false,
        },
      };
    }
    case 'SET_TAX': {
      if (state.phase !== 'pollution') return state;
      return {
        ...state,
        pollution: {
          ...state.pollution,
          tax: action.tax,
          output: 0,
          confirmed: false,
        },
      };
    }
    case 'CONFIRM_TAX': {
      if (state.phase !== 'pollution' || state.pollution.confirmed) {
        return state;
      }
      return {
        ...state,
        phase: 'done',
        pollution: { ...state.pollution, confirmed: true },
      };
    }
    case 'NEXT_SCENARIO': {
      if (state.phase !== 'scenario') return state;
      if (state.scenarioIndex >= SCENARIOS.length - 1) {
        return { ...state, phase: 'pollution' };
      }
      return {
        ...state,
        scenarioIndex: state.scenarioIndex + 1,
        lastAnswer: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
