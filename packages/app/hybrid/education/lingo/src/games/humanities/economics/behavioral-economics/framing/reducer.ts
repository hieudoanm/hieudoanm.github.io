import { frameOk } from './game';
import type { Choice, Phase, ScenarioId } from './types';

export interface GameState {
  phase: Phase;
  current: ScenarioId;
  gainChoice: Choice | null;
  lossChoice: Choice | null;
  framingScore: number;
}

export type GameAction =
  | { type: 'CHOOSE'; scenario: ScenarioId; choice: Choice }
  | { type: 'REVEAL' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'question',
  current: 'A',
  gainChoice: null,
  lossChoice: null,
  framingScore: 0,
});

const applyChoice = (
  state: GameState,
  scenario: ScenarioId,
  choice: Choice
): GameState => {
  if (state.phase !== 'question' || scenario !== state.current) return state;
  const gainChoice = scenario === 'A' ? choice : state.gainChoice;
  const lossChoice = scenario === 'B' ? choice : state.lossChoice;
  const next: ScenarioId = scenario === 'A' ? 'B' : 'A';
  const answered = gainChoice !== null && lossChoice !== null;
  return {
    ...state,
    gainChoice,
    lossChoice,
    current: next,
    phase: answered ? 'reveal' : 'question',
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'CHOOSE':
      return applyChoice(state, action.scenario, action.choice);
    case 'REVEAL':
      if (!state.gainChoice || !state.lossChoice) return state;
      return {
        ...state,
        phase: 'done',
        framingScore: frameOk(state.gainChoice, state.lossChoice) ? 1 : 0,
      };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
