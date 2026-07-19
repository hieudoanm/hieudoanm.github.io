import { TOTAL_ROUNDS } from './constants';
import { botMove, outcome, scoreFor } from './game';
import type { BotId, Move, Outcome, Phase, RoundResult } from './types';

export interface RpsState {
  phase: Phase;
  round: number;
  botId: BotId | null;
  mine: Move | null;
  theirs: Move | null;
  outcome: Outcome | null;
  score: number;
  results: RoundResult[];
}

export type RpsAction =
  | { type: 'PICK_BOT'; botId: BotId }
  | { type: 'PLAY'; move: Move }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

export const createInitialState = (): RpsState => ({
  phase: 'choose',
  round: 1,
  botId: null,
  mine: null,
  theirs: null,
  outcome: null,
  score: 0,
  results: [],
});

export const gameReducer = (state: RpsState, action: RpsAction): RpsState => {
  switch (action.type) {
    case 'PICK_BOT':
      return { ...state, botId: action.botId };
    case 'PLAY': {
      if (!state.botId || state.phase !== 'choose') return state;
      const theirs = botMove(
        state.botId,
        state.round,
        state.results.map((r) => r.mine)
      );
      const kind = outcome(action.move, theirs);
      return {
        ...state,
        phase: 'reveal',
        mine: action.move,
        theirs,
        outcome: kind,
        score: state.score + scoreFor(kind),
        results: [
          ...state.results,
          {
            round: state.round,
            mine: action.move,
            theirs,
            outcome: kind,
            score: scoreFor(kind),
          },
        ],
      };
    }
    case 'NEXT_ROUND':
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done' };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        mine: null,
        theirs: null,
        outcome: null,
      };
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};
