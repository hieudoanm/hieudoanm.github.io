import { STRATEGIES } from './constants';
import { chooseOpponent } from './game';
import type { Move, Round } from './types';

export interface PayoffConfig {
  bothCooperate: number;
  youDefectTheyCooperate: number;
  youCooperateTheyDefect: number;
  bothDefect: number;
}

export const DEFAULT_PAYOFF: PayoffConfig = {
  bothCooperate: 3,
  youDefectTheyCooperate: 5,
  youCooperateTheyDefect: -5,
  bothDefect: -2,
};

const resolvePayoff = (
  aMove: Move,
  bMove: Move,
  cfg: PayoffConfig
): [number, number] => {
  if (aMove === 'cooperate' && bMove === 'cooperate')
    return [cfg.bothCooperate, cfg.bothCooperate];
  if (aMove === 'defect' && bMove === 'cooperate')
    return [cfg.youDefectTheyCooperate, cfg.youCooperateTheyDefect];
  if (aMove === 'cooperate' && bMove === 'defect')
    return [cfg.youCooperateTheyDefect, cfg.youDefectTheyCooperate];
  return [cfg.bothDefect, cfg.bothDefect];
};

export interface MatchResult {
  aScore: number;
  bScore: number;
}

export interface MatchupResult {
  aId: string;
  bId: string;
  aScore: number;
  bScore: number;
}

export interface Standing {
  strategyId: string;
  score: number;
  wins: number;
  losses: number;
  draws: number;
  played: number;
}

export const DEFAULT_ROUNDS = 50;
export const MAX_ROUNDS = 10000;

const clampRounds = (rounds: number): number => {
  const value = Math.trunc(Number.isNaN(rounds) ? DEFAULT_ROUNDS : rounds);
  return Math.min(Math.max(value, 1), MAX_ROUNDS);
};

export const playMatch = (
  strategyA: string,
  strategyB: string,
  rounds: number,
  payoff: PayoffConfig = DEFAULT_PAYOFF
): MatchResult => {
  const history: Round[] = [];
  const aMoves: Move[] = [];
  const bMoves: Move[] = [];
  let aScore = 0;
  let bScore = 0;
  for (let r = 1; r <= clampRounds(rounds); r++) {
    const aMove = chooseOpponent(strategyA, history, bMoves);
    const bMove = chooseOpponent(strategyB, history, aMoves);
    const [pa, pb] = resolvePayoff(aMove, bMove, payoff);
    aScore += pa;
    bScore += pb;
    history.push({
      round: r,
      player: aMove,
      opponent: bMove,
      pScore: pa,
      oScore: pb,
    });
    aMoves.push(aMove);
    bMoves.push(bMove);
  }
  return { aScore, bScore };
};

export interface TournamentResult {
  standings: Standing[];
  matchups: MatchupResult[];
}

export const runTournament = (
  roundsPerMatch: number,
  payoff: PayoffConfig = DEFAULT_PAYOFF
): TournamentResult => {
  const standings: Record<string, Standing> = {};
  for (const s of STRATEGIES) {
    standings[s.id] = {
      strategyId: s.id,
      score: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      played: 0,
    };
  }

  const matchups: MatchupResult[] = [];

  for (let i = 0; i < STRATEGIES.length; i++) {
    for (let j = i + 1; j < STRATEGIES.length; j++) {
      const a = STRATEGIES[i].id;
      const b = STRATEGIES[j].id;
      const { aScore, bScore } = playMatch(a, b, roundsPerMatch, payoff);
      matchups.push({ aId: a, bId: b, aScore, bScore });
      const sa = standings[a];
      const sb = standings[b];
      sa.score += aScore;
      sb.score += bScore;
      sa.played += 1;
      sb.played += 1;
      if (aScore > bScore) {
        sa.wins += 1;
        sb.losses += 1;
      } else if (aScore < bScore) {
        sb.wins += 1;
        sa.losses += 1;
      } else {
        sa.draws += 1;
        sb.draws += 1;
      }
    }
  }

  const standingsArr = Object.values(standings).sort(
    (x, y) =>
      y.score - x.score ||
      y.wins - x.wins ||
      x.strategyId.localeCompare(y.strategyId)
  );

  return { standings: standingsArr, matchups };
};
