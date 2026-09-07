import type { Move, Round } from './types';

export type BehaviorFn = (history: Round[], playerHistory: Move[]) => Move;

const invert = (move: Move): Move =>
  move === 'cooperate' ? 'defect' : 'cooperate';

export const alwaysCooperate: BehaviorFn = () => 'cooperate';

export const alwaysDefect: BehaviorFn = () => 'defect';

export const titForTat: BehaviorFn = (_history, playerHistory) =>
  playerHistory.at(-1) ?? 'cooperate';

export const hardTitForTat: BehaviorFn = (history, playerHistory) =>
  history.length === 0 ? 'defect' : (playerHistory.at(-1) ?? 'cooperate');

export const titForTwoTats: BehaviorFn = (_history, playerHistory) =>
  playerHistory.at(-1) === 'defect' && playerHistory.at(-2) === 'defect'
    ? 'defect'
    : 'cooperate';

export const joss: BehaviorFn = (_history, playerHistory) => {
  if ((playerHistory.at(-1) ?? 'cooperate') === 'defect') return 'defect';
  return Math.random() < 0.1 ? 'defect' : 'cooperate';
};

export const reverseTitForTat: BehaviorFn = (history, playerHistory) => {
  if (history.length === 0) return 'cooperate';
  return invert(playerHistory.at(-1) ?? 'cooperate');
};

export const delayed: BehaviorFn = (_history, playerHistory) =>
  playerHistory.at(-2) ?? playerHistory.at(-1) ?? 'cooperate';

export const grimTrigger: BehaviorFn = (_history, playerHistory) =>
  playerHistory.includes('defect') ? 'defect' : 'cooperate';

export const tolerantGrim: BehaviorFn = (_history, playerHistory) =>
  playerHistory.filter((move) => move === 'defect').length >= 2
    ? 'defect'
    : 'cooperate';

export const threeStrikes: BehaviorFn = (_history, playerHistory) =>
  playerHistory.filter((move) => move === 'defect').length >= 3
    ? 'defect'
    : 'cooperate';

export const keepsake: BehaviorFn = (_history, playerHistory) =>
  playerHistory.includes('cooperate') ? 'cooperate' : 'defect';

export const pavlov: BehaviorFn = (history) => {
  const last = history.at(-1);
  return !last || last.player === last.opponent ? 'cooperate' : 'defect';
};

export const bandit: BehaviorFn = (history) => {
  const last = history.at(-1);
  if (!last) return 'cooperate';
  const base = last.player === last.opponent ? 'cooperate' : 'defect';
  return Math.random() < 0.1 ? invert(base) : base;
};

export const scoreboard: BehaviorFn = (history) => {
  const last = history.at(-1);
  if (!last) return 'cooperate';
  return last.pScore >= last.oScore ? 'cooperate' : 'defect';
};

export const remorseful: BehaviorFn = (history, playerHistory) => {
  const last = history.at(-1);
  if (last && last.player === 'defect' && last.opponent === 'cooperate') {
    return 'cooperate';
  }
  return playerHistory.at(-1) ?? 'cooperate';
};

export const opportunist: BehaviorFn = (history) => {
  const last = history.at(-1);
  if (!last) return 'cooperate';
  return last.player === 'defect' && last.opponent === 'cooperate'
    ? 'defect'
    : 'cooperate';
};

export const prober: BehaviorFn = (history, playerHistory) => {
  if (history.length < 3) return 'cooperate';
  if (playerHistory.slice(0, 3).includes('defect')) {
    return playerHistory.includes('defect') ? 'defect' : 'cooperate';
  }
  return Math.random() < 0.1 ? 'defect' : 'cooperate';
};

export const alternator: BehaviorFn = (history) =>
  history.length % 2 === 0 ? 'cooperate' : 'defect';

export const superAlternator: BehaviorFn = (history) =>
  history.length % 2 === 0 ? 'defect' : 'cooperate';

export const periodic: BehaviorFn = (history) =>
  (['cooperate', 'cooperate', 'defect', 'defect'] as const)[history.length % 4];

export const earlyCooperate: BehaviorFn = (history, playerHistory) =>
  history.length < 3 ? 'cooperate' : (playerHistory.at(-1) ?? 'cooperate');

export const earlyDefect: BehaviorFn = (history, playerHistory) =>
  history.length < 3 ? 'defect' : (playerHistory.at(-1) ?? 'cooperate');

export const staircase: BehaviorFn = (history) =>
  history.length % 5 === 4 ? 'defect' : 'cooperate';

export const randomBehavior: BehaviorFn = () =>
  Math.random() < 0.5 ? 'cooperate' : 'defect';

export const noisy: BehaviorFn = (_history, playerHistory) => {
  const base = playerHistory.at(-1) ?? 'cooperate';
  return Math.random() < 0.1 ? invert(base) : base;
};

export const generousTitForTat: BehaviorFn = (_history, playerHistory) => {
  if ((playerHistory.at(-1) ?? 'cooperate') === 'cooperate') {
    return 'cooperate';
  }
  return Math.random() < 0.1 ? 'cooperate' : 'defect';
};

export const cautious: BehaviorFn = (history, playerHistory) => {
  if (history.length === 0) return 'cooperate';
  if (playerHistory[0] === 'defect') return 'defect';
  return playerHistory.at(-1) ?? 'cooperate';
};

export const forgiving: BehaviorFn = (_history, playerHistory) => {
  if (
    playerHistory.at(-1) === 'cooperate' &&
    playerHistory.at(-2) === 'cooperate'
  ) {
    return 'cooperate';
  }
  return playerHistory.at(-1) ?? 'cooperate';
};

export const tester: BehaviorFn = (history, playerHistory) => {
  if (history.length === 0) return 'cooperate';
  if (history.length === 1) return 'defect';
  if (playerHistory[1] === 'defect') {
    return playerHistory.at(-1) ?? 'cooperate';
  }
  return playerHistory.includes('defect') ? 'defect' : 'cooperate';
};

export const defector: BehaviorFn = (history) =>
  history.length === 0 ? 'cooperate' : 'defect';

export const hedger: BehaviorFn = (history) => {
  const oTotal = history.reduce((sum, round) => sum + round.oScore, 0);
  const pTotal = history.reduce((sum, round) => sum + round.pScore, 0);
  return oTotal > pTotal ? 'defect' : 'cooperate';
};
