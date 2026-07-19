import { TOTAL_ROUNDS } from './constants';
import {
  conditionalContribution,
  cooperateContribution,
  freeRiderContribution,
  payoff,
} from './game';
import type { Phase, Ranking, RoundResult } from './types';

export interface GameState {
  phase: Phase;
  round: number;
  myContribution: number | null;
  result: RoundResult | null;
  history: RoundResult[];
  myTotal: number;
  playerHistory: number[];
}

export type GameAction =
  | { type: 'SUBMIT_CONTRIBUTION'; amount: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'RESET' };

const botContributions = (playerHistory: number[], round: number) => ({
  hana: cooperateContribution(playerHistory),
  marco: freeRiderContribution(),
  bea: conditionalContribution(playerHistory, round),
});

export const createInitialState = (): GameState => ({
  phase: 'choose',
  round: 1,
  myContribution: null,
  result: null,
  history: [],
  myTotal: 0,
  playerHistory: [],
});

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case 'SUBMIT_CONTRIBUTION': {
      if (state.phase !== 'choose') return state;
      const contribution = Math.round(action.amount);
      const bot = botContributions(state.playerHistory, state.round);
      const all = [contribution, bot.hana, bot.marco, bot.bea];
      const perPlayer = payoff(contribution, all);
      const payoffs = {
        you: perPlayer,
        hana: payoff(bot.hana, all),
        marco: payoff(bot.marco, all),
        bea: payoff(bot.bea, all),
      };
      const result: RoundResult = {
        round: state.round,
        myContribution: contribution,
        contributions: {
          you: contribution,
          hana: bot.hana,
          marco: bot.marco,
          bea: bot.bea,
        },
        payoffs,
        myPayoff: perPlayer,
      };
      return {
        ...state,
        phase: 'reveal',
        myContribution: contribution,
        result,
      };
    }
    case 'NEXT_ROUND': {
      if (!state.result) return state;
      const history = [...state.history, state.result];
      const myTotal = myTotalFor(state) + state.result.myPayoff;
      if (state.round >= TOTAL_ROUNDS) {
        return { ...state, phase: 'done', history, myTotal, result: null };
      }
      return {
        ...state,
        phase: 'choose',
        round: state.round + 1,
        history,
        myTotal,
        playerHistory: [...state.playerHistory, state.result.myContribution],
        result: null,
        myContribution: null,
      };
    }
    case 'RESET':
      return createInitialState();
    default:
      const _exhaustive: never = action;
      return state;
  }
};

const myTotalFor = (state: GameState): number =>
  state.history.reduce((sum, r) => sum + r.myPayoff, 0);

export const buildRanking = (
  history: RoundResult[],
  myTotal: number
): Ranking[] =>
  [
    { id: 'you', name: 'You', emoji: '🙋', total: Math.round(myTotal) },
    {
      id: 'hana',
      name: 'Hana',
      emoji: '👩‍🌾',
      total: Math.round(totalsFor(history).hana),
    },
    {
      id: 'marco',
      name: 'Marco',
      emoji: '👨‍💼',
      total: Math.round(totalsFor(history).marco),
    },
    {
      id: 'bea',
      name: 'Bea',
      emoji: '🦊',
      total: Math.round(totalsFor(history).bea),
    },
  ].sort((a, b) => b.total - a.total);

const totalsFor = (
  history: RoundResult[]
): Record<'you' | 'hana' | 'marco' | 'bea', number> => {
  const totals = { you: 0, hana: 0, marco: 0, bea: 0 };
  for (const r of history) {
    totals.you += r.payoffs.you;
    totals.hana += r.payoffs.hana;
    totals.marco += r.payoffs.marco;
    totals.bea += r.payoffs.bea;
  }
  return totals;
};
