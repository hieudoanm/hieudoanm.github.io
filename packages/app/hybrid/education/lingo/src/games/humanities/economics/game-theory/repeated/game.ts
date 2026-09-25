import type { Action, Rand, RoundEntry, StrategyId } from './types';

export const payoff = (myAction: Action, opponentAction: Action): number => {
  if (myAction === 'C' && opponentAction === 'C') return 3;
  if (myAction === 'D' && opponentAction === 'C') return 5;
  if (myAction === 'C' && opponentAction === 'D') return 0;
  return 1;
};

export const titForTat = (history: RoundEntry[]): Action =>
  history.at(-1)?.playerAction ?? 'C';

export const grimTrigger = (history: RoundEntry[]): Action =>
  history.some((r) => r.playerAction === 'D') ? 'D' : 'C';

export const forgivingTitForTat = (history: RoundEntry[]): Action =>
  history.filter((r) => r.playerAction === 'D').length >= 2 ? 'D' : 'C';

export const nextMove = (
  strategyId: StrategyId,
  history: RoundEntry[],
  rand: Rand = Math.random
): Action => {
  switch (strategyId) {
    case 'tit-for-tat':
      return titForTat(history);
    case 'grim-trigger':
      return grimTrigger(history);
    case 'forgiving-tit-for-tat':
      return forgivingTitForTat(history);
    case 'always-defect':
      return 'D';
    case 'random':
      return rand() < 0.5 ? 'C' : 'D';
    case 'mostly-cooperate':
      return rand() < 0.9 ? 'C' : 'D';
    default:
      const _exhaustive: never = strategyId;
      return 'C';
  }
};

export const scoreRow = (
  myAction: Action,
  opponentAction: Action,
  round: number,
  prevTotal: number
): RoundEntry => {
  const gained = payoff(myAction, opponentAction);
  return {
    round,
    playerAction: myAction,
    opponentAction,
    payoff: gained,
    cumulative: prevTotal + gained,
  };
};

export const playerDefections = (history: RoundEntry[]): number =>
  history.filter((r) => r.playerAction === 'D').length;

export const mutualCooperations = (history: RoundEntry[]): number =>
  history.filter((r) => r.playerAction === 'C' && r.opponentAction === 'C')
    .length;

export const lessonFor = (strategyId: StrategyId): string => {
  switch (strategyId) {
    case 'tit-for-tat':
      return 'Cooperating with Tit For Tat scores 30; defect and you win 5 once, then face defection for 9 more rounds — 5 + 9 = 14. Cooperation wins.';
    case 'grim-trigger':
      return 'Grim Trigger puts up with one defection, then punishes forever — a single slip can cost you everything. Never defect.';
    case 'forgiving-tit-for-tat':
      return 'Forgiving Tit For Tat absorbs one defection, but defects after a second — an occasional slip is survivable, two are not.';
    case 'random':
      return 'Random cooperates half the time, so no mix of choices is safe — aim for mutual cooperation and accept the noise.';
    case 'always-defect':
      return 'Always Defect never rewards cooperation — matching its defection earns 1 per round, while cooperating pays you nothing.';
    case 'mostly-cooperate':
      return 'Mostly Cooperate is a generous partner that slips only occasionally — keeping up cooperation captures most of the mutual payoff.';
  }
};
