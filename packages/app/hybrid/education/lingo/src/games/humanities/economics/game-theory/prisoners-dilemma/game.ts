import { Behavior, Move, Round, Strategy } from './types';
import { STRATEGIES } from './constants';
import {
  alwaysCooperate,
  alwaysDefect,
  alternator,
  bandit,
  BehaviorFn,
  cautious,
  defector,
  delayed,
  earlyCooperate,
  earlyDefect,
  forgiving,
  generousTitForTat,
  grimTrigger,
  hardTitForTat,
  hedger,
  joss,
  keepsake,
  noisy,
  opportunist,
  pavlov,
  periodic,
  prober,
  randomBehavior,
  remorseful,
  reverseTitForTat,
  scoreboard,
  staircase,
  superAlternator,
  tester,
  threeStrikes,
  titForTat,
  titForTwoTats,
  tolerantGrim,
} from './behaviours';

const BEHAVIOURS: Record<Behavior, BehaviorFn> = {
  'always-cooperate': alwaysCooperate,
  'always-defect': alwaysDefect,
  'tit-for-tat': titForTat,
  'hard-tit-for-tat': hardTitForTat,
  'tit-for-two-tats': titForTwoTats,
  joss,
  'reverse-tit-for-tat': reverseTitForTat,
  delayed,
  'grim-trigger': grimTrigger,
  'tolerant-grim': tolerantGrim,
  'three-strikes': threeStrikes,
  keepsake,
  pavlov,
  bandit,
  scoreboard,
  remorseful,
  opportunist,
  prober,
  alternator,
  'super-alternator': superAlternator,
  periodic,
  'early-cooperate': earlyCooperate,
  'early-defect': earlyDefect,
  staircase,
  random: randomBehavior,
  noisy,
  'generous-tit-for-tat': generousTitForTat,
  cautious,
  forgiving,
  tester,
  defector,
  hedger,
};

export const pickStrategy = (): Strategy =>
  STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)].id;

export const chooseOpponent = (
  strategy: Strategy,
  history: Round[],
  playerHistory: Move[]
): Move => {
  const def = STRATEGIES.find((s) => s.id === strategy);
  if (!def) return 'cooperate';
  return BEHAVIOURS[def.behavior](history, playerHistory);
};

export const formatScore = (s: number) => `${s > 0 ? '+' : ''}${s}`;
