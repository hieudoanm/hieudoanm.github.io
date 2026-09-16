import { bestContinuation, isSubgamePerfect } from './game';
import { GAME_TREE, TOTAL_ROUNDS } from './constants';
import type { Phase, PlayerAction, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  playerAction: PlayerAction | null;
  incumbentAction: 'accommodate' | 'fight' | null;
  playerPayoff: number;
  incumbentPayoff: number;
  spneMatch: boolean;
  results: RoundResult[];
  totalScore: number;
}

export type GameAction =
  | { type: 'PLAY_ENTRY'; choice: PlayerAction }
  | { type: 'REVEAL' }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  playerAction: null,
  incumbentAction: null,
  playerPayoff: 0,
  incumbentPayoff: 0,
  spneMatch: false,
  results: [],
  totalScore: 0,
});

interface OutcomeUpdate {
  incumbentAction: 'accommodate' | 'fight' | null;
  playerPayoff: number;
  incumbentPayoff: number;
  spneMatch: boolean;
}

const outcomeFor = (choice: PlayerAction): OutcomeUpdate => {
  if (choice === 'out') {
    return {
      incumbentAction: null,
      playerPayoff: 4,
      incumbentPayoff: 6,
      spneMatch: false,
    };
  }
  const node2 = GAME_TREE.children!.enter;
  const incumbentBest = bestContinuation(node2);
  const child = node2.children![incumbentBest.action];
  const payoffs = child?.payoffs ?? [0, 0];
  return {
    incumbentAction: incumbentBest.action as 'accommodate' | 'fight',
    playerPayoff: payoffs[0],
    incumbentPayoff: payoffs[1],
    spneMatch: isSubgamePerfect([
      { nodeId: 'node1', action: 'enter' },
      { nodeId: 'node2', action: incumbentBest.action },
    ]),
  };
};

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'PLAY_ENTRY': {
      if (state.phase !== 'choose' || state.playerAction) return state;
      return { ...state, playerAction: action.choice };
    }
    case 'REVEAL': {
      if (state.phase !== 'choose' || !state.playerAction) return state;
      return { ...state, phase: 'reveal', ...outcomeFor(state.playerAction) };
    }
    case 'NEXT_ROUND': {
      if (state.phase !== 'reveal') return state;
      const result: RoundResult = {
        round: state.round,
        playerAction: state.playerAction!,
        incumbentAction: state.incumbentAction,
        playerPayoff: state.playerPayoff,
        incumbentPayoff: state.incumbentPayoff,
        spneMatch: state.spneMatch,
      };
      const results = [...state.results, result];
      const totalScore = results.reduce((s, r) => s + r.playerPayoff, 0);
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', results, totalScore };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        results,
        totalScore,
        playerAction: null,
        incumbentAction: null,
        playerPayoff: 0,
        incumbentPayoff: 0,
        spneMatch: false,
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
