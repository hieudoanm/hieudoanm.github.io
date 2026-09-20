import type { MedianResult, ParadoxOption, ParadoxStep, Voter } from './types';

export const medianOf = (ideals: number[]): number => {
  const sorted = [...ideals].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

export const votersFrom = (ideals: number[]): Voter[] =>
  ideals.map((ideal, index) => ({ id: `v${index + 1}`, ideal }));

export const simulateElection = (
  voters: Voter[],
  playerPlatform: number,
  botPlatform: number
): MedianResult => {
  let playerVotes = 0;
  let botVotes = 0;
  for (const voter of voters) {
    const toPlayer = Math.abs(voter.ideal - playerPlatform);
    const toBot = Math.abs(voter.ideal - botPlatform);
    if (toPlayer < toBot) playerVotes += 1;
    else if (toBot < toPlayer) botVotes += 1;
  }
  const winner =
    playerVotes > botVotes ? 'player' : botVotes > playerVotes ? 'bot' : 'tie';
  return {
    playerPlatform,
    botPlatform,
    votesForPlayer: playerVotes,
    votesForBot: botVotes,
    winner,
  };
};

export const cycleRankings = (options: ParadoxOption[]): string[][] => {
  const ids = options.map((option) => option.id);
  return [ids, [...ids.slice(1), ids[0]], [ids[2], ids[0], ids[1]]];
};

export const pairwiseWinner = (
  rankings: string[][],
  a: string,
  b: string
): string => {
  const votesForA = rankings.filter(
    (ranking) => ranking.indexOf(a) < ranking.indexOf(b)
  ).length;
  return votesForA > rankings.length / 2 ? a : b;
};

export const runTournament = (
  options: ParadoxOption[],
  rankings: string[][],
  firstPair: [string, string]
): { steps: ParadoxStep[]; finalWinner: string } => {
  const [a, b] = firstPair;
  const firstWinner = pairwiseWinner(rankings, a, b);
  const remaining =
    options.find((o) => o.id !== a && o.id !== b)?.id ?? firstWinner;
  const finalWinner = pairwiseWinner(rankings, firstWinner, remaining);
  return {
    steps: [
      { a, b, winner: firstWinner },
      { a: firstWinner, b: remaining, winner: finalWinner },
    ],
    finalWinner,
  };
};

export const rentProbability = (
  playerSpend: number,
  botSpend: number
): number => {
  const total = playerSpend + botSpend;
  return total === 0 ? 0.5 : playerSpend / total;
};

export const expectedPayoff = (
  playerSpend: number,
  botSpend: number,
  prize: number
): number =>
  Math.round(rentProbability(playerSpend, botSpend) * prize - playerSpend);

export const drawWin = (probability: number): boolean =>
  Math.random() < probability;
