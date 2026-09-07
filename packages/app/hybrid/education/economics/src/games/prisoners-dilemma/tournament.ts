import { PAYOFF, STRATEGIES } from './constants';
import { chooseOpponent } from './game';
import type { Move, Round } from './types';

export interface MatchResult {
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
  rounds: number
): MatchResult => {
  const history: Round[] = [];
  const aMoves: Move[] = [];
  const bMoves: Move[] = [];
  let aScore = 0;
  let bScore = 0;
  for (let r = 1; r <= clampRounds(rounds); r++) {
    const aMove = chooseOpponent(strategyA, history, bMoves);
    const bMove = chooseOpponent(strategyB, history, aMoves);
    const [pa, pb] = PAYOFF[aMove][bMove];
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

export const runTournament = (roundsPerMatch: number): Standing[] => {
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

  for (let i = 0; i < STRATEGIES.length; i++) {
    for (let j = i + 1; j < STRATEGIES.length; j++) {
      const a = STRATEGIES[i].id;
      const b = STRATEGIES[j].id;
      const { aScore, bScore } = playMatch(a, b, roundsPerMatch);
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

  return Object.values(standings).sort(
    (x, y) =>
      y.score - x.score ||
      y.wins - x.wins ||
      x.strategyId.localeCompare(y.strategyId)
  );
};
